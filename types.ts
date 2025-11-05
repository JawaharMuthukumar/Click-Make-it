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

export interface CuisineStyle {
  name: string;
  description: string;
}

export interface Cuisine {
  name:string;
  description: string;
  styles?: CuisineStyle[];
}

export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: DetailedNutrition;
  servings?: number;
  cookingMethod?: string;
  cuisine?: string;
  tasteProfile?: string;
  cookingStyle?: string;
  creativityLevel?: string;
}

export interface User {
  email: string;
}