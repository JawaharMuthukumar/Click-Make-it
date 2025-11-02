import React from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { KeyboardIcon } from './icons/KeyboardIcon';

interface LandingProps {
  onStart: (type: 'text' | 'image') => void;
}

const features = [
    { name: 'AI Ingredient Recognition', description: 'Detects what’s in your kitchen from a photo or text.' },
    { name: 'Multi-Cuisine Recipe Generator', description: 'Choose Indian, Italian, or Mexican — get recipes that *actually make sense.*' },
    { name: 'Step-by-Step Guidance', description: 'Clear, simple instructions — no chef skills required.' },
    { name: 'Macronutrient Breakdown', description: 'Know protein, carbs, and fat for every dish — instantly.' },
];

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in-slide-up">
      <section className="text-center pt-8 md:pt-12">
        <h1 className="text-4xl md:text-6xl font-bold font-display text-text-primary leading-tight tracking-tighter">
          Turn Whatever You Have Into a <span className="text-primary">Real Meal</span>. Instantly.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-text-secondary">
          No scrolling recipes, no guesswork, no planning.
          <br />
          Just snap &rarr; choose cuisine &rarr; cook.
        </p>
      </section>

      <section className="max-w-3xl mx-auto">
        <table className="w-full text-left border-collapse">
            <tbody>
                {features.map(feature => (
                     <tr key={feature.name} className="border-b border-border-color">
                        <td className="py-4 pr-4 font-semibold text-text-primary">{feature.name}</td>
                        <td className="py-4 text-text-secondary">{feature.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </section>

      <section className="text-center">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-widest">In 3 Seconds</h2>
        <div className="mt-4 max-w-3xl mx-auto grid md:grid-cols-3 gap-8 text-lg">
            <p>Upload or snap, or chat your ingredients</p>
            <p>Pick your cuisine</p>
            <p>Get a recipe you can make right now</p>
        </div>
        <p className="mt-6 text-text-secondary">No overwhelm. No bullshit. Just cooking that works.</p>
      </section>

      <section className="bg-surface rounded-2xl p-6 md:p-8 text-center">
        <h2 className="text-3xl font-bold font-display">Let's Cook</h2>
        <p className="mt-2 text-text-secondary">What do you have right now?</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onStart('image')}
            className="w-full sm:w-auto bg-background border-2 border-border-color text-text-primary font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-border-color"
          >
            <CameraIcon className="w-6 h-6" />
            <span>Take Photo</span>
          </button>
          <button
            onClick={() => onStart('text')}
            className="w-full sm:w-auto bg-background border-2 border-border-color text-text-primary font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-border-color"
          >
            <KeyboardIcon className="w-6 h-6" />
            <span>Enter Ingredients</span>
          </button>
        </div>
         <p className="mt-4 text-xs text-text-secondary">Supports veggies, spices, packaged items — if it’s edible, we recognize it.</p>
      </section>
    </div>
  );
};

export default Landing;
