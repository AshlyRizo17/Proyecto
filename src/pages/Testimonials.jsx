import React from "react";
import "../styles/index.css"
function Testimonials() {
  return (
    <section id="testimonios" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Lo que dicen nuestros usuarios</h2>
          <p>
            Experiencias reales de ciudadanos y recicladores que ya viven el
            cambio con Zero Waste
          </p>
        </div>

        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>
              "Ahora sé exactamente cuándo sacar la basura y mi barrio está más
              limpio que nunca."
            </p>
            <h4>María González</h4>
            <span>Ciudadana - Usme</span>
          </div>

          <div className="testimonial-card">
            <p>
              "Con la app me avisan cuándo pasa la ruta y he aprendido a
              separar mejor mis residuos."
            </p>
            <h4>Carlos Ramírez</h4>
            <span>Ciudadano - Bosa</span>
          </div>

          <div className="testimonial-card">
            <p>
              "Gracias a Zero Waste ahora mi trabajo como reciclador es más
              reconocido y seguro."
            </p>
            <h4>Pedro López</h4>
            <span>Reciclador - Kennedy</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
