import React, { useState, useEffect } from 'react';
import '../App.css';
import img1 from '../imagenes/imagen1.jpg';
import img2 from '../imagenes/imagen2.jpg';
import img3 from '../imagenes/imagen3.jpg';

const imagenes = [img1, img2, img3];

function Carrusel() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const siguiente = () => setIndice((prev) => (prev + 1) % imagenes.length);
  const anterior = () => setIndice((prev) => (prev - 1 + imagenes.length) % imagenes.length);

  return (
    <div className="carrusel">
      <img src={imagenes[indice]} alt={`Slide ${indice + 1}`} />

      <button onClick={anterior}>◀</button>
      <button onClick={siguiente}>▶</button>
    </div>
  );
}
export default Carrusel;