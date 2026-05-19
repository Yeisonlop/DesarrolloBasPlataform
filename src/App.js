import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Carrusel from "./components/Carrusel";
import Links from "./components/links";
import Artistas from "./paginas/artistas";
import Favoritos from "./paginas/favoritos";
import Merch from "./paginas/merch";
import Carrito from "./paginas/carrito";
import Checkout from "./paginas/Checkout";
import Exito from "./paginas/Exito";
import Fallo from "./paginas/Fallo";

import { CartProvider } from "./context/CartContext";

import "./App.css";

function Inicio() {
  const [indiceArtista, setIndiceArtista] = useState(0);

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    genero: "",
    aceptar: false,
    generoUsuario: "",
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrores({ ...errores, [name]: "" });
  };

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

    if (!formulario.genero) {
      nuevosErrores.genero = "Selecciona un género musical.";
    }

    if (!formulario.generoUsuario) {
      nuevosErrores.generoUsuario = "Selecciona una opción.";
    }

    if (!formulario.aceptar) {
      nuevosErrores.aceptar = "Debes aceptar los términos.";
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const erroresEncontrados = validar();

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }

    setEnviado(true);

    setFormulario({
      nombre: "",
      email: "",
      mensaje: "",
      genero: "",
      aceptar: false,
      generoUsuario: "",
    });

    setErrores({});

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

        {/* FORMULARIO */}
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

            {/* Nombre */}
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className={errores.nombre ? "input-error" : ""}
              />
              {errores.nombre && (
                <span className="error-msg">{errores.nombre}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                className={errores.email ? "input-error" : ""}
              />
              {errores.email && (
                <span className="error-msg">{errores.email}</span>
              )}
            </div>

            {/* Select */}
            <div className="form-group">
              <label>Género musical favorito</label>
              <select
                name="genero"
                value={formulario.genero}
                onChange={handleChange}
                className={errores.genero ? "input-error" : ""}
              >
                <option value="">Seleccione</option>
                <option value="reggaeton">Reggaetón</option>
                <option value="pop">Pop</option>
                <option value="rap">Rap</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Electronica">Electrónica</option>
              </select>
              {errores.genero && (
                <span className="error-msg">{errores.genero}</span>
              )}
            </div>

            {/* Radio buttons */}
            <div className="form-group">
              <label>Género</label>

              <label>
                <input
                  type="radio"
                  name="generoUsuario"
                  value="hombre"
                  checked={formulario.generoUsuario === "hombre"}
                  onChange={handleChange}
                />
                Hombre
              </label>

              <label>
                <input
                  type="radio"
                  name="generoUsuario"
                  value="mujer"
                  checked={formulario.generoUsuario === "mujer"}
                  onChange={handleChange}
                />
                Mujer
              </label>

              <label>
                <input
                  type="radio"
                  name="generoUsuario"
                  value="otro"
                  checked={formulario.generoUsuario === "otro"}
                  onChange={handleChange}
                />
                Otro
              </label>

              {errores.generoUsuario && (
                <span className="error-msg">{errores.generoUsuario}</span>
              )}
            </div>

            {/* Mensaje */}
            <div className="form-group">
              <label>Mensaje</label>
              <textarea
                name="mensaje"
                value={formulario.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
                className={errores.mensaje ? "input-error" : ""}
              />
              {errores.mensaje && (
                <span className="error-msg">{errores.mensaje}</span>
              )}
            </div>

            {/* Términos */}
            <div className="form-group terminos-box">
              <p className="terminos-texto">
                Al enviar este formulario, aceptas que tu información será utilizada
                únicamente para responder a tu solicitud. No compartiremos tus datos
                con terceros y serán tratados de forma confidencial.
              </p>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="aceptar"
                  checked={formulario.aceptar}
                  onChange={handleChange}
                />
                Acepto los términos y condiciones
              </label>

              {errores.aceptar && (
                <span className="error-msg">{errores.aceptar}</span>
              )}
            </div>

            {/* Botón */}
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
    <CartProvider>
      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/exito" element={<Exito />} />
          <Route path="/fallo" element={<Fallo />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;