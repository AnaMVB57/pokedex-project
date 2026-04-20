import * as readline from "readline";
import { getCommands } from "./command_registry.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commands = getCommands();
    const command = commands[words[0]];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
        command.callback(commands);
     } catch (e) {
         console.log(e);
     }    

    rl.prompt();
  });
}
