import React from 'react';

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c-1.42 0-2.798-.31-4.09-1.253a5.25 5.25 0 01-1.02-3.865A11.25 11.25 0 0112 3c2.67 0 5.19.932 7.141 2.579a5.25 5.25 0 01-1.02 3.865c-1.291.943-2.67 1.253-4.09 1.253z" 
    />
  </svg>
);
