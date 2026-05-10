export const TYPE_COLORS: Record<string, string> = {
  normal: "hsl(var(--type-normal))",
  fire: "hsl(var(--type-fire))",
  water: "hsl(var(--type-water))",
  electric: "hsl(var(--type-electric))",
  grass: "hsl(var(--type-grass))",
  ice: "hsl(var(--type-ice))",
  fighting: "hsl(var(--type-fighting))",
  poison: "hsl(var(--type-poison))",
  ground: "hsl(var(--type-ground))",
  flying: "hsl(var(--type-flying))",
  psychic: "hsl(var(--type-psychic))",
  bug: "hsl(var(--type-bug))",
  rock: "hsl(var(--type-rock))",
  ghost: "hsl(var(--type-ghost))",
  dragon: "hsl(var(--type-dragon))",
  dark: "hsl(var(--type-dark))",
  steel: "hsl(var(--type-steel))",
  fairy: "hsl(var(--type-fairy))",
};

export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");

const API = "https://pokeapi.co/api/v2";

export async function fetchPokemon(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) throw new Error("Enter a Pokémon name or number");
  const res = await fetch(`${API}/pokemon/${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Pokémon not found");
  return res.json();
}

export async function fetchSpecies(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Species not found");
  return res.json();
}

export async function fetchEvolutionChain(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Evolution chain not found");
  return res.json();
}

export interface EvoNode {
  name: string;
  id: number;
}

export function flattenEvolution(chain: any): EvoNode[] {
  const nodes: EvoNode[] = [];
  const walk = (node: any) => {
    const id = Number(node.species.url.split("/").filter(Boolean).pop());
    nodes.push({ name: node.species.name, id });
    node.evolves_to?.forEach(walk);
  };
  walk(chain);
  return nodes;
}

export const spriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
