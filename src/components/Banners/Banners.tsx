import React from "react";
import "./banners.css";

export default function Banners() {
  return (
    <section className="cards">
      {/* Bloque Presidente */}
      <div className="card-maroon">
        <p>Sigue las actividades del presidente en:</p>
        <a href="https://presidente.gob.mx" className="btn-outline">
          <span className="icon">▶</span>
          presidente.gob.mx
        </a>
      </div>

      {/* Bloque Vehículos */}
      <div className="card-maroon vehiculos-block">
        <h3>
          Listado de Bienes <br />
          Adjudicación Directa
        </h3>
        <div className="vehiculos-row">
          <img src="/car.png" alt="Vehículo" className="car-icon-big" />
          <a href="#vehiculos" className="btn-solid">
            Vehículos
          </a>
        </div>
      </div>
    </section>
  );
}
