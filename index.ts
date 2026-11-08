export type ResultSource = 
  | 'file' 
  | 'app' 
  | 'contact' 
  | 'web' 
  | 'youtube' 
  | 'facebook' 
  | 'tiktok' 
  | 'quran' 
  | 'setting';

export type FileCategory = 'photo' | 'video' | 'audio' | 'document' | 'download' | 'archive';

export interface LocalFileItem {
  id: string;
  name: string;
  bnName: string;
  category: FileCategory;
  size: string;
  date: string;
  path: string;
  thumbnail?: string;
  mimeType: string;
  tags: string[];
}

export interface AppItem {
  id: string;
  name: string;
  bnName: string;
  category: 'social' | 'tools' | 'media' | 'utility' | 'islamic' | 'system';
  icon: string;
  package: string;
  version: string;
  storageUsage: string;
}

export interface ContactItem {
  id: string;
  name: string;
  bnName?: string;
  phone: string;
  email?: string;
  avatarColor: string;
  relationship?: string;
  lastContacted?: string;
}

export interface WebSearchResult {
  id: string;
  title: string;
  bnTitle?: string;
  source: 'google' | 'chrome' | 'wikipedia';
  url: string;
  snippet: string;
}

export interface MediaSearchResult {
  id: string;
  title: string;
  source: 'youtube' | 'facebook' | 'tiktok';
  url: string;
  thumbnail: string;
  duration?: string;
  author: string;
  views?: string;
}

export interface QuranSearchResult {
  id: string;
  surahNumber: number;
  surahNameAr: string;
  surahNameBn: string;
  surahNameEn: string;
  ayahCount: number;
  revelationType: 'Makki' | 'Madani';
  meaningBn: string;
  sampleAyahBn?: string;
}

export interface SystemSettingItem {
  id: string;
  title: string;
  bnTitle: string;
  description: string;
  iconName: string;
  settingRoute: string;
  value?: string | boolean;
}

export interface WidgetToolConfig {
  id: string;
  name: string;
  bnName: string;
  icon: string;
  enabled: boolean;
  order: number;
  iconColor: string;
  bgColor: string;
  actionType: 
    | 'camera' 
    | 'qr' 
    | 'voice' 
    | 'contacts' 
    | 'files' 
    | 'gallery' 
    | 'music' 
    | 'apps' 
    | 'quran' 
    | 'youtube' 
    | 'web' 
    | 'calculator' 
    | 'torch' 
    | 'notes' 
    | 'settings'
    | 'compass'
    | 'speedtest'
    | 'battery'
    | 'recorder'
    | 'scanner'
    | 'alarm'
    | 'weather'
    | 'maps'
    | 'vibration'
    | 'screencast'
    | 'clipboard'
    | 'share'
    | 'magnifier'
    | 'mirror'
    | 'pdfreader'
    | 'unitconvert'
    | 'ramcleaner'
    | 'soundmeter'
    | 'tasbeeh'
    | 'emergency';
}

export interface WidgetTheme {
  id: string;
  name: string;
  bgType: 'solid' | 'glass' | 'gradient' | 'amoled' | 'neon';
  bgColor: string;
  borderColor: string;
  borderRadius: 'full' | '3xl' | '2xl' | 'xl' | 'none';
  opacity: number;
  fireflyGlowColor: string;
  showFirefly: boolean;
  fireflyMood: 'calm' | 'playful' | 'energetic';
  scale: '1x1' | '2x1' | '4x1' | '4x2' | '4x3';
  searchTextColor?: string;
  searchPlaceholderColor?: string;
}
