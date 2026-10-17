import React, { useState, useEffect, useRef } from 'react';
import {
  PlayIcon,
  PauseIcon,
  RotateCcwIcon,
} from './ui/Icons';

export const RealSignPlayer = ({
  tokens = [],
  activeSignIndex = 0,
  setActiveSignIndex,
  isPlaying = true,
  setIsPlaying,
  speed = 1.0,
  setSpeed,
}) => {
  const currentToken = tokens[activeSignIndex] || {
    type: 'gif',
    filename: 'hello.gif',
    src: '/signs/hello.gif',
    label: 'HELLO',
    hindi: 'नमस्ते',
    duration_ms: 2300,
    isLetter: false
  };

  const [imgError, setImgError] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const preloadedRef = useRef(new Set());

  // 1. Aggressively Preload All Sequence Assets into Browser RAM
  useEffect(() => {
    if (!tokens || tokens.length === 0) return;
    tokens.forEach((t) => {
      if (t?.src && !preloadedRef.current.has(t.src)) {
        preloadedRef.current.add(t.src);
        const img = new Image();
        img.src = t.src;
      }
    });
  }, [tokens]);

  // 2. Exact Duration Timer: Guarantees the GIF plays its FULL natural length!
  // No stale state, no early cut-offs, no rapid skipping.
  useEffect(() => {
    setImgError(false);
    setProgressKey(Date.now());

    if (!isPlaying || tokens.length <= 1) return;

    // Exact duration for this sign (e.g. 4700ms for "what is your name", 3100ms for "good morning")
    const naturalDuration = currentToken.duration_ms || 2500;
    const effectiveDuration = naturalDuration / speed;

    const timer = setTimeout(() => {
      setActiveSignIndex((prev) => (prev + 1) % tokens.length);
    }, effectiveDuration);

    return () => clearTimeout(timer);
  }, [activeSignIndex, isPlaying, speed, tokens.length, currentToken.duration_ms, currentToken.src, setActiveSignIndex]);

  // Navigation handlers
  const handlePrev = () => {
    if (tokens.length <= 1) return;
    setActiveSignIndex((prev) => (prev > 0 ? prev - 1 : tokens.length - 1));
  };

  const handleNext = () => {
    if (tokens.length <= 1) return;
    setActiveSignIndex((prev) => (prev + 1) % tokens.length);
  };

  const handleReplayCurrent = () => {
    setProgressKey(Date.now());
    setIsPlaying(true);
  };

  const durationSec = ((currentToken.duration_ms || 2500) / 1000).toFixed(1);
  const effectiveMs = (currentToken.duration_ms || 2500) / speed;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Cinematic Sign Demonstration Viewport */}
      <div className="relative aspect-video w-full rounded-3xl border border-stone-800 bg-[#06080c] overflow-hidden shadow-lg flex flex-col items-center justify-center text-white">
        
        {/* Top Header Badge */}
        <div className="absolute top-3.5 left-3.5 z-30 flex items-center gap-2 rounded-full bg-black/80 px-3.5 py-1.5 text-xs font-bold text-white border border-white/10 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-300">
            {currentToken.isLetter ? 'Alphabet Fingerspelling' : 'Authentic ISL Sign'}
          </span>
          <span className="text-stone-400">•</span>
          <span className="text-[#FFE600] font-black">{currentToken.label}</span>
          {currentToken.hindi && (
            <span className="text-stone-300 text-[11px] font-medium">({currentToken.hindi})</span>
          )}
        </div>

        {/* Top Right Duration & Step Indicator */}
        <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2 font-mono text-[11px] text-stone-300 rounded-full bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-md">
          <span className="text-amber-300">{durationSec}s Full Loop</span>
          <span>•</span>
          <span>Sign {tokens.length > 0 ? activeSignIndex + 1 : 1} of {tokens.length || 1}</span>
        </div>

        {/* Stable Media Stage: Zero Jitter */}
        <div className="w-full h-full flex items-center justify-center p-3 relative overflow-hidden">
          {imgError ? (
            <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-stone-400">
              <span className="text-4xl">🤟</span>
              <p className="text-sm font-bold text-white">{currentToken.label}</p>
              <p className="text-xs text-stone-500">Asset not found. Displaying token fallback.</p>
            </div>
          ) : (
            <img
              key={currentToken.src}
              src={currentToken.src}
              alt={currentToken.label}
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain rounded-2xl shadow-md select-none pointer-events-none"
            />
          )}
        </div>

        {/* Hardware-Accelerated Smooth Progress Bar (Syncs with GIF Duration) */}
        <div className="absolute bottom-16 inset-x-4 z-30 h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            key={`progress-${activeSignIndex}-${progressKey}-${isPlaying}`}
            className="h-full bg-gradient-to-r from-cyan-400 via-[#FFE600] to-emerald-400"
            style={{
              width: '100%',
              transformOrigin: 'left',
              animation: isPlaying ? `progressFill ${effectiveMs}ms linear forwards` : 'none',
            }}
          />
        </div>

        {/* CSS Keyframe for Zero-Overhead Hardware Animated Progress */}
        <style>{`
          @keyframes progressFill {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-3.5 inset-x-3.5 z-30 flex items-center justify-between rounded-2xl bg-black/85 px-4 py-2 border border-white/10 backdrop-blur-md">
          
          {/* Previous / Play / Next / Replay Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={tokens.length <= 1}
              className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition disabled:opacity-40"
              title="Previous Sign"
            >
              ◀ Prev
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold transition shadow-sm ${
                isPlaying
                  ? 'bg-amber-400 text-stone-900 hover:bg-amber-300'
                  : 'bg-emerald-500 text-white hover:bg-emerald-400'
              }`}
            >
              {isPlaying ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={tokens.length <= 1}
              className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition disabled:opacity-40"
              title="Next Sign"
            >
              Next ▶
            </button>

            <button
              type="button"
              onClick={handleReplayCurrent}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition"
              title="Replay from start of sign"
            >
              <RotateCcwIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-stone-400 hidden sm:inline">Speed:</span>
            <div className="flex items-center rounded-lg bg-white/10 p-0.5 text-[11px] font-mono text-stone-300">
              {[0.75, 1.0, 1.25].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded transition ${
                    speed === s ? 'bg-[#FFE600] text-black font-bold' : 'hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Token Timeline */}
      <div className="rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Sign Translation Sequence ({tokens.length} signs):
          </span>
          <span className="text-[10px] font-mono text-stone-400">
            Click any token to inspect
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {tokens.map((token, idx) => (
            <button
              key={`${token.label}-${idx}`}
              type="button"
              onClick={() => {
                setActiveSignIndex(idx);
                setIsPlaying(false);
              }}
              className={`rounded-xl px-2.5 py-1 text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                activeSignIndex === idx
                  ? 'bg-[#121316] text-[#FFE600] shadow-sm scale-105 ring-2 ring-[#FFE600]'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>{token.label}</span>
              {token.isLetter ? (
                <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-sans">
                  Letter
                </span>
              ) : (
                <span className="text-[9px] font-mono text-stone-400">
                  {((token.duration_ms || 2500) / 1000).toFixed(1)}s
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealSignPlayer;
