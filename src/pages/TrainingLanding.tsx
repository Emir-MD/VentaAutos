import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero/Hero";
import Banners from "../components/Banners/Banners";
import LoginForm from "../components/Login/LoginForm";

export default function TrainingLanding() {
  const [showLogin, setShowLogin] = useState(true); // al inicio se ve el login

  return (
    <MainLayout>
      <Hero />
      <Banners />

      {/* Mostrar login solo si está activo */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </MainLayout>
  );
}
