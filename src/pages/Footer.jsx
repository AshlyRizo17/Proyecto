import "../styles/Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Footer() {
  return (
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
              <li><a href="mailto:infozerowaste@gmail.com"><i className="fas fa-envelope"></i> infozerowaste@gmail.com</a></li>
              <li><a href="tel:+573248477104"><i className="fas fa-phone"></i> +57 3248477104</a></li>
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
  );
}
