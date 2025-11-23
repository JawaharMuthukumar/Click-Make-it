
import React from 'react';
import type { User, Recipe } from '../types';
import { ChefHatIcon } from './icons/ChefHatIcon';
import { PlusIcon } from './icons/PlusIcon';
import { ClockIcon } from './icons/ClockIcon';
import { HeartIcon } from './icons/HeartIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { UserAvatar } from './graphics/UserAvatar';

interface SidebarProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onNewMeal: () => void;
  history: Recipe[];
  favorites: string[];
  onHistorySelect: (recipe: Recipe) => void;
  onPricing: () => void;
  onLogout: () => void;
  onHome: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    user, isOpen, onClose, onNewMeal, 
    history, favorites, onHistorySelect,
    onPricing, onLogout, onHome 
}) => {
  const getInitials = (name: string) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const isFreePlan = user?.plan === 'free' || !user?.plan;

  // Derived Lists
  const favoriteRecipes = history.filter(r => favorites.includes(r.id));
  const recentHistory = history.slice(0, 5); // Show last 5 items in history list

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border-color flex flex-col h-screen flex-shrink-0 transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        {/* Header Logo */}
        <div className="p-6 border-b border-border-color/50 flex items-center justify-between">
          <button onClick={() => { onHome(); onClose(); }} className="flex items-center gap-2 focus:outline-none group">
            <ChefHatIcon className="w-8 h-8 text-primary group-hover:text-primary-focus transition-colors" />
            <div className="flex flex-col items-start">
              <h1 className="text-lg font-bold text-text-primary font-display leading-none">
                Foody Makeit
              </h1>
              <span className="text-[10px] font-medium text-text-secondary mt-0.5 uppercase tracking-wider">AI Meal Maker</span>
            </div>
          </button>
          {/* Mobile Close Button */}
          <button onClick={onClose} className="lg:hidden text-text-secondary hover:text-text-primary">
             <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Main Action */}
        <div className="p-4">
          <button
            onClick={() => { onNewMeal(); onClose(); }}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all hover:bg-primary-focus hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Meal</span>
          </button>
        </div>

        {/* Navigation / History */}
        <div className="flex-grow overflow-y-auto px-4 py-2 space-y-6">
          
          {/* Favorites Section */}
          {favoriteRecipes.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                    <HeartIcon className="w-3 h-3 text-rose-500" />
                    Favorites
                </h3>
                <div className="space-y-1">
                  {favoriteRecipes.map(recipe => (
                      <button 
                        key={recipe.id}
                        onClick={() => { onHistorySelect(recipe); onClose(); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-rose-50 hover:text-rose-600 transition-colors truncate flex items-center gap-3 group"
                      >
                        <span className="truncate font-medium">{recipe.recipeName}</span>
                      </button>
                  ))}
                </div>
              </div>
          )}

          {/* History Section */}
          <div>
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Recent History</h3>
            {recentHistory.length === 0 ? (
                 <p className="text-xs text-slate-400 px-3 italic">No meals yet. Start cooking!</p>
            ) : (
                <div className="space-y-1">
                {recentHistory.map(recipe => (
                    <button 
                        key={recipe.id}
                        onClick={() => { onHistorySelect(recipe); onClose(); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-slate-50 hover:text-text-primary transition-colors truncate flex items-center gap-3 group"
                    >
                        <ClockIcon className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                        <span className="truncate">{recipe.recipeName}</span>
                    </button>
                ))}
                </div>
            )}
          </div>

          {/* Folders / Categories */}
           <div>
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Your Kitchen</h3>
            <div className="space-y-1">
              <button onClick={() => { onPricing(); onClose(); }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-slate-50 hover:text-text-primary transition-colors flex items-center gap-3 group">
                <ChartBarIcon className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                Plan & Usage
                {isFreePlan && <span className="ml-auto text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Free</span>}
              </button>
            </div>
          </div>
        </div>

        {/* User Footer */}
        {user && (
          <div className="p-4 border-t border-border-color bg-slate-50/50">
            <div className="flex items-center gap-3 mb-3">
               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                   {getInitials(user.fullName)}
               </div>
               <div className="flex-grow min-w-0">
                   <p className="text-sm font-bold text-text-primary truncate">{user.fullName}</p>
                   <p className="text-xs text-text-secondary truncate">{user.email}</p>
               </div>
               <button 
                  onClick={() => { onLogout(); onClose(); }}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                  title="Logout"
               >
                   <LogoutIcon className="w-5 h-5" />
               </button>
            </div>
            {isFreePlan && (
               <button onClick={() => { onPricing(); onClose(); }} className="w-full text-xs bg-emerald-100 text-emerald-700 py-1.5 rounded-lg font-semibold hover:bg-emerald-200 transition-colors">
                   Upgrade Plan
               </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
