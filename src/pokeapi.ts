import { Cache } from "./cache/pokecache.js";
import { Pokemon } from "./models/pokemon.js";
import { Location } from "./models/location.js";
import { ShallowLocation } from "./models/shallow_location.js";

export class PokeAPI {
  private static readonly baseUrl = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchShallowLocations(pageURL?: string): Promise<ShallowLocation> {
    const url = pageURL || `${PokeAPI.baseUrl}/location-area/`;

    try {
      const cached = this.cache.get<ShallowLocation>(url);
      if (cached) {
        return cached;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.statusText}`);
      }

      const data: ShallowLocation = await response.json();
      this.cache.add(url, data);
      return data;
    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseUrl}/location-area/${locationName}`;

    try {
      const cached = this.cache.get<Location>(url);
      if(cached){
        return cached;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch location: ${response.statusText}`);
      }

      const data: Location = await response.json();
      this.cache.add(url, data);
      return data;
    } catch (error) {
      throw new Error(`Error fetching location: ${(error as Error).message}`);
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseUrl}/pokemon/${pokemonName}`;

    try {
      const cached = this.cache.get<Pokemon>(url);
      if(cached){
        return cached;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to catch Pokemon: ${response.statusText}`);
      }

      const data: Pokemon = await response.json();
      this.cache.add(url, data);
      return data;
    } catch (error) {
      throw new Error(`Error catching Pokemon: ${(error as Error).message}`);
    }
  }
}
