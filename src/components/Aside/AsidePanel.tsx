import React from "react";

export default function AsidePanel() {
  return (
    <aside className="panel">
      <h3>Aviso importante</h3>
      <p className="muted">
        Esta landing es de entrenamiento y no pertenece a organismos oficiales. Úsala sólo en entornos controlados.
      </p>

      <h4 style={{ marginTop: 14 }}>Consejos rápidos</h4>
      <ul>
        <li>Verifica el dominio y el candado del navegador.</li>
        <li>Desconfía de urgencias y solicitudes de contraseña.</li>
        <li>No reutilices contraseñas; usa un gestor.</li>
        <li>Activa MFA siempre que sea posible.</li>
      </ul>
    </aside>
  );
}
