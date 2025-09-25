import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function LoginForm({ onClose }: Props) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();
      console.log("Respuesta del backend:", data);

      setSuccess(true);
      if (data.token) localStorage.setItem("token", data.token);
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-overlay">
      <div className="login-modal">
        {/* Botón de cerrar */}
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <h2>Acceso institucional</h2>
        <p className="muted">Inicia sesión con tu usuario institucional.</p>

        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="usuario" className="label">
                Usuario institucional
              </label>
              <input
                id="usuario"
                type="text"
                required
                className="input"
                placeholder="usuario@institucion.mx"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div className="row">
              <label htmlFor="password" className="label">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="actions">
              <button className="btn-primary" disabled={loading}>
                {loading ? "Ingresando…" : "Ingresar"}
              </button>
            </div>
          </form>
        ) : (
          <div className="success">
            <strong>¡Bienvenido!</strong> Has iniciado sesión correctamente.
          </div>
        )}
      </div>
    </div>
  );
}
