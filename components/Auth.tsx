import React, { useState } from 'react';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { EyeIcon } from './icons/EyeIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';
import { signUp, login } from '../services/authService';
import type { User } from '../types';
import Loader from './Loader';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess, onBack }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
        if (!fullName || !phoneNumber || !email || !password) {
            setError('Please fill in all required fields.');
            return;
        }
    } else { // login mode
        if (!email || !password) {
            setError('Please fill in email and password.');
            return;
        }
    }

    setIsLoading(true);
    try {
        let user: User;
        if (mode === 'signup') {
            user = await signUp(fullName, email, password, phoneNumber);
        } else {
            user = await login(email, password);
        }
        onLoginSuccess(user);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleModeChange = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setError('');
    setEmail('');
    setPassword('');
    setFullName('');
    setPhoneNumber('');
    setShowPassword(false);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-slide-up">
       <div className="text-center mb-6">
            <h2 className="text-3xl font-bold font-display text-text-primary">
                {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="text-text-secondary mt-2">
                {mode === 'login' ? 'Log in to continue your culinary journey.' : 'Sign up and get your first 10 AI-generated recipes for free.'}
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
                  Full Name *
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
                  Phone Number *
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
            <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pr-10 bg-surface border-2 border-border-color rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-primary focus:outline-none"
                    tabIndex={-1}
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                        <EyeIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-bold disabled:opacity-75"
            >
              {isLoading ? <Loader /> : <><LockClosedIcon className="w-5 h-5" /><span>{mode === 'login' ? 'Login' : 'Create Account'}</span></>}
            </button>
          </div>

          <div className="text-center text-sm">
             {mode === 'login' ? (
                 <p className="text-text-secondary">
                     Don't have an account?{' '}
                     <button
                         type="button"
                         onClick={() => handleModeChange('signup')}
                         className="font-semibold text-primary hover:text-primary-focus hover:underline"
                     >
                         Sign up
                     </button>
                 </p>
             ) : (
                 <p className="text-text-secondary">
                     Already have an account?{' '}
                     <button
                         type="button"
                         onClick={() => handleModeChange('login')}
                         className="font-semibold text-primary hover:text-primary-focus hover:underline"
                     >
                         Sign in
                     </button>
                 </p>
             )}
         </div>
        </form>
      </div>

       <div className="text-center mt-6">
            <button 
                onClick={onBack}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
                &larr; Go Back
            </button>
        </div>
    </div>
  );
};

export default Auth;