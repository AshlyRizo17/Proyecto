import SecureMap from "../components/SecureMap";

export default function GpsPage() {
  return (
    <div>
      {/* Botón volver */}
      <a href="/ventana">
        <button className="volver-btn">
          <span className="volver-icon">←</span>
          Volver
        </button>
      </a>

      {/* Header */}
      <div className="header">
        <h1>🔒 GPS</h1>
        <div className="status-indicators">
          <div className="status-item">
            <div className="status-dot dot-online"></div>
            <span>Sistema Activo</span>
          </div>
          <div className="status-item">
            <div className="status-dot dot-gps"></div>
            <span>GPS Conectado</span>
          </div>
        </div>
      </div>

      {/* Mapa con controles */}
      <SecureMap />
    </div>
  );
}