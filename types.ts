export interface Macronutrients {
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  macronutrients: Macronutrients;
}
