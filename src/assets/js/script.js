    document.addEventListener('DOMContentLoaded', function () {
      // Elements
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const navLinks = document.querySelector('.nav-links');
      const navLinksItems = document.querySelectorAll('.nav-links a');
      const header = document.querySelector('header');
      const body = document.body;

      // Control variables
      let isMenuOpen = false;
      let lastScrollTop = 0;

      // Toggle mobile menu
      function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
        mobileMenuBtn.classList.toggle('active');

        mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);

        // Prevent body scroll when menu is open
        body.style.overflow = isMenuOpen ? 'hidden' : '';

        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate([10]);
        }
      }

      // Close mobile menu
      function closeMobileMenu() {
        if (isMenuOpen) {
          toggleMobileMenu();
        }
      }
      
      
      // Update active link based on scroll position
      function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + header.offsetHeight + 100;

        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinksItems.forEach(item => item.classList.remove('active'));
            if (correspondingLink) {
              correspondingLink.classList.add('active');
            }
          }
        });
      }

      // Smooth scroll to section
      function smoothScrollToSection(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
          const headerHeight = header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }

      // Handle header scroll behavior
      function handleHeaderScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      }

      // Event Listeners
      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          toggleMobileMenu();
        });
      }

      // Navigation links click handler
      navLinksItems.forEach(link => {
        link.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          
          if (href && href.startsWith('#')) {
            e.preventDefault();
            
            // Close menu on mobile
            if (window.innerWidth <= 768) {
              closeMobileMenu();
            }

            // Smooth scroll
            smoothScrollToSection(href);
            
            // Update active link
            navLinksItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
          } else if (window.innerWidth <= 768) {
            closeMobileMenu();
          }
        });
      });

      // Click outside menu to close
      document.addEventListener('click', function (e) {
        if (isMenuOpen && !e.target.closest('.navbar')) {
          closeMobileMenu();
        }
      });

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) {
          closeMobileMenu();
        }
      });

      // Window resize handler
      window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && isMenuOpen) {
          closeMobileMenu();
        }
      });

      // Scroll handler with throttling
      let scrollTimeout;
      window.addEventListener('scroll', function () {
        if (!scrollTimeout) {
          scrollTimeout = setTimeout(function () {
            handleHeaderScroll();
            updateActiveLink();
            scrollTimeout = null;
          }, 10);
        }
      });

      // Initialize
      function initialize() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.setAttribute('aria-controls', 'navigation-menu');
        }

        updateActiveLink();
        console.log('✅ Zero Waste menu initialized');
      }

      initialize();
    });


    /***  Login ***/

    // Función para hashear la contraseña
    async function hashPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }

    // Registro
    document.getElementById("registerFormElement").addEventListener("submit", async function(event) {
      event.preventDefault();

      const passwordField = document.getElementById("registerPassword");
      const plainPassword = passwordField.value;

      const hashedPassword = await hashPassword(plainPassword);
      const email = document.getElementById("registerEmail").value;

      fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: hashedPassword })
      })
      .then(res => res.json())
      .then(data => console.log("Respuesta del servidor:", data))
      .catch(err => console.error(err));
    });

    // Validación login
    document.getElementById("loginFormElement").addEventListener("submit", async function(event) {
      event.preventDefault();

      let valid = true;
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!emailRegex.test(email)) {
        document.getElementById("emailError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("emailError").style.display = "none";
      }

      if (!passwordRegex.test(password)) {
        document.getElementById("passwordError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("passwordError").style.display = "none";
      }

      if (!valid) return;

      const loginBtn = document.getElementById("loginBtn");
      const originalText = loginBtn.innerHTML;

      loginBtn.innerHTML = '<span class="loading"></span> Iniciando...';
      loginBtn.disabled = true;

      const result = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ username: email, password })
      });

      loginBtn.innerHTML = originalText;
      loginBtn.disabled = false;

      if (result.success) {
        currentUser = result.data.user;
        accessToken = result.data.accessToken;
        refreshToken = result.data.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);

        showMessage('loginMessage', '¡Login exitoso!', 'success');

        document.getElementById('userName').textContent = currentUser.username;
        document.getElementById('userId').textContent = currentUser.id;
        document.getElementById('sessionTime').textContent = new Date().toLocaleString();

        setupTokenRefresh();

        setTimeout(() => {
          showDashboard();
          loadSessionHistory();
        }, 1000);
      } else {
        let errorMessage = result.data?.error || 'Error de login';
        if (result.status === 423) errorMessage = 'Cuenta bloqueada temporalmente';
        if (result.status === 429) errorMessage = 'Demasiados intentos. Espera 15 minutos.';

        showMessage('loginMessage', errorMessage, 'error');
      }
    });

    // Variables globales
    const API_BASE_URL = 'http://localhost:3000';
    let currentUser = null;
    let accessToken = null;
    let refreshToken = null;
    let tokenRefreshInterval = null;

    function showMessage(elementId, message, type = 'success') {
      const element = document.getElementById(elementId);
      element.innerHTML = `<div class="${type}-message">${message}</div>`;
      setTimeout(() => { element.innerHTML = ''; }, 5000);
    }

    async function apiRequest(endpoint, options = {}) {
      const url = `${API_BASE_URL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      };

      if (accessToken && !options.skipAuth) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (response.status === 401 && data.expired && refreshToken) {
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            const retryResponse = await fetch(url, config);
            return { success: retryResponse.ok, data: await retryResponse.json(), status: retryResponse.status };
          }
        }

        return { success: response.ok, data, status: response.status };
      } catch (error) {
        console.error('Error en API:', error);
        return { success: false, error: 'Error de conexión' };
      }
    }

    async function refreshAccessToken() {
      if (!refreshToken) return false;
      const result = await apiRequest('/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        skipAuth: true
      });

      if (result.success) {
        accessToken = result.data.accessToken;
        refreshToken = result.data.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
        return true;
      } else {
        logout();
        return false;
      }
    }

    function setupTokenRefresh() {
      tokenRefreshInterval = setInterval(async () => {
        if (accessToken && refreshToken) {
          await refreshAccessToken();
        }
      }, 10 * 60 * 1000);
    }

    function showLogin() {
      document.getElementById('loginForm').classList.remove('hidden');
      document.getElementById('registerForm').classList.add('hidden');
      document.getElementById('dashboard').classList.add('hidden');
    }

    function showRegister() {
      document.getElementById('loginForm').classList.add('hidden');
      document.getElementById('registerForm').classList.remove('hidden');
      document.getElementById('dashboard').classList.add('hidden');
    }

    function showDashboard() {
      document.getElementById('loginForm').classList.add('hidden');
      document.getElementById('registerForm').classList.add('hidden');
      document.getElementById('dashboard').classList.remove('hidden');
    }

    async function loadSessionHistory() {
      const result = await apiRequest('/session-history');
      const historyDiv = document.getElementById('sessionHistoryList');

      if (result.success && result.data.sessionHistory) {
        const sessions = result.data.sessionHistory;
        historyDiv.innerHTML = sessions.length
          ? sessions.map(session => `
            <div class="session-item">
              <strong>IP:</strong> ${session.ip} | 
              <strong>Fecha:</strong> ${new Date(session.timestamp).toLocaleString()} |
              <strong>Dispositivo:</strong> ${session.userAgent.substring(0, 50)}...
            </div>`).join('')
          : '<p>No hay historial disponible</p>';
      } else {
        historyDiv.innerHTML = '<p>Error cargando historial</p>';
      }
    }

    async function logout() {
      if (refreshToken) {
        await apiRequest('/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken })
        });
      }

      currentUser = null;
      accessToken = null;
      refreshToken = null;
      localStorage.removeItem('refreshToken');
      if (tokenRefreshInterval) clearInterval(tokenRefreshInterval);

      document.getElementById('loginFormElement').reset();
      showLogin();
      showMessage('loginMessage', 'Sesión cerrada exitosamente', 'success');
    }

    async function logoutAll() {
      const result = await apiRequest('/logout-all', {
        method: 'POST'
      });

      if (result.success) {
        showMessage('loginMessage', 'Sesiones cerradas en todos los dispositivos', 'success');
        logout();
      }
    }

    window.addEventListener('load', async function() {
      const savedRefreshToken = localStorage.getItem('refreshToken');
      if (savedRefreshToken) {
        refreshToken = savedRefreshToken;
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const userResult = await apiRequest('/profile');
          if (userResult.success) {
            currentUser = userResult.data.user;
            document.getElementById('userName').textContent = currentUser.username;
            document.getElementById('userId').textContent = currentUser.id;
            document.getElementById('sessionTime').textContent = 'Sesión restaurada';
            setupTokenRefresh();
            showDashboard();
            loadSessionHistory();
          }
        }
      }
    });

    console.log('--- Sistema de Login Seguro ---');
    console.log('✓ Bloqueo tras múltiples intentos fallidos');
    console.log('✓ Tokens JWT con expiración automática');
    console.log('✓ Renovación automática de tokens');
    console.log('✓ Historial de sesiones con IP y dispositivo');
    console.log('✓ Cierre de sesión seguro');
