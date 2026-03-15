import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Menu() {
  return (
    <nav className="menu">
      <div className="menu-logo">
        <span className="logo-icon">♪</span>
        <h2>SoundStage</h2>
      </div>

      <div className="menu-links">
        <Link to="/">Inicio</Link>
        <Link to="/artistas">Artistas</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
    </nav>
  );
}

export default Menu;