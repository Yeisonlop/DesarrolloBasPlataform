import React, { useState } from "react";
import ArtistaCard from "../components/artistaCard";
import Buscador from "../components/buscadorA";

import BadBunny from "../imagenes/BadBunny.jpg";
import Drake from "../imagenes/Drake.jpg";
import TheWeeknd from "../imagenes/TheWeeknd.jpg";
import HarryStyles from "../imagenes/HarryStyles.jpg";
import Feid from "../imagenes/Feid.jpg";
import KarolG from "../imagenes/KarolG.jpg";

const artistas = [
  {
    nombre: "Bad Bunny",
    edad: 30,
    genero: "Trap / Reggaetón",
    descripcion: "Uno de los artistas más influyentes de la música urbana.",
    imagen: BadBunny,
    spotify: "https://open.spotify.com/intl-es/artist/4q3ewBCX7sLwd24euuV69X"
  },
  {
    nombre: "Drake",
    edad: 37,
    genero: "Hip Hop / R&B",
    descripcion: "Artista canadiense reconocido mundialmente.",
    imagen: Drake,
    spotify: "https://open.spotify.com/intl-es/artist/3TVXtAsR1Inumwj472S9r4"
  },
  {
    nombre: "The Weeknd",
    edad: 34,
    genero: "Pop / R&B",
    descripcion: "Conocido por su estilo único y producciones innovadoras.",
    imagen: TheWeeknd,
    spotify: "https://open.spotify.com/intl-es/artist/1Xyo4u8uXC1ZmMpatF05PJ"
  },
  {
    nombre: "Harry Styles",
    edad: 30,
    genero: "Pop / Pop Rock",
    descripcion: "Cantante y compositor británico reconocido por su carrera como solista.",
    imagen: HarryStyles,
    spotify: "https://open.spotify.com/intl-es/artist/6KImCVD70vtIoJWnq6nGn3"
  },
  {
    nombre: "Feid",
    edad: 32,
    genero: "Reggaeton / Música Urbana",
    descripcion: "Cantante y compositor colombiano conocido por su estilo fresco.",
    imagen: Feid,
    spotify: "https://open.spotify.com/intl-es/artist/2LRoIwlKmHjgvigdNGBHNo"
  },
  {
    nombre: "Karol G",
    edad: 33,
    genero: "Reggaetón / Pop Latino",
    descripcion: "Artista colombiana ganadora de premios internacionales.",
    imagen: KarolG,
    spotify: "https://open.spotify.com/intl-es/artist/790FomKkXshlbRYZFtlgla"
  }
];

function Artistas() {
  const [busqueda, setBusqueda] = useState("");

  // Objeto que guarda estadísticas de la búsqueda
  const estadoBusqueda = {
    terminoBuscado: busqueda,
    totalArtistas: artistas.length,
    resultados: artistas.filter((a) =>
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.genero.toLowerCase().includes(busqueda.toLowerCase())
    ).length
  };

  const artistasFiltrados = artistas.filter((a) =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    a.genero.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenido">
      <h2 className="titulo-artistas">Nuestros Artistas</h2>

      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Muestra resultados si hay búsqueda activa */}
      {busqueda && (
        <p className="resultados-busqueda">
          {estadoBusqueda.resultados > 0
            ? `Se encontraron ${estadoBusqueda.resultados} resultado(s) para "${estadoBusqueda.terminoBuscado}"`
            : `No se encontraron resultados para "${estadoBusqueda.terminoBuscado}"`}
        </p>
      )}

      <div className="galeria">
        {artistasFiltrados.length > 0 ? (
          artistasFiltrados.map((a) => (
            <ArtistaCard key={a.nombre} artista={a} />
          ))
        ) : (
          <div className="sin-resultados">
            <p>No encontramos ningún artista con ese nombre o género.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Artistas;