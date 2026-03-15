import React from "react";
import ArtistaCard from "../components/artistaCard";

import imagen1 from "../imagenes/imagen1.jpg";
import imagen2 from "../imagenes/imagen2.jpg";
import imagen3 from "../imagenes/imagen3.jpg";

const artistas = [
  { nombre: "Artista 1", imagen: imagen1, descripcion: "Pop/Rock" },
  { nombre: "Artista 2", imagen: imagen2, descripcion: "Reggaetón" },
  { nombre: "Artista 3", imagen: imagen3, descripcion: "Electrónica" },
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