// Datos simulados de camiones (en producción vendrían de una API)
const trucksData = [
    {
        id: 'CAM-001',
        driver: 'Carlos Mendoza',
        zone: 'Zona Norte',
        status: 'active',
        lat: 4.6500,
        lng: -74.0900,
        speed: 25,
        nextStop: 'Calle 80 con Carrera 15',
        eta: '8 minutos',
        collected: 75
    },
    {
        id: 'CAM-002',
        driver: 'Ana Rodríguez',
        zone: 'Zona Centro',
        status: 'active',
        lat: 4.6097,
        lng: -74.0817,
        speed: 15,
        nextStop: 'Plaza Bolívar',
        eta: '12 minutos',
        collected: 60
    },
    {
        id: 'CAM-003',
        driver: 'Miguel Torres',
        zone: 'Zona Sur',
        status: 'break',
        lat: 4.5700,
        lng: -74.1200,
        speed: 0,
        nextStop: 'En descanso',
        eta: '25 minutos',
        collected: 45
    },
    {
        id: 'CAM-004',
        driver: 'Laura Gómez',
        zone: 'Zona Este',
        status: 'active',
        lat: 4.6300,
        lng: -74.0500,
        speed: 30,
        nextStop: 'Av. Caracas con Calle 63',
        eta: '5 minutos',
        collected: 90
    },
    {
        id: 'CAM-005',
        driver: 'Roberto Silva',
        zone: 'Zona Oeste',
        status: 'maintenance',
        lat: 4.6800,
        lng: -74.1100,
        speed: 0,
        nextStop: 'Taller mecánico',
        eta: '2 horas',
        collected: 20
    }
];

// Configuración del mapa
const MAP_CONFIG = {
    center: [4.6097, -74.0817], // Bogotá
    zoom: 12,
    maxZoom: 19
};

// Textos de estado
const STATUS_TEXT = {
    'active': {
        es: 'Activo',
        popup: 'Recolectando'
    },
    'break': {
        es: 'Descanso',
        popup: 'En descanso'
    },
    'maintenance': {
        es: 'Mantenimiento',
        popup: 'Mantenimiento'
    }
};

// Colores por estado
const STATUS_COLORS = {
    'active': '#4c90af',
    'break': '#126d58',
    'maintenance': '#f43636ff',
};