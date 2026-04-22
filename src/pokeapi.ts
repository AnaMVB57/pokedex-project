import { Cache } from "./cache/pokecache.js";

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

export type ShallowLocation = {
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
};

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};