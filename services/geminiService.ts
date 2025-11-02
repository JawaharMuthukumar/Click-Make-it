import { GoogleGenAI, Type } from "@google/genai";
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

export const generateRecipe = async (ingredients: string, cuisine: string): Promise<Recipe> => {
    const prompt = `
        Given the following ingredients: ${ingredients}.
        And the desired cuisine: ${cuisine === 'Any' ? 'any cuisine' : cuisine}.

        Generate a simple recipe that an amateur cook can make.
        Provide a creative name for the recipe.
        Provide a short, one-sentence description.
        List the necessary ingredients (can include minor additions like salt, pepper, oil if essential).
        Provide clear, step-by-step instructions.
        Finally, provide an estimated macronutrient breakdown (protein, carbohydrates, fat) in grams for a single serving.
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
                    macronutrients: {
                        type: Type.OBJECT,
                        properties: {
                            protein: { type: Type.NUMBER, description: "Protein in grams" },
                            carbohydrates: { type: Type.NUMBER, description: "Carbohydrates in grams" },
                            fat: { type: Type.NUMBER, description: "Fat in grams" },
                        },
                        required: ["protein", "carbohydrates", "fat"]
                    },
                },
                required: ["recipeName", "description", "ingredients", "instructions", "macronutrients"],
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
