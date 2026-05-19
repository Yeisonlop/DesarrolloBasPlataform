import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../App.css";

function Menu() {
  const { cantidad } = useCart();

  return (
    <nav className="menu">
      <div className="menu-logo">
        <span className="logo-icon">♪</span>
        <h2>SOUNDSTAGE</h2>
      </div>

      <div className="menu-links">
        <Link to="/">Inicio</Link>
        <Link to="/artistas">Artistas</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/merch">Merch</Link>

<Link to="/carrito" className="carrito-nav">
  {cantidad > 0 && (
    <span className="badge-carrito">{cantidad}</span>
  )}
  <span className="texto-carrito">Carrito</span>
</Link>
      </div>
    </nav>
  );
}

export default Menu;