import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/auth/AuthContext';
import { useSignTranslator } from '../../hooks/useSignTranslator';
import {
  ArrowLeftIcon,
  VideoIcon,
  VideoOffIcon,
  Volume2Icon,
  CopyIcon,
  RotateCcwIcon,
  CheckIcon,
  EyeIcon,
  SparklesIcon,
  AlertTriangleIcon,
} from '../../components/ui/Icons';

const ISL_DICTIONARY = {
  hello: { en: 'Hello', hi: 'नमस्ते' },
  bye: { en: 'Goodbye', hi: 'अलविदा' },
  again: { en: 'Again', hi: 'दोबारा' },
  you: { en: 'You', hi: 'आप' },
  deaf: { en: 'Deaf', hi: 'बधिर' },
  hearing: { en: 'Hearing', hi: 'सुनने वाला' },
  teacher: { en: 'Teacher', hi: 'शिक्षक' },
  thank_you: { en: 'Thank you', hi: 'धन्यवाद' },
  welcome: { en: 'Welcome', hi: 'स्वागत है' },
  sorry: { en: 'Sorry', hi: 'क्षमा करें' },
  correct: { en: 'Correct', hi: 'सही' },
  wrong: { en: 'Wrong', hi: 'गलत' },
  good: { en: 'Good', hi: 'अच्छा' },
  morning: { en: 'Morning', hi: 'प्रभात' },
  understand: { en: 'Understand', hi: 'समझ गया' },
  yes: { en: 'Yes', hi: 'हाँ' },
  no: { en: 'No', hi: 'नहीं' },
  exam: { en: 'Exam', hi: 'परीक्षा' },
  home: { en: 'Home', hi: 'घर' },
  work: { en: 'Work', hi: 'काम' },
  can: { en: 'Can', hi: 'सकता है' },
  will: { en: 'Will', hi: 'करेगा' },
  do: { en: 'Do', hi: 'करना' },
  your: { en: 'Your', hi: 'आपका' },
  write: { en: 'Write', hi: 'लिखना' },
  this: { en: 'This', hi: 'यह' },
  it: { en: 'It', hi: 'यह' },
  difficult: { en: 'Difficult', hi: 'कठिन' },
  read: { en: 'Read', hi: 'पढ़ना' },
  yesterday: { en: 'Yesterday', hi: 'कल' },
  my: { en: 'My', hi: 'मेरा' },
  name: { en: 'Name', hi: 'नाम' },
  who: { en: 'Who', hi: 'कौन' },
  what: { en: 'What', hi: 'क्या' },
  class: { en: 'Class', hi: 'कक्षा' },
  leader: { en: 'Leader', hi: 'नेता' },
  i_or_me: { en: 'I / Me', hi: 'मैं' },
  i_dont_understand: { en: "I don't understand", hi: 'मुझे समझ नहीं आया' },
  tomorrow: { en: 'Tomorrow', hi: 'कल' },
  how: { en: 'How', hi: 'कैसे' },
  sit_down: { en: 'Sit down', hi: 'बैठिए' },
  stand_up: { en: 'Stand up', hi: 'खड़े हो जाइए' },
  come: { en: 'Come', hi: 'आइए' },
  study: { en: 'Study', hi: 'पढ़ाई' },
  look: { en: 'Look', hi: 'देखिए' },
  here: { en: 'Here', hi: 'यहाँ' },
  now: { en: 'Now', hi: 'अब' },
  help: { en: 'Help', hi: 'मदद' },
  quiet: { en: 'Quiet', hi: 'शांत' },
};

const PHRASES_BY_LANG = {
  en: [
    { text: 'Hello, good morning.', category: 'Greeting' },
    { text: 'I am deaf, please speak clearly or type here.', category: 'Assistance' },
    { text: 'Where is the nearest exit or restroom?', category: 'Direction' },
    { text: 'I need medical assistance, please.', category: 'Emergency' },
    { text: 'Thank you very much for your patience.', category: 'Courtesy' },
    { text: 'Please write down the instructions.', category: 'Assistance' },
  ],
  hi: [
    { text: 'नमस्ते, शुभ प्रभात।', category: 'अभिवादन' },
    { text: 'मैं सुन नहीं सकता, कृपया यहाँ लिखें या स्पष्ट बोलें।', category: 'सहायता' },
    { text: 'निकटतम निकास या शौचालय कहाँ है?', category: 'दिशा' },
    { text: 'मुझे तत्काल चिकित्सीय सहायता चाहिए।', category: 'आपातकाल' },
    { text: 'आपके धैर्य के लिए बहुत-बहुत धन्यवाद।', category: 'विनम्रता' },
    { text: 'कृपया निर्देश लिखकर समझाएं।', category: 'सहायता' },
  ],
};

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],       // Index
  [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
  [0, 13], [13, 14], [14, 15], [15, 16], // Ring
  [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
  [5, 9], [9, 13], [13, 17]             // Palm
];

const POSE_CONNECTIONS = [
  [11, 12], // Shoulders
  [11, 13], [13, 15], // Left Arm
  [12, 14], [14, 16], // Right Arm
  [11, 23], [12, 24], [23, 24] // Torso
];

const SignToTextPage = () => {
  const { user } = useAuth();
  const videoRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  // Language state (English / Hindi)
  const initialLang = user?.preferredLanguage === 'hi' ? 'hi' : 'en';
  const [selectedLang, setSelectedLang] = useState(initialLang);

  // Sign to Text Workspace UI States
  const [handGuideOverlay, setHandGuideOverlay] = useState(true);
  const [activeDialect, setActiveDialect] = useState(user?.signDialect || 'ISL');
  const [translatedSentence, setTranslatedSentence] = useState('');
  const [tokenStream, setTokenStream] = useState([]);
  const [copied, setCopied] = useState(false);

  // Callback when a gesture is recognized and confirmed by the 12/20 majority voting filter
  const handleNewGesture = useCallback((rawGesture) => {
    const entry = ISL_DICTIONARY[rawGesture.toLowerCase()];
    const word = entry ? (selectedLang === 'hi' ? entry.hi : entry.en) : rawGesture.replace(/_/g, ' ');

    setTokenStream((prev) => [...prev, word]);

    setTranslatedSentence((prev) => {
      if (!prev) return word;
      return `${prev} ${word}`;
    });
  }, [selectedLang]);

  // Hook for private WebSocket streaming & low-power real-time inference
  const {
    isConnected,
    isCameraActive,
    currentGesture,
    confidence,
    fps,
    landmarks,
    cameraError,
    startCamera,
    stopCamera,
    resetSession
  } = useSignTranslator({ onNewGesture: handleNewGesture });

  // Auto-start camera on component mount
  useEffect(() => {
    if (videoRef.current) {
      startCamera(videoRef.current);
    }
    return () => {
      stopCamera();
    };
  }, []);

  // Draw smooth real-time skeleton overlay on client canvas
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!handGuideOverlay || !landmarks) return;

    const w = canvas.width;
    const h = canvas.height;

    // 1. Draw Pose Skeletons (Torso & Arms)
    if (landmarks.pose && landmarks.pose.length >= 25) {
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 2.5;
      for (const [i, j] of POSE_CONNECTIONS) {
        const p1 = landmarks.pose[i];
        const p2 = landmarks.pose[j];
        if (p1 && p2 && p1[0] > 0 && p2[0] > 0) {
          ctx.beginPath();
          ctx.moveTo(p1[0] * w, p1[1] * h);
          ctx.lineTo(p2[0] * w, p2[1] * h);
          ctx.stroke();
        }
      }

      ctx.fillStyle = '#FFE600';
      for (const idx of [11, 12, 13, 14, 15, 16]) {
        const p = landmarks.pose[idx];
        if (p && p[0] > 0) {
          ctx.beginPath();
          ctx.arc(p[0] * w, p[1] * h, 4, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }

    // 2. Draw Hand Landmarks
    if (landmarks.hands && landmarks.hands.length > 0) {
      for (const hand of landmarks.hands) {
        ctx.strokeStyle = '#FF7AA2';
        ctx.lineWidth = 2;
        for (const [i, j] of HAND_CONNECTIONS) {
          const p1 = hand[i];
          const p2 = hand[j];
          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1[0] * w, p1[1] * h);
            ctx.lineTo(p2[0] * w, p2[1] * h);
            ctx.stroke();
          }
        }

        ctx.fillStyle = '#00FF9D';
        for (const pt of hand) {
          ctx.beginPath();
          ctx.arc(pt[0] * w, pt[1] * h, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  }, [landmarks, handGuideOverlay]);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
  };

  const handleSpeakAloud = () => {
    if ('speechSynthesis' in window && translatedSentence) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(translatedSentence);
      utterance.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = () => {
    if (translatedSentence) {
      navigator.clipboard?.writeText(translatedSentence);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setTranslatedSentence('');
    setTokenStream([]);
    resetSession();
  };

  const handleQuickPhrase = (text) => {
    setTranslatedSentence(text);
    setTokenStream(text.replace(/[।,.]/g, '').split(' '));
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      if (videoRef.current) {
        startCamera(videoRef.current);
      }
    }
  };

  const displayGesture = currentGesture === 'Waiting...' || currentGesture === 'Idle'
    ? currentGesture
    : (ISL_DICTIONARY[currentGesture.toLowerCase()]
        ? (selectedLang === 'hi' ? ISL_DICTIONARY[currentGesture.toLowerCase()].hi : ISL_DICTIONARY[currentGesture.toLowerCase()].en)
        : currentGesture.replace(/_/g, ' '));

  return (
    <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col"
      >
        {/* Top Workspace Bar: Return Link & Language Switch */}
        <div className="flex items-center justify-between border-b-2 border-[#121316] pb-4">
          <Link
            to="/app"
            className="flex items-center gap-2 rounded-full border-2 border-[#121316] bg-white px-4 py-1.5 text-xs font-black text-[#121316] shadow-[2px_2.5px_0_#121316] transition hover:bg-stone-50 active:translate-y-0.5"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Dialect Switch */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-stone-700">
              <span>Dialect:</span>
              <div className="flex rounded-xl border-2 border-[#121316] bg-white p-0.5 text-xs font-black shadow-[2px_2px_0_#121316]">
                {['ISL', 'ASL'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setActiveDialect(d)}
                    className={`rounded-lg px-2.5 py-0.5 transition ${
                      activeDialect === d
                        ? 'bg-[#121316] text-[#FFE600] font-black'
                        : 'text-stone-600 hover:text-black'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* English / Hindi Pill Switch */}
            <div className="flex rounded-full border-2 border-[#121316] bg-white p-0.5 text-xs font-black shadow-[2px_2px_0_#121316]">
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`rounded-full px-3 py-1 transition ${
                  selectedLang === 'en'
                    ? 'bg-[#121316] text-[#FFE600] font-black'
                    : 'text-stone-600 hover:text-black'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('hi')}
                className={`rounded-full px-3 py-1 transition ${
                  selectedLang === 'hi'
                    ? 'bg-[#121316] text-[#FFE600] font-black'
                    : 'text-stone-600 hover:text-black'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Title & Live Status */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-[#121316] bg-[#38BDF8] px-3 py-0.5 text-[11px] font-black uppercase text-[#121316] shadow-[1.5px_2px_0_#121316]">
              <span>⚡ VISION RECOGNITION</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-[#121316]">
              Sign Language to Text & Voice
            </h1>
            <p className="font-sans text-xs text-stone-600 font-medium mt-1">
              Real-time Indian Sign Language recognition powered by LSTM & MediaPipe WebSocket streaming.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-black rounded-full px-3.5 py-1.5 border-2 border-[#121316] bg-white shadow-[2px_2px_0_#121316]">
            <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`} />
            <span className={isConnected ? 'text-emerald-800' : 'text-red-700'}>
              {isConnected ? 'AI Server Online ⚡' : 'Connecting to AI Server...'}
            </span>
          </div>
        </div>

        {cameraError && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-amber-50 border-2 border-[#121316] p-3.5 text-xs font-bold text-amber-950 shadow-[2px_2px_0_#121316]">
            <AlertTriangleIcon className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{cameraError}. Please enable webcam permissions in your browser.</span>
          </div>
        )}

        {/* Responsive Workspace Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (7 Cols): Video Viewport HUD */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="relative aspect-video w-full rounded-[2.2rem] border-2 border-[#121316] bg-[#0e0f12] overflow-hidden shadow-[0_8px_0_#121316] flex flex-col items-center justify-center text-white">
              
              {/* Live WebCam Element */}
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className={`w-full h-full object-cover -scale-x-100 ${!isCameraActive ? 'hidden' : 'block'}`}
              />

              {/* Landmark Drawing Canvas Overlay */}
              <canvas
                ref={overlayCanvasRef}
                width={640}
                height={480}
                className="pointer-events-none absolute inset-0 w-full h-full object-cover z-10"
              />

              {/* Placeholder when camera is stopped */}
              {!isCameraActive && (
                <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
                    <VideoOffIcon className="h-8 w-8 text-stone-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">Camera Paused</p>
                    <p className="text-xs text-stone-400 mt-1">Click "Start Camera" below to resume gesture detection.</p>
                  </div>
                </div>
              )}

              {/* Top Left Feed Status */}
              <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
                <span className={`h-2 w-2 rounded-full ${isCameraActive ? 'bg-emerald-400' : 'bg-stone-500'}`} />
                <span>{isCameraActive ? 'Webcam Stream' : 'Camera Muted'}</span>
              </div>

              {/* Top Right Performance Telemetry */}
              <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2 font-mono text-[10px] text-stone-300 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md">
                <span>{fps > 0 ? `${fps} FPS` : 'Stream Ready'}</span>
                <span>•</span>
                <span className="text-[#FFE600]">
                  {confidence > 0 ? `${confidence}% Conf` : 'Standby'}
                </span>
              </div>

              {/* Live Active Gesture Pill */}
              {isCameraActive && currentGesture && currentGesture !== 'Idle' && currentGesture !== 'Waiting...' && (
                <div className="absolute top-14 left-3.5 z-20 flex items-center gap-2 rounded-xl bg-cyan-950/80 border border-cyan-400/40 px-3.5 py-1.5 shadow-lg backdrop-blur-md">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-300">Live Sign:</span>
                  <span className="text-sm font-extrabold text-cyan-200 capitalize">{displayGesture}</span>
                  <span className="text-xs font-mono text-cyan-400">({confidence}%)</span>
                </div>
              )}

              {/* Bottom Camera Toolbar */}
              <div className="absolute bottom-3.5 inset-x-3.5 z-20 flex items-center justify-between rounded-2xl bg-black/70 px-4 py-2 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleCamera}
                    className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white hover:bg-white/25 transition"
                  >
                    {isCameraActive ? <VideoOffIcon className="w-3.5 h-3.5" /> : <VideoIcon className="w-3.5 h-3.5" />}
                    <span>{isCameraActive ? 'Pause Camera' : 'Start Camera'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHandGuideOverlay(!handGuideOverlay)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                      handGuideOverlay ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/30' : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    <EyeIcon className="w-3.5 h-3.5" />
                    <span>{handGuideOverlay ? 'Landmarks On' : 'Landmarks Off'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckIcon className="w-3.5 h-3.5" />
                  <span>Low-Power Mode</span>
                </div>
              </div>
            </div>

            {/* Accessible Advice Banner */}
            <div className="flex items-center gap-3 rounded-2xl border-2 border-[#121316] bg-white p-4 text-xs font-medium text-stone-700 shadow-[3px_3px_0_#121316]">
              <SparklesIcon className="w-5 h-5 text-amber-500 shrink-0" />
              <span>
                <strong>Optimal Gesture Recognition:</strong> Position yourself 2 to 3 feet from the camera with upper body and hands visible. The LSTM model parses continuous signs into natural {selectedLang === 'hi' ? 'हिंदी' : 'English'} sentences.
              </span>
            </div>
          </div>

          {/* Right Column (5 Cols): Translation & Output Console */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Detected Token Stream */}
            <div className="rounded-2xl border-2 border-[#121316] bg-white p-4.5 shadow-[3px_3px_0_#121316]">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-black uppercase tracking-wider text-stone-600">
                  Recognized Sign Tokens:
                </span>
                <span className={`h-2.5 w-2.5 rounded-full ${tokenStream.length > 0 ? 'bg-emerald-500 animate-ping' : 'bg-stone-300'}`} />
              </div>

              <div className="mt-3 flex flex-wrap gap-2 min-h-[44px] items-center">
                {tokenStream.length > 0 ? (
                  tokenStream.map((tok, i) => (
                    <span
                      key={i}
                      className="rounded-lg border-2 border-[#121316] bg-[#FFE600] px-3 py-1 font-mono text-xs font-black text-[#121316] shadow-[1.5px_1.5px_0_#121316] animate-fade-in"
                    >
                      {tok}
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-xs text-stone-400 italic">
                    {selectedLang === 'hi' ? 'सांकेतिक इशारे का इंतज़ार...' : 'Perform signs in camera to capture tokens...'}
                  </span>
                )}
              </div>
            </div>

            {/* Natural Sentence Output Card */}
            <div className="rounded-2xl border-2 border-[#121316] bg-white p-5 shadow-[4px_4px_0_#121316] flex flex-col justify-between min-h-[180px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] font-black uppercase tracking-wider text-[#2563EB]">
                    {selectedLang === 'hi' ? 'अनुवादित वाक्य (हिंदी):' : 'Synthesized Sentence (English):'}
                  </span>
                  <span className="rounded-full border border-[#121316] bg-amber-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-900">
                    Real-Time ⚡
                  </span>
                </div>

                <div className="mt-3 text-base sm:text-lg font-bold text-[#121316] leading-relaxed">
                  {translatedSentence || (
                    <span className="text-stone-400 italic font-normal">
                      {selectedLang === 'hi' ? 'अनुवादित वाक्य यहाँ दिखेगा...' : 'Transcribed sentence will appear here...'}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-2 border-t-2 border-stone-100 pt-4">
                <button
                  type="button"
                  onClick={handleSpeakAloud}
                  disabled={!translatedSentence}
                  className="flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#121316] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#FFE600] shadow-[2px_2.5px_0_#121316] transition hover:bg-stone-800 disabled:opacity-40 active:translate-y-0.5"
                >
                  <Volume2Icon className="w-3.5 h-3.5" />
                  <span>{selectedLang === 'hi' ? 'बोलकर सुनाएं' : 'Speak Aloud'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!translatedSentence}
                  className="flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-3.5 py-2 text-xs font-bold text-stone-800 shadow-[2px_2px_0_#121316] hover:bg-stone-50 transition disabled:opacity-40 active:translate-y-0.5"
                >
                  {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-600" /> : <CopyIcon className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : (selectedLang === 'hi' ? 'कॉपी करें' : 'Copy')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-3.5 py-2 text-xs font-bold text-stone-600 hover:text-red-600 shadow-[2px_2px_0_#121316] transition active:translate-y-0.5"
                >
                  <RotateCcwIcon className="w-3.5 h-3.5" />
                  <span>{selectedLang === 'hi' ? 'साफ़ करें' : 'Clear'}</span>
                </button>
              </div>
            </div>

            {/* Quick Phrases for selected language */}
            <div className="rounded-2xl border-2 border-[#121316] bg-white p-4.5 shadow-[3px_3px_0_#121316]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-xs font-black uppercase tracking-wider text-stone-700">
                  {selectedLang === 'hi' ? 'त्वरित उपयोगी वाक्य (Quick Phrases)' : 'Quick Preset Phrases'}
                </span>
                <span className="rounded-full border border-[#121316] bg-[#FFE600] px-2 py-0.5 text-[10px] font-black uppercase">
                  {selectedLang === 'hi' ? 'हिंदी' : 'English'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {PHRASES_BY_LANG[selectedLang].map((qp, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleQuickPhrase(qp.text)}
                    className="flex items-center justify-between rounded-xl border-2 border-[#121316] bg-stone-50 p-2.5 text-left text-xs font-bold text-stone-800 shadow-[1.5px_1.5px_0_#121316] transition hover:bg-amber-100 hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    <span className="truncate pr-2">{qp.text}</span>
                    <span className="text-[10px] text-stone-500 font-mono shrink-0">{qp.category}</span>
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

export default SignToTextPage;
