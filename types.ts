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
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: DetailedNutrition;
}

export interface User {
  email: string;
}
