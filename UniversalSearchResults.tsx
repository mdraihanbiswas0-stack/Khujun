import React, { useState } from 'react';
import {
  Folder,
  Phone,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Youtube,
  Globe,
  Settings,
  Share2,
  Play,
  Grid,
  Sparkles,
  Info,
  Clock,
  Layers,
} from 'lucide-react';
import { GroupedSearchResults } from '../services/searchEngine';
import { LocalFileItem, ContactItem } from '../types';
import { soundEffects } from '../services/soundEffects';
import { getRecentSearches } from '../services/recentSearches';

interface UniversalSearchResultsProps {
  results: GroupedSearchResults;
  query: string;
  onClearSearch: () => void;
  onSelectQuery: (q: string) => void;
}

export const UniversalSearchResults: React.FC<UniversalSearchResultsProps> = ({
  results,
  query,
  onClearSearch,
  onSelectQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<LocalFileItem | null>(null);

  const handleCopy = (id: string, text: string) => {
    soundEffects.playClick();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const recentSearchesList = getRecentSearches();

  if (!query.trim()) {
    return (
      <div className="w-full max-w-2xl mx-auto py-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-800/80 border border-slate-700/80 mx-auto flex items-center justify-center text-slate-400 shadow-xl">
          <Sparkles className="w-8 h-8 text-lime-400 animate-pulse" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1">
            সার্বজনীন মোবাইল সার্চ ইঞ্জিন প্রস্তুত
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            সার্চ বারে লিখে মোবাইল স্টোরেজের ফাইল, কন্টাক্টস, অ্যাপস, ইউটিউব বা ওয়েবের যেকোনো তথ্য এক ক্লিকেই বের করুন।
          </p>
        </div>

        {/* Recent Searches Section */}
        {recentSearchesList.length > 0 && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 text-left max-w-md mx-auto shadow-xl">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs">
              <span className="flex items-center font-bold text-lime-400">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                সাম্প্রতিক সার্চসমূহ (Recent Searches)
              </span>
              <span className="text-[10px] text-slate-500 font-medium">সর্বশেষ ৫টি</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {recentSearchesList.map((item, idx) => (
                <button
                  key={`${item}-${idx}`}
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectQuery(item);
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 hover:border-lime-400/40 transition flex items-center space-x-1.5 group"
                >
                  <Clock className="w-3 h-3 text-slate-400 group-hover:text-lime-400 transition" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            জনপ্রিয় সাজেশন্স
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
            {['আম্মু', 'সূরা আর-রহমান', 'NID Card', 'ক্রিকেট ভিডিও', 'bKash', 'ওয়াইফাই সেটিংস', 'গান'].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  soundEffects.playClick();
                  onSelectQuery(chip);
                }}
                className="px-3 py-1.5 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 hover:border-slate-700 transition"
              >
                🔎 {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Search Header Banner */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="font-bold text-white">&quot;{query}&quot;</span>
          <span>এর জন্য {results.totalCount} টি ফলাফল পাওয়া গেছে</span>
        </div>
        <button
          onClick={() => {
            soundEffects.playClick();
            onClearSearch();
          }}
          className="text-slate-400 hover:text-white font-semibold transition"
        >
          ক্লিয়ার
        </button>
      </div>

      {/* Filter Tabs by Source */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'সব ফলাফল', count: results.totalCount },
          { id: 'contacts', label: 'কন্টাক্টস', count: results.contacts.length },
          { id: 'files', label: 'ফাইল ও স্টোরেজ', count: results.files.length },
          { id: 'apps', label: 'অ্যাপস', count: results.apps.length },
          { id: 'quran', label: 'আল-কোরআন', count: results.quran.length },
          { id: 'youtube', label: 'ইউটিউব', count: results.youtube.length },
          { id: 'web', label: 'অনলাইন ও ক্রোম', count: results.web.length },
          { id: 'settings', label: 'সেটিংস', count: results.settings.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              soundEffects.playClick();
              setActiveCategory(tab.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-1.5 ${
              activeCategory === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === tab.id ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Step-by-Step Categorized Sections */}

      {/* 1. CONTACTS RESULTS */}
      {(activeCategory === 'all' || activeCategory === 'contacts') && results.contacts.length > 0 && (
        <div className="bg-slate-900/70 border border-purple-900/40 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-purple-800/30 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                মোবাইল কন্টাক্টস ও ফোন বুক থেকে ({results.contacts.length})
              </h4>
            </div>
            <span className="text-[10px] text-purple-400 font-semibold bg-purple-950 px-2 py-0.5 rounded-full">
              সরাসরি কল/মেসেজ
            </span>
          </div>

          <div className="space-y-2">
            {results.contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-purple-500/50 transition group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow ${contact.avatarColor}`}
                  >
                    {contact.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">
                      {contact.bnName || contact.name}
                    </h5>
                    <p className="text-xs text-purple-300 font-mono font-semibold">{contact.phone}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                      {contact.relationship && <span>{contact.relationship}</span>}
                      {contact.lastContacted && <span>• {contact.lastContacted}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(contact.id, contact.phone)}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
                    title="নম্বর কপি করুন"
                  >
                    {copiedId === contact.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`sms:${contact.phone}`}
                    className="p-2 text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 rounded-xl transition"
                    title="মেসেজ পাঠান"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center shadow-lg transition active:scale-95"
                    title="সরাসরি কল দিন"
                  >
                    <Phone className="w-3.5 h-3.5 mr-1" /> কল
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. LOCAL FILES & STORAGE */}
      {(activeCategory === 'all' || activeCategory === 'files') && results.files.length > 0 && (
        <div className="bg-slate-900/70 border border-amber-900/40 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-amber-800/30 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                <Folder className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                মোবাইল মেমরি ও স্টোরেজ ফাইল থেকে ({results.files.length})
              </h4>
            </div>
            <span className="text-[10px] text-amber-400 font-semibold bg-amber-950 px-2 py-0.5 rounded-full">
              ডিভাইস স্টোরেজ
            </span>
          </div>

          <div className="space-y-2">
            {results.files.map((file) => (
              <div
                key={file.id}
                className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-amber-500/50 transition"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {file.thumbnail ? (
                    <img
                      src={file.thumbnail}
                      alt={file.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Folder className="w-6 h-6" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">
                      {file.bnName || file.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{file.path}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-amber-400 font-medium mt-0.5">
                      <span>{file.size}</span>
                      <span>• {file.date}</span>
                      <span className="bg-slate-800 px-1.5 py-0.2 rounded text-slate-300 uppercase">
                        {file.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setPreviewFile(file);
                    }}
                    className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-xl transition"
                  >
                    দেখুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. AL-QURAN & ISLAMIC */}
      {(activeCategory === 'all' || activeCategory === 'quran') && results.quran.length > 0 && (
        <div className="bg-slate-900/70 border border-emerald-900/40 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-800/30 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                পবিত্র আল-কোরআন ও ধর্মীয় তথ্য থেকে ({results.quran.length})
              </h4>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded-full">
              বাংলা অর্থসহ
            </span>
          </div>

          <div className="space-y-2">
            {results.quran.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-900/40 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-700/50">
                      {item.surahNumber}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        {item.surahNameBn} ({item.surahNameEn})
                      </h5>
                      <span className="text-[10px] text-slate-400">
                        {item.meaningBn} • {item.ayahCount} আয়াত • {item.revelationType}
                      </span>
                    </div>
                  </div>
                  <span className="text-base font-serif text-emerald-400 font-bold">
                    {item.surahNameAr}
                  </span>
                </div>

                {item.sampleAyahBn && (
                  <p className="text-xs text-emerald-200/90 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/30 italic">
                    &quot;{item.sampleAyahBn}&quot;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. INSTALLED APPS */}
      {(activeCategory === 'all' || activeCategory === 'apps') && results.apps.length > 0 && (
        <div className="bg-slate-900/70 border border-blue-900/40 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-blue-800/30 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
                <Grid className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wide">
                মোবাইলে ইনস্টলড অ্যাপস ({results.apps.length})
              </h4>
            </div>
            <span className="text-[10px] text-blue-400 font-semibold bg-blue-950 px-2 py-0.5 rounded-full">
              ডিভাইস অ্যাপস
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {results.apps.map((app) => (
              <div
                key={app.id}
                className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow shrink-0">
                    {app.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{app.name}</h5>
                    <p className="text-[10px] text-slate-400 truncate">{app.package}</p>
                    <span className="text-[9px] text-blue-400">{app.storageUsage}</span>
                  </div>
                </div>
                <button
                  onClick={() => soundEffects.playClick()}
                  className="px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-xs font-semibold rounded-xl border border-blue-500/40 transition shrink-0"
                >
                  ওপেন
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. YOUTUBE RESULTS */}
      {(activeCategory === 'all' || activeCategory === 'youtube') && results.youtube.length > 0 && (
        <div className="bg-slate-900/70 border border-red-900/40 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-red-800/30 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-red-500/20 text-red-400 rounded-lg">
                <Youtube className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide">
                ইউটিউব ভিডিও ফলাফল ({results.youtube.length})
              </h4>
            </div>
            <span className="text-[10px] text-red-400 font-semibold bg-red-950 px-2 py-0.5 rounded-full">
              অনলাইন স্ট্রিমিং
            </span>
          </div>

          <div className="space-y-2">
            {results.youtube.map((yt) => (
              <a
                key={yt.id}
                href={yt.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-red-500/50 transition group block"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-slate-800">
                    <img src={yt.thumbnail} alt={yt.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    {yt.duration && (
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] text-white px-1 rounded font-mono">
                        {yt.duration}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white group-hover:text-red-400 transition truncate">
                      {yt.title}
                    </h5>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                      <span>{yt.author}</span>
                      {yt.views && <span>• {yt.views}</span>}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-red-400 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 6. ONLINE / GOOGLE CHROME & WEB */}
      {(activeCategory === 'all' || activeCategory === 'web') && results.web.length > 0 && (
        <div className="bg-slate-900/70 border border-slate-700/60 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                গুগল ক্রোম ও অনলাইন ওয়েব সার্চ ({results.web.length})
              </h4>
            </div>
            <span className="text-[10px] text-blue-400 font-semibold bg-blue-950 px-2 py-0.5 rounded-full">
              ওয়েব ব্রাউজার
            </span>
          </div>

          <div className="space-y-2">
            {results.web.map((w) => (
              <a
                key={w.id}
                href={w.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition group block"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center space-x-1.5 text-[10px] text-blue-400 mb-1">
                    <Globe className="w-3 h-3" />
                    <span>{w.source.toUpperCase()}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white group-hover:text-blue-400 transition truncate">
                    {w.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{w.snippet}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 7. SYSTEM SETTINGS */}
      {(activeCategory === 'all' || activeCategory === 'settings') && results.settings.length > 0 && (
        <div className="bg-slate-900/70 border border-slate-700/60 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-700/60 pb-2">
            <div className="p-1.5 bg-slate-700 text-slate-300 rounded-lg">
              <Settings className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              মোবাইল সিস্টেম সেটিংস থেকে ({results.settings.length})
            </h4>
          </div>

          <div className="space-y-2">
            {results.settings.map((s) => (
              <div
                key={s.id}
                className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-white">{s.bnTitle} ({s.title})</h5>
                  <p className="text-[10px] text-slate-400">{s.description}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">
                  {typeof s.value === 'boolean' ? (s.value ? 'চালু (ON)' : 'বন্ধ (OFF)') : s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">ফাইল বিস্তারিত তথ্য</h4>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {previewFile.thumbnail && (
              <img
                src={previewFile.thumbnail}
                alt={previewFile.name}
                className="w-full h-44 object-cover rounded-2xl border border-slate-800"
              />
            )}
            <div className="space-y-1.5 text-xs">
              <p className="text-white font-bold">{previewFile.bnName || previewFile.name}</p>
              <p className="text-slate-400 font-mono text-[10px] break-all">{previewFile.path}</p>
              <p className="text-slate-300">সাইজ: {previewFile.size}</p>
              <p className="text-slate-300">তারিখ: {previewFile.date}</p>
              <p className="text-slate-300">ক্যাটাগরি: {previewFile.category}</p>
            </div>
            <button
              onClick={() => {
                soundEffects.playClick();
                setPreviewFile(null);
              }}
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl text-xs"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
