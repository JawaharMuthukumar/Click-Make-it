import React, { useState, useRef } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { KeyboardIcon } from './icons/KeyboardIcon';

interface IngredientInputProps {
  onSubmit: (data: string | File, type: 'text' | 'image') => void;
  onBack: () => void;
  error: string | null;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onSubmit, onBack, error }) => {
  const [textIngredients, setTextIngredients] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSubmit(file, 'image');
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textIngredients.trim()) {
      onSubmit(textIngredients.trim(), 'text');
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in-slide-up text-center">
      <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Back to Cooking Setup</button>
      
      <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 text-text-primary">What ingredients do you have?</h2>
      <p className="text-text-secondary mb-8">List your ingredients below, or upload a photo of them.</p>

      {/* Text Input Form */}
      <form onSubmit={handleTextSubmit} className="space-y-4 mb-6">
        <textarea
          value={textIngredients}
          onChange={(e) => setTextIngredients(e.target.value)}
          placeholder="e.g., chicken breast, tomatoes, rice, onion, garlic..."
          className="w-full h-36 p-4 bg-surface border-2 border-border-color rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition"
          aria-label="Enter ingredients"
        />
        <button
          type="submit"
          disabled={!textIngredients.trim()}
          className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <KeyboardIcon className="w-6 h-6" />
          <span>Use These Ingredients</span>
        </button>
      </form>
      
      <div className="flex items-center my-6">
        <hr className="flex-grow border-border-color"/>
        <span className="mx-4 text-sm font-semibold text-text-secondary">OR</span>
        <hr className="flex-grow border-border-color"/>
      </div>
      
      {/* Image Input */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button 
          onClick={triggerFileSelect}
          className="w-full border-2 border-dashed border-border-color rounded-2xl p-8 flex flex-col items-center justify-center text-text-secondary hover:bg-slate-100 hover:border-primary cursor-pointer transition-colors"
        >
          <CameraIcon className="w-12 h-12 mb-4 text-primary" />
          <p className="font-semibold text-lg text-text-primary">Tap to upload or take a photo</p>
          <p className="text-sm">Our AI will identify the ingredients for you.</p>
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">An error occurred: </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;