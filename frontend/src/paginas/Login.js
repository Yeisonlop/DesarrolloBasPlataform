import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, registro } = useAuth();
  const navigate = useNavigate();
  const [modo, setModo] = useState("login"); // "login" | "registro"
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirmar: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      if (modo === "login") {
        await login(form.email, form.password);
      } else {
        if (!form.nombre.trim()) throw new Error("El nombre es obligatorio");
        if (form.password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres");
        if (form.password !== form.confirmar) throw new Error("Las contraseñas no coinciden");
        await registro(form.nombre, form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-icon">♪</span>
          <h1>SOUNDSTAGE</h1>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${modo === "login" ? "activo" : ""}`}
            onClick={() => { setModo("login"); setError(""); }}
          >
            Iniciar sesión
          </button>
          <button
            className={`login-tab ${modo === "registro" ? "activo" : ""}`}
            onClick={() => { setModo("registro"); setError(""); }}
          >
            Registrarse
          </button>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          {modo === "registro" && (
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {modo === "registro" && (
            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmar"
                value={form.confirmar}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <button type="submit" className="btn-enviar" disabled={cargando}>
            {cargando
              ? "Cargando..."
              : modo === "login"
              ? "Entrar"
              : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;