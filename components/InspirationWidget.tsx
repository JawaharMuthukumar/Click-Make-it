
import React, { useState } from 'react';
import { getInspiration } from '../services/geminiService';
import { LightbulbIcon } from './icons/LightbulbIcon';
import Loader from './Loader';

const InspirationWidget: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setIsLoading(true);
    setError(null);
    setIdeas([]);
    try {
      const result = await getInspiration(ingredients);
      setIdeas(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not fetch ideas.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-primary/20 group">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="relative">
             {/* Glow effect behind bulb */}
             <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full scale-150"></div>
             <LightbulbIcon className="w-10 h-10 text-primary relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-yellow-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary group-hover:text-primary transition-colors duration-300">Stuck for Ideas?</h2>
      </div>
      <p className="mt-2 max-w-xl mx-auto text-lg text-text-secondary transition-colors group-hover:text-text-primary">
        Enter one or two ingredients and let our AI spark some culinary inspiration!
      </p>
      
      <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., Paneer, spinach..."
          className="flex-grow w-full px-4 py-3 bg-slate-50 border-2 border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-md focus:scale-[1.02]"
          disabled={isLoading}
          aria-label="Enter ingredients for inspiration"
        />
        <button
          type="submit"
          disabled={isLoading || !ingredients.trim()}
          className="bg-primary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-primary-focus hover:shadow-lg hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? <Loader /> : 'Get Ideas'}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-center animate-shake" role="alert">
            <strong className="font-bold">An error occurred: </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="mt-8">
            <p className="font-semibold text-text-primary animate-fade-in">Here are a few ideas for you:</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
                {ideas.map((idea, index) => (
                    <span 
                        key={index} 
                        className="bg-emerald-100 text-emerald-800 text-md font-semibold px-4 py-2 rounded-full shadow-sm animate-fade-in-slide-up hover:bg-emerald-200 hover:shadow-md hover:scale-110 transition-all duration-300 cursor-default"
                        style={{ 
                            animationDelay: `${index * 150}ms`, 
                            opacity: 0, 
                            animationFillMode: 'forwards' 
                        }}
                    >
                        ✨ {idea}
                    </span>
                ))}
            </div>
        </div>
      )}

    </div>
  );
};

export default InspirationWidget;
