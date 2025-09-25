import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrainingLanding from "./pages/TrainingLanding";
import VehiculosPage from "./pages/VehiculosPage";
import VehiculoDetailPage from "./pages/VehiculoDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrainingLanding />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
        <Route path="/vehiculos/:id" element={<VehiculoDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
