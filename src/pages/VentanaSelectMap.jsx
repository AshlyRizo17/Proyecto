import React from "react";
import "../styles/VentanaSelecMap.css"; // Importa tu CSS

export default function VentanaSelectMap() {
  const redirectToPublicMap = () => {
    window.location.href = "mapa_principal.html";
  };

  const redirectToPrivateMap = () => {
    window.location.href = "mapa_solicitud.html";
  };

  return (
    <div className="container">
      <h1>Selecciona el Tipo de Mapa</h1>

      <div className="buttons-container">
        {/* Botón Mapa Público */}
        <button className="map-button" onClick={redirectToPublicMap}>
          <span className="icon">🗺️</span>
          Mapa Solicitud de Recolección
        </button>

        {/* Botón Mapa Privado */}
        <button className="map-button private" onClick={redirectToPrivateMap}>
          <span className="icon">📍</span>
          Mapa Solicitud Privada
        </button>
      </div>
    </div>
  );
}