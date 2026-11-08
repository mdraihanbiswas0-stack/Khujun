import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../services/soundEffects';

interface FireflyMascotProps {
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg';
  mood?: 'calm' | 'playful' | 'energetic';
  onClick?: () => void;
  showSpeechBubble?: boolean;
}

export const FireflyMascot: React.FC<FireflyMascotProps> = ({
  glowColor = '#a3e635',
  size = 'md',
  mood = 'playful',
  onClick,
  showSpeechBubble = false,
}) => {
  const [isFlappingFast, setIsFlappingFast] = useState(false);
  const [isGlowingBright, setIsGlowingBright] = useState(false);
  const [sparksCount, setSparksCount] = useState(0);
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  // Periodic random flutter & glow
  useEffect(() => {
    const intervalTime = mood === 'energetic' ? 5000 : mood === 'playful' ? 9000 : 15000;
    const timer = setInterval(() => {
      triggerFlutterAnimation();
    }, intervalTime);
    return () => clearInterval(timer);
  }, [mood]);

  const triggerFlutterAnimation = () => {
    setIsFlappingFast(true);
    setIsGlowingBright(true);
    setTimeout(() => {
      setIsFlappingFast(false);
      setIsGlowingBright(false);
    }, 1800);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playFireflyChirp();
    triggerFlutterAnimation();
    setSparksCount((c) => c + 1);

    // Bengali cute firefly reactions
    const greetings = [
      '✨ জোনাকি আলো জ্বলছে!',
      '🌟 আমি আপনার সার্চ সাথী!',
      '💡 কী খুঁজতে চান বলুন?',
      '✨ ডানা ঝাপটানো শেষ!',
      '🚀 চলুন সার্চ করি!',
    ];
    const randomMsg = greetings[Math.floor(Math.random() * greetings.length)];
    setBubbleText(randomMsg);
    setTimeout(() => setBubbleText(null), 2500);

    // Soft confetti sparks
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 16,
      spread: 45,
      startVelocity: 14,
      origin: { x, y },
      colors: [glowColor, '#facc15', '#38bdf8', '#a855f7'],
      disableForReducedMotion: true,
      scalar: 0.7,
    });

    if (onClick) onClick();
  };

  const dimensions = {
    sm: { width: 34, height: 34, viewBox: '0 0 64 64' },
    md: { width: 44, height: 44, viewBox: '0 0 64 64' },
    lg: { width: 68, height: 68, viewBox: '0 0 64 64' },
  }[size];

  return (
    <div className="relative inline-flex items-center justify-center select-none group">
      {/* Speech bubble */}
      <AnimatePresence>
        {(bubbleText || showSpeechBubble) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.8 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900/90 text-lime-300 text-[11px] font-medium shadow-lg backdrop-blur-md border border-lime-500/30 z-30 pointer-events-none"
          >
            {bubbleText || 'জোনাকি পোকা ✨'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bioluminescent Outer Halo / Aura */}
      <motion.div
        animate={{
          scale: isGlowingBright ? [1, 1.45, 1.2] : [1, 1.15, 1],
          opacity: isGlowingBright ? 0.9 : 0.6,
        }}
        transition={{ duration: isGlowingBright ? 0.8 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full pointer-events-none blur-md -z-10"
        style={{
          width: dimensions.width * 1.3,
          height: dimensions.height * 1.3,
          backgroundColor: glowColor,
        }}
      />

      {/* SVG Firefly Character */}
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative cursor-pointer focus:outline-none p-1 rounded-full transition-transform"
        title="জোনাকি পোকা (ক্লিক করে ডানা ঝাপটান ও আলো জ্বালান!)"
        aria-label="Firefly Mascot"
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={dimensions.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Abdomen Bioluminescent Radial Glow */}
            <radialGradient id={`abdomenGlow-${size}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor={glowColor} />
              <stop offset="75%" stopColor="#84cc16" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0.8" />
            </radialGradient>

            {/* Left Wing Colorful Holographic Gradient */}
            <linearGradient id={`wingGradLeft-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.85" />
            </linearGradient>

            {/* Right Wing Colorful Holographic Gradient */}
            <linearGradient id={`wingGradRight-${size}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.85" />
            </linearGradient>

            {/* Body 3D gradient */}
            <linearGradient id={`thoraxGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Bioluminescent Light Rays (Behind Abdomen) */}
          <circle
            cx="32"
            cy="46"
            r={isGlowingBright ? 16 : 11}
            fill={glowColor}
            opacity={isGlowingBright ? '0.75' : '0.4'}
            className="transition-all duration-300 blur-[2px]"
          />

          {/* Abdomen (The glowing lantern / পশ্চাদ্ভাগের উজ্জ্বল বাতি) */}
          <ellipse
            cx="32"
            cy="45"
            rx="10"
            ry="12"
            fill={`url(#abdomenGlow-${size})`}
            className="firefly-glow"
            stroke="#ecfccb"
            strokeWidth="0.8"
          />

          {/* Light segments stripes on abdomen */}
          <path d="M25 43 Q32 46 39 43" stroke="#4d7c0f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <path d="M26 48 Q32 51 38 48" stroke="#4d7c0f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* LEFT WING (কালারফুল পাখা ১) */}
          <g
            className={
              isFlappingFast
                ? 'firefly-wing-left'
                : mood === 'calm'
                ? 'firefly-wings-calm firefly-wing-left'
                : 'firefly-wing-left'
            }
            style={{
              animationDuration: isFlappingFast ? '0.08s' : '0.35s',
            }}
          >
            <path
              d="M30 29 C18 16 8 20 12 36 C14 44 26 38 30 32 Z"
              fill={`url(#wingGradLeft-${size})`}
              stroke="#ffffff"
              strokeWidth="0.8"
              opacity="0.9"
            />
            {/* Wing Vein details */}
            <path d="M14 30 Q22 28 28 31" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.8" />
            <path d="M16 24 Q24 26 29 30" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" />
          </g>

          {/* RIGHT WING (কালারফুল পাখা ২) */}
          <g
            className={
              isFlappingFast
                ? 'firefly-wing-right'
                : mood === 'calm'
                ? 'firefly-wings-calm firefly-wing-right'
                : 'firefly-wing-right'
            }
            style={{
              animationDuration: isFlappingFast ? '0.08s' : '0.35s',
            }}
          >
            <path
              d="M34 29 C46 16 56 20 52 36 C50 44 38 38 34 32 Z"
              fill={`url(#wingGradRight-${size})`}
              stroke="#ffffff"
              strokeWidth="0.8"
              opacity="0.9"
            />
            {/* Wing Vein details */}
            <path d="M50 30 Q42 28 36 31" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.8" />
            <path d="M48 24 Q40 26 35 30" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" />
          </g>

          {/* Thorax (Middle Body) */}
          <ellipse cx="32" cy="30" rx="7" ry="6" fill={`url(#thoraxGrad-${size})`} stroke="#475569" strokeWidth="0.7" />

          {/* Head */}
          <circle cx="32" cy="20" r="6" fill="#1e293b" />

          {/* Cute Big Eyes */}
          <circle cx="29" cy="19" r="2.2" fill="#0284c7" />
          <circle cx="28.4" cy="18.4" r="0.8" fill="#ffffff" />

          <circle cx="35" cy="19" r="2.2" fill="#0284c7" />
          <circle cx="34.4" cy="18.4" r="0.8" fill="#ffffff" />

          {/* Antennae Left with Glowing Tip */}
          <path d="M30 15 Q26 9 20 10" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="20" cy="10" r="1.8" fill={glowColor} className="firefly-glow" />

          {/* Antennae Right with Glowing Tip */}
          <path d="M34 15 Q38 9 44 10" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="44" cy="10" r="1.8" fill={glowColor} className="firefly-glow" />

          {/* Tiny Cute Smile */}
          <path d="M30.5 22 Q32 23.5 33.5 22" stroke="#cbd5e1" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </motion.button>
    </div>
  );
};
