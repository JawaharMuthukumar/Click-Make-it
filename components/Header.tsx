import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onLoginClick, onHomeClick }) => {
  return (
    <header className="py-4 border-b border-border-color">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <button onClick={onHomeClick} className="flex items-center gap-3 text-left p-1 -ml-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-shadow">
            <ChefHatIcon className="w-9 h-9 text-primary" />
            <h1 className="text-2xl font-bold text-text-primary font-display">
              Click & Make It
            </h1>
          </button>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-text-secondary hidden sm:block">{user.email}</span>
                <button
                  onClick={onLogout}
                  className="font-semibold text-sm text-primary hover:text-primary-focus transition-colors"
                >
                  Logout
                </button>
              </>
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
    </header>
  );
};

export default Header;