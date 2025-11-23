import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';
import type { User } from '../types';
import UserButton from './UserButton';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onHomeClick: () => void;
  onPricingClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onLoginClick, onHomeClick, onPricingClick }) => {
  return (
    <header className="py-3 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={onHomeClick} className="flex items-center gap-2 text-left p-1 -ml-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-shadow">
            <ChefHatIcon className="w-8 h-8 text-primary" />
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold text-text-primary font-display leading-none">
                Foody Makeit
              </h1>
              <span className="text-xs font-medium text-text-secondary mt-0.5">AI Meal Maker</span>
            </div>
          </button>
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-6">
              <button onClick={onPricingClick} className="font-semibold text-sm text-text-secondary hover:text-text-primary transition-colors">
                Pricing
              </button>
              <a href="#" className="font-semibold text-sm text-text-secondary hover:text-text-primary transition-colors">
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <UserButton user={user} onLogout={onLogout} onPricingClick={onPricingClick} />
              ) : (
                 <button
                  onClick={onLoginClick}
                  className="font-semibold text-sm bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-focus transition-colors"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;