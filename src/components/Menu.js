import React from 'react';
import '../App.css';

function Menu() {
  return (
    <nav className="menu">
      <h2>Mi Página</h2>
      <div>
        <a href="#inicio">Inicio</a>
        <a href="#acerca de">Acerca de</a>
        <a href="#contacto">Contacto</a>
      </div>
    </nav>
  );
}

export default Menu;