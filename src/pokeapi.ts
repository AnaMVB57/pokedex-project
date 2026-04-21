import { Cache } from "./cache/pokecache.js";

export class PokeAPI {
  private static readonly baseUrl = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache(){
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseUrl}/location-area/`;

    try {
      const cached = this.cache.get<ShallowLocations>(url);
      if (cached){
        return cached;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.statusText}`);
      }

      const data: ShallowLocations = await response.json();
      this.cache.add(url, data);
      return data;

    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseUrl}/location-area/${locationName}`;

    try {
      const response = await fetch(url);

      if(!response.ok){
        throw new Error(`Failed to fetch location: ${response.statusText}`);
      }

      const data: Location = await response.json();
      return data;

    } catch (error) {
      throw new Error(`Error fetching location: ${(error as Error).message}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}
