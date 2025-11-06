import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, 
  LogOut, Home, FileText, Bell, MessageSquare, BookOpen,
  Map, Plus, CheckCircle, Clock, AlertCircle, Trash2, Zap, Info
} from 'lucide-react';
// El archivo '../styles/ciudadano.css' ha sido integrado a continuación en la etiqueta <style>.

const Ciudadano = () => {
  const [pestanaActiva, setPestanaActiva] = useState('perfil');
  const [editando, setEditando] = useState(false);

  // Datos de ejemplo iniciales (usaremos 'usuario' como nuestra fuente de verdad)
  const [usuario, setUsuario] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    telefono: '+57 300 123 4567',
    documento: '1234567890',
    localidad: 'Bogotá',
    rol: 'ciudadano',
    fechaRegistro: '2024-01-15T10:30:00'
  });

  const [formData, setFormData] = useState(usuario);
  
  // Datos de ejemplo para las otras secciones
  const [solicitudes] = useState([
    { id: 1, tipo: 'Recolección Especial', estado: 'Pendiente', fecha: '2025-11-10', descripcion: 'Recolección de escombros en la calle 10 # 5-20' },
    { id: 2, tipo: 'Reporte de Contenedor', estado: 'En Progreso', fecha: '2025-10-28', descripcion: 'Contenedor de reciclaje azul desbordado en el parque central.' },
    { id: 3, tipo: 'Punto Ecológico', estado: 'Completada', fecha: '2025-10-01', descripcion: 'Solicitud para un nuevo punto de acopio cerca a la universidad.' },
  ]);

  const [notificaciones] = useState([
    { id: 1, tipo: 'Alerta', mensaje: 'Tu solicitud #2 ha cambiado a **"En Progreso"**.', fecha: '2025-11-06T12:00:00', leida: false, icon: Clock, color: 'yellow' },
    { id: 2, tipo: 'Información', mensaje: 'El camión de reciclaje estará en tu sector mañana a las 8:00 AM.', fecha: '2025-11-05T18:30:00', leida: false, icon: Info, color: 'blue' },
    { id: 3, tipo: 'Éxito', mensaje: 'Tu solicitud #3 ha sido **Completada**.', fecha: '2025-10-01T15:00:00', leida: true, icon: CheckCircle, color: 'green' },
  ]);

  // Posición del camión simulada (usaremos esta posición para el mapa)
  // 
  const [posicionCamion] = useState({ lat: 4.6097, lng: -74.0817 }); // Simulación: centro de Bogotá

  const iniciales = `${usuario.nombre?.[0] || ''}${usuario.apellido?.[0] || ''}`.toUpperCase();

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
    console.log('Guardando datos:', formData); 
    setUsuario(formData); 
    setEditando(false);
  };

  const handleCancel = () => {
    setFormData(usuario); 
    setEditando(false);
  };

  // Función de ayuda para la visualización de datos
  const formatearFecha = (fechaString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(fechaString).toLocaleDateString('es-CO', options);
  };

  const mapUrl = `https://maps.google.com/maps?q=${posicionCamion.lat},${posicionCamion.lng}&z=13&output=embed`;

  const renderContenido = () => {
    switch (pestanaActiva) {
      case 'perfil':
        return (
          <div className="perfil-card">
            <div className="perfil-header-container">
              <div>
                <h2 className="titulo-seccion">Mi Perfil</h2>
                <p className="subtitulo-seccion">Información personal y estadísticas</p>
              </div>
              
              {!editando ? (
                <button
                  onClick={handleEdit}
                  className="btn btn-primary"
                >
                  <Edit2 size={18} />
                  Editar Perfil
                </button>
              ) : (
                <div className="perfil-acciones-container">
                  <button
                    onClick={handleSave}
                    className="btn btn-save"
                  >
                    <Save size={18} />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-cancel"
                  >
                    <X size={18} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="perfil-avatar-info">
              <div className="avatar">
                <span className="avatar-iniciales">{iniciales}</span>
              </div>
              <div>
                {editando ? (
                  <div className="nombre-edicion">
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="input-editable input-nombre"
                    />
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className="input-editable input-nombre"
                    />
                  </div>
                ) : (
                  <h3 className="perfil-nombre">
                    {usuario.nombre} {usuario.apellido}
                  </h3>
                )}
                <p className="perfil-rol">{usuario.rol}</p>
              </div>
            </div>

            <div className="perfil-datos-grid">
              
              {/* Correo Electrónico */}
              <div className="campo-container">
                <label className="campo-label">
                  <Mail size={16} className="icon-campo" />
                  Correo Electrónico
                </label>
                {editando ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-editable input-campo"
                  />
                ) : (
                  <p className="campo-valor campo-valor-normal">
                    {usuario.email}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div className="campo-container">
                <label className="campo-label">
                  <Phone size={16} className="icon-campo" />
                  Teléfono
                </label>
                {editando ? (
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="input-editable input-campo"
                  />
                ) : (
                  <p className="campo-valor campo-valor-normal">
                    {usuario.telefono}
                  </p>
                )}
              </div>

              {/* Documento (No Editable) */}
              <div className="campo-container">
                <label className="campo-label">
                  <User size={16} className="icon-campo" />
                  Documento
                </label>
                <p className="campo-valor campo-valor-noeditable">
                  {usuario.documento} (No editable)
                </p>
              </div>

              {/* Localidad */}
              <div className="campo-container">
                <label className="campo-label">
                  <MapPin size={16} className="icon-campo" />
                  Localidad
                </label>
                {editando ? (
                  <input
                    type="text"
                    name="localidad"
                    value={formData.localidad}
                    onChange={handleChange}
                    className="input-editable input-campo"
                  />
                ) : (
                  <p className="campo-valor campo-valor-normal">
                    {usuario.localidad}
                  </p>
                )}
              </div>

              {/* Miembro desde (No Editable) */}
              <div className="campo-container campo-full-width">
                <label className="campo-label">
                  <Calendar size={16} className="icon-campo" />
                  Miembro desde
                </label>
                <p className="campo-valor campo-valor-noeditable">
                  {formatearFecha(usuario.fechaRegistro)}
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="perfil-stats-grid">
              <div className="stat-card stat-blue">
                <FileText className="stat-icon" size={32} />
                <p className="stat-number">{solicitudes.filter(s => s.estado !== 'Completada').length}</p>
                <p className="stat-label">Solicitudes Activas</p>
              </div>
              <div className="stat-card stat-green">
                <CheckCircle className="stat-icon" size={32} />
                <p className="stat-number">{solicitudes.filter(s => s.estado === 'Completada').length}</p>
                <p className="stat-label">Completadas</p>
              </div>
              <div className="stat-card stat-yellow">
                <Bell className="stat-icon" size={32} />
                <p className="stat-number">{notificaciones.filter(n => !n.leida).length}</p>
                <p className="stat-label">Notificaciones sin leer</p>
              </div>
              <div className="stat-card stat-purple">
                <Trash2 className="stat-icon" size={32} />
                <p className="stat-number">95%</p>
                <p className="stat-label">Separación Promedio</p>
              </div>
            </div>
          </div>
        );

      case 'solicitudes':
        return (
          <div className="solicitudes-card">
            <h2 className="titulo-seccion">Mis Solicitudes</h2>
            <p className="subtitulo-seccion">Consulta el estado de tus peticiones y genera nuevas.</p>

            <button className="btn btn-success btn-nueva-solicitud">
              <Plus size={18} /> Crear Nueva Solicitud
            </button>
            
            <div className="lista-solicitudes">
              {solicitudes.map(solicitud => (
                <div key={solicitud.id} className={`solicitud-item solicitud-${solicitud.estado.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="solicitud-header">
                    <Zap size={20} className="solicitud-icon" />
                    <h3 className="solicitud-titulo">{solicitud.tipo} - ID: {solicitud.id}</h3>
                    <span className={`solicitud-estado estado-${solicitud.estado.toLowerCase().replace(/\s/g, '-')}`}>
                        {solicitud.estado === 'Pendiente' && <Clock size={16} />}
                        {solicitud.estado === 'En Progreso' && <MessageSquare size={16} />}
                        {solicitud.estado === 'Completada' && <CheckCircle size={16} />}
                        {solicitud.estado}
                    </span>
                  </div>
                  <p className="solicitud-descripcion">{solicitud.descripcion}</p>
                  <div className="solicitud-footer">
                    <Calendar size={14} /> Creada el: {new Date(solicitud.fecha).toLocaleDateString('es-CO')}
                  </div>
                </div>
              ))}
            </div>

            {solicitudes.length === 0 && (
                <div className="alerta-vacio">
                    <Info size={24} />
                    <p>Aún no has realizado ninguna solicitud. ¡Anímate a generar la primera!</p>
                </div>
            )}
          </div>
        );

      case 'notificaciones':
        return (
          <div className="notificaciones-card">
            <h2 className="titulo-seccion">Notificaciones</h2>
            <p className="subtitulo-seccion">Mensajes importantes sobre tu actividad en Zero Waste.</p>

            <div className="lista-notificaciones">
              {notificaciones.map(notif => {
                const IconComponent = notif.icon;
                return (
                  <div key={notif.id} className={`notificacion-item notificacion-${notif.color} ${notif.leida ? 'leida' : 'no-leida'}`}>
                    <div className="notificacion-icon-container">
                      <IconComponent size={24} />
                    </div>
                    <div className="notificacion-content">
                      <h4 className="notificacion-titulo">{notif.tipo}</h4>
                      <p className="notificacion-mensaje" dangerouslySetInnerHTML={{ __html: notif.mensaje }}></p>
                      <span className="notificacion-fecha">
                        {formatearFecha(notif.fecha)}
                      </span>
                    </div>
                    {!notif.leida && (
                       <button className="btn-marcar-leida">Marcar como Leída</button>
                    )}
                  </div>
                );
              })}
            </div>
            
            <button className="btn btn-secondary btn-marcar-todas">
                Marcar todas como leídas
            </button>

            {notificaciones.length === 0 && (
                <div className="alerta-vacio">
                    <Bell size={24} />
                    <p>No tienes notificaciones pendientes.</p>
                </div>
            )}
          </div>
        );

      case 'rutas':
        return (
          <div className="rutas-card">
            <h2 className="titulo-seccion">Rutas Ecológicas y Recolección</h2>
            <p className="subtitulo-seccion">Sigue en tiempo real el camión de recolección y consulta las rutas programadas.</p>

            <div className="mapa-container">
              <h3 className="mapa-titulo"><Map size={20} /> Seguimiento en Tiempo Real (Simulado)</h3>
              
              {/* MAPA FUNCIONAL INTEGRADO CON IFRAME */}
              <iframe
                title="Mapa de Recolección en Tiempo Real"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                src={mapUrl}
                allowFullScreen
              />

              <div className="alerta-info alerta-mapa">
                <AlertCircle className="alerta-icon" size={20} />
                <p>La posición del camión se actualiza cada 30 segundos. Planifica la entrega de tus residuos aprovechables.</p>
              </div>
            </div>

            <h3 className="titulo-rutas-programadas"><Calendar size={20} /> Rutas Programadas</h3>
            <div className="rutas-programadas-list">
              <div className="ruta-item">
                <h4>Sector Norte - Reciclaje</h4>
                <p>Días: Lunes, Miércoles, Viernes</p>
                <p>Horario Estimado: 7:00 AM - 10:00 AM</p>
              </div>
              <div className="ruta-item">
                <h4>Sector Norte - Especiales</h4>
                <p>Días: Tercer Sábado del mes</p>
                <p>Próximo: 2025-11-15</p>
              </div>
            </div>
          </div>
        );

      case 'recursos':
        return (
          <div className="recursos-card">
            <h2 className="titulo-seccion">Recursos y Guías</h2>
            <p className="subtitulo-seccion">Aprende sobre reciclaje, compostaje y el movimiento 'Cero Residuos'.</p>

            <div className="recursos-grid">
                <div className="recurso-item recurso-green">
                    <BookOpen size={32} />
                    <h3>Guía de Separación</h3>
                    <p>Todo lo que necesitas saber para separar correctamente tus residuos.</p>
                    <a href="#" className="recurso-link">Ver Guía Completa →</a>
                </div>
                <div className="recurso-item recurso-blue">
                    <MessageSquare size={32} />
                    <h3>Preguntas Frecuentes (FAQ)</h3>
                    <p>Resuelve tus dudas sobre las políticas y servicios de recolección.</p>
                    <a href="#" className="recurso-link">Ir a Preguntas →</a>
                </div>
                <div className="recurso-item recurso-purple">
                    <Zap size={32} />
                    <h3>Compostaje en Casa</h3>
                    <p>Empieza tu propio compost y reduce tus residuos orgánicos.</p>
                    <a href="#" className="recurso-link">Ver Tutoriales →</a>
                </div>
                <div className="recurso-item recurso-yellow">
                    <MapPin size={32} />
                    <h3>Puntos de Acopio</h3>
                    <p>Encuentra el punto ecológico certificado más cercano a tu ubicación.</p>
                    <a href="#" className="recurso-link">Buscar Puntos →</a>
                </div>
            </div>
            
            <div className="alerta-info alerta-info-secundario">
              <Info className="alerta-icon" size={24} />
              <div>
                <h3 className="alerta-titulo">¿Tienes un recurso para compartir?</h3>
                <p className="alerta-texto">
                  Si conoces un punto de acopio o tienes un proyecto de Cero Residuos, contáctanos para incluirlo.
                </p>
              </div>
            </div>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <style>
        {`
          /* Estilos basados en el original para simular ciudadando.css */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

          :root {
              --color-primary: #10B981; /* Green 500 */
              --color-primary-dark: #059669; /* Green 600 */
              --color-primary-light: #A7F3D0; /* Green 200 */
              --color-secondary: #3B82F6; /* Blue 500 */
              --color-text: #1F2937; /* Gray 900 */
              --color-text-light: #6B7280; /* Gray 500 */
              --color-bg: #F9FAFB; /* Gray 50 */
              --color-card-bg: #FFFFFF;
              --color-border: #E5E7EB; /* Gray 200 */
          }

          body {
              font-family: 'Inter', sans-serif;
              margin: 0;
              padding: 0;
              background-color: var(--color-bg);
              color: var(--color-text);
          }
          
          .app-container {
              min-height: 100vh;
              display: flex;
          }

          .app-layout {
              display: flex;
              width: 100%;
          }

          /* Sidebar */
          .sidebar {
              width: 250px;
              flex-shrink: 0;
              background-color: var(--color-card-bg);
              border-right: 1px solid var(--color-border);
              box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
              padding: 24px 0;
          }

          .sidebar-content {
              padding: 0 16px;
              display: flex;
              flex-direction: column;
              height: 100%;
          }

          .logo-container {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 32px;
              padding: 0 8px;
          }

          .logo-icon {
              background-color: var(--color-primary);
              border-radius: 8px;
              padding: 6px;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          /* Placeholder for logo image */
          .logo-img {
              width: 24px;
              height: 24px;
              content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>');
          }

          .logo-titulo {
              font-size: 1.25rem;
              font-weight: 700;
              color: var(--color-primary-dark);
              margin: 0;
          }

          .logo-subtitulo {
              font-size: 0.75rem;
              color: var(--color-text-light);
              margin: 0;
          }

          .nav-menu {
              display: flex;
              flex-direction: column;
              gap: 4px;
              flex-grow: 1;
          }

          .nav-link {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 10px 16px;
              border-radius: 8px;
              color: var(--color-text);
              text-decoration: none;
              font-size: 1rem;
              font-weight: 500;
              transition: all 0.2s ease;
              background-color: transparent;
              border: none;
              text-align: left;
              cursor: pointer;
          }

          .nav-link:hover {
              background-color: var(--color-border);
              color: var(--color-primary-dark);
          }

          .nav-link.active {
              background-color: var(--color-primary-light);
              color: var(--color-primary-dark);
              font-weight: 600;
          }

          .badge-notificaciones {
              margin-left: auto;
              background-color: #EF4444; /* Red */
              color: white;
              font-size: 0.75rem;
              font-weight: 600;
              padding: 2px 8px;
              border-radius: 9999px;
          }

          .btn-logout {
              margin-top: 20px;
              width: 100%;
              background-color: #F87171; /* Red 400 */
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 10px;
              border-radius: 8px;
              font-weight: 600;
              transition: background-color 0.2s;
              border: none;
              cursor: pointer;
          }

          .btn-logout:hover {
              background-color: #EF4444; /* Red 500 */
          }

          /* Main Content */
          .main-content {
              flex-grow: 1;
              padding: 32px;
              overflow-y: auto;
          }

          .main-header {
              margin-bottom: 32px;
          }

          .main-title {
              font-size: 2rem;
              font-weight: 700;
              margin: 0;
              color: var(--color-text);
          }

          .main-subtitle {
              font-size: 1rem;
              color: var(--color-text-light);
              margin-top: 4px;
          }

          .titulo-seccion {
              font-size: 1.5rem;
              font-weight: 600;
              margin-bottom: 4px;
          }

          .subtitulo-seccion {
              color: var(--color-text-light);
              margin-bottom: 24px;
          }

          /* Botones genéricos */
          .btn {
              padding: 8px 16px;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              transition: background-color 0.2s;
              border: none;
          }

          .btn-primary {
              background-color: var(--color-secondary);
              color: white;
          }
          .btn-primary:hover {
              background-color: #2563EB; /* Blue 600 */
          }

          .btn-save {
              background-color: var(--color-primary);
              color: white;
          }
          .btn-save:hover {
              background-color: var(--color-primary-dark);
          }

          .btn-cancel {
              background-color: var(--color-border);
              color: var(--color-text);
          }
          .btn-cancel:hover {
              background-color: #D1D5DB; /* Gray 300 */
          }

          .btn-success {
              background-color: var(--color-primary);
              color: white;
          }
          .btn-success:hover {
              background-color: var(--color-primary-dark);
          }

          /* Perfil Card */
          .perfil-card, .solicitudes-card, .notificaciones-card, .rutas-card, .recursos-card {
              background-color: var(--color-card-bg);
              padding: 24px;
              border-radius: 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
              margin-bottom: 24px;
          }

          .perfil-header-container {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 24px;
          }

          .perfil-acciones-container {
              display: flex;
              gap: 12px;
          }

          .perfil-avatar-info {
              display: flex;
              align-items: center;
              gap: 20px;
              margin-bottom: 32px;
              padding: 16px;
              border-radius: 8px;
              background-color: #F3F4F6; /* Gray 100 */
          }

          .avatar {
              width: 64px;
              height: 64px;
              background-color: var(--color-secondary);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
          }

          .avatar-iniciales {
              color: white;
              font-size: 1.5rem;
              font-weight: 700;
          }

          .perfil-nombre {
              font-size: 1.75rem;
              font-weight: 700;
              margin: 0;
          }

          .perfil-rol {
              font-size: 1rem;
              color: var(--color-text-light);
              margin-top: 4px;
          }

          .nombre-edicion {
              display: flex;
              gap: 10px;
          }
          .input-nombre {
              font-size: 1.75rem;
              font-weight: 700;
              border: 1px solid var(--color-border);
              padding: 4px 8px;
              border-radius: 4px;
          }

          .perfil-datos-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 20px;
          }

          .campo-container {
              display: flex;
              flex-direction: column;
          }

          .campo-label {
              display: flex;
              align-items: center;
              gap: 8px;
              font-weight: 600;
              color: var(--color-text);
              margin-bottom: 4px;
              font-size: 0.9rem;
          }

          .icon-campo {
              color: var(--color-secondary);
          }

          .campo-valor {
              padding: 8px 12px;
              border-radius: 6px;
              font-size: 1rem;
              transition: background-color 0.2s;
          }

          .campo-valor-normal {
              background-color: #F9FAFB;
              color: var(--color-text);
          }

          .campo-valor-noeditable {
              background-color: #E5E7EB; /* Gray 200 */
              color: var(--color-text-light);
          }

          .input-editable {
              border: 1px solid var(--color-secondary);
              padding: 8px 12px;
              border-radius: 6px;
              font-size: 1rem;
              width: 100%;
              box-sizing: border-box;
          }

          .campo-full-width {
              grid-column: 1 / -1;
          }

          /* Estadísticas Grid */
          .perfil-stats-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 20px;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px dashed var(--color-border);
          }

          .stat-card {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 20px;
              border-radius: 12px;
              color: white;
              text-align: center;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              transition: transform 0.2s;
          }
          .stat-card:hover {
              transform: translateY(-4px);
          }

          .stat-blue { background-color: #3B82F6; }
          .stat-green { background-color: var(--color-primary); }
          .stat-yellow { background-color: #FBBF24; }
          .stat-purple { background-color: #8B5CF6; }

          .stat-icon {
              margin-bottom: 8px;
          }

          .stat-number {
              font-size: 2rem;
              font-weight: 700;
              margin: 0;
          }

          .stat-label {
              font-size: 0.875rem;
              margin-top: 4px;
          }

          /* Alerta Info */
          .alerta-info {
              background-color: #EFF6FF; /* Blue 50 */
              border-left: 4px solid var(--color-secondary);
              padding: 16px;
              border-radius: 8px;
              margin-top: 24px;
          }

          .alerta-content {
              display: flex;
              align-items: flex-start;
              gap: 16px;
          }

          .alerta-icon {
              color: var(--color-secondary);
              flex-shrink: 0;
          }

          .alerta-titulo {
              font-size: 1rem;
              font-weight: 600;
              margin: 0 0 4px 0;
              color: var(--color-text);
          }

          .alerta-texto {
              font-size: 0.9rem;
              margin: 0;
              color: var(--color-text-light);
          }
          
          .alerta-info-secundario {
              border-left-color: var(--color-primary);
              background-color: #ECFDF5;
          }
          .alerta-info-secundario .alerta-icon {
              color: var(--color-primary);
          }

          .alerta-vacio {
              text-align: center;
              padding: 40px;
              background-color: #F3F4F6;
              border-radius: 8px;
              color: var(--color-text-light);
              margin-top: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
          }

          /* Solicitudes */
          .btn-nueva-solicitud {
              margin-bottom: 24px;
          }

          .lista-solicitudes {
              display: flex;
              flex-direction: column;
              gap: 16px;
          }

          .solicitud-item {
              padding: 16px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              border-left: 5px solid var(--color-border);
              transition: border-left-color 0.3s;
              background-color: var(--color-card-bg);
          }

          .solicitud-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 8px;
          }

          .solicitud-titulo {
              font-size: 1.1rem;
              font-weight: 600;
              margin: 0;
              flex-grow: 1;
          }

          .solicitud-descripcion {
              color: var(--color-text-light);
              font-size: 0.95rem;
              margin: 0 0 12px 0;
          }

          .solicitud-footer {
              font-size: 0.85rem;
              color: var(--color-text-light);
              display: flex;
              align-items: center;
              gap: 8px;
              padding-top: 8px;
              border-top: 1px dashed var(--color-border);
          }

          .solicitud-estado {
              font-size: 0.8rem;
              padding: 4px 10px;
              border-radius: 9999px;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 4px;
          }

          .solicitud-Pendiente { border-left-color: #FBBF24; }
          .solicitud-item.solicitud-pendiente .solicitud-estado { background-color: #FEF3C7; color: #D97706; }

          .solicitud-En-Progreso { border-left-color: #3B82F6; }
          .solicitud-item.solicitud-en-progreso .solicitud-estado { background-color: #DBEAFE; color: #2563EB; }

          .solicitud-Completada { border-left-color: var(--color-primary); }
          .solicitud-item.solicitud-completada .solicitud-estado { background-color: #D1FAE5; color: var(--color-primary-dark); }
          
          .solicitud-icon {
              color: var(--color-text-light);
          }

          /* Notificaciones */
          .lista-notificaciones {
              display: flex;
              flex-direction: column;
              gap: 12px;
              margin-bottom: 20px;
          }

          .notificacion-item {
              display: flex;
              align-items: flex-start;
              gap: 16px;
              padding: 16px;
              border-radius: 8px;
              background-color: var(--color-card-bg);
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
              border: 1px solid var(--color-border);
          }

          .notificacion-item.no-leida {
              border: 2px solid var(--color-secondary);
              background-color: #F0F9FF; /* Blue 50 */
          }

          .notificacion-item.leida {
              opacity: 0.7;
          }

          .notificacion-icon-container {
              flex-shrink: 0;
              padding: 8px;
              border-radius: 50%;
          }
          .notificacion-blue .notificacion-icon-container { background-color: #DBEAFE; color: #3B82F6; }
          .notificacion-green .notificacion-icon-container { background-color: #D1FAE5; color: var(--color-primary); }
          .notificacion-yellow .notificacion-icon-container { background-color: #FEF3C7; color: #FBBF24; }
          
          .notificacion-content {
              flex-grow: 1;
          }

          .notificacion-titulo {
              font-size: 0.9rem;
              font-weight: 700;
              margin: 0;
              color: var(--color-text-light);
          }

          .notificacion-mensaje {
              font-size: 1rem;
              margin: 4px 0;
              line-height: 1.4;
          }
          .notificacion-mensaje strong {
              font-weight: 600;
              color: var(--color-text);
          }

          .notificacion-fecha {
              font-size: 0.8rem;
              color: var(--color-text-light);
          }

          .btn-marcar-leida {
              background-color: var(--color-secondary);
              color: white;
              padding: 6px 12px;
              border-radius: 6px;
              border: none;
              cursor: pointer;
              font-size: 0.85rem;
              font-weight: 500;
              align-self: center;
              flex-shrink: 0;
          }
          .btn-marcar-leida:hover {
              background-color: #2563EB;
          }
          
          .btn-marcar-todas {
              width: fit-content;
              background-color: var(--color-card-bg);
              color: var(--color-secondary);
              border: 1px solid var(--color-secondary);
          }
          .btn-marcar-todas:hover {
              background-color: #F0F9FF;
          }


          /* Rutas */
          .mapa-container {
              margin-bottom: 30px;
          }

          .mapa-titulo {
              font-size: 1.25rem;
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 15px;
              color: var(--color-primary-dark);
          }
          
          /* Estilo para el iframe del mapa */
          iframe {
              width: 100%;
              height: 400px;
              border-radius: 8px;
              margin-bottom: 16px;
          }

          .alerta-mapa {
              margin-top: 0;
              border-left-color: var(--color-yellow);
          }

          .titulo-rutas-programadas {
              font-size: 1.25rem;
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 15px;
              border-top: 1px dashed var(--color-border);
              padding-top: 20px;
          }

          .rutas-programadas-list {
              display: flex;
              gap: 20px;
          }

          .ruta-item {
              background-color: #F3F4F6;
              padding: 16px;
              border-radius: 8px;
              flex: 1;
              border-left: 4px solid var(--color-primary);
          }

          .ruta-item h4 {
              margin: 0 0 8px 0;
              font-size: 1.1rem;
              color: var(--color-primary-dark);
          }

          .ruta-item p {
              margin: 4px 0;
              font-size: 0.95rem;
              color: var(--color-text-light);
          }

          /* Recursos */
          .recursos-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 20px;
              margin-bottom: 30px;
          }

          .recurso-item {
              padding: 24px;
              border-radius: 12px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
              transition: transform 0.2s;
              border: 1px solid var(--color-border);
          }
          .recurso-item:hover {
              transform: translateY(-5px);
              box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }

          .recurso-item svg {
              margin-bottom: 12px;
          }

          .recurso-item h3 {
              font-size: 1.15rem;
              font-weight: 600;
              margin: 0 0 8px 0;
          }

          .recurso-item p {
              font-size: 0.9rem;
              color: var(--color-text-light);
              margin-bottom: 16px;
          }

          .recurso-link {
              font-size: 0.9rem;
              font-weight: 600;
              text-decoration: none;
              transition: color 0.2s;
          }

          .recurso-green { background-color: #ECFDF5; border-color: #D1FAE5; }
          .recurso-green svg, .recurso-green h3, .recurso-green .recurso-link { color: var(--color-primary-dark); }

          .recurso-blue { background-color: #EFF6FF; border-color: #DBEAFE; }
          .recurso-blue svg, .recurso-blue h3, .recurso-blue .recurso-link { color: #2563EB; }

          .recurso-purple { background-color: #F5F3FF; border-color: #EDE9FE; }
          .recurso-purple svg, .recurso-purple h3, .recurso-purple .recurso-link { color: #7C3AED; }

          .recurso-yellow { background-color: #FFFBEB; border-color: #FEF3C7; }
          .recurso-yellow svg, .recurso-yellow h3, .recurso-yellow .recurso-link { color: #D97706; }


          /* Responsive Design */
          @media (max-width: 1024px) {
              .app-layout {
                  flex-direction: column;
              }
              
              .sidebar {
                  width: 100%;
                  border-right: none;
                  border-bottom: 1px solid var(--color-border);
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                  padding: 16px 0;
              }
              
              .sidebar-content {
                  padding: 0 16px;
              }
              
              .nav-menu {
                  flex-direction: row;
                  overflow-x: auto;
                  padding-bottom: 8px;
                  margin-top: 16px;
              }
              
              .nav-link {
                  flex-shrink: 0;
                  padding: 8px 12px;
              }
              
              .logo-container {
                  margin-bottom: 0;
              }
              
              .btn-logout {
                  display: none; /* Ocultar en móvil para simplicidad */
              }

              .main-content {
                  padding: 16px;
              }

              .perfil-datos-grid {
                  grid-template-columns: 1fr;
              }
              
              .perfil-stats-grid {
                  grid-template-columns: repeat(2, 1fr);
              }
              
              .rutas-programadas-list {
                  flex-direction: column;
              }
          }

          @media (max-width: 640px) {
              .main-title {
                  font-size: 1.5rem;
              }
              .perfil-avatar-info {
                  flex-direction: column;
                  text-align: center;
              }
              .nombre-edicion {
                  flex-direction: column;
                  gap: 5px;
              }
              .perfil-stats-grid {
                  grid-template-columns: 1fr;
              }
              .recursos-grid {
                  grid-template-columns: 1fr;
              }
              .perfil-header-container {
                  flex-direction: column;
                  gap: 15px;
                  align-items: stretch;
              }
              .perfil-acciones-container {
                  justify-content: space-between;
              }
          }
        `}
      </style>
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-content">
            {/* Logo */}
            <div className="logo-container">
              <div className="logo-icon">
                {/* Se usa un ícono SVG genérico en lugar de la ruta local de la imagen */}
                <Trash2 size={24} color="white" className="logo-img" />
              </div>
              <div>
                <h2 className="logo-titulo">Zero Waste</h2>
                <p className="logo-subtitulo">Portal Ciudadano</p>
              </div>
            </div>

            {/* Menú */}
            <nav className="nav-menu">
              <button
                onClick={() => setPestanaActiva('perfil')}
                className={`nav-link ${pestanaActiva === 'perfil' ? 'active' : ''}`}
              >
                <Home size={20} />
                Mi Perfil
              </button>
              <button
                onClick={() => setPestanaActiva('solicitudes')}
                className={`nav-link ${pestanaActiva === 'solicitudes' ? 'active' : ''}`}
              >
                <FileText size={20} />
                Solicitudes
              </button>
              <button
                onClick={() => setPestanaActiva('notificaciones')}
                className={`nav-link ${pestanaActiva === 'notificaciones' ? 'active' : ''}`}
              >
                <Bell size={20} />
                <span>Notificaciones</span>
                <span className="badge-notificaciones">{notificaciones.filter(n => !n.leida).length}</span>
              </button>
              <button
                onClick={() => setPestanaActiva('rutas')}
                className={`nav-link ${pestanaActiva === 'rutas' ? 'active' : ''}`}
              >
                <Map size={20} />
                Rutas Ecológicas
              </button>
              <button
                onClick={() => setPestanaActiva('recursos')}
                className={`nav-link ${pestanaActiva === 'recursos' ? 'active' : ''}`}
              >
                <BookOpen size={20} />
                Recursos
              </button>
            </nav>

            {/* Botón cerrar sesión */}
           <button
             className="btn btn-logout"
             onClick={() => {
               console.log("Cerrar Sesión simulado. Redirigiendo a /login...");
               // En un entorno real, aquí se limpiaría el token y se redirigiría.
             }}
           >
             <LogOut size={20} />
             Cerrar Sesión
           </button>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="main-content">
          {/* Header */}
          <div className="main-header">
            <h1 className="main-title">
              ¡Hola, {usuario.nombre}! 👋
            </h1>
            <p className="main-subtitle">Bienvenido a tu panel de ciudadano activo</p>
          </div>

          {/* Contenido dinámico */}
          {renderContenido()}

          {/* Información adicional (solo se muestra fuera de la vista de Rutas) */}
          {pestanaActiva !== 'rutas' && (
              <div className="alerta-info">
                <div className="alerta-content">
                  <AlertCircle className="alerta-icon" size={24} />
                  <div>
                    <h3 className="alerta-titulo">Mantén tu información actualizada</h3>
                    <p className="alerta-texto">
                      Es importante que tu información de contacto esté siempre actualizada para recibir notificaciones importantes sobre tus solicitudes.
                    </p>
                  </div>
                </div>
              </div>
          )}
          
        </main>
      </div>
    </div>
  );
};

export default Ciudadano;