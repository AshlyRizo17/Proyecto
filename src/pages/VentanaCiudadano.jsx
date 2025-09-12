import React, { useEffect } from 'react';
import "../styles/ventana_ciudadano.css"; // Importa tu CSS
export default function VentanaCiudadano() {
  const volverAlInicio = () => {
    alert('Navegando al inicio...');
    // window.location.href = 'index.html';
  };

  const actualizarEstadisticasCiudadano = () => {
    console.log('Actualizando estadísticas del ciudadano...');
  };

  const handleCardClick = (cardTitle, modalId) => {
    console.log('Abriendo modal:', modalId);
    alert(`Clickeaste en: ${cardTitle}`);
  };

  const mostrarNotificacion = (mensaje, tipo = 'info') => {
    console.log(`Notificación ${tipo}: ${mensaje}`);
  };

  useEffect(() => {
    console.log('Panel de ciudadano cargado correctamente');
    actualizarEstadisticasCiudadano();
  }, []);

  const statsData = [
    { number: '3', label: 'Solicitudes Activas' },
    { number: '12', label: 'Recolecciones Completadas' },
    { number: '2', label: 'Notificaciones Nuevas' },
    { number: '95%', label: 'Separación de Residuos' }
  ];

  const cardData = [
    {
      id: 'requests-modal',
      icon: 'fas fa-file-alt',
      title: 'Ver Mis Solicitudes',
      description: 'Consulta el estado de todas tus solicitudes de recolección y servicios especiales',
      features: [
        { icon: 'fas fa-check', text: '3 activas', hasStatus: true, statusClass: 'status-active' },
        { icon: 'fas fa-check', text: 'Historial completo' },
        { icon: 'fas fa-check', text: 'Estado en tiempo real' },
        { icon: 'fas fa-check', text: 'Fechas programadas' }
      ]
    },
    {
      id: 'new-request-modal',
      icon: 'fas fa-plus-circle',
      title: 'Solicitar Nueva Recolección',
      description: 'Programa una nueva recolección de residuos especiales o servicios adicionales',
      features: [
        { icon: 'fas fa-check', text: 'Residuos especiales' },
        { icon: 'fas fa-check', text: 'Recolección a domicilio' },
        { icon: 'fas fa-check', text: 'Programar fecha' },
        { icon: 'fas fa-check', text: 'Seguimiento automático' }
      ]
    },
    {
      id: 'notifications-modal',
      icon: 'fas fa-bell',
      title: 'Ver Notificaciones Recibidas',
      description: 'Mantente informado sobre el estado de tus servicios y mensajes importantes',
      features: [
        { icon: 'fas fa-check', text: '2 nuevas', hasStatus: true, statusClass: 'status-pending' },
        { icon: 'fas fa-check', text: 'Cambios en horarios' },
        { icon: 'fas fa-check', text: 'Confirmaciones' },
        { icon: 'fas fa-check', text: 'Alertas del sistema' }
      ]
    },
    {
      id: 'routes-modal',
      icon: 'fas fa-map-marked-alt',
      title: 'Consultar Áreas y Rutas Ecológicas',
      description: 'Explora las zonas de recolección, puntos ecológicos y rutas disponibles',
      features: [
        { icon: 'fas fa-check', text: 'Mapa interactivo' },
        { icon: 'fas fa-check', text: 'Puntos de reciclaje' },
        { icon: 'fas fa-check', text: 'Horarios de servicio' },
        { icon: 'fas fa-check', text: 'Ubicación de contenedores' }
      ]
    },
    {
      id: 'resources-modal',
      icon: 'fas fa-book-open',
      title: 'Acceder a Recursos y Guías',
      description: 'Aprende sobre separación de residuos, reciclaje y prácticas sostenibles',
      features: [
        { icon: 'fas fa-check', text: 'Guías de separación' },
        { icon: 'fas fa-check', text: 'Tips ecológicos' },
        { icon: 'fas fa-check', text: 'Videos educativos' },
        { icon: 'fas fa-check', text: 'Documentos descargables' }
      ]
    },
    {
      id: 'profile-modal',
      icon: 'fas fa-user-edit',
      title: 'Actualizar Mis Datos',
      description: 'Mantén tu información personal y preferencias de contacto actualizadas',
      features: [
        { icon: 'fas fa-check', text: 'Perfil verificado', hasStatus: true, statusClass: 'status-active' },
        { icon: 'fas fa-check', text: 'Información de contacto' },
        { icon: 'fas fa-check', text: 'Preferencias de notificación' },
        { icon: 'fas fa-check', text: 'Configuración de privacidad' }
      ]
    }
  ];

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      
      <div className="citizen-dashboard">
        {/* Botón Volver */}
        <button className="volver-btn" onClick={volverAlInicio}>
          <span className="volver-icon">←</span>
          Volver
        </button>

        {/* Header */}
        <header className="admin-header">
          <div className="logo">
            <span></span>
          </div>
          <div className="admin-info">
            <div className="admin-avatar">C</div>
            <div>
              <div style={{ fontWeight: 600 }}>Ciudadano</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Portal Ciudadano</div>
            </div>
            <button className="logout-btn" onClick={() => alert('Cerrando sesión...')}>
              <i className="fas fa-sign-out-alt"></i>
              Cerrar Sesión
            </button>
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
              {statsData.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Cards Grid */}
          <div className="admin-grid">
            {cardData.map((card) => (
              <div 
                key={card.id}
                className="admin-card" 
                onClick={() => handleCardClick(card.title, card.id)}
              >
                <div className="card-icon">
                  <i className={card.icon}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul className="card-features">
                  {card.features.map((feature, index) => (
                    <li key={index}>
                      <i className={feature.icon}></i>
                      {feature.hasStatus && (
                        <span className={`status-indicator ${feature.statusClass}`}></span>
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Container */}
        <div id="modal-container"></div>
      </div>
    </>
  );
};