import React from 'react';

export const Step1Graphic: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="20" y="10" width="60" height="85" rx="10" fill="#e2e8f0"/>
    <rect x="25" y="15" width="50" height="75" rx="5" fill="white"/>
    <circle cx="50" cy="25" r="3" fill="#e2e8f0"/>
    
    {/* Veggies inside */}
    <circle cx="40" cy="50" r="8" fill="#ef4444"/>
    <path d="M 38 42 C 40 44, 42 42, 41 40" fill="#22c55e" stroke="#16a34a" strokeWidth="1"/>
    <path d="M 60 65 L 70 60 L 65 75 Z" fill="#f97316"/>
    <ellipse cx="55" cy="45" rx="10" ry="7" fill="#d8b4fe"/>
  </svg>
);

export const Step2Graphic: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 50 30 C 35 30, 25 45, 25 60 H 75 C 75 45, 65 30, 50 30 Z" fill="#e2e8f0" />
    <rect x="25" y="60" width="50" height="10" fill="#e2e8f0" />
    <rect x="30" y="70" width="40" height="15" fill="#e2e8f0" rx="5" />
    
    {/* Cuisines */}
    <circle cx="30" cy="25" r="10" fill="#009246"/>
    <circle cx="30" cy="25" r="6.6" fill="#F1F2F1"/>
    <circle cx="30" cy="25" r="3.3" fill="#CE2B37"/>

    <circle cx="70" cy="25" r="10" fill="#006847"/>
    <rect x="63" y="23" width="14" height="4" fill="#FFFFFF"/>
    <path d="M 70 25 a 10 10 0 0 1 0 -20 a 10 10 0 0 1 0 20" fill="#CE1126"/>

     <circle cx="50" cy="15" r="10" fill="#FF9933"/>
    <circle cx="50" cy="15" r="6.6" fill="#FFFFFF"/>
    <circle cx="50" cy="15" r="3.3" fill="#138808"/>
  </svg>
);

export const Step3Graphic: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="65" r="35" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
    <circle cx="50" cy="65" r="30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
    
    {/* Food */}
    <path d="M 30 60 C 40 75, 60 55, 70 65" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M 25 70 C 35 80, 55 65, 65 75" stroke="#84cc16" strokeWidth="5" fill="none" strokeLinecap="round" />
    <circle cx="35" cy="72" r="4" fill="#ef4444" />
    
    {/* Steam */}
    <path d="M 40 40 C 35 30, 45 25, 40 15" stroke="#e2e8f0" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M 50 45 C 45 35, 55 30, 50 20" stroke="#e2e8f0" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M 60 40 C 55 30, 65 25, 60 15" stroke="#e2e8f0" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);
