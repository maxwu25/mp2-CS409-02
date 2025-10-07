// ===============================================================
//  PURPOSE: Defines data fetching logic and the Pokemon interface.
//  Contains API integration using Axios to fetch data from PokeAPI.
// ===============================================================

import axios from "axios";

// --- Interface Definition for Pokemon Data ---
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1302";
export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
  image: string;
}

// --- Fetch All Pokémon and Map Detailed Data ---
export const fetchData = async (): Promise<Pokemon[]> => {
  try {
    const res = await axios.get(API_URL);
    const results = res.data.results;

    const detailed = await Promise.all(
      results.map(async (item: any) => {
        const detail = await axios.get(item.url);
        const d = detail.data;

        return {
          id: d.id,
          name: d.name,
          types: d.types.map((t: any) => t.type.name),
          abilities: d.abilities.map((a: any) => a.ability.name),
          stats: {
            hp: d.stats.find((s: any) => s.stat.name === "hp").base_stat,
            attack: d.stats.find((s: any) => s.stat.name === "attack").base_stat,
            defense: d.stats.find((s: any) => s.stat.name === "defense").base_stat,
          },
          image: d.sprites.front_default,
        };
      })
    );

    return detailed;
  } catch (err) {
    console.error("❌ API Error:", err);
    return [];
  }
};

