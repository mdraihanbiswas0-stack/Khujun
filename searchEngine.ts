import {
  LocalFileItem,
  AppItem,
  ContactItem,
  WebSearchResult,
  MediaSearchResult,
  QuranSearchResult,
  SystemSettingItem,
} from '../types';
import {
  INITIAL_FILES,
  INITIAL_APPS,
  INITIAL_CONTACTS,
  INITIAL_SETTINGS,
  INITIAL_QURAN_DATA,
  INITIAL_YOUTUBE_RESULTS,
  INITIAL_SOCIAL_RESULTS,
} from './mockData';

export interface GroupedSearchResults {
  query: string;
  totalCount: number;
  files: LocalFileItem[];
  apps: AppItem[];
  contacts: ContactItem[];
  quran: QuranSearchResult[];
  youtube: MediaSearchResult[];
  social: MediaSearchResult[];
  settings: SystemSettingItem[];
  web: WebSearchResult[];
}

class SearchEngineService {
  private files: LocalFileItem[] = [...INITIAL_FILES];
  private apps: AppItem[] = [...INITIAL_APPS];
  private contacts: ContactItem[] = [...INITIAL_CONTACTS];
  private settings: SystemSettingItem[] = [...INITIAL_SETTINGS];
  private quran: QuranSearchResult[] = [...INITIAL_QURAN_DATA];
  private youtube: MediaSearchResult[] = [...INITIAL_YOUTUBE_RESULTS];
  private social: MediaSearchResult[] = [...INITIAL_SOCIAL_RESULTS];

  // Storage persistence keys
  private STORAGE_KEY = 'omnifinder_data_v1';

  constructor() {
    this.loadPersistedData();
  }

  private loadPersistedData() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.files) this.files = parsed.files;
        if (parsed.contacts) this.contacts = parsed.contacts;
      }
    } catch {
      // ignore
    }
  }

  private persistData() {
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({
          files: this.files,
          contacts: this.contacts,
        })
      );
    } catch {
      // ignore
    }
  }

  // Add custom file from device
  public addFile(file: LocalFileItem) {
    this.files.unshift(file);
    this.persistData();
  }

  // Add contact
  public addContact(contact: ContactItem) {
    this.contacts.unshift(contact);
    this.persistData();
  }

  public getFiles(): LocalFileItem[] {
    return this.files;
  }

  public getContacts(): ContactItem[] {
    return this.contacts;
  }

  public getApps(): AppItem[] {
    return this.apps;
  }

  // Universal Search Logic
  public search(rawQuery: string): GroupedSearchResults {
    const q = rawQuery.trim().toLowerCase();

    if (!q) {
      return {
        query: '',
        totalCount: 0,
        files: [],
        apps: [],
        contacts: [],
        quran: [],
        youtube: [],
        social: [],
        settings: [],
        web: [],
      };
    }

    // 1. Files & Storage
    const matchedFiles = this.files.filter((f) => {
      return (
        f.name.toLowerCase().includes(q) ||
        f.bnName.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.path.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    // 2. Apps
    const matchedApps = this.apps.filter((a) => {
      return (
        a.name.toLowerCase().includes(q) ||
        a.bnName.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.package.toLowerCase().includes(q)
      );
    });

    // 3. Contacts
    const matchedContacts = this.contacts.filter((c) => {
      const cleanPhone = c.phone.replace(/[\s-+()]/g, '');
      const cleanQuery = q.replace(/[\s-+()]/g, '');
      return (
        c.name.toLowerCase().includes(q) ||
        (c.bnName && c.bnName.toLowerCase().includes(q)) ||
        (cleanPhone && cleanPhone.includes(cleanQuery)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.relationship && c.relationship.toLowerCase().includes(q))
      );
    });

    // 4. Quran
    const matchedQuran = this.quran.filter((item) => {
      return (
        item.surahNameEn.toLowerCase().includes(q) ||
        item.surahNameBn.toLowerCase().includes(q) ||
        item.surahNameAr.includes(q) ||
        item.meaningBn.toLowerCase().includes(q) ||
        String(item.surahNumber) === q ||
        (item.sampleAyahBn && item.sampleAyahBn.toLowerCase().includes(q))
      );
    });

    // 5. System Settings
    const matchedSettings = this.settings.filter((s) => {
      return (
        s.title.toLowerCase().includes(q) ||
        s.bnTitle.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    });

    // 6. YouTube
    const matchedYoutube = this.youtube.filter((yt) => {
      return (
        yt.title.toLowerCase().includes(q) ||
        yt.author.toLowerCase().includes(q)
      );
    });
    // If few youtube results, dynamically synthesize live direct search entry
    if (matchedYoutube.length === 0) {
      matchedYoutube.push({
        id: `yt-live-${Date.now()}`,
        title: `ইউটিউবে "${rawQuery}" সম্পর্কিত সকল ভিডিও দেখুন`,
        source: 'youtube',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(rawQuery)}`,
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=80',
        author: 'YouTube Search',
        views: 'লাইভ সার্চ',
      });
    }

    // 7. Social (Facebook & TikTok)
    const matchedSocial = this.social.filter((s) => {
      return (
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q)
      );
    });
    // Add real direct query fallback
    matchedSocial.push({
      id: `fb-live-${Date.now()}`,
      title: `ফেসবুকে "${rawQuery}" খুঁজুন`,
      source: 'facebook',
      url: `https://www.facebook.com/search/top?q=${encodeURIComponent(rawQuery)}`,
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      author: 'Facebook Live Search',
    });
    matchedSocial.push({
      id: `tt-live-${Date.now()}`,
      title: `টিকটকে "${rawQuery}" ট্রেন্ডিং ভিডিও`,
      source: 'tiktok',
      url: `https://www.tiktok.com/tag/${encodeURIComponent(rawQuery.replace(/\s+/g, ''))}`,
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80',
      author: 'TikTok Live Search',
    });

    // 8. Online / Google Chrome / Web Results
    const webResults: WebSearchResult[] = [
      {
        id: `web-google-${Date.now()}`,
        title: `গুগলে "${rawQuery}" সার্চ করুন`,
        source: 'google',
        url: `https://www.google.com/search?q=${encodeURIComponent(rawQuery)}`,
        snippet: `গুগল ব্রাউজারে "${rawQuery}" নিয়ে সমস্ত ওয়েবপেজ, নিবন্ধ ও খবর তাৎক্ষণিক দেখুন।`,
      },
      {
        id: `web-wiki-${Date.now()}`,
        title: `উইকিপিডিয়া জ্ঞানকোষ: "${rawQuery}"`,
        source: 'wikipedia',
        url: `https://bn.wikipedia.org/w/index.php?search=${encodeURIComponent(rawQuery)}`,
        snippet: `বাংলা উইকিপিডিয়ায় বিশ্বস্ত তথ্য ও পূর্ণ বিবরণ উন্মুক্ত জ্ঞানকোষ।`,
      },
      {
        id: `web-chrome-${Date.now()}`,
        title: `গুগল ক্রোম অ্যাড্রেস বারে যান: "${rawQuery}"`,
        source: 'chrome',
        url: `https://www.google.com/search?q=${encodeURIComponent(rawQuery)}`,
        snippet: `সরাসরি ব্রাউজ করুন অথবা নতুন উইন্ডোতে ফলাফল খুলুন।`,
      },
    ];

    const totalCount =
      matchedFiles.length +
      matchedApps.length +
      matchedContacts.length +
      matchedQuran.length +
      matchedSettings.length +
      matchedYoutube.length +
      matchedSocial.length +
      webResults.length;

    return {
      query: rawQuery,
      totalCount,
      files: matchedFiles,
      apps: matchedApps,
      contacts: matchedContacts,
      quran: matchedQuran,
      youtube: matchedYoutube,
      social: matchedSocial,
      settings: matchedSettings,
      web: webResults,
    };
  }
}

export const searchEngine = new SearchEngineService();
