// Gestión de camiones en el mapa

let trucks = {}; // Almacena los marcadores de camiones en el mapa

/**
 * Cargar todos los camiones en el mapa
 */
function loadTrucks() {
    trucksData.forEach(truck => {
        addTruckToMap(truck);
    });
}

/**
 * Agregar un camión al mapa
 * @param {object} truck - Datos del camión
 */
function addTruckToMap(truck) {
    const color = getStatusColor(truck.status);
    const icon = createTruckIcon(color);
    
    // Crear marcador
    const marker = L.marker([truck.lat, truck.lng], { icon: icon })
        .addTo(map)
        .bindPopup(createPopupContent(truck));
    
    // Guardar referencia
    trucks[truck.id] = {
        marker: marker,
        data: truck
    };
    
    // Evento click en marcador
    marker.on('click', () => selectTruck(truck.id));
    
    // Evento para abrir popup
    marker.on('popupopen', () => {
        console.log(`Popup abierto para camión ${truck.id}`);
    });
}

/**
 * Actualizar camión en el mapa
 * @param {string} truckId - ID del camión
 * @param {object} truckData - Nuevos datos del camión
 */
function updateTruckOnMap(truckId, truckData) {
    const truck = trucks[truckId];
    
    if (truck) {
        // Actualizar posición
        truck.marker.setLatLng([truckData.lat, truckData.lng]);
        
        // Actualizar popup
        truck.marker.setPopupContent(createPopupContent(truckData));
        
        // Actualizar icono si cambió el estado
        if (truck.data.status !== truckData.status) {
            const newColor = getStatusColor(truckData.status);
            const newIcon = createTruckIcon(newColor);
            truck.marker.setIcon(newIcon);
        }
        
        // Actualizar datos locales
        truck.data = { ...truckData };
    }
}

/**
 * Seleccionar camión específico
 * @param {string} truckId - ID del camión a seleccionar
 */
function selectTruck(truckId) {
    selectedTruck = truckId;
    const truck = trucks[truckId];
    
    if (truck) {
        // Centrar mapa en el camión
        map.setView([truck.data.lat, truck.data.lng], 16);
        
        // Abrir popup
        truck.marker.openPopup();
        
        // Agregar efecto visual
        const element = truck.marker.getElement();
        if (element) {
            element.classList.add('pulse');
            setTimeout(() => {
                element.classList.remove('pulse');
            }, 3000);
        }
        
        // Actualizar lista visual
        updateTruckList();
        
        // Notificación
        showNotification(`Camión ${truckId} seleccionado`);
        
        console.log(`Camión seleccionado: ${truckId}`, truck.data);
    }
}

/**
 * Actualizar lista de camiones en el panel
 */
function updateTruckList() {
    const listEl = document.getElementById('truck-list');
    
    if (!listEl) {
        console.error('Elemento truck-list no encontrado');
        return;
    }
    
    listEl.innerHTML = '';
    
    // Ordenar camiones por estado (activos primero)
    const sortedTrucks = [...trucksData].sort((a, b) => {
        const statusOrder = { 'active': 0, 'break': 1, 'maintenance': 2 };
        return statusOrder[a.status] - statusOrder[b.status];
    });
    
    sortedTrucks.forEach(truck => {
        const truckElement = createTruckListItem(truck);
        listEl.appendChild(truckElement);
    });
}

/**
 * Crear elemento de lista para un camión
 * @param {object} truck - Datos del camión
 * @returns {HTMLElement} Elemento DOM del camión
 */
function createTruckListItem(truck) {
    const statusText = STATUS_TEXT[truck.status]?.es || 'Desconocido';
    const statusClass = `status-${truck.status}`;
    const isSelected = selectedTruck === truck.id;
    
    const div = document.createElement('div');
    div.className = `truck-item ${isSelected ? 'active' : ''}`;
    div.onclick = () => selectTruck(truck.id);
    
    // Agregar data attribute para filtrado
    div.setAttribute('data-status', truck.status);
    div.setAttribute('data-truck-id', truck.id);
    
    div.innerHTML = `
        <div class="truck-header">
            <div class="truck-id">🚛 ${truck.id}</div>
            <div class="truck-status ${statusClass}">
                ${statusText}
            </div>
        </div>
        <div class="truck-info">
            <strong>Zona:</strong> ${truck.zone}<br>
            <strong>Conductor:</strong> ${truck.driver}<br>
            <strong>Próxima:</strong> ${truck.nextStop}<br>
           
        </div>
        <div class="eta">
            ⏱️ Llegada estimada: ${truck.eta}
        </div>
    `;
    
    return div;
}

/**
 * Actualizar posiciones de camiones (simulación de movimiento)
 */
function updateTruckPositions() {
    trucksData.forEach(truck => {
        if (truck.status === 'active') {
            // Simular movimiento realista
            const movement = simulateMovement(truck);
            
            // Actualizar coordenadas
            truck.lat += movement.latDelta;
            truck.lng += movement.lngDelta;
            
            // Asegurar que no salgan de Bogotá
            truck.lat = Math.max(4.4, Math.min(4.8, truck.lat));
            truck.lng = Math.max(-74.3, Math.min(-73.9, truck.lng));
            
          
            
            
            // Actualizar en el mapa
            updateTruckOnMap(truck.id, truck);
        }
    });
    
    // Actualizar lista
    updateTruckList();
    
    console.log('🔄 Posiciones de camiones actualizadas');
}

/**
 * Simular movimiento realista de un camión
 * @param {object} truck - Datos del camión
 * @returns {object} Deltas de movimiento
 */
function simulateMovement(truck) {
    
    // Agregar algo de aleatoriedad para simular calles
    const randomFactor = 0.0001;
    const latDelta = (Math.random() - 0.5) * randomFactor * speedFactor * timeInterval;
    const lngDelta = (Math.random() - 0.5) * randomFactor * speedFactor * timeInterval;
    
    return { latDelta, lngDelta };
}


 
 

function calculateETA(speed) {
    if (speed === 0) return '∞';
    
    // Simular distancia promedio restante (entre 1-5 km)
    const remainingDistance = Math.random() * 4 + 1;
    const timeInHours = remainingDistance / speed;
    const timeInMinutes = Math.round(timeInHours * 60);
    
    return formatETA(timeInMinutes);
}

/**
 * Filtrar camiones por estado
 * @param {string} status - Estado a filtrar ('all', 'active', 'break', 'maintenance')
 */
function filterTrucksByStatus(status) {
    const truckItems = document.querySelectorAll('.truck-item');
    
    truckItems.forEach(item => {
        const truckStatus = item.getAttribute('data-status');
        
        if (status === 'all' || truckStatus === status) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    console.log(`Filtro aplicado: ${status}`);
}

/**
 * Buscar camión por ID o conductor
 * @param {string} query - Término de búsqueda
 */
function searchTrucks(query) {
    const searchTerm = query.toLowerCase();
    const truckItems = document.querySelectorAll('.truck-item');
    
    truckItems.forEach(item => {
        const truckId = item.getAttribute('data-truck-id');
        const truck = trucksData.find(t => t.id === truckId);
        
        if (truck) {
            const matches = 
                truck.id.toLowerCase().includes(searchTerm) ||
                truck.driver.toLowerCase().includes(searchTerm) ||
                truck.zone.toLowerCase().includes(searchTerm);
                
            item.style.display = matches ? 'block' : 'none';
        }
    });
    
    console.log(`Búsqueda realizada: ${query}`);
}

/**
 * Obtener camión por ID
 * @param {string} truckId - ID del camión
 * @returns {object|null} Datos del camión o null
 */
function getTruckById(truckId) {
    return trucksData.find(truck => truck.id === truckId) || null;
}

/**
 * Remover camión del mapa
 * @param {string} truckId - ID del camión a remover
 */
function removeTruckFromMap(truckId) {
    const truck = trucks[truckId];
    
    if (truck) {
        map.removeLayer(truck.marker);
        delete trucks[truckId];
        
        // Remover de datos
        const index = trucksData.findIndex(t => t.id === truckId);
        if (index > -1) {
            trucksData.splice(index, 1);
        }
        
        updateTruckList();
        showNotification(`Camión ${truckId} removido`);
    }
}