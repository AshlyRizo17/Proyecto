import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, 
  LogOut, Home, FileText, Bell, MessageSquare, BookOpen,
  Map, Plus, CheckCircle, Clock, AlertCircle, Trash2, 
  Users, Building, Truck, Edit, List
} from 'lucide-react';
import "../styles/admin.css" // <-- Asegúrate de tener este archivo o ajusta la ruta

// 1. Renombrar el componente a Admin
const Admin = () => {
  // 2. Ajustar las pestañas a las vistas del administrador
  const [pestanaActiva, setPestanaActiva] = useState('perfil');
  const [editando, setEditando] = useState(false);

  // 3. Datos de ejemplo para el Administrador
  const [administrador, setAdministrador] = useState({
    nombre: 'Danna',
    apellido: 'Zarta',
    email: 'danna.admin@zerowaste.com',
    telefono: '+57 320 987 6543',
    documento: 'ADM12345',
    localidad: 'Bogotá (Sede Principal)',
    rol: 'Administrador Principal',
    fechaRegistro: '2023-08-01T09:00:00'
  });

  const [formData, setFormData] = useState(administrador);
  const iniciales = `${administrador.nombre?.[0] || ''}${administrador.apellido?.[0] || ''}`.toUpperCase();

  // Datos simulados para las otras vistas (Gestión)
  const [usuarios, setUsuarios] = useState([
    { id: 'U001', nombre: 'Ana Gómez', correo: 'ana.gomez@example.com', estado: 'Activo' },
    { id: 'U002', nombre: 'Carlos Ruiz', correo: 'carlos.ruiz@example.com', estado: 'Inactivo' },
  ]);

  const [empresas, setEmpresas] = useState([
    { id: 'E001', nombre: 'EcoVerde S.A.', ciudad: 'Bogotá', tipo: 'Reciclaje', estado: 'Aprobada' },
    { id: 'E002', nombre: 'Planeta Limpio', ciudad: 'Medellín', tipo: 'Transporte', estado: 'Pendiente' },
  ]);

  const [vehiculos, setVehiculos] = useState([
    { id: 'V001', placa: 'ABC-123', conductor: 'Juan Pérez', estado: 'Activo' },
    { id: 'V002', placa: 'XYZ-789', conductor: 'María López', estado: 'Mantenimiento' },
  ]);
    // Función de ejemplo para manejar la edición en las tablas
    const handleEditItem = (tipo, id) => {
        alert(`Editando ${tipo} con ID: ${id}`);
        // Aquí implementarías la lógica de edición real
    };

    const handleDeleteItem = (tipo, id) => {
        if (window.confirm(`¿Estás seguro de eliminar el item ${id} de ${tipo}?`)) {
            if (tipo === 'usuarios') setUsuarios(prev => prev.filter(u => u.id !== id));
            if (tipo === 'empresas') setEmpresas(prev => prev.filter(e => e.id !== id));
            if (tipo === 'vehiculos') setVehiculos(prev => prev.filter(v => v.id !== id));
        }
    };


  // Funciones de gestión de perfil (sin cambios, solo usan 'administrador' en lugar de 'usuario')
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setFormData(administrador); 
    setEditando(true);
  };

  const handleSave = () => {
    console.log('Guardando datos de administrador:', formData); 
    setAdministrador(formData); 
    setEditando(false);
  };

  const handleCancel = () => {
    setFormData(administrador); 
    setEditando(false);
  };

  // 3. Adaptar el renderContenido al Admin
  const renderContenido = () => {
    switch (pestanaActiva) {
      case 'perfil':
        // **PERFIL DEL ADMINISTRADOR**
        return (
          <div className="perfil-card">
            <div className="perfil-header-container">
              <div>
                <h2 className="titulo-seccion">Mi Perfil de Administrador</h2>
                <p className="subtitulo-seccion">Gestión de datos de cuenta</p>
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
                    {administrador.nombre} {administrador.apellido}
                  </h3>
                )}
                <p className="perfil-rol">{administrador.rol}</p>
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
                    {administrador.email}
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
                    {administrador.telefono}
                  </p>
                )}
              </div>

              {/* Documento (No Editable) */}
              <div className="campo-container">
                <label className="campo-label">
                  <User size={16} className="icon-campo" />
                  ID de Administrador
                </label>
                <p className="campo-valor campo-valor-noeditable">
                  {administrador.documento} (No editable)
                </p>
              </div>

              {/* Localidad */}
              <div className="campo-container">
                <label className="campo-label">
                  <MapPin size={16} className="icon-campo" />
                  Ubicación
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
                    {administrador.localidad}
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
                  01 de agosto de 2023
                </p>
              </div>
            </div>

            {/* Estadísticas de Administrador */}
            <div className="perfil-stats-grid">
              <div className="stat-card stat-blue">
                <Users className="stat-icon" size={32} />
                <p className="stat-number">250</p>
                <p className="stat-label">Usuarios Registrados</p>
              </div>
              <div className="stat-card stat-green">
                <Building className="stat-icon" size={32} />
                <p className="stat-number">12</p>
                <p className="stat-label">Empresas Activas</p>
              </div>
              <div className="stat-card stat-yellow">
                <List className="stat-icon" size={32} />
                <p className="stat-number">5</p>
                <p className="stat-label">Solicitudes Pendientes</p>
              </div>
              <div className="stat-card stat-purple">
                <Truck className="stat-icon" size={32} />
                <p className="stat-number">8</p>
                <p className="stat-label">Vehículos en Ruta</p>
              </div>
            </div>
          </div>
        );

      case 'usuarios':
        // **GESTIÓN DE USUARIOS**
        return (
          <div className="gestion-card">
            <h2 className="titulo-seccion">👥 Gestión de Usuarios</h2>
            <p className="subtitulo-seccion">Administra cuentas de ciudadanos y sus estados.</p>
            <button className="btn btn-add"><Plus size={18} /> Nuevo Usuario</button>
            <table className="requests-table">
              <thead>
                <tr>
                  <th>ID</th><th>Nombre</th><th>Correo</th><th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.correo}</td>
                    <td className={u.estado === 'Activo' ? 'status-active' : 'status-inactive'}>{u.estado}</td>
                    <td>
                      <button onClick={() => handleEditItem('usuarios', u.id)} className="btn-icon"><Edit size={16} /></button>
                      <button onClick={() => handleDeleteItem('usuarios', u.id)} className="btn-icon btn-danger"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'empresas':
        // **GESTIÓN DE EMPRESAS**
        return (
          <div className="gestion-card">
            <h2 className="titulo-seccion">🏢 Gestión de Empresas</h2>
            <p className="subtitulo-seccion">Revisa y gestiona las empresas registradas para el servicio.</p>
            <button className="btn btn-add"><Plus size={18} /> Nueva Empresa</button>
            <table className="requests-table">
              <thead>
                <tr>
                  <th>ID</th><th>Nombre</th><th>Ciudad</th><th>Tipo</th><th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empresas.map(e => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.nombre}</td>
                    <td>{e.ciudad}</td>
                    <td>{e.tipo}</td>
                    <td className={e.estado === 'Aprobada' ? 'status-active' : 'status-pending'}>{e.estado}</td>
                    <td>
                      <button onClick={() => handleEditItem('empresas', e.id)} className="btn-icon"><Edit size={16} /></button>
                      <button onClick={() => handleDeleteItem('empresas', e.id)} className="btn-icon btn-danger"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'vehiculos':
        // **GESTIÓN DE VEHÍCULOS**
        return (
          <div className="gestion-card">
            <h2 className="titulo-seccion">🚛 Gestión de Vehículos</h2>
            <p className="subtitulo-seccion">Controla la flota de recolección y su estado.</p>
            <button className="btn btn-add"><Plus size={18} /> Nuevo Vehículo</button>
            <table className="requests-table">
              <thead>
                <tr>
                  <th>ID</th><th>Placa</th><th>Conductor</th><th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map(v => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.placa}</td>
                    <td>{v.conductor}</td>
                    <td className={v.estado === 'Activo' ? 'status-active' : 'status-maintenance'}>{v.estado}</td>
                    <td>
                      <button onClick={() => handleEditItem('vehiculos', v.id)} className="btn-icon"><Edit size={16} /></button>
                      <button onClick={() => handleDeleteItem('vehiculos', v.id)} className="btn-icon btn-danger"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'solicitudes':
        // **SOLICITUDES PENDIENTES (Ejemplo)**
        return (
          <div className="gestion-card">
            <h2 className="titulo-seccion">📝 Solicitudes Pendientes</h2>
            <p className="subtitulo-seccion">Revisa y aprueba nuevas solicitudes de servicio o registro.</p>
            <div className="alerta-info">
                <div className="alerta-content">
                    <Clock className="alerta-icon" size={24} />
                    <div>
                        <h3 className="alerta-titulo">Tienes 5 Solicitudes de Registro de Empresa por revisar.</h3>
                        <p className="alerta-texto">
                           Prioriza las solicitudes más antiguas.
                        </p>
                    </div>
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
                <p className="logo-subtitulo">Panel **Administrador**</p>
              </div>
            </div>

            {/* Menú - Adaptado a Admin */}
            <nav className="nav-menu">
              <button
                onClick={() => setPestanaActiva('perfil')}
                className={`nav-link ${pestanaActiva === 'perfil' ? 'active' : ''}`}
              >
                <Home size={20} />
                Mi Perfil
              </button>
              <button
                onClick={() => setPestanaActiva('usuarios')}
                className={`nav-link ${pestanaActiva === 'usuarios' ? 'active' : ''}`}
              >
                <Users size={20} />
                Gestión de Usuarios
              </button>
              <button
                onClick={() => setPestanaActiva('empresas')}
                className={`nav-link ${pestanaActiva === 'empresas' ? 'active' : ''}`}
              >
                <Building size={20} />
                Gestión de Empresas
              </button>
              <button
                onClick={() => setPestanaActiva('vehiculos')}
                className={`nav-link ${pestanaActiva === 'vehiculos' ? 'active' : ''}`}
              >
                <Truck size={20} />
                Gestión de Vehículos
              </button>
              <button
                onClick={() => setPestanaActiva('solicitudes')}
                className={`nav-link ${pestanaActiva === 'solicitudes' ? 'active' : ''}`}
              >
                <FileText size={20} />
                Solicitudes Pendientes
                <span className="badge-notificaciones">5</span>
              </button>
            </nav>

            {/* Botón cerrar sesión */}
           <button
              className="btn btn-logout"
              onClick={() => {
                // Simulación de cierre de sesión
                console.log("Cerrando sesión del administrador.");
                // window.location.href = "/login"; 
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
              ¡Bienvenido, {administrador.nombre}! 👑
            </h1>
            <p className="main-subtitle">Panel de control de la plataforma Zero Waste</p>
          </div>

          {/* Contenido dinámico */}
          {renderContenido()}

          {/* Información adicional (Adaptada) */}
          <div className="alerta-info">
            <div className="alerta-content">
              <AlertCircle className="alerta-icon" size={24} />
              <div>
                <h3 className="alerta-titulo">Administración Central</h3>
                <p className="alerta-texto">
                  Revisa el estado general del sistema y prioriza las tareas en las secciones de gestión para mantener la plataforma funcionando correctamente.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;