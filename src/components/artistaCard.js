import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

function ArtistaCard({ artista }) {
  return (
    <HoverCard.Root>

      <HoverCard.Trigger asChild>
        <div className="card-container">

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
              <button>Play</button>
              </a>
            </div>

          </div>

        </div>
      </HoverCard.Trigger>

    </HoverCard.Root>
  );
}

export default ArtistaCard;