import React from 'react';

export const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.28c-1.127.084-2.164.64-2.885 1.487l-2.433 2.919a1.125 1.125 0 01-1.802 0l-2.433-2.919c-.721-.847-1.758-1.403-2.885-1.487l-3.722-.28C3.847 17.1 3 16.136 3 15v-4.286c0-.97.616-1.813 1.5-2.097v6.022c0 .621.504 1.125 1.125 1.125h11.25c.621 0 1.125-.504 1.125-1.125v-6.022z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 7.5l-3.75 3.75-3.75-3.75"
      opacity="0.4"
    />
  </svg>
);
