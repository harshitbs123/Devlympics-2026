import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import {
  GlobeIcon,
  MicIcon,
  MicOffIcon,
  Volume2Icon,
  CopyIcon,
  CheckIcon,
  RotateCcwIcon,
  ArrowRightIcon,
  SparklesIcon,
  ArrowLeftIcon,
} from '../../components/ui/Icons';
import {
  SUPPORTED_LANGUAGES,
  OFFLINE_PHRASES,
  translateText,
} from '../../data/multilingualDictionary';

// ── Inline icons ──────────────────────────────────────────────────────────────
const TrashIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const DownloadIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const SearchIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SwapIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

// ── Constants (defined outside, never recreated) ──────────────────────────────
const RTL_LANGS = ['ar'];

const PHRASE_CATEGORIES = [
  { id: 'all',        label: 'All Phrases',   emoji: '💬' },
  { id: 'greetings',  label: 'Greetings',     emoji: '👋' },
  { id: 'medical',    label: 'Medical',       emoji: '🏥' },
  { id: 'navigation', label: 'Navigation',    emoji: '🗺️' },
  { id: 'social',     label: 'Social',        emoji: '🤝' },
  { id: 'essentials', label: 'Essentials',    emoji: '⚡' },
];

const TAGGED_PHRASES = OFFLINE_PHRASES.map((p, i) => ({
  ...p,
  category: ['greetings','greetings','medical','essentials','social','navigation','social','social','navigation','essentials','essentials','greetings'][i] || 'essentials',
}));

const FONT_SIZES = [
  { label: 'S', ta: 'text-sm',  chat: 'text-xs'  },
  { label: 'M', ta: 'text-base',chat: 'text-sm'  },
  { label: 'L', ta: 'text-lg',  chat: 'text-base'},
];

// ── InputPanel — defined OUTSIDE the page component to preserve identity ──────
const InputPanel = ({
  side,
  langCode, otherLangCode,
  setLangCode,
  text, setText,
  isListening,
  isTranslating, translatingFor,
  onToggleListening,
  onTranslate,
  fontSzTa,
}) => {
  const isA      = side === 'a';
  const langObj      = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  const otherLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === otherLangCode);
  const isRtl    = RTL_LANGS.includes(langCode);
  const isBusy   = isTranslating && translatingFor === side;

  const accentBadge = isA ? 'bg-[#FFE600] text-[#121316]' : 'bg-[#55E6A5] text-[#121316]';
  const accentMic   = isA
    ? 'bg-[#FFE600] text-[#121316] hover:bg-[#FFE600]/80'
    : 'bg-[#55E6A5] text-[#121316] hover:bg-[#55E6A5]/80';
  const listeningRing = isA ? 'bg-amber-100 border-2 border-[#121316]' : 'bg-emerald-100 border-2 border-[#121316]';
  const listeningDot  = isA ? 'bg-[#121316]' : 'bg-[#121316]';
  const listeningText = isA ? 'text-[#121316]' : 'text-[#121316]';

  const panelBg = isA ? 'bg-[#FFFDF0]' : 'bg-[#F0FDF4]';

  return (
    <div className={`flex flex-col rounded-3xl border-2 border-[#121316] ${panelBg} p-5 sm:p-6 shadow-[4px_4px_0_#121316] transition-all`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#121316]/10 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-8 w-8 items-center justify-center rounded-xl border-2 border-[#121316] text-xs font-black shadow-[2px_2px_0_#121316] ${accentBadge}`}>
            {isA ? 'A' : 'B'}
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block">
              {isA ? 'Speaker 1 (You)' : 'Speaker 2 (Partner)'}
            </span>
            <span className="text-xs font-black text-[#121316]">
              {langObj?.flag} {langObj?.name}{' '}
              <span className="font-semibold text-stone-500">({langObj?.native})</span>
            </span>
          </div>
        </div>

        <select
          value={langCode}
          onChange={(e) => setLangCode(e.target.value)}
          className="rounded-xl border-2 border-[#121316] bg-stone-50 px-3 py-1.5 text-xs font-bold text-[#121316] shadow-[2px_2px_0_#121316] hover:bg-stone-100 focus:outline-none cursor-pointer"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={`${side}-${lang.code}`} value={lang.code}>
              {lang.flag} {lang.name} ({lang.native})
            </option>
          ))}
        </select>
      </div>

      {/* Textarea */}
      <div className="flex-1 relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          dir={isRtl ? 'rtl' : 'ltr'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onTranslate(side);
            }
          }}
          placeholder={`Type or speak in ${langObj?.name}… (Enter to translate)`}
          rows={4}
          maxLength={500}
          className={`w-full resize-none rounded-2xl border-2 border-[#121316] bg-white p-3.5 font-medium text-[#121316] placeholder:text-stone-400 focus:outline-none focus:bg-white shadow-[2px_2.5px_0_#121316] leading-relaxed transition ${fontSzTa}`}
        />

        {/* Char counter */}
        <span className={`absolute bottom-3 right-3 text-[10px] font-mono pointer-events-none font-bold ${text.length > 450 ? 'text-rose-500' : 'text-stone-400'}`}>
          {text.length}/500
        </span>

        {/* Listening badge */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1 shadow-[2px_2px_0_#121316] ${listeningRing}`}
            >
              <span className={`h-2 w-2 rounded-full animate-ping ${listeningDot}`} />
              <span className={`text-[11px] font-bold ${listeningText}`}>
                Listening in {langObj?.name}…
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action strip */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t-2 border-[#121316]/10 gap-2">
        <button
          type="button"
          onClick={() => onToggleListening(side)}
          className={`flex items-center gap-2 rounded-full border-2 border-[#121316] px-4 py-2 text-xs font-bold transition-all shadow-[2.5px_2.5px_0_#121316] active:translate-x-0.5 active:translate-y-0.5 ${
            isListening ? 'bg-rose-500 text-white hover:bg-rose-600 animate-pulse' : accentMic
          }`}
        >
          {isListening ? <MicOffIcon className="w-4 h-4" /> : <MicIcon className="w-4 h-4" />}
          <span className="hidden sm:inline">
            {isListening ? 'Stop' : `Speak in ${langObj?.name}`}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTranslate(side)}
          disabled={!text.trim() || isBusy}
          className="flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#121316] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-stone-800 shadow-[2.5px_2.5px_0_#FFE600] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isBusy ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Translating…</span>
            </>
          ) : (
            <>
              <span>→ {otherLangObj?.name}</span>
              <ArrowRightIcon className={`w-3.5 h-3.5 ${isA ? 'text-[#FFE600]' : 'text-[#55E6A5]'}`} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ── Page component ────────────────────────────────────────────────────────────
export const TwoWayTranslationPage = () => {
  const { user } = useAuth();

  const [langA, setLangA] = useState('en');
  const [langB, setLangB] = useState('hi');
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const [isListeningA, setIsListeningA] = useState(false);
  const [isListeningB, setIsListeningB] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatingFor, setTranslatingFor] = useState(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const [phraseCategory, setPhraseCategory] = useState('all');
  const [fontSizeIdx, setFontSizeIdx] = useState(0);
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'a',
      fromLang: 'en',
      toLang: 'hi',
      originalText: 'Hello! I am using this two-way translator. How can I help you?',
      translatedText: 'नमस्ते! मैं इस दोतरफा अनुवादक का उपयोग कर रहा हूँ। मैं आपकी क्या मदद कर सकता हूँ?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 'init-2',
      sender: 'b',
      fromLang: 'hi',
      toLang: 'en',
      originalText: 'नमस्ते, मुझे निकटतम अस्पताल का रास्ता जानना है।',
      translatedText: 'Hello, I want to know the way to the nearest hospital.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const recognitionARef = useRef(null);
  const recognitionBRef = useRef(null);
  const chatEndRef = useRef(null);

  // Refs to avoid stale closures in speech callbacks
  const textARef = useRef(textA);
  const textBRef = useRef(textB);
  const langARef = useRef(langA);
  const langBRef = useRef(langB);
  useEffect(() => { textARef.current = textA; }, [textA]);
  useEffect(() => { textBRef.current = textB; }, [textB]);
  useEffect(() => { langARef.current = langA; }, [langA]);
  useEffect(() => { langBRef.current = langB; }, [langB]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── TTS ──────────────────────────────────────────────────────────────────
  const speak = useCallback((text, langCode) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
    if (langObj?.speechLocale) utterance.lang = langObj.speechLocale;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }, []);

  // ── Translate & send ──────────────────────────────────────────────────────
  const handleTranslateAndSend = useCallback(
    async (sender, content) => {
      const rawText = content !== undefined
        ? content
        : sender === 'a' ? textARef.current : textBRef.current;
      if (!rawText?.trim()) return;

      setIsTranslating(true);
      setTranslatingFor(sender);
      const fromCode = sender === 'a' ? langARef.current : langBRef.current;
      const toCode   = sender === 'a' ? langBRef.current : langARef.current;

      try {
        const translated = await translateText(rawText, fromCode, toCode);
        const newMsg = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          sender,
          fromLang: fromCode,
          toLang: toCode,
          originalText: rawText.trim(),
          translatedText: translated,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newMsg]);
        if (sender === 'a') setTextA('');
        else setTextB('');
        if (autoSpeak && translated) speak(translated, toCode);
      } catch (err) {
        console.error('Translation error:', err);
      } finally {
        setIsTranslating(false);
        setTranslatingFor(null);
      }
    },
    [autoSpeak, speak]
  );

  // ── Speech recognition ────────────────────────────────────────────────────
  const toggleListening = useCallback(
    (side) => {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        alert('Speech recognition requires Google Chrome or Microsoft Edge.');
        return;
      }

      if (side === 'a') {
        if (isListeningA) { recognitionARef.current?.stop(); setIsListeningA(false); return; }
        recognitionBRef.current?.stop(); setIsListeningB(false);

        const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === langARef.current);
        const rec = new SpeechRec();
        rec.lang = langObj?.speechLocale || 'en-US';
        rec.continuous = false;
        rec.interimResults = true;
        rec.onstart  = () => setIsListeningA(true);
        rec.onresult = (e) => setTextA(Array.from(e.results).map((r) => r[0].transcript).join(''));
        rec.onerror  = () => setIsListeningA(false);
        rec.onend    = () => {
          setIsListeningA(false);
          if (textARef.current?.trim()) handleTranslateAndSend('a', textARef.current);
        };
        recognitionARef.current = rec;
        rec.start();
      } else {
        if (isListeningB) { recognitionBRef.current?.stop(); setIsListeningB(false); return; }
        recognitionARef.current?.stop(); setIsListeningA(false);

        const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === langBRef.current);
        const rec = new SpeechRec();
        rec.lang = langObj?.speechLocale || 'hi-IN';
        rec.continuous = false;
        rec.interimResults = true;
        rec.onstart  = () => setIsListeningB(true);
        rec.onresult = (e) => setTextB(Array.from(e.results).map((r) => r[0].transcript).join(''));
        rec.onerror  = () => setIsListeningB(false);
        rec.onend    = () => {
          setIsListeningB(false);
          if (textBRef.current?.trim()) handleTranslateAndSend('b', textBRef.current);
        };
        recognitionBRef.current = rec;
        rec.start();
      }
    },
    [isListeningA, isListeningB, handleTranslateAndSend]
  );

  // ── Language swap ─────────────────────────────────────────────────────────
  const handleSwapLanguages = () => {
    setLangA(langB); setLangB(langA);
    setTextA(textB); setTextB(textA);
  };

  // ── Copy ──────────────────────────────────────────────────────────────────
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // ── Delete message ────────────────────────────────────────────────────────
  const handleDeleteMessage = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));

  // ── Export transcript ─────────────────────────────────────────────────────
  const handleExportTranscript = () => {
    const la = SUPPORTED_LANGUAGES.find((l) => l.code === langA);
    const lb = SUPPORTED_LANGUAGES.find((l) => l.code === langB);
    const header = `OmniBridge — Conversation Transcript\n${la?.name} ⇄ ${lb?.name}\nExported: ${new Date().toLocaleString()}\n${'─'.repeat(60)}\n\n`;
    const body = messages.map((m) =>
      `[${m.timestamp}] ${m.sender === 'a' ? 'Speaker 1' : 'Speaker 2'} `+
      `(${SUPPORTED_LANGUAGES.find((l)=>l.code===m.fromLang)?.name} → ${SUPPORTED_LANGUAGES.find((l)=>l.code===m.toLang)?.name})\n`+
      `  Original: ${m.originalText}\n  Translation: ${m.translatedText}\n`
    ).join('\n');
    const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `omnibridge-transcript-${Date.now()}.txt`;
    a.click();
  };

  const langObjA = SUPPORTED_LANGUAGES.find((l) => l.code === langA);
  const langObjB = SUPPORTED_LANGUAGES.find((l) => l.code === langB);
  const fontSz   = FONT_SIZES[fontSizeIdx];

  const filteredPhrases = phraseCategory === 'all'
    ? TAGGED_PHRASES
    : TAGGED_PHRASES.filter((p) => p.category === phraseCategory);

  const filteredMessages = transcriptSearch.trim()
    ? messages.filter((m) =>
        m.originalText.toLowerCase().includes(transcriptSearch.toLowerCase()) ||
        m.translatedText.toLowerCase().includes(transcriptSearch.toLowerCase())
      )
    : messages;

  return (
    <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-7xl mx-auto w-full flex flex-col gap-5">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#121316]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/app" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-[#121316] transition">
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>Features Hub</span>
            </Link>
            <span className="text-stone-300">•</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#121316] bg-[#FFE600] px-3 py-0.5 rounded-full border-2 border-[#121316] shadow-[2px_2px_0_#121316]">
              Live Two-Way Translation
            </span>
          </div>
          <h1 className="font-display mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#121316] flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#121316] text-[#FFE600] border-2 border-[#121316] shadow-[2px_2px_0_#FFE600]">
              <GlobeIcon className="w-5 h-5 text-[#FFE600]" />
            </span>
            <span>Multilingual Two-Way Voice Bridge</span>
          </h1>
          <p className="font-sans mt-1 text-xs text-stone-600 font-semibold max-w-2xl">
            Bidirectional real-time speech + text translator across 15 languages with instant TTS playback.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Font size */}
          <div className="flex rounded-full border-2 border-[#121316] bg-white p-0.5 shadow-[2px_2px_0_#121316]">
            {FONT_SIZES.map((f, i) => (
              <button key={f.label} type="button" onClick={() => setFontSizeIdx(i)}
                className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${fontSizeIdx === i ? 'bg-[#121316] text-[#FFE600]' : 'text-stone-600 hover:text-[#121316]'}`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Auto-voice */}
          <button type="button" onClick={() => setAutoSpeak(!autoSpeak)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all border-2 border-[#121316] shadow-[2px_2px_0_#121316] active:translate-x-0.5 active:translate-y-0.5 ${autoSpeak ? 'bg-[#55E6A5] text-[#121316]' : 'bg-stone-100 text-stone-600'}`}>
            <Volume2Icon className="w-3.5 h-3.5 text-[#121316]" />
            <span>Auto-Voice: {autoSpeak ? 'ON' : 'OFF'}</span>
          </button>

          {/* Clear */}
          <button type="button" onClick={() => setMessages([])}
            className="flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-3.5 py-1.5 text-xs font-bold text-[#121316] shadow-[2px_2px_0_#121316] hover:bg-stone-100 active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <RotateCcwIcon className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* ── Dual Input Panels ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative">
        <InputPanel
          side="a"
          langCode={langA}       otherLangCode={langB}
          setLangCode={setLangA} text={textA} setText={setTextA}
          isListening={isListeningA}
          isTranslating={isTranslating} translatingFor={translatingFor}
          onToggleListening={toggleListening}
          onTranslate={handleTranslateAndSend}
          fontSzTa={fontSz.ta}
        />

        {/* Desktop swap */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.button type="button" onClick={handleSwapLanguages}
            whileTap={{ rotate: 180, scale: 0.9 }} transition={{ duration: 0.3 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#121316] bg-[#FFE600] text-[#121316] shadow-[3px_3px_0_#121316] hover:scale-105 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            title="Swap Languages">
            <SwapIcon className="w-5 h-5 text-[#121316]" />
          </motion.button>
        </div>

        <InputPanel
          side="b"
          langCode={langB}       otherLangCode={langA}
          setLangCode={setLangB} text={textB} setText={setTextB}
          isListening={isListeningB}
          isTranslating={isTranslating} translatingFor={translatingFor}
          onToggleListening={toggleListening}
          onTranslate={handleTranslateAndSend}
          fontSzTa={fontSz.ta}
        />
      </div>

      {/* Mobile swap */}
      <div className="flex lg:hidden justify-center">
        <button type="button" onClick={handleSwapLanguages}
          className="flex items-center gap-2 rounded-full border-2 border-[#121316] bg-[#FFE600] px-4 py-2 text-xs font-bold text-[#121316] shadow-[2.5px_2.5px_0_#121316] hover:bg-[#FFE600]/80 active:translate-x-0.5 active:translate-y-0.5 transition-all">
          <SwapIcon className="w-3.5 h-3.5" />
          <span>Swap: {langObjA?.name} ⇄ {langObjB?.name}</span>
        </button>
      </div>

      {/* ── Quick Phrase Starters ── */}
      <div className="rounded-3xl border-2 border-[#121316] bg-[#FFFDF5] p-5 shadow-[4px_4px_0_#121316] flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#121316] flex items-center gap-1.5">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-500" />
            Quick Phrase Starters
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {PHRASE_CATEGORIES.map((cat) => (
              <button key={cat.id} type="button" onClick={() => setPhraseCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1 rounded-full border-2 border-[#121316] px-3 py-1 text-[11px] font-bold transition-all shadow-[1.5px_2px_0_#121316] active:translate-x-0.5 active:translate-y-0.5 ${phraseCategory === cat.id ? 'bg-[#FFE600] text-[#121316]' : 'bg-white text-stone-700 hover:bg-stone-50'}`}>
                <span>{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {filteredPhrases.map((item, idx) => {
              const promptA = item[langA] || item.en;
              return (
                <motion.button key={`${phraseCategory}-${idx}`} layout
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}
                  type="button" onClick={() => handleTranslateAndSend('a', promptA)}
                  className="rounded-xl border-2 border-[#121316] bg-white px-3.5 py-1.5 text-xs font-bold text-[#121316] hover:bg-[#FFE600] shadow-[2px_2px_0_#121316] active:translate-x-0.5 active:translate-y-0.5 transition-all">
                  {promptA}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Conversation Transcript ── */}
      <div className="rounded-3xl border-2 border-[#121316] bg-[#F8FAFC] p-5 sm:p-6 shadow-[4px_4px_0_#121316] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b-2 border-[#121316]/10 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#121316] animate-pulse" />
            <h2 className="text-sm font-black tracking-tight text-[#121316]">Live Conversation Transcript</h2>
            <span className="text-xs font-bold text-stone-500">({messages.length} exchange{messages.length !== 1 ? 's' : ''})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#121316] bg-stone-100 border border-[#121316] rounded-full px-2.5 py-0.5">{langObjA?.flag} {langObjA?.name} ⇄ {langObjB?.flag} {langObjB?.name}</span>
            <button type="button" onClick={() => { setShowSearch((v) => !v); setTranscriptSearch(''); }}
              className={`p-1.5 rounded-xl border-2 border-[#121316] shadow-[2px_2px_0_#121316] transition-all ${showSearch ? 'bg-[#121316] text-[#FFE600]' : 'bg-stone-50 text-stone-700 hover:bg-stone-100'}`} title="Search">
              <SearchIcon className="w-3.5 h-3.5" />
            </button>
            {messages.length > 0 && (
              <button type="button" onClick={handleExportTranscript}
                className="flex items-center gap-1 rounded-xl border-2 border-[#121316] bg-white px-3 py-1.5 text-xs font-bold text-[#121316] shadow-[2px_2px_0_#121316] hover:bg-stone-100 active:translate-x-0.5 active:translate-y-0.5 transition-all">
                <DownloadIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input type="text" value={transcriptSearch} onChange={(e) => setTranscriptSearch(e.target.value)}
                  placeholder="Search in transcript…"
                  className="w-full rounded-xl border-2 border-[#121316] bg-stone-50 pl-9 pr-4 py-2 text-xs font-bold text-[#121316] placeholder:text-stone-400 focus:outline-none focus:bg-white shadow-[2px_2px_0_#121316]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredMessages.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-2 text-stone-400">
              <GlobeIcon className="w-8 h-8 text-stone-300" />
              <p className="text-xs font-bold text-stone-700">{transcriptSearch ? 'No matches found.' : 'No dialogue yet.'}</p>
              <p className="text-[11px] text-stone-500">{transcriptSearch ? 'Try a different search term.' : 'Use a microphone or type above to begin.'}</p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSpeakerA = msg.sender === 'a';
              const fromLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === msg.fromLang);
              const toLangObj   = SUPPORTED_LANGUAGES.find((l) => l.code === msg.toLang);
              const isRtlFrom   = RTL_LANGS.includes(msg.fromLang);
              const isRtlTo     = RTL_LANGS.includes(msg.toLang);

              return (
                <motion.div key={msg.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: isSpeakerA ? -20 : 20 }} transition={{ duration: 0.2 }}
                  className={`group flex flex-col max-w-[88%] rounded-2xl p-4 shadow-[3px_3px_0_#121316] border-2 border-[#121316] ${isSpeakerA ? 'self-start bg-[#FFFDF0]' : 'self-end bg-[#E8F8F5]'}`}>

                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border border-[#121316] text-[10px] font-black ${isSpeakerA ? 'bg-[#FFE600] text-[#121316]' : 'bg-[#55E6A5] text-[#121316]'}`}>
                        {isSpeakerA ? 'A' : 'B'}
                      </span>
                      <span className="text-[11px] font-extrabold text-[#121316]">{isSpeakerA ? 'Speaker 1' : 'Speaker 2'}</span>
                      <span className="text-stone-400">•</span>
                      <span className="text-[10px] font-bold text-stone-600">{fromLangObj?.name} → {toLangObj?.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-stone-500">{msg.timestamp}</span>
                      <button type="button" onClick={() => handleDeleteMessage(msg.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-stone-400 hover:text-rose-600 transition" title="Delete">
                        <TrashIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className={`flex items-start justify-between gap-2 mb-1.5 ${fontSz.chat}`}>
                    <span dir={isRtlFrom ? 'rtl' : 'ltr'} className="text-stone-700 font-medium leading-snug">{msg.originalText}</span>
                    <button type="button" onClick={() => speak(msg.originalText, msg.fromLang)}
                      className="shrink-0 p-1 rounded-md text-stone-500 hover:text-black hover:bg-black/5 transition" title="Listen to original">
                      <Volume2Icon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-3 border-t border-[#121316]/15 pt-2 mt-1">
                    <p dir={isRtlTo ? 'rtl' : 'ltr'} className={`font-black text-[#121316] leading-snug ${fontSz.chat}`}>{msg.translatedText}</p>
                    <div className="flex items-center gap-1 shrink-0">
                      <button type="button" onClick={() => speak(msg.translatedText, msg.toLang)}
                        className="p-1.5 rounded-lg border border-[#121316] bg-white hover:bg-stone-100 text-[#121316] shadow-[1px_1px_0_#121316] transition" title="Speak translation">
                        <Volume2Icon className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => handleCopy(msg.id, msg.translatedText)}
                        className="p-1.5 rounded-lg border border-[#121316] bg-white hover:bg-stone-100 text-[#121316] shadow-[1px_1px_0_#121316] transition" title="Copy translation">
                        {copiedId === msg.id ? <CheckIcon className="w-3.5 h-3.5 text-emerald-600" /> : <CopyIcon className="w-3.5 h-3.5 text-stone-600" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
};

export default TwoWayTranslationPage;
