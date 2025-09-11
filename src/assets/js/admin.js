// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    loadModals();
    setupEventListeners();
    animateStats();
});

// Initialize admin panel
function initializeAdmin() {
    console.log('Zero Waste Admin Panel Initialized');
    
    // Check authentication (placeholder)
    if (!isAuthenticated()) {
        redirectToLogin();
    }
    
    // Load user info
    loadAdminInfo();
}

// Check if user is authenticated
function isAuthenticated() {
    // This would check for valid session/token
    // For demo purposes, return true
    return true;
}

// Redirect to login if not authenticated
function redirectToLogin() {
    window.location.href = './controller/login.html';
}

// Load admin information
function loadAdminInfo() {
    const adminInfo = {
        name: 'Administrador',
        role: 'Sistema de Gestión',
        avatar: 'AD'
    };
    
    // Update UI with admin info
    const avatarElement = document.querySelector('.admin-avatar');
    if (avatarElement) {
        avatarElement.textContent = adminInfo.avatar;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Admin cards click handlers
    const adminCards = document.querySelectorAll('.admin-card');
    adminCards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
        // Clear session data
        clearSession();
        
        // Show loading state
        showLoadingState();
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = './controller/login.html';
        }, 1000);
    }
}

// Clear session data
function clearSession() {
    // Clear any stored session data
    // localStorage.removeItem('adminSession'); // Can't use localStorage in Claude
    console.log('Session cleared');
}

// Show loading state
function showLoadingState() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cerrando...';
        logoutBtn.disabled = true;
    }
}

// Handle card clicks
function handleCardClick(e) {
    const card = e.currentTarget;
    const modalId = card.getAttribute('data-modal');
    
    // Add click animation
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    // Open corresponding modal
    if (modalId) {
        openModal(modalId);
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Alt + 1-5 for quick navigation to each section
    if (e.altKey) {
        switch (e.key) {
            case '1':
                openModal('usersModal');
                break;
            case '2':
                openModal('locationsModal');
                break;
            case '3':
                openModal('reportsModal');
                break;
            case '4':
                openModal('settingsModal');
                break;
            case '5':
                openModal('statsModal');
                break;
        }
    }}