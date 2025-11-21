import { useEffect, useState } from "react";
import { fetchCharacterData } from "../api/swapi";
import { getCachePage, setCachePage } from "../utils/cachePage";
import { Character } from "../types/character";
import { PageCache } from "../types/cache";

const CACHE = {
  KEY: "swapi_character_cache",
  EXP: 300_000,
} as const;

export const useCharacter = (pageNumber: number) => {
  const [character, setCharacter] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      setIsLoading(true);
      setHasError(null);

      const cachedPage = getCachePage(`${CACHE.KEY}_page_${pageNumber}`);
      const cachedTotalPages = localStorage.getItem(`${CACHE.KEY}_totalPages`);
      const isCacheValid =
        cachedPage && Date.now() - cachedPage.timestamp < CACHE.EXP;

      if (cachedTotalPages) {
        setTotalPages(Number(cachedTotalPages));
      }

      if (isCacheValid) {
        setCharacter(cachedPage.data);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetchCharacterData(pageNumber);
        if (!isActive) {
          return;
        }

        const pages = Math.ceil(response.count / 10);

        setCharacter(response.characters);
        setTotalPages(pages);

        localStorage.setItem(`${CACHE.KEY}_totalPages`, pages.toString());

        const pageCache: PageCache = {
          timestamp: Date.now(),
          data: response.characters,
        };

        setCachePage(`${CACHE.KEY}_page_${pageNumber}`, pageCache);
      } catch (error) {
        setHasError((error as Error).message || "Failed to fetch data!");
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [pageNumber]);

  return { character, totalPages, isLoading, hasError };
};
