import React from "react";

export default function Header() {
    return (
        <header className="header">
            <div className="wrap">
                <div className="brand">
                    <img src="/logoh.png" alt="Gobierno de México" className="brand-logo" />
                </div>
                <nav className="nav">
                    <a href="#">Versiones estenográficas</a>
                    <a href="#">Prensa</a>
                    <a href="#">Protección de Datos Personales</a>
                    <a href="#">Transparencia</a>
                    <a href="#">Trámites</a>
                    <a href="#">Gobierno</a>
                </nav>

            </div>

            <div className="strip" />
        </header>
    );
}
