// Funciones relacionadas con el mapa Leaflet

let map;
let userLocation = null;

/**
 * Inicializar el mapa
 */
function initMap() {
    // Crear mapa centrado en Bogotá
    map = L.map('map').setView(MAP_CONFIG.center, MAP_CONFIG.zoom);
    
    // Agregar capa de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: MAP_CONFIG.maxZoom
    }).addTo(map);
    
    // Configurar eventos del mapa
    setupMapEvents();
}

/**
 * Configurar eventos del mapa
 */
function setupMapEvents() {
    map.on('click', function(e) {
        console.log('Click en:', e.latlng);
    });
    
    map.on('zoomend', function(e) {
        console.log('Zoom level:', map.getZoom());
    });
}

/**
 * Crear icono personalizado para camión
 * @param {string} color - Color del icono
 * @param {string} icon - Emoji del icono (opcional)
 * @returns {L.DivIcon} Icono de Leaflet
 */
function createTruckIcon(color, icon = '🚛') {
    return L.divIcon({
        className: 'truck-icon',
        html: `<div style="
            background: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        ">${icon}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

/**
 * Crear icono de ubicación del usuario
 * @returns {L.DivIcon} Icono de usuario
 */
function createUserIcon() {
    return L.divIcon({
        className: 'user-location',
        html: `<div style="
            background: ${STATUS_COLORS.user};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
}

/**
 * Crear contenido del popup para un camión
 * @param {object} truck - Datos del camión
 * @returns {string} HTML del popup
 */
function createPopupContent(truck) {
    const statusText = STATUS_TEXT[truck.status]?.popup || 'Desconocido';
    
    return `
        <div style="font-family: Arial; min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: #2E7D32;">🚛 ${truck.id}</h3>
            <p><strong>Conductor:</strong> ${truck.driver}</p>
            <p><strong>Zona:</strong> ${truck.zone}</p>
            <p><strong>Estado:</strong> ${statusText}</p>
            <p><strong>ETA:</strong> ${truck.eta}</p>
            <div style="margin-top: 10px; padding: 8px; background: #E8F5E8; border-radius: 5px;">
                <strong style="color: #2E7D32;">Estado de llegada a tu zona</strong>
            </div>
        </div>
    `;
}

/**
 * Encontrar ubicación del usuario
 */
// Encontrar ubicación del usuario
function findMyLocation() {
    if (!navigator.geolocation) {
        showNotification('Tu navegador no soporta geolocalización', 'error');
        return;
    }

    showNotification('Obteniendo tu ubicación...', 'info');

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            if (validateCoordinates(lat, lng)) {
                showNotification('Coordenadas obtenidas correctamente', 'success');
                return;
            } else {
                showNotification('Coordenadas inválidas', 'error');
                return;
            }
        }
    );
}