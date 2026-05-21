import React from "react";

function Buscador({ busqueda, setBusqueda }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar artistas..."
        className="search-input"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className="search-button">🔍</button>
    </div>
  );
}

export default Buscador;