import React, { useState } from 'react';
import {
  Wifi,
  Battery,
  Signal,
  Palette,
  Move,
  Shield,
  Layers,
  Plus,
  Check,
  X,
  Sparkles,
  Maximize2,
  Sliders,
} from 'lucide-react';
import { AndroidWidgetBar } from './AndroidWidgetBar';
import { UniversalSearchResults } from './UniversalSearchResults';
import { WidgetToolConfig, WidgetTheme } from '../types';
import { searchEngine } from '../services/searchEngine';
import { soundEffects } from '../services/soundEffects';

interface HomeScreenSimulatorProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  onOpenVoice: () => void;
  onOpenCamera: (mode?: 'camera' | 'qr') => void;
  onOpenTool: (toolType: string) => void;
  onOpenCustomizer: () => void;
  onOpenPermissions: () => void;
  tools: WidgetToolConfig[];
  theme: WidgetTheme;
  onUpdateTheme: (theme: WidgetTheme) => void;
}

export const HomeScreenSimulator: React.FC<HomeScreenSimulatorProps> = ({
  query,
  onQueryChange,
  onSearchSubmit,
  onOpenVoice,
  onOpenCamera,
  onOpenTool,
  onOpenCustomizer,
  onOpenPermissions,
  tools,
  theme,
  onUpdateTheme,
}) => {
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [widgetPosition, setWidgetPosition] = useState<'top' | 'center' | 'bottom'>('top');
  const [showUnsetDrawer, setShowUnsetDrawer] = useState(false);
  const [isWidgetPlaced, setIsWidgetPlaced] = useState(true);
  const [showInPhoneResults, setShowInPhoneResults] = useState(false);

  const wallpapers = [
    {
      name: 'কসমিক অরোরা (Cosmic Aurora)',
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'সাইবার নিয়ন সিটি (Neon Cyber)',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'প্রাকৃতিক জলপ্রপাত (Nature Waterfall)',
      url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'মিনিমাল ডার্ক ওলেড (Minimal OLED)',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const widgetScales: Array<{ id: WidgetTheme['scale']; title: string; subtitle: string }> = [
    { id: '4x2', title: '৪ × ২ স্ট্যান্ডার্ড উইজেট', subtitle: 'সার্চ বার + ১৫টি কালারফুল টুলস স্ট্রিপ' },
    { id: '4x1', title: '৪ × ১ স্লিম সার্চ বার', subtitle: 'জোনাকি পোকা ও সার্চ বার (কম্প্যাক্ট)' },
    { id: '4x3', title: '৪ × ৩ পূর্ণাঙ্গ ড্যাশবোর্ড', subtitle: 'সার্চ বার, টুলস রিবন ও কুইক শর্টকাট' },
    { id: '2x1', title: '২ × ১ মিনি পিল', subtitle: 'ছোট স্ক্রিনের জন্য হ্যান্ডি সার্চ পিল' },
  ];

  const handleApplyUnsetWidget = (scale: WidgetTheme['scale']) => {
    soundEffects.playSearchDing();
    onUpdateTheme({ ...theme, scale });
    setIsWidgetPlaced(true);
    setShowUnsetDrawer(false);
  };

  const handleInPhoneSearch = (q: string) => {
    onQueryChange(q);
    if (q.trim()) {
      setShowInPhoneResults(true);
      soundEffects.playSearchDing();
    } else {
      setShowInPhoneResults(false);
    }
  };

  const searchResults = searchEngine.search(query);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Homescreen Simulator Controls Bar */}
      <div className="w-full max-w-2xl mb-3 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white flex items-center">
            <Layers className="w-4 h-4 text-purple-400 mr-1.5" />
            মোবাইল স্ক্রিন উইজেট সিমুলেটর
          </span>
          <span className="bg-purple-950 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-800/40">
            স্কেল: {theme.scale}
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Unset Widget Drawer Trigger */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setShowUnsetDrawer(true);
            }}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-[11px] font-bold flex items-center shadow transition active:scale-95"
            title="মোবাইলের আনসেট উইজেট ড্রয়ার থেকে উইজেট বেছে নিন"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            আনসেট উইজেট ড্রয়ার
          </button>

          {/* Wallpaper cycle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
            }}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[11px] font-semibold flex items-center transition"
            title="ওয়ালপেপার পরিবর্তন করুন"
          >
            <Palette className="w-3.5 h-3.5 mr-1 text-cyan-400" />
            ওয়ালপেপার
          </button>

          {/* Position cycle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setWidgetPosition((prev) => (prev === 'top' ? 'center' : prev === 'center' ? 'bottom' : 'top'));
            }}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[11px] font-semibold flex items-center transition"
            title="উইজেট স্থান পরিবর্তন"
          >
            <Move className="w-3.5 h-3.5 mr-1 text-amber-400" />
            স্থান: {widgetPosition === 'top' ? 'উপরে' : widgetPosition === 'center' ? 'মাঝে' : 'নিচে'}
          </button>

          {/* Permissions button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenPermissions();
            }}
            className="px-2.5 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 rounded-xl text-[11px] font-semibold flex items-center transition"
          >
            <Shield className="w-3.5 h-3.5 mr-1" />
            পারমিশন
          </button>
        </div>
      </div>

      {/* Simulated Mobile Device Screen Frame */}
      <div className="relative w-full max-w-md rounded-[44px] overflow-hidden border-[8px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] aspect-[9/19] flex flex-col select-none bg-black">
        {/* Wallpaper background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 -z-10"
          style={{ backgroundImage: `url(${wallpapers[wallpaperIndex].url})` }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-brightness-95" />
        </div>

        {/* Android Top Status Bar */}
        <div className="h-7 w-full flex items-center justify-between px-6 pt-1 text-white text-[11px] font-semibold tracking-wide z-10">
          <span>{currentTime}</span>
          {/* Dynamic Island / Front Camera Punch Hole */}
          <div className="w-20 h-4 bg-black rounded-full mx-auto" />
          <div className="flex items-center space-x-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Clock & Date Widget */}
        <div className="pt-5 px-6 text-center text-white drop-shadow-md">
          <div className="text-4xl font-extrabold tracking-tight font-mono">{currentTime}</div>
          <div className="text-xs text-slate-200 font-medium mt-0.5">{currentDate}</div>
        </div>

        {/* Homescreen Body with Scalable Placed Widget */}
        <div
          className={`relative flex-1 px-3.5 py-3 flex flex-col justify-${
            widgetPosition === 'top' ? 'start' : widgetPosition === 'center' ? 'center' : 'end'
          } space-y-4 overflow-hidden`}
        >
          {isWidgetPlaced ? (
            /* The Actual Android Google Style Widget with Firefly Mascot on Left & Tools Strip */
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 relative group">
              <AndroidWidgetBar
                query={query}
                onQueryChange={(q) => {
                  onQueryChange(q);
                  if (q.trim()) setShowInPhoneResults(true);
                }}
                onSearchSubmit={(q) => handleInPhoneSearch(q)}
                onOpenVoice={onOpenVoice}
                onOpenCamera={onOpenCamera}
                onOpenTool={onOpenTool}
                onOpenCustomizer={onOpenCustomizer}
                tools={tools}
                theme={theme}
              />
            </div>
          ) : (
            /* Empty Widget Placeholder if user removed it */
            <div
              onClick={() => setShowUnsetDrawer(true)}
              className="p-6 rounded-3xl border-2 border-dashed border-white/40 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/60 transition"
            >
              <Plus className="w-8 h-8 text-lime-400 mb-2" />
              <p className="text-xs font-bold text-white">আনসেট উইজেট যোগ করুন</p>
              <p className="text-[10px] text-slate-300 mt-1">মোবাইলের আনসেট মেনু থেকে উইজেট বেছে নিন</p>
            </div>
          )}

          {/* In-Phone Search Results Overlay (Displays results directly inside the mobile screen without leaving) */}
          {showInPhoneResults && query.trim() && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl p-3 rounded-3xl overflow-y-auto z-20 flex flex-col animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-lime-400">
                  সরাসরি মোবাইল রেজাল্ট: &quot;{query}&quot;
                </span>
                <button
                  onClick={() => setShowInPhoneResults(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-full bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <UniversalSearchResults
                  results={searchResults}
                  query={query}
                  onClearSearch={() => {
                    onQueryChange('');
                    setShowInPhoneResults(false);
                  }}
                  onSelectQuery={(q) => onQueryChange(q)}
                />
              </div>
            </div>
          )}

          {/* Quick Homescreen App Icons */}
          <div className="mt-auto pb-4">
            <div className="grid grid-cols-4 gap-3 px-2 py-3 bg-black/45 backdrop-blur-md rounded-3xl border border-white/10">
              {[
                { name: 'ফোন কল', icon: '📞', action: () => onOpenTool('contacts'), bg: 'from-emerald-500 to-green-600' },
                { name: 'ওয়েব', icon: '🌐', action: () => onOpenTool('web'), bg: 'from-blue-500 to-cyan-600' },
                { name: 'ফাইলস', icon: '📁', action: () => onOpenTool('files'), bg: 'from-amber-500 to-orange-600' },
                { name: 'ক্যামেরা', icon: '📸', action: () => onOpenCamera('camera'), bg: 'from-purple-500 to-pink-600' },
              ].map((app) => (
                <button
                  key={app.name}
                  onClick={() => {
                    soundEffects.playClick();
                    app.action();
                  }}
                  className="flex flex-col items-center space-y-1 transition hover:scale-105 active:scale-95 group"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${app.bg} flex items-center justify-center text-lg shadow-lg border border-white/20`}
                  >
                    {app.icon}
                  </div>
                  <span className="text-[10px] text-white font-medium drop-shadow-md">{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Android Bottom Navigation Bar Indicator */}
        <div className="h-4 w-full flex items-center justify-center pb-2">
          <div className="w-32 h-1 bg-white/70 rounded-full" />
        </div>

        {/* UNSET WIDGETS DRAWER (Slides up from the bottom of the phone screen) */}
        {showUnsetDrawer && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-30 flex flex-col justify-end p-3 animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-4 space-y-3 max-h-[85%] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">আনসেট উইজেট ড্রয়ার (Unset Widgets)</h4>
                    <p className="text-[10px] text-slate-400">স্কেল পছন্দ করে মোবাইল স্ক্রিনের ওপর বসান</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUnsetDrawer(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {widgetScales.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleApplyUnsetWidget(item.id)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                      theme.scale === item.id
                        ? 'bg-purple-950/70 border-purple-500 text-white shadow-md'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">{item.title}</span>
                        <span className="text-[10px] font-mono bg-slate-800 text-purple-300 px-1.5 py-0.2 rounded-full">
                          {item.id}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.subtitle}</p>
                    </div>
                    <button className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold rounded-xl shadow transition">
                      সেট করুন
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onOpenCustomizer();
                    setShowUnsetDrawer(false);
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center transition"
                >
                  <Sliders className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                  উইজেট কালার ও ব্যাকগ্রাউন্ড পরিবর্তন করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
