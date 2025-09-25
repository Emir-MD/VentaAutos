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
          <a href="https://www.gob.mx/curp/" target="_blank" rel="noopener noreferrer">
            <button>CURP</button>
          </a>
          <a href="https://www.gob.mx/ActaNacimiento/folioSeguimiento/" target="_blank" rel="noopener noreferrer">
            <button>Acta de nacimiento</button>
          </a>
          <a href="https://app.cfe.mx/Aplicaciones/CCFE/ReciboDeLuzGMX/Consulta" target="_blank" rel="noopener noreferrer">
            <button>Recibo de luz</button>
          </a>
          <a href="https://www.gob.mx/pasaporte/" target="_blank" rel="noopener noreferrer">
            <button>Pasaporte</button>
          </a>
          <a href="https://www.gob.mx/cedulaprofesional" target="_blank" rel="noopener noreferrer">
            <button>Cédula profesional</button>
          </a>
          <a
            href="https://www.cre.gob.mx/ConsultaPrecios/GasolinasyDiesel/GasolinasyDiesel.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Precio de gasolina</button>
          </a>
        </div>
      </div>
    </section>
  );
}
