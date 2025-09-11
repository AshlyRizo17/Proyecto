// ================================
// VARIABLES GLOBALES
// ================================

// Array principal de todos los usuarios
let allUsers = [];

// Array de usuarios filtrados según búsqueda y filtros
let filteredUsers = [];

// Control de paginación
let currentPage = 1;
const usersPerPage = 10; // Número de usuarios por página

// ================================
// DATOS DE EJEMPLO (MOCK DATA)
// ================================

const mockUsers = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        role: 'Administrador',
        status: 'activos',
        createdAt: '2024-01-15',
        lastLogin: '2024-09-05'
    },
    {
        id: 2,
        name: 'María García',
        email: 'maria.garcia@email.com',
        role: 'Usuario',
        status: 'active',
        createdAt: '2024-02-20',
        lastLogin: '2024-09-04'
    },
    {
        id: 3,
        name: 'Carlos López',
        email: 'carlos.lopez@email.com',
        role: 'Moderador',
        status: 'inactivos',
        createdAt: '2024-01-10',
        lastLogin: '2024-08-30'
    },
    {
        id: 4,
        name: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        role: 'Usuario',
        status: 'active',
        createdAt: '2024-03-05',
        lastLogin: '2024-09-05'
    },
    {
        id: 5,
        name: 'Pedro Rodríguez',
        email: 'pedro.rodriguez@email.com',
        role: 'Usuario',
        status: 'suspended',
        createdAt: '2024-01-25',
        lastLogin: '2024-07-15'
    },
    {
        id: 6,
        name: 'Laura Sánchez',
        email: 'laura.sanchez@email.com',
        role: 'Administrador',
        status: 'active',
        createdAt: '2024-02-10',
        lastLogin: '2024-09-05'
    },
    {
        id: 7,
        name: 'Miguel Torres',
        email: 'miguel.torres@email.com',
        role: 'Usuario',
        status: 'active',
        createdAt: '2024-03-15',
        lastLogin: '2024-09-03'
    },
    {
        id: 8,
        name: 'Carmen Flores',
        email: 'carmen.flores@email.com',
        role: 'Moderador',
        status: 'inactive',
        createdAt: '2024-01-30',
        lastLogin: '2024-08-20'
    }
];

// ================================
// FUNCIONES DE INICIALIZACIÓN
// ================================

/**
 * Función principal que inicializa la aplicación
 * Se ejecuta cuando el DOM está completamente cargado
 */
function initApp() {
    console.log('Inicializando aplicación de gestión de usuarios...');
    
    // Mostrar indicador de carga
    showLoading(true);
    
    // Simular carga de datos (en un caso real sería una llamada a API)
    setTimeout(() => {
        // Inicializar datos
        allUsers = [...mockUsers];
        filteredUsers = [...allUsers];
        
        // Renderizar interfaz
        renderTable();
        updateStatistics();
        renderPagination();
        
        // Ocultar indicador de carga
        showLoading(false);
        
        console.log('Aplicación inicializada correctamente');
    }, 800); // Simular tiempo de carga
}

/**
 * Muestra u oculta el indicador de carga
 * @param {boolean} show - True para mostrar, false para ocultar
 */
function showLoading(show) {
    const loading = document.getElementById('loading');
    const table = document.getElementById('usersTable');
    const emptyState = document.getElementById('emptyState');
    
    if (show) {
        loading.style.display = 'block';
        table.style.display = 'none';
        emptyState.style.display = 'none';
    } else {
        loading.style.display = 'none';
        table.style.display = 'table';
    }
}

// ================================
// FUNCIONES DE UTILIDAD PARA UI
// ================================

/**
 * Genera el HTML para el badge de estado del usuario
 * @param {string} status - Estado del usuario (active, inactive, suspended)
 * @returns {string} HTML del badge de estado
 */
function getStatusBadge(status) {
    const statusConfig = {
        active: { class: 'badge-active', label: 'Activo' },
        inactive: { class: 'badge-inactive', label: 'Inactivo' },
        suspended: { class: 'badge-suspended', label: 'Suspendido' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    
    return `<span class="badge ${config.class}">${config.label}</span>`;
}

/**
 * Genera el HTML para el badge de rol del usuario
 * @param {string} role - Rol del usuario (Administrador, Moderador, Usuario)
 * @returns {string} HTML del badge de rol
 */
function getRoleBadge(role) {
    const roleConfig = {
        'Administrador': { class: 'badge-admin' },
        'Moderador': { class: 'badge-moderator' },
        'Usuario': { class: 'badge-user' }
    };
    
    const config = roleConfig[role] || roleConfig.Usuario;
    
    return `<span class="badge ${config.class}">${role}</span>`;
}

/**
 * Genera las iniciales del nombre completo del usuario
 * @param {string} fullName - Nombre completo del usuario
 * @returns {string} Iniciales del usuario
 */
function getUserInitials(fullName) {
    return fullName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');
}

/**
 * Formatea una fecha en formato DD/MM/YYYY
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha formateada
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// ================================
// FUNCIONES DE VERIFICACIÓN DE DATOS
// ================================

/**
 * Valida los datos de un usuario antes de agregar o editar
 * @param {Object} user - Objeto usuario con propiedades name y email
 * @returns {Object} - { valid: boolean, message: string }
 */
function validarUsuario(user) {
    if (!user.name || user.name.trim() === "") {
        return { valid: false, message: "El nombre no puede estar vacío." };
    }
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
        return { valid: false, message: "El correo electrónico no es válido." };
    }
    return { valid: true, message: "" };
}

// ================================
// FUNCIONES DE FILTRADO Y BÚSQUEDA
// ================================

/**
 * Función principal para filtrar usuarios según búsqueda y filtros
 * Se ejecuta cuando el usuario escribe en el campo de búsqueda o cambia filtros
 */
function filterUsers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const statusFilter = document.getElementById('statusFilter').value;
    
    console.log('Filtrando usuarios:', { searchTerm, statusFilter });
    
    // Aplicar filtros
    filteredUsers = allUsers.filter(user => {
        // Filtro de búsqueda por texto (nombre, email, rol)
        const matchesSearch = !searchTerm || 
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm);
        
        // Filtro por estado
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    // Reiniciar a la primera página cuando se aplican filtros
    currentPage = 1;
    
    // Actualizar interfaz
    renderTable();
    renderPagination();
    updateStatistics();
    
    console.log(`Filtrado completado. ${filteredUsers.length} usuarios encontrados`);
}

// ================================
// FUNCIONES DE RENDERIZADO
// ================================

/**
 * Renderiza la tabla de usuarios con los datos actuales
 */
function renderTable() {
    const tableBody = document.getElementById('usersTableBody');
    const table = document.getElementById('usersTable');
    const emptyState = document.getElementById('emptyState');
    
    // Limpiar contenido previo
    tableBody.innerHTML = '';
    
    // Verificar si hay usuarios para mostrar
    if (filteredUsers.length === 0) {
        table.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    } else {
        table.style.display = 'table';
        emptyState.style.display = 'none';
    }
    
    // Calcular usuarios para la página actual
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);
    
    // Generar filas de la tabla
    currentUsers.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <div class="user-info">
                    <div class="user-avatar">
                        ${getUserInitials(user.name)}
                    </div>
                    <div class="user-details">
                        <h4>${user.name}</h4>
                        <p>${user.email}</p>
                    </div>
                </div>
            </td>
            <td>${getRoleBadge(user.role)}</td>
            <td>${getStatusBadge(user.status)}</td>
            <td>${formatDate(user.createdAt)}</td>
            <td>${formatDate(user.lastLogin)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewUser(${user.id})" title="Ver detalles">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action btn-edit" onclick="editUser(${user.id})" title="Editar usuario">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteUser(${user.id})" title="Eliminar usuario">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    console.log(`Tabla renderizada con ${currentUsers.length} usuarios`);
}

/**
 * Renderiza los controles de paginación
 */
function renderPagination() {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginationControls = document.getElementById('paginationControls');
    const paginationInfo = document.getElementById('paginationInfo');
    
    // Actualizar información de paginación
    const startIndex = (currentPage - 1) * usersPerPage + 1;
    const endIndex = Math.min(currentPage * usersPerPage, filteredUsers.length);
    
    paginationInfo.textContent = `Mostrando ${startIndex} a ${endIndex} de ${filteredUsers.length} resultados`;
    
    // Limpiar controles previos
    paginationControls.innerHTML = '';
    
    // Botón Anterior
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = 'Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => goToPage(currentPage - 1);
    paginationControls.appendChild(prevBtn);
    
    // Botones numerados
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajustar startPage si estamos cerca del final
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        paginationControls.appendChild(pageBtn);
    }
    
    // Botón Siguiente
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = 'Siguiente';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => goToPage(currentPage + 1);
    paginationControls.appendChild(nextBtn);
    
    console.log(`Paginación renderizada: página ${currentPage} de ${totalPages}`);
}

/**
 * Actualiza las estadísticas mostradas en las tarjetas
 */
function updateStatistics() {
    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter(u => u.status === 'active').length;
    const inactiveUsers = allUsers.filter(u => u.status === 'inactive').length;
}