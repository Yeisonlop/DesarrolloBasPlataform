import React from "react";

function Buscador() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar artistas..."
        className="search-input"
      />
      <button className="search-button">🔍</button>
    </div>
  );
}

export default Buscador;
