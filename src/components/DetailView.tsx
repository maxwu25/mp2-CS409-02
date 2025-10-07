// ===============================================================
//  PURPOSE: Displays detailed information of a selected Pokémon.
//  Includes navigation (Previous/Next) to move between entries.
// ===============================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData, Pokemon } from "../api";
import styles from "./DetailView.module.css";

// --- Main DetailView Component ---
const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<Pokemon[]>([]);
  const navigate = useNavigate();
  
  // --- Fetch Pokémon Data ---
  useEffect(() => {
    fetchData().then(setItems);
  }, []);

  if (!items.length) return <p>Loading...</p>;

  const currentId = parseInt(id || "1", 10);
  const currentIndex = items.findIndex((p) => p.id === currentId);
  if (currentIndex === -1) return <p>Pokémon not found.</p>;

  const item = items[currentIndex];
  
  // --- Navigation Handlers ---
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    navigate(`/detail/${items[prevIndex].id}`);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    navigate(`/detail/${items[nextIndex].id}`);
  };
  
  // --- Render Pokémon Detail Card ---
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={item.image} alt={item.name} />
        </div>

        <h2 className={styles.cardTitle}>
          #{item.id} {item.name.toUpperCase()}
        </h2>

        <p className={styles.info}>
          <strong>Type:</strong> {item.types.join(", ")}
        </p>
        <p className={styles.info}>
          <strong>Abilities:</strong> {item.abilities.join(", ")}
        </p>
        <p className={styles.stats}>
          <strong>HP:</strong> {item.stats.hp} | <strong>Attack:</strong>{" "}
          {item.stats.attack} | <strong>Defense:</strong> {item.stats.defense}
        </p>

        <div className={styles.buttons}>
          <button onClick={handlePrev} className={styles.button}>
            Previous
          </button>
          <button onClick={handleNext} className={styles.button}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;

