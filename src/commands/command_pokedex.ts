import { State } from "../state.js";

export async function commandPokedex(state: State): Promise<void> {

if (Object.keys(state.pokedex).length === 0) {
    console.log("You haven't caught any Pokemon!");
    return;
  }

  console.log("Your Pokedex:");
  for (const name of Object.keys(state.pokedex)) {
    console.log(` - ${name}`);
  }
}
