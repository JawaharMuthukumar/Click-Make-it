
export interface MacroInfo {
  amount: string;
  source: string;
}

export interface DetailedNutrition {
  calories: string;
  protein: MacroInfo;
  carbohydrates: MacroInfo;
  fat: MacroInfo;
}

export interface Recipe {
  id: string; // Unique identifier
  timestamp: number; // Creation time
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: DetailedNutrition;
  servings?: number;
  cookingMethod?: string;
  country?: string;
  state?: string;
  mealType?: string;
  tasteProfile?: string;
  cookingStyle?: string;
  creativityLevel?: string;
  imageBase64?: string; 
}

export interface DishOption {
  name: string;
  description: string;
  imagePrompt: string;
  imageBase64?: string;
}

export interface User {
  email: string;
  fullName: string;
  country?: string;
  state?: string;
  plan?: 'free' | 'monthly' | 'yearly';
  dishUsed?: number;
  currentMonth?: string;
}

export interface Cuisine {
  name: string;
}
