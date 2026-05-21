import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Carrito() {
  const { carrito, agregar, restar, limpiar } = useCart();
  const navigate = useNavigate();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const finalizarCompra = () => {
    if (carrito.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="contenido">
      <h2>Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p>No hay productos aún</p>
      ) : (
        <>
          {carrito.map((p) => (
            <div key={p.id} className="playlist-item">
              <img src={p.imagenFront} alt={p.nombre} />
              <span>{p.nombre}</span>
              <span>${p.precio} x {p.cantidad}</span>
              <span>Subtotal: ${p.precio * p.cantidad}</span>

              <div className="acciones-cantidad">
                <button onClick={() => restar(p.id)}>-</button>
                <button onClick={() => agregar(p)}>+</button>
              </div>
            </div>
          ))}

          <h3>Total: ${total}</h3>

          <div className="carrito-botones">
            <button onClick={limpiar}>
              Vaciar carrito
            </button>

            <button
              onClick={finalizarCompra}
              className="btn-comprar"
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
