import React from 'react';
import { TASTE_PROFILES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface TasteSelectorProps {
  ingredients: string;
  cuisine: string;
  onSelect: (taste: string) => void;
  onBack: () => void;
  error: string | null;
}

const TasteSelector: React.FC<TasteSelectorProps> = ({ ingredients, cuisine, onSelect, onBack, error }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-slide-up text-center">
       <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Change Cuisine</button>

      <div className="flex items-center justify-center gap-3 mb-2">
        <SparklesIcon className="w-9 h-9 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Fantasy Taste Bites</h2>
      </div>
      <p className="text-text-secondary mb-8">Choose a taste profile to customize your meal!</p>
      
      <div className="p-4 bg-white border border-border-color rounded-xl mb-8 text-left shadow-sm space-y-2">
        <div>
            <p className="text-text-secondary text-sm mb-1 font-medium">Your Ingredients:</p>
            <p className="text-text-primary font-semibold">{ingredients}</p>
        </div>
        <div>
            <p className="text-text-secondary text-sm mb-1 font-medium">Your Cuisine:</p>
            <p className="text-text-primary font-semibold">{cuisine}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {TASTE_PROFILES.map((taste) => (
          <button
            key={taste}
            onClick={() => onSelect(taste)}
            className="p-4 bg-white border border-border-color rounded-lg text-text-primary font-semibold hover:bg-primary hover:text-white hover:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {taste}
          </button>
        ))}
      </div>
       {error && (
        <div className="mt-6 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">An error occurred: </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default TasteSelector;
