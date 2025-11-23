import React, { useState, useEffect, useRef } from 'react';
import type { User } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface UserButtonProps {
  user: User;
  onLogout: () => void;
  onPricingClick: () => void;
}

const UserButton: React.FC<UserButtonProps> = ({ user, onLogout, onPricingClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const colors = ['#10B981', '#06B6D4', '#6366F1', '#EC4899', '#F97316'];
  const bgColor = colors[Math.abs(hashCode(user.fullName || '')) % colors.length];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logic for credits (Mock: 5 per month for free plan)
  const maxCredits = user.plan === 'free' ? 5 : Infinity;
  const usedCredits = user.dishUsed || 0;
  const creditPercentage = maxCredits === Infinity ? 100 : Math.min(100, (usedCredits / maxCredits) * 100);
  const isFreePlan = user.plan === 'free' || !user.plan;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: bgColor }}
          aria-hidden="true"
        >
          {getInitials(user.fullName)}
        </div>
        <span className="hidden sm:inline text-sm font-semibold text-text-primary">{user.fullName}</span>
        <ChevronDownIcon className={`w-4 h-4 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-border-color z-20 animate-fade-in overflow-hidden">
          {/* Plan Box */}
          <div className="px-4 py-4 bg-slate-50 border-b border-border-color">
            <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-primary text-sm uppercase tracking-wide">
                    {isFreePlan ? "Free Plan" : "Premium Plan"}
                </span>
                {isFreePlan && (
                    <button 
                        onClick={() => {
                            setIsOpen(false);
                            onPricingClick();
                        }}
                        className="text-xs bg-primary text-white px-3 py-1 rounded-full font-semibold hover:bg-primary-focus transition-colors"
                    >
                        Upgrade
                    </button>
                )}
            </div>
            
            <div>
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                    <span>Credits (Dish Making)</span>
                    <span>{usedCredits} / {maxCredits === Infinity ? '∞' : maxCredits}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-primary to-emerald-400 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${creditPercentage}%`}}
                    ></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 text-right">Renews {user.currentMonth || 'Next Month'}</p>
            </div>
          </div>

          <div className="px-4 py-2 border-b border-border-color">
            <p className="text-sm font-semibold text-text-primary truncate" title={user.fullName}>{user.fullName}</p>
            <p className="text-xs text-text-secondary truncate" title={user.email}>{user.email}</p>
          </div>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserButton;