import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

function ArtistaCard({ artista }) {

  const handleDragStart = (e) => {
    e.dataTransfer.setData("artista", JSON.stringify(artista));
  };

  const agregarAFavoritos = () => {
    try {
      const data = localStorage.getItem("favoritos");
      const favoritos = data ? JSON.parse(data) : [];

      const existe = favoritos.some(f => f.nombre === artista.nombre);

      if (!existe) {
        const nuevos = [...favoritos, artista];
        localStorage.setItem("favoritos", JSON.stringify(nuevos));
        alert("Artista agregado a favoritos");
      } else {
        alert("Este artista ya está en favoritos");
      }

    } catch (error) {
      console.error("Error al guardar favorito:", error);
    }
  };

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div
          className="card-container"
          draggable
          onDragStart={handleDragStart}
        >
          <img
            src={artista.imagen}
            alt={artista.nombre}
            className="artista-img"
          />

          <div className="hover-overlay">
            <h4>{artista.nombre}</h4>

            <p><strong>Edad:</strong> {artista.edad}</p>
            <p><strong>Género:</strong> {artista.genero}</p>
            <p>{artista.descripcion}</p>

            <div className="hover-buttons">
              <a href={artista.spotify} target="_blank" rel="noopener noreferrer">
                <button>▶ Play</button>
              </a>

          
              <button onClick={agregarAFavoritos}>
                ⭐ Favorito
              </button>
            </div>
          </div>
        </div>
      </HoverCard.Trigger>
    </HoverCard.Root>
  );
}

export default ArtistaCard;