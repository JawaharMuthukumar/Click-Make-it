import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { Recipe } from '../types';

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

const fileToBase64 = (file: File): Promise<string> => blobToBase64(file);

export const extractIngredientsFromImage = async (file: File): Promise<string> => {
    const base64Data = await fileToBase64(file);
    const imagePart = {
      inlineData: {
        mimeType: file.type,
        data: base64Data,
      },
    };
    const textPart = {
      text: "Identify all the food ingredients in this image. List them as a single comma-separated string. For example: 'tomatoes, onions, chicken breast, olive oil'.",
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });
    
    return response.text.trim();
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
        text: "Transcribe the following audio recording of a person listing their cooking ingredients or asking a question about a recipe. Provide only the transcribed text.",
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [audioPart, textPart] },
    });

    return response.text.trim();
};


export const generateRecipe = async (
    ingredients: string, 
    cuisine: string, 
    tasteProfile: string,
    servings: number,
    cookingMethod: string,
    cookingStyle: string,
    creativityLevel: string
): Promise<Recipe> => {
    const modelName = creativityLevel === 'Gourmet' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const prompt = `
        Given the following constraints:
        - Ingredients: ${ingredients}
        - Desired Cuisine: ${cuisine === 'Any' ? 'any Indian regional style' : cuisine}
        - Desired Taste Profile: ${tasteProfile} (Please emphasize this taste in the recipe)
        - Number of Servings: ${servings}
        - Primary Cooking Appliance: ${cookingMethod === 'No-Cook' ? 'None (the recipe should require no heat or cooking, like a fresh salad, sandwich, or wrap)' : cookingMethod}
        - Desired Cooking Style: ${cookingStyle}

        ${creativityLevel === 'Gourmet' 
            ? 'Generate a sophisticated and creative recipe, suitable for an adventurous cook or a special occasion. Feel free to suggest more complex flavor pairings or techniques.' 
            : 'Generate a simple recipe that an amateur cook can make.'}
        The recipe should be authentic and representative of the selected Indian cuisine. For example, if the cuisine is 'Tamil Nadu', a dish like Sambar or Poriyal would be appropriate. If it's 'Punjabi', something like a simple dal makhani or a tandoori-style dish would be great.
        IMPORTANT: Adapt the traditional recipe to creatively incorporate the user's provided ingredients, even if they are not typical for that cuisine. The final dish must have a distinctly Indian flavor profile.
        Provide a creative name for the recipe.
        Provide a short, one-sentence description.
        List the necessary ingredients (can include minor additions like salt, pepper, oil if essential), scaled for the specified number of servings.
        Provide clear, step-by-step instructions. ${cookingMethod === 'No-Cook' ? 'These instructions must not involve any cooking, boiling, or heating.' : 'These instructions should primarily use the specified cooking appliance.'}
        Finally, provide a detailed nutritional analysis for a single serving. This should include:
        - An estimated calorie range as a string (e.g., "~450-500 kcal").
        - For Protein: provide an estimated range in grams as a string (e.g., "38-42g") and a brief description of the primary sources.
        - For Carbohydrates: provide an estimated range in grams as a string (e.g., "40-45g") and a brief description of the primary sources.
        - For Fat: provide an estimated range in grams as a string (e.g., "10-14g") and a brief description of the primary sources.
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
                            calories: { type: Type.STRING, description: "Estimated calorie range, e.g., '~450-500 kcal'" },
                            protein: {
                                type: Type.OBJECT,
                                properties: {
                                    amount: { type: Type.STRING, description: "e.g., '38-42g'" },
                                    source: { type: Type.STRING, description: "Primary sources of protein" }
                                },
                                required: ["amount", "source"]
                            },
                            carbohydrates: {
                                type: Type.OBJECT,
                                properties: {
                                    amount: { type: Type.STRING, description: "e.g., '40-45g'" },
                                    source: { type: Type.STRING, description: "Primary sources of carbohydrates" }
                                },
                                required: ["amount", "source"]
                            },
                            fat: {
                                type: Type.OBJECT,
                                properties: {
                                    amount: { type: Type.STRING, description: "e.g., '10-14g'" },
                                    source: { type: Type.STRING, description: "Primary sources of fat" }
                                },
                                required: ["amount", "source"]
                            }
                        },
                        required: ["calories", "protein", "carbohydrates", "fat"]
                    },
                },
                required: ["recipeName", "description", "ingredients", "instructions", "nutrition"],
            },
        },
    });

    const jsonText = response.text;
    try {
        const recipeData = JSON.parse(jsonText) as Recipe;
        recipeData.servings = servings;
        recipeData.cookingMethod = cookingMethod;
        recipeData.cuisine = cuisine;
        recipeData.tasteProfile = tasteProfile;
        recipeData.cookingStyle = cookingStyle;
        recipeData.creativityLevel = creativityLevel;
        return recipeData;
    } catch (e) {
        console.error("Failed to parse recipe JSON:", e);
        throw new Error("The AI returned an unexpected format. Please try again.");
    }
};

export const startChat = (recipe: Recipe): Chat => {
    const recipeContext = `
      You are a helpful, friendly cooking assistant specializing in Indian cuisine. The user is currently making the following recipe and has some questions.
      Your answers should be concise and directly related to the recipe context provided below.
      Do not suggest completely different recipes unless asked for a substitution.

      RECIPE CONTEXT:
      - Recipe Name: ${recipe.recipeName}
      - Description: ${recipe.description}
      - Ingredients: ${recipe.ingredients.join(', ')}
      - Instructions:
      ${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}
      - Nutrition: Calories: ${recipe.nutrition.calories}, Protein: ${recipe.nutrition.protein.amount}, Carbs: ${recipe.nutrition.carbohydrates.amount}, Fat: ${recipe.nutrition.fat.amount}
    `;

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: recipeContext,
        },
    });

    return chat;
};

export const getInspiration = async (ingredients: string): Promise<string[]> => {
    const prompt = `
        Given the following ingredients: "${ingredients}".
        Generate a list of exactly 4 creative and appealing Indian recipe names.
        The names should be short, enticing, and sound like real dishes. Do not add any extra explanation or text.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    ideas: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of exactly 4 recipe name ideas."
                    }
                },
                required: ["ideas"],
            },
        },
    });

    const jsonText = response.text;
    try {
        const data = JSON.parse(jsonText) as { ideas: string[] };
        return data.ideas;
    } catch (e) {
        console.error("Failed to parse inspiration JSON:", e);
        throw new Error("The AI returned an unexpected format for inspiration. Please try again.");
    }
};