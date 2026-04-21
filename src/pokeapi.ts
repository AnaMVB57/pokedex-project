export class PokeAPI {
  private static readonly baseUrl = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseUrl}/location-area/`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failded to fetch locations: ${response.statusText}`);
      }

      const data: ShallowLocations = await response.json();
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
  name: string | null;
  url: string | null;
  count: number | null;
  next: string | null;
  previous: string | null;
  results: ShallowLocations[] | null;
};

export type Location = {
  id: number | null;
  name: string | null;
};
