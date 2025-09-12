import { useEffect, useState } from "react";
import "../styles/MapSolicitudes.css"; // Importa tus estilos CSS

export default function MapSolicitudes() {
  const [map, setMap] = useState(null);
  const [privateMode, setPrivateMode] = useState(true);
  const [requestCode, setRequestCode] = useState("");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const L = window.L;

    const mapInstance = L.map("map-secure").setView([4.60971, -74.08175], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    // Ejemplo de marcador inicial
    L.marker([4.60971, -74.08175])
      .addTo(mapInstance)
      .bindPopup("🔒 Ubicación Segura");

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  const findMyLocation = () => {
    if (!map) return;
    map.locate({ setView: true, maxZoom: 16 });
  };

  const togglePrivateMode = () => {
    setPrivateMode(!privateMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestCode.trim()) return;

    const newRequest = {
      id: Date.now(),
      code: requestCode,
    };

    setRequests([...requests, newRequest]);
    setRequestCode("");
  };

  return (
    <div className="container">
      <div className="dashboard">
        {/* Mapa */}
        <div className="map-container">
          <div
            id="map-secure"
            style={{ height: "500px", width: "100%" }}
          ></div>
        </div>

        {/* Panel lateral */}
        <div className="controls">
          <button className="btn btn-primary" onClick={findMyLocation}>
            📍 Mi Ubicación
          </button>
          <button className="btn btn-secondary" onClick={togglePrivateMode}>
            🔒 Modo Privado:{" "}
            <span id="private-status">{privateMode ? "ON" : "OFF"}</span>
          </button>

          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div className="form-group">
              <label htmlFor="requestCode">Código Privado</label>
              <input
                type="password"
                id="requestCode"
                placeholder="Código de identificación"
                value={requestCode}
                onChange={(e) => setRequestCode(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-create">
              Generar Solicitud
            </button>
          </form>

          {/* Lista de solicitudes */}
          <div className="request-list" style={{ marginTop: "20px" }}>
            <h3 style={{ color: "#030303", marginBottom: "15px" }}>
              Solicitud Activa
            </h3>
            <ul>
              {requests.length === 0 ? (
                <li>No hay solicitudes activas</li>
              ) : (
                requests.map((req) => (
                  <li key={req.id}>🔑 Código: {req.code}</li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}