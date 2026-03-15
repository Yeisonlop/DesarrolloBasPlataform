import React from "react";
import ArtistaCard from "../components/artistaCard";

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
    spotify: "https://open.spotify.com/intl-es/artist/4q3ewBCX7sLwd24euuV69X?si=ZfoAE_DLQAaNkEU_7SScLw"
  },
  {
    nombre: "Drake",
    edad: 37,
    genero: "Hip Hop / R&B",
    descripcion: "Artista canadiense reconocido mundialmente.",
    imagen: Drake,
    spotify: "https://open.spotify.com/intl-es/artist/3TVXtAsR1Inumwj472S9r4?si=jPebApXjRqOzkDz8Xv_yiA"
  },
  {
    nombre: "The Weeknd",
    edad: 34,
    genero: "Pop / R&B",
    descripcion: "Conocido por su estilo único y producciones innovadoras.",
    imagen: TheWeeknd,
    spotify: "https://open.spotify.com/intl-es/artist/1Xyo4u8uXC1ZmMpatF05PJ?si=HHw569qvT3el1thNkTqYNQ"
  },

  {
  nombre: "Harry Styles",
  edad: 30,
  genero: "Pop / Pop Rock",
  descripcion: "Cantante y compositor británico reconocido por su carrera como solista después de One Direction.",
  imagen: HarryStyles,
  spotify: "https://open.spotify.com/intl-es/artist/6KImCVD70vtIoJWnq6nGn3?si=ygOO9J9NQGycaRLI6c60iw"
  },

  {
  nombre: "Feid",
  edad: 32,
  genero: "Reggaeton / Música Urbana",
  descripcion: "Cantante y compositor colombiano conocido por su estilo fresco dentro del reggaetón dentro de la música urbana.",
  imagen: Feid,
  spotify: "https://open.spotify.com/intl-es/artist/2LRoIwlKmHjgvigdNGBHNo?si=pY6n3MgMQUSTwmQ6nk-sWw"

  },

  {
  nombre: "Karol G",
  edad: 33,
  genero: "Reggaetón / Pop Latino",
  descripcion: "Artista colombiana ganadora de premios internacionales y una de las voces más influyentes del género urbano.",
  imagen: KarolG,
  spotify: "https://open.spotify.com/intl-es/artist/790FomKkXshlbRYZFtlgla?si=Ry61E0-uSsC5wS7UtM9faQ"
  }


];

function Artistas() {
  return (
    <div className="galeria">
      {artistas.map((a) => (
        <ArtistaCard key={a.nombre} artista={a} />
      ))}
    </div>
  );
}

export default Artistas;