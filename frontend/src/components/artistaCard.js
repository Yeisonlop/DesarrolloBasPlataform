import React, { useRef } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

function ArtistaCard({ artista }) {

  // ─────────────────────
  // REFERENCIA DEL AUDIO
  // ─────────────────────
  const audioRef = useRef(null);

  // ─────────────────────
  // DRAG & DROP
  // ─────────────────────
  const handleDragStart = (e) => {

    e.dataTransfer.setData(
      "artista",
      JSON.stringify(artista)
    );
  };

  // ─────────────────────
  // AGREGAR A FAVORITOS
  // ─────────────────────
  const agregarAFavoritos = () => {

    try {

      const data =
        localStorage.getItem("favoritos");

      const favoritos = data
        ? JSON.parse(data)
        : [];

      const existe = favoritos.some(
        f => f.nombre === artista.nombre
      );

      if (!existe) {

        const nuevos = [
          ...favoritos,
          artista
        ];

        localStorage.setItem(
          "favoritos",
          JSON.stringify(nuevos)
        );

        alert(
          "Artista agregado a favoritos"
        );

      } else {

        alert(
          "Este artista ya está en favoritos"
        );
      }

    } catch (error) {

      console.error(
        "Error al guardar favorito:",
        error
      );
    }
  };

  // ─────────────────────
  // REPRODUCIR PREVIEW
  // ─────────────────────
  const reproducirPreview = async () => {

    // Verificar previews
    if (
      !artista.previews ||
      artista.previews.length === 0
    ) {
      return;
    }

    try {

      // Escoger canción aleatoria
      const previewRandom =
        artista.previews[
          Math.floor(
            Math.random() *
            artista.previews.length
          )
        ];

      // Detener audio anterior
      if (audioRef.current) {

        audioRef.current.pause();

        audioRef.current.currentTime = 0;
      }

      // Crear nuevo audio
      const audio =
        new Audio(previewRandom);

      audio.volume = 0.4;

      audioRef.current = audio;

      // Reproducir preview
      await audio.play();

      // Detener después de 10 segundos
      setTimeout(() => {

        if (audioRef.current) {

          audioRef.current.pause();

          audioRef.current.currentTime = 0;
        }

      }, 10000);

    } catch (error) {

      console.log(
        "Autoplay bloqueado por navegador"
      );
    }
  };

  // ─────────────────────
  // DETENER PREVIEW
  // ─────────────────────
  const detenerPreview = () => {

    if (audioRef.current) {

      audioRef.current.pause();

      audioRef.current.currentTime = 0;
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

          {/* IMAGEN ARTISTA */}
          <img
            src={artista.imagen}
            alt={artista.nombre}
            className="artista-img"
          />

          {/* OVERLAY */}
          <div className="hover-overlay">

            <h4>{artista.nombre}</h4>

            <p>
              <strong>Edad:</strong>
              {" "}
              {artista.edad}
            </p>

            <p>
              <strong>Género:</strong>
              {" "}
              {artista.genero}
            </p>

            <p>{artista.descripcion}</p>

            {/* BOTONES */}
            <div className="hover-buttons">

              {/* PLAY SPOTIFY + PREVIEW */}
              <a
                href={artista.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >

                <button

                  // Hover inicia preview
                  onMouseEnter={
                    reproducirPreview
                  }

                  // Salir detiene preview
                  onMouseLeave={
                    detenerPreview
                  }

                >
                  ▶ Play
                </button>

              </a>

              {/* FAVORITOS */}
              <button
                onClick={
                  agregarAFavoritos
                }
              >
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