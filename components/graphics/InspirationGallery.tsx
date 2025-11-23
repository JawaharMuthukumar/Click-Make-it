
import React from 'react';

const GalleryItem: React.FC<{ children: React.ReactNode; transform: string; }> = ({ children, transform }) => (
    <div className="bg-white p-2 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-110 hover:z-10 shadow-slate-200" style={{ transform }}>
        <div className="bg-slate-50 rounded-lg overflow-hidden w-full h-full">
            {children}
        </div>
    </div>
);

export const InspirationGallery: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-2 ${className || ''}`}>
    <GalleryItem transform="rotate(-3deg) translateY(10px)">
        <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" 
            alt="Fresh Salad Bowl" 
            className="w-full h-32 object-cover"
        />
    </GalleryItem>
    <GalleryItem transform="rotate(2deg) translateY(-5px)">
        <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" 
            alt="Delicious Pizza" 
            className="w-full h-32 object-cover"
        />
    </GalleryItem>
    <GalleryItem transform="rotate(-2.5deg) translateY(5px)">
         <img 
            src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80" 
            alt="Pancakes with Syrup" 
            className="w-full h-32 object-cover"
        />
    </GalleryItem>
     <GalleryItem transform="rotate(3deg) translateY(15px) scale(0.95)" >
         <img 
            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80" 
            alt="Asian Stir Fry" 
            className="w-full h-32 object-cover"
        />
    </GalleryItem>
     <GalleryItem transform="rotate(-1deg) translateY(-10px) scale(1.05)">
        <img 
            src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=400&q=80" 
            alt="Avocado Toast with Egg" 
            className="w-full h-32 object-cover"
        />
    </GalleryItem>
     <GalleryItem transform="rotate(1.5deg) translateY(8px)">
       <img 
            src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80" 
            alt="French Toast Breakfast" 
            className="w-full h-32 object-cover"
        />
    </GalleryItem>
  </div>
);
