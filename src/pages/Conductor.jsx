import React from "react";
import "../styles/admin.css"; // Importa tus estilos CSS

export default function Conductor() {
  return (
    <>
      {/* Header */}
      <header>
        <div className="container">
          <nav className="navbar">
            {/* Logo */}
            <a href="./index.html" className="logo">
              <img src="../img/logo.png" alt="Logo" className="logo" />
            </a>

            {/* Botón hamburguesa */}
            <button
              className="mobile-menu-btn"
              aria-label="Abrir menú de navegación"
              aria-expanded="false"
              aria-controls="navigation-menu"
              type="button"
              id="hamburger"
            >
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </button>

            {/* Menú */}
            <ul className="nav-links" id="navigation-menu" role="menu">
              <li><a href="#inicio" className="active">Inicio</a></li>
              <li><a href="#como-funciona">Cómo Funciona</a></li>
              <li><a href="#beneficios">Beneficios</a></li>
              <li><a href="#app">La App</a></li>
              <li><a href="#testimonios">Testimonios</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="/ventana-conductor" className="auth-link">CONDUCTOR</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Transformando Bogotá, un residuo a la vez</h1>
            <p>
              Un proyecto innovador para gestionar residuos en sectores
              vulnerables, usando tecnología y comunidad para crear una ciudad más
              limpia y sostenible.
            </p>
            <div className="hero-btns">
              <a href="#app" className="btn">Descargar la App</a>
              <a href="#como-funciona" className="btn btn-outline">Ver cómo funciona</a>
            </div>

            <div className="stats">
              <div className="stat-item">
                <div className="stat-icon"><i className="fas fa-users"></i></div>
                <div className="stat-text">
                  <div className="stat-number">25,000+</div>
                  <div>Ciudadanos beneficiados</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon"><i className="fas fa-trash-alt"></i></div>
                <div className="stat-text">
                  <div className="stat-number">70%</div>
                  <div>Menos residuos en calles</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon"><i className="fas fa-tree"></i></div>
                <div className="stat-text">
                  <div className="stat-number">45%</div>
                  <div>Más material reciclado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>¿Cómo funciona Zero Waste?</h2>
            <p>
              Un sistema integrado que combina infraestructura, tecnología y
              comunidad para transformar la gestión de residuos
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-icon"><i className="fas fa-trash-alt"></i></div>
              <h3>Puntos Ecológicos</h3>
              <p>Instalación de contenedores especializados...</p>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <div className="step-icon"><i className="fas fa-map-marked-alt"></i></div>
              <h3>Mapa Interactivo</h3>
              <p>Visualización en tiempo real...</p>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <div className="step-icon"><i className="fas fa-bell"></i></div>
              <h3>Alertas Inteligentes</h3>
              <p>Notificaciones personalizadas...</p>
            </div>

            <div className="step">
              <div className="step-number">04</div>
              <div className="step-icon"><i className="fas fa-mobile-alt"></i></div>
              <h3>App Zero Waste</h3>
              <p>Aplicación móvil para gestionar...</p>
            </div>

            <div className="step">
              <div className="step-number">05</div>
              <div className="step-icon"><i className="fas fa-graduation-cap"></i></div>
              <h3>Educación Ambiental</h3>
              <p>Programas comunitarios y guías...</p>
            </div>

            <div className="step">
              <div className="step-number">06</div>
              <div className="step-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Monitoreo y Reportes</h3>
              <p>Sistema de seguimiento con métricas...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="benefits">
        <div className="container">
          <div className="section-title">
            <h2>Beneficios Transformadores</h2>
            <p>Impacto positivo en comunidades y medio ambiente...</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-leaf"></i>
              <h3>Reducción de Contaminación</h3>
              <p>Disminución significativa...</p>
            </div>

            <div className="benefit-card">
              <i className="fas fa-users"></i>
              <h3>Inclusión Comunitaria</h3>
              <p>Participación activa de ciudadanos...</p>
            </div>

            <div className="benefit-card">
              <i className="fas fa-chart-pie"></i>
              <h3>Eficiencia Operativa</h3>
              <p>Optimización de rutas con IA...</p>
            </div>

            <div className="benefit-card">
              <i className="fas fa-seedling"></i>
              <h3>Cultura Ambiental</h3>
              <p>Promoción de hábitos sostenibles...</p>
            </div>

            <div className="benefit-card">
              <i className="fas fa-wallet"></i>
              <h3>Ahorro Económico</h3>
              <p>Reducción de costos de limpieza pública...</p>
            </div>

            <div className="benefit-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Seguridad Sanitaria</h3>
              <p>Menor proliferación de enfermedades...</p>
            </div>
          </div>
        </div>
      </section>

      {/* App */}
      <section id="app" className="app-preview">
        <div className="container">
          <div className="app-container">
            <div className="app-image">
              <img src="./assets/img/logo.png" alt="Zero Waste App" width="300" height="400" />
            </div>
            <div className="app-content">
              <h2>La App Zero Waste</h2>
              <p>Tu compañera para construir una Bogotá más limpia...</p>

              <div className="app-features">
                <div className="feature">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="feature-content">
                    <h4>Mapa Interactivo</h4>
                    <p>Visualiza rutas en tiempo real...</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-bell"></i>
                  <div className="feature-content">
                    <h4>Alertas Personalizadas</h4>
                    <p>Recibe notificaciones...</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-book"></i>
                  <div className="feature-content">
                    <h4>Guías Educativas</h4>
                    <p>Aprende a separar residuos...</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-calendar-check"></i>
                  <div className="feature-content">
                    <h4>Solicitud de Recolección</h4>
                    <p>Solicita recolección especial...</p>
                  </div>
                </div>
              </div>

              <div className="app-stores">
                <a href="https://play.google.com/store/" className="app-btn">
                  <i className="fab fa-google-play"></i>
                  <div className="app-btn-text">
                    <span>Descarga en</span>
                    <span>Google Play</span>
                  </div>
                </a>
                <a href="https://www.apple.com/co/app-store/" className="app-btn">
                  <i className="fab fa-apple"></i>
                  <div className="app-btn-text">
                    <span>Disponible en</span>
                    <span>App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>Lo que dicen nuestras comunidades</h2>
            <p>Historias reales de transformación...</p>
          </div>

          <div className="testimonials-container">
            <div className="testimonial">
              <div className="testimonial-text">
                "Gracias a Zero Waste, nuestro barrio ha cambiado..."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"><img src="" alt="María Rodríguez" /></div>
                <div className="author-info">
                  <h4>María Rodríguez</h4>
                  <p>Líder comunitaria, Ciudad Bolívar</p>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-text">
                "Como recicladora, este proyecto me ha dado un trabajo formal..."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"><img src="" alt="Lina Cortes" /></div>
                <div className="author-info">
                  <h4>Lina Cortes</h4>
                  <p>Recicladora formalizada, Bonanza</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>¡Únete a la Revolución Zero Waste!</h2>
          <p>Descarga nuestra app, participa o conviértete en aliado...</p>
          <div className="cta-btns">
            <a href="#" className="btn btn-accent">Descargar la App</a>
            <a href="#" className="btn btn-outline">Ser Aliado</a>
            <a href="#" className="btn btn-outline">Donar al Proyecto</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section footer-about">
              <h3>Zero Waste</h3>
              <p>Transformando la gestión de residuos en sectores vulnerables...</p>
              <div className="social-links">
                <a href="https://wa.me/qr/F56TCJUQH4GHM1"><i className="fab fa-whatsapp"></i></a>
                <a href="https://www.facebook.com/?locale=es_LA"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Enlaces Rápidos</h3>
              <ul className="footer-links">
                <li><a href="#inicio"><i className="fas fa-chevron-right"></i> Inicio</a></li>
                <li><a href="#como-funciona"><i className="fas fa-chevron-right"></i> Cómo Funciona</a></li>
                <li><a href="#beneficios"><i className="fas fa-chevron-right"></i> Beneficios</a></li>
                <li><a href="#app"><i className="fas fa-chevron-right"></i> La App</a></li>
                <li><a href="#testimonios"><i className="fas fa-chevron-right"></i> Testimonios</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Recursos</h3>
              <ul className="footer-links">
                <li><a href="#"><i className="fas fa-file-pdf"></i> Guía de Separación</a></li>
                <li><a href="#"><i className="fas fa-map-marked-alt"></i> Mapa de Contenedores</a></li>
                <li><a href="#"><i className="fas fa-video"></i> Tutoriales</a></li>
                <li><a href="#"><i className="fas fa-book"></i> Informes de Impacto</a></li>
                <li><a href="#"><i className="fas fa-newspaper"></i> Prensa</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contacto</h3>
              <ul className="footer-links">
                <li><a href="#"><i className="fas fa-envelope"></i> infozerowaste@gmail.com</a></li>
                <li><a href="#"><i className="fas fa-phone"></i> +57 3248477104</a></li>
                <li><a href="#"><i className="fas fa-map-marker-alt"></i> Carrera 15 # 88-64, Bogotá</a></li>
                <li><a href="#"><i className="fas fa-headset"></i> Soporte Técnico</a></li>
                <li><a href="#"><i className="fas fa-hands-helping"></i> Voluntariado</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Zero Waste. Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </>
  );
}
