import React, { useState, useRef } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { KeyboardIcon } from './icons/KeyboardIcon';

interface IngredientInputProps {
  inputType: 'text' | 'image';
  onSubmit: (data: string | File) => void;
  onBack: () => void;
  error: string | null;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ inputType, onSubmit, onBack, error }) => {
  const [textIngredients, setTextIngredients] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      onSubmit(file);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textIngredients.trim()) {
      onSubmit(textIngredients.trim());
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-slide-up text-center">
      <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-4">&larr; Go Back</button>
      
      <h2 className="text-3xl font-bold font-display mb-2">What do you have right now?</h2>
      <p className="text-text-secondary mb-8">List your ingredients or upload a photo of them.</p>

      {inputType === 'text' ? (
        <form onSubmit={handleTextSubmit} className="space-y-4">
          <textarea
            value={textIngredients}
            onChange={(e) => setTextIngredients(e.target.value)}
            placeholder="e.g., chicken breast, tomatoes, rice, onion, garlic..."
            className="w-full h-32 p-4 bg-surface border-2 border-border-color rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition"
            aria-label="Enter ingredients"
          />
          <button
            type="submit"
            disabled={!textIngredients.trim()}
            className="w-full bg-primary text-background font-bold py-3 px-6 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next: Choose Cuisine
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Ingredients preview" className="max-h-64 w-auto rounded-xl shadow-lg"/>
          ) : (
            <div 
              onClick={triggerFileSelect}
              className="w-full h-48 border-2 border-dashed border-border-color rounded-xl flex flex-col items-center justify-center text-text-secondary hover:bg-surface cursor-pointer transition"
            >
              <CameraIcon className="w-10 h-10 mb-2" />
              <p className="font-semibold">Tap to open camera or upload</p>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
