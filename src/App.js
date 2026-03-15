import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Carrusel from "./components/Carrusel";
import Links from "./components/links";
import Artistas from "./paginas/artistas";

import "./App.css";

function Inicio() {
  const [indiceArtista, setIndiceArtista] = useState(0);

  return (
    <>
      <Carrusel onCambio={setIndiceArtista} />

      <div className="contenido">
        <section className="bienvenida">
          <h2>Descubre tu próximo artista favorito</h2>
          <p>
            Explora los artistas del momento y escúchalos directamente en Spotify.
          </p>
        </section>

        <Links indiceArtista={indiceArtista} />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/artistas" element={<Artistas />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;