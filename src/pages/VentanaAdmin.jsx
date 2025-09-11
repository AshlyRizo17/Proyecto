import React from "react";
import "../styles/VentanaAdmin.css"; // Importa tu CSS

export default function AdminPanel() {
  const volverAlSelector = () => {
    console.log("Volviendo al selector...");
  };

  return (
    <>
      {/* Botón Volver */}
      <a href="./admin.html">
        <button
          className="volver-btn"
          onClick={volverAlSelector}
        >
          <span className="volver-icon">←</span>
          Volver
        </button>
      </a>

      {/* Header */}
      <header className="admin-header">
        <div className="logo">
          <i className="fas fa-leaf"></i>
          <span>Zero Waste</span>
        </div>

        <div className="admin-info">
          <div className="admin-avatar">AD</div>
          <div>
            <div style={{ fontWeight: 600 }}>Administrador</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Sistema de Gestión
            </div>
          </div>
          <a href="./index.html">
            <button className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              Cerrar Sesión
            </button>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="admin-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Panel de Administración</h1>
          <p>
            Gestiona eficientemente el sistema Zero Waste desde un solo lugar
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h2 className="stats-title">Estadísticas del Sistema</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1,247</div>
              <div className="stat-label">Usuarios Activos</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">89</div>
              <div className="stat-label">Empresas Registradas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">156</div>
              <div className="stat-label">Rutas Configuradas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">45</div>
              <div className="stat-label">Vehículos Activos</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">234</div>
              <div className="stat-label">Solicitudes Pendientes</div>
            </div>
          </div>
        </div>

        {/* Admin Cards Grid */}
        <div className="admin-grid">
          {/* Gestionar Usuarios y Empresas */}
          <div className="admin-card">
            <div className="card-icon">
              <i className="fas fa-users"></i>
            </div>
            <a href="./gestion_UE.html">
              <h3>Gestionar Usuarios y Empresas</h3>
              <p>
                Administra cuentas de usuarios, empresas aliadas y permisos del
                sistema
              </p>
              <ul className="card-features">
                <li>
                  <i className="fas fa-check"></i> Crear y editar usuarios
                </li>
                <li>
                  <i className="fas fa-check"></i> Gestión de empresas
                </li>
                <li>
                  <i className="fas fa-check"></i> Control de permisos
                </li>
                <li>
                  <i className="fas fa-check"></i> Estados de cuentas
                </li>
              </ul>
            </a>
          </div>

          {/* Configurar Rutas */}
          <div className="admin-card">
            <div className="card-icon">
              <i className="fas fa-route"></i>
            </div>
            <a href="./config_rutas.html">
              <h3>Configurar Rutas de Recolección</h3>
            </a>
            <p>
              Optimiza y gestiona las rutas de recolección para máxima eficiencia
            </p>
            <ul className="card-features">
              <li>
                <i className="fas fa-check"></i> Crear nuevas rutas
              </li>
              <li>
                <i className="fas fa-check"></i> Optimización automática
              </li>
              <li>
                <i className="fas fa-check"></i> Horarios personalizados
              </li>
              <li>
                <i className="fas fa-check"></i> Seguimiento en tiempo real
              </li>
            </ul>
          </div>

          {/* Asignar Vehículos */}
          <div className="admin-card">
            <div className="card-icon">
              <i className="fas fa-truck"></i>
            </div>
            <a href="./asignación_VC.html">
              <h3>Asignar Vehículos y Conductores</h3>
              <p>
                Gestiona la flota de vehículos y asigna conductores a las rutas
              </p>
              <ul className="card-features">
                <li>
                  <i className="fas fa-check"></i> Registro de vehículos
                </li>
                <li>
                  <i className="fas fa-check"></i> Asignación de conductores
                </li>
                <li>
                  <i className="fas fa-check"></i> Mantenimiento programado
                </li>
                <li>
                  <i className="fas fa-check"></i> Control de combustible
                </li>
              </ul>
            </a>
          </div>

          {/* Solicitudes y Notificaciones */}
          <div className="admin-card">
            <div className="card-icon">
              <i className="fas fa-bell"></i>
            </div>
            <a href="./notificacion.html">
              <h3>Revisar Solicitudes y Notificaciones</h3>
              <p>
                Gestiona solicitudes especiales y envía notificaciones importantes
              </p>
              <ul className="card-features">
                <li>
                  <i className="fas fa-check"></i> Solicitudes especiales
                </li>
                <li>
                  <i className="fas fa-check"></i> Notificaciones masivas
                </li>
                <li>
                  <i className="fas fa-check"></i> Alertas del sistema
                </li>
                <li>
                  <i className="fas fa-check"></i> Comunicación directa
                </li>
              </ul>
            </a>
          </div>

          {/* Reportes y Estadísticas */}
          <div className="admin-card">
            <div className="card-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <a href="reporte.html">
              <h3>Generar Reportes y Estadísticas</h3>
              <p>
                Analiza el rendimiento del sistema con reportes detallados
              </p>
              <ul className="card-features">
                <li>
                  <i className="fas fa-check"></i> Reportes automáticos
                </li>
                <li>
                  <i className="fas fa-check"></i> Métricas de impacto
                </li>
                <li>
                  <i className="fas fa-check"></i> Análisis predictivo
                </li>
                <li>
                  <i className="fas fa-check"></i> Exportar datos
                </li>
              </ul>
            </a>
          </div>
        </div>
      </div>

      {/* Modals Container */}
      <div id="modal-container"></div>
    </>
  );
}
