import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import "../components/Vehiculos/vehiculos.css";

export default function VehiculoDetailPage() {
  const { id } = useParams();

  // 🔹 Lista de vehículos
  const vehiculos = [
    { id: "1812", nombre: "Lincoln Navigator Reserve 2019", precio: "$585,000.00", imagen: "/car.png" },
    { id: "8138", nombre: "BMW X6 M Competition 2020", precio: "$658,000.00", imagen: "/car.png" },
    { id: "9147", nombre: "BMW X5 xDrive 40i 2021", precio: "$778,000.00", imagen: "/car.png" },
    { id: "9182", nombre: "Audi A3 2019", precio: "$248,000.00", imagen: "/car.png" },
  ];

  const vehiculo = vehiculos.find((v) => v.id === id);

  if (!vehiculo) {
    return (
      <MainLayout>
        <div className="vehiculo-detail-container">
          <h2>Vehículo no encontrado</h2>
          <Link to="/vehiculos" className="volver-link">← Volver</Link>
        </div>
      </MainLayout>
    );
  }

  // 🔹 Galería (4 imágenes por ahora con el mismo car.png)
  const galeria = [vehiculo.imagen, "/car.png", "/car.png", "/car.png"];
  const [selectedImg, setSelectedImg] = useState(galeria[0]);

  return (
    <MainLayout>
      <div className="vehiculo-detail-container">
        <Link to="/vehiculos" className="volver-link">← Volver</Link>

        <div className="vehiculo-detail-card">
          {/* Imagen grande + miniaturas */}
          <div className="vehiculo-detail-left">
            <img src={selectedImg} alt={vehiculo.nombre} className="vehiculo-detail-img" />

            <div className="galeria-thumbs">
              {galeria.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Foto ${idx + 1}`}
                  className={`thumb ${selectedImg === img ? "active" : ""}`}
                  onClick={() => setSelectedImg(img)}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="vehiculo-detail-right">
            <h2>{vehiculo.nombre}</h2>
            <p className="vehiculo-precio">{vehiculo.precio}</p>

            <div className="vehiculo-actions">
              <button className="btn-solid">Me interesa</button>
              <button className="btn-outline">Llamar</button>
            </div>

            <p className="muted">Atención a compradores <strong>+52 55 9418 5288</strong></p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
