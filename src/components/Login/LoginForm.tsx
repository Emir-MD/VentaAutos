import React, { useMemo, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const campaign = useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    return { cid: p.get("cid") ?? "demo", uid: p.get("uid") ?? "anon" };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // Simulación ética: NO envía credenciales reales fuera.
    console.info("[training-capture]", {
      ts: new Date().toISOString(),
      email, pwd, otp, ...campaign,
      ua: navigator.userAgent,
    });

    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setDone(true);
  }

  return (
    <section className="panel">
      <h2>Acceso a servicios</h2>
      <p className="muted">
        Inicia sesión con tu correo institucional para continuar. Esta es una simulación ética con fines de capacitación.
      </p>

      {!done ? (
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <div className="row">
            <label htmlFor="email" className="label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              required
              className="input"
              placeholder="nombre@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="pwd" className="label">Contraseña</label>
            <input
              id="pwd"
              type="password"
              required
              className="input"
              placeholder="••••••••"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>

          <div className="row">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <label htmlFor="otp" className="label">Código de verificación (OTP)</label>
              <span className="muted" style={{ fontSize: 12 }}>(si aplica)</span>
            </div>
            <input
              id="otp"
              inputMode="numeric"
              pattern="[0-9]*"
              className="input"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="actions">
            <button className="btn-primary" disabled={submitting}>
              {submitting ? "Verificando…" : "Continuar"}
            </button>
          </div>

          <p className="note">
            Esta página es parte de una <strong>simulación de seguridad</strong> autorizada. No pertenece a entidades oficiales.
          </p>
        </form>
      ) : (
        <div className="success">
          <strong>¡Listo!</strong> Esta fue una simulación de seguridad. No se almacenan credenciales reales.
        </div>
      )}
    </section>
  );
}
