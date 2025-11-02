import React from 'react';
import { QuoteIcon } from './icons/QuoteIcon';
import { HeroGraphic } from './graphics/HeroGraphic';
import { Step1Graphic, Step2Graphic, Step3Graphic } from './graphics/HowItWorksGraphics';
import { InspirationGallery } from './graphics/InspirationGallery';

interface LandingProps {
  onStartCooking: () => void;
}

const howItWorksSteps = [
  {
    icon: <Step1Graphic className="h-40 w-auto" />,
    title: '1. Snap or List',
    description: 'Take a photo of your ingredients or just type them out. Our AI recognizes thousands of items.',
  },
  {
    icon: <Step2Graphic className="h-40 w-auto" />,
    title: '2. Pick a Vibe',
    description: 'In the mood for Italian? Mexican? Let our AI know what cuisine you\'re craving.',
  },
  {
    icon: <Step3Graphic className="h-40 w-auto" />,
    title: '3. Get Cooking',
    description: 'Receive a simple, step-by-step recipe with full nutritional info in seconds. It\'s that easy.',
  },
];

const testimonials = [
    {
        quote: "This app is a game-changer for weeknight dinners! I used to stare at my fridge blankly, but now I get amazing ideas in seconds.",
        author: "Sarah J."
    },
    {
        quote: "I'm not a great cook, but the instructions are so simple to follow. I've made some restaurant-quality meals with this.",
        author: "Mike R."
    },
     {
        quote: "The ingredient recognition from a photo is pure magic. It correctly identified everything, even the weird vegetables from my CSA box.",
        author: "Chen L."
    }
]

const Landing: React.FC<LandingProps> = ({ onStartCooking }) => {
  return (
    <div className="space-y-24 md:space-y-32 animate-fade-in pb-16">
      {/* Hero Section */}
      <section className="pt-8 md:pt-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-bold font-display text-text-primary leading-tight tracking-tighter">
                  <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">Stop Staring,</span>
                  <br />
                  <span>Start Cooking.</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto md:mx-0 text-lg md:text-xl text-text-secondary">
                  Turn your random ingredients into delicious meals. No more recipe hunting. No more food waste.
                </p>
                <div className="mt-10">
                    <button
                        onClick={onStartCooking}
                        className="bg-primary text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-primary-focus hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Start Cooking for Free
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <HeroGraphic className="w-full max-w-md h-auto" />
            </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">From Your Kitchen to Your Plate in 3 Steps</h2>
            <p className="mt-3 text-lg text-text-secondary">Three simple steps from ingredients to a finished meal.</p>
          </div>
          <div className="mt-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border-color hidden md:block" aria-hidden="true"></div>
            <div className="absolute top-1/2 left-0 w-full hidden md:block" aria-hidden="true">
                <svg width="100%" height="4" className="overflow-visible">
                    <path d="M0 2 H10000" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 8" />
                </svg>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {howItWorksSteps.map(step => (
                    <div key={step.title} className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center">
                        <div className="bg-background p-4 rounded-full mb-6">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-bold font-display text-text-primary">{step.title}</h3>
                        <p className="mt-2 text-text-secondary flex-grow">{step.description}</p>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* Inspiration Section */}
       <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Get Inspired</h2>
            <p className="mt-3 text-lg text-text-secondary">Discover delicious possibilities you can create with what you already have.</p>
          </div>
          <div className="mt-12">
            <InspirationGallery className="w-full h-auto" />
          </div>
      </section>

      {/* Testimonials Section */}
      <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Loved by Home Cooks</h2>
            <p className="mt-3 text-lg text-text-secondary">Don't just take our word for it. Here's what people are saying.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map(item => (
                  <div key={item.author} className="bg-white p-8 rounded-2xl shadow-md flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                            <QuoteIcon className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="font-bold text-text-primary">{item.author}</p>
                      </div>
                      <blockquote className="text-text-secondary text-lg leading-relaxed flex-grow">"{item.quote}"</blockquote>
                  </div>
              ))}
          </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white rounded-2xl shadow-lg">
        <div className="p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary leading-tight">Ready to Unleash Your Inner Chef?</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-text-secondary">Stop wondering what to make for dinner. Start creating.</p>
            <div className="mt-8">
                <button
                    onClick={onStartCooking}
                    className="bg-primary text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:bg-primary-focus hover:shadow-lg transform hover:-translate-y-1"
                >
                    Let's Cook!
                </button>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
