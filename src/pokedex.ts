import { readFileSync, writeFileSync, existsSync } from "fs";
import { Pokemon } from "./models/pokemon.js";

const fileRoute = "src/data/pokedex.json";

export function loadPokedex(): Record<string, Pokemon> {
  if (!existsSync(fileRoute)) {
    return {};
  }
  const data = readFileSync(fileRoute, "utf-8");

  if(data.trim() === ""){
    return {};
  }
  return JSON.parse(data) as Record<string, Pokemon>;
}

export function savePokedex(pokedex: Record<string, Pokemon>): void {
  writeFileSync(fileRoute, JSON.stringify(pokedex, null, 2));
}
