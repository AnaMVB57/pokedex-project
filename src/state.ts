import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/command_registry.js";
import { PokeAPI } from "./pokeapi.js";
import { colors } from "./assets/colors.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL?: string | null;
  prevLocationsURL?: string | null;
};

export function initState(cacheInterval: number): State {
  const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `${colors.bold}${colors.yellow}>> Pokedex ${colors.reset} `,
});

   const commands = getCommands();

   return { 
    readline,
    commands,
    pokeapi: new PokeAPI(cacheInterval),
    nextLocationsURL: "",
    prevLocationsURL: "",
   };
}
