import React from "react";
import "../styles/index.css"
function Hero() {
  return (
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
  );
}

export default Hero;
