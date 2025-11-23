
import React, { useState } from 'react';
import { HeroGraphic } from './graphics/HeroGraphic';
import { Step1Graphic, Step2Graphic, Step3Graphic } from './graphics/HowItWorksGraphics';
import { InspirationGallery } from './graphics/InspirationGallery';
import { TimeIcon } from './icons/TimeIcon';
import { WasteIcon } from './icons/WasteIcon';
import { CreativityIcon } from './icons/CreativityIcon';
import { ConfidenceIcon } from './icons/ConfidenceIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SofaIcon } from './icons/SofaIcon';
import { HeartIcon } from './icons/HeartIcon';
import { CrownIcon } from './icons/CrownIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import InspirationWidget from './InspirationWidget';
import { ChefHatIcon } from './icons/ChefHatIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface LandingProps {
  onStartCooking: () => void;
}

const howItWorksSteps = [
  {
    icon: <Step1Graphic className="h-48 w-auto drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2" />,
    title: 'List Ingredients',
    description: 'Type out the ingredients you have or use voice input to list them instantly.',
  },
  {
    icon: <Step2Graphic className="h-48 w-auto drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2" />,
    title: 'Customize Your Meal',
    description: "Select a country and region for authentic flavors. Adjust servings, cooking style, and taste.",
  },
  {
    icon: <Step3Graphic className="h-48 w-auto drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2" />,
    title: 'Cook with AI',
    description: 'Get a step-by-step recipe with nutrition info. Chat with our AI assistant for help along the way.',
  },
];

const targetAudience = [
  {
    icon: <BriefcaseIcon className="w-12 h-12 text-white" />,
    title: "9-5 Busy Pros & Super Moms",
    description: "Juggling deadlines and diapers? Get a healthy, homemade meal on the table in minutes without the mental load.",
    color: "bg-blue-500"
  },
  {
    icon: <SofaIcon className="w-12 h-12 text-white" />,
    title: "Our Favorite 'Lazy' Cooks",
    description: "Love good food but hate the effort? Turn the bare minimum into maximum flavor with zero stress.",
    color: "bg-orange-500"
  },
  {
    icon: <HeartIcon className="w-12 h-12 text-white" />,
    title: "The Date Night Rookie",
    description: "Beginner wanting to impress? Cook restaurant-quality meals for your loved ones that look like you studied in Paris.",
    color: "bg-rose-500"
  },
  {
    icon: <CrownIcon className="w-12 h-12 text-white" />,
    title: "Daddy's Little Princes & Princesses",
    description: "Flying the nest for the first time? Stop ordering takeout and learn to survive (and thrive) in the kitchen.",
    color: "bg-purple-500"
  }
];

const painPoints = [
    {
        pain: "Dreading the 6 PM 'What's for dinner?' panic.",
        solution: "Instant answers based on what you already have."
    },
    {
        pain: "Guilt over throwing away wilted veggies.",
        solution: "Zero-waste recipes that use up those odds and ends."
    },
    {
        pain: "Draining your bank account on takeout.",
        solution: "Restaurant quality meals for a fraction of the price."
    },
    {
        pain: "Intimidated by complex, 20-step recipes.",
        solution: "Simple, step-by-step instructions anyone can follow."
    }
];

const whyUsItems = [
    {
        icon: <TimeIcon className="w-10 h-10 text-white" />,
        title: "Save Time & Effort",
        description: "Stop endless scrolling. Get a meal plan in seconds and reclaim your evenings.",
        color: "bg-emerald-500"
    },
    {
        icon: <WasteIcon className="w-10 h-10 text-white" />,
        title: "Reduce Food Waste",
        description: "Use what you have. Turn wilting veggies and forgotten items into delicious meals.",
        color: "bg-cyan-500"
    },
    {
        icon: <CreativityIcon className="w-10 h-10 text-white" />,
        title: "Spark Creativity",
        description: "Discover new flavor combinations and break out of your cooking rut. Your ingredients, endless possibilities.",
        color: "bg-violet-500"
    },
    {
        icon: <ConfidenceIcon className="w-10 h-10 text-white" />,
        title: "Cook with Confidence",
        description: "Simple, clear instructions mean you can create amazing meals, no matter your skill level.",
        color: "bg-rose-500"
    }
];

const faqItems = [
  {
    question: "How accurate is the AI with random ingredients?",
    answer: "Surprisingly accurate! Our AI is trained on thousands of global cuisines. It understands flavor profiles and cooking techniques, so it can figure out how to combine even the most random assortment of ingredients into a coherent, tasty dish."
  },
  {
    question: "Can I see the dish before I choose it?",
    answer: "Yes! Unlike basic recipe generators, we present you with 3 distinct dish options complete with AI-generated photos. You can browse the visual options and pick the one that looks best before we generate the full recipe."
  },
  {
    question: "Is Foody Makeit free to use?",
    answer: "Yes, every user starts with a Free Plan that includes 5 Dish Credits per month. This lets you generate full recipes and use the AI Assistant. For unlimited access, we offer affordable monthly and yearly subscriptions."
  },
  {
    question: "Can I save my favorite recipes?",
    answer: "Absolutely. All your generated recipes are automatically saved to your History. You can also tap the 'Heart' icon to save specific dishes to your Favorites list, which is accessible anytime from the sidebar."
  },
  {
    question: "What if I have questions while cooking?",
    answer: "Our AI Cooking Assistant is available 24/7. You can chat with it to ask about substitutions, techniques, or even use the new text-to-speech feature to have it read instructions out loud while your hands are full."
  }
];

const Connector: React.FC<{ type?: 'left' | 'right' }> = ({ type = 'right' }) => {
  return (
    <div className="w-full h-24 md:h-32 flex justify-center relative z-0 pointer-events-none -my-6 md:-my-8">
      <svg
        viewBox="0 0 100 200"
        className="h-full w-full max-w-[200px] text-slate-300/70"
        preserveAspectRatio="none"
      >
        <path
          d={
            type === 'right'
              ? "M 50 0 C 95 50, 95 150, 50 200"
              : "M 50 0 C 5 50, 5 150, 50 200"
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="12 12"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const Landing: React.FC<LandingProps> = ({ onStartCooking }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full animate-fade-in pb-16">
      {/* Hero Section - UPDATED WITH ANIMATION */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-24 overflow-hidden">
        {/* Background Elements - Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <div className="inline-block mb-4 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold animate-fade-in">
                        ✨ Your AI Kitchen Companion
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-display text-text-primary leading-tight tracking-tight animate-fade-in-slide-up">
                      From Your Kitchen to a Global Feast
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 animate-text-gradient bg-[length:200%_auto]">in 3 Easy Steps.</span>
                    </h1>
                    <p className="mt-6 max-w-lg mx-auto md:mx-0 text-lg md:text-xl text-text-secondary leading-relaxed animate-fade-in-slide-up" style={{ animationDelay: '0.2s' }}>
                      Got ingredients? Get a recipe. List what you have, choose a cuisine, and our AI instantly creates your perfect meal.
                    </p>
                    <div className="mt-10 animate-fade-in-slide-up" style={{ animationDelay: '0.4s' }}>
                        <button
                            onClick={onStartCooking}
                            className="bg-primary text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 hover:bg-primary-focus hover:shadow-xl hover:shadow-emerald-200 transform hover:-translate-y-1 active:scale-95"
                        >
                            Start Cooking Now
                        </button>
                        <p className="mt-4 text-sm text-text-secondary font-medium">
                            <span className="text-emerald-500 mr-1">✓</span> No credit card required
                        </p>
                    </div>
                </div>
                <div className="flex justify-center animate-float relative">
                     {/* Decorative circle behind image */}
                     <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-sky-100/50 rounded-full blur-3xl transform scale-110 -z-10"></div>
                    <HeroGraphic className="w-full max-w-lg h-auto drop-shadow-2xl" />
                </div>
            </div>
        </div>
      </section>

      <Connector type="right" />

      {/* Target Audience Section - BIG BOX */}
      <section className="py-4 md:py-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary via-sky-400 to-purple-500"></div>
            
            <div className="text-center max-w-5xl mx-auto mb-16">
                <h2 className="text-4xl md:text-6xl font-bold font-display text-text-primary tracking-tight">Who is Foody Makeit For?</h2>
                <p className="mt-6 text-xl md:text-2xl text-text-secondary font-medium">Designed for real life, real kitchens, and real people.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                {targetAudience.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center group">
                        <div className={`${item.color} w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                            {item.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-4">{item.title}</h3>
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-md">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Connector type="left" />

      {/* Lifestyle Pain Points Section - BIG BOX & ANIMATION */}
      <section className="py-4 md:py-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-rose-400 via-purple-400 to-emerald-400"></div>

            <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl md:text-6xl font-bold font-display text-text-primary tracking-tight">Does This Sound Like Your Kitchen?</h2>
                <p className="mt-6 text-xl md:text-2xl text-text-secondary font-medium">We've all been there. It's time to change the narrative.</p>
            </div>

            <div className="max-w-5xl mx-auto grid gap-6">
                {painPoints.map((item, index) => (
                    <div 
                        key={index} 
                        className="group bg-slate-50 hover:bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-border-color hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Pain Side */}
                            <div className="flex items-center gap-4 w-full md:w-1/2 opacity-80 group-hover:opacity-50 transition-opacity duration-300">
                                <div className="bg-red-100 p-3 rounded-full flex-shrink-0 group-hover:scale-90 transition-transform duration-300">
                                     <XMarkIcon className="w-6 h-6 text-red-500" />
                                </div>
                                <p className="font-medium text-lg text-text-secondary group-hover:line-through decoration-red-300 decoration-2">{item.pain}</p>
                            </div>

                            {/* Arrow Animation */}
                            <div className="hidden md:flex items-center justify-center w-12">
                                <svg className="w-6 h-6 text-slate-300 group-hover:text-emerald-500 transform group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                            <div className="md:hidden text-slate-300 rotate-90">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>

                            {/* Solution Side */}
                            <div className="flex items-center gap-4 w-full md:w-1/2 transform group-hover:translate-x-2 transition-transform duration-300">
                                <div className="bg-emerald-100 p-3 rounded-full flex-shrink-0 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                    <CheckCircleIcon className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                                </div>
                                 <p className="font-bold text-lg text-text-primary group-hover:text-emerald-700 transition-colors duration-300">{item.solution}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Connector type="right" />

      {/* How It Works Section - Creative Large Cards */}
      <section className="py-8 md:py-12 relative overflow-visible z-10">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-transparent via-slate-50 to-transparent -z-10 rounded-full opacity-50 blur-3xl"></div>

          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary tracking-tight">How It Works</h2>
            <p className="mt-4 text-xl text-text-secondary">Go from random ingredients to a delicious, authentic meal in minutes.</p>
          </div>

          <div className="relative max-w-7xl mx-auto px-4">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-slate-200 via-emerald-100 to-slate-200 -translate-y-1/2 rounded-full z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 relative z-10">
                {howItWorksSteps.map((step, index) => (
                    <div 
                        key={step.title} 
                        className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 ease-out flex flex-col items-center text-center"
                    >
                        {/* Step Number Badge - Floating 3D Effect */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 text-white text-2xl font-bold font-display rounded-full flex items-center justify-center shadow-lg ring-8 ring-white z-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                            {index + 1}
                        </div>

                        {/* Content */}
                        <div className="mt-8 w-full">
                            <div className="mb-8 relative flex justify-center">
                                {/* Icon Background Glow */}
                                <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
                                <div className="relative z-10">
                                    {step.icon}
                                </div>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                                {step.title}
                            </h3>
                            <p className="text-lg text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>

      <Connector type="left" />

      {/* Why Us Section - UPDATED BIG BOX */}
      <section className="py-4 md:py-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"></div>

            <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary tracking-tight">Why Foody Makeit?</h2>
                <p className="mt-6 text-xl text-text-secondary">Your secret weapon for authentic flavors. Whether you're new to a cuisine or a seasoned pro, Foody Makeit is for you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {whyUsItems.map((item, index) => (
                    <div 
                        key={index} 
                        className="group bg-slate-50 rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6 border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className={`${item.color} w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform duration-300`}>
                            {item.icon}
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-bold font-display text-text-primary mb-2">{item.title}</h3>
                            <p className="text-lg text-text-secondary leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Connector type="right" />

      {/* NEW SECTION: Real-Time Generation Disclaimer */}
      <section className="py-4 md:py-8 relative z-10">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-slate-700 relative overflow-hidden text-white group">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl group-hover:animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl group-hover:animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Scanning line animation */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent transform -skew-x-12 animate-scan opacity-20"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="flex-shrink-0 bg-white/10 p-6 rounded-full backdrop-blur-sm animate-[spin_10s_linear_infinite]">
                      <SparklesIcon className="w-16 h-16 text-emerald-400" />
                  </div>
                  <div className="text-center md:text-left">
                      <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Authentic Intelligence</h2>
                      <h3 className="text-xl font-medium text-emerald-400 mb-6 uppercase tracking-widest">Real-Time Creation</h3>
                      <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
                          This is not a pre-loaded dataset. We fully generate every recipe <strong>and dish image</strong> from scratch using your specific ingredients. Because we are creating a unique culinary experience just for you in real-time, it takes a moment to prepare your dish.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      <Connector type="left" />

      {/* Inspiration Section - UPDATED BIG BOX */}
       <section className="py-4 md:py-8 relative z-10">
         <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"></div>
            
            {/* Background Blob */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-50 via-transparent to-transparent opacity-60"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                 <div className="order-first relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-rose-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <div className="animate-[float_6s_ease-in-out_infinite]">
                        <InspirationGallery className="w-full h-auto transform hover:scale-105 transition-transform duration-700" />
                    </div>
                </div>
                
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary mb-6">Get Inspired</h2>
                    <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                        Don't know where to start? Discover delicious possibilities you can create with what you already have.
                    </p>
                    <div className="rounded-2xl p-1">
                        <InspirationWidget />
                    </div>
                </div>
            </div>
         </div>
      </section>

      <Connector type="right" />

      {/* FAQ Section - BIG BOX */}
      <section className="py-4 md:py-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"></div>
            
            <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary tracking-tight">Frequently Asked Questions</h2>
                <p className="mt-6 text-xl text-text-secondary">Everything you need to know about cooking with AI.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className="border border-border-color rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md bg-slate-50 hover:bg-white"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="text-lg font-bold font-display text-text-primary pr-4">{item.question}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 bg-primary border-primary text-white' : 'text-text-secondary'}`}>
                       <ChevronDownIcon className={`w-5 h-5 ${openFaqIndex === index ? 'text-white' : 'text-current'}`} />
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 text-text-secondary leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      <Connector type="left" />

      {/* Final CTA - CREATIVE ANIMATION BIG BOX */}
      <section className="py-4 md:py-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 border border-slate-100 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500"></div>
             
             {/* Animated Background Elements */}
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-60 animate-[pulse_4s_ease-in-out_infinite]"></div>
             <div className="absolute top-10 right-10 text-slate-50 opacity-20 transform rotate-12 scale-[2]">
                 <ChefHatIcon className="w-32 h-32" />
             </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-violet-100 to-rose-100 rounded-2xl mb-6 shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    <ChefHatIcon className="w-10 h-10 text-violet-600" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-display text-text-primary leading-tight tracking-tight">
                    Ready to Unleash Your Inner Chef?
                </h2>
                <p className="mt-6 text-xl md:text-2xl text-text-secondary font-medium">
                    Stop wondering what to make for dinner. Start creating authentic flavors.
                </p>
                <div className="mt-10 flex flex-col items-center">
                    <button
                        onClick={onStartCooking}
                        className="bg-gradient-to-r from-violet-600 to-rose-500 text-white font-bold py-5 px-12 rounded-xl text-xl shadow-lg shadow-rose-200 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-200 hover:-translate-y-2 transform"
                    >
                        Let's Get Cooking!
                    </button>
                     <p className="mt-4 text-base font-semibold text-violet-400">Get 10 free recipes when you sign up.</p>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
