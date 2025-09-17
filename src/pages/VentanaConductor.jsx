import React, { useEffect } from "react";
import "../styles/ventana_conductor.css"; // Importa tu CSS

export default function DriverPanel() {
  const volverAlSelector = () => {
    window.location.href = "index.html";
  };

  const actualizarEstadisticas = () => {
    console.log("Actualizando estadísticas del conductor...");
    // Aquí podrías implementar la lógica real (ej: fetch API)
  };

  useEffect(() => {
    console.log("Panel de conductor cargado correctamente");
    actualizarEstadisticas();
  }, []);

  return (
    <>
      {/* Botón Volver */}
      <a
        href="./conductor.html"
        className="volver-btn"
        onClick={volverAlSelector}
      >
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
            <div style={{ fontWeight: 600 }}>Conductor</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Panel de Control
            </div>
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              // Aquí hice el cambio
              window.location.href = "/"; // Redirige al inicio
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="admin-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Panel de Conductor</h1>
          <p>
            Visualiza tus rutas, horarios, vehículos asignados y notificaciones
            de servicio
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h2 className="stats-title">Mi Estado Actual</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Rutas Asignadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">8h</div>
              <div className="stat-label">Horas Programadas Hoy</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Rutas Completadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2</div>
              <div className="stat-label">Notificaciones Pendientes</div>
            </div>
          </div>
        </div>

        {/* Driver Cards Grid */}
        <div className="admin-grid">
          {/* Consultar Rutas Asignadas */}
          <div className="admin-card" data-modal="routes-modal">
            <div className="card-icon">
              <i className="fas fa-route"></i>
            </div>
            <h3>Consultar Rutas Asignadas</h3>
            <p>
              Revisa todas las rutas que tienes programadas para hoy y los
              próximos días
            </p>
            <ul className="card-features">
              <li>
                <i className="fas fa-check"></i> Ver rutas del día
              </li>
              <li>
                <i className="fas fa-check"></i> Mapa de ubicaciones
              </li>
              <li>
                <i className="fas fa-check"></i> Horarios estimados
              </li>
              <li>
                <i className="fas fa-check"></i> Detalles de cada parada
              </li>
            </ul>
          </div>

          {/* Ver Horario de Trabajo */}
          <div className="admin-card" data-modal="schedule-modal">
            <div className="card-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3>Ver Mi Horario de Trabajo</h3>
            <p>
              Consulta tu horario semanal, turnos asignados y programación de
              servicios
            </p>
            <ul className="card-features">
              <li>
                <i className="fas fa-check"></i> Horario semanal
              </li>
              <li>
                <i className="fas fa-check"></i> Turnos especiales
              </li>
              <li>
                <i className="fas fa-check"></i> Días libres
              </li>
              <li>
                <i className="fas fa-check"></i> Horas extra
              </li>
            </ul>
          </div>

          {/* Registrar Recolección */}
          <div className="admin-card" data-modal="register-modal">
            <div className="card-icon">
              <i className="fas fa-clipboard-check"></i>
            </div>
            <h3>Registrar Inicio y Fin de Recolección</h3>
            <p>
              Marca el inicio y finalización de cada ruta para llevar un control
              preciso
            </p>
            <ul className="card-features">
              <li>
                <i className="fas fa-check"></i>{" "}
                <span className="status-indicator status-active"></span>Iniciar
                ruta
              </li>
              <li>
                <i className="fas fa-check"></i>{" "}
                <span className="status-indicator status-pending"></span>Marcar
                paradas
              </li>
              <li>
                <i className="fas fa-check"></i> Finalizar recolección
              </li>
              <li>
                <i className="fas fa-check"></i> Tiempo registrado
              </li>
            </ul>
          </div>

          {/* Ver Notificaciones */}
          <div className="admin-card" data-modal="notifications-modal">
            <div className="card-icon">
              <i className="fas fa-bell"></i>
            </div>
            <h3>Ver Notificaciones y Mensajes</h3>
            <p>
              Mantente informado sobre cambios en rutas, mensajes importantes y
              alertas
            </p>
            <ul className="card-features">
              <li>
                <i className="fas fa-check"></i> Mensajes del sistema
              </li>
              <li>
                <i className="fas fa-check"></i> Cambios de ruta
              </li>
              <li>
                <i className="fas fa-check"></i> Alertas importantes
              </li>
              <li>
                <i className="fas fa-check"></i>{" "}
                <span className="status-indicator status-pending"></span>2
                pendientes
              </li>
            </ul>
          </div>

          {/* Reportar Incidencias */}
          <div className="admin-card" data-modal="incidents-modal">
            <div className="card-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Reportar Incidencias o Problemas</h3>
            <p>
              Informa sobre cualquier problema durante tu ruta o con el vehículo
              asignado
            </p>
            <ul className="card-features">
              <li>
                <i className="fas fa-check"></i> Problemas de vehículo
              </li>
              <li>
                <i className="fas fa-check"></i> Incidentes en ruta
              </li>
              <li>
                <i className="fas fa-check"></i> Retrasos o bloqueos
              </li>
              <li>
                <i className="fas fa-check"></i> Reportes de seguridad
              </li>
            </ul>
          </div>

          {/* Mi Vehículo Asignado */}
          <div className="admin-card" data-modal="vehicle-modal">
            <div className="card-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Mi Vehículo Asignado</h3>
            <p>
              Información sobre el vehículo que tienes asignado y su estado
              actual
            </p>
            <ul className="card-features">
              <li>
                <i className="fas fa-check"></i>{" "}
                <span className="status-indicator status-active"></span>Estado:
                Operativo
              </li>
              <li>
                <i className="fas fa-check"></i> Nivel de combustible
              </li>
              <li>
                <i className="fas fa-check"></i> Próximo mantenimiento
              </li>
              <li>
                <i className="fas fa-check"></i> Documentos del vehículo
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal Container */}
      <div id="modal-container"></div>
    </>
  );
}
