import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

const API = "https://soundstage-backend.onrender.com/api";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("ss_token") || null);
  const [cargando, setCargando] = useState(true);

  // Al montar, verificar si hay sesión activa
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("ss_token");
    if (tokenGuardado) {
      fetch(`${API}/auth/perfil`, {
        headers: { Authorization: `Bearer ${tokenGuardado}` },
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data) {
            setUsuario(data);
            setToken(tokenGuardado);
          } else {
            localStorage.removeItem("ss_token");
            setToken(null);
          }
        })
        .catch(() => {
          localStorage.removeItem("ss_token");
          setToken(null);
        })
        .finally(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
    localStorage.setItem("ss_token", data.token);
    setToken(data.token);
    setUsuario(data.usuario);
    return data;
  }, []);

  const registro = useCallback(async (nombre, email, password) => {
    const res = await fetch(`${API}/auth/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al registrarse");
    localStorage.setItem("ss_token", data.token);
    setToken(data.token);
    setUsuario(data.usuario);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ss_token");
    setToken(null);
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, cargando, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export { API };