import React, { useState, useEffect, useRef } from "react";
import ArtistaCard from "../components/artistaCard";
import Buscador from "../components/buscadorA";
import { useNavigate } from "react-router-dom";

import BadBunny from "../imagenes/BadBunny.jpg";
import Drake from "../imagenes/Drake.jpg";
import TheWeeknd from "../imagenes/TheWeeknd.jpg";
import HarryStyles from "../imagenes/HarryStyles.jpg";
import Feid from "../imagenes/Feid.jpg";
import KarolG from "../imagenes/KarolG.jpg";
import Tr1 from "../imagenes/Tr1.jpg";
import BillieEilish from "../imagenes/BillieEilish.jpg";
import Shakira from "../imagenes/Shakira.jpg";
import MykeTowers from "../imagenes/MykeTowers.jpg";
import MiloJ from "../imagenes/MiloJ.jpg";
import MonLaferte from "../imagenes/MonLaferte.jpg";
import Arcangel from "../imagenes/Arcangel.jpg";
import JuniorH from "../imagenes/JuniorH.jpg";

const artistas = [
  { nombre: "Bad Bunny", edad: 30, genero: "Trap / Reggaetón", descripcion: "Uno de los artistas más influyentes.", imagen: BadBunny, spotify: "https://open.spotify.com/intl-es/artist/4q3ewBCX7sLwd24euuV69X" },
  { nombre: "Drake", edad: 37, genero: "Hip Hop / R&B", descripcion: "Artista canadiense.", imagen: Drake, spotify: "https://open.spotify.com/intl-es/artist/3TVXtAsR1Inumwj472S9r4" },
  { nombre: "The Weeknd", edad: 34, genero: "Pop / R&B", descripcion: "Estilo único.", imagen: TheWeeknd, spotify: "https://open.spotify.com/intl-es/artist/1Xyo4u8uXC1ZmMpatF05PJ" },
  { nombre: "Harry Styles", edad: 30, genero: "Pop", descripcion: "Cantante británico.", imagen: HarryStyles, spotify: "https://open.spotify.com/intl-es/artist/6KImCVD70vtIoJWnq6nGn3" },
  { nombre: "Feid", edad: 32, genero: "Reggaetón", descripcion: "Artista colombiano.", imagen: Feid, spotify: "https://open.spotify.com/intl-es/artist/2LRoIwlKmHjgvigdNGBHNo" },
  { nombre: "Karol G", edad: 33, genero: "Reggaetón", descripcion: "Artista internacional.", imagen: KarolG, spotify: "https://open.spotify.com/intl-es/artist/790FomKkXshlbRYZFtlgla" },
  { nombre: "Trueno", edad: 24, genero: "Rap / Urbano", descripcion: "Talento explosivo.", imagen: Tr1, spotify: "https://open.spotify.com/intl-es/artist/2x7PC78TmgqpEIjaGAZ0Oz?si=856e8e6ca78449d8" },
  { nombre: "Billie Eilish", edad: 24, genero: "Pop alternativo / Electropop", descripcion: "Estilo único", imagen: BillieEilish, spotify: "https://open.spotify.com/intl-es/artist/6qqNVTkY8uBg9cP3Jd7DAH?si=uHrT_1JRQDWKZTR-h4O9zg" },
  { nombre: "Shakira", edad: 49, genero: "Pop latino / Reguetón / Rock", descripcion: "Ícono global", imagen: Shakira, spotify: "https://open.spotify.com/intl-es/artist/0EmeFodog0BfCgMzAIvKQp?si=cgnei9TcRZKjQEc7OokS4g" },
  { nombre: "Myke Towers", edad: 32, genero: "Reguetón / Trap / Pop urbano", descripcion: "Versatilidad urbana", imagen: MykeTowers, spotify: "https://open.spotify.com/intl-es/artist/7iK8PXO48WeuP03g8YR51W?si=4085407de0564f2a" },
  { nombre: "Milo J", edad: 19, genero: "Trap / R&B / Fusión", descripcion: "Promesa argentina", imagen: MiloJ, spotify: "https://open.spotify.com/intl-es/artist/19HM5j0ULGSmEoRcrSe5x3?si=t6yfUjNMRPWMDqlFV0bNhg" },
  { nombre: "Mon Laferte", edad: 42, genero: "Bolero / Rock alternativo / Pop", descripcion: "Voz poderosa", imagen: MonLaferte, spotify: "https://open.spotify.com/intl-es/artist/4boI7bJtmB1L3b1cuL75Zr?si=Ch9uQXElSnykYKHBaxP7GA" },     
  { nombre: "Arcangel", edad: 40, genero: "Reguetón / Trap latino / Rap", descripcion: "La Maravilla", imagen: Arcangel, spotify: "https://open.spotify.com/intl-es/artist/4SsVbpTthjScTS7U2hmr1X?si=yYYsC-0oR0-60Qs7pgb4Gg" },
  { nombre: "Junior H", edad: 25, genero: "Corridos tumbados / Trap latino", descripcion: "Estrella emergente", imagen: JuniorH, spotify: "https://open.spotify.com/intl-es/artist/7Gi6gjaWy3DxyilpF1a8Is?si=B-RHnScYT7uuT1n1dcd0lw" }   
];


function Artistas() {
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const primeraCarga = useRef(true);

  const navigate = useNavigate();

  // CARGAR desde LocalStorage
  useEffect(() => {
    const data = localStorage.getItem("favoritos");
    if (data) setFavoritos(JSON.parse(data));
  }, []);

  // GUARDAR en LocalStorage (evitando primera ejecución)
  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
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

      <div className="galeria">
        {artistasFiltrados.map((a) => (
          <ArtistaCard key={a.nombre} artista={a} />
        ))}
      </div>

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
            {favoritos.map((a) => (
              <img key={a.nombre} src={a.imagen} alt={a.nombre} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Artistas;