// ===============================================================
//  PURPOSE: Displays a searchable and sortable list of Pokémon.
//  Allows users to filter by name, type, ability, or stats, and
//  click a Pokémon to view detailed info.
// ===============================================================

import React, { useEffect, useState } from "react";
import { fetchData, Pokemon } from "../api";
import { useNavigate } from "react-router-dom"; 
import styles from "./ListView.module.css";

// --- Main ListView Component ---
const ListView: React.FC = () => {
  const [items, setItems] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate(); 

  // --- Fetch Pokémon Data on Mount ---
  useEffect(() => {
    fetchData().then(setItems);
  }, []);

  const handleSearch = () => {
    setSearched(true);
  };

  // --- Filter and Sort Logic ---
  const filtered = items
    .filter((i) => {
      const query = search.trim().toLowerCase();
      if (!query) return true;

      switch (sortBy) {
        case "id":
          return i.id.toString().startsWith(query);
        case "type":
          return i.types.some((t) => t.toLowerCase().startsWith(query));
        case "ability":
          return i.abilities.some((a) => a.toLowerCase().startsWith(query));
        case "hp":
          return i.stats.hp.toString().startsWith(query);
        case "attack":
          return i.stats.attack.toString().startsWith(query);
        case "defense":
          return i.stats.defense.toString().startsWith(query);
        default:
          return i.name.toLowerCase().startsWith(query);
      }
    })
    .sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      switch (sortBy) {
        case "id":
          return (a.id - b.id) * dir;
        case "hp":
          return (a.stats.hp - b.stats.hp) * dir;
        case "attack":
          return (a.stats.attack - b.stats.attack) * dir;
        case "defense":
          return (a.stats.defense - b.stats.defense) * dir;
        case "type":
          return (a.types[0] || "").localeCompare(b.types[0] || "") * dir;
        case "ability":
          return (a.abilities[0] || "").localeCompare(b.abilities[0] || "") * dir;
        default:
          return a.name.localeCompare(b.name) * dir;
      }
    });
  
  // --- Render List with Search and Sorting Controls ---
  return (
    <div className={styles.container}>
      <div className={styles.searchPanel}>
        <input
          type="text"
          placeholder="Search for Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.searchBtn}>
          Search
        </button>

        <div className={styles.sortRow}>
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="name">Name</option>
            <option value="id">ID</option>
            <option value="type">Type</option>
            <option value="ability">Ability</option>
            <option value="hp">HP</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
          </select>

          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                checked={sortAsc}
                onChange={() => setSortAsc(true)}
              />
              Ascending
            </label>
            <label>
              <input
                type="radio"
                checked={!sortAsc}
                onChange={() => setSortAsc(false)}
              />
              Descending
            </label>
          </div>
        </div>
      </div>

      {searched && (
        <ul className={styles.list}>
          {filtered.map((item) => (
            <li
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/detail/${item.id}`)} 
              tabIndex={0} 
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/detail/${item.id}`);
              }}
            >
              <img src={item.image} alt={item.name} />
              <div className={styles.cardInfo}>
                <h3>{item.name}</h3>
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <p className={styles.noResults}>No Pokémon found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ListView;
