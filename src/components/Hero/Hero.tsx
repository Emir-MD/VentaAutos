import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      {/* Arriba: imagen mujer + logo gobierno */}
      <div className="hero-top">
        <img src="/logo.png" alt="Mujer con bandera" className="hero-mujer" />
      </div>

      {/* Abajo: lo más buscado */}
      <div className="hero-bottom">
        <p className="hero-sub">Lo más buscado:</p>
        <div className="search-tags">
          <button>CURP</button>
          <button>Acta de nacimiento</button>
          <button>Recibo de luz</button>
          <button>Pasaporte</button>
          <button>Cédula profesional</button>
          <button>Precio de gasolina</button>
        </div>
      </div>
    </section>
  );
}
