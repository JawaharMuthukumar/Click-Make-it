import React, { useState, useCallback } from 'react';
import type { Recipe, User } from './types';
import Header from './components/Header';
import Auth from './components/Auth';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import IngredientInput from './components/IngredientInput';
import RecipeCustomization from './components/RecipeCustomization';
import RecipeDisplay from './components/RecipeDisplay';
import Loader from './components/Loader';
import { generateRecipe, extractIngredientsFromImage } from './services/geminiService';


type AppStep = 'landing' | 'dashboard' | 'input' | 'customize' | 'generating' | 'recipe';
type InputType = 'text' | 'image';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  
  const [step, setStep] = useState<AppStep>('landing');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = (email: string) => {
    setUser({ email });
    setShowAuth(false);
    setStep('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setStep('landing');
    resetRecipeState();
  };

  const handleStartCooking = () => {
    if (user) {
      setStep('dashboard');
    } else {
      setShowAuth(true);
    }
  };
  
  const handleDashboardStart = () => {
    setStep('input');
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
      setStep('customize');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract ingredients.');
      setStep('input'); 
    }
  };

  const handleCustomizationSubmit = async (data: { servings: number; method: string; style: string; cuisine: string; taste: string; }) => {
    setStep('generating');
    setError(null);
    try {
      const result = await generateRecipe(ingredients, data.cuisine, data.taste, data.servings, data.method, data.style);
      setRecipe(result);
      setStep('recipe');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe.');
      setStep('customize');
    }
  };
  
  const handleRegenerateRecipe = async (newMethod: string) => {
    if (!ingredients || !recipe || !recipe.cuisine || !recipe.tasteProfile || !recipe.servings || !recipe.cookingStyle) {
        setError("Could not regenerate recipe, missing context. Please start over.");
        handleResetToDashboard();
        return;
    }

    setStep('generating');
    setError(null);
    try {
        const result = await generateRecipe(ingredients, recipe.cuisine, recipe.tasteProfile, recipe.servings, newMethod, recipe.cookingStyle);
        setRecipe(result);
        setStep('recipe');
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to regenerate recipe.');
        setStep('recipe'); // Go back to previous recipe on error
    }
  };

  const resetRecipeState = () => {
    setIngredients('');
    setRecipe(null);
    setError(null);
  }

  const handleResetToDashboard = () => {
    setStep('dashboard');
    resetRecipeState();
  };
  
  const handleHomeClick = () => {
    setShowAuth(false);
    resetRecipeState();
    if (user) {
      setStep('dashboard');
    } else {
      setStep('landing');
    }
  };
  
  const renderContent = () => {
    if (showAuth) {
      return <Auth onLoginSuccess={handleLoginSuccess} onBackToHome={() => { setShowAuth(false); setStep('landing'); }} />;
    }

    if (!user) {
      return <Landing onStartCooking={handleStartCooking} />;
    }

    switch (step) {
      case 'dashboard':
        return <Dashboard onStart={handleDashboardStart} />;
      case 'input':
        return <IngredientInput onSubmit={handleIngredientsSubmit} onBack={handleResetToDashboard} error={error} />;
      case 'customize':
        return <RecipeCustomization ingredients={ingredients} onSubmit={handleCustomizationSubmit} onBack={() => setStep('input')} error={error} />
      case 'generating':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-4 pt-16 animate-fade-in">
            <Loader />
            <p className="text-lg font-semibold text-primary font-display">Crafting your recipe...</p>
            <p className="text-text-secondary">Our AI is getting creative with your taste profile!</p>
          </div>
        );
      case 'recipe':
        return recipe ? <RecipeDisplay recipe={recipe} onReset={handleResetToDashboard} onRegenerate={handleRegenerateRecipe} /> : null;
      default:
        return <Dashboard onStart={handleDashboardStart} />;
    }
  }

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Header user={user} onLogout={handleLogout} onLoginClick={() => setShowAuth(true)} onHomeClick={handleHomeClick} />
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-sm text-slate-400">
        Powered by AI. Always use your best judgment when cooking.
      </footer>
    </div>
  );
};

export default App;