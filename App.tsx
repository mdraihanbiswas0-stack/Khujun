import React, { useState, useEffect, useMemo } from 'react';
import {
  Smartphone,
  Search,
  Sliders,
  ShieldCheck,
  Volume2,
  VolumeX,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import { AndroidWidgetBar } from './components/AndroidWidgetBar';
import { UniversalSearchResults } from './components/UniversalSearchResults';
import { CameraModal } from './components/CameraModal';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { WidgetCustomizerModal } from './components/WidgetCustomizerModal';
import { QuickToolsDrawer } from './components/QuickToolsDrawer';
import { PermissionsModal } from './components/PermissionsModal';
import { HomeScreenSimulator } from './components/HomeScreenSimulator';
import { FloatingWidgetMode } from './components/FloatingWidgetMode';

import { WidgetToolConfig, WidgetTheme } from './types';
import { INITIAL_WIDGET_TOOLS, INITIAL_WIDGET_THEME } from './services/mockData';
import { searchEngine, GroupedSearchResults } from './services/searchEngine';
import { soundEffects } from './services/soundEffects';
import { saveRecentSearch } from './services/recentSearches';

export default function App() {
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'hub' | 'homescreen'>('hub');
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Tools & Theme State with LocalStorage persistence
  const [tools, setTools] = useState<WidgetToolConfig[]>(() => {
    try {
      const saved = localStorage.getItem('omnifinder_tools_v1');
      if (saved) {
        const parsed: WidgetToolConfig[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length < INITIAL_WIDGET_TOOLS.length) {
          const existingIds = new Set(parsed.map((t) => t.id));
          const missing = INITIAL_WIDGET_TOOLS.filter((t) => !existingIds.has(t.id));
          const merged = [...parsed, ...missing];
          localStorage.setItem('omnifinder_tools_v1', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      return INITIAL_WIDGET_TOOLS;
    } catch {
      return INITIAL_WIDGET_TOOLS;
    }
  });

  const [theme, setTheme] = useState<WidgetTheme>(() => {
    try {
      const saved = localStorage.getItem('omnifinder_theme_v1');
      return saved ? JSON.parse(saved) : INITIAL_WIDGET_THEME;
    } catch {
      return INITIAL_WIDGET_THEME;
    }
  });

  // Modal states
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState<'camera' | 'qr'>('camera');
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(() => {
    try {
      return !localStorage.getItem('omnifinder_permissions_onboarded_v1');
    } catch {
      return true;
    }
  });
  const [activeQuickTool, setActiveQuickTool] = useState<string | null>(null);
  const [floatingWidgetOpen, setFloatingWidgetOpen] = useState(true);

  // Sync persistence
  useEffect(() => {
    try {
      localStorage.setItem('omnifinder_tools_v1', JSON.stringify(tools));
    } catch {
      // ignore
    }
  }, [tools]);

  useEffect(() => {
    try {
      localStorage.setItem('omnifinder_theme_v1', JSON.stringify(theme));
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleSound = () => {
    const next = !isSoundMuted;
    setIsSoundMuted(next);
    soundEffects.setSoundEnabled(!next);
    if (!next) soundEffects.playClick();
  };

  // Perform search
  const searchResults: GroupedSearchResults = useMemo(() => {
    return searchEngine.search(query);
  }, [query]);

  const handleSearchSubmit = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
    }
    setQuery(searchQuery);
    setViewMode('hub');
    soundEffects.playSearchDing();
  };

  const handleImageSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
    }
    setQuery(searchQuery);
    setViewMode('hub');
    soundEffects.playSearchDing();
  };

  const handleVoiceResult = (text: string) => {
    if (text.trim()) {
      saveRecentSearch(text);
    }
    setQuery(text);
    setViewMode('hub');
    soundEffects.playSearchDing();
  };

  const handleOpenCamera = (mode: 'camera' | 'qr' = 'camera') => {
    setCameraMode(mode);
    setCameraModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo & Bengali Subtitle */}
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-lime-400 via-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-lime-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-lime-400" />
              </div>
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center">
                OmniFinder <span className="ml-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30">স্মার্ট সার্চ</span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">মোবাইলের যেকোনো কিছু ও অনলাইন এক ক্লিকে খুঁজুন</p>
            </div>
          </div>

          {/* Action buttons & View Switcher */}
          <div className="flex items-center space-x-2">
            {/* View Mode Toggle: Hub vs Android Homescreen */}
            <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('hub');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center transition ${
                  viewMode === 'hub'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="সার্চ ইঞ্জিন ও ফলাফল ভিউ"
              >
                <Search className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">সার্চ হাব</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('homescreen');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center transition ${
                  viewMode === 'homescreen'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="মোবাইল হোমস্ক্রিন উইজেট মোড"
              >
                <Smartphone className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">উইজেট মোড</span>
              </button>
            </div>

            {/* Standalone On-Screen Widget Toggle Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setFloatingWidgetOpen(!floatingWidgetOpen);
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center transition border ${
                floatingWidgetOpen
                  ? 'bg-lime-500/20 text-lime-300 border-lime-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="স্ক্রিনের ওপর সরাসরি উইজেট চালু বা বন্ধ করুন"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-lime-400" />
              <span>{floatingWidgetOpen ? 'উইজেট অন' : 'অন-স্ক্রিন'}</span>
            </button>

            {/* Customizer Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setCustomizerModalOpen(true);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 transition"
              title="উইজেট ও টুলস কাস্টমাইজেশন"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Permissions Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setPermissionsModalOpen(true);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition"
              title="ডিভাইস পারমিশন সেন্টার"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Sound Mute Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title={isSoundMuted ? 'সাউন্ড চালু করুন' : 'সাউন্ড মিউট করুন'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {viewMode === 'hub' ? (
          <div className="w-full space-y-6">
            {/* Quick Status Pill */}
            <div className="w-full flex items-center justify-between text-xs px-2 text-slate-400">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
                <span className="text-slate-300 font-medium">ইনডেক্স সক্রিয়: ফাইল, কন্টাক্টস, অ্যাপস, ইউটিউব, কোরআন</span>
              </div>
              <button
                onClick={() => setCustomizerModalOpen(true)}
                className="text-purple-400 hover:underline flex items-center text-[11px]"
              >
                টুলস সাজান ({tools.filter((t) => t.enabled).length} টি সক্রিয়) →
              </button>
            </div>

            {/* Android Google Chrome Style Search Bar Widget with Firefly Mascot & Tool Strip */}
            <div className="w-full">
              <AndroidWidgetBar
                query={query}
                onQueryChange={setQuery}
                onSearchSubmit={handleSearchSubmit}
                onOpenVoice={() => setVoiceModalOpen(true)}
                onOpenCamera={handleOpenCamera}
                onOpenTool={(toolType) => setActiveQuickTool(toolType)}
                onOpenCustomizer={() => setCustomizerModalOpen(true)}
                tools={tools}
                theme={theme}
              />
            </div>

            {/* Step-by-Step Categorized Search Results */}
            <div className="w-full pt-2">
              <UniversalSearchResults
                results={searchResults}
                query={query}
                onClearSearch={() => setQuery('')}
                onSelectQuery={(q) => setQuery(q)}
              />
            </div>
          </div>
        ) : (
          /* Android Homescreen Simulation View */
          <div className="w-full py-2">
            <HomeScreenSimulator
              query={query}
              onQueryChange={setQuery}
              onSearchSubmit={handleSearchSubmit}
              onOpenVoice={() => setVoiceModalOpen(true)}
              onOpenCamera={handleOpenCamera}
              onOpenTool={(toolType) => setActiveQuickTool(toolType)}
              onOpenCustomizer={() => setCustomizerModalOpen(true)}
              onOpenPermissions={() => setPermissionsModalOpen(true)}
              tools={tools}
              theme={theme}
              onUpdateTheme={setTheme}
            />
          </div>
        )}
      </main>

      {/* Modals & Drawers */}
      <CameraModal
        isOpen={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        onSearchWithImage={handleImageSearch}
        defaultMode={cameraMode}
      />

      <VoiceSearchModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onVoiceResult={handleVoiceResult}
      />

      <WidgetCustomizerModal
        isOpen={customizerModalOpen}
        onClose={() => setCustomizerModalOpen(false)}
        tools={tools}
        onUpdateTools={setTools}
        theme={theme}
        onUpdateTheme={setTheme}
      />

      <QuickToolsDrawer
        toolType={activeQuickTool}
        onClose={() => setActiveQuickTool(null)}
        onSearchQuery={(q) => {
          setQuery(q);
          setViewMode('hub');
        }}
      />

      <PermissionsModal
        isOpen={permissionsModalOpen}
        onClose={() => setPermissionsModalOpen(false)}
        isInitialOnboarding={typeof window !== 'undefined' && !localStorage.getItem('omnifinder_permissions_onboarded_v1')}
      />

      {/* Standalone On-Screen Mobile Floating Widget with Voice & Speech-to-Text */}
      <FloatingWidgetMode
        query={query}
        onQueryChange={setQuery}
        onSearchSubmit={handleSearchSubmit}
        onOpenVoice={() => setVoiceModalOpen(true)}
        onOpenCamera={handleOpenCamera}
        onOpenTool={(toolType) => setActiveQuickTool(toolType)}
        onOpenCustomizer={() => setCustomizerModalOpen(true)}
        tools={tools}
        theme={theme}
        isFloatingOpen={floatingWidgetOpen}
        onCloseFloating={() => setFloatingWidgetOpen(false)}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <p>OmniFinder • ইউনিভার্সাল মোবাইল সার্চ ইঞ্জিন ও উজ্জ্বল জোনাকি পোকা উইজেট</p>
      </footer>
    </div>
  );
}
