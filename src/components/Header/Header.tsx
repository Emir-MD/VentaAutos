import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <div className="brand">
          <img src="/logoh.png" alt="Gobierno de México" className="brand-logo" />
        </div>

        <nav className="nav">
          <a href="https://www.gob.mx/" target="_blank" rel="noopener noreferrer">
            Inicio
          </a>
          <a href="https://www.gob.mx/tramites" target="_blank" rel="noopener noreferrer">
            Trámites
          </a>
          <a href="https://www.gob.mx/gobierno" target="_blank" rel="noopener noreferrer">
            Gobierno
          </a>
        </nav>
      </div>

      <div className="strip" />
    </header>
  );
}
