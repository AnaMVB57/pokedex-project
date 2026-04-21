import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "");
}

export async function startREPL(state: State) {
  state.readline.prompt();

  state.readline.on("line", async (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.readline.prompt();
      return;
    }

    const command = state.commands[words[0]];

    if (!command) {
      console.log(
        "Unknown command. Type 'help' to know the available commands.",
      );
      state.readline.prompt();
      return;
    }

    try {
      await command.callback(state, ...words.slice(1));
    } catch (e) {
      console.log(e);
    }

    state.readline.prompt();
  });
}
