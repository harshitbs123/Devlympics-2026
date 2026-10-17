import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { getLenis } from '../utils/lenis';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// HIGH-FIDELITY VECTOR DOODLE ILLUSTRATIONS (Matching card.png & animate.png)
// ============================================================================

/**
 * 1. Dual-Way Video Call Doodle Window (Direct match to card.png)
 * Features 4 doodle participants in circular avatars around a browser frame:
 * - Yellow circle: Girl with black hair in blue polka-dot shirt
 * - Pink circle: Red-haired person with call-center headset & mic
 * - Sky blue circle: Blonde person looking up into the call
 * - Green circle: Dark-haired girl looking right
 * With chat preview card, dotted guidelines, double arrow ⟷, and background squiggles.
 */
export const VideoCallDoodleWindow = () => (
  <svg
    viewBox="0 0 540 460"
    className="w-full h-auto drop-shadow-sm select-none max-h-[135px] sm:max-h-[155px]"
    fill="none"
  >
    {/* Background Decorative Accents */}
    <circle cx="120" cy="110" r="85" fill="#E0F2FE" opacity="0.8" />
    <rect x="290" y="320" width="160" height="100" rx="20" fill="#FED7AA" opacity="0.6" />
    
    {/* Pink Wavy Squiggles at Bottom-Center */}
    <path
      d="M230 360 C 245 352, 260 368, 275 360 C 290 352, 305 368, 320 360 C 335 352, 350 368, 365 360"
      stroke="#FF7DA7"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M230 375 C 245 367, 260 383, 275 375 C 290 367, 305 383, 320 375 C 335 367, 350 383, 365 375"
      stroke="#FF7DA7"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M230 390 C 245 382, 260 398, 275 390 C 290 382, 305 398, 320 390 C 335 382, 350 398, 365 390"
      stroke="#FF7DA7"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />

    {/* Central Main Browser / Video Call Window */}
    <rect
      x="110"
      y="50"
      width="300"
      height="310"
      rx="28"
      fill="#F8FAFC"
      stroke="#121316"
      strokeWidth="3.2"
    />
    {/* Window Header Line */}
    <line x1="110" y1="84" x2="410" y2="84" stroke="#121316" strokeWidth="2.5" />
    {/* 3 Window Control Dots */}
    <circle cx="132" cy="67" r="4.5" fill="#121316" />
    <circle cx="148" cy="67" r="4.5" fill="#121316" />
    <circle cx="164" cy="67" r="4.5" fill="#121316" />

    {/* Inside Window: Top Chat Message Card */}
    <rect x="220" y="98" width="140" height="55" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
    <rect x="305" y="98" width="55" height="55" rx="8" fill="#E2E8F0" opacity="0.6" />
    {/* Chat Lines */}
    <line x1="240" y1="114" x2="290" y2="114" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
    <line x1="240" y1="126" x2="275" y2="126" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
    <line x1="240" y1="138" x2="295" y2="138" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
    {/* Folded corner indicator */}
    <path d="M222 142 L230 142 L222 150 Z" fill="#CBD5E1" />

    {/* Inside Window: Second Chat Block */}
    <rect x="140" y="165" width="200" height="56" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
    <rect x="280" y="165" width="60" height="56" rx="8" fill="#E2E8F0" opacity="0.6" />
    <line x1="160" y1="182" x2="260" y2="182" stroke="#94A3B8" strokeWidth="3.2" strokeLinecap="round" />
    <line x1="160" y1="196" x2="235" y2="196" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />

    {/* Inside Window: Dotted Video Stage Grid Area */}
    <rect
      x="132"
      y="235"
      width="240"
      height="100"
      rx="6"
      fill="none"
      stroke="#CBD5E1"
      strokeWidth="2.5"
      strokeDasharray="4 6"
    />
    
    {/* Large Central Bidirectional Arrow (⟷) Indicating Two-Way Bridge */}
    <g stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="215" y1="285" x2="285" y2="285" />
      <path d="M228 275 L215 285 L228 295" />
      <path d="M272 275 L285 285 L272 295" />
    </g>

    {/* =========================================================================
        AVATARS OVERLAPPING THE WINDOW (The Exact Signature card.png Style)
       ========================================================================= */}

    {/* 1. TOP-RIGHT AVATAR: Girl with Black Bob & Polka-dot Shirt */}
    <g transform="translate(390, 60)">
      <circle cx="34" cy="34" r="34" fill="#FFE600" stroke="#121316" strokeWidth="3" />
      <path d="M12 56 C14 42, 54 42, 56 56 Z" fill="#93C5FD" stroke="#121316" strokeWidth="2.5" />
      <circle cx="24" cy="48" r="1.5" fill="#FFFFFF" />
      <circle cx="34" cy="50" r="1.5" fill="#FFFFFF" />
      <circle cx="44" cy="48" r="1.5" fill="#FFFFFF" />
      <rect x="28" y="34" width="8" height="8" fill="#FFE2B7" />
      <circle cx="32" cy="28" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <path
        d="M20 28 C16 12, 48 8, 48 24 C52 26, 54 36, 44 36 C42 28, 38 18, 28 20 C22 22, 20 28, 20 28 Z"
        fill="#121316"
      />
      <circle cx="28" cy="27" r="1.8" fill="#121316" />
      <ellipse cx="26" cy="32" rx="2.5" ry="1.5" fill="#FF8BA7" />
      <path d="M28 32 C30 34, 33 34, 34 32" stroke="#121316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <g transform="translate(18, 62)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>

    {/* 2. MID-RIGHT AVATAR: Red-Haired Communicator with Headset */}
    <g transform="translate(395, 230)">
      <circle cx="32" cy="32" r="32" fill="#FFAEBA" stroke="#121316" strokeWidth="3" />
      <path d="M12 54 C14 42, 50 42, 52 54 Z" fill="#FFE600" stroke="#121316" strokeWidth="2.5" />
      <rect x="28" y="32" width="8" height="8" fill="#FFE2B7" />
      <circle cx="32" cy="26" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <path
        d="M20 26 C18 12, 46 12, 46 26 C48 34, 42 40, 36 38 C32 28, 26 28, 20 26 Z"
        fill="#EF4444"
        stroke="#121316"
        strokeWidth="1.8"
      />
      <rect x="38" y="22" width="6" height="12" rx="3" fill="#121316" />
      <path d="M38 28 C34 34, 28 34, 26 32" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="32" r="1.8" fill="#121316" />
      <circle cx="28" cy="24" r="1.8" fill="#121316" />
      <ellipse cx="26" cy="28" rx="2.5" ry="1.5" fill="#FF8BA7" />
      <g transform="translate(16, 58)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>

    {/* 3. BOTTOM-LEFT AVATAR: Blonde Person Looking Up Attentively */}
    <g transform="translate(130, 310)">
      <circle cx="32" cy="32" r="32" fill="#93C5FD" stroke="#121316" strokeWidth="3" />
      <path d="M12 54 C14 42, 50 42, 52 54 Z" fill="#F472B6" stroke="#121316" strokeWidth="2.5" />
      <rect x="28" y="30" width="8" height="8" fill="#FFE2B7" />
      <circle cx="32" cy="24" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <path
        d="M20 22 C22 10, 42 10, 44 22 C42 16, 26 16, 20 22 Z"
        fill="#FBBF24"
        stroke="#121316"
        strokeWidth="1.8"
      />
      <circle cx="36" cy="19" r="2.2" fill="#121316" />
      <circle cx="37" cy="18" r="0.8" fill="#FFFFFF" />
      <ellipse cx="34" cy="25" rx="2.5" ry="1.5" fill="#FF8BA7" />
      <path d="M30 26 C32 29, 36 29, 37 26" stroke="#121316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <g transform="translate(16, 58)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>

    {/* 4. MID-LEFT AVATAR: Girl with Straight Black Hair & Bangs */}
    <g transform="translate(80, 190)">
      <circle cx="34" cy="34" r="34" fill="#10B981" stroke="#121316" strokeWidth="3" />
      <path d="M14 56 C16 44, 52 44, 54 56 Z" fill="#F472B6" stroke="#121316" strokeWidth="2.5" />
      <path d="M30 46 L34 52 L38 46" fill="#FFFFFF" stroke="#121316" strokeWidth="1.5" />
      <circle cx="34" cy="28" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <path
        d="M20 28 C20 14, 48 14, 48 28 L48 38 C44 38, 44 26, 40 26 C36 26, 36 38, 20 38 Z"
        fill="#121316"
      />
      <circle cx="38" cy="27" r="2" fill="#121316" />
      <circle cx="39" cy="26" r="0.7" fill="#FFFFFF" />
      <ellipse cx="36" cy="32" rx="2.5" ry="1.5" fill="#FF8BA7" />
      <path d="M37 32 C39 34, 42 34, 43 32" stroke="#121316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <g transform="translate(18, 62)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>
  </svg>
);

/**
 * 2. Audio-to-Text Acoustic AI Doodle Window
 */
export const AudioToTextDoodleWindow = () => (
  <svg
    viewBox="0 0 540 460"
    className="w-full h-auto drop-shadow-sm select-none max-h-[135px] sm:max-h-[155px]"
    fill="none"
  >
    <circle cx="430" cy="110" r="85" fill="#FEF08A" opacity="0.6" />
    <rect x="70" y="310" width="150" height="95" rx="20" fill="#E0E7FF" opacity="0.7" />
    
    <path
      d="M70 360 C 85 352, 100 368, 115 360 C 130 352, 145 368, 160 360 C 175 352, 190 368, 205 360"
      stroke="#F59E0B"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M70 375 C 85 367, 100 383, 115 375 C 130 367, 145 383, 160 375 C 175 367, 190 383, 205 375"
      stroke="#F59E0B"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />

    <rect
      x="110"
      y="50"
      width="300"
      height="310"
      rx="28"
      fill="#F8FAFC"
      stroke="#121316"
      strokeWidth="3.2"
    />
    <line x1="110" y1="84" x2="410" y2="84" stroke="#121316" strokeWidth="2.5" />
    <circle cx="132" cy="67" r="4.5" fill="#121316" />
    <circle cx="148" cy="67" r="4.5" fill="#121316" />
    <circle cx="164" cy="67" r="4.5" fill="#121316" />

    <rect x="135" y="100" width="250" height="70" rx="14" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
    <g transform="translate(150, 135)">
      {[
        { x: 0, h: 14, c: '#38BDF8' },
        { x: 12, h: 28, c: '#38BDF8' },
        { x: 24, h: 42, c: '#FF7AA2' },
        { x: 36, h: 20, c: '#FF7AA2' },
        { x: 48, h: 50, c: '#FFE600' },
        { x: 60, h: 36, c: '#FFE600' },
        { x: 72, h: 18, c: '#38BDF8' },
        { x: 84, h: 48, c: '#38BDF8' },
        { x: 96, h: 30, c: '#FF7AA2' },
        { x: 108, h: 52, c: '#121316' },
        { x: 120, h: 40, c: '#121316' },
        { x: 132, h: 24, c: '#38BDF8' },
        { x: 144, h: 44, c: '#FF7AA2' },
        { x: 156, h: 32, c: '#FFE600' },
        { x: 168, h: 16, c: '#FFE600' },
        { x: 180, h: 38, c: '#38BDF8' },
        { x: 192, h: 20, c: '#38BDF8' },
        { x: 204, h: 44, c: '#FF7AA2' },
        { x: 216, h: 18, c: '#38BDF8' },
      ].map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={-bar.h / 2}
          width="6"
          height={bar.h}
          rx="3"
          fill={bar.c}
          stroke="#121316"
          strokeWidth="1.2"
        />
      ))}
    </g>

    <g transform="translate(135, 185)">
      <rect x="0" y="0" width="250" height="74" rx="14" fill="#121316" />
      <circle cx="24" cy="24" r="10" fill="#FFE600" />
      <path d="M24 18 C22 18, 22 22, 22 24 C22 26, 26 26, 26 24 C26 22, 26 18, 24 18 Z" fill="#121316" />
      <path d="M20 23 C20 27, 28 27, 28 23" stroke="#121316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="24" y1="27" x2="24" y2="30" stroke="#121316" strokeWidth="1.5" />
      
      <text x="42" y="24" fill="#FFE600" fontSize="11" fontWeight="800" fontFamily="sans-serif">
        LIVE SPEECH TRANSLATION
      </text>
      <text x="18" y="44" fill="#FFFFFF" fontSize="11.5" fontWeight="600" fontFamily="sans-serif">
        "Welcome! We are practicing real-time
      </text>
      <text x="18" y="60" fill="#93C5FD" fontSize="11.5" fontWeight="700" fontFamily="sans-serif">
        speech transcription with 0 delay..."
      </text>
    </g>

    <g transform="translate(145, 275)">
      <rect x="0" y="0" width="230" height="34" rx="17" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
      <circle cx="18" cy="17" r="5" fill="#10B981" />
      <text x="32" y="21" fill="#121316" fontSize="10.5" fontWeight="800" fontFamily="sans-serif">
        Acoustic Filter Active • 118ms Latency
      </text>
    </g>

    <g transform="translate(75, 75)">
      <circle cx="34" cy="34" r="34" fill="#FFAE33" stroke="#121316" strokeWidth="3" />
      <path d="M14 56 C16 44, 52 44, 54 56 Z" fill="#38BDF8" stroke="#121316" strokeWidth="2.5" />
      <circle cx="34" cy="28" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <path d="M22 24 C20 12, 48 12, 46 24 Z" fill="#121316" />
      <circle cx="36" cy="27" r="2" fill="#121316" />
      <ellipse cx="38" cy="32" rx="3.5" ry="2" fill="#EF4444" stroke="#121316" strokeWidth="1" />
      <g transform="translate(18, 62)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>

    <g transform="translate(385, 250)">
      <circle cx="34" cy="34" r="34" fill="#FF7DA7" stroke="#121316" strokeWidth="3" />
      <path d="M14 56 C16 44, 52 44, 54 56 Z" fill="#FFE600" stroke="#121316" strokeWidth="2.5" />
      <circle cx="34" cy="28" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <circle cx="26" cy="18" r="7" fill="#121316" />
      <circle cx="42" cy="18" r="7" fill="#121316" />
      <circle cx="34" cy="15" r="7" fill="#121316" />
      <path d="M28 26 C30 24, 33 24, 34 26" stroke="#121316" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="27" cy="30" rx="2.5" ry="1.5" fill="#FF8BA7" />
      <g transform="translate(18, 62)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>
  </svg>
);

/**
 * 3. Sign Language to Text & Voice Doodle Window
 */
export const SignToTextDoodleWindow = () => (
  <svg
    viewBox="0 0 540 460"
    className="w-full h-auto drop-shadow-sm select-none max-h-[135px] sm:max-h-[155px]"
    fill="none"
  >
    <circle cx="110" cy="120" r="85" fill="#D1FAE5" opacity="0.8" />
    <rect x="300" y="310" width="160" height="95" rx="20" fill="#FEF08A" opacity="0.7" />

    <path
      d="M300 360 C 315 352, 330 368, 345 360 C 360 352, 375 368, 390 360 C 405 352, 420 368, 435 360"
      stroke="#10B981"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M300 375 C 315 367, 330 383, 345 375 C 360 367, 375 383, 390 375 C 405 367, 420 383, 435 375"
      stroke="#10B981"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />

    <rect
      x="110"
      y="50"
      width="300"
      height="310"
      rx="28"
      fill="#F8FAFC"
      stroke="#121316"
      strokeWidth="3.2"
    />
    <line x1="110" y1="84" x2="410" y2="84" stroke="#121316" strokeWidth="2.5" />
    <circle cx="132" cy="67" r="4.5" fill="#121316" />
    <circle cx="148" cy="67" r="4.5" fill="#121316" />
    <circle cx="164" cy="67" r="4.5" fill="#121316" />

    <rect x="135" y="98" width="250" height="150" rx="14" fill="#1E293B" stroke="#121316" strokeWidth="2" />
    
    <g transform="translate(195, 120)">
      <circle cx="45" cy="55" r="4" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="45" cy="85" r="4.5" fill="#FFE600" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="45" y1="55" x2="45" y2="85" stroke="#38BDF8" strokeWidth="2.2" />

      <line x1="45" y1="70" x2="20" y2="60" stroke="#38BDF8" strokeWidth="2.2" />
      <line x1="20" y1="60" x2="10" y2="45" stroke="#38BDF8" strokeWidth="2.2" />
      <circle cx="20" cy="60" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="10" cy="45" r="4.5" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />

      <line x1="45" y1="55" x2="35" y2="35" stroke="#38BDF8" strokeWidth="2.2" />
      <line x1="35" y1="35" x2="30" y2="15" stroke="#38BDF8" strokeWidth="2.2" />
      <circle cx="35" cy="35" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="30" cy="15" r="4.5" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />

      <line x1="45" y1="55" x2="48" y2="30" stroke="#38BDF8" strokeWidth="2.2" />
      <line x1="48" y1="30" x2="50" y2="10" stroke="#38BDF8" strokeWidth="2.2" />
      <circle cx="48" cy="30" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="50" cy="10" r="4.5" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />

      <line x1="45" y1="55" x2="62" y2="35" stroke="#38BDF8" strokeWidth="2.2" />
      <line x1="62" y1="35" x2="68" y2="20" stroke="#38BDF8" strokeWidth="2.2" />
      <circle cx="62" cy="35" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="68" cy="20" r="4.5" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />

      <line x1="45" y1="60" x2="75" y2="45" stroke="#38BDF8" strokeWidth="2.2" />
      <line x1="75" y1="45" x2="85" y2="30" stroke="#38BDF8" strokeWidth="2.2" />
      <circle cx="75" cy="45" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="85" cy="30" r="4.5" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />
      
      <rect x="0" y="0" width="98" height="98" rx="8" fill="none" stroke="#10B981" strokeWidth="1.8" strokeDasharray="4 4" />
      <rect x="2" y="2" width="62" height="15" rx="4" fill="#10B981" />
      <text x="6" y="13" fill="#FFFFFF" fontSize="8.5" fontWeight="900" fontFamily="sans-serif">
        ASL: "HELLO / 🤟"
      </text>
    </g>

    <g transform="translate(135, 260)">
      <rect x="0" y="0" width="250" height="52" rx="14" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
      <circle cx="24" cy="26" r="12" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />
      <path d="M22 21 L27 17 L27 35 L22 31 Z" fill="#121316" />
      <path d="M30 22 C33 24, 33 28, 30 30" stroke="#121316" strokeWidth="2" strokeLinecap="round" fill="none" />

      <text x="44" y="22" fill="#121316" fontSize="10" fontWeight="800" fontFamily="sans-serif">
        VOICE SYNTHESIS OUTPUT
      </text>
      <text x="44" y="38" fill="#2563EB" fontSize="12" fontWeight="700" fontFamily="sans-serif">
        "Hello! I am happy to meet you."
      </text>
    </g>

    <g transform="translate(80, 180)">
      <circle cx="34" cy="34" r="34" fill="#38BDF8" stroke="#121316" strokeWidth="3" />
      <path d="M14 56 C16 44, 52 44, 54 56 Z" fill="#FF7DA7" stroke="#121316" strokeWidth="2.5" />
      <circle cx="34" cy="28" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <path d="M22 22 C22 12, 46 12, 46 22 Z" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />
      <path d="M22 42 L16 32 L20 28" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="28" r="3.5" fill="#FFE2B7" stroke="#121316" strokeWidth="1.5" />
      <circle cx="38" cy="26" r="2" fill="#121316" />
      <ellipse cx="36" cy="31" rx="2.5" ry="1.5" fill="#FF8BA7" />
      <g transform="translate(18, 62)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>

    <g transform="translate(390, 80)">
      <circle cx="34" cy="34" r="34" fill="#FFE600" stroke="#121316" strokeWidth="3" />
      <path d="M14 56 C16 44, 52 44, 54 56 Z" fill="#818CF8" stroke="#121316" strokeWidth="2.5" />
      <circle cx="34" cy="28" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <path d="M20 28 C20 12, 48 12, 48 28" stroke="#121316" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <rect x="18" y="24" width="5" height="10" rx="2" fill="#121316" />
      <rect x="45" y="24" width="5" height="10" rx="2" fill="#121316" />
      <g transform="translate(18, 62)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>
  </svg>
);

/**
 * 4. Visual & Facial Cue Narration Doodle Window
 */
export const VisionToAudioDoodleWindow = () => (
  <svg
    viewBox="0 0 540 460"
    className="w-full h-auto drop-shadow-sm select-none max-h-[135px] sm:max-h-[155px]"
    fill="none"
  >
    <circle cx="430" cy="110" r="85" fill="#EDE9FE" opacity="0.8" />
    <rect x="70" y="310" width="160" height="95" rx="20" fill="#FCE7F3" opacity="0.7" />

    <path
      d="M70 360 C 85 352, 100 368, 115 360 C 130 352, 145 368, 160 360 C 175 352, 190 368, 205 360"
      stroke="#8B5CF6"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M70 375 C 85 367, 100 383, 115 375 C 130 367, 145 383, 160 375 C 175 367, 190 383, 205 375"
      stroke="#8B5CF6"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />

    <rect
      x="110"
      y="50"
      width="300"
      height="310"
      rx="28"
      fill="#F8FAFC"
      stroke="#121316"
      strokeWidth="3.2"
    />
    <line x1="110" y1="84" x2="410" y2="84" stroke="#121316" strokeWidth="2.5" />
    <circle cx="132" cy="67" r="4.5" fill="#121316" />
    <circle cx="148" cy="67" r="4.5" fill="#121316" />
    <circle cx="164" cy="67" r="4.5" fill="#121316" />

    <rect x="135" y="98" width="250" height="135" rx="14" fill="#0F172A" stroke="#121316" strokeWidth="2" />
    
    <g transform="translate(170, 115)">
      <circle cx="45" cy="40" r="30" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="35" cy="34" r="3" fill="#60A5FA" />
      <circle cx="55" cy="34" r="3" fill="#60A5FA" />
      <path d="M35 48 C40 56, 50 56, 55 48" stroke="#F43F5E" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="-4" width="86" height="16" rx="4" fill="#F43F5E" />
      <text x="18" y="8" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        SMILE: 98% JOY
      </text>
    </g>

    <g transform="translate(290, 175)">
      <rect x="0" y="0" width="82" height="18" rx="4" fill="#3B82F6" />
      <text x="6" y="12" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif">
        OPEN DOORWAY
      </text>
    </g>

    <g transform="translate(135, 248)">
      <rect x="0" y="0" width="250" height="64" rx="14" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
      <circle cx="26" cy="24" r="12" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />
      <circle cx="26" cy="24" r="5" fill="#6366F1" />
      <text x="46" y="22" fill="#121316" fontSize="10" fontWeight="800" fontFamily="sans-serif">
        SPATIAL AUDIO NARRATION
      </text>
      <text x="18" y="44" fill="#4B5563" fontSize="11" fontWeight="600" fontFamily="sans-serif">
        "Maya is smiling warmly across the table.
      </text>
      <text x="18" y="58" fill="#6366F1" fontSize="11" fontWeight="700" fontFamily="sans-serif">
        A clear doorway is 5 feet to your left."
      </text>
    </g>

    <g transform="translate(80, 180)">
      <circle cx="34" cy="34" r="34" fill="#6366F1" stroke="#121316" strokeWidth="3" />
      <path d="M14 56 C16 44, 52 44, 54 56 Z" fill="#FFE600" stroke="#121316" strokeWidth="2.5" />
      <circle cx="34" cy="28" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <rect x="24" y="24" width="9" height="7" rx="2" fill="#121316" />
      <rect x="35" y="24" width="9" height="7" rx="2" fill="#121316" />
      <line x1="33" y1="27" x2="35" y2="27" stroke="#121316" strokeWidth="2" />
      <path d="M22 28 C22 14, 46 14, 46 28" stroke="#121316" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <rect x="20" y="24" width="4" height="9" rx="2" fill="#EF4444" />
      <rect x="44" y="24" width="4" height="9" rx="2" fill="#EF4444" />
      <g transform="translate(18, 62)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>

    <g transform="translate(390, 80)">
      <circle cx="34" cy="34" r="34" fill="#FF7AA2" stroke="#121316" strokeWidth="3" />
      <path d="M14 56 C16 44, 52 44, 54 56 Z" fill="#38BDF8" stroke="#121316" strokeWidth="2.5" />
      <circle cx="34" cy="28" r="13" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
      <circle cx="29" cy="26" r="2" fill="#121316" />
      <circle cx="39" cy="26" r="2" fill="#121316" />
      <ellipse cx="27" cy="31" rx="2.5" ry="1.5" fill="#FF8BA7" />
      <ellipse cx="41" cy="31" rx="2.5" ry="1.5" fill="#FF8BA7" />
      <path d="M31 32 C34 37, 36 37, 39 32" stroke="#121316" strokeWidth="2" strokeLinecap="round" fill="none" />
      <g transform="translate(18, 62)">
        <rect x="0" y="0" width="30" height="14" rx="7" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
        <circle cx="9" cy="7" r="1.8" fill="#121316" />
        <circle cx="15" cy="7" r="1.8" fill="#121316" />
        <circle cx="21" cy="7" r="1.8" fill="#121316" />
      </g>
    </g>
  </svg>
);

// ============================================================================
// CARDS CONFIGURATION (Exact data preserved)
// ============================================================================

export const DECK_CARDS = [
  {
    id: 'video-call',
    number: '01',
    badge: 'Dual-Way Live Bridge',
    badgeBg: 'bg-[#FFE600]',
    badgeTextColor: 'text-[#121316]',
    title: 'Dual-Way Multimodal Video Call',
    shortDesc: 'Seamless live video communication connecting signers and verbal speakers.',
    useCaseParagraph:
      'Connect two people with entirely different communication abilities seamlessly over high-definition video. Whether one participant uses American Sign Language (ASL) and the other speaks verbally, OmniBridge synchronizes video cues, gesture tracking, and synthesized audio bidirectionally with sub-120ms latency.',
    useCaseLabel: 'Primary Use Case',
    useCaseExample: 'Telehealth appointments, remote inclusive classrooms, and cross-disability family calls.',
    DoodleComponent: VideoCallDoodleWindow,
    accentColor: '#2563EB',
    cardBg: 'bg-[#2563EB]',
    textColor: 'text-white',
    paraTextColor: 'text-blue-50',
    tags: ['Sub-120ms Latency', 'Zero Extra Hardware', 'Dual Camera Sync', 'Privacy First'],
    stat: '10k+ Calls',
    statLabel: 'Connected seamlessly',
  },
  {
    id: 'audio-to-text',
    number: '02',
    badge: 'Acoustic AI Engine',
    badgeBg: 'bg-[#121316]',
    badgeTextColor: 'text-[#FFE600]',
    title: 'Instant Speech to Caption Translation',
    shortDesc: 'Deep acoustic noise cancellation and real-time formatted transcription.',
    useCaseParagraph:
      'Transforms spoken language from microphones and phone audio into crisp, formatted captions instantly. Incorporates neural speech separation to filter out harsh background noise, ambient chatter, and overlapping voices so deaf and hard-of-hearing users never miss a single syllable.',
    useCaseLabel: 'Primary Use Case',
    useCaseExample: 'Noisy lecture halls, corporate all-hands meetings, emergency lines, and customer counters.',
    DoodleComponent: AudioToTextDoodleWindow,
    accentColor: '#FF6B4A',
    cardBg: 'bg-[#FF6B4A]',
    textColor: 'text-white',
    paraTextColor: 'text-orange-50',
    tags: ['98.4% Accuracy', 'Speaker Diarization', 'Multi-Language', 'Noise Filtering'],
    stat: '< 90ms',
    statLabel: 'Acoustic latency',
  },
  {
    id: 'sign-to-voice',
    number: '03',
    badge: 'Computer Vision Mesh',
    badgeBg: 'bg-[#FFE600]',
    badgeTextColor: 'text-[#121316]',
    title: 'Sign Language to Voice & Text',
    shortDesc: '21-joint 3D hand landmark tracking converting sign gestures into speech.',
    useCaseParagraph:
      'Leverages 21-point hand landmark computer vision through standard webcams to interpret sign language alphabet, dynamic gestures, and facial grammar in real time. Automatically renders translated sentences onto the screen and vocalizes them using natural, expressive AI voice synthesis.',
    useCaseLabel: 'Primary Use Case',
    useCaseExample: 'Job interviews, retail checkout interactions, public transit desks, and peer study sessions.',
    DoodleComponent: SignToTextDoodleWindow,
    accentColor: '#10B981',
    cardBg: 'bg-white',
    textColor: 'text-[#121316]',
    paraTextColor: 'text-stone-600',
    tags: ['21 3D Joint Tracking', 'Natural Neural Voice', 'ASL & International Signs', 'Webcam Powered'],
    stat: '99.1%',
    statLabel: 'Joint recognition',
  },
  {
    id: 'vision-narration',
    number: '04',
    badge: 'Spatial Emotion AI',
    badgeBg: 'bg-[#FFE600]',
    badgeTextColor: 'text-[#121316]',
    title: 'Tactile & Facial Cue Narration',
    shortDesc: 'Reading subtle facial expressions, smiles, and room surroundings into audio.',
    useCaseParagraph:
      'Non-verbal cues like smiles, nods, confusion, and eye gaze carry over 70% of human emotional communication. OmniBridge reads subtle facial expressions and surroundings, delivering discreet audio whispers and haptic pulses directly into the user’s earpiece so blind users feel every nuance.',
    useCaseLabel: 'Primary Use Case',
    useCaseExample: 'Social parties, business negotiations, emotional check-ins, and navigating unfamiliar buildings.',
    DoodleComponent: VisionToAudioDoodleWindow,
    accentColor: '#6366F1',
    cardBg: 'bg-[#6366F1]',
    textColor: 'text-white',
    paraTextColor: 'text-indigo-100',
    tags: ['Emotion Recognition', 'Spatial Audio Ripples', 'Scene Object OCR', 'Discreet Ear Whispers'],
    stat: '16 Emotions',
    statLabel: 'Detected in real time',
  },
];

// ============================================================================
// MAIN COMPONENT: AssistiveDeckSlider (GSAP ScrollTrigger Pinned Deck Engine)
// ============================================================================

export const AssistiveDeckSlider = () => {
  const sectionRef = useRef(null);
  const cardElementsRef = useRef([]);
  const tabElementsRef = useRef([]);
  const dotElementsRef = useRef([]);
  const leftCloudRef = useRef(null);
  const rightCloudRef = useRef(null);
  const activeIndexRef = useRef(0);

  // Fast direct DOM class toggle without React re-render lag
  const updateTabHighlight = (newIdx) => {
    if (newIdx === activeIndexRef.current) return;
    activeIndexRef.current = newIdx;

    tabElementsRef.current.forEach((tab, i) => {
      if (!tab) return;
      if (i === newIdx) {
        tab.className =
          'inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs font-black transition-all duration-200 bg-[#121316] text-[#FFE600] shadow-[2.5px_3.5px_0_#FFE600] scale-105';
      } else {
        tab.className =
          'inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs font-black transition-all duration-200 bg-white text-stone-700 shadow-[2px_2px_0_#121316] hover:bg-stone-50 hover:scale-102';
      }
    });

    dotElementsRef.current.forEach((dot, i) => {
      if (!dot) return;
      if (i === newIdx) {
        dot.className = 'h-2.5 rounded-full transition-all duration-300 w-6 bg-[#121316]';
      } else {
        dot.className = 'h-2.5 rounded-full transition-all duration-300 w-2.5 bg-stone-300 hover:bg-stone-500';
      }
    });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    cardElementsRef.current = cardElementsRef.current.slice(0, DECK_CARDS.length);

    const ctx = gsap.context(() => {
      const cards = cardElementsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      // 1. Natural real-time tab highlights as cards scroll past
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => updateTabHighlight(i),
          onEnterBack: () => updateTabHighlight(i),
        });

        // Subtle scale-back depth on previous card as each next card stacks
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          gsap.to(card, {
            scale: 0.965,
            y: -6,
            opacity: 0.9,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 75%',
              end: 'top 25%',
              scrub: 0.6,
            },
          });
        }
      });

      // 2. Parallax clouds in background
      if (leftCloudRef.current && rightCloudRef.current && sectionRef.current) {
        gsap.to(leftCloudRef.current, {
          y: -50,
          rotate: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
        gsap.to(rightCloudRef.current, {
          y: -70,
          rotate: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Jump directly to card via tabs or navigation (using Lenis when available)
  const jumpToCard = (targetIdx) => {
    updateTabHighlight(targetIdx);

    const targetCard = cardElementsRef.current[targetIdx];
    if (targetCard) {
      const lenis = getLenis();
      const topOffset = -(80 + targetIdx * 14);
      if (lenis) {
        lenis.scrollTo(targetCard, { offset: topOffset, duration: 0.85 });
      } else {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndexRef.current + 1) % DECK_CARDS.length;
    jumpToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndexRef.current - 1 + DECK_CARDS.length) % DECK_CARDS.length;
    jumpToCard(prevIdx);
  };

  return (
    <div ref={sectionRef} className="relative w-full max-w-5xl mx-auto px-4 py-8 sm:px-6">
      
      {/* Header Bar with Title and Real-Time Scroll Tabs */}
      <div className="mb-6 sm:mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-[#121316] bg-[#FFE600] px-3 py-0.5 text-[11px] font-black uppercase text-[#121316] shadow-[1.5px_2px_0_#121316]">
            <span>⚡ Visual Assistive Experience</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#121316] tracking-tight">
            How OmniBridge Works in Action
          </h2>
          <p className="font-sans text-xs sm:text-base text-stone-600 mt-1 max-w-xl font-normal leading-relaxed">
            Scroll down to watch assistive modules stack and transition seamlessly.
          </p>
        </div>

        {/* Scroll Indicator Pill */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Continuous Flow ↓</span>
        </div>
      </div>

      {/* Interactive Category Selector Tabs */}
      <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 sticky top-4 z-30 py-1">
        {DECK_CARDS.map((card, idx) => {
          const isInitialActive = idx === 0;
          return (
            <button
              key={card.id}
              ref={(el) => (tabElementsRef.current[idx] = el)}
              onClick={() => jumpToCard(idx)}
              className={`inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs font-black transition-all duration-200 ${
                isInitialActive
                  ? 'bg-[#121316] text-[#FFE600] shadow-[2.5px_3.5px_0_#FFE600] scale-105'
                  : 'bg-white text-stone-700 shadow-[2px_2px_0_#121316] hover:bg-stone-50 hover:scale-102'
              }`}
            >
              <span>{card.number}.</span>
              <span>{card.badge}</span>
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          STACKED CARD DECK STAGE (Natural Continuous Sticky Stacking Flow)
         ===================================================================== */}
      <div className="relative mx-auto max-w-2xl sm:max-w-3xl flex flex-col gap-6 sm:gap-8 pb-4">
        
        {/* Background Decorative Cloud Doodles */}
        <div
          ref={leftCloudRef}
          className="pointer-events-none absolute -left-12 top-20 hidden md:block opacity-75 z-0"
        >
          <svg width="110" height="70" viewBox="0 0 110 70" fill="none">
            <path
              d="M30 60 C 15 60, 5 50, 10 35 C 5 20, 25 10, 40 18 C 50 5, 75 5, 85 18 C 100 12, 110 25, 105 40 C 115 52, 100 60, 90 60 Z"
              fill="#FFFFFF"
              stroke="#121316"
              strokeWidth="2.2"
            />
          </svg>
        </div>

        <div
          ref={rightCloudRef}
          className="pointer-events-none absolute -right-8 bottom-16 hidden md:block opacity-75 z-0"
        >
          <svg width="90" height="60" viewBox="0 0 90 60" fill="none">
            <path
              d="M25 50 C 12 50, 4 42, 8 30 C 4 18, 20 10, 32 16 C 40 6, 62 6, 70 16 C 82 12, 90 22, 86 34 C 94 44, 82 50, 74 50 Z"
              fill="#FFFFFF"
              stroke="#121316"
              strokeWidth="2.2"
            />
          </svg>
        </div>

        {/* The 4 Stacking Cards in Continuous Flow */}
        {DECK_CARDS.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => (cardElementsRef.current[idx] = el)}
            className="w-full sticky will-change-transform"
            style={{
              top: `calc(75px + ${idx * 14}px)`,
              zIndex: idx + 10,
            }}
          >
            {/* Card Container with Isolated Hover Lift */}
            <div
              className={`w-full rounded-3xl sm:rounded-[2rem] border-3 border-[#121316] ${card.cardBg} ${card.textColor} p-4 sm:p-5.5 shadow-[0_8px_0_#121316] sm:shadow-[0_12px_0_#121316] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_0_#121316] flex flex-col justify-between min-w-0 box-border`}
            >
              <div className="min-w-0">
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`rounded-full border-2 border-[#121316] ${card.badgeBg} ${card.badgeTextColor} px-2.5 py-0.5 text-[10.5px] sm:text-xs font-black uppercase tracking-wider shadow-[1.5px_2px_0_#121316]`}
                    >
                      {card.badge}
                    </span>
                    <span className="rounded-full bg-black/15 px-2 py-0.5 text-[10.5px] sm:text-xs font-bold">
                      Module {card.number} of 04
                    </span>
                  </div>

                  {/* Stat Pill */}
                  <div className="shrink-0 rounded-full border border-current/20 bg-black/10 px-2.5 py-0.5 text-right">
                    <span className="text-[11px] sm:text-xs font-extrabold">{card.stat}</span>
                    <span className="ml-1 text-[10px] sm:text-[11px] opacity-75">{card.statLabel}</span>
                  </div>
                </div>

                {/* Main Heading */}
                <h3 className="font-display text-lg sm:text-xl font-black tracking-tight leading-snug mb-0.5">
                  {card.title}
                </h3>
                <p className={`font-sans text-[11px] sm:text-xs font-medium ${card.paraTextColor} mb-2`}>
                  {card.shortDesc}
                </p>

                {/* THE HIGH QUALITY DOODLE WINDOW */}
                <div className="my-1.5 rounded-xl sm:rounded-2xl bg-white/95 p-1.5 sm:p-2 border-2 border-[#121316] shadow-[2.5px_3px_0_#121316]">
                  <card.DoodleComponent />
                </div>

                {/* Small Paragraph Below Doodle Showing Detailed Usecase */}
                <div className="mt-2.5 pt-2 border-t border-current/20">
                  <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider opacity-85">
                      ⚡ {card.useCaseLabel}:
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] font-bold underline decoration-current/40">
                      {card.useCaseExample}
                    </span>
                  </div>

                  <p className={`font-sans text-[11px] sm:text-[11.5px] leading-relaxed font-normal ${card.paraTextColor}`}>
                    {card.useCaseParagraph}
                  </p>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="mt-2.5 pt-2 border-t border-current/20 flex flex-wrap items-center gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-current/30 bg-black/10 px-2 py-0.5 text-[9.5px] sm:text-[10px] font-semibold"
                  >
                    <span className="h-1 w-1 rounded-full bg-current" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation Controls (Arrow Buttons & Dots) */}
      <div className="flex items-center justify-center gap-4 mt-6 z-20">
        <button
          onClick={handlePrev}
          aria-label="Previous Card"
          className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-[#121316] bg-white text-[#121316] shadow-[2px_2.5px_0_#121316] transition-all hover:-translate-y-0.5 hover:bg-stone-50 active:translate-y-0.5"
        >
          <span className="text-sm sm:text-base font-black transition-transform group-hover:-translate-x-0.5">←</span>
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#121316] bg-white shadow-[2px_2px_0_#121316]">
          {DECK_CARDS.map((_, i) => (
            <button
              key={i}
              ref={(el) => (dotElementsRef.current[i] = el)}
              onClick={() => jumpToCard(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === 0 ? 'w-6 bg-[#121316]' : 'w-2.5 bg-stone-300 hover:bg-stone-500'
              }`}
              aria-label={`Jump to module ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Card"
          className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-[#121316] bg-[#FFE600] text-[#121316] shadow-[2px_2.5px_0_#121316] transition-all hover:-translate-y-0.5 hover:bg-[#fed700] active:translate-y-0.5"
        >
          <span className="text-sm sm:text-base font-black transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>

      {/* Bottom Action Card (Launch Live Bridge) */}
      <div className="mt-10 sm:mt-12 rounded-3xl border-2 border-[#121316] bg-[#FFE600] p-6 text-center shadow-[4px_6px_0_#121316] sm:p-8">
        <h4 className="font-display text-xl sm:text-2xl font-black text-[#121316]">
          Experience the Multimodal Bridge in Real Time
        </h4>
        <p className="font-sans text-xs sm:text-sm text-stone-800 mt-1 max-w-lg mx-auto">
          Start a two-way session with live ASL recognition, acoustic subtitle streaming, and facial cue audio.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#121316] bg-[#121316] px-6 py-2.5 text-xs font-bold text-white shadow-[2px_3px_0_#121316] transition hover:bg-stone-800 hover:scale-105"
          >
            <span>Launch Live Bridge Demo</span>
            <span className="text-[#FFE600]">⚡</span>
          </Link>
          <Link
            to="/what-we-offer"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-6 py-2.5 text-xs font-bold text-[#121316] shadow-[2px_2px_0_#121316] transition hover:bg-stone-50"
          >
            <span>All Assistive Modules</span>
            <span className="text-stone-400">↗</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AssistiveDeckSlider;
