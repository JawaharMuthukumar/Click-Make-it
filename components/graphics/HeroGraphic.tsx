import React from 'react';

export const HeroGraphic: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="2" dy="4"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Ingredients - Floating Animation */}
    <g filter="url(#drop-shadow)" className="animate-[float_5s_ease-in-out_infinite]">
      {/* Tomato */}
      <circle cx="60" cy="150" r="25" fill="#ef4444" />
      <path d="M 60 125 C 65 130, 70 125, 65 120" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
      
      {/* Broccoli */}
      <circle cx="100" cy="220" r="15" fill="#22c55e" />
      <circle cx="120" cy="210" r="18" fill="#22c55e" />
      <circle cx="110" cy="190" r="16" fill="#22c55e" />
      <rect x="105" y="210" width="10" height="30" fill="#84cc16" rx="5" />
      
      {/* Carrot */}
      <path d="M 50 200 L 90 180 L 80 220 Z" fill="#f97316" />
      <path d="M 45 205 C 40 200, 45 195, 40 190" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
       <path d="M 50 200 C 45 195, 50 190, 45 185" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

      {/* Onion */}
      <ellipse cx="130" cy="140" rx="25" ry="20" fill="#d8b4fe" />
      <path d="M 130 120 C 132 115, 135 110, 130 105" stroke="#a78bfa" strokeWidth="2" fill="none" />
    </g>
    
    {/* Arrow */}
    <path d="M 160 150 C 200 100, 240 200, 280 150" stroke="url(#hero-grad)" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="10 10" className="animate-pulse" />
    <path d="M 270 140 L 280 150 L 270 160" stroke="url(#hero-grad)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
    
    {/* Plate */}
    <g transform="translate(320 150)">
       <circle cx="0" cy="0" r="70" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" filter="url(#drop-shadow)" />
       <circle cx="0" cy="0" r="60" fill="none" stroke="#e2e8f0" strokeWidth="2" />
       {/* Food on plate */}
       <path d="M -30 -10 C -10 20, 20 -20, 40 10" stroke="#f97316" strokeWidth="8" fill="none" strokeLinecap="round" />
       <path d="M -40 20 C -20 40, 10 10, 30 30" stroke="#84cc16" strokeWidth="10" fill="none" strokeLinecap="round" />
       <circle cx="-20" cy="25" r="8" fill="#ef4444" />
       <circle cx="25" cy="-15" r="10" fill="#d8b4fe" opacity="0.7" />
    </g>
  </svg>
);