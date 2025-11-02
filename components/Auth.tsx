import React, { useState } from 'react';
import { LockClosedIcon } from './icons/LockClosedIcon';

interface AuthProps {
  onLoginSuccess: (email: string) => void;
  onBackToHome: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
        if (!fullName || !phoneNumber || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
    } else { // login mode
        if (!email || !password) {
            setError('Please fill in email and password.');
            return;
        }
    }
    // This is a mock authentication. In a real app, you'd call an API.
    console.log(`${mode} successful for ${email}`);
    setError('');
    onLoginSuccess(email);
  };

  const handleModeChange = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setError('');
    setEmail('');
    setPassword('');
    setFullName('');
    setPhoneNumber('');
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-slide-up">
       <div className="text-center mb-6">
            <h2 className="text-3xl font-bold font-display text-text-primary">
                {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="text-text-secondary mt-2">
                {mode === 'login' ? 'Log in to continue your culinary journey.' : 'Sign up to get started with AI-powered recipes.'}
            </p>
        </div>

      <div className="bg-surface rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex border-b border-border-color mb-6">
          <button
            onClick={() => handleModeChange('login')}
            className={`w-1/2 py-3 font-semibold text-center transition-colors ${mode === 'login' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`}
          >
            Login
          </button>
          <button
            onClick={() => handleModeChange('signup')}
            className={`w-1/2 py-3 font-semibold text-center transition-colors ${mode === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-text-primary">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-surface border-2 border-border-color rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-text-primary">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-surface border-2 border-border-color rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-surface border-2 border-border-color rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-surface border-2 border-border-color rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-bold"
            >
              <LockClosedIcon className="w-5 h-5" />
              <span>{mode === 'login' ? 'Login' : 'Create Account'}</span>
            </button>
          </div>
        </form>
      </div>

       <div className="text-center mt-6">
            <button 
                onClick={onBackToHome}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
                &larr; Or go back to Home
            </button>
        </div>
    </div>
  );
};

export default Auth;