import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();
const API = "https://soundstage-backend.onrender.com/api";

export function CartProvider({ children, token }) {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito del backend al iniciar sesión
  useEffect(() => {
    if (token) {
      fetch(`${API}/carrito`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.items && data.items.length > 0) setCarrito(data.items);
        })
        .catch(() => {});
    } else {
      setCarrito([]);
    }
  }, [token]);

  const sincronizar = useCallback(
    (nuevoCarrito) => {
      if (token) {
        fetch(`${API}/carrito`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: nuevoCarrito }),
        }).catch(() => {});
      }
    },
    [token]
  );

  const agregar = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      const nuevo = existe
        ? prev.map((p) =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
          )
        : [...prev, { ...producto, cantidad: 1 }];
      sincronizar(nuevo);
      return nuevo;
    });
  };

  const eliminar = (id) => {
    setCarrito((prev) => {
      const nuevo = prev.filter((p) => p.id !== id);
      sincronizar(nuevo);
      return nuevo;
    });
  };

  const restar = (id) => {
    setCarrito((prev) => {
      const nuevo = prev
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
        .filter((p) => p.cantidad > 0);
      sincronizar(nuevo);
      return nuevo;
    });
  };

  const limpiar = () => {
    setCarrito([]);
    sincronizar([]);
  };

  const cantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregar, eliminar, restar, limpiar, cantidad }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);