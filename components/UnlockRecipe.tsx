import React from 'react';
import { LockIcon } from './icons/LockIcon';

interface UnlockRecipeProps {
    onUnlock: () => void;
}

const UnlockRecipe: React.FC<UnlockRecipeProps> = ({ onUnlock }) => {
    return (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl p-4">
            <div className="text-center bg-surface p-6 rounded-2xl shadow-lg border border-border-color">
                <LockIcon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-bold font-display text-text-primary">Unlock Full Recipe</h3>
                <p className="text-text-secondary mt-1 mb-4 text-sm max-w-xs">Sign up or log in to view step-by-step instructions and nutrition details.</p>
                <button
                    onClick={onUnlock}
                    className="bg-primary text-white font-bold py-2 px-6 rounded-lg transition-all hover:bg-primary-focus"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default UnlockRecipe;
