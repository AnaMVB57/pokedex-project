import { savePokedex } from "../pokedex.js";
import { State } from "../state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
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

  let pokemon;

  try {
    pokemon = await state.pokeapi.fetchPokemon(pokemonName);

  } catch (error) {
    throw new Error(
      `An error ocurred: ${(error as Error).message}. Try again!`,
    );
  }
    const catchRate = Math.min(1 / (pokemon.base_experience / 50));
    const caught = Math.random() < catchRate;

    if (!caught) {
      console.log(`${pokemonName} escaped!`);
      return;
    }
      console.log(`${pokemonName} was caught!`);
      state.pokedex[pokemonName] = pokemon;
      savePokedex(state.pokedex);
}
