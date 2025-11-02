import React, { useState } from 'react';
import type { Recipe, DetailedNutrition } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { ListChecksIcon } from './icons/ListChecksIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import ChatAssistant from './ChatAssistant';

interface RecipeDisplayProps {
  recipe: Recipe;
  onReset: () => void;
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
  <div className="mt-8 pt-6 border-t border-border-color">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-2xl font-bold font-display text-text-primary">{title}</h3>
    </div>
    {children}
  </div>
);

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onReset }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <div className="animate-fade-in w-full">
      <div className="bg-surface rounded-2xl shadow-lg overflow-hidden p-6 md:p-8">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">{recipe.recipeName}</h2>
        <p className="mt-3 text-lg text-text-secondary">{recipe.description}</p>
        
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
          <ol className="space-y-4 text-text-primary">
            {recipe.instructions.map((step, index) => 
              <li key={index} className="flex items-start">
                <span className="font-bold font-display text-primary mr-4">{index + 1}.</span>
                <span>{step}</span>
              </li>
            )}
          </ol>
        </Section>

        <Section title="Nutrition Details" icon={<ChartBarIcon className="w-7 h-7 text-primary" />}>
           <NutritionInfo nutrition={recipe.nutrition} />
        </Section>
      </div>

      <div className="text-center pt-8">
        <button
          onClick={onReset}
          className="font-semibold py-3 px-8 rounded-lg transition-all duration-300 bg-primary text-white hover:bg-primary-focus shadow-md hover:shadow-lg"
        >
          Make Another Meal
        </button>
      </div>

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
    </div>
  );
};

export default RecipeDisplay;