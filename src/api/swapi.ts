import { Character } from "../types/character";

export async function fetchCharacterData(
  pageNumber: number = 1
): Promise<{ count: number; characters: Character[] }> {
  const url = `https://swapi.py4e.com/api/people/?page=${pageNumber}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error with HTTP status code ${response.status}!`);
  }

  const data = await response.json();

  return { count: data.count, characters: data.results };
}
