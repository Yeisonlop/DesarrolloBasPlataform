import React, { useEffect, useState } from "react";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem("favoritos");
      if (data) {
        setFavoritos(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error leyendo favoritos:", error);
      setFavoritos([]);
    }
  }, []);

  const eliminar = (nombre) => {
    const nuevos = favoritos.filter(a => a.nombre !== nombre);
    setFavoritos(nuevos);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
  };

  return (
    <div className="contenido">
      <h2 className="titulo-artistas">Tus artistas favoritos</h2>

      {favoritos.length === 0 ? (
        <p>No tienes favoritos aún</p>
      ) : (
        favoritos.map((a) => (
          <div key={a.nombre} className="playlist-item">
            <img src={a.imagen} alt={a.nombre} />
            <span>{a.nombre}</span>

            <div className="playlist-actions">
              <a href={a.spotify} target="_blank" rel="noopener noreferrer">
                <button>Play</button>
              </a>

              <button onClick={() => eliminar(a.nombre)}>❌</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Favoritos;