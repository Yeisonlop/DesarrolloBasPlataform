import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth, API } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { carrito, limpiar } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ nombre: "", direccion: "", ciudad: "", metodo: "" });
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const procesarPago = async () => {
    if (!form.nombre || !form.direccion || !form.ciudad || !form.metodo) {
      setError("Completa todos los campos");
      return;
    }

    setProcesando(true);

    // Si hay sesión, guardar pedido en backend
    if (token && form.metodo === "exitoso") {
      try {
        await fetch(`${API}/pedidos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: carrito,
            total,
            nombre_envio: form.nombre,
            direccion: form.direccion,
            ciudad: form.ciudad,
          }),
        });
      } catch (e) {
        console.error("Error guardando pedido:", e);
      }
    }

    limpiar();

    if (form.metodo === "exitoso") {
      navigate("/exito");
    } else {
      navigate("/fallo");
    }
    setProcesando(false);
  };

  return (
    <div className="checkout">
      <h2 className="checkout-titulo">Finalizar compra</h2>
      <h3 className="checkout-total">Total a pagar: ${total}</h3>

      {!token && (
        <div className="checkout-aviso">
          💡 <a href="/login">Inicia sesión</a> para guardar tu historial de compras
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}

      <div className="form-group">
        <input name="nombre" placeholder="Nombre completo" onChange={handleChange} className="checkout-input" />
      </div>
      <div className="form-group">
        <input name="direccion" placeholder="Dirección" onChange={handleChange} className="checkout-input" />
      </div>
      <div className="form-group">
        <input name="ciudad" placeholder="Ciudad" onChange={handleChange} className="checkout-input" />
      </div>

      <h4 className="checkout-subtitulo">Método de pago</h4>
      <div className="radio-group">
        <label>
          <input type="radio" name="metodo" value="rechazado" onChange={handleChange} />
          Pago rechazado
        </label>
        <label>
          <input type="radio" name="metodo" value="exitoso" onChange={handleChange} />
          Pago exitoso
        </label>
      </div>

      <button className="btn-comprar" onClick={procesarPago} disabled={procesando}>
        {procesando ? "Procesando..." : "Confirmar pago"}
      </button>
    </div>
  );
}

export default Checkout;