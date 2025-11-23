import React from 'react';

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387 .775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.473.236 1.05.038 1.286-.431l.431-.862a1.5 1.5 0 012.13-.724l.153.076c.473.236 1.05.038 1.286-.431l.431-.862a1.5 1.5 0 012.13-.724l.21-1.052a6.002 6.002 0 00-1.23-5.22l-1.052-.632a6.002 6.002 0 00-5.22-1.23L9 6.332A6.002 6.002 0 006.115 5.19z" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M19.5 12c0-5.242-4.258-9.5-9.5-9.5S.5 6.758.5 12s4.258 9.5 9.5 9.5 9.5-4.258 9.5-9.5z" 
    />
</svg>
);
