import React from 'react';

interface UserAvatarProps {
  variant: number;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ variant, className }) => {
  const variants = [
    // Variant 1: Green/Blue
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="avatar1-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#avatar1-grad)" />
      <path d="M 30 70 Q 50 20, 70 70" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
      <circle cx="65" cy="35" r="8" fill="white" opacity="0.7" />
    </svg>,
    // Variant 2: Orange/Yellow
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
       <defs>
        <linearGradient id="avatar2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="50" fill="url(#avatar2-grad)" />
      <rect x="25" y="25" width="50" height="50" rx="10" fill="white" opacity="0.6" transform="rotate(15, 50, 50)" />
    </svg>,
    // Variant 3: Purple/Pink
     <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="avatar3-grad">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#avatar3-grad)" />
      <path d="M 20 20 L 80 80 M 80 20 L 20 80" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
    </svg>
  ];

  return variants[variant % variants.length];
};
