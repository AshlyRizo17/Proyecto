/**
 Sistema de navegación entre páginas de mapas
 Utiliza sessionStorage para recordar la página de origen
 */

// Función para ir al mapa de recolección
function redirectToPublicMap() {
    // Guarda la URL actual para poder volver
    sessionStorage.setItem('returnUrl', window.location.href);
    
    // Navega al mapa de recolección
    window.location.href = "./mapa_principal.html";
}

// Función para ir al mapa privado
function redirectToPrivateMap() {
    // Guarda la URL actual para poder volver
    sessionStorage.setItem('returnUrl', window.location.href);
    
    // Navega al mapa privado
    window.location.href = "./mapa_privado.html";
}

// Función para volver al selector
function volverAlSelector() {
    // Obtiene la URL guardada
    const returnUrl = sessionStorage.getItem('returnUrl');
    
    if (returnUrl) {
        // Vuelve a la página de origen
        window.location.href = returnUrl;
    } else {
        // URL por defecto si no hay referencia guardada
        window.location.href = "./index.html";
    }
}

// Efecto visual opcional para el selector
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    
    // Solo ejecuta si existe el contenedor (página selector)
    if (container) {
        container.addEventListener('mousemove', function(e) {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / container.offsetWidth) * 100;
            const y = ((e.clientY - rect.top) / container.offsetHeight) * 100;
            
            container.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)`;
        });
        
        container.addEventListener('mouseleave', function() {
            container.style.background = 'rgba(255, 255, 255, 0.95)';
        });
    }
});