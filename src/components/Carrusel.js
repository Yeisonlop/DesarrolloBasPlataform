import React, { useState, useEffect } from 'react';
import '../App.css';
import img1 from '../imagenes/imagen1.jpg';
import img2 from '../imagenes/imagen2.jpg';
import img3 from '../imagenes/imagen3.jpg';

export const artistas = [
  {
    imagen: img1,
    nombre: 'Bad Bunny',
    genero: 'Trap · Reggaeton',
    spotify: 'https://open.spotify.com/intl-es/artist/4q3ewBCX7sLwd24euuV69X',
  },
  {
    imagen: img2,
    nombre: 'Karol G',
    genero: 'Reggaeton · Pop Latino',
    spotify: 'https://open.spotify.com/intl-es/artist/790FomKkXshlbRYZFtlgla',
  },
  {
    imagen: img3,
    nombre: 'Feid',
    genero: 'Urbano · R&B',
    spotify: 'https://open.spotify.com/intl-es/artist/2eoclQF1zbpPMXMiXnfQud',
  },
];

function Carrusel({ onCambio }) {
  const [indice, setIndice] = useState(0);
  const [animando, setAnimando] = useState(false);

  const cambiar = (nuevoIndice) => {
    setAnimando(true);
    setTimeout(() => {
      setIndice(nuevoIndice);
      setAnimando(false);
      if (onCambio) onCambio(nuevoIndice);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // eslint-disable-next-line
      setAnimando(true);
      setTimeout(() => {
        setIndice((prev) => {
          const siguiente = (prev + 1) % artistas.length;
          if (onCambio) onCambio(siguiente);
          return siguiente;
        });
        setAnimando(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, [onCambio]);

  const siguiente = () => cambiar((indice + 1) % artistas.length);
  const anterior = () => cambiar((indice - 1 + artistas.length) % artistas.length);

  return (
    <div className="carrusel">
      <img
        src={artistas[indice].imagen}
        alt={artistas[indice].nombre}
        className={animando ? 'fade-out' : 'fade-in'}
      />
      <div className="carrusel-overlay" />
      <div className="carrusel-info">
        <span className="carrusel-genero">{artistas[indice].genero}</span>
        <h2 className="carrusel-nombre">{artistas[indice].nombre}</h2>
      </div>
      <div className="carrusel-dots">
        {artistas.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === indice ? 'activo' : ''}`}
            onClick={() => cambiar(i)}
          />
        ))}
      </div>
      <button className="btn-anterior" onClick={anterior}>&#8592;</button>
      <button className="btn-siguiente" onClick={siguiente}>&#8594;</button>
    </div>
  );
}

export default Carrusel;