import React, { useState } from 'react';
import { COOKING_METHODS, COOKING_STYLES } from '../constants';
import { StoveIcon } from './icons/StoveIcon';
import { OvenIcon } from './icons/OvenIcon';
import { NoCookIcon } from './icons/NoCookIcon';

interface CookingSetupProps {
  onSubmit: (data: { servings: number; method: string; style: string; }) => void;
  onBack: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">{title}</h3>
        {children}
    </div>
);

const CookingSetup: React.FC<CookingSetupProps> = ({ onSubmit, onBack }) => {
    const [servings, setServings] = useState(2);
    const [method, setMethod] = useState(COOKING_METHODS[0]);
    const [style, setStyle] = useState(COOKING_STYLES[0]);

    const handleServingsChange = (amount: number) => {
        setServings(prev => Math.max(1, prev + amount));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ servings, method, style });
    };

    const methodIcons: { [key: string]: React.ReactNode } = {
        'Stove': <StoveIcon className="w-8 h-8"/>,
        'Oven': <OvenIcon className="w-8 h-8"/>,
        'No-Cook': <NoCookIcon className="w-8 h-8"/>
    };

    return (
        <div className="w-full max-w-xl mx-auto animate-fade-in-slide-up">
            <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Back to Dashboard</button>
            
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 text-text-primary">Your Cooking Setup</h2>
                <p className="text-text-secondary">Tell us a bit about your kitchen and preferences.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
                <Section title="How many people are you cooking for?">
                    <div className="flex items-center justify-center gap-4">
                        <button type="button" onClick={() => handleServingsChange(-1)} className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 font-bold text-2xl flex items-center justify-center hover:bg-slate-300 transition-colors">-</button>
                        <span className="text-2xl font-bold font-display text-primary w-12 text-center">{servings}</span>
                        <button type="button" onClick={() => handleServingsChange(1)} className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 font-bold text-2xl flex items-center justify-center hover:bg-slate-300 transition-colors">+</button>
                    </div>
                </Section>

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

                <Section title="Cooking Style">
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                
                <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg transition-all hover:bg-primary-focus"
                >
                    Next: Add Ingredients
                </button>
            </form>
        </div>
    );
};

export default CookingSetup;