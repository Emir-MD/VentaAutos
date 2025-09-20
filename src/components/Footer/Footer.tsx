import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        © {new Date().getFullYear()} Programa de Concientización — Material de simulación autorizado.
      </div>
    </footer>
  );
}
