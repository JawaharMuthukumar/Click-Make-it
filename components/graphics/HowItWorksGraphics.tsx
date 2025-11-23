
import React from 'react';

interface GraphicProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Step1Graphic: React.FC<GraphicProps> = ({ className, ...props }) => (
  <img
    src="https://images.unsplash.com/photo-1557844352-761f2565b576?q=80&w=500&auto=format&fit=crop"
    alt="Fresh vegetables and ingredients"
    className={`rounded-3xl object-cover shadow-sm aspect-square ${className || ''}`}
    {...props}
  />
);

export const Step2Graphic: React.FC<GraphicProps> = ({ className, ...props }) => (
  <img
    src="https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500&auto=format&fit=crop"
    alt="Seasoning and customizing a meal"
    className={`rounded-3xl object-cover shadow-sm aspect-square ${className || ''}`}
    {...props}
  />
);

export const Step3Graphic: React.FC<GraphicProps> = ({ className, ...props }) => (
  <img
    src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=500&auto=format&fit=crop"
    alt="Delicious plated meal"
    className={`rounded-3xl object-cover shadow-sm aspect-square ${className || ''}`}
    {...props}
  />
);
