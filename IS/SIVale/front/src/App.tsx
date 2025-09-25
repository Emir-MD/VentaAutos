// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginSiVale from "./components/LoginSiVale";

function Empresas() {
  return (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold">Empresas</h1>
        <p className="mt-2 text-slate-600">Página en construcción.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* 1️⃣ Home = Login */}
      <Route path="/" element={<LoginSiVale />} />

      {/* 2️⃣ Placeholder para otras rutas */}
      <Route path="/empresas" element={<Empresas />} />

      {/* 3️⃣ Redirige cualquier otra ruta al login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
