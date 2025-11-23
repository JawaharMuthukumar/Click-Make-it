import React, { useState, useRef, useEffect } from 'react';
import { KeyboardIcon } from './icons/KeyboardIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { transcribeAudio } from '../services/geminiService';
import Loader from './Loader';

interface IngredientInputProps {
  onSubmit: (data: string) => void;
  onBack: () => void;
  error: string | null;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onSubmit, onBack, error }) => {
  const [textIngredients, setTextIngredients] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  const [micDisabled, setMicDisabled] = useState(true);
  const [micDisabledTooltip, setMicDisabledTooltip] = useState('Checking microphone availability...');

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const hasMic = devices.some(device => device.kind === 'audioinput');
          if (hasMic) {
            setMicDisabled(false);
            setMicDisabledTooltip('');
          } else {
            setMicDisabled(true);
            setMicDisabledTooltip('No microphone detected on this device.');
          }
        })
        .catch((err) => {
          console.error("Could not check for microphone:", err);
          setMicDisabled(true);
          setMicDisabledTooltip('Could not check for microphone availability.');
        });
    } else {
      setMicDisabled(true);
      setMicDisabledTooltip('Audio recording is not supported by your browser.');
    }
  }, []);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textIngredients.trim()) {
      onSubmit(textIngredients.trim());
    }
  };

  const handleMicClick = async () => {
    setTranscriptionError(null);
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks: Blob[] = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          setIsTranscribing(true);
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          try {
            const transcribedText = await transcribeAudio(audioBlob);
            setTextIngredients(prev => prev ? `${prev}, ${transcribedText}` : transcribedText);
          } catch (err) {
            console.error("Transcription error:", err);
            setTranscriptionError(err instanceof Error ? err.message : 'Failed to transcribe audio.');
          } finally {
            setIsTranscribing(false);
            stream.getTracks().forEach(track => track.stop());
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err: any) {
        console.error("Error accessing microphone:", err);
        if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            setTranscriptionError("No microphone found. Please connect a microphone and try again.");
        } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setTranscriptionError("Microphone access denied. Please allow microphone access in your browser settings.");
        } else {
            setTranscriptionError("Could not access microphone. Please ensure it's not in use by another application.");
        }
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in-slide-up text-center">
      <button onClick={onBack} className="text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">&larr; Back to Region Selection</button>
      
      <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 text-text-primary">What ingredients do you have?</h2>
      <p className="text-text-secondary mb-8">List your ingredients below or use the microphone.</p>

      {/* Text Input Form */}
      <form onSubmit={handleTextSubmit} className="space-y-4 mb-6">
        <textarea
          value={textIngredients}
          onChange={(e) => setTextIngredients(e.target.value)}
          placeholder={isRecording ? "Recording ingredients..." : isTranscribing ? "Transcribing audio..." : "e.g., chicken breast, tomatoes, rice, onion, garlic..."}
          className="w-full h-36 p-4 bg-surface border-2 border-border-color rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition"
          aria-label="Enter ingredients"
          disabled={isRecording || isTranscribing}
        />
        <div className="flex gap-2">
            <button
              type="submit"
              disabled={!textIngredients.trim() || isRecording || isTranscribing}
              className="flex-grow bg-primary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <KeyboardIcon className="w-6 h-6" />
              <span>Use These Ingredients</span>
            </button>
            <button
                type="button"
                onClick={handleMicClick}
                disabled={isTranscribing || micDisabled}
                className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-200 text-text-primary hover:bg-slate-300'} disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={isRecording ? "Stop recording" : "Start recording ingredients"}
                title={micDisabledTooltip}
            >
                {isTranscribing ? <Loader /> : <MicrophoneIcon className="w-6 h-6" />}
            </button>
        </div>
      </form>

      {(error || transcriptionError) && (
        <div className="mt-4 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">An error occurred: </strong>
            <span className="block sm:inline">{error || transcriptionError}</span>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;