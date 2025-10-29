import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, 
  LogOut, Home, FileText, Bell, MessageSquare, BookOpen,
  Map, Plus, CheckCircle, Clock, AlertCircle, Trash2
} from 'lucide-react';
import "../styles/ciudadano.css"

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

  // ... (otros datos de solicitudes y notificaciones omitidos por brevedad)

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
                              15 de enero de 2024
                            </p>
                          </div>
                        </div>

            {/* Estadísticas */}
            <div className="perfil-stats-grid">
              <div className="stat-card stat-blue">
                <FileText className="stat-icon" size={32} />
                <p className="stat-number">3</p>
                <p className="stat-label">Solicitudes Activas</p>
              </div>
              <div className="stat-card stat-green">
                <CheckCircle className="stat-icon" size={32} />
                <p className="stat-number">12</p>
                <p className="stat-label">Completadas</p>
              </div>
              <div className="stat-card stat-yellow">
                <Bell className="stat-icon" size={32} />
                <p className="stat-number">2</p>
                <p className="stat-label">Notificaciones</p>
              </div>
              <div className="stat-card stat-purple">
                <Trash2 className="stat-icon" size={32} />
                <p className="stat-number">95%</p>
                <p className="stat-label">Separación</p>
              </div>
            </div>
          </div>
        );

      case 'solicitudes':
        // ... (Contenido de Solicitudes)
        return <div className="contenido-generico">Contenido de Solicitudes</div>;
      case 'notificaciones':
        // ... (Contenido de Notificaciones)
        return <div className="contenido-generico">Contenido de Notificaciones</div>;
      case 'rutas':
        // ... (Contenido de Rutas)
        return <div className="contenido-generico">Contenido de Rutas Ecológicas</div>;
      case 'recursos':
        // ... (Contenido de Recursos)
        return <div className="contenido-generico">Contenido de Recursos</div>;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
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
                <p className="logo-subtitulo">Portal Ciudadano</p>
              </div>
            </div>

            {/* Menú */}
            <nav className="nav-menu">
              {/* Elementos del menú ... */}
              <button
                onClick={() => setPestanaActiva('perfil')}
                className={`nav-link ${pestanaActiva === 'perfil' ? 'active' : ''}`}
              >
                <Home size={20} />
                Mi Perfil
              </button>
              {/* ... (Otros enlaces de navegación) */}
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
                <span className="badge-notificaciones">2</span>
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
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login"; // 🔁 Redirige al login
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

          {/* Información adicional */}
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
        </main>
      </div>
    </div>
  );
};

export default Ciudadano;