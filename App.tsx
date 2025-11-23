
import React, { useState, useEffect } from 'react';
import type { Recipe, User, DishOption } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import RecipeCustomization from './components/RecipeCustomization';
import RecipeSelection from './components/RecipeSelection';
import RecipeDisplay from './components/RecipeDisplay';
import Loader from './components/Loader';
import Pricing from './components/Pricing';
import { generateRecipe, generateDishOptions } from './services/geminiService';
import { subscribeToAuthChanges, logout as logoutService } from './services/authService';
import { MenuIcon } from './components/icons/MenuIcon';

type AppStep = 'landing' | 'dashboard' | 'customize' | 'generating' | 'selection' | 'recipe' | 'pricing';

// Helper type to store customization data between steps
interface CustomizationData {
  ingredients: string;
  country: string;
  state: string;
  mealType: string;
  servings: number;
  method: string;
  style: string;
  taste: string;
  creativity: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [step, setStep] = useState<AppStep>('landing');
  const [location, setLocation] = useState<{ country: string; state: string; } | null>(null);
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data Persistence
  const [history, setHistory] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // State for the recipe generation flow
  const [pendingCustomization, setPendingCustomization] = useState<CustomizationData | null>(null);
  const [dishOptions, setDishOptions] = useState<DishOption[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load data from local storage on mount
  useEffect(() => {
    if (user) {
        const savedHistory = localStorage.getItem(`history_${user.email}`);
        const savedFavorites = localStorage.getItem(`favorites_${user.email}`);
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    }
  }, [user]);

  // Save data when updated
  useEffect(() => {
    if (user) {
        localStorage.setItem(`history_${user.email}`, JSON.stringify(history));
        localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites));
    }
  }, [history, favorites, user]);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
        setUser(currentUser);
        if (currentUser) {
            if (currentUser.country) {
              setLocation({ country: currentUser.country, state: currentUser.state || '' });
            }
            // If we are on landing, move to dashboard automatically on login
            setStep((prev) => (prev === 'landing' || prev === 'pricing' ? 'dashboard' : prev));
        }
        setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.country) {
      setLocation({ country: loggedInUser.country, state: loggedInUser.state || '' });
    }
    setShowAuth(false);
    if (!recipe) {
      setStep('dashboard');
    }
  };

  const handleLogout = async () => {
    await logoutService();
    setUser(null);
    setStep('landing');
    resetRecipeState();
    setIsSidebarOpen(false);
    setHistory([]);
    setFavorites([]);
  };

  const handleStartCooking = () => {
    setShowAuth(true);
  };
  
  const handleDashboardStart = () => {
    setStep('customize');
  };

  const handlePricingClick = () => {
    setStep('pricing');
  };

  const handleCustomizationSubmit = async (data: CustomizationData) => {
    setStep('generating');
    setError(null);
    setPendingCustomization(data);
    setLocation({ country: data.country, state: data.state });

    try {
      const options = await generateDishOptions(
        data.ingredients,
        data.country,
        data.state,
        data.mealType,
        data.taste,
        data.method,
        data.style,
        data.creativity
      );
      setDishOptions(options);
      setStep('selection');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate dish ideas.');
      setStep('customize');
    }
  };

  const handleDishSelect = async (option: DishOption) => {
    if (!pendingCustomization) return;

    setStep('generating');
    setError(null);
    
    try {
        const result = await generateRecipe(
            option.name,
            option.description,
            pendingCustomization.ingredients,
            pendingCustomization.country,
            pendingCustomization.state,
            pendingCustomization.mealType,
            pendingCustomization.taste,
            pendingCustomization.servings,
            pendingCustomization.method,
            pendingCustomization.style,
            pendingCustomization.creativity
        );
        // Attach image and create ID
        const newRecipe: Recipe = {
            ...result,
            imageBase64: option.imageBase64,
            id: crypto.randomUUID(),
            timestamp: Date.now()
        };
        
        setRecipe(newRecipe);
        setHistory(prev => [newRecipe, ...prev]); // Add to history
        setStep('recipe');
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate full recipe.');
        setStep('selection'); 
    }
  };
  
  const handleRegenerateRecipe = async (newMethod: string) => {
    if (!pendingCustomization || !recipe) {
        setError("Could not regenerate recipe, missing context. Please start over.");
        handleStartOver();
        return;
    }

    setStep('generating');
    setError(null);
    try {
        const result = await generateRecipe(
            recipe.recipeName,
            recipe.description,
            pendingCustomization.ingredients,
            pendingCustomization.country,
            pendingCustomization.state,
            pendingCustomization.mealType,
            pendingCustomization.taste,
            pendingCustomization.servings,
            newMethod,
            pendingCustomization.style,
            pendingCustomization.creativity
        );
        
        // Keep existing ID to update it, or create new? Let's create new for history tracking
        const newRecipe: Recipe = {
            ...result,
            imageBase64: recipe.imageBase64,
            id: crypto.randomUUID(),
            timestamp: Date.now()
        };

        setRecipe(newRecipe);
        setHistory(prev => [newRecipe, ...prev]);
        setStep('recipe');
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to regenerate recipe.');
        setStep('recipe'); 
    }
  };

  const handleBackToSelection = () => {
    setStep('selection');
  };

  const resetRecipeState = () => {
    setPendingCustomization(null);
    setDishOptions([]);
    setRecipe(null);
    setError(null);
    setLocation(user?.country ? { country: user.country, state: user.state || '' } : null);
  }

  const handleStartOver = () => {
    resetRecipeState();
    if (user) {
      setStep('dashboard');
    } else {
      setStep('landing');
    }
  };

  const handleHistorySelect = (selectedRecipe: Recipe) => {
      setRecipe(selectedRecipe);
      setStep('recipe');
      // If user selects from history, we might not have the "dishOptions" to go back to
      setDishOptions([]); 
  };

  const toggleFavorite = (recipeId: string) => {
      setFavorites(prev => 
        prev.includes(recipeId) 
            ? prev.filter(id => id !== recipeId)
            : [...prev, recipeId]
      );
  };

  const handlePricingSelect = (plan: string) => {
    if (plan === 'free') {
        if (!user) setShowAuth(true);
        else setStep('dashboard');
    } else {
        alert(`You selected the ${plan} plan. Payment integration coming soon!`);
    }
  };
  
  const renderContent = () => {
    if (showAuth) {
      return <Auth onLoginSuccess={handleLoginSuccess} onBack={() => { setShowAuth(false); }} />;
    }

    switch (step) {
      case 'landing':
        return <Landing onStartCooking={handleStartCooking} />;
      case 'dashboard':
        return user ? <Dashboard onStart={handleDashboardStart} /> : <Landing onStartCooking={handleStartCooking} />;
      case 'customize':
        return <RecipeCustomization 
                  userLocation={location} 
                  onSubmit={handleCustomizationSubmit} 
                  onBack={() => setStep('dashboard')} 
                  error={error} 
                />;
      case 'generating':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-6 pt-24 animate-fade-in">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                <Loader />
            </div>
            <div>
                <p className="text-2xl font-bold text-primary font-display mb-2">
                    {dishOptions.length > 0 ? "Cooking up the details..." : "Dreaming up delicious dishes..."}
                </p>
                <p className="text-text-secondary text-lg">
                    {dishOptions.length > 0 
                        ? "Writing the step-by-step instructions for you." 
                        : `Exploring flavors from ${pendingCustomization?.country || 'around the world'}...`}
                </p>
            </div>
          </div>
        );
      case 'selection':
        return (
            <RecipeSelection 
                options={dishOptions} 
                onSelect={handleDishSelect} 
                onBack={() => setStep('customize')} 
            />
        );
      case 'recipe':
        return recipe ? (
          <RecipeDisplay 
            recipe={recipe} 
            user={user} 
            onReset={handleStartOver} 
            onRegenerate={handleRegenerateRecipe} 
            onUnlockRequest={() => setShowAuth(true)}
            onBackToOptions={handleBackToSelection}
            showBackToOptions={dishOptions.length > 0}
            isFavorite={favorites.includes(recipe.id)}
            onToggleFavorite={() => toggleFavorite(recipe.id)}
          />
        ) : null;
      case 'pricing':
        return <Pricing onBack={handleStartOver} onSelectPlan={handlePricingSelect} />;
      default:
        return user ? <Dashboard onStart={handleDashboardStart} /> : <Landing onStartCooking={handleStartCooking} />;
    }
  }

  if (authLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Loader />
        </div>
      );
  }

  if (step === 'landing') {
      return (
        <div className="min-h-screen font-sans flex flex-col bg-background">
          <Header user={user} onLogout={handleLogout} onLoginClick={() => setShowAuth(true)} onHomeClick={handleStartOver} onPricingClick={handlePricingClick} />
          <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {renderContent()}
          </main>
          <footer className="text-center p-6 text-sm text-slate-400">
            Powered by Foody Makeit AI. Always use your best judgment when cooking.
          </footer>
        </div>
      );
  }

  return (
    <div className="min-h-screen font-sans flex bg-background overflow-hidden">
        <Sidebar 
            user={user} 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onNewMeal={handleStartOver} 
            history={history}
            favorites={favorites}
            onHistorySelect={handleHistorySelect}
            onPricing={handlePricingClick} 
            onLogout={handleLogout} 
            onHome={handleStartOver}
        />
        <main className="flex-1 h-screen overflow-y-auto bg-white relative">
            {/* Mobile Header */}
            <div className="lg:hidden sticky top-0 z-30 bg-surface border-b border-border-color px-4 py-3 flex items-center justify-between shadow-sm">
                <button onClick={() => setIsSidebarOpen(true)} className="text-text-primary p-1 -ml-1 rounded-md hover:bg-slate-100">
                    <MenuIcon className="w-6 h-6" />
                </button>
                <span className="font-display font-bold text-lg text-text-primary">Foody Makeit</span>
                <div className="w-6" /> 
            </div>

            <div className="max-w-5xl mx-auto p-6 md:p-12">
                {renderContent()}
            </div>
             <footer className="text-center p-6 text-sm text-slate-400 mt-auto">
                Powered by Foody Makeit AI. Always use your best judgment when cooking.
            </footer>
        </main>
    </div>
  );
};

export default App;
