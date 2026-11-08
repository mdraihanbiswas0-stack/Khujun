const RECENT_SEARCHES_KEY = 'omnifinder_recent_searches';

export const getRecentSearches = (): string[] => {
  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!data) {
      return ['আম্মুর ফোন নম্বর', 'সূরা আর-রহমান', 'NID Card', 'ক্রিকেট ভিডিও', 'bKash'];
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
  } catch {
    return [];
  }
};

export const saveRecentSearch = (query: string): string[] => {
  const clean = query.trim();
  if (!clean) return getRecentSearches();
  try {
    const existing = getRecentSearches();
    const filtered = existing.filter((item) => item.toLowerCase() !== clean.toLowerCase());
    const updated = [clean, ...filtered].slice(0, 5);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const removeRecentSearch = (itemToRemove: string): string[] => {
  try {
    const existing = getRecentSearches();
    const updated = existing.filter((item) => item !== itemToRemove);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const clearAllRecentSearches = (): void => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // ignore
  }
};
