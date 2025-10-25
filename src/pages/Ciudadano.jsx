import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ciudadano.css";
import logo from "../assets/img/logo.png";

const Ciudadano = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`http://localhost:3001/api/usuarios/${userId}`);
          setUsuario(response.data);
        } else {
          console.warn("No se encontró userId en localStorage");
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };
    fetchUsuario();
  }, []);

  return (
    <div className="ciudadano-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <ul className="sidebar-links">
          <li>
            <a href="/h" className="active">Inicio</a>
          </li>
          <li><a href="#como-funciona">Solicitudes</a></li>
          <li><a href="#beneficios">Notificaciones</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
           <li>
            <Link to="/ventana-ciudadano" className="auth-link">
              Ir a Ventana Ciudadano
            </Link>
          </li>
           <button
              onClick={() => {
                // borra los datos de sesión (si los guardas)
                localStorage.removeItem("user");
                // redirige al inicio de sesión
                window.location.href = "/login";
              }}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white transition"
            >
              Cerrar Sesión
            </button>
        </ul>
      </aside>
      

      <main className="main-content">
  <section id="perfil" className="perfil-section">
    <div className="container">
      {usuario ? (
        <div className="perfil-card">
          <h1 className="perfil-titulo">Bienvenido, {usuario.nombre}</h1>
          <p className="perfil-subtitulo">Este es tu perfil de ciudadano activo</p>

          <div className="perfil-info">
            <div className="perfil-item">
              <strong>Nombre completo:</strong> {usuario.nombre}
            </div>
            <div className="perfil-item">
              <strong>Correo electrónico:</strong> {usuario.email}
            </div>
            <div className="perfil-item">
              <strong>Teléfono:</strong> {usuario.telefono || "No registrado"}
            </div>
            <div className="perfil-item">
              <strong>Fecha de registro:</strong> {new Date(usuario.fechaRegistro).toLocaleDateString()}
            </div>
          </div>

          <div className="perfil-btns">
            <button className="btn btn-primary">Editar Perfil</button>
            <button className="btn btn-outline">Ver Notificaciones</button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Cargando información del usuario...</p>
      )}
    </div>
  </section>
</main>
    </div>
  );
};

export default Ciudadano;
