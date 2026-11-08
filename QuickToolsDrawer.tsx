import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  Plus,
  Trash2,
  Play,
  Pause,
  Folder,
  Music,
  Check,
  HardDrive,
  Copy,
  BookOpen,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ContactItem, LocalFileItem, AppItem, QuranSearchResult } from '../types';
import { searchEngine } from '../services/searchEngine';
import { soundEffects } from '../services/soundEffects';
import { ExtraToolsView } from './ExtraToolsView';

const TOOL_TITLES: Record<string, string> = {
  calculator: 'বাংলা কুইক ক্যালকুলেটর',
  notes: 'কুইক নোট ও মেমো',
  torch: 'মোবাইল ফ্ল্যাশলাইট / টর্চ',
  music: 'অডিও ও মিউজিক প্লেয়ার',
  contacts: 'কন্টাক্টস বুক ও ডায়ালার',
  files: 'মোবাইল ফাইল ম্যানেজার',
  gallery: 'ফটো গ্যালারি ব্রাউজার',
  apps: 'ইনস্টলড অ্যাপস ড্রয়ার',
  quran: 'আল-কোরআন ও নামাজের সময়',
  youtube: 'ইউটিউব শর্টকাটস',
  web: 'ওয়েব ব্রাউজার শর্টকাট',
  compass: 'কম্পাস ও কিবলা নির্দেশক',
  speedtest: 'ইন্টারনেট স্পিড টেস্ট',
  battery: 'ব্যাটারি সেভার ও হেলথ',
  recorder: 'ভয়েস ও অডিও রেকর্ডার',
  scanner: 'ডকুমেন্ট স্ক্যানার ও ওসিআর',
  alarm: 'টাইমার ও স্টপওয়াচ',
  weather: 'লাইভ আবহাওয়া বার্তা',
  maps: 'জিপিএস ম্যাপস ও অবস্থান',
  vibration: 'হ্যাপটিক ভাইব্রেশন টেস্ট',
  screencast: 'ওয়েক-লক স্ক্রিন',
  clipboard: 'ক্লিপবোর্ড খাতা ও হিস্ট্রি',
  share: 'স্মার্ট কুইক শেয়ার',
  magnifier: 'ম্যাগনিফায়ার ও ডিজিটাল জুম',
  mirror: 'সেলফি মিরর ও লাইট',
  pdfreader: 'পিডিএফ ও ডকুমেন্ট ভিউয়ার',
  unitconvert: 'একক রূপান্তর (Unit Converter)',
  ramcleaner: 'র‍্যাম বুস্টার ও মেমরি অপটিমাইজার',
  soundmeter: 'শব্দ মিটার (Decibel Meter)',
  tasbeeh: 'ডিজিটাল তাসবীহ ও জিকির',
  emergency: 'জরুরি এসওএস ও হেল্পলাইন',
};

interface QuickToolsDrawerProps {
  toolType: string | null;
  onClose: () => void;
  onSearchQuery?: (q: string) => void;
}

const toBnDigit = (numStr: string | number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(numStr).replace(/[0-9]/g, (w) => bnDigits[+w]);
};

const toEnDigit = (bnStr: string): string => {
  const bnMap: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  };
  return String(bnStr).replace(/[০-৯]/g, (w) => bnMap[w] || w);
};

export const QuickToolsDrawer: React.FC<QuickToolsDrawerProps> = ({
  toolType,
  onClose,
  onSearchQuery,
}) => {
  // Calculator state with Bengali numerals
  const [calcDisplay, setCalcDisplay] = useState('০');
  const [calcFormula, setCalcFormula] = useState('');

  // Notes state
  const [notes, setNotes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('omnifinder_quick_notes');
      return saved ? JSON.parse(saved) : ['বাজারের তালিকা: চাল, তেল, চা পাতা', 'জরুরি ফোন নম্বর সেভ করা'];
    } catch {
      return ['জরুরি নোট'];
    }
  });
  const [newNoteInput, setNewNoteInput] = useState('');

  // Flashlight state
  const [torchActive, setTorchActive] = useState(false);

  // Music player state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // New contact modal input
  const [showAddContact, setShowAddContact] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRel, setContactRel] = useState('');

  // New file add simulation
  const [showAddFile, setShowAddFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileCategory, setNewFileCategory] = useState<'photo' | 'document' | 'audio' | 'video'>('document');

  // Copy indicator
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!toolType) return null;

  // Bengali Calculator evaluation logic
  const handleCalcBtn = (char: string) => {
    soundEffects.playClick();
    if (char === 'মুছুন' || char === 'C') {
      setCalcDisplay('০');
      setCalcFormula('');
      return;
    }
    if (char === 'সমান' || char === '=') {
      try {
        const fullFormula = toEnDigit(calcFormula + calcDisplay)
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/%/g, '/100');
        // eslint-disable-next-line no-eval
        const result = Function(`"use strict"; return (${fullFormula})`)();
        const formatted = Number(Number(result).toFixed(6));
        setCalcDisplay(toBnDigit(String(formatted)));
        setCalcFormula('');
      } catch {
        setCalcDisplay('ভুল ফরম্যাট');
      }
      return;
    }
    if (['+', '-', '×', '÷', '%'].includes(char)) {
      setCalcFormula((prev) => prev + calcDisplay + ' ' + char + ' ');
      setCalcDisplay('০');
      return;
    }
    setCalcDisplay((prev) => (prev === '০' ? char : prev + char));
  };

  // Notes logic
  const handleAddNote = () => {
    if (!newNoteInput.trim()) return;
    soundEffects.playClick();
    const updated = [newNoteInput.trim(), ...notes];
    setNotes(updated);
    setNewNoteInput('');
    try {
      localStorage.setItem('omnifinder_quick_notes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteNote = (idx: number) => {
    soundEffects.playClick();
    const updated = notes.filter((_, i) => i !== idx);
    setNotes(updated);
    try {
      localStorage.setItem('omnifinder_quick_notes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Contact add logic
  const handleSaveContact = () => {
    if (!contactName.trim() || !contactPhone.trim()) return;
    soundEffects.playClick();
    const newContact: ContactItem = {
      id: `c-custom-${Date.now()}`,
      name: contactName.trim(),
      phone: contactPhone.trim(),
      relationship: contactRel.trim() || 'অন্যান্য',
      avatarColor: 'bg-indigo-600',
    };
    searchEngine.addContact(newContact);
    setContactName('');
    setContactPhone('');
    setContactRel('');
    setShowAddContact(false);
  };

  // File add logic
  const handleSaveFile = () => {
    if (!newFileName.trim()) return;
    soundEffects.playClick();
    const newFile: LocalFileItem = {
      id: `f-custom-${Date.now()}`,
      name: newFileName.trim(),
      bnName: newFileName.trim(),
      category: newFileCategory,
      size: '2.4 MB',
      date: new Date().toISOString().split('T')[0],
      path: `/storage/emulated/0/Download/${newFileName.trim()}`,
      mimeType: newFileCategory === 'photo' ? 'image/jpeg' : 'application/pdf',
      tags: [newFileName.trim(), newFileCategory, 'কাস্টম ফাইল'],
    };
    searchEngine.addFile(newFile);
    setNewFileName('');
    setShowAddFile(false);
  };

  const handleCopy = (id: string, text: string) => {
    soundEffects.playClick();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tracks = [
    { title: 'রবীন্দ্রসঙ্গীত - আমি চিনি গো চিনি তোমারে', artist: 'কণ্ঠসংগীত', duration: '৩:৪৫' },
    { title: 'সূরা আর-রহমান সুললিত তিলাওয়াত', artist: 'মিশারি রশিদ আল-আফাসি', duration: '২২:১৫' },
    { title: 'জরুরি ভয়েস নোট ও ডিরেক্টরি', artist: 'মোবাইল রেকর্ডার', duration: '১:৩০' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Torch Screen Glow Background if active */}
      {toolType === 'torch' && torchActive && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center pointer-events-auto p-6">
          <Zap className="w-16 h-16 text-yellow-500 animate-pulse mb-4" />
          <h2 className="text-2xl font-black text-slate-900 mb-2">ফুল স্ক্রিন টর্চলাইট সক্রিয়!</h2>
          <p className="text-sm text-slate-600 mb-8 text-center max-w-xs">
            স্ক্রিনের সর্বোচ্চ উজ্জ্বলতা সাদা আলো প্রদান করছে।
          </p>
          <button
            onClick={() => setTorchActive(false)}
            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition"
          >
            টর্চলাইট বন্ধ করুন
          </button>
        </div>
      )}

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-800/90 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <h3 className="text-white font-bold text-base flex items-center">
              {TOOL_TITLES[toolType] || 'কুইক টুলস ও সেটিংস'}
            </h3>
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

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* CALCULATOR IN BENGALI NUMERALS */}
          {toolType === 'calculator' && (
            <div className="flex flex-col space-y-3">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-right">
                <div className="text-xs text-slate-400 min-h-[18px] font-sans">{calcFormula}</div>
                <div className="text-3xl font-bold text-lime-400 tracking-wider overflow-x-auto no-scrollbar font-sans">
                  {calcDisplay}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'মুছুন', val: 'C' },
                  { label: '÷', val: '÷' },
                  { label: '×', val: '×' },
                  { label: '⌫', val: '⌫' },
                  { label: '৭', val: '৭' },
                  { label: '৮', val: '৮' },
                  { label: '৯', val: '৯' },
                  { label: '-', val: '-' },
                  { label: '৪', val: '৪' },
                  { label: '৫', val: '৫' },
                  { label: '৬', val: '৬' },
                  { label: '+', val: '+' },
                  { label: '১', val: '১' },
                  { label: '২', val: '২' },
                  { label: '৩', val: '৩' },
                  { label: '=', val: '=' },
                  { label: '০', val: '০' },
                  { label: '.', val: '.' },
                  { label: '০০', val: '০০' },
                  { label: '%', val: '%' },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => {
                      if (btn.val === '⌫') {
                        setCalcDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '০'));
                      } else {
                        handleCalcBtn(btn.val);
                      }
                    }}
                    className={`py-3.5 text-base font-bold rounded-2xl transition active:scale-95 cursor-pointer ${
                      btn.val === '='
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg'
                        : ['+', '-', '×', '÷', '%'].includes(btn.val)
                        ? 'bg-amber-600/30 text-amber-300 hover:bg-amber-600/40 border border-amber-500/30'
                        : btn.val === 'C'
                        ? 'bg-rose-950/60 text-rose-300 hover:bg-rose-900/60 border border-rose-800/50 text-xs font-black'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-100 text-lg'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUICK NOTES */}
          {toolType === 'notes' && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newNoteInput}
                  onChange={(e) => setNewNoteInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                  placeholder="নতুন নোট বা রিমাইন্ডার লিখুন..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center transition"
                >
                  <Plus className="w-4 h-4 mr-1" /> যোগ
                </button>
              </div>

              <div className="space-y-2 max-h-[360px] overflow-y-auto">
                {notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start justify-between group hover:border-slate-700 transition"
                  >
                    <p className="text-sm text-slate-200 break-words flex-1 pr-2">{note}</p>
                    <button
                      onClick={() => handleDeleteNote(idx)}
                      className="p-1 text-slate-500 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FLASHLIGHT */}
          {toolType === 'torch' && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl mb-6 ${
                  torchActive
                    ? 'bg-yellow-400 text-slate-950 shadow-[0_0_50px_rgba(250,204,21,0.8)] scale-110'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                <Zap className="w-14 h-14" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">
                টর্চলাইট: {torchActive ? 'চালু আছে' : 'বন্ধ রয়েছে'}
              </h4>
              <p className="text-xs text-slate-400 mb-6 max-w-xs">
                ক্লিক করে তাৎক্ষণিক সর্বোচ্চ উজ্জ্বলতার মোবাইল ফ্ল্যাশলাইট বা স্ক্রিন টর্চ চালু করুন।
              </p>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setTorchActive(!torchActive);
                }}
                className={`px-8 py-3 rounded-2xl font-bold text-sm shadow-xl transition active:scale-95 ${
                  torchActive
                    ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-950'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {torchActive ? 'বন্ধ করুন (OFF)' : 'টর্চলাইট চালু করুন (ON)'}
              </button>
            </div>
          )}

          {/* MUSIC PLAYER */}
          {toolType === 'music' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-900/50 rounded-2xl flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Music className="w-8 h-8 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">এখন বাজছে</span>
                  <h4 className="text-sm font-bold text-white truncate">{tracks[currentTrackIndex].title}</h4>
                  <p className="text-xs text-slate-400">{tracks[currentTrackIndex].artist}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-2/5 rounded-full" />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6 py-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
                  }}
                  className="text-slate-400 hover:text-white text-xs font-semibold"
                >
                  পূর্ববর্তী
                </button>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsPlaying(!isPlaying);
                  }}
                  className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition active:scale-95"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
                  }}
                  className="text-slate-400 hover:text-white text-xs font-semibold"
                >
                  পরবর্তী
                </button>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-xs font-semibold text-slate-400 block mb-2">স্টোরেজে থাকা অডিও ফাইল:</span>
                <div className="space-y-1.5">
                  {tracks.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        soundEffects.playClick();
                        setCurrentTrackIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between text-xs transition ${
                        currentTrackIndex === idx
                          ? 'bg-indigo-900/40 text-indigo-200 border border-indigo-700/50'
                          : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <Music className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate">{t.title}</span>
                      </div>
                      <span className="text-slate-500 shrink-0 ml-2">{t.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONTACTS DIALER & DIRECTORY */}
          {toolType === 'contacts' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  মোট কন্টাক্ট: {searchEngine.getContacts().length} জন
                </span>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setShowAddContact(!showAddContact);
                  }}
                  className="px-2.5 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-semibold rounded-lg border border-purple-500/40 flex items-center transition"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> নতুন কন্টাক্ট যোগ
                </button>
              </div>

              {showAddContact && (
                <div className="p-3 bg-slate-950 border border-purple-500/30 rounded-2xl space-y-2 animate-in fade-in">
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="নাম লিখুন (যেমন: মামা / Rahim)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="ফোন নম্বর (যেমন: +880 17...)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={contactRel}
                    onChange={(e) => setContactRel(e.target.value)}
                    placeholder="সম্পর্ক / ট্যাগ (ঐচ্ছিক)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <button
                    onClick={handleSaveContact}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow transition"
                  >
                    সেভ করুন
                  </button>
                </div>
              )}

              <div className="space-y-2 max-h-[360px] overflow-y-auto">
                {searchEngine.getContacts().map((contact) => (
                  <div
                    key={contact.id}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-slate-700 transition"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${contact.avatarColor}`}>
                        {contact.name.slice(0, 1)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{contact.name}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">{contact.phone}</p>
                        {contact.relationship && (
                          <span className="text-[10px] text-purple-400">{contact.relationship}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleCopy(contact.id, contact.phone)}
                        className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
                        title="নম্বর কপি করুন"
                      >
                        {copiedId === contact.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`sms:${contact.phone}`}
                        className="p-2 text-emerald-400 hover:text-emerald-300 bg-slate-800 rounded-xl transition"
                        title="মেসেজ পাঠান"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${contact.phone}`}
                        className="p-2 text-blue-400 hover:text-blue-300 bg-blue-600/20 rounded-xl transition"
                        title="সরাসরি কল দিন"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FILES & STORAGE */}
          {(toolType === 'files' || toolType === 'gallery') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center">
                  <HardDrive className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  স্টোরেজ: ৫৪.২ জিবি ফ্রি / ১২৮ জিবি
                </span>
                <button
                  onClick={() => setShowAddFile(!showAddFile)}
                  className="px-2.5 py-1 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 text-xs font-semibold rounded-lg border border-amber-500/40 flex items-center transition"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> ফাইল যোগ
                </button>
              </div>

              {showAddFile && (
                <div className="p-3 bg-slate-950 border border-amber-500/30 rounded-2xl space-y-2 animate-in fade-in">
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="ফাইলের নাম (যেমন: Passport_Copy.pdf)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <select
                    value={newFileCategory}
                    onChange={(e) => setNewFileCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  >
                    <option value="photo">ফটো / ছবি</option>
                    <option value="document">ডকুমেন্ট / পিডিএফ</option>
                    <option value="audio">অডিও / গান</option>
                    <option value="video">ভিডিও</option>
                  </select>
                  <button
                    onClick={handleSaveFile}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow transition"
                  >
                    ফাইল ইনডেক্সে সেভ করুন
                  </button>
                </div>
              )}

              <div className="space-y-2 max-h-[360px] overflow-y-auto">
                {searchEngine
                  .getFiles()
                  .filter((f) => (toolType === 'gallery' ? f.category === 'photo' : true))
                  .map((file) => (
                    <div
                      key={file.id}
                      className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-slate-700 transition"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {file.thumbnail ? (
                          <img
                            src={file.thumbnail}
                            alt={file.name}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                            <Folder className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{file.bnName || file.name}</h4>
                          <p className="text-[10px] text-slate-400 truncate">{file.path}</p>
                          <span className="text-[10px] text-amber-400 font-semibold">{file.size} • {file.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* INSTALLED APPS */}
          {toolType === 'apps' && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 block">মোবাইলে ইনস্টল করা সমস্ত অ্যাপস:</span>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto p-1">
                {searchEngine.getApps().map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      soundEffects.playClick();
                      if (onSearchQuery) onSearchQuery(app.name);
                      onClose();
                    }}
                    className="p-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 rounded-2xl flex flex-col items-center text-center cursor-pointer transition active:scale-95 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md mb-1.5 group-hover:scale-105 transition">
                      {app.name.slice(0, 1)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-200 truncate w-full">{app.name}</span>
                    <span className="text-[9px] text-slate-500">{app.storageUsage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QURAN & PRAYER */}
          {toolType === 'quran' && (
            <div className="space-y-4">
              {/* Prayer Times card */}
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/60 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" /> আজকের নামাজের সময়সূচি (ঢাকা)
                  </span>
                  <span className="text-[10px] bg-emerald-800/50 text-emerald-300 px-2 py-0.5 rounded-full">সক্রিয়</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
                  <div className="p-1.5 bg-slate-900/60 rounded-lg">
                    <div className="text-slate-400">ফজর</div>
                    <div className="text-emerald-300 font-bold">৪:৫২</div>
                  </div>
                  <div className="p-1.5 bg-slate-900/60 rounded-lg">
                    <div className="text-slate-400">জোহর</div>
                    <div className="text-emerald-300 font-bold">১১:৪৫</div>
                  </div>
                  <div className="p-1.5 bg-slate-900/60 rounded-lg">
                    <div className="text-slate-400">আসর</div>
                    <div className="text-emerald-300 font-bold">৩:৪৪</div>
                  </div>
                  <div className="p-1.5 bg-slate-900/60 rounded-lg">
                    <div className="text-slate-400">মাগরিব</div>
                    <div className="text-emerald-300 font-bold">৫:১৫</div>
                  </div>
                  <div className="p-1.5 bg-slate-900/60 rounded-lg">
                    <div className="text-slate-400">এশা</div>
                    <div className="text-emerald-300 font-bold">৬:৩১</div>
                  </div>
                </div>
              </div>

              {/* Surahs List */}
              <div className="space-y-2 max-h-[280px] overflow-y-auto">
                <span className="text-xs font-semibold text-slate-400 block">গুরুত্বপূর্ণ সূরাসমূহ:</span>
                {[
                  { no: 1, name: 'আল-ফাতিহা', ar: 'الفَاتِحة', meaning: 'ভূমিকা', verses: 7 },
                  { no: 36, name: 'ইয়াসীন', ar: 'يس', meaning: 'কোরআনের হৃৎপিণ্ড', verses: 83 },
                  { no: 55, name: 'আর-রহমান', ar: 'الرَّحْمَٰن', meaning: 'পরম দয়ালু', verses: 78 },
                  { no: 67, name: 'আল-মুলক', ar: 'المُلْك', meaning: 'সার্বভৌমত্ব', verses: 30 },
                ].map((s) => (
                  <div
                    key={s.no}
                    onClick={() => {
                      soundEffects.playClick();
                      if (onSearchQuery) onSearchQuery(s.name);
                      onClose();
                    }}
                    className="p-3 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-2xl flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-900/40 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-700/50">
                        {s.no}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">সূরা {s.name}</h4>
                        <p className="text-[10px] text-slate-400">{s.meaning} • {s.verses} আয়াত</p>
                      </div>
                    </div>
                    <span className="text-sm font-serif text-emerald-400">{s.ar}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YOUTUBE & WEB */}
          {(toolType === 'youtube' || toolType === 'web') && (
            <div className="space-y-3 text-center py-6">
              <Sparkles className="w-10 h-10 text-red-500 mx-auto mb-2 animate-bounce" />
              <h4 className="text-white font-bold text-base">
                {toolType === 'youtube' ? 'ইউটিউব কুইক ব্রাউজিং' : 'গুগল ক্রোম ইন্টারনেট সার্চ'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                সার্চ বারে যেকোনো বিষয় লিখলে স্বয়ংক্রিয়ভাবে ইউটিউব ও ওয়েবের ফলাফল তাৎক্ষণিক দেখতে পাবেন।
              </p>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  if (onSearchQuery) onSearchQuery(toolType === 'youtube' ? 'বাংলা নতুন গান ২০২৪' : 'গুগল নিউজ বাংলাদেশ');
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-semibold rounded-xl shadow-lg hover:from-red-500 hover:to-rose-500 transition"
              >
                জনপ্রিয় ট্রেন্ডিং সার্চ করুন
              </button>
            </div>
          )}

          {/* 20 NEW EXTENDED MOBILE TOOLS */}
          {[
            'compass',
            'speedtest',
            'battery',
            'recorder',
            'scanner',
            'alarm',
            'weather',
            'maps',
            'vibration',
            'screencast',
            'clipboard',
            'share',
            'magnifier',
            'mirror',
            'pdfreader',
            'unitconvert',
            'ramcleaner',
            'soundmeter',
            'tasbeeh',
            'emergency',
          ].includes(toolType) && (
            <ExtraToolsView
              toolType={toolType}
              onClose={onClose}
              onSearchQuery={onSearchQuery}
            />
          )}
        </div>
      </div>
    </div>
  );
};
