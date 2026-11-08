import React, { useState } from 'react';
import {
  Mic,
  Camera,
  Search,
  X,
  Maximize2,
  Minimize2,
  Move,
  Sparkles,
  ExternalLink,
  Smartphone,
  Check,
  Download,
  Share2,
} from 'lucide-react';
import { FireflyMascot } from './FireflyMascot';
import { renderCustomToolIcon } from './CustomToolIcons';
import { WidgetToolConfig, WidgetTheme } from '../types';
import { soundEffects } from '../services/soundEffects';

interface FloatingWidgetProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  onOpenVoice: () => void;
  onOpenCamera: (mode?: 'camera' | 'qr') => void;
  onOpenTool: (toolType: string) => void;
  onOpenCustomizer: () => void;
  tools: WidgetToolConfig[];
  theme: WidgetTheme;
  isFloatingOpen: boolean;
  onCloseFloating: () => void;
}

export const FloatingWidgetMode: React.FC<FloatingWidgetProps> = ({
  query,
  onQueryChange,
  onSearchSubmit,
  onOpenVoice,
  onOpenCamera,
  onOpenTool,
  onOpenCustomizer,
  tools,
  theme,
  isFloatingOpen,
  onCloseFloating,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  if (!isFloatingOpen) return null;

  const enabledTools = tools.filter((t) => t.enabled).sort((a, b) => a.order - b.order);

  // If minimized to a floating bubble (like Messenger chat head or Assistive Touch)
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in zoom-in-50 duration-200">
        <div
          onClick={() => {
            soundEffects.playFireflyChirp();
            setIsMinimized(false);
          }}
          className="relative group cursor-pointer p-2 rounded-full bg-slate-900/90 border-2 border-lime-400 shadow-[0_0_25px_rgba(163,230,53,0.7)] backdrop-blur-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          title="উইজেট খুলুন"
        >
          <FireflyMascot glowColor={theme.fireflyGlowColor} size="sm" mood="playful" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[9px] text-white font-bold rounded-full flex items-center justify-center animate-bounce">
            •
          </span>
          {/* Tooltip */}
          <div className="absolute right-full mr-2 px-2.5 py-1 rounded-xl bg-slate-900 text-lime-300 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-lg pointer-events-none border border-lime-500/30">
            ট্যাপ করে উইজেট খুলুন
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Standalone Mobile Widget Container */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg animate-in slide-in-from-bottom-6 duration-300">
        <div
          className="relative rounded-[32px] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl border-2 border-slate-700/80 transition-all"
          style={{
            backgroundColor:
              theme.bgType === 'amoled'
                ? '#000000'
                : `${theme.bgColor}${Math.round((theme.opacity / 100) * 255).toString(16).padStart(2, '0')}`,
            boxShadow: `0 15px 35px -5px ${theme.fireflyGlowColor}40, 0 0 0 1px rgba(255,255,255,0.15) inset`,
          }}
        >
          {/* Top Bar with Floating Controls */}
          <div className="flex items-center justify-between px-3 py-1 mb-1 text-slate-400 border-b border-white/10">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-200">মোবাইল স্ক্রিন ফ্লোটিং উইজেট</span>
            </div>

            <div className="flex items-center space-x-1">
              {/* How to add to mobile screen guide */}
              <button
                onClick={() => setShowInstallGuide(true)}
                className="px-2 py-0.5 rounded-lg bg-lime-500/20 text-lime-300 hover:bg-lime-500/30 text-[10px] font-bold flex items-center transition"
                title="মোবাইলের হোমস্ক্রিনে কীভাবে উইজেট বসাবেন"
              >
                <Smartphone className="w-3 h-3 mr-1" />
                স্ক্রিনে সেট
              </button>

              {/* Minimize to firefly bubble */}
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsMinimized(true);
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                title="মিনিমাইজ করুন (জোনাকি বাবল)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>

              {/* Close floating widget */}
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onCloseFloating();
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                title="বন্ধ করুন"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Search Row: Firefly Mascot on Left, Search icon & input, Mic & Camera */}
          <div className="flex items-center px-2 py-1.5 bg-black/25 rounded-full border border-white/10">
            {/* Firefly Mascot on the left */}
            <div className="shrink-0 mr-1.5">
              <FireflyMascot glowColor={theme.fireflyGlowColor} size="sm" mood="playful" />
            </div>

            {/* Search Icon */}
            <div
              onClick={() => onSearchSubmit(query)}
              className="text-lime-400 p-1 cursor-pointer shrink-0"
              title="সার্চ করুন"
            >
              <Search className="w-4 h-4" />
            </div>

            {/* Input box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmit(query);
              }}
              className="flex-1 min-w-0 mx-1"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="ভয়েস বা লিখে মোবাইলে সার্চ..."
                style={{
                  color: theme.searchTextColor || '#ffffff',
                }}
                className="w-full bg-transparent text-xs font-medium placeholder-slate-400 focus:outline-none"
              />
            </form>

            {/* Voice Mic (ভয়েসের মাধ্যমে সার্চ ও স্পিচ টু টেক্সট) */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onOpenVoice();
              }}
              className="p-1.5 rounded-full text-red-400 hover:bg-red-500/20 active:scale-95 transition shrink-0"
              title="ভয়েসের মাধ্যমে সার্চ করুন"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Camera / QR */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onOpenCamera('camera');
              }}
              className="p-1.5 rounded-full text-blue-400 hover:bg-blue-500/20 active:scale-95 transition shrink-0"
              title="ক্যামেরা ও ছবি দিয়ে সার্চ"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal Scrollable Tool Icons Strip with names small underneath */}
          <div className="flex items-start space-x-2 overflow-x-auto no-scrollbar scroll-smooth px-1.5 pt-2 pb-1">
            {enabledTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  soundEffects.playClick();
                  if (tool.actionType === 'camera') {
                    onOpenCamera('camera');
                  } else if (tool.actionType === 'qr') {
                    onOpenCamera('qr');
                  } else if (tool.actionType === 'voice') {
                    onOpenVoice();
                  } else if (tool.actionType === 'settings') {
                    onOpenCustomizer();
                  } else {
                    onOpenTool(tool.actionType);
                  }
                }}
                className="group flex flex-col items-center justify-center shrink-0 p-0.5 transition hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                title={tool.name}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border border-white/10"
                  style={{ backgroundColor: tool.bgColor }}
                >
                  <span className="drop-shadow-sm">{renderCustomToolIcon(tool.actionType, 20)}</span>
                </div>
                <span className="text-[9px] font-semibold text-slate-200 tracking-tight text-center truncate max-w-[56px] leading-tight mt-1">
                  {tool.bnName}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Install / Add to Android Home Screen Guide Modal */}
      {showInstallGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-lime-400" />
                <h4 className="text-sm font-bold text-white">মোবাইল স্ক্রিনে উইজেট সেট করার নিয়ম</h4>
              </div>
              <button
                onClick={() => setShowInstallGuide(false)}
                className="p-1 text-slate-400 hover:text-white rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-lime-300 block">ধাপ ১: ব্রাউজার অপশন খুলুন</span>
                <p className="text-[11px] text-slate-400">
                  আপনার মোবাইল ক্রোম (Chrome) ব্রাউজারের উপরে ডানদিকের ৩-ডট (⋮) মেনুতে ট্যাপ করুন।
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-lime-300 block">ধাপ ২: হোমস্ক্রিনে যোগ করুন</span>
                <p className="text-[11px] text-slate-400">
                  <strong>&quot;Add to Home screen&quot;</strong> বা <strong>&quot;Install app&quot;</strong> অপশনে ক্লিক করুন।
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-lime-300 block">ধাপ ৩: উইজেট ও কুইক শর্টকাট</span>
                <p className="text-[11px] text-slate-400">
                  এখন আপনার মোবাইল স্ক্রিনে সরাসরি উইজেটের আইকন চলে আসবে, যা দিয়ে অ্যাপে না ঢুকেও হোমস্ক্রিন থেকে ভয়েস ও ফাইল সার্চ করতে পারবেন!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                setShowInstallGuide(false);
              }}
              className="w-full py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition"
            >
              বুঝেছি, ধন্যবাদ
            </button>
          </div>
        </div>
      )}
    </>
  );
};
