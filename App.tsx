import React, { useState, useCallback } from 'react';
import type { Recipe } from './types';
import Header from './components/Header';
import Landing from './components/Landing';
import IngredientInput from './components/IngredientInput';
import CuisineSelector from './components/CuisineSelector';
import RecipeDisplay from './components/RecipeDisplay';
import Loader from './components/Loader';
import { extractIngredientsFromImage, generateRecipe } from './services/geminiService';


type AppStep = 'landing' | 'input' | 'cuisine' | 'generating' | 'recipe';
type InputType = 'text' | 'image';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [inputType, setInputType] = useState<InputType>('text');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = (type: InputType) => {
    setInputType(type);
    setStep('input');
    setError(null);
    setRecipe(null);
  };
  
  const handleIngredientsSubmit = async (data: string | File) => {
    setStep('generating');
    setError(null);
    try {
      let ingredientList: string;
      if (typeof data === 'string') {
        ingredientList = data;
      } else {
        ingredientList = await extractIngredientsFromImage(data);
      }
      setIngredients(ingredientList);
      setStep('cuisine');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract ingredients.');
      setStep('input'); 
    }
  };

  const handleCuisineSelect = async (cuisine: string) => {
    setStep('generating');
    setError(null);
    try {
      const result = await generateRecipe(ingredients, cuisine);
      setRecipe(result);
      setStep('recipe');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe.');
      setStep('cuisine');
    }
  };

  const handleReset = () => {
    setStep('landing');
    setIngredients('');
    setRecipe(null);
    setError(null);
  };
  
  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Landing onStart={handleStart} />;
      case 'input':
        return <IngredientInput inputType={inputType} onSubmit={handleIngredientsSubmit} onBack={handleReset} error={error} />;
      case 'cuisine':
        return <CuisineSelector ingredients={ingredients} onSelect={handleCuisineSelect} onBack={() => setStep('input')} error={error}/>;
      case 'generating':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-4 pt-16 animate-fade-in">
            <Loader />
            <p className="text-lg font-semibold text-primary font-display">Crafting your recipe...</p>
            <p className="text-text-secondary">Our AI is thinking up a delicious meal!</p>
          </div>
        );
      case 'recipe':
        return recipe ? <RecipeDisplay recipe={recipe} onReset={handleReset} /> : null;
      default:
        return <Landing onStart={handleStart} />;
    }
  }

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-6">
        {renderStep()}
      </main>
      <footer className="text-center p-4 text-sm text-text-secondary">
        Powered by AI. Always use your best judgment when cooking.
      </footer>
    </div>
  );
};

export default App;
