import { State } from "../state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  try {
    if (args.length === 0) {
      console.log("Enter a valid Pokemon name.");
      return;
    }

    const pokemonName = args[0];

    if (state.pokedex[pokemonName]) {
      console.log("Already caught!");
      return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    let pokemon = await state.pokeapi.fetchPokemon(pokemonName);

    const catchRate = 1 / (pokemon.base_experience / 50);
    const caught = Math.random() < catchRate;

    if (!caught) {
      console.log(`${pokemonName} escaped!`);
      return;
    } else {
      console.log(`${pokemonName} was caught!`);
      state.pokedex[pokemonName] = pokemon;
      return;
    }
  } catch (error) {
    throw new Error(
      `An error ocurred: ${(error as Error).message}. Try again!`,
    );
  }
}
