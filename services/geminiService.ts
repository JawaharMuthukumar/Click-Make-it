
import { GoogleGenAI, Type, Chat, Modality } from "@google/genai";
import type { Recipe, DishOption } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

// Helper: Decode Base64 string to Uint8Array
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper: Convert raw PCM data (Int16) to AudioBuffer (Float32)
function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): AudioBuffer {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    const base64Data = await blobToBase64(audioBlob);
    const audioPart = {
        inlineData: {
            mimeType: audioBlob.type,
            data: base64Data,
        },
    };
    const textPart = {
        text: "Transcribe the following audio recording of a person listing their cooking ingredients or asking a question about a recipe. Provide only the transcribed text exactly as spoken in its original language.",
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [audioPart, textPart] },
    });

    return response.text?.trim() || "";
};

export const playTextToSpeech = async (text: string): Promise<void> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: { parts: [{ text }] },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) throw new Error("No audio data returned");

        const sampleRate = 24000;
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate });
        
        // Manually decode raw PCM data
        const audioBuffer = decodeAudioData(
          decode(base64Audio),
          audioContext,
          sampleRate,
          1 // Mono channel
        );

        return new Promise((resolve) => {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.onended = () => {
                resolve();
            };
            source.start(0);
        });

    } catch (error) {
        console.error("TTS Error:", error);
        throw error; // Re-throw to handle in UI
    }
};

export const generateImage = async (prompt: string): Promise<string | undefined> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: "4:3",
                }
            }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        return undefined;
    } catch (error) {
        console.error("Image generation error:", error);
        return undefined;
    }
};

export const generateDishOptions = async (
    ingredients: string,
    country: string,
    state: string,
    mealType: string,
    tasteProfile: string,
    cookingMethod: string,
    cookingStyle: string,
    creativityLevel: string
): Promise<DishOption[]> => {
    const modelName = creativityLevel === 'Gourmet' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const prompt = `
        You are an expert chef. Based on the following user inputs, suggest exactly 3 distinct and creative dish ideas.
        
        Inputs:
        - Ingredients/Idea: "${ingredients}"
        - Cuisine: ${country} ${state ? `(${state} region)` : ''}
        - Meal Type: ${mealType}
        - Taste Profile: ${tasteProfile}
        - Method: ${cookingMethod}
        
        For each dish, provide:
        1. A catchy, authentic name.
        2. A short, appetizing description (max 2 sentences).
        3. A visual description suitable for an AI image generator to create a photo of the dish.
        
        Return strictly JSON format with the following schema:
        {
          "options": [
            { "name": "...", "description": "...", "imagePrompt": "..." }
          ]
        }
    `;

    const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    options: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                description: { type: Type.STRING },
                                imagePrompt: { type: Type.STRING }
                            },
                            required: ["name", "description", "imagePrompt"]
                        }
                    }
                },
                required: ["options"]
            }
        }
    });

    let options: DishOption[] = [];
    try {
        const data = JSON.parse(response.text || "{}");
        options = data.options || [];
    } catch (e) {
        console.error("Failed to parse dish options:", e);
        throw new Error("Failed to generate dish ideas.");
    }

    // Generate images for all options in parallel
    const imagePromises = options.map(async (opt) => {
        const imageBase64 = await generateImage(`A professional, appetizing food photography shot of ${opt.name}: ${opt.imagePrompt}. High resolution, photorealistic, ${country} cuisine style.`);
        return { ...opt, imageBase64 };
    });

    return Promise.all(imagePromises);
};

export const generateRecipe = async (
    dishName: string,
    dishDescription: string,
    ingredients: string,
    country: string,
    state: string,
    mealType: string,
    tasteProfile: string,
    servings: number,
    cookingMethod: string,
    cookingStyle: string,
    creativityLevel: string
): Promise<Recipe> => {
    const modelName = creativityLevel === 'Gourmet' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const prompt = `
        Create a detailed cooking recipe for: "${dishName}".
        
        Context:
        - User's original input: "${ingredients}"
        - Cuisine: ${country}${state ? `, specifically from the ${state} region` : ''}
        - Meal Type: ${mealType}
        - Taste Profile: ${tasteProfile}
        - Servings: ${servings}
        - Primary Appliance: ${cookingMethod}
        - Style: ${cookingStyle}
        
        Description constraint: Use this description as a base: "${dishDescription}".
        
        The recipe should be authentic to the selected region.
        Provide a list of ingredients (with quantities), step-by-step instructions, and detailed nutrition for one serving.
        
        Nutrition Requirements:
        - Calorie range (e.g., "~450-500 kcal")
        - Protein, Carbs, Fat: Amount (e.g. "30g") and primary source description.
    `;

    const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recipeName: { type: Type.STRING },
                    description: { type: Type.STRING },
                    ingredients: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    instructions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    nutrition: {
                        type: Type.OBJECT,
                        properties: {
                            calories: { type: Type.STRING },
                            protein: {
                                type: Type.OBJECT,
                                properties: {
                                    amount: { type: Type.STRING },
                                    source: { type: Type.STRING }
                                },
                                required: ["amount", "source"]
                            },
                            carbohydrates: {
                                type: Type.OBJECT,
                                properties: {
                                    amount: { type: Type.STRING },
                                    source: { type: Type.STRING }
                                },
                                required: ["amount", "source"]
                            },
                            fat: {
                                type: Type.OBJECT,
                                properties: {
                                    amount: { type: Type.STRING },
                                    source: { type: Type.STRING }
                                },
                                required: ["amount", "source"]
                            }
                        },
                        required: ["calories", "protein", "carbohydrates", "fat"]
                    }
                },
                required: ["recipeName", "description", "ingredients", "instructions", "nutrition"]
            }
        }
    });

    try {
        const recipeData = JSON.parse(response.text || "{}");
        return {
            ...recipeData,
            servings,
            cookingMethod,
            country,
            state,
            mealType,
            tasteProfile,
            cookingStyle,
            creativityLevel
        } as Recipe;
    } catch (e) {
        console.error("Failed to parse recipe:", e);
        throw new Error("Failed to generate full recipe.");
    }
};

export const startChat = (recipe: Recipe): Chat => {
    const systemInstruction = `
        You are a helpful cooking assistant for the recipe "${recipe.recipeName}".
        
        Recipe Details:
        - Description: ${recipe.description}
        - Ingredients: ${recipe.ingredients.join(', ')}
        - Instructions: ${recipe.instructions.join(' -> ')}
        - Cuisine: ${recipe.country} ${recipe.state ? `(${recipe.state})` : ''}
        - Nutrition: ${recipe.nutrition.calories}, P: ${recipe.nutrition.protein.amount}, C: ${recipe.nutrition.carbohydrates.amount}, F: ${recipe.nutrition.fat.amount}
        
        Your goal is to help the user cook this specific recipe. Answer questions about substitutions, techniques, or steps.
        Keep answers concise and encouraging.
    `;

    return ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
            systemInstruction: systemInstruction
        }
    });
};

export const getInspiration = async (ingredients: string): Promise<string[]> => {
    const prompt = `
        I have these ingredients: "${ingredients}".
        Suggest 5 short, creative, and distinct dish names I could make with these ingredients.
        Return only a JSON array of strings.
        Example: ["Spicy Tomato Pasta", "Grilled Chicken Salad", ...]
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            }
        }
    });

    try {
        return JSON.parse(response.text || "[]");
    } catch (e) {
        console.error("Failed to parse inspiration:", e);
        return [];
    }
};
