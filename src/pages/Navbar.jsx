import React from "react";
import "../styles/Navbar.css"

function Navbar() {
  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <a href="/admin" className="logo">
            <img src="../assets/img/logo.png" alt="Logo" className="logo" />
          </a>

          <button className="mobile-menu-btn" id="hamburger">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>

          <ul className="nav-links" id="navigation-menu">
            <li><a href="#inicio" className="active">Inicio</a></li>
            <li><a href="#como-funciona">Cómo Funciona</a></li>
            <li><a href="#beneficios">Beneficios</a></li>
            <li><a href="#app">La App</a></li>
            <li><a href="#testimonios">Testimonios</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="/ventana_admi" className="auth-link">ADMIN</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Navbar