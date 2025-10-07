// ===============================================================
//  PURPOSE: Displays a gallery grid of Pokémon images.
//  Allows users to filter by Pokémon type using buttons.
// ===============================================================

import React, { useEffect, useState } from "react";
import { fetchData, Pokemon } from "../api";
import { Link } from "react-router-dom";
import styles from "./GalleryView.module.css";

// --- Available Pokémon Types for Filtering ---
const typeList = [
  "all", "normal", "fire", "water", "grass", "electric", "ice", "fighting",
  "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
  "dragon", "dark", "steel", "fairy"
];

// --- Main GalleryView Component ---
const GalleryView: React.FC = () => {
  const [items, setItems] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  
  // --- Fetch Pokémon Data ---
  useEffect(() => {
    fetchData().then(setItems);
  }, []);
  
  // --- Apply Type Filter ---
  const filtered =
    selectedType === "all"
      ? items
      : items.filter((p) => p.types.includes(selectedType));
  
  // --- Render Gallery Grid ---
  return (
    <div className={styles.container}>
      {/* Type Filter Buttons */}
      <div className={styles.typeButtons}>
        {typeList.map((type) => (
          <button
            key={type}
            className={`${styles.typeButton} ${
              selectedType === type ? styles.active : ""
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className={styles.galleryGrid}>
        {filtered.map((item) => (
          <Link key={item.id} to={`/detail/${item.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} />
            </div>
            <h3 className={styles.cardTitle}>{item.name}</h3>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.noResults}>No Pokémon found.</p>
      )}
    </div>
  );
};

export default GalleryView;
