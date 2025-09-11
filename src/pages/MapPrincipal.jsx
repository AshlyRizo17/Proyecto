import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function RecoMap() {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const L = window.L;

    // Crear mapa
    const mapInstance = L.map("map").setView([4.60971, -74.08175], 13);

    // TileLayer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    // Ejemplo: añadir camiones fijos (luego podemos cargar de trucks.data.js)
    const trucks = [
      { lat: 4.60971, lng: -74.08175, name: "Camión 1" },
      { lat: 4.62, lng: -74.09, name: "Camión 2" },
    ];

    trucks.forEach((t) => {
      L.marker([t.lat, t.lng]).addTo(mapInstance).bindPopup(`🚛 ${t.name}`);
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Función: centrar en mi ubicación
  const findMyLocation = () => {
    if (!map) return;
    map.locate({ setView: true, maxZoom: 16 });
  };

  // Función: alternar auto update
  const toggleAutoUpdate = () => {
    setAutoUpdate(!autoUpdate);
  };

  return (
    <div className="container">
      <div className="dashboard">
        {/* Mapa */}
        <div className="map-container">
          <div id="map" style={{ height: "500px", width: "100%" }}></div>
        </div>

        {/* Panel de controles */}
        <div className="controls">
          <button className="btn btn-primary" onClick={findMyLocation}>
            📍 Mi Ubicación
          </button>
          <button className="btn btn-secondary" onClick={toggleAutoUpdate}>
            🔄 Auto-actualizar:{" "}
            <span id="auto-status">{autoUpdate ? "ON" : "OFF"}</span>
          </button>

          <div className="truck-list">
            <h3 style={{ color: "#2E7D32", marginBottom: "15px" }}>
              🚛 Camiones Activos
            </h3>
            {/* Lista estática, luego se conecta con trucks.data.js */}
            <ul>
              <li>Camión 1</li>
              <li>Camión 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}