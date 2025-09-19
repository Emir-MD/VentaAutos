import { useMemo, useState } from "react";

export default function TrainingLanding() {
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
    await new Promise(r => setTimeout(r, 500));
    setSubmitting(false);
    setDone(true);
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="wrap">
          <div className="brand">
            <div className="brand-badge">MX</div>
            <div>
              <p className="brand-sub">Portal Institucional</p>
              <h1 className="brand-title">Portal de Servicios MX</h1>
            </div>
          </div>
          <nav className="nav">
            <a href="#versiones">Versiones</a>
            <a href="#prensa">Prensa</a>
            <a href="#datos">Protección de datos</a>
            <a href="#transparencia">Transparencia</a>
            <a href="#tramites">Trámites</a>
            <a href="#gobierno">Gobierno</a>
          </nav>
        </div>
        <div className="strip" />
      </header>

      {/* Hero */}
      <section className="section">
        <div className="container hero">
          <div className="hero-img" aria-hidden="true" />
          <div style={{textAlign:"center"}}>
            <h2 className="hero-title">Portal de Servicios MX</h2>
            <p className="hero-sub">
              Lo más buscado: CURP · Acta de nacimiento · Recibo de luz · Pasaporte · Cédula profesional · Precio de gasolina
            </p>
          </div>
        </div>
      </section>

      {/* Banners granate */}
      <section className="section">
        <div className="container cards">
          <div className="card-maroon">
            <p style={{opacity:.9, margin:0, fontSize:14}}>Sigue las actividades del portal en:</p>
            <div style={{marginTop:12, display:"inline-flex", alignItems:"center", gap:12}}>
              <span className="btn">presidencia.ejemplo.mx</span>
              <span style={{transform:"rotate(180deg)"}}>➜</span>
            </div>
          </div>
          <div className="card-maroon">
            <h3 style={{margin:"0 0 6px 0", fontSize:22, fontWeight:700}}>
              Listado de Bienes<br/>Adjudicación Directa
            </h3>
            <div style={{marginTop:14, display:"flex", gap:10, flexWrap:"wrap"}}>
              <a className="btn" href="#vehiculos">Vehículos</a>
              <a className="btn" href="#maquinaria">Maquinaria para construcción</a>
            </div>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <main className="section">
        <div className="container main">
          <section className="panel">
            <h2>Acceso a servicios</h2>
            <p className="muted">
              Inicia sesión con tu correo institucional para continuar. Esta es una simulación ética con fines de capacitación.
            </p>

            {!done ? (
              <form onSubmit={handleSubmit} style={{marginTop:16}}>
                <div className="row">
                  <label htmlFor="email" className="label">Correo electrónico</label>
                  <input id="email" type="email" required
                    className="input" placeholder="nombre@empresa.com"
                    value={email} onChange={e=>setEmail(e.target.value)} />
                </div>

                <div className="row">
                  <label htmlFor="pwd" className="label">Contraseña</label>
                  <input id="pwd" type="password" required
                    className="input" placeholder="••••••••"
                    value={pwd} onChange={e=>setPwd(e.target.value)} />
                </div>

                <div className="row">
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                    <label htmlFor="otp" className="label">Código de verificación (OTP)</label>
                    <span className="muted" style={{fontSize:12}}>(si aplica)</span>
                  </div>
                  <input id="otp" inputMode="numeric" pattern="[0-9]*"
                    className="input" placeholder="123456"
                    value={otp} onChange={e=>setOtp(e.target.value)} />
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

          <aside className="panel">
            <h3>Aviso importante</h3>
            <p className="muted">
              Esta landing es de entrenamiento y no pertenece a organismos oficiales. Úsala sólo en entornos controlados.
            </p>
            <h4 style={{marginTop:14}}>Consejos rápidos</h4>
            <ul>
              <li>Verifica el dominio y el candado del navegador.</li>
              <li>Desconfía de urgencias y solicitudes de contraseña.</li>
              <li>No reutilices contraseñas; usa un gestor.</li>
              <li>Activa MFA siempre que sea posible.</li>
            </ul>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <div className="wrap">© {new Date().getFullYear()} Programa de Concientización — Material de simulación autorizado.</div>
      </footer>
    </div>
  );
}
