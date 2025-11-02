import React from 'react';
import type { Recipe, Macronutrients } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { ListChecksIcon } from './icons/ListChecksIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface RecipeDisplayProps {
  recipe: Recipe;
  onReset: () => void;
}

const MacroBar: React.FC<{ label: string; value: number; color: string; icon: string }> = ({ label, value, color, icon }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`text-3xl font-bold ${color}`}>{value.toFixed(0)}g</div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  );
};

const MacronutrientChart: React.FC<{ macros: Macronutrients }> = ({ macros }) => {
    const { protein, carbohydrates, fat } = macros;
    return (
      <div className="grid grid-cols-3 gap-4 rounded-xl bg-background p-4">
        <MacroBar label="Protein" value={protein} color="text-sky-400" icon="💪" />
        <MacroBar label="Carbs" value={carbohydrates} color="text-amber-400" icon="🍞" />
        <MacroBar label="Fat" value={fat} color="text-rose-400" icon="🥑" />
      </div>
    );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mt-8 pt-6 border-t border-border-color">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-xl font-bold font-display text-text-primary">{title}</h3>
    </div>
    {children}
  </div>
);

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onReset }) => {
  return (
    <div className="animate-fade-in w-full">
      <div className="bg-surface rounded-2xl shadow-lg overflow-hidden p-6 md:p-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">{recipe.recipeName}</h2>
        <p className="mt-2 text-text-secondary">{recipe.description}</p>
        
        <Section title="Ingredients" icon={<LeafIcon className="w-6 h-6 text-primary" />}>
          <ul className="list-disc list-inside space-y-2 text-text-primary">
            {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </Section>
        
        <Section title="Instructions" icon={<ListChecksIcon className="w-6 h-6 text-primary" />}>
          <ol className="list-decimal list-inside space-y-3 text-text-primary">
            {recipe.instructions.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </Section>

        <Section title="Macronutrient Breakdown" icon={<ChartBarIcon className="w-6 h-6 text-primary" />}>
           <MacronutrientChart macros={recipe.macronutrients} />
           <p className="text-xs text-text-secondary mt-3 text-center">Estimates per serving.</p>
        </Section>
      </div>

      <div className="text-center pt-8">
        <button
          onClick={onReset}
          className="font-semibold py-3 px-8 rounded-lg transition-colors duration-300 bg-primary text-background hover:opacity-90"
        >
          Make Another Meal
        </button>
      </div>
    </div>
  );
};

export default RecipeDisplay;
