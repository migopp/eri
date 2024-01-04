# eri 🐐

> eri === 'Elden Ring Interface'

## Introduction
Query information about Elden Ring's various items, characters, and bosses quickly from the command line.

## Installation
1. Clone this repository as `git clone https://github.com/migopp/eri.git`
2. Navigate into the `eri/` directory
3. Install node/npm
4. Run `npm install -g .` for CLI installation

## Usage
```
eri <flags> <args>
```
Enter `eri -h` or `eri --help` for a list of available flags. Node that flags with string arguments expect multi-word queries to be surrounded by quotes.

As such, a query for the _Bloodhound's Fang_ curved sword would look as follows:
```
eri --weapon "Bloodhound's Fang"
```

Argument case (or even completeness) does not matter. For example, the queries `eri --npc Patches` is the same as `eri --npc PAtCHES` and `eri --npc patches`. Incomplete queries will return available results with the indicated fragment.

## Credits
- https://github.com/deliton/eldenring-api
- https://github.com/yargs/yargs
- https://github.com/chalk/chalk
