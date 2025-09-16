import React from "react";
import "../styles/index.css"
function CTA() {
  return (
    <section id="cta" className="cta">
      <div className="container">
        <h2>Únete al cambio con Zero Waste</h2>
        <p>
          Sé parte de la solución y construyamos juntos una ciudad más limpia,
          saludable y sostenible.
        </p>
        <a href="#app" className="cta-btn">Descargar la App</a>
      </div>
    </section>
  );
}

export default CTA;
