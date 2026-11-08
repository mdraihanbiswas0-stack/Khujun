import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
  Palette,
  Maximize2,
  Layers,
  Eye,
  EyeOff,
} from 'lucide-react';
import { WidgetToolConfig, WidgetTheme } from '../types';
import { INITIAL_WIDGET_TOOLS, INITIAL_WIDGET_THEME } from '../services/mockData';
import { renderCustomToolIcon } from './CustomToolIcons';
import { soundEffects } from '../services/soundEffects';

interface WidgetCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tools: WidgetToolConfig[];
  onUpdateTools: (tools: WidgetToolConfig[]) => void;
  theme: WidgetTheme;
  onUpdateTheme: (theme: WidgetTheme) => void;
}

export const WidgetCustomizerModal: React.FC<WidgetCustomizerModalProps> = ({
  isOpen,
  onClose,
  tools,
  onUpdateTools,
  theme,
  onUpdateTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'tools' | 'scale'>('tools');
  const [editingToolId, setEditingToolId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Toggle tool enabled
  const handleToggleTool = (id: string) => {
    soundEffects.playClick();
    const updated = tools.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t));
    onUpdateTools(updated);
  };

  // Update specific tool colors
  const handleToolColorChange = (id: string, iconColor: string, bgColor: string) => {
    soundEffects.playClick();
    const updated = tools.map((t) => (t.id === id ? { ...t, iconColor, bgColor } : t));
    onUpdateTools(updated);
  };

  // Theme presets
  const themePresets: Array<{ name: string; bgType: WidgetTheme['bgType']; bgColor: string; borderColor: string; fireflyGlow: string }> = [
    { name: 'গ্লাস ফ্রস্টেড (সাদা)', bgType: 'glass', bgColor: '#ffffff', borderColor: 'rgba(255,255,255,0.4)', fireflyGlow: '#a3e635' },
    { name: 'ডার্ক ওলেড (অ্যামোলেড)', bgType: 'amoled', bgColor: '#090d16', borderColor: 'rgba(51,65,85,0.7)', fireflyGlow: '#4ade80' },
    { name: 'নিয়ন সাইবার গ্লো', bgType: 'neon', bgColor: '#0a0a1f', borderColor: 'rgba(168,85,247,0.5)', fireflyGlow: '#f43f5e' },
    { name: 'রয়েল ব্লু গ্রেডিয়েন্ট', bgType: 'gradient', bgColor: '#1e3a8a', borderColor: 'rgba(96,165,250,0.4)', fireflyGlow: '#38bdf8' },
    { name: 'গোল্ডেন সানসেট', bgType: 'solid', bgColor: '#451a03', borderColor: 'rgba(245,158,11,0.5)', fireflyGlow: '#facc15' },
  ];

  const colorSwatches = [
    '#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6',
    '#ec4899', '#06b6d4', '#14b8a6', '#f43f5e', '#ffffff', '#0f172a'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-800/90 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">উইজেট ও টুলস স্টুডিও কাস্টমাইজেশন</h3>
              <p className="text-xs text-slate-400">টুলস যোগ/বাদ দিন, ব্যাকগ্রাউন্ড ও কালার পরিবর্তন করুন</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-950/60 p-1 border-b border-slate-800">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('tools');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center transition ${
              activeTab === 'tools' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 mr-1.5" />
            টুলস ম্যানেজমেন্ট ({tools.filter((t) => t.enabled).length}/{tools.length})
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('theme');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center transition ${
              activeTab === 'theme' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5 mr-1.5" />
            উইজেট ব্যাকগ্রাউন্ড ও কালার
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('scale');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center transition ${
              activeTab === 'scale' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
            উইজেট স্কেল ও সাইজ
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: TOOLS MANAGEMENT */}
          {activeTab === 'tools' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                <span>সার্চ বারের ভেতরে অনুভূমিকভাবে স্ক্রোল করা মোট ১৫টি কার্যকরী টুলস:</span>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onUpdateTools(INITIAL_WIDGET_TOOLS);
                  }}
                  className="text-purple-400 hover:underline flex items-center font-semibold"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> রিসেট
                </button>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className={`p-3 rounded-2xl border transition ${
                      tool.enabled
                        ? 'bg-slate-950/70 border-slate-700/80'
                        : 'bg-slate-950/30 border-slate-800/40 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Custom Handcrafted Colorful Tool Icon Preview */}
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shrink-0 border border-white/10"
                          style={{ backgroundColor: tool.bgColor }}
                        >
                          {renderCustomToolIcon(tool.actionType, 22)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center">
                            {tool.bnName}
                            <span className="ml-1.5 text-[10px] text-slate-400 font-normal">({tool.name})</span>
                          </h4>
                          <span className="text-[10px] text-slate-400">অ্যাকশন টাইপ: {tool.actionType}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Edit Tool Colors Toggle */}
                        <button
                          onClick={() => {
                            soundEffects.playClick();
                            setEditingToolId(editingToolId === tool.id ? null : tool.id);
                          }}
                          className={`p-1.5 rounded-lg text-xs font-semibold flex items-center transition ${
                            editingToolId === tool.id
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:text-white'
                          }`}
                          title="টুলসের নিজস্ব কালার পরিবর্তন করুন"
                        >
                          <Palette className="w-3.5 h-3.5" />
                        </button>

                        {/* Enable / Disable toggle button */}
                        <button
                          onClick={() => handleToggleTool(tool.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center transition ${
                            tool.enabled
                              ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                          }`}
                          title={tool.enabled ? 'উইজেট থেকে বাদ দিন (মাইনাস)' : 'উইজেটে যোগ করুন (প্লাস)'}
                        >
                          {tool.enabled ? (
                            <>
                              <Minus className="w-3.5 h-3.5 mr-1" /> বাদ দিন
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 mr-1" /> যোগ করুন
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Color Customizer Drawer for this specific tool */}
                    {editingToolId === tool.id && (
                      <div className="mt-3 pt-3 border-t border-slate-800 space-y-3 animate-in fade-in bg-slate-900/60 p-3 rounded-2xl border border-purple-500/20">
                        {/* 1. Tool Background Color Picker */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-amber-300 flex items-center">
                              🎨 টুলসটির ব্যাকগ্রাউন্ড কালার:
                            </span>
                            <div className="flex items-center space-x-1.5">
                              <input
                                type="color"
                                value={tool.bgColor.startsWith('#') && tool.bgColor.length === 7 ? tool.bgColor : '#eff6ff'}
                                onChange={(e) => handleToolColorChange(tool.id, tool.iconColor, e.target.value)}
                                className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent p-0"
                                title="পছন্দমতো যেকোনো ব্যাকগ্রাউন্ড কালার চয়ন করুন"
                              />
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                                {tool.bgColor}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              '#eff6ff', '#ecfdf5', '#fef2f2', '#fffbeb', '#f5f3ff', '#fdf2f8',
                              '#ecfeff', '#f0fdf4', '#fefce8', '#f0fdfa', '#1e293b', '#0f172a',
                              '#312e81', '#14532d', '#701a75', '#451a03'
                            ].map((bg) => (
                              <button
                                key={bg}
                                onClick={() => handleToolColorChange(tool.id, tool.iconColor, bg)}
                                className="w-6 h-6 rounded-lg border border-slate-600 flex items-center justify-center transition hover:scale-110"
                                style={{ backgroundColor: bg }}
                                title={bg}
                              >
                                {tool.bgColor === bg && <Check className="w-3 h-3 text-purple-400" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. Tool Icon Color Picker */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-cyan-300 flex items-center">
                              ✨ টুলসটির নিজস্ব আইকন কালার:
                            </span>
                            <div className="flex items-center space-x-1.5">
                              <input
                                type="color"
                                value={tool.iconColor.startsWith('#') && tool.iconColor.length === 7 ? tool.iconColor : '#3b82f6'}
                                onChange={(e) => handleToolColorChange(tool.id, e.target.value, tool.bgColor)}
                                className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent p-0"
                                title="পছন্দমতো আইকন কালার চয়ন করুন"
                              />
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                                {tool.iconColor}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {colorSwatches.map((c) => (
                              <button
                                key={c}
                                onClick={() => handleToolColorChange(tool.id, c, tool.bgColor)}
                                className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center transition hover:scale-110"
                                style={{ backgroundColor: c }}
                                title={c}
                              >
                                {tool.iconColor === c && <Check className="w-3 h-3 text-slate-900" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WIDGET THEME & BACKGROUND */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              {/* Presets */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  উইজেট প্রিসেট স্টাইলসমূহ:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {themePresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        soundEffects.playClick();
                        onUpdateTheme({
                          ...theme,
                          bgType: preset.bgType,
                          bgColor: preset.bgColor,
                          borderColor: preset.borderColor,
                          fireflyGlowColor: preset.fireflyGlow,
                        });
                      }}
                      className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500 text-left transition flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-5 h-5 rounded-full border border-slate-600"
                          style={{ backgroundColor: preset.bgColor }}
                        />
                        <span className="text-xs font-bold text-slate-200">{preset.name}</span>
                      </div>
                      {theme.bgColor === preset.bgColor && <Check className="w-3.5 h-3.5 text-purple-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Hex Color */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  পছন্দমতো যেকোনো ব্যাকগ্রাউন্ড কালার কোড বা পিকার:
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={theme.bgColor.startsWith('#') ? theme.bgColor : '#ffffff'}
                    onChange={(e) => onUpdateTheme({ ...theme, bgColor: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={theme.bgColor}
                    onChange={(e) => onUpdateTheme({ ...theme, bgColor: e.target.value })}
                    placeholder="#ffffff বা rgba(...)"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Opacity slider */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>উইজেট গ্লাস ট্রান্সপারেন্সি / স্বচ্ছতা:</span>
                  <span className="text-purple-400">{theme.opacity}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={theme.opacity}
                  onChange={(e) => onUpdateTheme({ ...theme, opacity: Number(e.target.value) })}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              {/* SEARCH BAR TEXT COLOR CUSTOMIZER */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2 border border-slate-500 shrink-0"
                      style={{ backgroundColor: theme.searchTextColor || '#ffffff' }}
                    />
                    সার্চবারে লেখার কালার (Search Text Color):
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={theme.searchTextColor?.startsWith('#') && theme.searchTextColor.length === 7 ? theme.searchTextColor : '#ffffff'}
                      onChange={(e) => onUpdateTheme({ ...theme, searchTextColor: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                      title="সার্চবারে লেখার পছন্দের রঙ চয়ন করুন"
                    />
                    <input
                      type="text"
                      value={theme.searchTextColor || '#ffffff'}
                      onChange={(e) => onUpdateTheme({ ...theme, searchTextColor: e.target.value })}
                      className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-mono text-white text-center"
                    />
                  </div>
                </div>

                {/* Live Preview Box */}
                <div
                  className="p-2.5 rounded-xl border border-white/10 flex items-center space-x-2"
                  style={{
                    backgroundColor: theme.bgColor || '#1e293b',
                  }}
                >
                  <span className="text-lime-400 text-xs">🔍</span>
                  <span
                    className="text-xs font-bold truncate"
                    style={{ color: theme.searchTextColor || '#ffffff' }}
                  >
                    সার্চ টেক্সট প্রিভিউ: &quot;আম্মু, সূরা আর রহমান, গান বা ফাইল&quot;
                  </span>
                </div>

                {/* Quick Swatches for search text color */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 mr-1">দ্রুত পছন্দ:</span>
                  {[
                    { label: 'সাদা', color: '#ffffff' },
                    { label: 'কালো', color: '#000000' },
                    { label: 'লাইম', color: '#a3e635' },
                    { label: 'সায়ান', color: '#38bdf8' },
                    { label: 'হলুদ', color: '#facc15' },
                    { label: 'গোলাপী', color: '#f43f5e' },
                    { label: 'পার্পল', color: '#c084fc' },
                    { label: 'অরেঞ্জ', color: '#f59e0b' },
                    { label: 'এমারেল্ড', color: '#34d399' },
                    { label: 'স্লেট', color: '#94a3b8' },
                  ].map((swatch) => (
                    <button
                      key={swatch.color}
                      onClick={() => {
                        soundEffects.playClick();
                        onUpdateTheme({ ...theme, searchTextColor: swatch.color });
                      }}
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold border transition flex items-center space-x-1 cursor-pointer"
                      style={{
                        backgroundColor: swatch.color === '#ffffff' ? '#ffffff' : swatch.color,
                        color: ['#ffffff', '#facc15', '#a3e635', '#34d399', '#38bdf8'].includes(swatch.color) ? '#090d16' : '#ffffff',
                        borderColor: theme.searchTextColor === swatch.color ? '#a855f7' : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      <span>{swatch.label}</span>
                      {theme.searchTextColor === swatch.color && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Corner Radius */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  উইজেটের কোণার আকৃতি (Corner Radius):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'full', label: 'ক্রোম পিল (Full)' },
                    { id: '3xl', label: 'সফট রাউন্ড' },
                    { id: '2xl', label: 'স্কয়ারকেল' },
                    { id: 'none', label: 'ফ্ল্যাট শার্প' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        soundEffects.playClick();
                        onUpdateTheme({ ...theme, borderRadius: r.id as any });
                      }}
                      className={`py-2 text-[11px] font-bold rounded-xl border transition ${
                        theme.borderRadius === r.id
                          ? 'bg-purple-600 text-white border-purple-400 shadow'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Firefly Mascot Settings */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-lime-400" />
                    <span className="text-xs font-bold text-white">জোনাকি পোকার অ্যানিমেশন ও আলো:</span>
                  </div>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onUpdateTheme({ ...theme, showFirefly: !theme.showFirefly });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center transition ${
                      theme.showFirefly ? 'bg-lime-500/20 text-lime-400' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {theme.showFirefly ? <Eye className="w-3.5 h-3.5 mr-1" /> : <EyeOff className="w-3.5 h-3.5 mr-1" />}
                    {theme.showFirefly ? 'চালু' : 'বন্ধ'}
                  </button>
                </div>

                {theme.showFirefly && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] text-slate-400 block">জোনাকির পশ্চাদ্ভাগের আলোর রঙ নির্বাচন করুন:</span>
                    <div className="flex flex-wrap gap-2">
                      {['#a3e635', '#facc15', '#38bdf8', '#4ade80', '#f43f5e', '#c084fc'].map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            soundEffects.playClick();
                            onUpdateTheme({ ...theme, fireflyGlowColor: color });
                          }}
                          className="w-7 h-7 rounded-full border border-slate-600 flex items-center justify-center transition hover:scale-110"
                          style={{ backgroundColor: color }}
                        >
                          {theme.fireflyGlowColor === color && <Check className="w-3.5 h-3.5 text-slate-950" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: WIDGET SCALE & UNSET OPTIONS */}
          {activeTab === 'scale' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-2xl text-xs text-purple-200">
                💡 <strong>হোমস্ক্রিন উইজেট স্কেলিং:</strong> অ্যান্ড্রয়েড মোবাইল ফোনের আনসেট অপশন থেকে উইজেটটি সাইজ মতো বড় বা ছোট করে হোমস্ক্রিনের যেকোনো জায়গায় বসাতে পারবেন।
              </div>

              <div className="space-y-3">
                {[
                  {
                    scale: '4x1',
                    name: '৪ × ১ স্লিম ক্রোম বার (Google Chrome Bar)',
                    desc: 'স্ট্যান্ডার্ড গুগল ক্রোম সার্চ বার যাতে রয়েছে জোনাকি ও সার্চ টুলস',
                  },
                  {
                    scale: '4x2',
                    name: '৪ × ২ স্ট্যান্ডার্ড স্মার্ট উইজেট (Standard Widget)',
                    desc: 'সার্চ বারের সাথে নিচে পূর্ণাঙ্গ হরিজন্টাল স্ক্রোলযোগ্য টুলস স্ট্রিপ',
                  },
                  {
                    scale: '4x3',
                    name: '৪ × ৩ ফুল ড্যাশবোর্ড উইজেট (Expanded Hub)',
                    desc: 'সার্চ বার, টুলস রিবন এবং তাৎক্ষণিক কুইক এক্সেস শর্টকাট',
                  },
                  {
                    scale: '2x1',
                    name: '২ × ১ কম্প্যাক্ট মিনি উইজেট (Mini Pill)',
                    desc: 'ছোট স্ক্রিনের জন্য কম্প্যাক্ট সার্চ অপশন',
                  },
                ].map((item) => (
                  <div
                    key={item.scale}
                    onClick={() => {
                      soundEffects.playClick();
                      onUpdateTheme({ ...theme, scale: item.scale as any });
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      theme.scale === item.scale
                        ? 'bg-purple-900/40 border-purple-500 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          theme.scale === item.scale
                            ? 'bg-purple-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.scale}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">পরিবর্তনগুলো তাৎক্ষণিক উইজেটে দৃশ্যমান</span>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
          >
            সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  );
};
