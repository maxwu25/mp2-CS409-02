// ===============================================================
//  PURPOSE: Displays a searchable and sortable list of Pokémon.
//  Allows users to filter by name or ID, and click a Pokémon
//  to view detailed info.
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
        default:
          return i.name.toLowerCase().startsWith(query);
      }
    })
    .sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      switch (sortBy) {
        case "id":
          return (a.id - b.id) * dir;
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
                <h3>
                  #{item.id} {item.name}
                </h3>
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
