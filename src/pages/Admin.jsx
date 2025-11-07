import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X,
  LogOut, Home, FileText, Bell, MessageSquare, BookOpen,
  Map, Plus, CheckCircle, Clock, AlertCircle, Trash2,
  Users, Building, Truck, Edit, List, UserCheck, Settings
} from 'lucide-react';
import { useEffect } from 'react';

// Función para obtener un valor del localStorage (simulación de carga persistente)
const loadFromLocalStorage = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error("Error loading state from localStorage", error);
        return defaultValue;
    }
};

// Función para guardar un valor en el localStorage
const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving state to localStorage", error);
    }
};

const Admin = () => {
    // 1. Estados principales del panel
    const [pestanaActiva, setPestanaActiva] = useState('perfil');
    const [editando, setEditando] = useState(false);
    const [message, setMessage] = useState(null);

    // 2. Datos de ejemplo para el Administrador
    const [administrador, setAdministrador] = useState(loadFromLocalStorage('adminData', {
        nombre: 'Danna',
        apellido: 'Zarta',
        email: 'danna.admin@zerowaste.com',
        telefono: '+57 320 987 6543',
        documento: 'ADM12345',
        localidad: 'Bogotá (Sede Principal)',
        rol: 'Administrador Principal',
        fechaRegistro: '2023-08-01T09:00:00'
    }));

    const [formData, setFormData] = useState(administrador);
    const iniciales = `${administrador.nombre?.[0] || ''}${administrador.apellido?.[0] || ''}`.toUpperCase();

    // 3. Datos simulados para las vistas de Gestión (usando localStorage para persistencia básica)
    const [usuarios, setUsuarios] = useState(loadFromLocalStorage('adminUsuarios', [
        { id: 'U001', nombre: 'Ana Gómez', correo: 'ana.gomez@example.com', estado: 'Activo' },
        { id: 'U002', nombre: 'Carlos Ruiz', correo: 'carlos.ruiz@example.com', estado: 'Inactivo' },
    ]));

    const [empresas, setEmpresas] = useState(loadFromLocalStorage('adminEmpresas', [
        { id: 'E001', nombre: 'EcoVerde S.A.', ciudad: 'Bogotá', tipo: 'Reciclaje', estado: 'Aprobada' },
        { id: 'E002', nombre: 'Planeta Limpio', ciudad: 'Medellín', tipo: 'Transporte', estado: 'Pendiente' },
    ]));

    const [vehiculos, setVehiculos] = useState(loadFromLocalStorage('adminVehiculos', [
        { id: 'V001', placa: 'ABC-123', conductor: 'Juan Pérez', estado: 'Activo' },
        { id: 'V002', placa: 'XYZ-789', conductor: 'María López', estado: 'Mantenimiento' },
    ]));

    // 4. Nuevo estado para CONDUCTORES (Conductor)
    const [conductores, setConductores] = useState(loadFromLocalStorage('adminConductores', [
        { id: 'C001', nombre: 'Juan Pérez', email: 'juan.perez@route.com', telefono: '310-555-1234', vehiculo: 'ABC-123', estado: 'Disponible' },
        { id: 'C002', nombre: 'María López', email: 'maria.lopez@route.com', telefono: '311-444-5678', vehiculo: 'XYZ-789', estado: 'En Ruta' },
    ]));

    // 5. Estados para los nuevos formularios de registro
    const [newConductor, setNewConductor] = useState({ nombre: '', email: '', telefono: '', vehiculoAsignado: '' });
    const [newAdmin, setNewAdmin] = useState({ nombre: '', email: '', telefono: '', rol: '' });

    // Sincronizar estados con localStorage
    useEffect(() => {
        saveToLocalStorage('adminData', administrador);
        saveToLocalStorage('adminUsuarios', usuarios);
        saveToLocalStorage('adminEmpresas', empresas);
        saveToLocalStorage('adminVehiculos', vehiculos);
        saveToLocalStorage('adminConductores', conductores);
    }, [administrador, usuarios, empresas, vehiculos, conductores]);

    // 6. Funciones de Mensajes de Estado (Reemplazo de alert/confirm)
    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 4000);
    };

    // 7. Funciones de Gestión de Tablas
    const handleEditItem = (tipo, id) => {
        // Sustitución de alert
        console.log(`Editando ${tipo} con ID: ${id}`);
        showMessage(`Abriendo modal de edición para ${tipo} ${id}... (Simulado)`, 'info');
    };

    const handleDeleteItem = (tipo, id) => {
        // Sustitución de window.confirm
        if (confirm(`¿Estás seguro de eliminar el item ${id} de ${tipo}?`)) { // Usando confirm para demo simple
             if (tipo === 'usuarios') setUsuarios(prev => prev.filter(u => u.id !== id));
             else if (tipo === 'empresas') setEmpresas(prev => prev.filter(e => e.id !== id));
             else if (tipo === 'vehiculos') setVehiculos(prev => prev.filter(v => v.id !== id));
             else if (tipo === 'conductores') setConductores(prev => prev.filter(v => v.id !== id));
             showMessage(`Elemento ${id} de ${tipo} eliminado.`, 'info');
        }
    };
    
    // 8. Funciones de Gestión de Perfil de Administrador
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setFormData(administrador);
        setEditando(true);
    };

    const handleSave = () => {
        setAdministrador(formData);
        setEditando(false);
        showMessage('Perfil de administrador guardado exitosamente.', 'success');
    };

    const handleCancel = () => {
        setFormData(administrador);
        setEditando(false);
    };

    // 9. Funciones de Registro Rápido
    const handleConductorChange = (e) => {
        setNewConductor({ ...newConductor, [e.target.name]: e.target.value });
    };

    const handleAdminChange = (e) => {
        setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
    };

    const handleAddConductor = (e) => {
        e.preventDefault();
        if (!newConductor.nombre || !newConductor.email || !newConductor.telefono) {
            showMessage('Por favor, complete todos los campos requeridos para el conductor.', 'error');
            return;
        }

        const newId = `C${String(conductores.length + 1).padStart(3, '0')}`;
        const conductor = { ...newConductor, id: newId, estado: 'Disponible', vehiculo: newConductor.vehiculoAsignado || 'N/A' };
        setConductores(prev => [...prev, conductor]);
        setNewConductor({ nombre: '', email: '', telefono: '', vehiculoAsignado: '' });
        showMessage('Conductor agregado exitosamente!', 'success');
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        if (!newAdmin.nombre || !newAdmin.email || !newAdmin.telefono || !newAdmin.rol) {
            showMessage('Por favor, complete todos los campos requeridos para el administrador.', 'error');
            return;
        }

        const admin = {
            id: `ADM${Math.floor(Math.random() * 10000)}`,
            nombre: newAdmin.nombre,
            correo: newAdmin.email,
            telefono: newAdmin.telefono,
            rol: newAdmin.rol
        };
        // Simulación: en un entorno real se agregaría a una colección de administradores.
        console.log('Nuevo administrador simulado:', admin);
        setNewAdmin({ nombre: '', email: '', telefono: '', rol: '' });
        showMessage('Administrador agregado exitosamente (Simulado)!', 'success');
    };

    // 10. Renderizado Dinámico de Contenido
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

                            <div className="campo-container">
                                <label className="campo-label">
                                    <User size={16} className="icon-campo" />
                                    ID de Administrador
                                </label>
                                <p className="campo-valor campo-valor-noeditable">
                                    {administrador.documento} (No editable)
                                </p>
                            </div>

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
                                <p className="stat-number">{usuarios.length}</p>
                                <p className="stat-label">Usuarios Registrados</p>
                            </div>
                            <div className="stat-card stat-green">
                                <Building className="stat-icon" size={32} />
                                <p className="stat-number">{empresas.filter(e => e.estado === 'Aprobada').length}</p>
                                <p className="stat-label">Empresas Activas</p>
                            </div>
                            <div className="stat-card stat-yellow">
                                <List className="stat-icon" size={32} />
                                <p className="stat-number">{empresas.filter(e => e.estado === 'Pendiente').length}</p>
                                <p className="stat-label">Solicitudes Pendientes</p>
                            </div>
                            <div className="stat-card stat-purple">
                                <UserCheck className="stat-icon" size={32} />
                                <p className="stat-number">{conductores.length}</p>
                                <p className="stat-label">Conductores Registrados</p>
                            </div>
                        </div>
                    </div>
                );

            case 'registroRapido':
                // **NUEVA VISTA: REGISTRO RÁPIDO**
                return (
                    <div className="gestion-card">
                        <h2 className="titulo-seccion">⚡ Registro Rápido de Personal</h2>
                        <p className="subtitulo-seccion">Agrega nuevos administradores y conductores al sistema.</p>

                        {/* Formulario de Conductor */}
                        <div className="form-card">
                            <h3 className="form-title"><Truck size={20} className="mr-2" /> Registrar Nuevo Conductor</h3>
                            <form onSubmit={handleAddConductor}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="conductor-nombre">Nombre Completo</label>
                                        <input
                                            id="conductor-nombre"
                                            type="text"
                                            name="nombre"
                                            value={newConductor.nombre}
                                            onChange={handleConductorChange}
                                            placeholder="Ej: David Londoño"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="conductor-email">Correo Electrónico</label>
                                        <input
                                            id="conductor-email"
                                            type="email"
                                            name="email"
                                            value={newConductor.email}
                                            onChange={handleConductorChange}
                                            placeholder="ejemplo@route.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="conductor-telefono">Teléfono</label>
                                        <input
                                            id="conductor-telefono"
                                            type="tel"
                                            name="telefono"
                                            value={newConductor.telefono}
                                            onChange={handleConductorChange}
                                            placeholder="+57 300 123 4567"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="conductor-vehiculo">Vehículo Asignado (Placa)</label>
                                        <input
                                            id="conductor-vehiculo"
                                            type="text"
                                            name="vehiculoAsignado"
                                            value={newConductor.vehiculoAsignado}
                                            onChange={handleConductorChange}
                                            placeholder="Ej: RDT-908 (Opcional)"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-save mt-4">
                                    <Plus size={18} /> Agregar Conductor
                                </button>
                            </form>
                        </div>

                        {/* Formulario de Administrador */}
                        <div className="form-card">
                            <h3 className="form-title"><Settings size={20} className="mr-2" /> Registrar Nuevo Administrador</h3>
                            <form onSubmit={handleAddAdmin}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="admin-nombre">Nombre Completo</label>
                                        <input
                                            id="admin-nombre"
                                            type="text"
                                            name="nombre"
                                            value={newAdmin.nombre}
                                            onChange={handleAdminChange}
                                            placeholder="Ej: Sofia Herrera"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="admin-email">Correo Electrónico</label>
                                        <input
                                            id="admin-email"
                                            type="email"
                                            name="email"
                                            value={newAdmin.email}
                                            onChange={handleAdminChange}
                                            placeholder="sofia@zerowaste.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="admin-telefono">Teléfono</label>
                                        <input
                                            id="admin-telefono"
                                            type="tel"
                                            name="telefono"
                                            value={newAdmin.telefono}
                                            onChange={handleAdminChange}
                                            placeholder="+57 320 987 6543"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="admin-rol">Rol</label>
                                        <select
                                            id="admin-rol"
                                            name="rol"
                                            value={newAdmin.rol}
                                            onChange={handleAdminChange}
                                            required
                                        >
                                            <option value="">Seleccione un rol</option>
                                            <option value="Admin Soporte">Admin Soporte</option>
                                            <option value="Supervisor Logistica">Supervisor Logística</option>
                                            <option value="Admin Contable">Admin Contable</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-save btn-primary mt-4">
                                    <Plus size={18} /> Agregar Administrador
                                </button>
                            </form>
                        </div>
                    </div>
                );

            case 'usuarios':
                // **GESTIÓN DE USUARIOS**
                return (
                    <div className="gestion-card">
                        <h2 className="titulo-seccion">👥 Gestión de Ciudadanos</h2>
                        <p className="subtitulo-seccion">Administra cuentas de ciudadanos y sus estados.</p>
                        <button className="btn btn-add"><Plus size={18} /> Nuevo Ciudadano</button>
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

            case 'conductores':
                // **NUEVA VISTA: GESTIÓN DE CONDUCTORES**
                return (
                    <div className="gestion-card">
                        <h2 className="titulo-seccion">👨‍✈️ Gestión de Conductores</h2>
                        <p className="subtitulo-seccion">Controla el personal de ruta asignado a la flota.</p>
                        <button className="btn btn-add" onClick={() => setPestanaActiva('registroRapido')}><Plus size={18} /> Registrar Conductor</button>
                        <table className="requests-table">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Nombre</th><th>Email</th><th>Vehículo</th><th>Estado</th><th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conductores.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.nombre}</td>
                                        <td>{c.email}</td>
                                        <td>{c.vehiculo}</td>
                                        <td className={c.estado === 'Disponible' ? 'status-active' : 'status-maintenance'}>{c.estado}</td>
                                        <td>
                                            <button onClick={() => handleEditItem('conductores', c.id)} className="btn-icon"><Edit size={16} /></button>
                                            <button onClick={() => handleDeleteItem('conductores', c.id)} className="btn-icon btn-danger"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'empresas':
                // **GESTIÓN DE EMPRESAS (Original)**
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
                // **GESTIÓN DE VEHÍCULOS (Original)**
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
                // **SOLICITUDES PENDIENTES (Original)**
                return (
                    <div className="gestion-card">
                        <h2 className="titulo-seccion">📝 Solicitudes Pendientes</h2>
                        <p className="subtitulo-seccion">Revisa y aprueba nuevas solicitudes de servicio o registro.</p>
                        <div className="alerta-info">
                            <div className="alerta-content">
                                <Clock className="alerta-icon" size={24} />
                                <div>
                                    <h3 className="alerta-titulo">Tienes {empresas.filter(e => e.estado === 'Pendiente').length} Solicitudes de Registro de Empresa por revisar.</h3>
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
        <>
            <style>
                {`
                /* Estilos Generales y Reset */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                :root {
                    --color-primary: #10b981; /* Emerald-500 */
                    --color-primary-dark: #059669; /* Emerald-600 */
                    --color-secondary: #0f172a; /* Slate-900 */
                    --color-background: #f1f5f9; /* Slate-100 */
                    --color-sidebar: #ffffff;
                    --color-text: #333;
                    --color-light-text: #6b7280; /* Gray-500 */
                }

                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', sans-serif;
                }

                .app-container {
                    min-height: 100vh;
                    background-color: var(--color-background);
                }

                .app-layout {
                    display: flex;
                    min-height: 100vh;
                }

                /* Sidebar */
                .sidebar {
                    width: 280px;
                    flex-shrink: 0;
                    background-color: var(--color-sidebar);
                    color: var(--color-secondary);
                    padding: 24px 16px;
                    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    margin-bottom: 30px;
                    padding-left: 10px;
                }
                .logo-icon {
                    background-color: var(--color-primary);
                    padding: 8px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                }
                .logo-titulo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--color-secondary);
                    line-height: 1.1;
                }
                .logo-subtitulo {
                    font-size: 0.75rem;
                    color: var(--color-light-text);
                    font-weight: 500;
                }
                .logo-img {
                    width: 24px;
                    height: 24px;
                    filter: invert(1);
                }

                /* Navegación */
                .nav-menu {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex-grow: 1;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 8px;
                    color: var(--color-light-text);
                    font-weight: 600;
                    text-align: left;
                    transition: background-color 0.2s, color 0.2s;
                    background: none;
                    border: none;
                    cursor: pointer;
                    position: relative;
                }

                .nav-link:hover {
                    background-color: #f3f4f6; /* Gray-100 */
                    color: var(--color-text);
                }

                .nav-link.active {
                    background-color: var(--color-primary);
                    color: white;
                    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
                }

                .nav-link.active svg {
                    color: white;
                }

                .badge-notificaciones {
                    background-color: #ef4444; /* Red-500 */
                    color: white;
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 2px 8px;
                    border-radius: 9999px;
                    margin-left: auto;
                }

                /* Main Content */
                .main-content {
                    flex-grow: 1;
                    padding: 30px;
                    overflow-y: auto;
                }

                .main-header {
                    margin-bottom: 30px;
                }

                .main-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--color-secondary);
                }

                .main-subtitle {
                    color: var(--color-light-text);
                    font-size: 1rem;
                }

                .titulo-seccion {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--color-secondary);
                    margin-bottom: 5px;
                }

                .subtitulo-seccion {
                    color: var(--color-light-text);
                    margin-bottom: 20px;
                }

                /* Cards and Containers */
                .perfil-card, .gestion-card, .form-card {
                    background: #ffffff;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    margin-bottom: 20px;
                }

                /* Perfil Header */
                .perfil-header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #f3f4f6;
                }

                .perfil-acciones-container {
                    display: flex;
                    gap: 10px;
                }

                /* Avatar y Nombre */
                .perfil-avatar-info {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .avatar {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background-color: var(--color-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border: 4px solid var(--color-background);
                }

                .avatar-iniciales {
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                }

                .perfil-nombre {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--color-secondary);
                    line-height: 1.1;
                }

                .perfil-rol {
                    color: var(--color-primary-dark);
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                /* Grid de Datos del Perfil */
                .perfil-datos-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .campo-container {
                    background-color: #f9fafb; /* Gray-50 */
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid #f3f4f6;
                }

                .campo-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #4b5563; /* Gray-700 */
                    margin-bottom: 8px;
                }

                .campo-valor {
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--color-secondary);
                    word-break: break-word;
                }

                .campo-valor-noeditable {
                    color: var(--color-light-text);
                    font-style: italic;
                }

                /* Edición de Inputs */
                .input-editable {
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    padding: 8px 10px;
                    width: 100%;
                    transition: border-color 0.2s;
                }

                .input-editable:focus {
                    border-color: var(--color-primary);
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
                }

                .nombre-edicion {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 5px;
                }
                .input-nombre {
                    font-size: 1.2rem;
                    font-weight: 600;
                }

                /* Botones */
                .btn {
                    padding: 10px 18px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                    border: none;
                }

                .btn-primary {
                    background-color: var(--color-primary);
                    color: white;
                }
                .btn-primary:hover {
                    background-color: var(--color-primary-dark);
                }

                .btn-save {
                    background-color: #3b82f6; /* Blue-500 */
                    color: white;
                }
                .btn-save:hover {
                    background-color: #2563eb; /* Blue-600 */
                }

                .btn-cancel {
                    background-color: #9ca3af; /* Gray-400 */
                    color: white;
                }
                .btn-cancel:hover {
                    background-color: #6b7280; /* Gray-500 */
                }
                .btn-add {
                    background-color: var(--color-primary);
                    color: white;
                    margin-bottom: 20px;
                    width: fit-content;
                }
                .btn-add:hover {
                    background-color: var(--color-primary-dark);
                }

                .btn-logout {
                    background-color: #ef4444; /* Red-500 */
                    color: white;
                    margin-top: 20px;
                    width: 100%;
                    justify-content: center;
                }
                .btn-logout:hover {
                    background-color: #dc2626; /* Red-600 */
                }

                .btn-icon {
                    background: none;
                    border: none;
                    color: #4b5563;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 4px;
                    transition: color 0.2s, background-color 0.2s;
                }

                .btn-icon:hover {
                    background-color: #f3f4f6;
                    color: var(--color-secondary);
                }

                .btn-danger {
                    color: #ef4444;
                }
                .btn-danger:hover {
                    background-color: #fee2e2;
                }

                /* Estadísticas */
                .perfil-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                }

                .stat-card {
                    padding: 20px;
                    border-radius: 10px;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 120px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .stat-card:before {
                    content: '';
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    opacity: 0.2;
                }

                .stat-blue { background-color: #3b82f6; } /* Blue-500 */
                .stat-blue:before { background-color: #ffffff; }

                .stat-green { background-color: #10b981; } /* Emerald-500 */
                .stat-green:before { background-color: #ffffff; }

                .stat-yellow { background-color: #f59e0b; } /* Amber-500 */
                .stat-yellow:before { background-color: #ffffff; }

                .stat-purple { background-color: #8b5cf6; } /* Violet-500 */
                .stat-purple:before { background-color: #ffffff; }

                .stat-number {
                    font-size: 2.2rem;
                    font-weight: 700;
                    line-height: 1;
                    z-index: 1;
                }
                .stat-label {
                    font-size: 0.85rem;
                    font-weight: 500;
                    margin-top: 5px;
                    z-index: 1;
                }
                .stat-icon {
                    position: absolute;
                    bottom: 10px;
                    right: 15px;
                    opacity: 0.3;
                    width: 40px;
                    height: 40px;
                }

                /* Alerta (Información adicional) */
                .alerta-info {
                    background-color: #dbeafe; /* Blue-100 */
                    border-left: 5px solid #3b82f6; /* Blue-500 */
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 30px;
                }
                .alerta-content {
                    display: flex;
                    gap: 15px;
                    align-items: flex-start;
                }
                .alerta-icon {
                    color: #3b82f6;
                    flex-shrink: 0;
                }
                .alerta-titulo {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #1e3a8a; /* Blue-900 */
                    margin-bottom: 5px;
                }
                .alerta-texto {
                    font-size: 0.9rem;
                    color: #1e40af; /* Blue-700 */
                }

                /* Tablas de Gestión */
                .requests-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0 10px;
                    margin-top: 15px;
                }

                .requests-table thead th {
                    text-align: left;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #6b7280;
                    padding: 0 15px 10px 15px;
                    border-bottom: 2px solid #e5e7eb;
                }

                .requests-table tbody tr {
                    background-color: #f9fafb;
                    border-radius: 8px;
                    transition: box-shadow 0.2s;
                }

                .requests-table tbody tr:hover {
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                }

                .requests-table tbody td {
                    padding: 15px;
                    font-size: 0.95rem;
                    color: var(--color-text);
                }
                .requests-table tbody td:last-child {
                    display: flex;
                    gap: 5px;
                }
                .requests-table tbody tr:first-child td:first-child { border-top-left-radius: 8px; }
                .requests-table tbody tr:last-child td:last-child { border-bottom-right-radius: 8px; }

                /* Estados de la Tabla */
                .status-active { color: #059669; font-weight: 600; }
                .status-inactive { color: #ef4444; font-weight: 600; }
                .status-pending { color: #f59e0b; font-weight: 600; }
                .status-maintenance { color: #3b82f6; font-weight: 600; }


                /* ESTILOS AÑADIDOS PARA REGISTRO RÁPIDO */
                .form-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #3b82f6; /* Blue-500 */
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #f3f4f6;
                    display: flex;
                    align-items: center;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 16px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: #4b5563; /* Gray-700 */
                }
                .form-group input, .form-group select {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #d1d5db; /* Gray-300 */
                    border-radius: 6px;
                    box-sizing: border-box;
                    transition: border-color 0.2s;
                    background-color: #ffffff;
                }
                .form-group input:focus, .form-group select:focus {
                    border-color: #3b82f6; /* Blue-500 */
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                }

                /* ESTILOS AÑADIDOS PARA MENSAJES DE ESTADO (Reemplazo de Alert) */
                .status-message {
                    padding: 15px 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                .status-message.success {
                    background-color: #d1fae5; /* Green-100 */
                    color: #059669; /* Green-600 */
                    border: 1px solid #34d399; /* Green-400 */
                }
                .status-message.error {
                    background-color: #fee2e2; /* Red-100 */
                    color: #ef4444; /* Red-500 */
                    border: 1px solid #f87171; /* Red-400 */
                }
                .status-message.info {
                    background-color: #e0f2fe; /* Sky-100 */
                    color: #0284c7; /* Sky-600 */
                    border: 1px solid #38bdf8; /* Sky-400 */
                }

                /* Media Queries para Responsividad */
                @media (max-width: 1024px) {
                    .sidebar {
                        width: 250px;
                        padding: 15px 10px;
                    }
                    .main-content {
                        padding: 20px;
                    }
                }

                @media (max-width: 768px) {
                    .app-layout {
                        flex-direction: column;
                    }
                    .sidebar {
                        width: 100%;
                        height: auto;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                        padding: 15px;
                    }
                    .sidebar-content {
                        display: flex;
                        flex-direction: column;
                    }
                    .logo-container {
                        margin-bottom: 20px;
                    }
                    .nav-menu {
                        flex-direction: row;
                        flex-wrap: wrap;
                        gap: 5px;
                    }
                    .nav-link {
                        padding: 8px 12px;
                        font-size: 0.85rem;
                    }
                    .nav-link svg {
                        width: 16px;
                        height: 16px;
                    }
                    .btn-logout {
                        margin-top: 15px;
                    }
                    .perfil-datos-grid {
                        grid-template-columns: 1fr;
                    }
                    .perfil-stats-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                    .status-message {
                        width: 90%;
                        left: 5%;
                        right: 5%;
                        top: auto;
                        bottom: 20px;
                    }
                }
                `}
            </style>

            {/* Mensaje de Estado (Reemplazo de Alert) */}
            {message && (
                <div className={`status-message ${message.type}`}>
                    {message.type === 'success' && <CheckCircle size={20} />}
                    {message.type === 'error' && <AlertCircle size={20} />}
                    {message.type === 'info' && <MessageSquare size={20} />}
                    {message.text}
                </div>
            )}

            <div className="app-container">
                <div className="app-layout">
                    {/* Sidebar */}
                    <aside className="sidebar">
                        <div className="sidebar-content">
                            {/* Logo */}
                            <div className="logo-container">
                                <div className="logo-icon">
                                    <Truck size={24} color="white" /> {/* Reemplazado por un icono de Lucide */}
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
                                    onClick={() => setPestanaActiva('registroRapido')}
                                    className={`nav-link ${pestanaActiva === 'registroRapido' ? 'active' : ''}`}
                                >
                                    <Plus size={20} />
                                    Registro Rápido
                                </button>
                                <button
                                    onClick={() => setPestanaActiva('usuarios')}
                                    className={`nav-link ${pestanaActiva === 'usuarios' ? 'active' : ''}`}
                                >
                                    <Users size={20} />
                                    Gestión de Ciudadanos
                                </button>
                                <button
                                    onClick={() => setPestanaActiva('conductores')}
                                    className={`nav-link ${pestanaActiva === 'conductores' ? 'active' : ''}`}
                                >
                                    <User size={20} />
                                    Gestión de Conductores
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
                                    <span className="badge-notificaciones">{empresas.filter(e => e.estado === 'Pendiente').length}</span>
                                </button>
                            </nav>

                            {/* Botón cerrar sesión */}
                            <button
                                className="btn btn-logout"
                                onClick={() => {
                                    console.log("Cerrando sesión del administrador.");
                                    showMessage('Sesión cerrada (simulación).', 'info');
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

                        {/* Información adicional (Original) */}
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
        </>
    );
};

export default Admin;