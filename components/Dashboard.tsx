import React from 'react';

interface DashboardProps {
  onStart: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-slide-up">
      <section className="bg-white rounded-2xl p-6 md:p-10 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">Ready to Cook?</h2>
        <p className="mt-3 text-lg text-text-secondary">Let's start by setting up your cooking preferences.</p>
        <div className="mt-8">
          <button
            onClick={onStart}
            className="bg-primary text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-primary-focus hover:shadow-lg transform hover:-translate-y-1"
          >
            Let's Get Cooking
          </button>
        </div>
         <p className="mt-6 text-sm text-slate-400">First, we'll ask for serving sizes and your available appliances.</p>
      </section>
    </div>
  );
};

export default Dashboard;