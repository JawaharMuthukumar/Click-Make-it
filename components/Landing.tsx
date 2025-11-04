import React from 'react';
import { QuoteIcon } from './icons/QuoteIcon';
import { HeroGraphic } from './graphics/HeroGraphic';
import { Step1Graphic, Step2Graphic, Step3Graphic } from './graphics/HowItWorksGraphics';
import { InspirationGallery } from './graphics/InspirationGallery';
import { TimeIcon } from './icons/TimeIcon';
import { WasteIcon } from './icons/WasteIcon';
import { CreativityIcon } from './icons/CreativityIcon';
import { ConfidenceIcon } from './icons/ConfidenceIcon';
import { UserAvatar } from './graphics/UserAvatar';

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
    title: '2. Choose a Region',
    description: "In the mood for hearty Punjabi? Coastal Kerala? Let our AI know what regional Indian style you're craving.",
  },
  {
    icon: <Step3Graphic className="h-40 w-auto" />,
    title: '3. Get Cooking',
    description: 'Receive a simple, step-by-step Indian recipe with full nutritional info in seconds. It\'s that easy.',
  },
];

const whyUsItems = [
    {
        icon: <TimeIcon className="w-8 h-8" />,
        title: "Save Time & Effort",
        description: "Stop endless scrolling. Get an Indian meal plan in seconds and reclaim your evenings."
    },
    {
        icon: <WasteIcon className="w-8 h-8" />,
        title: "Reduce Food Waste",
        description: "Use what you have. Turn wilting veggies and forgotten items into delicious Indian meals."
    },
    {
        icon: <CreativityIcon className="w-8 h-8" />,
        title: "Spark Creativity",
        description: "Discover new Indian flavor combinations and break out of your cooking rut. Your ingredients, endless possibilities."
    },
    {
        icon: <ConfidenceIcon className="w-8 h-8" />,
        title: "Cook with Confidence",
        description: "Simple, clear instructions mean you can create amazing Indian meals, no matter your skill level."
    }
];

const testimonials = [
    {
        quote: "This app is a game-changer! I made an amazing Punjabi-style curry with chicken, broccoli, and sweet potatoes. Never would have thought of that!",
        author: "Sarah J., Canada"
    },
    {
        quote: "I'm not a great cook, but the instructions are so simple. I've made some restaurant-quality Indian meals with this.",
        author: "Mike R., USA"
    },
     {
        quote: "The photo feature is magic. It turned a random assortment of veggies from my fridge into a delicious South Indian stir-fry.",
        author: "Chen L., Australia"
    }
]

const CardPattern: React.FC<{ variant: number }> = ({ variant }) => {
    const patterns = [
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>,
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(45deg, #64748B 25%, transparent 25%), linear-gradient(-45deg, #64748B 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #64748B 75%), linear-gradient(-45deg, transparent 75%, #64748B 75%)', backgroundSize: '20px 20px' }}></div>,
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #0F172A, #0F172A 5px, transparent 5px, transparent 10px)' }}></div>,
    ];
    return patterns[variant % patterns.length];
};

const Landing: React.FC<LandingProps> = ({ onStartCooking }) => {
  return (
    <div className="space-y-24 md:space-y-32 animate-fade-in pb-16">
      {/* Hero Section */}
      <section className="pt-8 md:pt-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-bold font-display text-text-primary leading-tight tracking-tighter">
                  <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">The Taste of India,</span>
                  <br />
                  <span>From Your Kitchen.</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto md:mx-0 text-lg md:text-xl text-text-secondary">
                  Turn any ingredients into delicious, authentic Indian-style dishes. No more recipe hunting.
                </p>
                <div className="mt-10">
                    <button
                        onClick={onStartCooking}
                        className="bg-primary text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-primary-focus hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Start Your Free Trial
                    </button>
                    <p className="mt-3 text-sm text-text-secondary">Your first 10 recipes are on us!</p>
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
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">From Your Kitchen to an Indian Feast in 3 Steps</h2>
            <p className="mt-3 text-lg text-text-secondary">Three simple steps from your ingredients to a finished meal.</p>
          </div>
          <div className="mt-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border-color hidden md:block" aria-hidden="true"></div>
            <div className="absolute top-1/2 left-0 w-full hidden md:block" aria-hidden="true">
                <svg width="100%" height="4" className="overflow-visible">
                    <path d="M0 2 H10000" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 8" />
                </svg>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {howItWorksSteps.map((step, index) => (
                    <div key={step.title} className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center relative overflow-hidden">
                        <CardPattern variant={index} />
                        <div className="relative z-10 flex flex-col items-center h-full">
                            <div className="bg-background p-4 rounded-full mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold font-display text-text-primary">{step.title}</h3>
                            <p className="mt-2 text-text-secondary flex-grow">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* Why Us Section */}
      <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Your Secret Weapon for Authentic Indian Flavors</h2>
            <p className="mt-3 text-lg text-text-secondary">Whether you're new to Indian cooking or a seasoned pro, Click & Make It is for you.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUsItems.map(item => (
                <div key={item.title} className="group bg-white p-8 rounded-2xl shadow-md text-center flex flex-col transition-all duration-300 ease-in-out hover:bg-emerald-50 hover:shadow-xl hover:-translate-y-2 hover:animate-shake cursor-pointer">
                    <div className="mx-auto bg-background w-16 h-16 rounded-full flex items-center justify-center mb-6 flex-shrink-0 transition-colors duration-300 text-primary group-hover:bg-primary group-hover:text-white">
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-bold font-display text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-text-secondary flex-grow">{item.description}</p>
                </div>
            ))}
          </div>
      </section>

      {/* Inspiration Section */}
       <section className="relative">
            <div className="absolute -inset-20 opacity-30 blur-3xl -z-10" aria-hidden="true">
                <div className="w-full h-full bg-gradient-to-tr from-emerald-200 to-sky-200 rounded-full"></div>
            </div>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Get Inspired</h2>
            <p className="mt-3 text-lg text-text-secondary">Discover delicious Indian possibilities you can create with what you already have.</p>
          </div>
          <div className="mt-12">
            <InspirationGallery className="w-full h-auto" />
          </div>
      </section>

      {/* Testimonials Section */}
      <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Loved by Home Cooks Worldwide</h2>
            <p className="mt-3 text-lg text-text-secondary">Don't just take our word for it. Here's what people are saying.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((item, index) => (
                  <div key={item.author} className="bg-white p-8 rounded-2xl shadow-md flex flex-col relative overflow-hidden">
                      <QuoteIcon className="absolute -top-4 -right-4 w-32 h-32 text-slate-100/50 -z-0" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <UserAvatar variant={index} className="w-12 h-12 rounded-full" />
                          <p className="font-bold text-text-primary">{item.author}</p>
                        </div>
                        <blockquote className="text-text-secondary text-lg leading-relaxed flex-grow">"{item.quote}"</blockquote>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white rounded-2xl shadow-lg">
        <div className="p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary leading-tight">Ready to Unleash Your Inner Indian Chef?</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-text-secondary">Stop wondering what to make for dinner. Start creating authentic Indian flavors.</p>
            <div className="mt-8">
                <button
                    onClick={onStartCooking}
                    className="bg-primary text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:bg-primary-focus hover:shadow-lg transform hover:-translate-y-1"
                >
                    Start Your Free Trial
                </button>
                 <p className="mt-3 text-sm text-text-secondary">Get 10 free recipes when you sign up.</p>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;