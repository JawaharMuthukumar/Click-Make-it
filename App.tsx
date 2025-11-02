import React, { useState, useCallback } from 'react';
import type { Recipe, User } from './types';
import Header from './components/Header';
import Auth from './components/Auth';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import IngredientInput from './components/IngredientInput';
import CuisineSelector from './components/CuisineSelector';
import RecipeDisplay from './components/RecipeDisplay';
import Loader from './components/Loader';
import TasteSelector from './components/TasteSelector';
import { extractIngredientsFromImage, generateRecipe } from './services/geminiService';


type AppStep = 'landing' | 'dashboard' | 'input' | 'cuisine' | 'taste' | 'generating' | 'recipe';
type InputType = 'text' | 'image';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  
  const [step, setStep] = useState<AppStep>('landing');
  const [inputType, setInputType] = useState<InputType>('text');
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = (email: string) => {
    setUser({ email });
    setShowAuth(false);
    setStep('dashboard'); // Go to dashboard after login
  };

  const handleLogout = () => {
    setUser(null);
    setStep('landing'); // Go to landing page after logout
    resetRecipeState();
  };

  const handleStartCooking = () => {
    if (user) {
      setStep('dashboard');
    } else {
      setShowAuth(true);
    }
  };
  
  const handleInputTypeSelect = (type: InputType) => {
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

  const handleCuisineSelect = async (selectedCuisine: string) => {
    setCuisine(selectedCuisine);
    setStep('taste');
  };

  const handleTasteSelect = async (tasteProfile: string) => {
    setStep('generating');
    setError(null);
    try {
      const result = await generateRecipe(ingredients, cuisine, tasteProfile);
      setRecipe(result);
      setStep('recipe');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe.');
      setStep('taste');
    }
  };

  const resetRecipeState = () => {
    setIngredients('');
    setCuisine('');
    setRecipe(null);
    setError(null);
  }

  const handleResetToDashboard = () => {
    setStep('dashboard');
    resetRecipeState();
  };
  
  const renderContent = () => {
    if (showAuth) {
      return <Auth onLoginSuccess={handleLoginSuccess} onBackToHome={() => { setShowAuth(false); }} />;
    }

    // Show landing page if not logged in, otherwise determine step
    if (!user) {
      return <Landing onStartCooking={handleStartCooking} />;
    }

    switch (step) {
      case 'dashboard':
        return <Dashboard onStart={handleInputTypeSelect} />;
      case 'input':
        return <IngredientInput inputType={inputType} onSubmit={handleIngredientsSubmit} onBack={handleResetToDashboard} error={error} />;
      case 'cuisine':
        return <CuisineSelector ingredients={ingredients} onSelect={handleCuisineSelect} onBack={() => setStep('input')} error={error}/>;
      case 'taste':
        return <TasteSelector ingredients={ingredients} cuisine={cuisine} onSelect={handleTasteSelect} onBack={() => setStep('cuisine')} error={error} />;
      case 'generating':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-4 pt-16 animate-fade-in">
            <Loader />
            <p className="text-lg font-semibold text-primary font-display">Crafting your recipe...</p>
            <p className="text-text-secondary">Our AI is getting creative with your taste profile!</p>
          </div>
        );
      case 'recipe':
        return recipe ? <RecipeDisplay recipe={recipe} onReset={handleResetToDashboard} /> : null;
      default:
        return <Dashboard onStart={handleInputTypeSelect} />;
    }
  }

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Header user={user} onLogout={handleLogout} onLoginClick={() => setShowAuth(true)} />
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