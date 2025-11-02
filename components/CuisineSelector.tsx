import React from 'react';
import { CUISINES } from '../constants';

interface CuisineSelectorProps {
  ingredients: string;
  onSelect: (cuisine: string) => void;
  onBack: () => void;
  error: string | null;
}

const CuisineSelector: React.FC<CuisineSelectorProps> = ({ ingredients, onSelect, onBack, error }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-slide-up text-center">
       <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-4">&larr; Change Ingredients</button>

      <h2 className="text-3xl font-bold font-display mb-2">Pick Your Cuisine</h2>
      <p className="text-text-secondary mb-8">What kind of meal are you in the mood for?</p>
      
      <div className="p-4 bg-surface rounded-xl mb-8">
        <p className="text-text-secondary text-sm mb-1">Your Ingredients:</p>
        <p className="text-text-primary font-medium">{ingredients}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CUISINES.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => onSelect(cuisine)}
            className="p-4 bg-surface border border-border-color rounded-lg text-text-primary font-semibold hover:bg-primary hover:text-background hover:border-primary transition-colors"
          >
            {cuisine}
          </button>
        ))}
      </div>
       {error && (
        <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default CuisineSelector;
