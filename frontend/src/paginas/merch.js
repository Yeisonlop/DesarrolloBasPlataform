import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import imagen1Front from "../imagenes/Respect_your_mother.webp";
import imagen2Front from "../imagenes/Saco_rojo_1.webp";
import imagen2Back from "../imagenes/Saco_rojo_2.webp";
import imagen3Front from "../imagenes/Disco_1.webp";
import imagen3Back from "../imagenes/Disco_2.webp";
import imagen4Front from "../imagenes/Camisa_Who_1.webp";
import imagen4Back from "../imagenes/Camisa_Who_2.webp";
import imagenArtista1 from "../imagenes/HarryStyles.jpg";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function MerchPage() {

  const { agregar } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [mostrarLogin, setMostrarLogin] = useState(false);

  const artistas = [
    {
      nombre: "Harry Styles",
      imagen: imagenArtista1,
      productos: [
        {
          id: 1,
          nombre: "Camisa 'RESPECT YOUR MOTHER'",
          precio: 35.00,
          imagenFront: imagen1Front,
          imagenBack: imagen1Front
        },
        {
          id: 2,
          nombre: "Hoodie Tracklist",
          precio: 18,
          imagenFront: imagen2Front,
          imagenBack: imagen2Back
        },
        {
          id: 5,
          nombre: "Kiss All The Thime. Disco, Ocassionally - Vinilo negro",
          precio: 12,
          imagenFront: imagen3Front,
          imagenBack: imagen3Back
        },
        {
          id: 6,
          nombre: "Camisa 'WHO ME'",
          precio: 40,
          imagenFront: imagen4Front,
          imagenBack: imagen4Back
        },
      ],
    },

    {
      nombre: "Karol G",
      imagen: "/imagenes/karolg.jpg",
      productos: [
        {
          id: 3,
          nombre: "Hoodie Karol G",
          precio: 45,
          imagenFront: "/imagenes/merch3.jpg",
          imagenBack: "/imagenes/merch3_back.jpg"
        },
        {
          id: 4,
          nombre: "Camiseta Karol G",
          precio: 30,
          imagenFront: "/imagenes/merch1.jpg",
          imagenBack: "/imagenes/merch1_back.jpg"
        },
        {
          id: 7,
          nombre: "Poster Karol G",
          precio: 15,
          imagenFront: "/imagenes/merch6.jpg",
          imagenBack: "/imagenes/merch6_back.jpg"
        },
      ],
    },
  ];

  const [seleccionados, setSeleccionados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const handleCheckboxChange = (artista) => {

    if (seleccionados.includes(artista)) {

      setSeleccionados(
        seleccionados.filter(a => a !== artista)
      );

    } else {

      if (seleccionados.length < 3) {

        setSeleccionados([
          ...seleccionados,
          artista
        ]);

      } else {

        alert("Solo puedes seleccionar hasta 3 artistas.");
      }
    }
  };

  // LOGIN PROTEGIDO
  const agregarProtegido = (producto) => {

    if (!usuario) {

      setMostrarLogin(true);
      return;
    }

    agregar(producto);
  };

  return (
    <>

      {/* MODAL LOGIN */}
      {mostrarLogin && (

        <div className="modal-overlay">

          <div className="modal-login">

            <div className="modal-login-icono">
              🔒
            </div>

            <h3>INICIA SESIÓN</h3>

            <p>
              Debes iniciar sesión para agregar productos
              al carrito y continuar con tu compra.
            </p>

            <div className="modal-login-botones">

              <button
                className="btn-modal-cancelar"
                onClick={() => setMostrarLogin(false)}
              >
                Cancelar
              </button>

              <button
                className="btn-modal-login"
                onClick={() => navigate("/login")}
              >
                Ir al login
              </button>

            </div>

          </div>

        </div>
      )}

      <div className="pagina-merch">

        {/* Sidebar izquierda */}
        <div className="sidebar-artistas">

          <h3>Artistas</h3>

          <input
            type="text"
            placeholder="Buscar artista..."
            className="buscador-artistas"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {artistas
            .filter((a) =>
              a.nombre.toLowerCase().includes(busqueda.toLowerCase())
            )
            .map((artista) => (

              <label
                key={artista.nombre}
                className="checkbox-artista"
              >

                <input
                  type="checkbox"
                  checked={seleccionados.includes(artista.nombre)}
                  onChange={() =>
                    handleCheckboxChange(artista.nombre)
                  }
                />

                <img
                  src={artista.imagen}
                  alt={artista.nombre}
                  className="miniatura-artista"
                />

                <span>{artista.nombre}</span>

              </label>
            ))}
        </div>

        {/* Contenido derecha */}
        <div className="contenido-merch">

          <h2>Merch Oficial</h2>

          {artistas
            .filter((a) =>
              seleccionados.includes(a.nombre)
            )
            .map((artista) => (

              <CarruselMerch
                key={artista.nombre}
                artista={artista}
                agregar={agregarProtegido}
              />

            ))}
        </div>
      </div>
    </>
  );
}

function CarruselMerch({ artista, agregar }) {

  const [mostrarTodos, setMostrarTodos] = useState(false);

  const productosVisibles = mostrarTodos
    ? artista.productos
    : artista.productos.slice(0, 3);

  return (

    <div className="carrusel-merch">

      <h3 className="titulo-artista">
        {artista.nombre}
      </h3>

      <div className="grid-merch">

        {productosVisibles.map((producto) => (

          <div
            key={producto.id}
            className="card-merch"
          >

            <img
              src={producto.imagenFront}
              alt={producto.nombre}

              onMouseEnter={(e) => {

                if (producto.imagenBack) {
                  e.currentTarget.src =
                    producto.imagenBack;
                }
              }}

              onMouseLeave={(e) => {

                if (producto.imagenBack) {
                  e.currentTarget.src =
                    producto.imagenFront;
                }
              }}
            />

            <h3>{producto.nombre}</h3>

            <p>${producto.precio}</p>

            <button
              onClick={() => agregar(producto)}
              className="btn-enviar"
            >
              Agregar al carrito
            </button>

          </div>
        ))}
      </div>

      {!mostrarTodos ? (

        <button
          onClick={() => setMostrarTodos(true)}
          className="btn-vermas"
        >
          Ver más productos
        </button>

      ) : (

        <button
          onClick={() => setMostrarTodos(false)}
          className="btn-vermenos"
        >
          Ver menos productos
        </button>
      )}

    </div>
  );
}

export default MerchPage;