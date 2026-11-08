import React from 'react';

interface CustomIconProps {
  className?: string;
  size?: number;
}

// 1. Camera Search - Vibrant sapphire & cyan lens
export const CameraToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="5" width="20" height="15" rx="4" fill="url(#camGrad)" stroke="#60a5fa" strokeWidth="1" />
    <path d="M7 5L8.5 2.5H15.5L17 5" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
    <circle cx="12" cy="12.5" r="4.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
    <circle cx="12" cy="12.5" r="2.2" fill="#38bdf8" />
    <circle cx="13.2" cy="11.2" r="0.8" fill="#ffffff" />
    <circle cx="18" cy="8" r="1" fill="#f43f5e" />
    <defs>
      <linearGradient id="camGrad" x1="2" y1="5" x2="22" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563eb" />
        <stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. QR Scanner - Vibrant emerald green QR targeting matrix
export const QrToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#34d399" strokeWidth="1.5" fill="#064e3b" />
    <rect x="5" y="5" width="3" height="3" fill="#10b981" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#34d399" strokeWidth="1.5" fill="#064e3b" />
    <rect x="16" y="5" width="3" height="3" fill="#10b981" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#34d399" strokeWidth="1.5" fill="#064e3b" />
    <rect x="5" y="16" width="3" height="3" fill="#10b981" />
    <path d="M14 14H16V16H14V14Z" fill="#34d399" />
    <path d="M18 14H21V17H18V14Z" fill="#10b981" />
    <path d="M14 18H17V21H14V18Z" fill="#059669" />
    <path d="M19 19H21V21H19V19Z" fill="#6ee7b7" />
  </svg>
);

// 3. Voice Search - Glowing ruby red microphone
export const VoiceToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="8.5" y="2.5" width="7" height="11" rx="3.5" fill="url(#micGrad)" stroke="#f87171" strokeWidth="1" />
    <path d="M5 10C5 13.866 8.134 17 12 17C15.866 17 19 13.866 19 10" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12" y2="21.5" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="8.5" y1="21.5" x2="15.5" y2="21.5" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
    <defs>
      <linearGradient id="micGrad" x1="8.5" y1="2.5" x2="15.5" y2="13.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ef4444" />
        <stop offset="1" stopColor="#991b1b" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Contacts - Royal amethyst purple user avatar
export const ContactsToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="7" r="4.5" fill="url(#contactGrad)" stroke="#c084fc" strokeWidth="1" />
    <path d="M4 19C4 15.5 7.5 13.5 12 13.5C16.5 13.5 20 15.5 20 19V21H4V19Z" fill="url(#contactGrad2)" stroke="#c084fc" strokeWidth="1" />
    <circle cx="18" cy="17" r="3" fill="#10b981" />
    <path d="M16.8 17L17.6 17.8L19.2 16.2" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
    <defs>
      <linearGradient id="contactGrad" x1="7.5" y1="2.5" x2="16.5" y2="11.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a855f7" />
        <stop offset="1" stopColor="#7e22ce" />
      </linearGradient>
      <linearGradient id="contactGrad2" x1="4" y1="13.5" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9333ea" />
        <stop offset="1" stopColor="#581c87" />
      </linearGradient>
    </defs>
  </svg>
);

// 5. Files & Storage - Amber gold folder
export const FilesToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6.5H20C21.1046 6.5 22 7.39543 22 8.5V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" fill="url(#folderGrad)" stroke="#fbbf24" strokeWidth="1" />
    <path d="M2 9.5H22V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V9.5Z" fill="#d97706" opacity="0.6" />
    <circle cx="18" cy="15" r="1.5" fill="#fef08a" />
    <defs>
      <linearGradient id="folderGrad" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b" />
        <stop offset="1" stopColor="#b45309" />
      </linearGradient>
    </defs>
  </svg>
);

// 6. Gallery - Magenta & pink polaroid
export const GalleryToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3.5" fill="url(#galGrad)" stroke="#f472b6" strokeWidth="1" />
    <circle cx="8" cy="8" r="2" fill="#fef08a" />
    <path d="M4 17L9 12L13 16L16 13L20 17V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V17Z" fill="#831843" />
    <path d="M9 12L13 16L16 13L20 17H4L9 12Z" fill="#ec4899" opacity="0.8" />
    <defs>
      <linearGradient id="galGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ec4899" />
        <stop offset="1" stopColor="#be185d" />
      </linearGradient>
    </defs>
  </svg>
);

// 7. Music Player - Electric cyan headphones
export const MusicToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 13C3 8.02944 7.02944 4 12 4C16.9706 4 21 8.02944 21 13" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
    <rect x="2" y="12" width="4" height="8" rx="2" fill="url(#musicGrad)" stroke="#67e8f9" strokeWidth="1" />
    <rect x="18" y="12" width="4" height="8" rx="2" fill="url(#musicGrad)" stroke="#67e8f9" strokeWidth="1" />
    <path d="M10 13V17" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 11V19" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 14V16" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="musicGrad" x1="2" y1="12" x2="6" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#0891b2" />
      </linearGradient>
    </defs>
  </svg>
);

// 8. All Apps - Indigo 9-dot launcher matrix
export const AppsToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="5" height="5" rx="1.5" fill="#6366f1" stroke="#818cf8" strokeWidth="0.8" />
    <rect x="10" y="3" width="5" height="5" rx="1.5" fill="#4f46e5" stroke="#818cf8" strokeWidth="0.8" />
    <rect x="17" y="3" width="5" height="5" rx="1.5" fill="#6366f1" stroke="#818cf8" strokeWidth="0.8" />
    <rect x="3" y="10" width="5" height="5" rx="1.5" fill="#4f46e5" stroke="#818cf8" strokeWidth="0.8" />
    <rect x="10" y="10" width="5" height="5" rx="1.5" fill="#818cf8" stroke="#ffffff" strokeWidth="1" />
    <rect x="17" y="10" width="5" height="5" rx="1.5" fill="#4f46e5" stroke="#818cf8" strokeWidth="0.8" />
    <rect x="3" y="17" width="5" height="5" rx="1.5" fill="#6366f1" stroke="#818cf8" strokeWidth="0.8" />
    <rect x="10" y="17" width="5" height="5" rx="1.5" fill="#4f46e5" stroke="#818cf8" strokeWidth="0.8" />
    <rect x="17" y="17" width="5" height="5" rx="1.5" fill="#6366f1" stroke="#818cf8" strokeWidth="0.8" />
  </svg>
);

// 9. Al-Quran - Emerald & gold sacred book
export const QuranToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="3" width="16" height="18" rx="2" fill="url(#quranGrad)" stroke="#34d399" strokeWidth="1" />
    <path d="M4 17C6 17 9 18 12 18C15 18 18 17 20 17" stroke="#fbbf24" strokeWidth="1.2" />
    <circle cx="12" cy="10" r="3.2" fill="#047857" stroke="#fbbf24" strokeWidth="1" />
    <path d="M12.5 8.5C11.5 9 11.2 10.2 11.8 11.2C12.4 12.2 13.6 12.5 14.5 12" stroke="#fde68a" strokeWidth="0.8" strokeLinecap="round" />
    <circle cx="12" cy="10" r="0.8" fill="#fbbf24" />
    <defs>
      <linearGradient id="quranGrad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#064e3b" />
      </linearGradient>
    </defs>
  </svg>
);

// 10. YouTube - Crimson 3D play button
export const YoutubeToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="5" fill="url(#ytGrad)" stroke="#f87171" strokeWidth="1" />
    <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="#ffffff" />
    <defs>
      <linearGradient id="ytGrad" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ef4444" />
        <stop offset="1" stopColor="#b91c1c" />
      </linearGradient>
    </defs>
  </svg>
);

// 11. Web Browser - Ocean blue globe
export const WebToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9.5" fill="url(#webGrad)" stroke="#60a5fa" strokeWidth="1.2" />
    <ellipse cx="12" cy="12" rx="4.5" ry="9.5" stroke="#93c5fd" strokeWidth="1" />
    <line x1="2.5" y1="12" x2="21.5" y2="12" stroke="#93c5fd" strokeWidth="1" />
    <path d="M4.5 7.5H19.5" stroke="#93c5fd" strokeWidth="0.8" />
    <path d="M4.5 16.5H19.5" stroke="#93c5fd" strokeWidth="0.8" />
    <defs>
      <linearGradient id="webGrad" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563eb" />
        <stop offset="1" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
  </svg>
);

// 12. Calculator - Sunset orange math board
export const CalculatorToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="2.5" width="16" height="19" rx="3.5" fill="url(#calcGrad)" stroke="#fbbf24" strokeWidth="1" />
    <rect x="6.5" y="5" width="11" height="4" rx="1" fill="#451a03" stroke="#d97706" strokeWidth="0.8" />
    <circle cx="8" cy="12" r="1.2" fill="#ffffff" />
    <circle cx="12" cy="12" r="1.2" fill="#ffffff" />
    <circle cx="16" cy="12" r="1.2" fill="#ffffff" />
    <circle cx="8" cy="15.5" r="1.2" fill="#ffffff" />
    <circle cx="12" cy="15.5" r="1.2" fill="#ffffff" />
    <circle cx="16" cy="15.5" r="1.2" fill="#ffffff" />
    <circle cx="8" cy="18.5" r="1.2" fill="#ffffff" />
    <circle cx="12" cy="18.5" r="1.2" fill="#ffffff" />
    <rect x="14.5" y="17.5" width="3" height="2" rx="0.5" fill="#facc15" />
    <defs>
      <linearGradient id="calcGrad" x1="4" y1="2.5" x2="20" y2="21.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b" />
        <stop offset="1" stopColor="#b45309" />
      </linearGradient>
    </defs>
  </svg>
);

// 13. Flashlight - Radiant gold beam
export const FlashlightToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 2H17L15 8H9L7 2Z" fill="#facc15" stroke="#fef08a" strokeWidth="1" />
    <rect x="8.5" y="8" width="7" height="13" rx="2" fill="url(#flashGrad)" stroke="#facc15" strokeWidth="1" />
    <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
    <path d="M12 2V0" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 3L5 1" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 3L19 1" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="flashGrad" x1="8.5" y1="8" x2="15.5" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#eab308" />
        <stop offset="1" stopColor="#a16207" />
      </linearGradient>
    </defs>
  </svg>
);

// 14. Quick Notes - Mint teal pad
export const NotesToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="3" width="16" height="18" rx="2.5" fill="url(#noteGrad)" stroke="#2dd4bf" strokeWidth="1" />
    <line x1="7.5" y1="8" x2="16.5" y2="8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#ccfbf1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="7.5" y1="16" x2="13.5" y2="16" stroke="#ccfbf1" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="17" cy="16.5" r="1.5" fill="#facc15" />
    <defs>
      <linearGradient id="noteGrad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#14b8a6" />
        <stop offset="1" stopColor="#0f766e" />
      </linearGradient>
    </defs>
  </svg>
);

// 15. Widget Customizer - Rainbow aurora palette & sliders
export const CustomizerToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9.5" fill="url(#custGrad)" stroke="#c084fc" strokeWidth="1" />
    <line x1="7" y1="8" x2="17" y2="8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="8" r="2" fill="#f43f5e" />
    <line x1="7" y1="12" x2="17" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="12" r="2" fill="#38bdf8" />
    <line x1="7" y1="16" x2="17" y2="16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="16" r="2" fill="#a3e635" />
    <defs>
      <linearGradient id="custGrad" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#6d28d9" />
      </linearGradient>
    </defs>
  </svg>
);

// 16. Compass & Qibla - Oceanic blue 3D compass with red magnetic needle
export const CompassToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9.5" fill="url(#compGrad)" stroke="#38bdf8" strokeWidth="1.2" />
    <circle cx="12" cy="12" r="7.5" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="2 2" />
    <path d="M12 4.5L14.2 10.8L12 12L9.8 10.8L12 4.5Z" fill="#ef4444" stroke="#fca5a5" strokeWidth="0.5" />
    <path d="M12 19.5L9.8 13.2L12 12L14.2 13.2L12 19.5Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
    <circle cx="12" cy="12" r="1.5" fill="#facc15" />
    <defs>
      <linearGradient id="compGrad" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0284c7" />
        <stop offset="1" stopColor="#0c4a6e" />
      </linearGradient>
    </defs>
  </svg>
);

// 17. Speed Test - Emerald speed gauge with speedometer needle
export const SpeedTestToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 16C4 11.5817 7.58172 8 12 8C16.4183 8 20 11.5817 20 16" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M6.5 14C6.5 10.9624 8.96243 8.5 12 8.5C15.0376 8.5 17.5 10.9624 17.5 14" stroke="#059669" strokeWidth="1" strokeDasharray="1 2" />
    <line x1="12" y1="16" x2="16" y2="10.5" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16" r="2.5" fill="#10b981" />
    <circle cx="12" cy="16" r="1" fill="#ffffff" />
  </svg>
);

// 18. Battery Saver - Lime green battery cell with charging lightning
export const BatteryToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6" width="16" height="12" rx="3" fill="url(#batGrad)" stroke="#4ade80" strokeWidth="1.2" />
    <path d="M20 9.5C20.6 9.5 21 10.2 21 11V13C21 13.8 20.6 14.5 20 14.5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 7.5L8.5 12.5H12L10.5 16.5L14.5 11.5H11L12 7.5Z" fill="#facc15" stroke="#ffffff" strokeWidth="0.5" />
    <defs>
      <linearGradient id="batGrad" x1="3" y1="6" x2="19" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#16a34a" />
        <stop offset="1" stopColor="#14532d" />
      </linearGradient>
    </defs>
  </svg>
);

// 19. Voice Recorder - Studio mic with live waveform
export const RecorderToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="8" y="3" width="8" height="11" rx="4" fill="url(#recGrad)" stroke="#f87171" strokeWidth="1" />
    <path d="M5 10C5 13.866 8.134 17 12 17C15.866 17 19 13.866 19 10" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12" y2="21" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="18" cy="5" r="2" fill="#ef4444" />
    <circle cx="18" cy="5" r="0.8" fill="#ffffff" />
    <defs>
      <linearGradient id="recGrad" x1="8" y1="3" x2="16" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#dc2626" />
        <stop offset="1" stopColor="#7f1d1d" />
      </linearGradient>
    </defs>
  </svg>
);

// 20. Document Scanner & OCR - Document sheet with laser scan
export const ScannerToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 4C5 2.89543 5.89543 2 7 2H14L19 7V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V4Z" fill="url(#scanDocGrad)" stroke="#818cf8" strokeWidth="1" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.5" fill="#facc15" />
    <defs>
      <linearGradient id="scanDocGrad" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4f46e5" />
        <stop offset="1" stopColor="#312e81" />
      </linearGradient>
    </defs>
  </svg>
);

// 21. Timer & Clock - Orange stopwatch with lap pusher
export const AlarmToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="13" r="8" fill="url(#alarmGrad)" stroke="#fb923c" strokeWidth="1.2" />
    <path d="M12 2V5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 2H14" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 6L20 4" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="13" x2="15.5" y2="10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="13" r="1.2" fill="#facc15" />
    <defs>
      <linearGradient id="alarmGrad" x1="4" y1="5" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ea580c" />
        <stop offset="1" stopColor="#9a3412" />
      </linearGradient>
    </defs>
  </svg>
);

// 22. Live Weather - Radiant sun behind cloud with rain
export const WeatherToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="15.5" cy="7.5" r="4" fill="#facc15" />
    <path d="M7 17C4.79 17 3 15.21 3 13C3 10.96 4.54 9.29 6.53 9.04C7.29 6.7 9.47 5 12 5C15.04 5 17.5 7.46 17.5 10.5C18.96 10.74 20 12 20 13.5C20 15.43 18.43 17 16.5 17H7Z" fill="url(#weaGrad)" stroke="#93c5fd" strokeWidth="1" />
    <line x1="7.5" y1="19" x2="6.5" y2="22" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12.5" y1="19" x2="11.5" y2="22" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16.5" y1="19" x2="15.5" y2="22" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="weaGrad" x1="3" y1="5" x2="20" y2="17" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
    </defs>
  </svg>
);

// 23. GPS Maps - Pin location marker on 3D map
export const MapsToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" fill="#1e293b" stroke="#f472b6" strokeWidth="1" />
    <path d="M12 5C9.8 5 8 6.8 8 9C8 12.5 12 17 12 17C12 17 16 12.5 16 9C16 6.8 14.2 5 12 5Z" fill="#ec4899" stroke="#fdf2f8" strokeWidth="0.8" />
    <circle cx="12" cy="9" r="1.5" fill="#ffffff" />
  </svg>
);

// 24. Haptic Vibration - Smartphone with tactile feedback ripples
export const VibrationToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="7" y="3" width="10" height="18" rx="2.5" fill="url(#vibGrad)" stroke="#c084fc" strokeWidth="1.2" />
    <line x1="10" y1="5" x2="14" y2="5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1" fill="#e2e8f0" />
    <path d="M3 8C2.3 9.2 2 10.6 2 12C2 13.4 2.3 14.8 3 16" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21 8C21.7 9.2 22 10.6 22 12C22 13.4 21.7 14.8 21 16" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="vibGrad" x1="7" y1="3" x2="17" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7e22ce" />
        <stop offset="1" stopColor="#4c1d95" />
      </linearGradient>
    </defs>
  </svg>
);

// 25. Screen Wake Lock - Radiant sun with lock symbol
export const ScreenWakeToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="3" width="14" height="18" rx="3" fill="url(#wakeGrad)" stroke="#facc15" strokeWidth="1.2" />
    <circle cx="12" cy="11" r="3.5" fill="#facc15" />
    <path d="M10 16H14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="wakeGrad" x1="5" y1="3" x2="19" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ca8a04" />
        <stop offset="1" stopColor="#713f12" />
      </linearGradient>
    </defs>
  </svg>
);

// 26. Clipboard History - Teal memo clipboard with paste checklist
export const ClipboardToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="4" width="14" height="17" rx="2.5" fill="url(#clipGrad)" stroke="#2dd4bf" strokeWidth="1" />
    <rect x="9" y="2" width="6" height="3" rx="1" fill="#0d9488" stroke="#5eead4" strokeWidth="1" />
    <line x1="8" y1="9" x2="16" y2="9" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="8" y1="13" x2="14" y2="13" stroke="#ccfbf1" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="8" y1="17" x2="12" y2="17" stroke="#ccfbf1" strokeWidth="1.2" strokeLinecap="round" />
    <defs>
      <linearGradient id="clipGrad" x1="5" y1="4" x2="19" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0f766e" />
        <stop offset="1" stopColor="#115e59" />
      </linearGradient>
    </defs>
  </svg>
);

// 27. Smart Share - Connected network branch
export const ShareToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="18" cy="5" r="3" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1" />
    <circle cx="6" cy="12" r="3" fill="#2563eb" stroke="#93c5fd" strokeWidth="1" />
    <circle cx="18" cy="19" r="3" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1" />
    <line x1="8.6" y1="10.7" x2="15.4" y2="6.3" stroke="#60a5fa" strokeWidth="1.8" />
    <line x1="8.6" y1="13.3" x2="15.4" y2="17.7" stroke="#60a5fa" strokeWidth="1.8" />
  </svg>
);

// 28. Magnifier Zoom - High-zoom camera lens
export const MagnifierToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="10.5" cy="10.5" r="7.5" fill="url(#magGrad)" stroke="#c084fc" strokeWidth="1.5" />
    <line x1="16" y1="16" x2="21.5" y2="21.5" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10.5" y1="6" x2="10.5" y2="15" stroke="#e9d5ff" strokeWidth="1" strokeLinecap="round" />
    <line x1="6" y1="10.5" x2="15" y2="10.5" stroke="#e9d5ff" strokeWidth="1" strokeLinecap="round" />
    <defs>
      <linearGradient id="magGrad" x1="3" y1="3" x2="18" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9333ea" />
        <stop offset="1" stopColor="#581c87" />
      </linearGradient>
    </defs>
  </svg>
);

// 29. Selfie Mirror - Rose gold handheld mirror
export const MirrorToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="9.5" rx="7" ry="8" fill="url(#mirGrad)" stroke="#fb7185" strokeWidth="1.2" />
    <ellipse cx="12" cy="9.5" rx="5" ry="6" fill="#ffe4e6" opacity="0.3" />
    <path d="M12 17.5V22" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="14" cy="7.5" r="1" fill="#ffffff" />
    <defs>
      <linearGradient id="mirGrad" x1="5" y1="1.5" x2="19" y2="17.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e11d48" />
        <stop offset="1" stopColor="#881337" />
      </linearGradient>
    </defs>
  </svg>
);

// 30. PDF Document Viewer - Crimson PDF badge
export const PdfReaderToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4C4 2.89 4.89 2 6 2H14L20 8V20C20 21.1 19.1 22 18 22H6C4.89 22 4 21.1 4 20V4Z" fill="url(#pdfGrad)" stroke="#f87171" strokeWidth="1" />
    <rect x="6.5" y="11" width="11" height="5" rx="1.5" fill="#ffffff" />
    <text x="12" y="14.8" fill="#dc2626" fontSize="4.2" fontWeight="bold" textAnchor="middle">PDF</text>
    <defs>
      <linearGradient id="pdfGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#b91c1c" />
        <stop offset="1" stopColor="#7f1d1d" />
      </linearGradient>
    </defs>
  </svg>
);

// 31. Unit Converter - Dual balance weights with conversion loop
export const UnitConvertToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="12" y1="3" x2="12" y2="21" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="4" y1="6" x2="20" y2="6" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 6L2 12H8L6 6" fill="#047857" stroke="#6ee7b7" strokeWidth="1" />
    <path d="M20 6L18 12H24L22 6" fill="#047857" stroke="#6ee7b7" strokeWidth="1" />
    <circle cx="12" cy="6" r="1.5" fill="#facc15" />
    <line x1="8" y1="21" x2="16" y2="21" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 32. RAM Booster - High-speed CPU rocket chip
export const RamCleanerToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="5" width="14" height="14" rx="2.5" fill="url(#ramGrad)" stroke="#22d3ee" strokeWidth="1.2" />
    <path d="M12 7L14.5 12L12 17L9.5 12L12 7Z" fill="#38bdf8" />
    <circle cx="12" cy="12" r="1.5" fill="#facc15" />
    <line x1="9" y1="2" x2="9" y2="5" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
    <line x1="15" y1="2" x2="15" y2="5" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
    <line x1="9" y1="19" x2="9" y2="22" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
    <line x1="15" y1="19" x2="15" y2="22" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
    <defs>
      <linearGradient id="ramGrad" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0891b2" />
        <stop offset="1" stopColor="#164e63" />
      </linearGradient>
    </defs>
  </svg>
);

// 33. Sound Meter - Live decibel audio wave meter
export const SoundMeterToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3.5" fill="url(#soundGrad)" stroke="#fbbf24" strokeWidth="1" />
    <line x1="6" y1="16" x2="6" y2="11" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="10" y1="16" x2="10" y2="7" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="14" y1="16" x2="14" y2="9" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="18" y1="16" x2="18" y2="13" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" />
    <defs>
      <linearGradient id="soundGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#b45309" />
        <stop offset="1" stopColor="#78350f" />
      </linearGradient>
    </defs>
  </svg>
);

// 34. Digital Tasbeeh - Islamic emerald beads with crescent
export const TasbeehToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="8" stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="12" cy="4" r="1.5" fill="#facc15" />
    <circle cx="17.6" cy="6.4" r="1.5" fill="#10b981" />
    <circle cx="20" cy="12" r="1.5" fill="#10b981" />
    <circle cx="17.6" cy="17.6" r="1.5" fill="#10b981" />
    <circle cx="12" cy="20" r="1.5" fill="#10b981" />
    <circle cx="6.4" cy="17.6" r="1.5" fill="#10b981" />
    <circle cx="4" cy="12" r="1.5" fill="#10b981" />
    <circle cx="6.4" cy="6.4" r="1.5" fill="#10b981" />
    <path d="M12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C12.5 15 13 14.8 13.4 14.6C12.3 14.4 11.5 13.3 11.5 12C11.5 10.7 12.3 9.6 13.4 9.4C13 9.2 12.5 9 12 9Z" fill="#fde68a" />
  </svg>
);

// 35. Emergency SOS - Flashing warning beacon
export const EmergencyToolIcon: React.FC<CustomIconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2.5L22 20.5H2L12 2.5Z" fill="url(#sosGrad)" stroke="#f87171" strokeWidth="1.2" />
    <line x1="12" y1="9" x2="12" y2="14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.2" fill="#ffffff" />
    <defs>
      <linearGradient id="sosGrad" x1="2" y1="2.5" x2="22" y2="20.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ef4444" />
        <stop offset="1" stopColor="#991b1b" />
      </linearGradient>
    </defs>
  </svg>
);

export const renderCustomToolIcon = (actionType: string, size = 20, className = '') => {
  switch (actionType) {
    case 'camera':
      return <CameraToolIcon size={size} className={className} />;
    case 'qr':
      return <QrToolIcon size={size} className={className} />;
    case 'voice':
      return <VoiceToolIcon size={size} className={className} />;
    case 'contacts':
      return <ContactsToolIcon size={size} className={className} />;
    case 'files':
      return <FilesToolIcon size={size} className={className} />;
    case 'gallery':
      return <GalleryToolIcon size={size} className={className} />;
    case 'music':
      return <MusicToolIcon size={size} className={className} />;
    case 'apps':
      return <AppsToolIcon size={size} className={className} />;
    case 'quran':
      return <QuranToolIcon size={size} className={className} />;
    case 'youtube':
      return <YoutubeToolIcon size={size} className={className} />;
    case 'web':
      return <WebToolIcon size={size} className={className} />;
    case 'calculator':
      return <CalculatorToolIcon size={size} className={className} />;
    case 'torch':
      return <FlashlightToolIcon size={size} className={className} />;
    case 'notes':
      return <NotesToolIcon size={size} className={className} />;
    case 'compass':
      return <CompassToolIcon size={size} className={className} />;
    case 'speedtest':
      return <SpeedTestToolIcon size={size} className={className} />;
    case 'battery':
      return <BatteryToolIcon size={size} className={className} />;
    case 'recorder':
      return <RecorderToolIcon size={size} className={className} />;
    case 'scanner':
      return <ScannerToolIcon size={size} className={className} />;
    case 'alarm':
      return <AlarmToolIcon size={size} className={className} />;
    case 'weather':
      return <WeatherToolIcon size={size} className={className} />;
    case 'maps':
      return <MapsToolIcon size={size} className={className} />;
    case 'vibration':
      return <VibrationToolIcon size={size} className={className} />;
    case 'screencast':
      return <ScreenWakeToolIcon size={size} className={className} />;
    case 'clipboard':
      return <ClipboardToolIcon size={size} className={className} />;
    case 'share':
      return <ShareToolIcon size={size} className={className} />;
    case 'magnifier':
      return <MagnifierToolIcon size={size} className={className} />;
    case 'mirror':
      return <MirrorToolIcon size={size} className={className} />;
    case 'pdfreader':
      return <PdfReaderToolIcon size={size} className={className} />;
    case 'unitconvert':
      return <UnitConvertToolIcon size={size} className={className} />;
    case 'ramcleaner':
      return <RamCleanerToolIcon size={size} className={className} />;
    case 'soundmeter':
      return <SoundMeterToolIcon size={size} className={className} />;
    case 'tasbeeh':
      return <TasbeehToolIcon size={size} className={className} />;
    case 'emergency':
      return <EmergencyToolIcon size={size} className={className} />;
    case 'settings':
    default:
      return <CustomizerToolIcon size={size} className={className} />;
  }
};
