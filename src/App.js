import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Carrusel from "./components/Carrusel";
import Links from "./components/links";
import Artistas from "./paginas/artistas";

import "./App.css";

function Inicio() {
  const [indiceArtista, setIndiceArtista] = useState(0);

  // Estado del formulario como objeto
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  // Estado de errores como objeto
  const [errores, setErrores] = useState({});

  // Estado de éxito al enviar
  const [enviado, setEnviado] = useState(false);

  // Evento onChange — actualiza el objeto formulario
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
    // Limpia el error del campo al escribir
    setErrores({ ...errores, [e.target.name]: "" });
  };

  // Validaciones
  const validar = () => {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!formulario.email.trim()) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) {
      nuevosErrores.email = "Ingresa un email válido.";
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio.";
    } else if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    return nuevosErrores;
  };

  // Evento onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresEncontrados = validar();

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }

    // Envío exitoso
    setEnviado(true);
    setFormulario({ nombre: "", email: "", mensaje: "" });
    setErrores({});

    // Oculta el mensaje de éxito después de 4 segundos
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <>
      <Carrusel onCambio={setIndiceArtista} />

      <div className="contenido">
        <section className="bienvenida">
          <h2>Descubre tu próximo artista favorito</h2>
          <p>
            Explora los artistas del momento y escúchalos directamente en Spotify.
          </p>
        </section>

        <Links indiceArtista={indiceArtista} />

        {/* ── FORMULARIO DE CONTACTO ── */}
        <section className="contacto-section">
          <h2 className="contacto-titulo">Contáctanos</h2>
          <p className="contacto-subtitulo">
            ¿Tienes sugerencias de artistas o preguntas? Escríbenos.
          </p>

          {enviado && (
            <div className="mensaje-exito">
              ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
            </div>
          )}

          <form className="formulario" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre completo"
                value={formulario.nombre}
                onChange={handleChange}
                className={errores.nombre ? "input-error" : ""}
              />
              {errores.nombre && (
                <span className="error-msg">{errores.nombre}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                value={formulario.email}
                onChange={handleChange}
                className={errores.email ? "input-error" : ""}
              />
              {errores.email && (
                <span className="error-msg">{errores.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
                value={formulario.mensaje}
                onChange={handleChange}
                className={errores.mensaje ? "input-error" : ""}
              />
              {errores.mensaje && (
                <span className="error-msg">{errores.mensaje}</span>
              )}
            </div>

            <button type="submit" className="btn-enviar">
              Enviar mensaje
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/artistas" element={<Artistas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;