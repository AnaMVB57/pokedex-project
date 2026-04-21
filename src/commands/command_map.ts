import type { State } from "../state.js";

export async function commandMap(state: State): Promise<void> {
  const data = await state.pokeapi.fetchShallowLocations(
    state.nextLocationsURL ?? undefined,
  );

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (const location of data.results ?? []) {
    console.log(location.name);
  }
}

export async function commandMapb(state: State): Promise<void> {
  if (state.prevLocationsURL === null) {
    console.log("No previous page available! You are on the first page.");
    return;
  }

  const data = await state.pokeapi.fetchShallowLocations(
    state.prevLocationsURL ?? undefined,
  );

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (const location of data.results ?? []) {
    console.log(location.name);
  }
}
