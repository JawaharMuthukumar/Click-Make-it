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
       <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Change Ingredients</button>

      <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 text-text-primary">Pick Your Cuisine</h2>
      <p className="text-text-secondary mb-8">What style of meal are you in the mood for?</p>
      
      <div className="p-4 bg-white border border-border-color rounded-xl mb-8 text-left shadow-sm">
        <p className="text-text-secondary text-sm mb-1 font-medium">Your Ingredients:</p>
        <p className="text-text-primary font-semibold">{ingredients}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {CUISINES.map((cuisine) => (
          <button
            // FIX: Use `cuisine.name` for the key, as `cuisine` is an object.
            key={cuisine.name}
            // FIX: Pass `cuisine.name` (a string) to the `onSelect` handler.
            onClick={() => onSelect(cuisine.name)}
            className="p-4 bg-white border border-border-color rounded-lg text-text-primary font-semibold hover:bg-primary hover:text-white hover:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {/* FIX: Render the `cuisine.name` string, not the `cuisine` object. */}
            {cuisine.name}
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

export default CuisineSelector;
