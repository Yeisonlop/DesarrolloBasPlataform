import React from 'react';
import '../App.css';

function Menu() {
  return (
    <nav className="menu">
      <div className="menu-logo">
        <span className="logo-icon">♪</span>
        <h2>SoundStage</h2>
      </div>
      <div className="menu-links">
        <a href="#inicio">Inicio</a>
        <a href="#artistas">Artistas</a>
        <a href="#contacto">Contacto</a>
      </div>
    </nav>
  );
}

export default Menu;