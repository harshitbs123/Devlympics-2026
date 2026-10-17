import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/auth/AuthContext';
import RealSignPlayer from '../../components/RealSignPlayer';
import { parseSpeechToSignTokens } from '../../data/islDictionary';
import {
  ArrowLeftIcon,
  MicIcon,
  MicOffIcon,
  SparklesIcon,
  RotateCcwIcon,
  Volume2Icon,
} from '../../components/ui/Icons';

const SpeechToSignPage = () => {
  const { user } = useAuth();
  const [selectedLang, setSelectedLang] = useState(user?.preferredLanguage === 'hi' ? 'hi' : 'en');
  const [isListening, setIsListening] = useState(false);
  const [capturedSpeech, setCapturedSpeech] = useState(
    selectedLang === 'hi'
      ? 'नमस्ते, शुभ प्रभात। क्या मैं आपकी मदद करूँ?'
      : 'Hello, good morning. Shall I help you?'
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSignIndex, setActiveSignIndex] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [speechError, setSpeechError] = useState(null);

  const recognitionRef = useRef(null);

  // 1. Parse text into sign tokens with exact durations and greedy multi-word matching
  const signSequence = useMemo(() => {
    return parseSpeechToSignTokens(capturedSpeech);
  }, [capturedSpeech]);

  // Reset index when text changes
  useEffect(() => {
    setActiveSignIndex(0);
  }, [signSequence]);

  // 2. Web Speech API Setup
  const startSpeechRecognition = useCallback(() => {
    setSpeechError(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError('Web Speech API is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setCapturedSpeech(transcript.trim());
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission was denied.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  }, [selectedLang]);

  const stopSpeechRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    if (isListening) {
      stopSpeechRecognition();
    }
    setCapturedSpeech(
      lang === 'hi'
        ? 'नमस्ते, शुभ प्रभात। क्या मैं आपकी मदद करूँ?'
        : 'Hello, good morning. Shall I help you?'
    );
  };

  return (
    <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col"
      >
        {/* Top Header & Breadcrumbs */}
        <div className="flex items-center justify-between border-b-2 border-[#121316] pb-4">
          <Link
            to="/app"
            className="flex items-center gap-2 rounded-full border-2 border-[#121316] bg-white px-4 py-1.5 text-xs font-black text-[#121316] shadow-[2px_2.5px_0_#121316] transition hover:bg-stone-50 active:translate-y-0.5"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Language Switch */}
          <div className="flex rounded-full border-2 border-[#121316] bg-white p-0.5 text-xs font-black shadow-[2px_2px_0_#121316]">
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`rounded-full px-3 py-1 transition ${
                selectedLang === 'en' ? 'bg-[#121316] text-[#FFE600] font-black' : 'text-stone-600 hover:text-black'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('hi')}
              className={`rounded-full px-3 py-1 transition ${
                selectedLang === 'hi' ? 'bg-[#121316] text-[#FFE600] font-black' : 'text-stone-600 hover:text-black'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-[#121316] bg-[#FFAE33] px-3 py-0.5 text-[11px] font-black uppercase text-[#121316] shadow-[1.5px_2px_0_#121316]">
              <span>⚡ ACOUSTIC DECODER</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-[#121316]">
              Speech & Text to Real Sign Language
            </h1>
            <p className="font-sans text-xs text-stone-600 font-medium mt-1">
              Listens to spoken {selectedLang === 'hi' ? 'हिंदी' : 'English'} dialogue and sequences through 119 authentic Indian Sign Language (ISL) demonstration clips.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-black text-[#121316] bg-[#FFE600] border-2 border-[#121316] rounded-full px-4 py-1.5 shadow-[2px_2px_0_#121316]">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-ping" />
            <span>119 Real Human Signs ⚡</span>
          </div>
        </div>

        {speechError && (
          <div className="mt-4 rounded-2xl bg-amber-50 border-2 border-[#121316] p-3.5 text-xs font-bold text-amber-950 shadow-[2px_2px_0_#121316]">
            {speechError}
          </div>
        )}

        {/* Workspace Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (7 Cols): Real Human Sign Player */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <RealSignPlayer
              tokens={signSequence}
              activeSignIndex={activeSignIndex}
              setActiveSignIndex={setActiveSignIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              speed={speed}
              setSpeed={setSpeed}
            />

            {/* Hint */}
            <div className="flex items-center gap-3 rounded-2xl border-2 border-[#121316] bg-white p-3.5 text-xs font-medium text-stone-700 shadow-[2px_2px_0_#121316]">
              <SparklesIcon className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Natural Duration Timing:</strong> Each sign plays through its authentic timing before smoothly advancing.
              </span>
            </div>
          </div>

          {/* Right Column (5 Cols): Speech Transcript & Controls */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="rounded-2xl border-2 border-[#121316] bg-white p-5 shadow-[4px_4px_0_#121316]">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-black uppercase tracking-wider text-[#2563EB]">
                  Transcribed Acoustic Dialogue
                </span>
                <span className="rounded-full border border-[#121316] bg-[#FFE600] px-2.5 py-0.5 text-[10px] font-black uppercase">
                  {selectedLang === 'hi' ? 'हिंदी' : 'English'}
                </span>
              </div>

              <textarea
                value={capturedSpeech}
                onChange={(e) => setCapturedSpeech(e.target.value)}
                rows={4}
                placeholder={selectedLang === 'hi' ? 'यहाँ बोलें या टाइप करें...' : 'Speak or type here...'}
                className="mt-3 w-full rounded-2xl border-2 border-[#121316] bg-[#FBF9F4] p-3.5 text-sm font-bold text-[#121316] focus:border-[#121316] focus:bg-white focus:outline-none transition leading-relaxed"
              />

              <div className="mt-4 flex items-center justify-between pt-3 border-t-2 border-stone-100">
                
                {/* Mic Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-4 py-2 text-xs font-black uppercase tracking-wider transition shadow-[2px_2.5px_0_#121316] active:translate-y-0.5 ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-[#FFE600] text-[#121316] hover:bg-yellow-300'
                  }`}
                >
                  {isListening ? <MicOffIcon className="w-3.5 h-3.5" /> : <MicIcon className="w-3.5 h-3.5" />}
                  <span>{isListening ? 'Stop Listening' : 'Start Mic Input'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCapturedSpeech('')}
                    className="flex items-center gap-1 rounded-full border-2 border-[#121316] bg-white px-3.5 py-2 text-xs font-bold text-stone-700 shadow-[2px_2px_0_#121316] hover:bg-stone-50 transition active:translate-y-0.5"
                  >
                    <RotateCcwIcon className="w-3 h-3" />
                    <span>Clear</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if ('speechSynthesis' in window && capturedSpeech) {
                        window.speechSynthesis.cancel();
                        const utt = new SpeechSynthesisUtterance(capturedSpeech);
                        utt.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-US';
                        window.speechSynthesis.speak(utt);
                      }
                    }}
                    className="flex items-center gap-1 rounded-full border-2 border-[#121316] bg-[#121316] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#FFE600] shadow-[2px_2.5px_0_#121316] hover:bg-stone-800 transition active:translate-y-0.5"
                    title="Audio Read Aloud"
                  >
                    <Volume2Icon className="w-3 h-3" />
                    <span>Audio</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Quick Dialogue Samples */}
            <div className="rounded-2xl border-2 border-[#121316] bg-white p-4.5 shadow-[3px_3px_0_#121316]">
              <span className="font-sans text-xs font-black uppercase tracking-wider text-stone-700 block mb-3">
                Quick Prompts to Test (119 Signs)
              </span>
              <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-1">
                {[
                  selectedLang === 'hi' ? 'नमस्ते, शुभ प्रभात।' : 'Hello, good morning.',
                  selectedLang === 'hi' ? 'क्या मैं आपकी मदद करूँ?' : 'Shall I help you?',
                  selectedLang === 'hi' ? 'कृपया एम्बुलेंस बुलाइए!' : 'Please call the ambulance!',
                  selectedLang === 'hi' ? 'आपका नाम क्या है?' : 'What is your name?',
                  selectedLang === 'hi' ? 'आपसे मिलकर खुशी हुई।' : 'Nice to meet you.',
                  selectedLang === 'hi' ? 'क्या कल मिल सकते हैं?' : 'Can we meet tomorrow?',
                  selectedLang === 'hi' ? 'शौचालय कहाँ है?' : 'Where is the bathroom?',
                  selectedLang === 'hi' ? 'पुलिस स्टेशन कहाँ है?' : 'Where is the police station?',
                  selectedLang === 'hi' ? 'मुझे कुछ समझ नहीं आया।' : 'I dont understand anything.',
                  selectedLang === 'hi' ? 'चिंता मत करो, मैं ठीक हूँ।' : 'Dont worry, I am fine.',
                  selectedLang === 'hi' ? 'कमरा साफ करें और दरवाजा खोलिए।' : 'Clean the room and open the door.',
                  selectedLang === 'hi' ? 'मेरा नाम कपिल है।' : 'My name is Kapil.',
                ].map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCapturedSpeech(s)}
                    className="rounded-xl border-2 border-[#121316] bg-stone-50 p-2.5 text-left text-xs font-bold text-stone-800 shadow-[1.5px_1.5px_0_#121316] hover:bg-amber-100 hover:-translate-y-0.5 transition active:translate-y-0.5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default SpeechToSignPage;
