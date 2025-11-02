import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';

const Header: React.FC = () => {
  return (
    <header className="py-4">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3">
          <ChefHatIcon className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-text-primary font-display">
            Click & Make It
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
