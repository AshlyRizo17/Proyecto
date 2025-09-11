// Utilidades y funciones auxiliares

/**
 * Calcular distancia entre dos puntos geográficos
 * @param {number} lat1 - Latitud del primer punto
 * @param {number} lng1 - Longitud del primer punto
 * @param {number} lat2 - Latitud del segundo punto
 * @param {number} lng2 - Longitud del segundo punto

 */
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
             Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

/**
 * Mostrar notificación
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success', 'error', 'warning')
 */
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notification-text');
    
    if (!notification || !text) return;
    
    text.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/**
 * Obtener color según estado del camión
 * @param {string} status - Estado del camión
 * @returns {string} Color hexadecimal
 */
function getStatusColor(status) {
    return STATUS_COLORS[status] || '#9E9E9E';
}

/**
 * Formatear tiempo estimado de llegada
 * @param {number} minutes - Minutos hasta la llegada
 * @returns {string} Tiempo formateado
 */
function formatETA(minutes) {
    if (minutes < 60) {
        return `${minutes} minutos`;
    } else {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    }
}

/**
 * Validar coordenadas geográficas
 * @param {number} lat - Latitud
 * @param {number} lng - Longitud
 * @returns {boolean} True si son válidas
 */
function validateCoordinates(lat, lng) {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Debounce function para evitar múltiples llamadas
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función debounced
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Generar ID único
 * @returns {string} ID único
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Obtener información del navegador
 * @returns {object} Información del navegador y capacidades
 */
function getBrowserInfo() {
    return {
        hasGeolocation: 'geolocation' in navigator,
        hasLocalStorage: typeof(Storage) !== "undefined",
        userAgent: navigator.userAgent,
        language: navigator.language
    };
}