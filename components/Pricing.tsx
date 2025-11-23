import React from 'react';

interface PricingProps {
  onBack: () => void;
  onSelectPlan: (plan: string) => void;
}

const PricingCard: React.FC<{
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  onSelect: () => void;
}> = ({ title, price, period, description, features, isPopular, buttonText, onSelect }) => (
  <div className={`relative p-8 bg-white rounded-2xl border-2 flex flex-col transition-transform duration-300 ${isPopular ? 'border-primary shadow-xl scale-105 z-10' : 'border-border-color shadow-lg hover:border-primary/50'}`}>
    {isPopular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
        Best Value
      </div>
    )}
    <h3 className="text-xl font-bold font-display text-text-primary">{title}</h3>
    <div className="mt-4 flex items-baseline text-text-primary">
      <span className="text-4xl font-bold tracking-tight">{price}</span>
      {period && <span className="ml-1 text-xl font-semibold text-text-secondary">/{period}</span>}
    </div>
    <p className="mt-2 text-sm text-text-secondary">{description}</p>
    
    <ul className="mt-6 space-y-4 flex-1">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="flex-shrink-0">
             <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
          </div>
          <p className="ml-3 text-sm text-text-secondary">{feature}</p>
        </li>
      ))}
    </ul>

    <button
      onClick={onSelect}
      className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-lg text-center font-bold transition-colors ${isPopular ? 'bg-primary text-white hover:bg-primary-focus' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
    >
      {buttonText}
    </button>
  </div>
);

const Pricing: React.FC<PricingProps> = ({ onBack, onSelectPlan }) => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in px-4 py-8">
      <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-8 transition-colors">&larr; Back</button>
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Simple, Transparent Pricing</h2>
        <p className="mt-4 text-xl text-text-secondary">Choose the plan that fits your cooking needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Free Plan */}
        <PricingCard
          title="Free"
          price="$0"
          description="Perfect for trying out AI cooking."
          features={[
            "5 Free AI-generated meals",
            "Access to basic recipes",
            "Standard support"
          ]}
          buttonText="Get Started"
          onSelect={() => onSelectPlan('free')}
        />

        {/* Monthly Plan */}
        <PricingCard
          title="Monthly"
          price="$19"
          period="mo"
          description="Flexible cooking assistance."
          features={[
            "Unlimited AI recipes",
            "Advanced customization",
            "Priority support",
            "Cancel anytime"
          ]}
          buttonText="Subscribe Monthly"
          onSelect={() => onSelectPlan('monthly')}
        />

        {/* Yearly Plan */}
        <PricingCard
          title="Yearly"
          price="$17"
          period="mo"
          description="Billed $204 yearly."
          features={[
            "Unlimited AI recipes",
            "Advanced customization",
            "Priority support",
            "Save $24 per year"
          ]}
          isPopular={true}
          buttonText="Subscribe Yearly"
          onSelect={() => onSelectPlan('yearly')}
        />
      </div>
    </div>
  );
};

export default Pricing;