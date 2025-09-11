import React, { useState } from "react";
import "../styles/admin.css"; // tu CSS
import logo from "../assets/img/logo.png"; // logo

const ZeroWaste = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className="container">
          <nav className="navbar">
            {/* Logo */}
            <a href="./admin.html" className="logo">
              <img src={logo} alt="Logo" className="logo" />
            </a>

            {/* Botón hamburguesa */}
            <button
              className="mobile-menu-btn"
              aria-label="Abrir menú de navegación"
              aria-expanded={menuOpen}
              aria-controls="navigation-menu"
              type="button"
              id="hamburger"
              onClick={toggleMenu}
            >
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </button>

            {/* Enlaces */}
            <ul
              className={`nav-links ${menuOpen ? "active" : ""}`}
              id="navigation-menu"
              role="menu"
            >
              <li><a href="#inicio" className="active">Inicio</a></li>
              <li><a href="#como-funciona">Cómo Funciona</a></li>
              <li><a href="#beneficios">Beneficios</a></li>
              <li><a href="#app">La App</a></li>
              <li><a href="#testimonios">Testimonios</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="./ventana_admi.html" className="auth-link">ADMIN</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Transformando Bogotá, un residuo a la vez</h1>
            <p>
              Un proyecto innovador para gestionar residuos en sectores vulnerables,
              usando tecnología y comunidad para crear una ciudad más limpia y sostenible.
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
              Un sistema integrado que combina infraestructura, tecnología y comunidad
              para transformar la gestión de residuos
            </p>
          </div>

          <div className="steps">
            {[
              { num: "01", icon: "fa-trash-alt", title: "Puntos Ecológicos", text: "Instalación de contenedores..." },
              { num: "02", icon: "fa-map-marked-alt", title: "Mapa Interactivo", text: "Visualización en tiempo real..." },
              { num: "03", icon: "fa-bell", title: "Alertas Inteligentes", text: "Notificaciones personalizadas..." },
              { num: "04", icon: "fa-mobile-alt", title: "App Zero Waste", text: "Aplicación móvil para gestionar..." },
              { num: "05", icon: "fa-graduation-cap", title: "Educación Ambiental", text: "Programas comunitarios..." },
              { num: "06", icon: "fa-chart-line", title: "Monitoreo y Reportes", text: "Sistema de seguimiento..." }
            ].map((step, i) => (
              <div className="step" key={i}>
                <div className="step-number">{step.num}</div>
                <div className="step-icon"><i className={`fas ${step.icon}`}></i></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="benefits">
        <div className="container">
          <div className="section-title">
            <h2>Beneficios Transformadores</h2>
            <p>Impacto positivo en comunidades y medio ambiente a través de Zero Waste</p>
          </div>

          <div className="benefits-grid">
            {[
              { icon: "fa-leaf", title: "Reducción de Contaminación", text: "Disminución significativa..." },
              { icon: "fa-users", title: "Inclusión Comunitaria", text: "Participación activa de ciudadanos..." },
              { icon: "fa-chart-pie", title: "Eficiencia Operativa", text: "Optimización de rutas con IA..." },
              { icon: "fa-seedling", title: "Cultura Ambiental", text: "Promoción de hábitos sostenibles..." },
              { icon: "fa-wallet", title: "Ahorro Económico", text: "Reducción de costos de limpieza..." },
              { icon: "fa-shield-alt", title: "Seguridad Sanitaria", text: "Menor proliferación de enfermedades..." }
            ].map((benefit, i) => (
              <div className="benefit-card" key={i}>
                <i className={`fas ${benefit.icon}`}></i>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section id="app" className="app-preview">
        <div className="container">
          <div className="app-container">
            <div className="app-image">
              <img src={logo} alt="Zero Waste App" width="300" height="400" />
            </div>
            <div className="app-content">
              <h2>La App Zero Waste</h2>
              <p>
                Tu compañera para construir una Bogotá más limpia. Gestiona recolecciones,
                aprende sobre reciclaje y contribuye al cambio desde tu celular.
              </p>

              <div className="app-features">
                <div className="feature">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="feature-content">
                    <h4>Mapa Interactivo</h4>
                    <p>Visualiza rutas de recolección...</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-bell"></i>
                  <div className="feature-content">
                    <h4>Alertas Personalizadas</h4>
                    <p>Recibe notificaciones antes del paso...</p>
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
                <a href="https://play.google.com/store" className="app-btn">
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
            <p>Historias reales de transformación en barrios de Bogotá</p>
          </div>

          <div className="testimonials-container">
            <div className="testimonial loading">
              <div className="testimonial-text">
                "Gracias a Zero Waste, nuestro barrio ha cambiado completamente..."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"><img src="" alt="" /></div>
                <div className="author-info">
                  <h4>María Rodríguez</h4>
                  <p>Líder comunitaria, Ciudad Bolívar</p>
                </div>
              </div>
            </div>

            <div className="testimonial loading">
              <div className="testimonial-text">
                "Como recicladora, este proyecto me ha dado un trabajo formal y estable..."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"><img src="" alt="" /></div>
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
          <p>
            Descarga nuestra app, participa en nuestras capacitaciones o conviértete en aliado
            para transformar la gestión de residuos en Bogotá.
          </p>
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
              <p>
                Transformando la gestión de residuos en sectores vulnerables de Bogotá
                mediante tecnología, infraestructura y participación comunitaria.
              </p>
              <div className="social-links">
                <a href="https://wa.me/qr/F56TCJUQH4GHM1"><i className="fab fa-whatsapp"></i></a>
                <a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
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
};
export default Admin;