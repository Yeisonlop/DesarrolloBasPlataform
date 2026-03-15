// src/App.js
import React from 'react';
import Menu from './components/Menu';
import Carrusel from './components/Carrusel';
import Links from './components/links';
import './App.css';

function App() {
  return (
    <div>
      <Menu />
      <Carrusel />

      <div className="contenido">
        <section className="bienvenida">
          <h2>Bienvenido a mi página</h2>
          <p>Esta es una página de ejemplo con React.</p>
        </section>

        <Links />
      </div>
    </div>
  );
}

export default App;