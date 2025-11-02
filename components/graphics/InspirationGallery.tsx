import React from 'react';

const GalleryItem: React.FC<{ children: React.ReactNode; transform: string; }> = ({ children, transform }) => (
    <div className="bg-white p-3 rounded-xl shadow-lg transform" style={{ transform }}>
        <div className="bg-slate-50 rounded-lg overflow-hidden">
            {children}
        </div>
    </div>
);

export const InspirationGallery: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
    <GalleryItem transform="rotate(-3deg) translateY(10px)">
        <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#fef3c7" />
            <path d="M 20 50 C 40 20, 60 80, 80 50" stroke="#f97316" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 25 55 C 45 30, 65 85, 85 55" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
            <circle cx="65" cy="40" r="5" fill="#ef4444" />
            <circle cx="35" cy="60" r="4" fill="#22c55e" />
        </svg>
    </GalleryItem>
    <GalleryItem transform="rotate(2deg) translateY(-5px)">
        <svg viewBox="0 0 100 100">
            <path d="M10 90 L 30 20 L 70 20 L 90 90 Z" fill="#fcd34d" />
            <path d="M15 85 L 33 25 L 67 25 L 85 85 Z" fill="#fffbeb" />
            <circle cx="40" cy="40" r="8" fill="#dc2626" />
            <circle cx="60" cy="55" r="7" fill="#dc2626" />
            <circle cx="50" cy="70" r="6" fill="#16a34a" />
        </svg>
    </GalleryItem>
    <GalleryItem transform="rotate(-2.5deg) translateY(5px)">
         <svg viewBox="0 0 100 100">
            <path d="M10 80 C 30 95, 70 95, 90 80 L 90 40 C 70 25, 30 25, 10 40 Z" fill="#d9f99d" />
            <path d="M 20 45 C 10 60, 40 80, 50 50 C 60 20, 90 40, 80 55" fill="#22c55e" opacity="0.5" />
             <path d="M 50 70 C 40 85, 70 85, 80 70" stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
    </GalleryItem>
     <GalleryItem transform="rotate(3deg) translateY(15px) scale(0.95)" >
         <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#fee2e2" />
            <path d="M 50 20 C 80 30, 80 70, 50 80 C 20 70, 20 30, 50 20 Z" fill="#fca5a5" />
            <circle cx="40" cy="40" r="5" fill="white" />
            <circle cx="60" cy="45" r="4" fill="white" />
            <circle cx="50" cy="60" r="6" fill="white" />
        </svg>
    </GalleryItem>
     <GalleryItem transform="rotate(-1deg) translateY(-10px) scale(1.05)">
        <svg viewBox="0 0 100 100">
            <rect x="10" y="30" width="80" height="40" rx="20" fill="#ffedd5" />
            <rect x="20" y="30" width="60" height="40" fill="#fdba74" />
            <rect x="45" y="20" width="10" height="60" fill="#f97316" rx="5" />
        </svg>
    </GalleryItem>
     <GalleryItem transform="rotate(1.5deg) translateY(8px)">
       <svg viewBox="0 0 100 100">
            <path d="M20 80 l30-60 l30 60 z" fill="#bfdbfe" />
            <circle cx="50" cy="45" r="15" fill="#60a5fa" />
            <circle cx="50" cy="45" r="8" fill="#eff6ff" />
        </svg>
    </GalleryItem>
  </div>
);
