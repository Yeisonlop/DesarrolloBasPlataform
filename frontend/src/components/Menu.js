import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function Menu() {
  const { cantidad } = useCart();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuUsuario, setMenuUsuario] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuUsuario(false);
    navigate("/");
  };

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
          {cantidad > 0 && <span className="badge-carrito">{cantidad}</span>}
          <span className="texto-carrito">Carrito</span>
        </Link>

        {usuario ? (
          <div className="menu-usuario" onClick={() => setMenuUsuario(!menuUsuario)}>
            <span className="usuario-avatar">
              {usuario.nombre.charAt(0).toUpperCase()}
            </span>
            <span className="usuario-nombre">{usuario.nombre.split(" ")[0]}</span>
            {menuUsuario && (
              <div className="dropdown-usuario">
                <Link to="/historial" onClick={() => setMenuUsuario(false)}>
                  📦 Mis compras
                </Link>
                <button onClick={handleLogout}>🚪 Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn-login-nav">Entrar</Link>
        )}
      </div>
    </nav>
  );
}

export default Menu;