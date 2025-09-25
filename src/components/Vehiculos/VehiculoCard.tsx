import React from "react";
import { Link } from "react-router-dom";
import "./vehiculos.css";

interface Props {
  id: string;
  nombre: string;
  precio: string;
  imagen: string;
}

export default function VehiculoCard({ id, nombre, precio, imagen }: Props) {
  return (
    <Link to={`/vehiculos/${id}`} className="vehiculo-card">
      <img src={imagen} alt={nombre} className="vehiculo-img" />
      <h4>{nombre}</h4>
      <p className="vehiculo-precio">{precio}</p>
    </Link>
  );
}
