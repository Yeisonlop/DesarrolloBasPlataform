import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagenArtista1 from "../imagenes/HarryStyles.jpg";
import imagenArtista2 from "../imagenes/KarolG.jpg";
import imagenArtista3 from "../imagenes/Tr1.jpg";

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
          precio: "45.000",
          imagenFront: "https://store-uk.hstyles.co.uk/cdn/shop/files/RESPECT-YOUR-MOTHER-PURPLE-TEEv2.png?v=1779317613&width=1600",
          imagenBack: "https://store-uk.hstyles.co.uk/cdn/shop/files/RESPECT-YOUR-MOTHER-PURPLE-TEEv2.png?v=1779317613&width=1600"
        },
        {
          id: 2,
          nombre: "Hoodie Tracklist",
          precio: "85.000",
          imagenFront: "https://store-uk.hstyles.co.uk/cdn/shop/files/TRACKLIST-HOODIE-FRONT-RED.png?v=1779094272&width=832",
          imagenBack: "https://store-uk.hstyles.co.uk/cdn/shop/files/TRACKLIST-HOODIE-BACK-RED.png?v=1779094272&width=3840"
        },
        {
          id: 5,
          nombre: "Kiss All The Thime. Disco, Ocassionally - Vinilo negro",
          precio: "120.000",
          imagenFront: "https://store-uk.hstyles.co.uk/cdn/shop/files/RENEGADE-PACKSHOT-VINYL-black.png?v=1768476070&width=832",
          imagenBack: "https://store-uk.hstyles.co.uk/cdn/shop/files/BLACKLP.png?v=1768476071&width=832"
        },
        {
          id: 6,
          nombre: "Camisa 'WHO ME'",
          precio: "45.000",
          imagenFront: "https://store-uk.hstyles.co.uk/cdn/shop/files/HARRY-PICTURE-TEE-2-FRONT.png?v=1773410684&width=832",
          imagenBack: "https://store-uk.hstyles.co.uk/cdn/shop/files/HARRY-PICTURE-TEE-2-BACK.png?v=1773410684&width=1920"
        },
      ],
    },

    {
      nombre: "Karol G",
      imagen: imagenArtista2,
      productos: [
        {
          id: 3,
          nombre: "Bolso Karol G",
          precio: "25.000",
          imagenFront: "https://shopkarolg.com/cdn/shop/files/Bag_02_8fab2d5b-8ed4-44cc-8c23-3c86c807b1c2.png?v=1750275382&width=800",
          imagenBack: "https://shopkarolg.com/cdn/shop/files/Bag_01_ba3ec4d8-3b41-4d8d-ae09-5836f65f0d7c.png?v=1750275382&width=800"
        },
        {
          id: 4,
          nombre: "LATINA FOREVA Tee",
          precio: "45.000",
          imagenFront: "https://shopkarolg.com/cdn/shop/files/KG-FInal_01.2_1.png?v=1748623136&width=800",
          imagenBack: "https://shopkarolg.com/cdn/shop/files/KG-FInal_02_1.png?v=1748623138&width=800"
        },
        {
          id: 7,
          nombre: "Tropicoqueta Tank Top",
          precio: "35.000",
          imagenFront: "https://shopkarolg.com/cdn/shop/files/Tank-top-new_02_a081f006-6354-45f5-8f17-b11a24907a4a.png?v=1762802830&width=800",
          imagenBack: "https://shopkarolg.com/cdn/shop/files/Tank-top_01_02b3370b-4938-4ea6-9f0f-73fbb86c9f24.png?v=1762802833&width=800"
        },
        {
          id: 7,
          nombre: "Tropicoqueta Scarf",
          precio: "20.000",
          imagenFront: "https://shopkarolg.com/cdn/shop/files/bandana_01.png?v=1750275339&width=800",
          imagenBack: "https://shopkarolg.com/cdn/shop/files/bandana_02.png?v=1750275339&width=800"
        },
      ],
    },
    {
      nombre: "Trueno",
      imagen: imagenArtista3,
      productos: [
        {
          id: 1,
          nombre: "Trueno · EUB Tracklist Navy camisa",
          precio: "45.000",
          imagenFront: "https://cdnx.jumpseller.com/gen-wave1/image/49559882/resize/610/610?1717860514",
          imagenBack: "https://cdnx.jumpseller.com/gen-wave1/image/49559884/resize/610/610?1717860514"
        },
        {
          id: 2,
          nombre: "Trueno · Dance Crip camisa",
          precio: "45.000",
          imagenFront: "https://cdnx.jumpseller.com/gen-wave1/image/49559965/resize/610/610?1717860883",
          imagenBack: "https://cdnx.jumpseller.com/gen-wave1/image/49559964/resize/610/610?1717860883"
        },
        {
          id: 5,
          nombre: "Trueno · E.U.B camisa",
          precio: "45.000",
          imagenFront: "https://cdnx.jumpseller.com/gen-wave1/image/49560154/resize/610/610?1717861754",
          imagenBack: "https://cdnx.jumpseller.com/gen-wave1/image/49560154/resize/610/610?1717861754"
        },
        {
          id: 6,
          nombre: "Gorra Bordada Trueno",
          precio: "40.000",
          imagenFront: "https://acdn-us.mitiendanube.com/stores/001/661/362/products/gorro-de-lana_trueno-0869f4c4bf5699a31617494963298512-1024-1024.webp",
          imagenBack: "https://acdn-us.mitiendanube.com/stores/001/661/362/products/gorro-de-lana_trueno-0869f4c4bf5699a31617494963298512-1024-1024.webp"
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