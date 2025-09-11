import React, { useEffect } from "react";
import "./ventana_ciudadano.css"; // Importa tu CSS

export default function CitizenPanel() {
  const volverAlInicio = () => {
    window.location.href = "index.html";
  };

  const actualizarEstadisticasCiudadano = () => {
    console.log("Actualizando estadísticas del ciudadano...");
    // Aquí podrías hacer llamadas a API reales
  };

  const mostrarNotificacion = (mensaje, tipo = "info") => {
    console.log(`Notificación ${tipo}: ${mensaje}`);
    // Aquí puedes implementar un sistema de notificaciones tipo toast
  };

  useEffect(() => {
    console.log("Panel de ciudadano cargado correctamente");
    actualizarEstadisticasCiudadano();
  }, []);

  return (
    <>
      {/* Botón Volver */}
      <a href="../public/ciudadano.html" className="volver-btn" onClick={volverAlInicio}>
        <span className="volver-icon">←</span>
        Volver
      </a>

      {/* Header */}
      <header className="admin-header">
        <div className="logo">
          <span></span>
        </div>
        <div className="admin-info">
          <div className="admin-avatar">C</div>
          <div>
            <div style={{ fontWeight: 600 }}>Ciudadano</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Portal Ciudadano</div>
          </div>
          <a href="./index.html" className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            Cerrar Sesión
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="admin-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Área Ciudadano</h1>
          <p>Consulta tus solicitudes, recibe notificaciones y accede a recursos educativos</p>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h2 className="stats-title">Mi Actividad</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Solicitudes Activas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">Recolecciones Completadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2</div>
              <div className="stat-label">Notificaciones Nuevas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Separación de Residuos</div>
            </div>
          </div>
        </div>

        {/* Citizen Cards Grid */}
        <div className="admin-grid">
          {/* Ver mis solicitudes */}
          <div className="admin-card" data-modal="requests-modal">
            <div className="card-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <a href="./solicitud_ciu.html">
              <h3>Ver Mis Solicitudes</h3>
              <p>Consulta el estado de todas tus solicitudes de recolección y servicios especiales</p>
              <ul className="card-features">
                <li><i className="fas fa-check"></i> <span className="status-indicator status-active"></span>3 activas</li>
                <li><i className="fas fa-check"></i> Historial completo</li>
                <li><i className="fas fa-check"></i> Estado en tiempo real</li>
                <li><i className="fas fa-check"></i> Fechas programadas</li>
              </ul>
            </a>
          </div>

          {/* Solicitar nueva recolección */}
          <div className="admin-card" data-modal="new-request-modal">
            <div className="card-icon">
              <i className="fas fa-plus-circle"></i>
            </div>
            <a href="./n.recolección.html">
              <h3>Solicitar Nueva Recolección</h3>
              <p>Programa una nueva recolección de residuos especiales o servicios adicionales</p>
              <ul className="card-features">
                <li><i className="fas fa-check"></i> Residuos especiales</li>
                <li><i className="fas fa-check"></i> Recolección a domicilio</li>
                <li><i className="fas fa-check"></i> Programar fecha</li>
                <li><i className="fas fa-check"></i> Seguimiento automático</li>
              </ul>
            </a>
          </div>

          {/* Ver notificaciones */}
          <div className="admin-card" data-modal="notifications-modal">
            <div className="card-icon">
              <i className="fas fa-bell"></i>
            </div>
            <a href="./ver_noti.html">
              <h3>Ver Notificaciones Recibidas</h3>
              <p>Mantente informado sobre el estado de tus servicios y mensajes importantes</p>
              <ul className="card-features">
                <li><i className="fas fa-check"></i> <span className="status-indicator status-pending"></span>2 nuevas</li>
                <li><i className="fas fa-check"></i> Cambios en horarios</li>
                <li><i className="fas fa-check"></i> Confirmaciones</li>
                <li><i className="fas fa-check"></i> Alertas del sistema</li>
              </ul>
            </a>
          </div>

          {/* Consultar áreas y rutas */}
          <div className="admin-card" data-modal="routes-modal">
            <div className="card-icon">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <a href="./consulta_area.html">
              <h3>Consultar Áreas y Rutas Ecológicas</h3>
              <p>Explora las zonas de recolección, puntos ecológicos y rutas disponibles</p>
              <ul className="card-features">
                <li><i className="fas fa-check"></i> Mapa interactivo</li>
                <li><i className="fas fa-check"></i> Puntos de reciclaje</li>
                <li><i className="fas fa-check"></i> Horarios de servicio</li>
                <li><i className="fas fa-check"></i> Ubicación de contenedores</li>
              </ul>
            </a>
          </div>

          {/* Recursos y guías */}
          <div className="admin-card" data-modal="resources-modal">
            <div className="card-icon">
              <i className="fas fa-book-open"></i>
            </div>
            <a href="./acceder_r.html">
              <h3>Acceder a Recursos y Guías</h3>
              <p>Aprende sobre separación de residuos, reciclaje y prácticas sostenibles</p>
              <ul className="card-features">
                <li><i className="fas fa-check"></i> Guías de separación</li>
                <li><i className="fas fa-check"></i> Tips ecológicos</li>
                <li><i className="fas fa-check"></i> Videos educativos</li>
                <li><i className="fas fa-check"></i> Documentos descargables</li>
              </ul>
            </a>
          </div>

          {/* Actualizar datos */}
          <div className="admin-card" data-modal="profile-modal">
            <div className="card-icon">
              <i className="fas fa-user-edit"></i>
            </div>
            <a href="./act_datos.html">
              <h3>Actualizar Mis Datos</h3>
              <p>Mantén tu información personal y preferencias de contacto actualizadas</p>
              <ul className="card-features">
                <li><i className="fas fa-check"></i> <span className="status-indicator status-active"></span>Perfil verificado</li>
                <li><i className="fas fa-check"></i> Información de contacto</li>
                <li><i className="fas fa-check"></i> Preferencias de notificación</li>
                <li><i className="fas fa-check"></i> Configuración de privacidad</li>
              </ul>
            </a>
          </div>
        </div>
      </div>

      {/* Modal Container */}
      <div id="modal-container"></div>
    </>
  );
}