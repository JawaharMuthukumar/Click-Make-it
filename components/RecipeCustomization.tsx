import React, { useState, useRef, useEffect } from 'react';
import { TASTE_PROFILES, TASTE_SUGGESTIONS, COMMON_INGREDIENTS, ALL_COUNTRIES, CULINARY_LOCATIONS, REGIONAL_TASTE_INGREDIENTS, GENERIC_TASTE_INGREDIENTS } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import Loader from './Loader';
import { transcribeAudio } from '../services/geminiService';

interface RecipeCustomizationProps {
  userLocation: { country: string; state: string; } | null;
  onSubmit: (data: { ingredients: string; country: string; state: string; mealType: string; servings: number; method: string; style: string; taste: string; creativity: string; }) => void;
  onBack: () => void;
  error: string | null;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`p-6 bg-white rounded-2xl shadow-md ${className}`}>
        <h3 className="text-lg font-semibold text-text-primary mb-4 text-center sm:text-left">{title}</h3>
        {children}
    </div>
);

const RecipeCustomization: React.FC<RecipeCustomizationProps> = ({ userLocation, onSubmit, onBack, error }) => {
    // Customization state
    const [servings, setServings] = useState(2);
    const [taste, setTaste] = useState(TASTE_PROFILES[0]);
    const [mealType, setMealType] = useState('Dinner'); 
    
    // Toggle for extra inputs
    const [showExtras, setShowExtras] = useState(false);

    // Location state
    const [country, setCountry] = useState(userLocation?.country || '');
    const [state, setState] = useState(userLocation?.state || '');

    // Location Autocomplete State
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
    const [activeCountryIndex, setActiveCountryIndex] = useState(-1);

    const [filteredStates, setFilteredStates] = useState<string[]>([]);
    const [showStateSuggestions, setShowStateSuggestions] = useState(false);
    const [activeStateIndex, setActiveStateIndex] = useState(-1);

    const countryInputRef = useRef<HTMLInputElement>(null);
    const stateInputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    // Ingredient Input state
    const [textIngredients, setTextIngredients] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
    
    // Ingredient Autocomplete state
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowCountrySuggestions(false);
                setShowStateSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Ingredient Autocomplete Handlers ---
    const updateSuggestions = (text: string, cursorPos: number) => {
        const textBeforeCursor = text.slice(0, cursorPos);
        const lastCommaIndex = textBeforeCursor.lastIndexOf(',');
        const currentSegment = textBeforeCursor.slice(lastCommaIndex + 1).trim().toLowerCase();
        
        if (currentSegment.length >= 2) {
            const matches = COMMON_INGREDIENTS.filter(ingredient => 
                ingredient.toLowerCase().includes(currentSegment) && 
                ingredient.toLowerCase() !== currentSegment 
            ).slice(0, 5); 
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const pos = e.target.selectionStart;
        setTextIngredients(text);
        setCursorPosition(pos);
        updateSuggestions(text, pos);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (textAreaRef.current) {
            setCursorPosition(textAreaRef.current.selectionStart);
            updateSuggestions(textIngredients, textAreaRef.current.selectionStart);
        }
    };
    
    const handleClick = () => {
        if (textAreaRef.current) {
            setCursorPosition(textAreaRef.current.selectionStart);
            updateSuggestions(textIngredients, textAreaRef.current.selectionStart);
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        const textBeforeCursor = textIngredients.slice(0, cursorPosition);
        const textAfterCursor = textIngredients.slice(cursorPosition);
        const lastCommaIndex = textBeforeCursor.lastIndexOf(',');
        const prefix = textBeforeCursor.slice(0, lastCommaIndex + 1);
        const newText = prefix + (prefix.length > 0 && !prefix.endsWith(' ') ? ' ' : '') + suggestion + ', ' + textAfterCursor.trimStart();
        
        setTextIngredients(newText);
        setSuggestions([]);
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    };

    // --- Location Autocomplete Handlers ---

    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        setCountry(userInput);
        if (state) setState('');

        if (userInput.trim()) {
            const filtered = ALL_COUNTRIES.filter(
                (c) => c.toLowerCase().startsWith(userInput.toLowerCase())
            );
            setFilteredCountries(filtered);
            setShowCountrySuggestions(true);
            setActiveCountryIndex(-1);
        } else {
            setShowCountrySuggestions(false);
        }
    };

    const selectCountry = (selectedCountry: string) => {
        setCountry(selectedCountry);
        setShowCountrySuggestions(false);
        setActiveCountryIndex(-1);
    };

    const handleCountryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (activeCountryIndex > -1 && filteredCountries[activeCountryIndex]) {
                 selectCountry(filteredCountries[activeCountryIndex]);
            } else if (filteredCountries.length > 0) {
                 selectCountry(filteredCountries[0]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!showCountrySuggestions && filteredCountries.length > 0) {
                 setShowCountrySuggestions(true);
                 setActiveCountryIndex(0);
            } else if (activeCountryIndex < filteredCountries.length - 1) {
                 setActiveCountryIndex(prev => prev + 1);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
             if (activeCountryIndex > 0) {
                 setActiveCountryIndex(prev => prev - 1);
            }
        } else if (e.key === 'Escape') {
             setShowCountrySuggestions(false);
        }
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        setState(userInput);

        if (userInput.trim() && country && CULINARY_LOCATIONS[country]) {
            const filtered = CULINARY_LOCATIONS[country].filter(
                (s) => s.toLowerCase().startsWith(userInput.toLowerCase())
            );
            setFilteredStates(filtered);
            setShowStateSuggestions(true);
            setActiveStateIndex(-1);
        } else {
            setShowStateSuggestions(false);
        }
    };

    const selectState = (selectedState: string) => {
        setState(selectedState);
        setShowStateSuggestions(false);
        setActiveStateIndex(-1);
    };

    const handleStateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter') {
            e.preventDefault();
            if (activeStateIndex > -1 && filteredStates[activeStateIndex]) {
                 selectState(filteredStates[activeStateIndex]);
            } else if (filteredStates.length > 0) {
                 selectState(filteredStates[0]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!showStateSuggestions && filteredStates.length > 0) {
                 setShowStateSuggestions(true);
                 setActiveStateIndex(0);
            } else if (activeStateIndex < filteredStates.length - 1) {
                 setActiveStateIndex(prev => prev + 1);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
             if (activeStateIndex > 0) {
                 setActiveStateIndex(prev => prev - 1);
            }
        } else if (e.key === 'Escape') {
             setShowStateSuggestions(false);
        }
    };

    // --- Mic Handler ---
    const handleMicClick = async () => {
        setTranscriptionError(null);
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                const audioChunks: Blob[] = [];

                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = async () => {
                    setIsProcessing(true);
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    try {
                        const transcribedText = await transcribeAudio(audioBlob);
                        setTextIngredients(prev => prev ? `${prev}, ${transcribedText}` : transcribedText);
                    } catch (err) {
                        console.error("Transcription error:", err);
                        setTranscriptionError("Failed to transcribe audio.");
                    } finally {
                        setIsProcessing(false);
                        stream.getTracks().forEach(track => track.stop());
                    }
                };

                mediaRecorder.start();
                setIsRecording(true);
            } catch (err: any) {
                console.error("Error accessing microphone:", err);
                if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                    setTranscriptionError("No microphone found. Please connect a microphone.");
                } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                     setTranscriptionError("Microphone access denied.");
                } else {
                     setTranscriptionError("Could not access microphone.");
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (textIngredients.trim() && country.trim()) {
            onSubmit({
                ingredients: textIngredients,
                country,
                state,
                mealType,
                servings,
                method: 'Stove', // Defaults as requested to remove these inputs
                style: 'Standard',
                taste,
                creativity: 'Standard'
            });
        }
    };

    const handleServingsChange = (amount: number) => {
        setServings(prev => Math.max(1, prev + amount));
    };

    const getTasteIngredients = () => {
        const countryKey = Object.keys(REGIONAL_TASTE_INGREDIENTS).find(k => k.toLowerCase() === country.trim().toLowerCase());
        
        if (countryKey) {
            const countryData = REGIONAL_TASTE_INGREDIENTS[countryKey];
            
            const stateKey = Object.keys(countryData).find(k => k.toLowerCase() === state.trim().toLowerCase());
            
            if (stateKey && countryData[stateKey][taste]) {
                return countryData[stateKey][taste];
            }
            
            if (countryData["General"] && countryData["General"][taste]) {
                return countryData["General"][taste];
            }
        }
        
        return GENERIC_TASTE_INGREDIENTS[taste] || [];
    };

    const suggestedTasteIngredients = getTasteIngredients();

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-slide-up pb-20">
            <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Back to Dashboard</button>
            
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 text-text-primary">Create Your Meal</h2>
                <p className="text-text-secondary">Customize your preferences and list what you have.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Cuisine Region */}
                <Section title="1. Choose the Cuisine Region">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative" ref={suggestionsRef}>
                        {/* Country Input */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-text-secondary mb-1">Country *</label>
                            <input
                                ref={countryInputRef}
                                type="text"
                                value={country}
                                onChange={handleCountryChange}
                                onKeyDown={handleCountryKeyDown}
                                onFocus={() => country && handleCountryChange({ target: { value: country } } as any)}
                                placeholder="e.g., Italy, Mexico"
                                className="w-full p-3 bg-slate-50 border border-border-color rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                                required
                            />
                             {showCountrySuggestions && filteredCountries.length > 0 && (
                                <ul className="absolute z-20 w-full bg-white border border-border-color rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto">
                                    {filteredCountries.map((c, index) => (
                                        <li
                                            key={c}
                                            onClick={() => selectCountry(c)}
                                            className={`px-4 py-2 cursor-pointer hover:bg-slate-50 ${index === activeCountryIndex ? 'bg-primary/10 text-primary font-medium' : 'text-text-primary'}`}
                                        >
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* State Input */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-text-secondary mb-1">Region / State</label>
                            <input
                                ref={stateInputRef}
                                type="text"
                                value={state}
                                onChange={handleStateChange}
                                onKeyDown={handleStateKeyDown}
                                onFocus={() => state && handleStateChange({ target: { value: state } } as any)}
                                placeholder={country ? `e.g., ${CULINARY_LOCATIONS[country]?.[0] || 'Region'}` : "Select country first"}
                                className="w-full p-3 bg-slate-50 border border-border-color rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                                disabled={!country}
                            />
                             {showStateSuggestions && filteredStates.length > 0 && (
                                <ul className="absolute z-20 w-full bg-white border border-border-color rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto">
                                    {filteredStates.map((s, index) => (
                                        <li
                                            key={s}
                                            onClick={() => selectState(s)}
                                            className={`px-4 py-2 cursor-pointer hover:bg-slate-50 ${index === activeStateIndex ? 'bg-primary/10 text-primary font-medium' : 'text-text-primary'}`}
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </Section>

                 {/* 2. Meal Type */}
                <Section title="2. Choose the Meal Type">
                    <div className="grid grid-cols-3 gap-3">
                        {['Breakfast', 'Lunch', 'Dinner'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setMealType(type)}
                                className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-xl transition-all duration-200 ${mealType === type ? 'bg-primary text-white border-primary shadow-md' : 'bg-slate-50 border-border-color text-text-secondary hover:bg-white hover:border-primary/50'}`}
                            >
                                {type === 'Dinner' ? <MoonIcon className={`w-6 h-6 ${mealType === type ? 'text-white' : 'text-slate-400'}`} /> : <SunIcon className={`w-6 h-6 ${mealType === type ? 'text-white' : 'text-slate-400'}`} />}
                                <span className="font-semibold text-sm">{type}</span>
                            </button>
                        ))}
                    </div>
                </Section>

                {/* 3. Ingredients / Dish Idea */}
                <Section title="3. Ingredients or Dish Idea" className="relative">
                    <p className="text-sm text-text-secondary mb-3">Type ingredients (chicken, rice) or a dish idea (spicy pasta).</p>
                    <div className="relative">
                        <textarea
                            ref={textAreaRef}
                            value={textIngredients}
                            onChange={handleInputChange}
                            onKeyUp={handleKeyUp}
                            onClick={handleClick}
                            placeholder={isRecording ? "Listening..." : isProcessing ? "Transcribing..." : "e.g., 2 eggs, flour, milk... OR I want something spicy with chicken..."}
                            className="w-full h-32 p-4 bg-slate-50 border border-border-color rounded-xl focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                        />
                        <button
                            type="button"
                            onClick={handleMicClick}
                            disabled={isProcessing}
                            className={`absolute bottom-4 right-4 p-2 rounded-full transition-all shadow-sm ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-text-secondary hover:text-primary border border-slate-200'}`}
                            title="Use Voice Input"
                        >
                            {isProcessing ? <Loader /> : <MicrophoneIcon className="w-6 h-6" />}
                        </button>
                        
                        {/* Ingredient Suggestions Popup */}
                        {suggestions.length > 0 && (
                            <ul className="absolute bottom-full left-0 w-full bg-white border border-border-color rounded-xl mb-1 shadow-lg max-h-48 overflow-y-auto z-30">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="px-4 py-2 cursor-pointer hover:bg-slate-50 text-text-primary border-b border-slate-100 last:border-0 flex items-center gap-2"
                                    >
                                        <span className="text-primary">+</span> {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {transcriptionError && <p className="text-xs text-red-500 mt-2">{transcriptionError}</p>}
                </Section>

                {/* Extras Toggle */}
                <div className="flex justify-center">
                     <button
                        type="button"
                        onClick={() => setShowExtras(!showExtras)}
                        className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-focus bg-primary/5 px-4 py-2 rounded-full transition-colors"
                     >
                        {showExtras ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        {showExtras ? "Hide Extras" : "Add Extras (Servings & Taste)"}
                     </button>
                </div>

                {/* Collapsible Extras */}
                {showExtras && (
                    <div className="space-y-6 animate-fade-in-slide-up">
                         <Section title="Number of Servings">
                            <div className="flex items-center justify-center gap-6">
                                <button type="button" onClick={() => handleServingsChange(-1)} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold text-xl hover:bg-slate-200 transition-colors">-</button>
                                <span className="text-2xl font-bold font-display text-primary w-8 text-center">{servings}</span>
                                <button type="button" onClick={() => handleServingsChange(1)} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold text-xl hover:bg-slate-200 transition-colors">+</button>
                            </div>
                        </Section>

                        <Section title="Taste Profile">
                             <div className="flex flex-wrap gap-2 justify-center">
                                {TASTE_PROFILES.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setTaste(t)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${taste === t ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary border-border-color hover:border-primary/50'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="mt-4 bg-slate-50 border border-border-color rounded-xl p-4">
                                <p className="text-sm font-semibold text-text-primary mb-2">
                                    Authentic {taste} ingredients for {state ? `${state}, ` : ''}{country || 'your meal'}:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedTasteIngredients.map((ing, i) => (
                                        <span key={i} className="text-xs bg-white border border-border-color text-text-secondary px-2 py-1 rounded-md shadow-sm font-medium">
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Section>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-center">
                        <p>{error}</p>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!textIngredients.trim() || !country.trim()}
                        className="w-full bg-gradient-to-r from-primary to-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        Generate Recipe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecipeCustomization;