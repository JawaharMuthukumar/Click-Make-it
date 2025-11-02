import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

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

export const generateRecipe = async (ingredients: string, cuisine: string, tasteProfile: string): Promise<Recipe> => {
    const prompt = `
        Given the following ingredients: ${ingredients}.
        And the desired cuisine: ${cuisine === 'Any' ? 'any cuisine' : cuisine}.
        And the desired taste profile is: ${tasteProfile}. Please emphasize this taste in the recipe's ingredients and instructions.

        Generate a simple recipe that an amateur cook can make.
        Provide a creative name for the recipe.
        Provide a short, one-sentence description.
        List the necessary ingredients (can include minor additions like salt, pepper, oil if essential).
        Provide clear, step-by-step instructions.
        Finally, provide a detailed nutritional analysis for a single serving. This should include:
        - An estimated calorie range as a string (e.g., "~450-500 kcal").
        - For Protein: provide an estimated range in grams as a string (e.g., "38-42g") and a brief description of the primary sources.
        - For Carbohydrates: provide an estimated range in grams as a string (e.g., "40-45g") and a brief description of the primary sources.
        - For Fat: provide an estimated range in grams as a string (e.g., "10-14g") and a brief description of the primary sources.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
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
        return JSON.parse(jsonText) as Recipe;
    } catch (e) {
        console.error("Failed to parse recipe JSON:", e);
        throw new Error("The AI returned an unexpected format. Please try again.");
    }
};

export const startChat = (recipe: Recipe): Chat => {
    const recipeContext = `
      You are a helpful, friendly cooking assistant. The user is currently making the following recipe and has some questions.
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