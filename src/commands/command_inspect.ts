import { State } from "../state.js";
import { renderSprite } from "../assets/sprites/sprites.js";

export async function commandInspect(state: State, pokemonName: string) {
  try {
    if (!state.pokedex[pokemonName]) {
      console.log("You haven't caught this Pokemon!");
      return;
    }

    if (pokemonName === "") {
      console.log("Enter a valid Pokemon name");
      return;
    }

    await renderSprite(
      state.pokedex[pokemonName].sprites?.front_default
    );

    console.log(`Name: ${state.pokedex[pokemonName].name}`);
    console.log(`Height: ${state.pokedex[pokemonName].height}`);
    console.log(`Weight: ${state.pokedex[pokemonName].weight}`);

    console.log(`Stats:`);
    for (const stat of state.pokedex[pokemonName].stats) {
      console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }

    console.log(`Types: `);
    for (const type of state.pokedex[pokemonName].types) {
      console.log(`  - ${type.type.name}`);
    }
  } catch (error) {
    throw new Error(
      `An error ocurred: ${(error as Error).message}. Try again!`,
    );
  }
}
