import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State): void {
  state.rl.prompt();

  state.rl.on("line", (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const command = state.commands[words[0]];

    if (!command) {
      console.log("Unknown command");
      state.rl.prompt();
      return;
    }

    try {
        command.callback(state);
     } catch (e) {
       console.log(e);
     }    

    state.rl.prompt();
  });
}
