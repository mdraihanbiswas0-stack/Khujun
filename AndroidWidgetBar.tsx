import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Mic,
  Camera,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Clock,
  X,
} from 'lucide-react';
import { WidgetToolConfig, WidgetTheme } from '../types';
import { FireflyMascot } from './FireflyMascot';
import { renderCustomToolIcon } from './CustomToolIcons';
import { soundEffects } from '../services/soundEffects';
import {
  getRecentSearches,
  saveRecentSearch,
  removeRecentSearch,
  clearAllRecentSearches,
} from '../services/recentSearches';

interface AndroidWidgetBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  onOpenVoice: () => void;
  onOpenCamera: (mode?: 'camera' | 'qr') => void;
  onOpenTool: (toolType: string) => void;
  onOpenCustomizer: () => void;
  tools: WidgetToolConfig[];
  theme: WidgetTheme;
  isFocused?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export const AndroidWidgetBar: React.FC<AndroidWidgetBarProps> = ({
  query,
  onQueryChange,
  onSearchSubmit,
  onOpenVoice,
  onOpenCamera,
  onOpenTool,
  onOpenCustomizer,
  tools,
  theme,
  onFocusChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => getRecentSearches());

  // Close recent searches dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (widgetContainerRef.current && !widgetContainerRef.current.contains(e.target as Node)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleFormSubmit = (searchVal: string) => {
    if (searchVal.trim()) {
      const updated = saveRecentSearch(searchVal);
      setRecentSearches(updated);
    }
    setIsInputFocused(false);
    onSearchSubmit(searchVal);
  };

  const handleSelectRecent = (val: string) => {
    soundEffects.playClick();
    onQueryChange(val);
    const updated = saveRecentSearch(val);
    setRecentSearches(updated);
    setIsInputFocused(false);
    onSearchSubmit(val);
  };

  const handleDeleteRecent = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    soundEffects.playClick();
    const updated = removeRecentSearch(val);
    setRecentSearches(updated);
  };

  const handleClearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playClick();
    clearAllRecentSearches();
    setRecentSearches([]);
  };

  const scrollTools = (direction: 'left' | 'right') => {
    soundEffects.playClick();
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const enabledTools = tools
    .filter((t) => t.enabled)
    .sort((a, b) => a.order - b.order);

  const getBorderRadiusClass = () => {
    switch (theme.borderRadius) {
      case 'full':
        return 'rounded-[32px]';
      case '3xl':
        return 'rounded-3xl';
      case '2xl':
        return 'rounded-2xl';
      case 'xl':
        return 'rounded-xl';
      case 'none':
        return 'rounded-none';
      default:
        return 'rounded-[32px]';
    }
  };

  return (
    <div ref={widgetContainerRef} className="w-full max-w-2xl mx-auto transition-all duration-300 relative">
      {/* Main Widget Container */}
      <div
        className={`relative transition-all duration-300 shadow-2xl backdrop-blur-xl ${getBorderRadiusClass()}`}
        style={{
          backgroundColor:
            theme.bgType === 'solid' || theme.bgType === 'amoled'
              ? theme.bgColor
              : `${theme.bgColor}${Math.round((theme.opacity / 100) * 255).toString(16).padStart(2, '0')}`,
          border: `1.5px solid ${theme.borderColor || 'rgba(255,255,255,0.2)'}`,
          boxShadow:
            theme.bgType === 'neon'
              ? `0 10px 30px -10px ${theme.fireflyGlowColor}60, 0 0 15px rgba(255,255,255,0.15)`
              : '0 12px 35px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset',
        }}
      >
        {/* ROW 1: Search Bar (Firefly Mascot on the LEFT of Search Icon, NO third-party logos) */}
        <div className="flex items-center px-3.5 py-2 sm:py-2.5">
          {/* 🌟 1. Firefly Mascot placed on the LEFT side of Search Icon */}
          <div className="shrink-0 mr-1.5 flex items-center justify-center">
            <FireflyMascot
              glowColor={theme.fireflyGlowColor}
              size="md"
              mood={theme.fireflyMood}
            />
          </div>

          {/* 🔍 2. Search Icon (Directly to the right of the Firefly Mascot) */}
          <div
            onClick={() => {
              soundEffects.playClick();
              inputRef.current?.focus();
            }}
            className="flex items-center justify-center cursor-pointer p-1.5 text-lime-400 hover:text-lime-300 transition shrink-0"
            title="সার্চ করুন"
          >
            <Search className="w-5 h-5 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]" />
          </div>

          {/* 📝 3. Search Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(query);
            }}
            className="flex-1 flex items-center min-w-0 mx-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={() => {
                setIsInputFocused(true);
                setRecentSearches(getRecentSearches());
                onFocusChange?.(true);
              }}
              placeholder="মোবাইল ফাইল, কন্টাক্ট, ইউটিউব, কোরআন বা অনলাইনে খুঁজুন..."
              style={{
                color: theme.searchTextColor || '#ffffff',
              }}
              className="w-full bg-transparent text-sm font-medium placeholder-slate-400 focus:outline-none px-1 py-1"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onQueryChange('');
                  inputRef.current?.focus();
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-1.5 py-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                ✕
              </button>
            )}
          </form>

          {/* 🎙️ 4. Action Icon: Voice Mic */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onOpenVoice();
            }}
            className="p-2 rounded-full text-red-500 hover:bg-red-500/10 active:scale-95 transition shrink-0"
            title="ভয়েস সার্চ (মুখে বলে খুঁজুন)"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* 📸 5. Action Icon: Camera Lens (Photo & QR Scan) */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onOpenCamera('camera');
            }}
            className="p-2 rounded-full text-blue-500 hover:bg-blue-500/10 active:scale-95 transition shrink-0"
            title="ক্যামেরা ও কিউআর স্ক্যান সার্চ"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* 🕒 Recent Searches Dropdown (Displays when search bar is focused but query is empty) */}
        {isInputFocused && !query.trim() && recentSearches.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-3xl p-3.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-slate-800 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-lime-400">
                <Clock className="w-3.5 h-3.5" />
                সাম্প্রতিক সার্চসমূহ (Recent Searches)
              </span>
              <button
                type="button"
                onMouseDown={handleClearAllRecent}
                className="text-[11px] text-red-400 hover:text-red-300 hover:underline transition font-normal"
              >
                সব মুছুন
              </button>
            </div>
            <div className="space-y-1">
              {recentSearches.slice(0, 5).map((searchItem, index) => (
                <div
                  key={`${searchItem}-${index}`}
                  onMouseDown={() => handleSelectRecent(searchItem)}
                  className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/80 cursor-pointer transition text-sm text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                    <Clock className="w-4 h-4 text-slate-400 group-hover:text-lime-400 transition shrink-0" />
                    <span className="truncate">{searchItem}</span>
                  </div>
                  <button
                    type="button"
                    onMouseDown={(e) => handleDeleteRecent(e, searchItem)}
                    className="p-1 rounded-full text-slate-500 hover:text-red-400 hover:bg-slate-700/50 transition opacity-70 group-hover:opacity-100 shrink-0 ml-2"
                    title="মুছুন"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROW 2: Horizontal Scrollable Tool Strip (ডান থেকে বামে বা বাম থেকে ডানে স্ক্রোল) */}
        {theme.scale !== '4x1' && (
          <div className="relative border-t border-slate-700/20 dark:border-slate-700/40 px-2 py-2">
            {/* Scroll navigation arrows for desktop/touch */}
            <button
              onClick={() => scrollTools('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-900/80 text-white shadow-md flex items-center justify-center opacity-70 hover:opacity-100 transition hidden sm:flex"
              title="বামে স্ক্রোল করুন"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTools('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-900/80 text-white shadow-md flex items-center justify-center opacity-70 hover:opacity-100 transition hidden sm:flex"
              title="ডানে স্ক্রোল করুন"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scrollable Container with All 15 Configurable Tools (each with its custom colorful icon on top & name small underneath) */}
            <div
              ref={scrollContainerRef}
              className="flex items-start space-x-2.5 overflow-x-auto no-scrollbar scroll-smooth px-2 py-1.5"
            >
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
                  className="group flex flex-col items-center justify-center shrink-0 p-1 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
                  title={tool.name}
                >
                  {/* Distinct Handcrafted Colorful Custom SVG Icon Container */}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md border border-black/5 dark:border-white/10 transition group-hover:shadow-lg"
                    style={{
                      backgroundColor: tool.bgColor,
                    }}
                  >
                    <span className="drop-shadow-sm">
                      {renderCustomToolIcon(tool.actionType, 22)}
                    </span>
                  </div>

                  {/* Tool name written small underneath the icon */}
                  <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-200 tracking-tight text-center truncate max-w-[64px] leading-tight mt-1">
                    {tool.bnName}
                  </span>
                </button>
              ))}

              {/* Quick customize button at the end of the strip */}
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenCustomizer();
                }}
                className="group flex flex-col items-center justify-center shrink-0 p-1 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
                title="টুলস যোগ বা বাদ দিন"
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-400 shadow-sm transition">
                  <Sliders className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-400 tracking-tight text-center truncate max-w-[64px] leading-tight mt-1">
                  কাস্টমাইজ
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
