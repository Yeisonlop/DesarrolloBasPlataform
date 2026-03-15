import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

function ArtistaCard({ artista }) {
  return (
    <HoverCard.Root>
      {}
      <HoverCard.Trigger asChild>
        <div className="card-container">
          <img src={artista.imagen} alt={artista.nombre} className="artista-img" />

          {}
          <div className="hover-overlay">
            <h4>{artista.nombre}</h4>
            <p>{artista.descripcion}</p>
            <div className="hover-buttons">
              <button>Play</button>
            </div>
          </div>
        </div>
      </HoverCard.Trigger>
    </HoverCard.Root>
  );
}

export default ArtistaCard;