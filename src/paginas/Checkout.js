import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { carrito, limpiar } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    metodo: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const procesarPago = () => {
    if (!form.nombre || !form.direccion || !form.ciudad || !form.metodo) {
      setError("Completa todos los campos");
      return;
    }

    limpiar();

    if (form.metodo === "exitoso") {
      navigate("/exito");
    } else {
      navigate("/fallo");
    }
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="checkout">
      <h2 className="checkout-titulo">Finalizar compra</h2>
      <h3 className="checkout-total">Total a pagar: ${total}</h3>

      {error && <p className="error-msg">{error}</p>}

      <div className="form-group">
        <input
          name="nombre"
          placeholder="Nombre completo"
          onChange={handleChange}
          className="checkout-input"
        />
      </div>

      <div className="form-group">
        <input
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
          className="checkout-input"
        />
      </div>

      <div className="form-group">
        <input
          name="ciudad"
          placeholder="Ciudad"
          onChange={handleChange}
          className="checkout-input"
        />
      </div>

      <h4 className="checkout-subtitulo">Método de pago</h4>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="metodo"
            value="rechazado"
            onChange={handleChange}
          />
          Pago rechazado
        </label>
        <label>
          <input
            type="radio"
            name="metodo"
            value="exitoso"
            onChange={handleChange}
          />
          Pago exitoso
        </label>
      </div>

      <button className="btn-comprar" onClick={procesarPago}>
        Confirmar pago
      </button>
    </div>
  );
}

export default Checkout;
