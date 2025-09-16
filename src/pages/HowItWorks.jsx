import React from "react";
import "../styles/index.css"
function HowItWorks() {
  return (
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
            <p>
              Instalación de contenedores especializados para separar residuos
              ordinarios (negro) y aprovechables (blanco) en puntos estratégicos
              de barrios vulnerables.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div className="step-icon"><i className="fas fa-map-marked-alt"></i></div>
            <h3>Mapa Interactivo</h3>
            <p>
              Visualización en tiempo real de rutas de recolección y puntos
              ecológicos para que los ciudadanos sepan dónde y cuándo disponer
              sus residuos.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div className="step-icon"><i className="fas fa-bell"></i></div>
            <h3>Alertas Inteligentes</h3>
            <p>
              Notificaciones personalizadas que avisan cuándo sacar los residuos
              antes del paso de la ruta, mejorando la eficiencia de recolección.
            </p>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div className="step-icon"><i className="fas fa-mobile-alt"></i></div>
            <h3>App Zero Waste</h3>
            <p>
              Aplicación móvil para gestionar recolecciones, aprender sobre
              separación de residuos y reportar incidencias en tiempo real.
            </p>
          </div>

          <div className="step">
            <div className="step-number">05</div>
            <div className="step-icon"><i className="fas fa-graduation-cap"></i></div>
            <h3>Educación Ambiental</h3>
            <p>
              Programas comunitarios y guías interactivas para enseñar la
              correcta separación de residuos con ejemplos claros y consejos
              prácticos.
            </p>
          </div>

          <div className="step">
            <div className="step-number">06</div>
            <div className="step-icon"><i className="fas fa-chart-line"></i></div>
            <h3>Monitoreo y Reportes</h3>
            <p>
              Sistema de seguimiento con métricas de impacto ambiental,
              reducción de residuos y eficiencia operativa para toma de
              decisiones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
