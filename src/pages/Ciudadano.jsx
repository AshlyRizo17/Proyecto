import React from "react";
import { Link } from "react-router-dom"; // 👈 Importamos Link
import "../styles/ciudadano.css";
import logo from "../assets/img/logo.png";

const Ciudadano = () => {
  return (
    <div className="ciudadano-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <ul className="sidebar-links">
          <li><a href="/" className="active">Inicio</a></li>
          <li><a href="#como-funciona">Solicitudes</a></li>
          <li><a href="#beneficios">Notificaciones</a></li>
          <li><a href="#app">Perfil</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#contacto">Cerrar Sesión</a></li>

          {/* 👉 Nuevo link que abre la Ventana Ciudadano */}
          <li>
            <Link to="/ventana-ciudadano" className="auth-link">
              Ir a Ventana Ciudadano
            </Link>
          </li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        <section id="inicio" className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Transformando Bogotá, un residuo a la vez</h1>
              <p>
                Un proyecto innovador para gestionar residuos en sectores
                vulnerables, usando tecnología y comunidad para crear una ciudad
                más limpia y sostenible.
              </p>
              <div className="hero-btns">
                <a href="#app" className="btn">Descargar la App</a>
                <a href="#como-funciona" className="btn btn-outline">
                  Ver cómo funciona
                </a>
              </div>

              <div className="stats">
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <div className="stat-number">25,000+</div>
                    <div>Ciudadanos beneficiados</div>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-trash-alt"></i>
                  <div>
                    <div className="stat-number">70%</div>
                    <div>Menos residuos en calles</div>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-tree"></i>
                  <div>
                    <div className="stat-number">45%</div>
                    <div>Más material reciclado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Ciudadano;
