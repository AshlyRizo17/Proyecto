import React from "react";
import logo from "../assets/img/logo.png";
import "../styles/index.css"
function AppPreview() {
  return (
    <section id="app" className="app-preview">
      <div className="container">
        <div className="app-container">
          <div className="app-image">
            <img src={logo} alt="Zero Waste App" width="300px" height="400px" />
          </div>
          <div className="app-content">
            <h2>La App Zero Waste</h2>
            <p>
              Tu compañera para construir una Bogotá más limpia. Gestiona
              recolecciones, aprende sobre reciclaje y contribuye al cambio
              desde tu celular.
            </p>

            <div className="app-features">
              <div className="feature">
                <i className="fas fa-map-marker-alt"></i>
                <div className="feature-content">
                  <h4>Mapa Interactivo</h4>
                  <p>
                    Visualiza rutas de recolección y puntos ecológicos cercanos
                    en tiempo real.
                  </p>
                </div>
              </div>

              <div className="feature">
                <i className="fas fa-bell"></i>
                <div className="feature-content">
                  <h4>Alertas Personalizadas</h4>
                  <p>
                    Recibe notificaciones antes del paso de la ruta de
                    recolección en tu sector.
                  </p>
                </div>
              </div>

              <div className="feature">
                <i className="fas fa-book"></i>
                <div className="feature-content">
                  <h4>Guías Educativas</h4>
                  <p>
                    Aprende a separar residuos con ejemplos visuales y consejos
                    prácticos.
                  </p>
                </div>
              </div>

              <div className="feature">
                <i className="fas fa-calendar-check"></i>
                <div className="feature-content">
                  <h4>Solicitud de Recolección</h4>
                  <p>
                    Solicita recolección especial cuando la necesites para tu
                    hogar o negocio.
                  </p>
                </div>
              </div>
            </div>

            <div className="app-stores">
              <a
                href="https://play.google.com/store/games?hl=es_419&pli=1"
                className="app-btn"
              >
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
  );
}

export default AppPreview;
