import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, CalendarDays, Edit2, Save, X, 
  LogOut, Home, Truck, Bell, BookOpen, Map, CheckCircle, 
  Gauge, AlertCircle, Clock
} from 'lucide-react';
// Importación del CSS puro
import "../styles/conductor.css" 

// Función utilitaria para formato de fecha
const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-CO', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const Conductor = () => {
  const [pestanaActiva, setPestanaActiva] = useState('perfil');
  const [editando, setEditando] = useState(false);

  // Datos del conductor iniciales
  const [usuario, setUsuario] = useState({
    nombre: 'Carlos',
    apellido: 'Ramírez',
    email: 'carlos.ramirez@logistica.com',
    telefono: '+57 300 987 6543',
    documento: '1020304050',
    localidad: 'Engativá, Bogotá',
    vehiculo: 'Placa: JFG-452 | Tipo: Camión',
    rol: 'Conductor Certificado',
    fechaRegistro: '2023-08-01T08:00:00',
    licencia: 'Categoría C3',
  });

  const [formData, setFormData] = useState(usuario);
  
  // Datos de ejemplo para las estadísticas del conductor
  const driverStats = {
    serviciosPendientes: 5,
    rutasCompletadasMes: 85,
    kilometrosSemana: 1240,
    indiceEficiencia: 98,
  };

  const iniciales = `${formData.nombre?.[0] || ''}${formData.apellido?.[0] || ''}`.toUpperCase();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setFormData(usuario); 
    setEditando(true);
  };

  const handleSave = () => {
    console.log('Guardando datos de conductor:', formData); 
    setUsuario(formData); 
    setEditando(false);
  };

  const handleCancel = () => {
    setFormData(usuario); 
    setEditando(false);
  };

  const renderContenido = () => {
    const commonContentClasses = "card-content";

    switch (pestanaActiva) {
      case 'perfil':
        // CÓDIGO DE PERFIL (sin cambios)
        return (
          <div className="profile-section">
            <div className={`${commonContentClasses} card-header-main`}>
              <div className='card-title-group'>
                <h2 className="title-lg">Mi Perfil de Conductor</h2>
                <p className="subtitle">Información de contacto y vehículo asignado.</p>
              </div>
              
              {!editando ? (
                <button
                  onClick={handleEdit}
                  className="btn btn-primary btn-edit"
                >
                  <Edit2 size={18} />
                  Editar Perfil
                </button>
              ) : (
                <div className="btn-group-edit">
                  <button
                    onClick={handleSave}
                    className="btn btn-success"
                  >
                    <Save size={18} />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-danger"
                  >
                    <X size={18} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className={commonContentClasses}>
              <div className="profile-header">
                <div className="avatar-group">
                  <div className="avatar-initials-ring">
                    <span className="avatar-initials">{iniciales}</span>
                  </div>
                  <div>
                    {editando ? (
                      <div className="input-group-name">
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className="input-name"
                          placeholder="Nombre"
                        />
                        <input
                          type="text"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          className="input-name"
                          placeholder="Apellido"
                        />
                      </div>
                    ) : (
                      <h3 className="profile-name-display">
                        {usuario.nombre} {usuario.apellido}
                      </h3>
                    )}
                    <p className="profile-role-display">{usuario.rol}</p>
                  </div>
                </div>
              </div>

              {/* Grid de Datos del Conductor */}
              <div className="data-grid">
                
                {/* Correo Electrónico */}
                <div className="data-item">
                  <label className="data-label">
                    <Mail size={16} className="icon-primary" />
                    Correo Electrónico
                  </label>
                  {editando ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="data-value">{usuario.email}</p>
                  )}
                </div>

                {/* Teléfono */}
                <div className="data-item">
                  <label className="data-label">
                    <Phone size={16} className="icon-primary" />
                    Teléfono
                  </label>
                  {editando ? (
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="data-value">{usuario.telefono}</p>
                  )}
                </div>

                {/* Documento (No Editable) */}
                <div className="data-item">
                  <label className="data-label disabled-label">
                    <User size={16} className="icon-primary" />
                    Documento
                  </label>
                  <p className="data-value data-disabled">
                    {usuario.documento}
                  </p>
                </div>

                {/* Localidad */}
                <div className="data-item">
                  <label className="data-label">
                    <MapPin size={16} className="icon-primary" />
                    Localidad Base
                  </label>
                  {editando ? (
                    <input
                      type="text"
                      name="localidad"
                      value={formData.localidad}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="data-value">{usuario.localidad}</p>
                  )}
                </div>
                
                {/* Vehículo Asignado (Editable) */}
                <div className="data-item wide-item">
                  <label className="data-label">
                    <Truck size={16} className="icon-primary" />
                    Vehículo / Licencia
                  </label>
                  {editando ? (
                    <input
                      type="text"
                      name="vehiculo"
                      value={formData.vehiculo}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="data-value">{usuario.vehiculo} / {usuario.licencia}</p>
                  )}
                </div>

                {/* Miembro desde (No Editable) */}
                <div className="data-item">
                  <label className="data-label disabled-label">
                    <CalendarDays size={16} className="icon-primary" />
                    Miembro desde
                  </label>
                  <p className="data-value data-disabled">
                    {formatDate(usuario.fechaRegistro)}
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas de Operación */}
            <h3 className="title-md stats-title">Métricas de Rendimiento</h3>
            <div className="stats-grid">
              {/* Servicios Pendientes */}
              <div className="stat-card stat-blue">
                <Truck className="stat-icon" size={32} />
                <p className="stat-number">{driverStats.serviciosPendientes}</p>
                <p className="stat-label">Servicios Pendientes</p>
              </div>
              
              {/* Rutas Completadas (Mes) */}
              <div className="stat-card stat-green">
                <CheckCircle className="stat-icon" size={32} />
                <p className="stat-number">{driverStats.rutasCompletadasMes}</p>
                <p className="stat-label">Rutas Completadas (Mes)</p>
              </div>
              
              {/* Kilómetros Recorridos (Semana) */}
              <div className="stat-card stat-amber">
                <Clock className="stat-icon" size={32} />
                <p className="stat-number">{driverStats.kilometrosSemana}</p>
                <p className="stat-label">Kilómetros Recorridos (Semana)</p>
              </div>
              
              {/* Índice de Eficiencia */}
              <div className="stat-card stat-purple">
                <Gauge className="stat-icon" size={32} />
                <p className="stat-number">{driverStats.indiceEficiencia}%</p>
                <p className="stat-label">Índice de Eficiencia</p>
              </div>
            </div>
          </div>
        );

      case 'servicios':
        // CÓDIGO DE SERVICIOS (sin cambios)
        return (
          <div className={commonContentClasses}>
            <h2 className="title-lg">Servicios Asignados</h2>
            <p className="subtitle">Lista de recolecciones y entregas programadas para hoy y mañana.</p>
            <div className="empty-state">
                <Truck className="empty-icon" size={32} />
                <p>No hay servicios pendientes en su ruta actual. ¡Buen trabajo!</p>
            </div>
          </div>
        );
      case 'alertas':
        // CÓDIGO DE ALERTAS (sin cambios)
        return (
          <div className={commonContentClasses}>
            <h2 className="title-lg">Alertas y Novedades</h2>
            <p className="subtitle">Mensajes importantes sobre cierres de vías o cambios en la ruta.</p>
            <div className="alert-list">
                <div className="alert alert-error">
                    <AlertCircle className="alert-icon" size={24} />
                    <div>
                        <p className="alert-title">Cierre de Vía Programado</p>
                        <p className="alert-message">La Av. Boyacá estará cerrada entre calles 100 y 116. Alternativa: Calle 127.</p>
                    </div>
                </div>
                <div className="alert alert-info">
                    <Bell className="alert-icon" size={24} />
                    <div>
                        <p className="alert-title">Novedad Operativa</p>
                        <p className="alert-message">El punto de acopio central tiene nuevos horarios de recepción de material. Verificar en Documentación.</p>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'rutas':
        // CÓDIGO ACTUALIZADO: MAPA INTERACTIVO
        const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15904.306059438992!2d-74.12053006248981!3d4.673859664539568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x8e3f9b2d8d80f68d%3A0xf639a0669d67b2d5!2sEngativ%C3%A1%2C%20Bogot%C3%A1!3m2!1d4.6938994!2d-74.1102927!4m5!1s0x8e3f9b295c52c287%3A0xc6651a0292742157!2sFontib%C3%B3n%2C%20Bogot%C3%A1!3m2!1d4.674997699999999!2d-74.1481525!5e0!3m2!1ses-419!2sco!4v1709249453912!5m2!1ses-419!2sco";
        
        return (
          <div className={commonContentClasses}>
            <h2 className="title-lg">Rutas de Recolección</h2>
            <p className="subtitle">Visualización de la ruta óptima y puntos de recolección (Engativá a Fontibón).</p>
            
            {/* Contenedor del Mapa Interactivo (utiliza CSS actualizado) */}
            <div className="map-container-interactive">
                <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ruta de Recolección Asignada"
                    className="interactive-map-iframe"
                ></iframe>
            </div>

            {/* Detalles de la Ruta */}
            <div className="route-details-card">
              <p className="route-detail-text">📍 **Origen de Ruta:** Engativá, Bogotá</p>
              <p className="route-detail-text">🏁 **Destino Final:** Fontibón, Bogotá</p>
              <p className="route-detail-text">⏱️ **Duración estimada:** 45 min (sin tráfico)</p>
              <p className="route-detail-text">📦 **Paradas de recolección:** 8 puntos</p>
            </div>
            
          </div>
        );
      case 'documentacion':
        // CÓDIGO DE DOCUMENTACIÓN (sin cambios)
        return (
          <div className={commonContentClasses}>
            <h2 className="title-lg">Documentación y Guías</h2>
            <p className="subtitle">Manuales de operación, políticas de seguridad y manejo de residuos.</p>
            <div className="resource-list">
                <a href="#" className="resource-item">
                    <div className="resource-details">
                        <BookOpen className="icon-primary" size={20} />
                        <span className="resource-title">Manual de Seguridad Vehicular V2.1</span>
                    </div>
                    <span className="resource-link">Descargar &rarr;</span>
                </a>
                <a href="#" className="resource-item">
                    <div className="resource-details">
                        <CheckCircle className="icon-primary" size={20} />
                        <span className="resource-title">Checklist Diario de Operación</span>
                    </div>
                    <span className="resource-link">Abrir &rarr;</span>
                </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      
      {/* Sidebar */}
      <aside className="sidebar">
        {/* ... Contenido del Sidebar (sin cambios) ... */}
        <div className="sidebar-content">
          
          {/* Logo */}
          <div className="logo-container">
              <div className="logo-icon">
                <img 
    src="../src/assets/img/logo.png" 
    alt="Logo Zero Waste" 
    className="logo-img
" 
  />
              </div>
              <div>
                <h2 className="logo-titulo">Zero Waste</h2>
                <p className="logo-subtitulo">Panel **Conductor**</p>
              </div>
            </div>


          {/* Menú de Navegación */}
          <nav className="nav-menu">
            <button
              onClick={() => setPestanaActiva('perfil')}
              className={`nav-link ${pestanaActiva === 'perfil' ? 'active' : ''}`}
            >
              <Home size={20} />
              Mi Perfil
            </button>
            
            <button
              onClick={() => setPestanaActiva('servicios')}
              className={`nav-link ${pestanaActiva === 'servicios' ? 'active' : ''}`}
            >
              <Truck size={20} />
              Servicios Asignados
            </button>
            
            <button
              onClick={() => setPestanaActiva('alertas')}
              className={`nav-link ${pestanaActiva === 'alertas' ? 'active' : ''}`}
            >
              <Bell size={20} />
              <span>Alertas y Novedades</span>
              <span className="nav-badge">2</span>
            </button>
            
            <button
              onClick={() => setPestanaActiva('rutas')}
              className={`nav-link ${pestanaActiva === 'rutas' ? 'active' : ''}`}
            >
              <Map size={20} />
              Rutas de Recolección
            </button>
            
            <button
              onClick={() => setPestanaActiva('documentacion')}
              className={`nav-link ${pestanaActiva === 'documentacion' ? 'active' : ''}`}
            >
              <BookOpen size={20} />
              Documentación
            </button>
          </nav>

          {/* Botón Cerrar Sesión */}
          <div className="logout-area">
             <button
               className="btn-logout"
               onClick={() => {
                 console.log("Cerrando Sesión");
               }}
             >
             <LogOut size={20} />
             Cerrar Sesión
           </button>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="main-content">
        <div className="main-wrapper">
          
          {/* Header Principal */}
          <div className="main-header">
            <h1 className="main-title">
              ¡Hola, Conductor {usuario.apellido}! 🚚
            </h1>
            <p className="main-subtitle">Panel de Control de Operaciones en tiempo real.</p>
          </div>

          {/* Contenido Dinámico */}
          {renderContenido()}

          {/* Alerta de Recordatorio */}
          <div className="info-alert">
            <div className="alert-content">
              <AlertCircle className="info-alert-icon" size={24} />
              <div className="info-alert-text">
                <h3 className="info-alert-title">Recordatorio de Seguridad</h3>
                <p className="info-alert-message">
                  Revise su vehículo y equipo de seguridad antes de iniciar cada ruta. La seguridad es nuestra prioridad. Consulte el manual de procedimientos en la sección de Documentación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Conductor;