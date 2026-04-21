import { commandExit, commandMap, commandMapb, commandHelp } from "../command_list.js";
import type { CLICommand } from "../state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
    name: "help",
    description: "Displays a list of useful commands",
    callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous 20 location areas",
      callback: commandMapb,
    },
  };
}
