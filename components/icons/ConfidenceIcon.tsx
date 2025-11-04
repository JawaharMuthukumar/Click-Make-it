import React from 'react';

export const ConfidenceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M9 12.75L11.25 15 15 9.75M10.29 3.86a1.5 1.5 0 011.42 0l6.845 3.422a1.5 1.5 0 01.845 1.32v6.75a1.5 1.5 0 01-.845 1.32l-6.845 3.422a1.5 1.5 0 01-1.42 0l-6.845-3.422a1.5 1.5 0 01-.845-1.32v-6.75a1.5 1.5 0 01.845-1.32l6.845-3.422z" 
    />
  </svg>
);