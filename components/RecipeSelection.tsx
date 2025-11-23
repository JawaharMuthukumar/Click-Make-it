import React from 'react';
import type { DishOption } from '../types';
import Loader from './Loader';

interface RecipeSelectionProps {
  options: DishOption[];
  onSelect: (option: DishOption) => void;
  onBack: () => void;
}

const RecipeSelection: React.FC<RecipeSelectionProps> = ({ options, onSelect, onBack }) => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in-slide-up pb-10">
      <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Back to Customization</button>
      
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-3 text-text-primary">Choose Your Meal</h2>
        <p className="text-text-secondary text-lg">We found a few delicious options based on your ingredients.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {options.map((option, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-border-color flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
              {option.imageBase64 ? (
                <img 
                  src={`data:image/jpeg;base64,${option.imageBase64}`} 
                  alt={option.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-secondary">
                    <Loader />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold font-display text-text-primary mb-2 group-hover:text-primary transition-colors">{option.name}</h3>
              <p className="text-text-secondary text-sm flex-grow mb-6 leading-relaxed">{option.description}</p>
              
              <button
                onClick={() => onSelect(option)}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:bg-primary-focus hover:shadow-lg"
              >
                Cook This Dish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSelection;