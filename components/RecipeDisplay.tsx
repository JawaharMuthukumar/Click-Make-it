
import React, { useState } from 'react';
import type { Recipe, DetailedNutrition, User } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { ListChecksIcon } from './icons/ListChecksIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import ChatAssistant from './ChatAssistant';
import { COOKING_METHODS } from '../constants';
import UnlockRecipe from './UnlockRecipe';
import { HeartIcon } from './icons/HeartIcon';

interface RecipeDisplayProps {
  recipe: Recipe;
  user: User | null;
  onReset: () => void;
  onRegenerate: (newMethod: string) => void;
  onUnlockRequest: () => void;
  onBackToOptions: () => void;
  showBackToOptions: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
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

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mt-8 pt-6 border-t border-border-color relative">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-2xl font-bold font-display text-text-primary">{title}</h3>
    </div>
    {children}
  </div>
);

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ 
    recipe, user, onReset, onRegenerate, 
    onUnlockRequest, onBackToOptions, showBackToOptions,
    isFavorite, onToggleFavorite
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const otherMethods = COOKING_METHODS.filter(m => m !== recipe.cookingMethod);
  const isLocked = !user;
  
  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-4">
          {showBackToOptions ? (
            <button 
                onClick={onBackToOptions} 
                className="flex items-center text-sm text-text-secondary hover:text-primary transition-colors"
            >
                &larr; Choose a different dish
            </button>
          ) : (
             <div></div> /* Spacer */
          )}
          
          {!isLocked && (
              <button
                onClick={onToggleFavorite}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${isFavorite ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-border-color text-text-secondary hover:bg-slate-50'}`}
              >
                  <HeartIcon className={`w-5 h-5 ${isFavorite ? 'fill-current text-rose-600' : ''}`} />
                  <span className="text-sm font-medium">{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
          )}
      </div>

      <div className="bg-surface rounded-2xl shadow-lg overflow-hidden relative">
        
        {/* Recipe Image */}
        {recipe.imageBase64 && (
          <div className="w-full h-64 md:h-80 relative">
            <img 
              src={`data:image/jpeg;base64,${recipe.imageBase64}`} 
              alt={recipe.recipeName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 shadow-black drop-shadow-lg">{recipe.recipeName}</h2>
                <p className="text-lg opacity-90 line-clamp-2 drop-shadow-md">{recipe.description}</p>
            </div>
          </div>
        )}
        
        {!recipe.imageBase64 && (
             <div className="p-6 md:p-8 border-b border-border-color">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">{recipe.recipeName}</h2>
                <p className="text-lg text-text-secondary">{recipe.description}</p>
             </div>
        )}

        <div className="p-6 md:p-8 relative">
             {/* Meta Tags */}
             <div className="flex flex-wrap gap-2 mb-6">
                {recipe.country && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                        {recipe.country}
                    </span>
                )}
                {recipe.mealType && (
                    <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium">
                        {recipe.mealType}
                    </span>
                )}
                {recipe.cookingMethod && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        {recipe.cookingMethod}
                    </span>
                )}
             </div>

            {/* Ingredients */}
            <Section title="Ingredients" icon={<LeafIcon className="w-6 h-6 text-primary" />}>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-2 text-text-secondary">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            <span>{ing}</span>
                        </li>
                    ))}
                </ul>
            </Section>

            {/* Instructions (Locked content wrapper) */}
            <div className="relative">
                <Section title="Instructions" icon={<ListChecksIcon className="w-6 h-6 text-primary" />}>
                    <div className="space-y-6">
                        {recipe.instructions.map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-primary font-bold flex items-center justify-center text-sm">
                                    {i + 1}
                                </div>
                                <p className="text-text-secondary leading-relaxed pt-1">{step}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Nutrition" icon={<ChartBarIcon className="w-6 h-6 text-primary" />}>
                    <NutritionInfo nutrition={recipe.nutrition} />
                </Section>

                {isLocked && (
                    <UnlockRecipe onUnlock={onUnlockRequest} />
                )}
            </div>

            {/* Regenerate Actions */}
            {!isLocked && (
                <div className="mt-10 pt-6 border-t border-border-color">
                    <p className="text-sm font-semibold text-text-primary mb-4">Want to try a different cooking method?</p>
                    <div className="flex flex-wrap gap-3">
                        {otherMethods.map(m => (
                            <button
                                key={m}
                                onClick={() => onRegenerate(m)}
                                className="px-4 py-2 border border-border-color rounded-lg text-sm text-text-secondary hover:bg-slate-50 hover:text-primary hover:border-primary transition-colors"
                            >
                                Try {m} Version
                            </button>
                        ))}
                         <button
                            onClick={onReset}
                            className="px-4 py-2 border border-red-200 bg-red-50 rounded-lg text-sm text-red-600 hover:bg-red-100 transition-colors ml-auto"
                        >
                            Start Over
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Chat Button */}
      {!isLocked && (
          <>
            <button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-xl hover:bg-primary-focus hover:scale-105 transition-all z-30 flex items-center gap-2 group"
            >
                <ChatBubbleIcon className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">Ask AI Assistant</span>
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
