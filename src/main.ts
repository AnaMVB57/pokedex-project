import { printBanner } from "./assets/art/banner.js";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  printBanner();
  const state = initState(5 * 60 * 1000);
  startREPL(state);
}

main();
