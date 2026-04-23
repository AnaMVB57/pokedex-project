# Pokédex CLI

An interactive command-line Pokédex built with TypeScript and Node.js. Explore the Pokémon world, catch Pokémon, and manage your collection directly from your terminal.

## Preview

<img width="589" height="768" alt="image" src="https://github.com/user-attachments/assets/e31243ac-c629-463b-bdb7-f1e2a80f4f8d" />

> **Note:** Sprites render best on WSL + Windows Terminal. See the Compatibility section for details.

## Features

- **Explore:** Discover different areas of the Pokémon world using the PokeAPI.
- **Catch:** Capture Pokémon using a probability system based on their base experience.
- **Visuals:** View Pokémon sprites in the terminal rendered with ANSI color blocks.
- **Inspect:** Check the stats and types of your captured Pokémon.
- **Performance:** HTTP response caching for a faster experience.
- **Persistence:** Your Pokédex data is saved between sessions.

## Available Commands

| Command | Description | Example |
|---|---|---|
| `help` | Displays available commands | `help` |
| `map` | Shows the next 20 location areas | `map` |
| `mapb` | Shows the previous 20 location areas | `mapb` |
| `explore <area>` | Lists the Pokémon available in a specific area | `explore pastoria-city-area` |
| `catch <pokemon>` | Attempts to capture a Pokémon | `catch pikachu` |
| `inspect <pokemon>` | Shows details of a captured Pokémon | `inspect pikachu` |
| `pokedex` | Lists all captured Pokémon | `pokedex` |
| `exit` | Closes the program | `exit` |

## Terminal Compatibility

Sprites are rendered using 24-bit ANSI color blocks (True Color). Visual quality depends on your terminal's support.


| Terminal | Sprites | Colors |
|---|---|---|
| WSL + Windows Terminal | ✅ | ✅ True Color |
| PowerShell (Windows) | ⚠️ Partial | ⚠️ 256 colors |
| VSCode Terminal | ⚠️ Partial | ⚠️ Config dependent |


## Prerequisites

- **Node.js** v18 or higher
- **npm**
- **WSL** (recommended for the best visual experience)


To verify if your terminal supports True Color, run:

```bash
echo $COLORTERM
# If it returns "truecolor" or "24bit", visuals will be fully supported.
```


## Installation

```bash
git clone [https://github.com/AnaMVB57/pokedex-project](https://github.com/AnaMVB57/pokedex-project)
cd pokedex-project
npm install
```

## Usage

```bash
npm run dev
```

## Tech Stack
- TypeScript

- Node.js

- PokeAPI

- Jimp (Image processing)

- Vitest (Testing)

## Credits
- Data and images provided by PokeAPI(https://pokeapi.co).
