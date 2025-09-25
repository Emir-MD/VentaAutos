import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/** === Rutas internas === */
const LINK_MAP = {
  // Navbar
  empresas: "/empresas",
  usuarios: "/usuarios",
  afiliados: "/afiliados",
  nosotros: "/nosotros",
  preguntas: "/preguntas",
  contactanos: "/contacto",
  blog: "/blog",

  // Header
  operacion: "/operacion",         // “Operación en línea” (tu propia página)
  telefono: "/contacto",           // botón de teléfono -> tu página de contacto

  // Cinta superior
  cotiza: "/cotizador",
  saldo: "/consulta-saldo",

  // Hero CTA
  cotizaAqui: "/cotizador",

  // Tabs App/Web
  appStore: "/app-movil",          // páginas internas que luego llenamos
  playStore: "/app-movil",
  iniciaSesion: "/operacion",

  // Footer
  avisoPrivacidad: "/aviso-de-privacidad",
  codigoEtica: "/codigo-de-etica",
  comisiones: "/comisiones-tarjetahabientes",
  tipsSeguridad: "/tips-de-seguridad",
  terminos: "/terminos-y-condiciones",
};

/** Hook de navegación interna */
function useGo() {
  const navigate = useNavigate();
  return (path: string) => navigate(path);
}

/** ====== Paleta (ajústala a la oficial cuando la tengas) ====== */
const COLORS = {
  orange1: "#F59E35",
  orange2: "#F48B21",
  orange3: "#F3B467",
  mint: "#27C3A0",
  darkFooter: "#3B4547",
  grayText: "#59656B",
};

/** ====== Cinta degradada con CTA saldo ====== */
function AnnouncementBar() {
  const go = useGo();
  return (
    <div
      className="w-full"
      style={{
        background: `linear-gradient(90deg, ${COLORS.orange2}, ${COLORS.orange3}, ${COLORS.mint})`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-white font-semibold text-sm sm:text-base"
          onClick={() => go(LINK_MAP.cotiza)}
        >
          <span className="text-lg">🛒</span>
          <span>Cotiza y compra en línea vales de Despensa</span>
        </button>
        <button
          onClick={() => go(LINK_MAP.saldo)}
          className="hidden md:inline-flex rounded-full bg-white/20 hover:bg-white/30 transition px-4 py-1.5 text-sm font-semibold text-white"
        >
          Consulta tu saldo aquí
        </button>
      </div>
    </div>
  );
}

/** ====== Header con menú y botones ====== */
function Header() {
  const go = useGo();
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => go("/")} className="flex items-center gap-2">
          <img
            src="/brand/logo-up-demo.svg"
            alt="Up Sí Vale"
            className="h-9 w-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).outerHTML =
                `<div style="height:36px;width:120px;display:flex;align-items:center;gap:8px">
                   <div style="height:36px;width:36px;border-radius:4px;background:${COLORS.orange1};color:#fff;display:grid;place-items:center;font-weight:800">Up</div>
                   <div style="color:${COLORS.grayText};font-weight:600">sí vale</div>
                 </div>`;
            }}
          />
        </button>

        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-600">
          <button onClick={() => go(LINK_MAP.empresas)} className="hover:text-slate-900">Empresas</button>
          <button onClick={() => go(LINK_MAP.usuarios)} className="hover:text-slate-900">Usuarios</button>
          <button onClick={() => go(LINK_MAP.afiliados)} className="hover:text-slate-900">Afiliados</button>
          <button onClick={() => go(LINK_MAP.nosotros)} className="hover:text-slate-900">Nosotros</button>
          <button onClick={() => go(LINK_MAP.preguntas)} className="hover:text-slate-900">Preguntas</button>
          <button onClick={() => go(LINK_MAP.contactanos)} className="hover:text-slate-900">Contáctanos</button>
          <button onClick={() => go(LINK_MAP.blog)} className="hover:text-slate-900">Blog</button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go(LINK_MAP.operacion)}
            className="hidden sm:inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Operación en línea
          </button>
          <button
            title="Llámanos"
            onClick={() => go(LINK_MAP.telefono)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border text-slate-700 hover:bg-slate-50"
          >
            ☎
          </button>
        </div>
      </div>
    </header>
  );
}

/** ====== HERO Slider ====== */
type Slide = { title: string; text: string; img: string };
const SLIDES: Slide[] = [
  {
    title: "Sí Vale, lo vale",
    text:
      "Realiza la compra de vales en México de una forma fácil y sencilla para ofrecerle esta fabulosa prestación laboral a tus empleados",
    img: "/hero/slide-1.png",
  },
  {
    title: "Certificación NYCE, S.C. (NYCE)",
    text:
      "Renovamos certificación en Protección de Datos Personales 2025–2027 reafirmando nuestro compromiso con la seguridad y privacidad.",
    img: "/hero/slide-2.png",
  },
  {
    title: "Incentivos",
    text: "Reconoce el desempeño con programas flexibles.",
    img: "/hero/slide-3.png",
  },
];

function HeroSlider() {
  const [i, setI] = useState(0);
  const go = useGo();

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);
  const s = SLIDES[i];

  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[560px_1fr] gap-10 items-center">
        {/* Imagen izquierda con flechas y puntos */}
        <div className="relative">
          <div className="rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,.12)] overflow-hidden bg-white">
            <img
              src={s.img}
              alt={s.title}
              className="block w-full h-auto aspect-[4/3] object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).outerHTML =
                  `<div style="aspect-ratio:4/3;display:grid;place-items:center;background:linear-gradient(135deg, ${COLORS.orange2}, ${COLORS.orange1});color:white">IMG ${i + 1} (coloca /public/hero/slide-${i + 1}.png)</div>`;
              }}
            />
          </div>

          {/* Flechas */}
          <button
            aria-label="Anterior"
            onClick={() => setI((i - 1 + SLIDES.length) % SLIDES.length)}
            className="absolute left-[-16px] top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow grid place-items-center"
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => setI((i + 1) % SLIDES.length)}
            className="absolute right-[-16px] top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow grid place-items-center"
          >
            ›
          </button>

          {/* Dots y chevron */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 w-10 rounded-full ${idx === i ? "bg-[#F59E35]" : "bg-slate-300"}`}
                aria-label={`Ir al slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="mt-6 grid place-items-center text-slate-400">▾</div>
        </div>

        {/* Texto derecho */}
        <div>
          <h1 className="text-[40px] leading-tight font-extrabold" style={{ color: COLORS.grayText }}>
            {s.title}
          </h1>
          <p className="mt-4 text-slate-600 max-w-[52ch]">{s.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => go(LINK_MAP.cotizaAqui)}
              className="rounded-full px-6 py-3 text-white text-sm font-semibold shadow"
              style={{ background: `linear-gradient(90deg, ${COLORS.orange2}, ${COLORS.orange3})` }}
            >
              Cotiza Aquí
            </button>
            <button
              onClick={() => go(LINK_MAP.saldo)}
              className="rounded-full px-6 py-3 text-white text-sm font-semibold shadow"
              style={{ backgroundColor: COLORS.mint }}
            >
              Consulta tu saldo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** ====== Barra aliados + CTA saldo ====== */
function Allies() {
  const go = useGo();
  return (
    <section className="py-8 bg-slate-50 border-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-700">Nuestros mejores aliados</div>
          <div className="text-sm text-slate-500">Aceptación a nivel nacional e internacional</div>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => go(LINK_MAP.saldo)}
          className="rounded-full text-white px-5 py-2 text-sm font-semibold shadow"
          style={{ background: `linear-gradient(90deg, ${COLORS.mint}, ${COLORS.orange3})` }}
        >
          Consulta tu saldo aquí
        </button>
      </div>
    </section>
  );
}

/** ====== Stats circulares ====== */
function Stats() {
  const items = [
    { k: "+500", sub: "Mil Comercios aceptan Up Sí Vale" },
    { k: "25", sub: "Años de experiencia en México" },
    { k: "+17", sub: "Mil empresas clientes" },
    { k: "3.8", sub: "Millones de tarjetahabientes" },
    { k: "128", sub: "Millones de transacciones anuales" },
  ];
  return (
    <section className="py-12">
      <h2 className="sr-only">¿Por qué elegir Sí Vale?</h2>
      <div className="mx-auto max-w-6xl px-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-10 text-center">
        {items.map((s) => (
          <div key={s.sub} className="flex flex-col items-center">
            <div
              className="h-24 w-24 rounded-full grid place-items-center text-white text-2xl font-extrabold shadow-[0_10px_30px_rgba(0,0,0,.15)]"
              style={{ background: `linear-gradient(135deg, ${COLORS.orange2}, ${COLORS.orange1})` }}
            >
              {s.k}
            </div>
            <div className="mt-3 text-sm text-slate-600">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** ====== Tabs App / Plataforma Web ====== */
function AppTabs() {
  const [tab, setTab] = useState<"app" | "web">("app");
  const go = useGo();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab("app")}
            className={`px-4 py-2 rounded-full border text-sm ${tab === "app" ? "bg-white shadow font-semibold" : "hover:bg-slate-50"}`}
          >
            App móvil
          </button>
          <button
            onClick={() => setTab("web")}
            className={`px-4 py-2 rounded-full border text-sm ${tab === "web" ? "bg-white shadow font-semibold" : "hover:bg-slate-50"}`}
          >
            Plataforma web
          </button>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-extrabold text-slate-700">{tab === "app" ? "App Up Sí Vale" : "Plataforma web"}</h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              {tab === "app" ? (
                <>
                  <li>• Mantén el control de tus tarjetas</li>
                  <li>• Visualiza tus movimientos</li>
                  <li>• Conoce tu saldo actual</li>
                  <li>• Consulta tu NIP</li>
                  <li>• Accede a más beneficios</li>
                </>
              ) : (
                <>
                  <li>• Consulta tu saldo</li>
                  <li>• Encuentra tus movimientos</li>
                  <li>• Enciende o apaga tus tarjetas</li>
                </>
              )}
            </ul>
            <div className="mt-6 flex gap-3">
              <button onClick={() => go(LINK_MAP.playStore)} className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
                Google Play
              </button>
              <button onClick={() => go(LINK_MAP.appStore)} className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
                App Store
              </button>
              {tab === "web" && (
                <button onClick={() => go(LINK_MAP.iniciaSesion)} className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
                  Inicia sesión aquí
                </button>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-[16/10] rounded-3xl bg-white ring-1 ring-black/5 grid place-items-center shadow-[0_12px_26px_rgba(0,0,0,.12)]">
              <img
                src={tab === "app" ? "/tabs/app.png" : "/tabs/web.png"}
                alt={tab === "app" ? "App móvil" : "Plataforma web"}
                className="block max-w-full h-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).outerHTML =
                    `<div style="color:#94a3b8">Coloca /public/tabs/${tab}.png</div>`;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** ====== Footer ====== */
function Footer() {
  const go = useGo();
  return (
    <footer style={{ backgroundColor: COLORS.darkFooter }} className="text-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-semibold">Una implantación internacional</p>
          <button
            onClick={() => go("/")}
            className="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: COLORS.orange2 }}
          >
            EL GRUPO UPCOOP
          </button>
        </div>
        <div>
          <p className="font-semibold">Síguenos en</p>
          <div className="mt-3 flex gap-3 text-slate-100/80">
            <span>Facebook</span><span>Instagram</span><span>LinkedIn</span><span>YouTube</span>
          </div>
          <p className="mt-6 text-sm opacity-80">Usa nuestras Apps</p>
          <div className="mt-2 flex gap-3 text-xs">
            <button onClick={() => go(LINK_MAP.playStore)} className="rounded border px-3 py-1">Google Play</button>
            <button onClick={() => go(LINK_MAP.appStore)} className="rounded border px-3 py-1">App Store</button>
          </div>
        </div>
        <div>
          <p className="font-semibold">© Up Sí Vale 2025</p>
          <ul className="mt-3 space-y-1 text-sm opacity-80">
            <li><button onClick={() => go(LINK_MAP.avisoPrivacidad)}>Aviso de privacidad</button></li>
            <li><button onClick={() => go(LINK_MAP.codigoEtica)}>Código de ética</button></li>
            <li><button onClick={() => go(LINK_MAP.comisiones)}>Comisiones tarjetahabientes</button></li>
            <li><button onClick={() => go(LINK_MAP.tipsSeguridad)}>Tips de seguridad</button></li>
            <li><button onClick={() => go(LINK_MAP.terminos)}>Términos y Condiciones</button></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/** ====== Página ====== */
export default function LandingSivaleClone() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSlider />
        <Allies />
        <Stats />
        <AppTabs />
      </main>
      <Footer />
    </div>
  );
}
