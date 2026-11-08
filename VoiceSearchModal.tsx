import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Globe, Sparkles } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceResult: (text: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onVoiceResult,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState<'bn-BD' | 'en-US'>('bn-BD');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      stopListening();
    }
    return () => {
      stopListening();
    };
  }, [isOpen, language]);

  const startListening = () => {
    setErrorMessage(null);
    setTranscript('');

    // Check SpeechRecognition support
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage('আপনার ব্রাউজারে ভয়েস রিকগনিশন সাপোর্ট নেই। অনুগ্রহ করে ক্রোম ব্রাউজার ব্যবহার করুন বা টাইপ করে সার্চ করুন।');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.continuous = false;
      recognition.interimResults = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onstart = () => {
        setIsListening(true);
        soundEffects.playClick();
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let finalStr = '';
        let interimStr = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalStr += event.results[i][0].transcript;
          } else {
            interimStr += event.results[i][0].transcript;
          }
        }
        const text = finalStr || interimStr;
        setTranscript(text);
        if (finalStr) {
          setTimeout(() => {
            handleConfirm(finalStr);
          }, 800);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setErrorMessage('ভয়েস সনাক্ত করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setErrorMessage('ভয়েস রেকর্ডার চালু করতে ব্যর্থ হয়েছে।');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const handleConfirm = (queryText: string) => {
    const finalVal = queryText.trim() || transcript.trim();
    if (finalVal) {
      soundEffects.playSearchDing();
      onVoiceResult(finalVal);
      onClose();
    }
  };

  const toggleLanguage = () => {
    soundEffects.playClick();
    setLanguage((prev) => (prev === 'bn-BD' ? 'en-US' : 'bn-BD'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Language selector */}
        <button
          onClick={toggleLanguage}
          className="mb-6 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-full flex items-center border border-slate-700 transition"
        >
          <Globe className="w-3.5 h-3.5 mr-1 text-blue-400" />
          ভাষা: {language === 'bn-BD' ? 'বাংলা (BD)' : 'English (US)'}
        </button>

        {/* Animated Microphone Icon */}
        <div className="relative my-4 flex items-center justify-center">
          {isListening && (
            <>
              <div className="absolute w-28 h-28 rounded-full bg-red-500/20 animate-ping pointer-events-none" />
              <div className="absolute w-36 h-36 rounded-full bg-red-500/10 animate-pulse pointer-events-none" />
            </>
          )}
          <button
            onClick={() => {
              if (isListening) {
                stopListening();
              } else {
                startListening();
              }
            }}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-95 ${
              isListening
                ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {isListening ? <Mic className="w-9 h-9 animate-bounce" /> : <MicOff className="w-8 h-8" />}
          </button>
        </div>

        {/* Status text */}
        <h3 className="text-white font-bold text-lg mt-2">
          {isListening ? 'শুনছি, বলুন...' : 'ভয়েস বন্ধ রয়েছে'}
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-[260px]">
          {isListening
            ? 'মোবাইলের কোনো ফাইল, গান, কন্টাক্ট নম্বর বা অনলাইন কিছু জানতে বলুন'
            : 'মাইক্রোফোনে ক্লিক করে কথা বলুন'}
        </p>

        {/* Live Transcript */}
        <div className="w-full my-5 min-h-[56px] p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center">
          {transcript ? (
            <p className="text-sm font-semibold text-lime-300 animate-in fade-in">
              &quot;{transcript}&quot;
            </p>
          ) : (
            <span className="text-xs text-slate-500 italic flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
              যেমন: &quot;আম্মুর ফোন নম্বর&quot; বা &quot;সূরা আর রহমান&quot;
            </span>
          )}
        </div>

        {errorMessage && (
          <p className="text-xs text-rose-400 mb-3 bg-rose-950/40 p-2 rounded-xl border border-rose-800/40">
            {errorMessage}
          </p>
        )}

        {/* Quick Voice Simulation / Suggestion Chips */}
        <div className="w-full mb-3">
          <span className="text-[10px] text-slate-400 block mb-1.5 text-left">ভয়েস টেস্ট করতে ক্লিক করুন:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'আম্মুর ফোন নম্বর',
              'সূরা আর রহমান',
              'বিদ্যুৎ বিল পিডিএফ',
              'নতুন বাংলা গান',
              'ক্যালকুলেটর',
            ].map((sample) => (
              <button
                key={sample}
                onClick={() => {
                  soundEffects.playClick();
                  setTranscript(sample);
                  setTimeout(() => handleConfirm(sample), 600);
                }}
                className="text-[10px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
              >
                🗣️ &quot;{sample}&quot;
              </button>
            ))}
          </div>
        </div>

        {/* Search button if transcript exists */}
        {transcript && (
          <button
            onClick={() => handleConfirm(transcript)}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
          >
            &quot;{transcript}&quot; লিখে সার্চ করুন
          </button>
        )}
      </div>
    </div>
  );
};
