import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/auth/AuthContext';
import {
  ArrowLeftIcon,
  LayoutGridIcon,
  Volume2Icon,
  RotateCcwIcon,
  SparklesIcon,
  CheckIcon,
} from '../../components/ui/Icons';

// ─── Extra inline SVG icons (not in Icons.jsx) ───────────────────────────────
const DeleteIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <line x1="18" y1="9" x2="12" y2="15" />
    <line x1="12" y1="9" x2="18" y2="15" />
  </svg>
);

const StarIcon = ({ className = 'w-4 h-4', filled = false }) => (
  <svg className={className} fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const SunIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SpeakerIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

// ─── Category definitions ─────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',        label: 'All',          hi: 'सभी',         color: 'stone' },
  { id: 'need',       label: 'Needs',        hi: 'आवश्यकता',    color: 'blue'  },
  { id: 'medical',    label: 'Medical',      hi: 'चिकित्सा',    color: 'red'   },
  { id: 'feeling',    label: 'Feelings',     hi: 'भावनाएं',     color: 'purple'},
  { id: 'response',   label: 'Responses',    hi: 'प्रतिक्रिया',  color: 'green' },
  { id: 'social',     label: 'Social',       hi: 'सामाजिक',     color: 'amber' },
  { id: 'activity',   label: 'Activity',     hi: 'गतिविधि',     color: 'teal'  },
  { id: 'favorites',  label: 'Favorites',    hi: 'पसंदीदा',     color: 'rose'  },
];

const CATEGORY_STYLES = {
  stone:  { chip: 'border-2 border-[#121316] bg-[#FFFDF7] text-[#121316] shadow-[2px_2px_0_#121316]', tile: 'border-2 border-[#121316] bg-[#FFFDF7] shadow-[2px_2.5px_0_#121316]',             icon: '⬜' },
  blue:   { chip: 'border-2 border-[#121316] bg-[#38BDF8] text-[#121316] shadow-[2px_2px_0_#121316]', tile: 'border-2 border-[#121316] bg-blue-50/70 shadow-[2px_2.5px_0_#121316]',       icon: '🔵' },
  red:    { chip: 'border-2 border-[#121316] bg-rose-200 text-rose-950 shadow-[2px_2px_0_#121316]', tile: 'border-2 border-[#121316] bg-rose-50/70 shadow-[2px_2.5px_0_#121316]',        icon: '🔴' },
  purple: { chip: 'border-2 border-[#121316] bg-purple-200 text-purple-950 shadow-[2px_2px_0_#121316]', tile: 'border-2 border-[#121316] bg-purple-50/70 shadow-[2px_2.5px_0_#121316]',     icon: '🟣' },
  green:  { chip: 'border-2 border-[#121316] bg-emerald-200 text-emerald-950 shadow-[2px_2px_0_#121316]', tile: 'border-2 border-[#121316] bg-emerald-50/70 shadow-[2px_2.5px_0_#121316]', icon: '🟢' },
  amber:  { chip: 'border-2 border-[#121316] bg-[#FFE600] text-[#121316] shadow-[2px_2px_0_#121316]', tile: 'border-2 border-[#121316] bg-amber-50/70 shadow-[2px_2.5px_0_#121316]',     icon: '🟡' },
  teal:   { chip: 'border-2 border-[#121316] bg-teal-200 text-teal-950 shadow-[2px_2px_0_#121316]', tile: 'border-2 border-[#121316] bg-teal-50/70 shadow-[2px_2.5px_0_#121316]',      icon: '🔷' },
  rose:   { chip: 'border-2 border-[#121316] bg-[#FF7AA2] text-[#121316] shadow-[2px_2px_0_#121316]', tile: 'border-2 border-[#121316] bg-rose-50/70 shadow-[2px_2.5px_0_#121316]',      icon: '⭐' },
};

// ─── Full tile data ───────────────────────────────────────────────────────────
const TILES_DATA = [
  // NEEDS
  { id: 'water',    en: 'Need Water',       hi: 'पानी चाहिए',          category: 'need',     emoji: '💧' },
  { id: 'food',     en: 'Hungry / Food',    hi: 'भूख / खाना',          category: 'need',     emoji: '🍽️' },
  { id: 'toilet',   en: 'Restroom',         hi: 'शौचालय',              category: 'need',     emoji: '🚻' },
  { id: 'rest',     en: 'Need Rest',        hi: 'आराम चाहिए',          category: 'need',     emoji: '🛌' },
  { id: 'blanket',  en: 'Need Blanket',     hi: 'कंबल चाहिए',          category: 'need',     emoji: '🛏️' },
  { id: 'cold',     en: 'Feeling Cold',     hi: 'ठंड लग रही है',       category: 'need',     emoji: '🥶' },
  { id: 'hot',      en: 'Feeling Hot',      hi: 'गर्मी लग रही है',     category: 'need',     emoji: '🥵' },
  { id: 'medicine', en: 'Need Medicine',    hi: 'दवाई चाहिए',          category: 'need',     emoji: '💊' },

  // MEDICAL
  { id: 'pain',     en: 'In Pain',          hi: 'दर्द है',             category: 'medical',  emoji: '😣' },
  { id: 'doctor',   en: 'Call Doctor',      hi: 'डॉक्टर बुलाएं',       category: 'medical',  emoji: '🩺' },
  { id: 'emergency',en: 'Emergency!',       hi: 'आपातकाल!',            category: 'medical',  emoji: '🚨' },
  { id: 'headache', en: 'Headache',         hi: 'सिरदर्द',             category: 'medical',  emoji: '🤕' },
  { id: 'nausea',   en: 'Nausea / Vomit',  hi: 'उल्टी / मिचली',      category: 'medical',  emoji: '🤢' },
  { id: 'breathe',  en: 'Hard to Breathe', hi: 'सांस लेने में दिक्कत', category: 'medical',  emoji: '😮‍💨' },
  { id: 'ambulance',en: 'Call Ambulance',  hi: 'एम्बुलेंस बुलाएं',    category: 'medical',  emoji: '🚑' },
  { id: 'nurse',    en: 'Call Nurse',       hi: 'नर्स बुलाएं',          category: 'medical',  emoji: '👩‍⚕️' },

  // FEELINGS
  { id: 'happy',    en: 'Happy',            hi: 'खुश हूं',             category: 'feeling',  emoji: '😊' },
  { id: 'sad',      en: 'Sad',              hi: 'दुखी हूं',            category: 'feeling',  emoji: '😢' },
  { id: 'scared',   en: 'Scared',           hi: 'डरा हुआ हूं',         category: 'feeling',  emoji: '😨' },
  { id: 'angry',    en: 'Angry',            hi: 'गुस्से में हूं',      category: 'feeling',  emoji: '😠' },
  { id: 'tired',    en: 'Tired',            hi: 'थका हुआ हूं',         category: 'feeling',  emoji: '😴' },
  { id: 'confused', en: 'Confused',         hi: 'उलझन में हूं',        category: 'feeling',  emoji: '😕' },
  { id: 'bored',    en: 'Bored',            hi: 'बोर हो रहा हूं',      category: 'feeling',  emoji: '😑' },
  { id: 'excited',  en: 'Excited',          hi: 'उत्साहित हूं',        category: 'feeling',  emoji: '🤩' },

  // RESPONSES
  { id: 'yes',      en: 'Yes',              hi: 'हाँ',                 category: 'response', emoji: '✅' },
  { id: 'no',       en: 'No',              hi: 'नहीं',               category: 'response', emoji: '❌' },
  { id: 'maybe',    en: 'Maybe',            hi: 'शायद',                category: 'response', emoji: '🤔' },
  { id: 'ok',       en: 'Okay / Fine',      hi: 'ठीक है',              category: 'response', emoji: '👍' },
  { id: 'repeat',   en: 'Repeat Please',    hi: 'दोबारा कहें',         category: 'response', emoji: '🔁' },
  { id: 'slow',     en: 'Speak Slowly',     hi: 'धीरे बोलें',          category: 'response', emoji: '🐢' },
  { id: 'stop',     en: 'Stop',             hi: 'रुकें',               category: 'response', emoji: '🛑' },
  { id: 'continue', en: 'Continue',         hi: 'जारी रखें',           category: 'response', emoji: '▶️' },

  // SOCIAL
  { id: 'hello',    en: 'Hello',            hi: 'नमस्ते',              category: 'social',   emoji: '👋' },
  { id: 'thanks',   en: 'Thank You',        hi: 'धन्यवाद',             category: 'social',   emoji: '🙏' },
  { id: 'sorry',    en: 'I am Sorry',       hi: 'मुझे माफ करें',       category: 'social',   emoji: '😔' },
  { id: 'help',     en: 'Need Help',        hi: 'मदद चाहिए',           category: 'social',   emoji: '🆘' },
  { id: 'family',   en: 'Call Family',      hi: 'परिवार बुलाएं',       category: 'social',   emoji: '👨‍👩‍👧' },
  { id: 'wait',     en: 'Please Wait',      hi: 'कृपया रुकें',         category: 'social',   emoji: '✋' },
  { id: 'goodbye',  en: 'Goodbye',          hi: 'अलविदा',              category: 'social',   emoji: '👋' },
  { id: 'understand',en: 'I Understand',   hi: 'मैं समझता हूं',       category: 'social',   emoji: '💡' },

  // ACTIVITY
  { id: 'walk',     en: 'Want to Walk',     hi: 'चलना चाहता हूं',      category: 'activity', emoji: '🚶' },
  { id: 'tv',       en: 'Watch TV',         hi: 'टीवी देखना है',       category: 'activity', emoji: '📺' },
  { id: 'phone',    en: 'Use Phone',        hi: 'फोन चाहिए',           category: 'activity', emoji: '📱' },
  { id: 'music',    en: 'Play Music',       hi: 'संगीत सुनना है',      category: 'activity', emoji: '🎵' },
  { id: 'outside',  en: 'Go Outside',       hi: 'बाहर जाना है',        category: 'activity', emoji: '🌳' },
  { id: 'book',     en: 'Read Book',        hi: 'किताब पढ़नी है',      category: 'activity', emoji: '📖' },
  { id: 'exercise', en: 'Exercise',         hi: 'व्यायाम करना है',     category: 'activity', emoji: '🏃' },
  { id: 'shower',   en: 'Need Shower',      hi: 'नहाना है',            category: 'activity', emoji: '🚿' },
];

// ─── Component ────────────────────────────────────────────────────────────────
const AacBoardPage = () => {
  const { user } = useAuth();
  const [selectedLang, setSelectedLang] = useState(
    user?.preferredLanguage === 'hi' ? 'hi' : 'en'
  );
  const [activeCategory, setActiveCategory] = useState('all');
  const [sentenceStack, setSentenceStack] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aac_favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [highContrast, setHighContrast] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [lastSpokenId, setLastSpokenId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pulsingTileId, setPulsingTileId] = useState(null);
  const sentenceRef = useRef(null);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('aac_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Auto-scroll sentence bar when items are added
  useEffect(() => {
    if (sentenceRef.current) {
      sentenceRef.current.scrollLeft = sentenceRef.current.scrollWidth;
    }
  }, [sentenceStack]);

  const speakText = useCallback(
    (text, tileId = null) => {
      if (!('speechSynthesis' in window) || !text) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-US';
      utt.rate = speechRate;
      utt.onstart = () => {
        setIsPlaying(true);
        if (tileId) setLastSpokenId(tileId);
      };
      utt.onend = () => {
        setIsPlaying(false);
        setLastSpokenId(null);
      };
      utt.onerror = () => {
        setIsPlaying(false);
        setLastSpokenId(null);
      };
      window.speechSynthesis.speak(utt);
    },
    [selectedLang, speechRate]
  );

  const handleTileClick = (tile) => {
    const label = selectedLang === 'hi' ? tile.hi : tile.en;
    setSentenceStack((prev) => [...prev, { id: tile.id, label, emoji: tile.emoji }]);
    speakText(label, tile.id);
    // Pulse animation
    setPulsingTileId(tile.id);
    setTimeout(() => setPulsingTileId(null), 400);
  };

  const handleDeleteLast = () => {
    setSentenceStack((prev) => prev.slice(0, -1));
  };

  const handleSpeakSentence = () => {
    const text = sentenceStack.map((t) => t.label).join('. ');
    speakText(text);
  };

  const handleClear = () => {
    setSentenceStack([]);
    setIsPlaying(false);
    window.speechSynthesis?.cancel();
  };

  const toggleFavorite = (e, tileId) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(tileId) ? prev.filter((id) => id !== tileId) : [...prev, tileId]
    );
  };

  const langSwitch = (lang) => {
    setSelectedLang(lang);
    setSentenceStack([]);
  };

  // Derive visible tiles
  const visibleTiles =
    activeCategory === 'all'
      ? TILES_DATA
      : activeCategory === 'favorites'
      ? TILES_DATA.filter((t) => favorites.includes(t.id))
      : TILES_DATA.filter((t) => t.category === activeCategory);

  const getCatColor = (catId) => {
    const cat = CATEGORIES.find((c) => c.id === catId);
    return cat ? cat.color : 'stone';
  };

  // High-contrast overrides
  const hc = highContrast;
  const hcBg = hc ? 'bg-black' : 'bg-[#FBF9F4]';
  const hcText = hc ? 'text-white' : 'text-[#121316]';
  const hcBorder = hc ? 'border-white' : 'border-stone-200';
  const hcCardBg = hc ? 'bg-zinc-900 border-zinc-600' : '';
  const hcMsgBg = hc ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-stone-300';

  return (
    <div className={`flex-1 min-h-screen transition-colors duration-300 ${hcBg}`}>
      <div className="px-4 py-6 sm:px-6 sm:py-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col"
        >
          {/* ── Header ── */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-b-2 pb-4 ${hc ? 'border-zinc-700' : 'border-[#121316]'}`}>
            <Link
              to="/app"
              className={`flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-xs font-black transition active:translate-y-0.5 ${
                hc
                  ? 'border-zinc-600 bg-zinc-800 text-white hover:border-white'
                  : 'border-[#121316] bg-white text-[#121316] shadow-[2px_2.5px_0_#121316] hover:bg-stone-50'
              }`}
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-2 flex-wrap">
              {/* High-Contrast Toggle */}
              <button
                type="button"
                onClick={() => setHighContrast((v) => !v)}
                className={`flex items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-xs font-black transition ${
                  hc
                    ? 'border-white bg-white text-black'
                    : 'border-[#121316] bg-white text-stone-800 shadow-[2px_2px_0_#121316] hover:bg-stone-50'
                }`}
                title="Toggle High Contrast"
              >
                {hc ? <SunIcon className="w-3.5 h-3.5" /> : <MoonIcon className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{hc ? 'Normal' : 'High Contrast'}</span>
              </button>

              {/* Speech Rate */}
              <div className={`flex items-center gap-2 rounded-full border-2 px-3.5 py-1.5 text-xs font-black ${
                hc ? 'border-zinc-600 bg-zinc-800 text-white' : 'border-[#121316] bg-white text-stone-800 shadow-[2px_2px_0_#121316]'
              }`}>
                <SpeakerIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Speed:</span>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.25"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-16 accent-[#121316]"
                  title={`Speech Rate: ${speechRate}x`}
                />
                <span className="w-8 text-center">{speechRate}x</span>
              </div>

              {/* Language Toggle */}
              <div className={`flex rounded-full border-2 p-0.5 text-xs font-black ${
                hc ? 'border-zinc-600 bg-zinc-800' : 'border-[#121316] bg-white shadow-[2px_2px_0_#121316]'
              }`}>
                {['en', 'hi'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => langSwitch(lang)}
                    className={`rounded-full px-3 py-1 transition font-black ${
                      selectedLang === lang
                        ? hc ? 'bg-white text-black' : 'bg-[#121316] text-[#FFE600]'
                        : hc ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-black'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : 'हिं'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Page Title ── */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-[#121316] bg-[#FF7DA7] px-3 py-0.5 text-[11px] font-black uppercase text-[#121316] shadow-[1.5px_2px_0_#121316]">
                <span>⚡ VISUAL SYMBOL BOARD</span>
              </div>
              <h1 className={`font-display text-2xl sm:text-3xl font-black tracking-tight ${hcText}`}>
                Visual AAC Symbol Board
              </h1>
              <p className={`text-xs font-medium mt-1 ${hc ? 'text-zinc-400' : 'text-stone-600'}`}>
                {selectedLang === 'hi'
                  ? 'टाइल टैप करें → बोलें → संदेश बनाएं'
                  : 'Tap tiles → Hear them → Build full messages with instant TTS'}
              </p>
            </div>
            <div className={`flex items-center gap-2 text-xs font-black rounded-full px-3.5 py-1.5 border-2 ${
              hc ? 'border-zinc-600 bg-zinc-800 text-white' : 'border-[#121316] bg-white text-stone-800 shadow-[2px_2px_0_#121316]'
            }`}>
              <LayoutGridIcon className="w-3.5 h-3.5" />
              <span>{TILES_DATA.length} Symbols</span>
              {favorites.length > 0 && (
                <>
                  <span className={hc ? 'text-zinc-600' : 'text-stone-400'}>•</span>
                  <StarIcon className="w-3 h-3 text-amber-500" filled />
                  <span>{favorites.length} Starred</span>
                </>
              )}
            </div>
          </div>

          {/* ── Sentence Builder Bar ── */}
          <div className={`mt-6 rounded-2xl border-2 p-4.5 shadow-[4px_4px_0_#121316] ${hc ? 'bg-zinc-800 border-zinc-600' : 'bg-[#FFFDF0] border-[#121316]'}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${hc ? 'text-zinc-400' : 'text-stone-400'}`}>
                  {selectedLang === 'hi' ? 'निर्मित संदेश:' : 'Constructed Message:'}
                </span>
                <div
                  ref={sentenceRef}
                  className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
                  style={{ scrollbarWidth: 'none' }}
                >
                  <AnimatePresence mode="popLayout">
                    {sentenceStack.length > 0 ? (
                      sentenceStack.map((word, idx) => (
                        <motion.div
                          key={`${word.id}-${idx}`}
                          initial={{ opacity: 0, scale: 0.8, x: 12 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.7, x: -8 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-1.5 shrink-0 rounded-xl bg-[#FFE600] border border-[#121316] px-3 py-1.5 text-xs font-bold text-[#121316] shadow-[1px_1px_0_#121316]"
                        >
                          <span>{word.emoji}</span>
                          <span>{word.label}</span>
                        </motion.div>
                      ))
                    ) : (
                      <span className={`text-xs italic ${hc ? 'text-zinc-500' : 'text-stone-400'}`}>
                        {selectedLang === 'hi'
                          ? 'नीचे टाइलें टैप करें...'
                          : 'Tap symbols below to build a spoken message...'}
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                {/* Speak Full Sentence */}
                <motion.button
                  type="button"
                  disabled={sentenceStack.length === 0}
                  onClick={handleSpeakSentence}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-4 py-2 text-xs font-bold transition-all disabled:opacity-40 disabled:shadow-none ${
                    isPlaying
                      ? 'bg-amber-400 text-[#121316] shadow-[2px_2.5px_0_#121316] animate-pulse'
                      : hc
                      ? 'bg-white text-black hover:bg-zinc-200 shadow-[2px_2.5px_0_#121316]'
                      : 'bg-[#121316] text-white hover:bg-stone-800 shadow-[2.5px_3px_0_#FFE600]'
                  }`}
                >
                  <Volume2Icon className="w-3.5 h-3.5" />
                  <span>{selectedLang === 'hi' ? 'वाक्य बोलें' : 'Speak All'}</span>
                </motion.button>

                {/* Backspace */}
                <button
                  type="button"
                  disabled={sentenceStack.length === 0}
                  onClick={handleDeleteLast}
                  className={`flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-3 py-2 text-xs font-bold transition-all shadow-[2px_2.5px_0_#121316] disabled:opacity-40 disabled:shadow-none ${
                    hc
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-white text-[#121316] hover:bg-stone-100'
                  }`}
                  title="Delete last word"
                >
                  <DeleteIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{selectedLang === 'hi' ? 'पिछला हटाएं' : 'Backspace'}</span>
                </button>

                {/* Clear All */}
                <button
                  type="button"
                  disabled={sentenceStack.length === 0}
                  onClick={handleClear}
                  className={`flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-3 py-2 text-xs font-bold transition-all shadow-[2px_2.5px_0_#121316] disabled:opacity-40 disabled:shadow-none ${
                    hc
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  <RotateCcwIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{selectedLang === 'hi' ? 'साफ़ करें' : 'Clear All'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Category Filter Bar ── */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => {
              const styles = CATEGORY_STYLES[cat.color];
              const isActive = activeCategory === cat.id;
              const label = selectedLang === 'hi' ? cat.hi : cat.label;
              const count =
                cat.id === 'all'
                  ? TILES_DATA.length
                  : cat.id === 'favorites'
                  ? favorites.length
                  : TILES_DATA.filter((t) => t.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-3.5 py-1.5 text-xs font-bold transition-all shadow-[2px_2px_0_#121316] active:translate-x-0.5 active:translate-y-0.5 ${
                    isActive
                      ? hc
                        ? 'bg-white text-black'
                        : `${styles.chip}`
                      : hc
                      ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      : 'bg-[#FFFDF7] text-[#121316] hover:bg-stone-100'
                  }`}
                >
                  <span>{label}</span>
                  {count > 0 && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? hc ? 'bg-zinc-800 text-white' : 'bg-[#121316]/10 text-[#121316]'
                        : hc ? 'bg-zinc-700 text-zinc-300' : 'bg-stone-100 text-[#121316]'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Tiles Grid ── */}
          <div className="mt-4">
            {visibleTiles.length === 0 ? (
              <div className={`flex flex-col items-center justify-center py-20 gap-3 ${hc ? 'text-zinc-500' : 'text-stone-400'}`}>
                <StarIcon className="w-10 h-10 opacity-30" />
                <p className="text-sm font-medium">
                  {activeCategory === 'favorites'
                    ? selectedLang === 'hi' ? 'कोई पसंदीदा नहीं — ⭐ दबाकर जोड़ें' : 'No favorites yet — tap ⭐ on any tile to star it'
                    : selectedLang === 'hi' ? 'इस श्रेणी में कोई टाइल नहीं' : 'No tiles in this category'}
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3"
              >
                <AnimatePresence mode="popLayout">
                  {visibleTiles.map((tile, i) => {
                    const label = selectedLang === 'hi' ? tile.hi : tile.en;
                    const catColor = getCatColor(tile.category);
                    const styles = CATEGORY_STYLES[catColor];
                    const isFav = favorites.includes(tile.id);
                    const isPulsing = pulsingTileId === tile.id;
                    const isLastSpoken = lastSpokenId === tile.id;

                    return (
                      <motion.button
                        key={tile.id}
                        layout
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: isPulsing ? 1.04 : 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        transition={{ duration: 0.18, delay: i * 0.015 }}
                        type="button"
                        onClick={() => handleTileClick(tile)}
                        className={`group relative flex flex-col items-center justify-between rounded-2xl border-2 border-[#121316] p-4 text-center cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-[4px_5px_0_#121316] active:translate-y-0.5 ${
                          hc
                            ? `bg-zinc-900 ${isLastSpoken ? 'border-white ring-2 ring-white' : 'border-zinc-700'} hover:border-white`
                            : `${styles.tile} ${isLastSpoken ? 'ring-2 ring-[#121316]' : ''}`
                        }`}
                        aria-label={label}
                      >
                        {/* Favorite Star Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(e, tile.id)}
                          className={`absolute top-2 right-2 p-0.5 rounded-full transition z-10 ${
                            isFav
                              ? 'text-amber-500 opacity-100'
                              : hc
                              ? 'text-zinc-600 opacity-0 group-hover:opacity-100 hover:text-amber-400'
                              : 'text-stone-300 opacity-0 group-hover:opacity-100 hover:text-amber-500'
                          }`}
                          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <StarIcon className="w-3.5 h-3.5" filled={isFav} />
                        </button>

                        {/* Emoji Symbol */}
                        <div className="text-5xl leading-none mb-3 select-none" role="img" aria-hidden="true">
                          {tile.emoji}
                        </div>

                        {/* Label */}
                        <span className={`text-xs font-bold leading-tight ${hc ? 'text-white' : 'text-[#121316]'} group-hover:${hc ? 'text-zinc-200' : 'text-amber-700'} transition`}>
                          {label}
                        </span>

                        {/* Category badge */}
                        <span className={`mt-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                          hc ? 'text-zinc-500' : `text-${catColor}-500`
                        }`}>
                          {selectedLang === 'hi'
                            ? CATEGORIES.find((c) => c.id === tile.category)?.hi || tile.category
                            : CATEGORIES.find((c) => c.id === tile.category)?.label || tile.category}
                        </span>

                        {/* Speaker ripple if last spoken */}
                        {isLastSpoken && (
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0.8 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 rounded-2xl border-2 border-[#121316] pointer-events-none"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* ── Footer Tip ── */}
          <div className={`mt-6 flex items-start gap-3 rounded-2xl border-2 border-[#121316] p-4 text-xs shadow-[3px_3px_0_#121316] ${
            hc ? 'bg-zinc-800 text-zinc-300' : 'bg-amber-50/80 text-[#121316]'
          }`}>
            <SparklesIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">
                {selectedLang === 'hi' ? 'उपयोग सुझाव' : 'Usage Tips'}
              </p>
              <p>
                {selectedLang === 'hi'
                  ? 'किसी भी टाइल पर क्लिक करने पर तुरंत आवाज़ निकलती है। ⭐ दबाकर पसंदीदा टाइलें सहेजें। कई टाइलें जोड़कर पूरा वाक्य बनाएं, फिर "वाक्य बोलें" से सुनें।'
                  : 'Tap any tile to hear it instantly. Star ⭐ important tiles for quick access. Build multi-word messages then tap "Speak All" for a complete sentence. Adjust speech speed with the slider for clarity.'}
              </p>
            </div>
          </div>

          {/* ── Sentence Word Count Indicator ── */}
          {sentenceStack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 flex items-center gap-2 text-xs font-medium ${hc ? 'text-zinc-400' : 'text-stone-500'}`}
            >
              <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {sentenceStack.length} {selectedLang === 'hi' ? 'शब्द जोड़े गए' : `tile${sentenceStack.length !== 1 ? 's' : ''} added`}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AacBoardPage;
