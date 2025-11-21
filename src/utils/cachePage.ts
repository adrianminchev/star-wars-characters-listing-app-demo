import { PageCache } from "../types/cache";

export function getCachePage(key: string): PageCache | null {
  try {
    const cachedDataString = localStorage.getItem(key);

    if (!cachedDataString) {
      return null;
    }

    return JSON.parse(cachedDataString) as PageCache;
  } catch (error) {
    console.warn("Failed to read cached data!", error);

    return null;
  }
}

export function setCachePage(key: string, value: PageCache) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Failed to save cached data!", error);
  }
}
