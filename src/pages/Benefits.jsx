import React from "react";
import "../styles/index.css"
function Benefits() {
  return (
    <section id="beneficios" className="benefits">
      <div className="container">
        <div className="section-title">
          <h2>Beneficios Transformadores</h2>
          <p>
            Impacto positivo en comunidades y medio ambiente a través de Zero
            Waste
          </p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="fas fa-leaf"></i>
            <h3>Reducción de Contaminación</h3>
            <p>
              Disminución significativa de residuos en vía pública y prevención
              de contaminación de suelos y fuentes hídricas.
            </p>
          </div>

          <div className="benefit-card">
            <i className="fas fa-users"></i>
            <h3>Inclusión Comunitaria</h3>
            <p>
              Participación activa de ciudadanos en sectores vulnerables y
              formalización de recicladores como actores clave del sistema.
            </p>
          </div>

          <div className="benefit-card">
            <i className="fas fa-chart-pie"></i>
            <h3>Eficiencia Operativa</h3>
            <p>
              Optimización de rutas con inteligencia artificial, reduciendo
              tiempos de recolección en 30% y costos operativos.
            </p>
          </div>

          <div className="benefit-card">
            <i className="fas fa-seedling"></i>
            <h3>Cultura Ambiental</h3>
            <p>
              Promoción de hábitos sostenibles a través de educación práctica y
              accesible para todos los ciudadanos.
            </p>
          </div>

          <div className="benefit-card">
            <i className="fas fa-wallet"></i>
            <h3>Ahorro Económico</h3>
            <p>
              Reducción de costos de limpieza pública y generación de ingresos
              por venta de materiales reciclables a empresas.
            </p>
          </div>

          <div className="benefit-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Seguridad Sanitaria</h3>
            <p>
              Menor proliferación de enfermedades por acumulación de residuos en
              espacios públicos y viviendas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;