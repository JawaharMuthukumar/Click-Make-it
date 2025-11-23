import React, { useState, useEffect, useRef } from 'react';
import type { Recipe } from '../types';
import { startChat, transcribeAudio, playTextToSpeech } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { StopIcon } from './icons/StopIcon';
import { SpeakerWaveIcon } from './icons/SpeakerWaveIcon';
import Loader from './Loader';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface ChatAssistantProps {
  recipe: Recipe;
  onClose: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ recipe, onClose }) => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice Input State
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [micError, setMicError] = useState<string | null>(null);

  // Audio Playback State
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    const session = startChat(recipe);
    setChatSession(session);
    setMessages([{ role: 'model', text: `Hi there! I'm your cooking assistant. How can I help you with the "${recipe.recipeName}" recipe?` }]);
  }, [recipe]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatSession) return;

    const userMessage: ChatMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMessage.text });
      const modelMessage: ChatMessage = { role: 'model', text: response.text || "I'm sorry, I couldn't generate a response." };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = async () => {
    setMicError(null);
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        mediaRecorder.onstop = async () => {
          setIsTranscribing(true);
          const blob = new Blob(chunks, { type: 'audio/webm' });
          try {
            const text = await transcribeAudio(blob);
            setInput(prev => (prev ? `${prev} ${text}` : text));
          } catch (err) {
            console.error("Transcription failed", err);
            setMicError("Failed to process audio.");
          } finally {
            setIsTranscribing(false);
            stream.getTracks().forEach(track => track.stop());
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err: any) {
        console.error("Mic access failed", err);
        if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            setMicError("No microphone found.");
        } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setMicError("Microphone permission denied.");
        } else {
            setMicError("Could not access microphone.");
        }
      }
    }
  };

  const handleSpeak = async (text: string, index: number) => {
    if (playingIndex === index) return; // Prevent duplicate clicks
    setPlayingIndex(index);
    try {
      await playTextToSpeech(text);
    } catch (err) {
      console.error("TTS failed", err);
    } finally {
      setPlayingIndex(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 animate-fade-in" onClick={onClose}></div>
      <div className="fixed bottom-0 right-0 top-0 sm:top-auto sm:bottom-20 sm:right-6 w-full sm:w-96 max-h-full sm:max-h-[70vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-slide-up">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border-color flex-shrink-0">
          <h3 className="font-bold font-display text-lg text-primary">AI Cooking Assistant</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && (
                  <button 
                    onClick={() => handleSpeak(msg.text, index)}
                    className={`p-2 rounded-full transition-colors ${playingIndex === index ? 'text-primary animate-pulse bg-primary/10' : 'text-text-secondary hover:bg-slate-100 hover:text-primary'}`}
                    title="Read aloud"
                    disabled={playingIndex !== null}
                  >
                    <SpeakerWaveIcon className="w-5 h-5" />
                  </button>
                )}
                <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-lg' : 'bg-slate-100 text-text-primary rounded-bl-lg'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2">
                <div className="max-w-[85%] p-3 rounded-2xl bg-slate-100 text-text-primary rounded-bl-lg">
                    <Loader />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border-color flex-shrink-0">
          {micError && (
            <div className="text-xs text-red-500 mb-2 text-center bg-red-50 p-1 rounded">
                {micError}
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <div className="relative flex-grow">
               <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isRecording ? "Listening..." : isTranscribing ? "Transcribing..." : "Ask a question..."}
                  className="w-full pl-4 pr-10 py-2 bg-slate-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition"
                  disabled={isLoading || isRecording || isTranscribing}
                />
                {/* Mic Button inside input area */}
                <button
                  type="button"
                  onClick={handleMicClick}
                  disabled={isTranscribing}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${isRecording ? 'text-red-500 hover:bg-red-50 animate-pulse' : 'text-text-secondary hover:text-primary hover:bg-slate-200'}`}
                  title="Voice Input"
                >
                  {isTranscribing ? (
                    <div className="w-5 h-5"><Loader /></div>
                  ) : isRecording ? (
                    <StopIcon className="w-5 h-5" />
                  ) : (
                    <MicrophoneIcon className="w-5 h-5" />
                  )}
                </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !input.trim() || isRecording || isTranscribing}
              className="bg-primary text-white p-3 rounded-lg hover:bg-primary-focus disabled:opacity-50 transition-colors flex-shrink-0"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;