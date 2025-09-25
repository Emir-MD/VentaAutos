import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-content">
        <div className="footer-brand">
          <img src="/logoh.png" alt="Gobierno de México" className="footer-logo" />
        </div>

        <div className="footer-links">
          <div>
            <h4>Enlaces</h4>
            <ul>
              <li><a href="https://www.gob.mx/participa" target="_blank" rel="noopener noreferrer">Participa</a></li>
              <li><a href="https://www.gob.mx/publicaciones" target="_blank" rel="noopener noreferrer">Publicaciones Oficiales</a></li>
              <li><a href="https://www.gob.mx/marcojuridico" target="_blank" rel="noopener noreferrer">Marco Jurídico</a></li>
              <li><a href="https://www.gob.mx/transparencia" target="_blank" rel="noopener noreferrer">Plataforma Nacional de Transparencia</a></li>
            </ul>
          </div>

          <div>
            <h4>¿Qué es gob.mx?</h4>
            <p>
              Es el portal único de trámites, información y participación ciudadana.{" "}
              <a href="https://www.gob.mx/que-es-gobmx" target="_blank" rel="noopener noreferrer">
                Leer más
              </a>
            </p>
            <ul>
              <li><a href="https://datos.gob.mx/" target="_blank" rel="noopener noreferrer">Portal de datos abiertos</a></li>
              <li><a href="https://www.gob.mx/accesibilidad" target="_blank" rel="noopener noreferrer">Declaración de accesibilidad</a></li>
              <li><a href="https://www.gob.mx/privacidadintegral" target="_blank" rel="noopener noreferrer">Aviso de privacidad integral</a></li>
              <li><a href="https://www.gob.mx/privacidadsimplificado" target="_blank" rel="noopener noreferrer">Aviso de privacidad simplificado</a></li>
              <li><a href="https://www.gob.mx/terminos" target="_blank" rel="noopener noreferrer">Términos y condiciones</a></li>
              <li><a href="https://www.gob.mx/politicadeseguridad" target="_blank" rel="noopener noreferrer">Política de seguridad</a></li>
              <li><a href="https://www.gob.mx/mapa-del-sitio" target="_blank" rel="noopener noreferrer">Mapa del sitio</a></li>
            </ul>
          </div>

          <div>
            <a
              href="https://sidec.funcionpublica.gob.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-denuncia"
            >
              Denuncia contra servidores públicos
            </a>
            <p>Síguenos en:</p>
            {/* Aquí podrías meter iconos de redes sociales si quieres */}
          </div>
        </div>
      </div>
    </footer>
  );
}
