// ===============================================================
//  PURPOSE: Root component for the React application.
//  Handles routing and top-level layout with navigation links.
// ===============================================================

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListView from "./components/ListView";
import GalleryView from "./components/GalleryView";
import DetailView from "./components/DetailView";
import "./App.css";

// --- Application Wrapper and Router Configuration ---
const App: React.FC = () => {
  return (
    <BrowserRouter basename="/mp2-CS409-02" >
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Pokémon Explorer</h1>

          <nav className="nav-under-title">
            <Link to="/" className="nav-link">Search</Link>
            <Link to="/gallery" className="nav-link">Gallery</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<ListView />} />
            <Route path="/gallery" element={<GalleryView />} />
            <Route path="/detail/:id" element={<DetailView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;