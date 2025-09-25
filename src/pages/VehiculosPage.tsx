import React, { useState } from "react";
import VehiculoCard from "../components/Vehiculos/VehiculoCard";
import MainLayout from "../layouts/MainLayout";
import LoginForm from "../components/Login/LoginForm";
import "./../components/Vehiculos/vehiculos.css";

export default function VehiculosPage() {
  const [showLogin, setShowLogin] = useState(true);

  const vehiculos = [
    { id: "1812", nombre: "Lincoln Navigator Reserve 2019", precio: "$585,000.00", imagen: "/car.png" },
    { id: "8138", nombre: "BMW X6 M Competition 2020", precio: "$658,000.00", imagen: "/car.png" },
    { id: "9147", nombre: "BMW X5 xDrive 40i 2021", precio: "$778,000.00", imagen: "/car.png" },
    { id: "9654", nombre: "BMW X7 M50i 2022", precio: "$890,000.00", imagen: "/car.png" },
    { id: "9736", nombre: "Chevrolet Suburban High Country", precio: "$845,000.00", imagen: "/car.png" },
    { id: "4283", nombre: "Mercedes Benz GLS 450 4matic", precio: "$980,000.00", imagen: "/car.png" },
    { id: "9182", nombre: "Audi A3 2019", precio: "$248,000.00", imagen: "/car.png" },
    { id: "8927", nombre: "Toyota Corolla SE", precio: "$205,000.00", imagen: "/car.png" },
    { id: "1123", nombre: "Mazda CX-5 2020", precio: "$350,000.00", imagen: "/car.png" },
    { id: "3344", nombre: "Honda Accord 2019", precio: "$310,000.00", imagen: "/car.png" },
  ];

  // Ordenar primero los baratos ($200k - $300k)
  const baratos = vehiculos.filter((v) => {
    const precioNum = Number(v.precio.replace(/[^0-9.-]+/g, ""));
    return precioNum >= 200000 && precioNum <= 300000;
  });

  const otros = vehiculos.filter((v) => {
    const precioNum = Number(v.precio.replace(/[^0-9.-]+/g, ""));
    return precioNum < 200000 || precioNum > 300000;
  });

  const mezclados = [...otros].sort(() => Math.random() - 0.5);
  const vehiculosOrdenados = [...baratos, ...mezclados];

  return (
    <MainLayout>
      <section className="vehiculos-page">
        <h2>Vehículos</h2>
        <div className="vehiculos-grid">
          {vehiculosOrdenados.map((v) => (
            <VehiculoCard key={v.id} {...v} />
          ))}
        </div>
      </section>

      {/* Login modal al entrar */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </MainLayout>
  );
}
