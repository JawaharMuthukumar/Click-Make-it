import React, { useState } from 'react';
import { CUISINES, TASTE_PROFILES, COOKING_METHODS, COOKING_STYLES, TASTE_SUGGESTIONS } from '../constants';
import { StoveIcon } from './icons/StoveIcon';
import { OvenIcon } from './icons/OvenIcon';
import { NoCookIcon } from './icons/NoCookIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import type { Cuisine } from '../types';

interface RecipeCustomizationProps {
  ingredients: string;
  onSubmit: (data: { servings: number; method: string; style: string; cuisine: string; taste: string; }) => void;
  onBack: () => void;
  error: string | null;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`p-6 bg-white rounded-2xl shadow-md ${className}`}>
        <h3 className="text-lg font-semibold text-text-primary mb-4 text-center sm:text-left">{title}</h3>
        {children}
    </div>
);

const RecipeCustomization: React.FC<RecipeCustomizationProps> = ({ ingredients, onSubmit, onBack, error }) => {
    const [servings, setServings] = useState(2);
    const [method, setMethod] = useState(COOKING_METHODS[0]);
    const [style, setStyle] = useState(COOKING_STYLES[0]);
    const [selectedCuisine, setSelectedCuisine] = useState<Cuisine>(CUISINES[0]);
    const [selectedStyleName, setSelectedStyleName] = useState<string | null>(null);
    const [taste, setTaste] = useState(TASTE_PROFILES[0]);

    const handleServingsChange = (amount: number) => {
        setServings(prev => Math.max(1, prev + amount));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalCuisine = selectedStyleName ? `${selectedCuisine.name} (${selectedStyleName})` : selectedCuisine.name;
        onSubmit({ servings, method, style, cuisine: finalCuisine, taste });
    };

    const methodIcons: { [key: string]: React.ReactNode } = {
        'Stove': <StoveIcon className="w-8 h-8"/>,
        'Oven': <OvenIcon className="w-8 h-8"/>,
        'No-Cook': <NoCookIcon className="w-8 h-8"/>
    };

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-slide-up">
            <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Change Ingredients</button>
            
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 text-text-primary">Customize Your Meal</h2>
                <p className="text-text-secondary">Fine-tune the details to create the perfect dish.</p>
            </div>
            
            <div className="p-4 bg-white border border-border-color rounded-xl mb-8 text-left shadow-sm">
                <p className="text-text-secondary text-sm mb-1 font-medium">Your Ingredients:</p>
                <p className="text-text-primary font-semibold">{ingredients}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Section title="Servings">
                        <div className="flex items-center justify-center gap-4">
                            <button type="button" onClick={() => handleServingsChange(-1)} className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 font-bold text-2xl flex items-center justify-center hover:bg-slate-300 transition-colors">-</button>
                            <span className="text-2xl font-bold font-display text-primary w-12 text-center">{servings}</span>
                            <button type="button" onClick={() => handleServingsChange(1)} className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 font-bold text-2xl flex items-center justify-center hover:bg-slate-300 transition-colors">+</button>
                        </div>
                    </Section>
                    <Section title="Cooking Style">
                         <div className="grid grid-cols-2 gap-3">
                            {COOKING_STYLES.map(s => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setStyle(s)}
                                    className={`p-3 border text-sm rounded-lg font-semibold transition-colors ${style === s ? 'bg-primary text-white border-primary' : 'bg-surface border-border-color text-text-primary hover:bg-slate-50'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </Section>
                </div>

                <Section title="Primary Appliance">
                    <div className="grid grid-cols-3 gap-4">
                        {COOKING_METHODS.map(m => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMethod(m)}
                                className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all duration-200 ${method === m ? 'bg-emerald-50 border-primary text-primary' : 'bg-surface border-border-color text-text-secondary hover:border-primary/50'}`}
                            >
                                {methodIcons[m]}
                                <span className="font-semibold">{m}</span>
                            </button>
                        ))}
                    </div>
                </Section>
                
                <Section title="Cuisine">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {CUISINES.map(c => (
                            <button
                                key={c.name}
                                type="button"
                                onClick={() => {
                                    setSelectedCuisine(c);
                                    setSelectedStyleName(null);
                                }}
                                className={`p-3 border text-sm rounded-lg font-semibold transition-colors ${selectedCuisine.name === c.name ? 'bg-primary text-white border-primary' : 'bg-surface border-border-color text-text-primary hover:bg-slate-50'}`}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-left text-sm">
                        <p><span className="font-bold text-slate-600">About {selectedCuisine.name}:</span> {selectedCuisine.description}</p>
                    </div>

                    {selectedCuisine.styles && selectedCuisine.styles.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-border-color animate-fade-in">
                            <h4 className="text-md font-semibold text-text-primary mb-3 text-center sm:text-left">Refine Style for {selectedCuisine.name}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {selectedCuisine.styles.map(s => (
                                    <button
                                        key={s.name}
                                        type="button"
                                        onClick={() => setSelectedStyleName(s.name)}
                                        className={`p-3 border text-sm rounded-lg font-semibold transition-colors ${selectedStyleName === s.name ? 'bg-primary text-white border-primary' : 'bg-surface border-border-color text-text-primary hover:bg-slate-50'}`}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                            {selectedStyleName && (
                                <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-left text-sm">
                                    <p><span className="font-bold text-slate-600">About {selectedStyleName}:</span> {selectedCuisine.styles.find(s => s.name === selectedStyleName)?.description}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Section>


                <Section title="Taste Profile">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {TASTE_PROFILES.map(t => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setTaste(t)}
                                className={`p-3 border text-sm rounded-lg font-semibold transition-colors ${taste === t ? 'bg-primary text-white border-primary' : 'bg-surface border-border-color text-text-primary hover:bg-slate-50'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-left text-sm">
                        <p><span className="font-bold">Tip:</span> {TASTE_SUGGESTIONS[taste]}</p>
                    </div>
                </Section>
                
                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-center" role="alert">
                        <strong className="font-bold">An error occurred: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-center gap-3 transition-all hover:bg-primary-focus hover:shadow-lg transform hover:-translate-y-1"
                >
                    <SparklesIcon className="w-6 h-6" />
                    Generate My Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipeCustomization;