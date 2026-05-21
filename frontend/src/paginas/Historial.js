import React, { useEffect, useState } from "react";
import { useAuth, API } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Historial() {
  const { token, usuario } = useAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${API}/pedidos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setPedidos(Array.isArray(data) ? data : []);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [token, navigate]);

  if (cargando) return <div className="contenido"><p>Cargando historial...</p></div>;

  return (
    <div className="contenido">
      <h2 className="titulo-artistas">Historial de compras</h2>
      {usuario && <p className="subtitulo-historial">Cuenta: {usuario.email}</p>}

      {pedidos.length === 0 ? (
        <div className="historial-vacio">
          <p>No tienes compras registradas aún.</p>
          <button className="btn-enviar" onClick={() => navigate("/merch")}>
            Ir a la tienda
          </button>
        </div>
      ) : (
        <div className="historial-lista">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-header">
                <div>
                  <span className="pedido-num">Pedido #{pedido.id}</span>
                  <span className="pedido-fecha">
                    {new Date(pedido.created_at).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="pedido-total-badge">${pedido.total}</div>
              </div>

              <div className="pedido-info">
                <p>📦 Envío a: {pedido.nombre_envio} — {pedido.direccion}, {pedido.ciudad}</p>
              </div>

              <div className="pedido-items">
                {pedido.items.map((item) => (
                  <div key={item.id} className="pedido-item">
                    <span className="item-nombre">{item.nombre}</span>
                    <span className="item-detalle">
                      ${item.precio} × {item.cantidad} ={" "}
                      <strong>${item.precio * item.cantidad}</strong>
                    </span>
                  </div>
                ))}
              </div>

              <div className="pedido-estado">
                <span className={`estado-badge estado-${pedido.estado}`}>
                  ✓ {pedido.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historial;