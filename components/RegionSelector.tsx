import React, { useState } from 'react';
import { GlobeIcon } from './icons/GlobeIcon';

interface RegionSelectorProps {
  onSelect: (data: { country: string; state: string }) => void;
  onBack: () => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelect, onBack }) => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (country.trim()) {
      onSelect({ country: country.trim(), state: state.trim() });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in-slide-up text-center">
      <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Back</button>
      
      <div className="flex items-center justify-center gap-3 mb-2">
        <GlobeIcon className="w-9 h-9 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Where are we cooking today?</h2>
      </div>
      <p className="text-text-secondary mb-8">Enter a country and an optional region to get started.</p>

      <form onSubmit={handleSubmit} className="space-y-6 mb-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-text-primary text-left mb-1">Country *</label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g., Italy, Thailand, Mexico"
            className="w-full p-3 bg-surface border-2 border-border-color rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-text-primary text-left mb-1">Region / State (Optional)</label>
          <input
            id="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="e.g., Tuscany, Chiang Mai, Oaxaca"
            className="w-full p-3 bg-surface border-2 border-border-color rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition"
          />
        </div>
        <button
          type="submit"
          disabled={!country.trim()}
          className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default RegionSelector;
