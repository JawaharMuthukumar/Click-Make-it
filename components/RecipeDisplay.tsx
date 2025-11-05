import React, { useState } from 'react';
import type { Recipe, DetailedNutrition, User } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { ListChecksIcon } from './icons/ListChecksIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import ChatAssistant from './ChatAssistant';
import { COOKING_METHODS } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';
import UnlockRecipe from './UnlockRecipe';

interface RecipeDisplayProps {
  recipe: Recipe;
  user: User | null;
  onReset: () => void;
  onRegenerate: (newMethod: string) => void;
  onUnlockRequest: () => void;
}

const NutritionInfo: React.FC<{ nutrition: DetailedNutrition }> = ({ nutrition }) => {
  const { calories, protein, carbohydrates, fat } = nutrition;
  
  const macroItems = [
    { label: 'Protein', value: protein.amount, source: protein.source, color: 'text-sky-500' },
    { label: 'Carbs', value: carbohydrates.amount, source: carbohydrates.source, color: 'text-amber-500' },
    { label: 'Fat', value: fat.amount, source: fat.source, color: 'text-rose-500' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center bg-slate-100 rounded-xl p-4">
        <p className="text-2xl font-bold text-text-primary">{calories}</p>
        <p className="text-sm text-text-secondary font-medium">Estimated Nutrition per Serving</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {macroItems.map(item => (
          <div key={item.label} className="bg-slate-100 rounded-xl p-4 text-center md:text-left">
            <p className={`font-bold text-lg ${item.color}`}>{item.value}</p>
            <p className="text-sm font-semibold text-text-primary">{item.label}</p>
            <p className="text-xs text-text-secondary mt-1">{item.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; isLocked?: boolean }> = ({ title, icon, children, isLocked = false }) => (
  <div className="mt-8 pt-6 border-t border-border-color relative">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-2xl font-bold font-display text-text-primary">{title}</h3>
    </div>
    {children}
  </div>
);

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, user, onReset, onRegenerate, onUnlockRequest }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const otherMethods = COOKING_METHODS.filter(m => m !== recipe.cookingMethod);
  const isLocked = !user;
  
  return (
    <div className="animate-fade-in w-full">
      <div className="bg-surface rounded-2xl shadow-lg overflow-hidden p-6 md:p-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">{recipe.recipeName}</h2>
            {recipe.servings && (
                <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">
                    Serves {recipe.servings}
                </span>
            )}
             {recipe.creativityLevel && (
                <span className="bg-sky-100 text-sky-800 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <SparklesIcon className="w-4 h-4" />
                    {recipe.creativityLevel}
                </span>
            )}
        </div>
        <p className="mt-3 text-lg text-text-secondary">{recipe.description}</p>
        
        {/* Change Method Section */}
        {recipe.cookingMethod && otherMethods.length > 0 && (
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-border-color">
            <p className="text-sm font-semibold text-text-primary mb-2">
              This recipe is for a <span className="font-bold">{recipe.cookingMethod}</span>. Want to try a different method?
            </p>
            <div className="flex gap-2">
              {otherMethods.map(method => (
                <button
                  key={method}
                  onClick={() => onRegenerate(method)}
                  className="bg-white border border-border-color text-sm text-text-primary font-semibold px-3 py-1 rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                  Make it in the {method}
                </button>
              ))}
            </div>
          </div>
        )}

        <Section title="Ingredients" icon={<LeafIcon className="w-7 h-7 text-primary" />}>
          <ul className="space-y-2 text-text-primary pl-1">
            {recipe.ingredients.map((item, index) => 
              <li key={index} className="flex items-start">
                <span className="text-primary mr-3 mt-1">&#10003;</span>
                <span>{item}</span>
              </li>
            )}
          </ul>
        </Section>
        
        <Section title="Instructions" icon={<ListChecksIcon className="w-7 h-7 text-primary" />}>
          <div className="relative">
            {isLocked && <UnlockRecipe onUnlock={onUnlockRequest} />}
            <ol className={`space-y-4 text-text-primary transition-all duration-300 ${isLocked ? 'blur-sm select-none' : ''}`}>
              {recipe.instructions.map((step, index) => 
                <li key={index} className="flex items-start">
                  <span className="font-bold font-display text-primary mr-4">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              )}
            </ol>
          </div>
        </Section>

        <Section title="Nutrition Details" icon={<ChartBarIcon className="w-7 h-7 text-primary" />}>
          <div className="relative">
            {isLocked && <UnlockRecipe onUnlock={onUnlockRequest} />}
            <div className={`transition-all duration-300 ${isLocked ? 'blur-sm select-none' : ''}`}>
              <NutritionInfo nutrition={recipe.nutrition} />
            </div>
          </div>
        </Section>
      </div>

      <div className="text-center pt-8">
        <button
          onClick={onReset}
          className="font-semibold py-3 px-8 rounded-lg transition-all duration-300 bg-primary text-white hover:bg-primary-focus shadow-md hover:shadow-lg"
        >
          {isLocked ? 'Start Over' : 'Make Another Meal'}
        </button>
      </div>

      {!isLocked && (
        <>
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-110 z-50"
          aria-label="Open AI Assistant"
        >
          <ChatBubbleIcon className="w-8 h-8" />
        </button>

        {isChatOpen && (
          <ChatAssistant recipe={recipe} onClose={() => setIsChatOpen(false)} />
        )}
        </>
      )}
    </div>
  );
};

export default RecipeDisplay;
