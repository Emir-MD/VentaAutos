import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";

// Casteo explícito para evitar el error de posible null
const rootEl = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
