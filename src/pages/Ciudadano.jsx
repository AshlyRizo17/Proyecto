import React, { useState } from "react";
import "../styles/admin.css"; // tu hoja de estilos
import logo from "../assets/img/logo.png"; // importa tu logo


const Ciudadano = () => {
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
            <a href="/" className="logo">
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

            {/* Links navegación */}
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
              <li><a href="/ventana-ciudadano" className="auth-link">CIUDADANO</a></li>
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

      {/* Resto de secciones (Cómo funciona, Beneficios, App, Testimonios, CTA, Footer) */}
      {/* Puedes pegar tu mismo contenido HTML y solo cambiar class -> className */}

      {/* Footer */}
      <footer id="contacto">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section footer-about">
              <h3>Zero Waste</h3>
              <p>
                Transformando la gestión de residuos en sectores vulnerables de
                Bogotá mediante tecnología, infraestructura y participación
                comunitaria para crear una ciudad más limpia y sostenible.
              </p>
              <div className="social-links">
                <a href="https://wa.me/qr/F56TCJUQH4GHM1"><i className="fab fa-whatsapp"></i></a>
                <a href="https://www.facebook.com/?locale=es_LA"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
              </div>
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
export default Ciudadano;