// Variables globales
let map;
let userLocation = null;
let requests = [];
let requestCounter = 1000;

// Configuración de la aplicación
const CONFIG = {
    defaultLocation: [4.7110, -74.0721], // Bogotá por defecto
    defaultZoom: 11,
    focusZoom: 17,
    geoOptions: {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    }
};

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initEventListeners();
    updateRequestsList();
    loadStoredRequests();
});

// Inicializar mapa
function initMap() {
    try {
        // Crear mapa centrado en Bogotá por defecto
        map = L.map('map').setView(CONFIG.defaultLocation, CONFIG.defaultZoom);
        
        // Agregar capa de tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        // Obtener ubicación actual
        getCurrentLocation();
        
        console.log('✅ Mapa inicializado correctamente');
    } catch (error) {
        console.error('❌ Error inicializando mapa:', error);
        showNotification('Error inicializando el mapa', 'error');
    }
}

// Inicializar event listeners
function initEventListeners() {
    const form = document.getElementById('requestForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Obtener ubicación actual del usuario
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showNotification('Tu navegador no soporta geolocalización', 'warning');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            userLocation = [position.coords.latitude, position.coords.longitude];
            map.setView(userLocation, CONFIG.focusZoom);
            
            // Crear marcador de ubicación actual
            const userMarker = L.marker(userLocation, {
                icon: createCustomIcon('📍', '#2196f3')
            }).addTo(map);
            
            userMarker.bindPopup(`
                <div class="popup-content">
                    <h4>📍 Tu ubicación actual</h4>
                    <p><strong>Coordenadas:</strong><br>
                    Lat: ${position.coords.latitude.toFixed(6)}<br>
                    Lng: ${position.coords.longitude.toFixed(6)}</p>
                    <p><strong>Precisión:</strong> ${position.coords.accuracy}m</p>
                </div>
            `).openPopup();
            
            console.log('✅ Ubicación obtenida:', userLocation);
        },
        function(error) {
            console.log('⚠️ Error obteniendo ubicación:', error.message);
            
            let errorMsg = 'No se pudo obtener la ubicación. ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg += 'Permisos denegados.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg += 'Ubicación no disponible.';
                    break;
                case error.TIMEOUT:
                    errorMsg += 'Tiempo de espera agotado.';
                    break;
                default:
                    errorMsg += 'Error desconocido.';
                    break;
            }
            
            showNotification(errorMsg, 'warning');
        },
        CONFIG.geoOptions
    );
}

// Manejar envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    try {
        const formData = getFormData();
        if (!validateFormData(formData)) return;
        
        const newRequest = createRequest(formData);
        
        requests.push(newRequest);
        addRequestToMap(newRequest);
        updateRequestsList();
        saveToStorage();
        
        // Limpiar formulario
        document.getElementById('requestForm').reset();
        
        // Mostrar confirmación
        showNotification(`✅ Solicitud creada exitosamente\nCódigo: ${formData.code}`, 'success');
        
        console.log('✅ Nueva solicitud creada:', newRequest);
    } catch (error) {
        console.error('❌ Error creando solicitud:', error);
        showNotification('Error al crear la solicitud', 'error');
    }
}

// Obtener datos del formulario
function getFormData() {
    return {
        type: document.getElementById('requestType').value,
        code: document.getElementById('requestCode').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };
}

// Validar datos del formulario
function validateFormData(data) {
    if (!data.type || !data.code || !data.description) {
        showNotification('Por favor completa todos los campos requeridos', 'warning');
        return false;
    }
    
    if (data.code.length < 4) {
        showNotification('El código debe tener al menos 4 caracteres', 'warning');
        return false;
    }
    
    return true;
}

// Crear nueva solicitud
function createRequest(formData) {
    return {
        id: requestCounter++,
        type: formData.type,
        code: formData.code,
        location: formData.location || 'Ubicación actual',
        description: formData.description,
        timestamp: new Date().toLocaleString('es-CO'),
        coordinates: userLocation ? [...userLocation] : null,
        status: 'active',
        created: Date.now()
    };
}

// Agregar solicitud al mapa
function addRequestToMap(request) {
    if (!request.coordinates) {
        console.warn('⚠️ Solicitud sin coordenadas:', request.id);
        return;
    }
    
    try {
        const icon = createIconByType(request.type);
        
        const marker = L.marker(request.coordinates, { icon })
            .addTo(map)
            .bindPopup(createPopupContent(request));
        
        request.marker = marker;
        
        console.log('✅ Marcador agregado al mapa:', request.id);
    } catch (error) {
        console.error('❌ Error agregando marcador:', error);
    }
}

// Crear icono personalizado
function createCustomIcon(emoji, color) {
    return L.divIcon({
        html: `<div style="
            background: ${color}; 
            color: white; 
            padding: 8px; 
            border-radius: 50%; 
            text-align: center; 
            font-size: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            border: 2px solid white;
        ">${emoji}</div>`,
        iconSize: [35, 35],
        className: 'custom-div-icon'
    });
}

// Crear icono por tipo de solicitud
function createIconByType(type) {
    const iconConfig = {
        urgent: { emoji: '🚨', color: '#ff6b6b' },
        normal: { emoji: '📍', color: '#4ecdc4' },
        low: { emoji: '📋', color: '#feca57' }
    };
    
    const config = iconConfig[type] || iconConfig.normal;
    return createCustomIcon(config.emoji, config.color);
}

// Crear contenido del popup
function createPopupContent(request) {
    return `
        <div class="popup-content">
            <h4>🔒 Solicitud Privada #${request.id}</h4>
            <p><strong>Tipo:</strong> ${getTypeLabel(request.type)}</p>
            <p><strong>Código:</strong> ****${request.code.slice(-4)}</p>
            <p><strong>Ubicación:</strong> ${request.location}</p>
            <p><strong>Creado:</strong> ${request.timestamp}</p>
            <button class="popup-button" onclick="viewRequestDetails(${request.id})">
                🔍 Ver Detalles
            </button>
        </div>
    `;
}

// Obtener etiqueta del tipo
function getTypeLabel(type) {
    const labels = {
        urgent: '🚨 Urgente',
        normal: '📍 Normal',
        low: '📋 Baja Prioridad'
    };
    return labels[type] || '📍 Normal';
}

// Actualizar lista de solicitudes
function updateRequestsList() {
    const requestsList = document.getElementById('requestsList');
    const activeRequests = requests.filter(r => r.status === 'active');
    
    let html = '<h3 style="margin-bottom: 15px; color: #64b5f6;">📋 Solicitudes Activas</h3>';
    
    if (activeRequests.length === 0) {
        html += '<p style="color: rgba(255,255,255,0.6);">No hay solicitudes activas</p>';
    } else {
        activeRequests.forEach(request => {
            html += createRequestItemHTML(request);
        });
    }
    
    requestsList.innerHTML = html;
}

// Crear HTML para item de solicitud
function createRequestItemHTML(request) {
    return `
        <div class="request-item" onclick="focusOnRequest(${request.id})">
            <div class="request-header">
                <span class="request-type type-${request.type}">
                    ${getTypeLabel(request.type)}
                </span>
                <button class="delete-btn" onclick="event.stopPropagation(); removeRequest(${request.id})">
                    ✕
                </button>
            </div>
            <div class="request-info">
                <p><strong>Código:</strong> ****${request.code.slice(-4)}</p>
                <p><strong>Ubicación:</strong> ${request.location}</p>
                <p><strong>Creado:</strong> ${request.timestamp}</p>
            </div>
        </div>
    `;
}

// Enfocar en solicitud
function focusOnRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request && request.coordinates && request.marker) {
        map.setView(request.coordinates, CONFIG.focusZoom);
        request.marker.openPopup();
        
        // Efecto visual
        request.marker.getElement().style.animation = 'pulse 1s ease-in-out 3';
    }
}

// Ver detalles de solicitud
function viewRequestDetails(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (!request) {
        showNotification('Solicitud no encontrada', 'error');
        return;
    }
    
    const code = prompt('🔐 Ingresa el código de acceso para ver los detalles:');
    if (code === request.code) {
        const details = `
🔒 SOLICITUD CONFIDENCIAL

ID: #${request.id}
Tipo: ${getTypeLabel(request.type)}
Código: ${request.code}
Ubicación: ${request.location}
Coordenadas: ${request.coordinates ? `${request.coordinates[0].toFixed(6)}, ${request.coordinates[1].toFixed(6)}` : 'No disponible'}

Descripción:
${request.description}

Creado: ${request.timestamp}
        `.trim();
        
        alert(details);
    } else if (code !== null) {
        showNotification('❌ Código incorrecto', 'error');
    }
}

// Eliminar solicitud
function removeRequest(requestId) {
    if (!confirm('¿Estás seguro de eliminar esta solicitud privada?')) return;
    
    try {
        const requestIndex = requests.findIndex(r => r.id === requestId);
        if (requestIndex === -1) {
            showNotification('Solicitud no encontrada', 'error');
            return;
        }
        
        const request = requests[requestIndex];
        
        // Remover marcador del mapa
        if (request.marker) {
            map.removeLayer(request.marker);
        }
        
        // Remover de la lista
        requests.splice(requestIndex, 1);
        
        updateRequestsList();
        saveToStorage();
        
        showNotification('✅ Solicitud eliminada', 'success');
        
        console.log('✅ Solicitud eliminada:', requestId);
    } catch (error) {
        console.error('❌ Error eliminando solicitud:', error);
        showNotification('Error al eliminar la solicitud', 'error');
    }
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        max-width: 400px;
        text-align: center;
    `;
    
    // Colores por tipo
    const colors = {
        success: 'linear-gradient(45deg, #4caf50, #45a049)',
        error: 'linear-gradient(45deg, #f44336, #d32f2f)',
        warning: 'linear-gradient(45deg, #ff9800, #f57c00)',
        info: 'linear-gradient(45deg, #2196f3, #1976d2)'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Guardar en almacenamiento local
function saveToStorage() {
    try {
        const dataToSave = requests.map(req => ({
            ...req,
            marker: null // No guardar el objeto marker
        }));
        localStorage.setItem('privateGpsRequests', JSON.stringify(dataToSave));
    } catch (error) {
        console.warn('⚠️ No se pudo guardar en localStorage:', error);
    }
}

// Cargar solicitudes guardadas
function loadStoredRequests() {
    try {
        const stored = localStorage.getItem('privateGpsRequests');
        if (stored) {
            const parsedRequests = JSON.parse(stored);
            requests = parsedRequests;
            
            // Recrear marcadores en el mapa
            requests.forEach(request => {
                if (request.coordinates) {
                    addRequestToMap(request);
                }
            });
            
            updateRequestsList();
            console.log('✅ Solicitudes cargadas desde localStorage');
        }
    } catch (error) {
        console.warn('⚠️ Error cargando desde localStorage:', error);
    }
}

// Función global para el botón "Usar Mi Ubicación"
window.getCurrentLocation = getCurrentLocation;

// Funciones globales para interacción desde HTML
window.viewRequestDetails = viewRequestDetails;
window.focusOnRequest = focusOnRequest;
window.removeRequest = removeRequest;