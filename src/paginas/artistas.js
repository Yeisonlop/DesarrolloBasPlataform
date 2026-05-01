import React, { useState, useEffect } from "react";
import ArtistaCard from "../components/artistaCard";
import Buscador from "../components/buscadorA";
import { useNavigate } from "react-router-dom";

import BadBunny from "../imagenes/BadBunny.jpg";
import Drake from "../imagenes/Drake.jpg";
import TheWeeknd from "../imagenes/TheWeeknd.jpg";
import HarryStyles from "../imagenes/HarryStyles.jpg";
import Feid from "../imagenes/Feid.jpg";
import KarolG from "../imagenes/KarolG.jpg";

const artistas = [
  { nombre: "Bad Bunny", edad: 30, genero: "Trap / Reggaetón", descripcion: "Uno de los artistas más influyentes.", imagen: BadBunny, spotify: "https://open.spotify.com/intl-es/artist/4q3ewBCX7sLwd24euuV69X" },
  { nombre: "Drake", edad: 37, genero: "Hip Hop / R&B", descripcion: "Artista canadiense.", imagen: Drake, spotify: "https://open.spotify.com/intl-es/artist/3TVXtAsR1Inumwj472S9r4" },
  { nombre: "The Weeknd", edad: 34, genero: "Pop / R&B", descripcion: "Estilo único.", imagen: TheWeeknd, spotify: "https://open.spotify.com/intl-es/artist/1Xyo4u8uXC1ZmMpatF05PJ" },
  { nombre: "Harry Styles", edad: 30, genero: "Pop", descripcion: "Cantante británico.", imagen: HarryStyles, spotify: "https://open.spotify.com/intl-es/artist/6KImCVD70vtIoJWnq6nGn3" },
  { nombre: "Feid", edad: 32, genero: "Reggaeton", descripcion: "Artista colombiano.", imagen: Feid, spotify: "https://open.spotify.com/intl-es/artist/2LRoIwlKmHjgvigdNGBHNo" },
  { nombre: "Karol G", edad: 33, genero: "Reggaetón", descripcion: "Artista internacional.", imagen: KarolG, spotify: "https://open.spotify.com/intl-es/artist/790FomKkXshlbRYZFtlgla" }
];

function Artistas() {
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  const navigate = useNavigate();

  // LOCAL STORAGE
  useEffect(() => {
    const data = localStorage.getItem("favoritos");
    if (data) setFavoritos(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // AGREGAR
  const agregarFavorito = (artista) => {
    if (!favoritos.find(a => a.nombre === artista.nombre)) {
      setFavoritos([...favoritos, artista]);
    }
  };

  // FILTRO
  const artistasFiltrados = artistas.filter((a) =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    a.genero.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenido">
      <h2 className="titulo-artistas">Nuestros Artistas</h2>

      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* GALERÍA COMPLETA */}
      <div className="galeria">
        {artistasFiltrados.map((a) => (
          <ArtistaCard key={a.nombre} artista={a} />
        ))}
      </div>

      {/* CANASTA */}
      <div
        className="canasta"
        onDrop={(e) => {
          e.preventDefault();
          const data = JSON.parse(e.dataTransfer.getData("artista"));
          agregarFavorito(data);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => navigate("/favoritos")}
      >
        <h3>🎧 Tus favoritos</h3>

        {favoritos.length === 0 ? (
          <p>Arrastra artistas aquí</p>
        ) : (
          <div className="canasta-preview">
            {favoritos.map((a, index) => (
              <img key={index} src={a.imagen} alt={a.nombre} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Artistas;