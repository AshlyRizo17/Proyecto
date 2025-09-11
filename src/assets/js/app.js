// Aplicación principal RecoMap

// Variables globales
let selectedTruck = null;
let autoUpdate = true;
let updateInterval = null;

/**
 * Inicializar la aplicación
 */
function initApp() {
    console.log('🚛 Iniciando RecoMap...');
    
    // Verificar compatibilidad del navegador
    const browserInfo = getBrowserInfo();
    if (!browserInfo.hasGeolocation) {
        showNotification('Tu navegador no soporta geolocalización', 'warning');
    }
    
    // Inicializar componentes
    initMap();
    loadTrucks();
    updateTruckList();
    
    // Configurar auto-actualización
    if (autoUpdate) {
        startAutoUpdate();
    }
    
    // Configurar eventos
    setupEventListeners();
    
    // Notificación de inicio
    showNotification('Sistema iniciado - Rastreando camiones en tiempo real');
}

/**
 * Configurar event listeners
 */
function setupEventListeners() {
    // Event listener para cambios de visibilidad de la página
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoUpdate();
        } else {
            if (autoUpdate) {
                startAutoUpdate();
            }
        }
    });
    
    // Event listener para errores de conexión
    window.addEventListener('offline', function() {
        showNotification('Sin conexión a internet', 'error');
        stopAutoUpdate();
    });
    
    window.addEventListener('online', function() {
        showNotification('Conexión restaurada', 'success');
        if (autoUpdate) {
            startAutoUpdate();
        }
    });
}

/**
 * Iniciar auto-actualización
 */
function startAutoUpdate() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    
    updateInterval = setInterval(() => {
        updateTruckPositions();
    }, 5000); // Actualizar cada 5 segundos
}

/**
 * Detener auto-actualización
 */
function stopAutoUpdate() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

/**
 * Toggle auto-actualización
 */
function toggleAutoUpdate() {
    autoUpdate = !autoUpdate;
    const statusEl = document.getElementById('auto-status');
    
    if (statusEl) {
        statusEl.textContent = autoUpdate ? 'ON' : 'OFF';
    }
    
    if (autoUpdate) {
        startAutoUpdate();
        showNotification('Auto-actualización activada');
    } else {
        stopAutoUpdate();
        showNotification('Auto-actualización desactivada');
    }
}

/**
 * Encontrar camión más cercano al usuario
 * @param {number} userLat - Latitud del usuario
 * @param {number} userLng - Longitud del usuario
 */
function findNearestTruck(userLat, userLng) {
    let nearestTruck = null;
    let minDistance = Infinity;
    
    // Buscar solo camiones activos
    const activeTrucks = trucksData.filter(truck => truck.status === 'active');
    
    activeTrucks.forEach(truck => {
        const distance = calculateDistance(userLat, userLng, truck.lat, truck.lng);
        if (distance < minDistance) {
            minDistance = distance;
            nearestTruck = truck;
        }
    });
    
    if (nearestTruck) {
        const distanceText = minDistance < 1 ? 
            `${Math.round(minDistance * 1000)}m` : 
            `${minDistance.toFixed(1)}km`;
            
        showNotification(`Camión más cercano: ${nearestTruck.id} (${distanceText}) - ETA: ${nearestTruck.eta}`);
        selectTruck(nearestTruck.id);
        
        return nearestTruck;
    } else {
        showNotification('No hay camiones activos cerca de tu ubicación', 'warning');
        return null;
    }
}

/**
 * Actualizar información de un camión específico
 * @param {string} truckId - ID del camión
 * @param {object} newData - Nuevos datos del camión
 */
function updateTruckInfo(truckId, newData) {
    const truckIndex = trucksData.findIndex(truck => truck.id === truckId);
    
    if (truckIndex !== -1) {
        // Actualizar datos
        Object.assign(trucksData[truckIndex], newData);
        
        // Actualizar en el mapa
        updateTruckOnMap(truckId, trucksData[truckIndex]);
        
        // Actualizar lista
        updateTruckList();
        
        console.log(`Camión ${truckId} actualizado:`, newData);
    }
}

/**
 * Simular llegada de nuevos datos de la API
 */
function simulateAPIUpdate() {
    // En un entorno real, esto sería una llamada a la API
    trucksData.forEach(truck => {
        if (truck.status === 'active') {
            // Simular cambios aleatorios pequeños
            const changes = {
                speed: Math.max(0, truck.speed + (Math.random() - 0.5) * 10),
                collected: Math.min(100, Math.max(0, truck.collected + (Math.random() - 0.5) * 5))
            };
            
            updateTruckInfo(truck.id, changes);
        }
    });
}

/**
 * Manejar errores de la aplicación
 * @param {Error} error - Error ocurrido
 * @param {string} context - Contexto donde ocurrió el error
 */
function handleError(error, context = 'Aplicación') {
    console.error(`Error en ${context}:`, error);
    showNotification(`Error: ${error.message}`, 'error');
    
    // Reportar error (en producción se enviaría a un servicio de logging)
    if (typeof reportError === 'function') {
        reportError(error, context);
    }
}

/**
 * Obtener estadísticas de los camiones
 * @returns {object} Estadísticas
 */
function getTruckStats() {
    const total = trucksData.length;
    const active = trucksData.filter(t => t.status === 'active').length;
    const onBreak = trucksData.filter(t => t.status === 'break').length;
    const maintenance = trucksData.filter(t => t.status === 'maintenance').length;
    
    const totalCollected = trucksData.reduce((sum, truck) => sum + truck.collected, 0);
    const avgCollected = total > 0 ? (totalCollected / total).toFixed(1) : 0;
    
    return {
        total,
        active,
        onBreak,
        maintenance,
        avgCollected: parseFloat(avgCollected)
    };
}

/**
 * Exportar datos para reportes
 * @returns {string} Datos en formato JSON
 */
function exportData() {
    const data = {
        timestamp: new Date().toISOString(),
        trucks: trucksData,
        stats: getTruckStats(),
        userLocation: userLocation ? {
            lat: userLocation.getLatLng().lat,
            lng: userLocation.getLatLng().lng
        } : null
    };
    
    return JSON.stringify(data, null, 2);
}

/**
 * Limpiar recursos antes de cerrar
 */
function cleanup() {
    stopAutoUpdate();
    if (map) {
        map.remove();
    }
    console.log('🧹 Recursos limpiados');
}

/**
 * Inicialización cuando se carga la página
 */
window.onload = function() {
    try {
        initApp();
    } catch (error) {
        handleError(error, 'Inicialización');
    }
};

/**
 * Limpieza cuando se cierra la página
 */
window.onbeforeunload = function() {
    cleanup();
};

// Event listeners para debugging (solo en desarrollo)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Funciones de debug disponibles en la consola
    window.recoMapDebug = {
        getTruckStats,
        exportData,
        trucksData,
        selectedTruck,
        map
    };
    
    console.log('🛠️ Modo debug activado. Usa window.recoMapDebug para debugging');
}