import React from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { KeyboardIcon } from './icons/KeyboardIcon';

interface DashboardProps {
  onStart: (type: 'text' | 'image') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-slide-up">
      <section className="bg-white rounded-2xl p-6 md:p-10 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Let's Get Cooking</h2>
        <p className="mt-3 text-lg text-text-secondary">What ingredients do you have right now?</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onStart('image')}
            className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:bg-primary-focus transform hover:-translate-y-0.5"
          >
            <CameraIcon className="w-6 h-6" />
            <span>Take a Photo</span>
          </button>
          <button
            onClick={() => onStart('text')}
            className="w-full sm:w-auto bg-white border-2 border-border-color text-text-primary font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:bg-slate-100 transform hover:-translate-y-0.5"
          >
            <KeyboardIcon className="w-6 h-6" />
            <span>Enter Ingredients</span>
          </button>
        </div>
         <p className="mt-6 text-sm text-slate-400">Supports veggies, spices, packaged items — if it’s edible, our AI will recognize it.</p>
      </section>
    </div>
  );
};

export default Dashboard;
