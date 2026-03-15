import React, { useState } from 'react';
import Menu from './components/Menu';
import Carrusel from './components/Carrusel';
import Links from './components/links';
import './App.css';

function App() {
  const [indiceArtista, setIndiceArtista] = useState(0);

  return (
    <div>
      <Menu />
      <Carrusel onCambio={setIndiceArtista} />
      <div className="contenido">
        <section className="bienvenida">
          <h2>Descubre tu próximo artista favorito</h2>
          <p>Explora los artistas del momento y escúchalos directamente en Spotify.</p>
        </section>
        <Links indiceArtista={indiceArtista} />
      </div>
    </div>
  );
}

export default App;