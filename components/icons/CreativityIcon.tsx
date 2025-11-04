import React from 'react';

export const CreativityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9.75 17.25v2.25M14.25 17.25v2.25M3.75 13.5h16.5M5.25 6h13.5c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125H5.25c-.621 0-1.125-.504-1.125-1.125V7.125C4.125 6.504 4.629 6 5.25 6zM5.25 13.5v3.375c0 .621.504 1.125 1.125 1.125h11.25c.621 0 1.125-.504 1.125-1.125V13.5" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7.5 6a4.5 4.5 0 014.5-4.5 4.5 4.5 0 014.5 4.5" 
    />
  </svg>
);