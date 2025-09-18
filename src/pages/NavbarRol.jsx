import React, { useState } from "react";
import logo from "../assets/img/logo.png";

const NavbarRol = ({ rol }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Define links por rol
  const linksPorRol = {
    admin: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/usuarios", label: "Usuarios" },
      { href: "/configuracion", label: "Configuración" },
      { href: "/logout", label: "Cerrar sesión" },
    ],
    ciudadano: [
      { href: "/inicio", label: "Inicio" },
      { href: "/solicitudes", label: "Solicitudes" },
      { href: "/reciclaje", label: "Notificaciones" },
      { href: "/perfil", label: "Perfil" },
      { href: "/logout", label: "Cerrar sesión" },
      { href: "/logout", label: "Cerrar sesión" },
    ],
    conductor: [
      { href: "/viajes", label: "Mis Rutas" },
      { href: "/vehiculo", label: "Mi Vehículo" },
      { href: "/perfil", label: "Perfil" },
      { href: "/logout", label: "Cerrar sesión" },
    ],
  };

  const links = linksPorRol[rol] || [];

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <a href="/" className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
          </a>

          {/* Botón hamburguesa para móvil */}
          <button
            className="mobile-menu-btn"
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
            aria-controls="navigation-menu"
            type="button"
            onClick={toggleMenu}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>

          {/* Links navegación */}
          <ul
            className={`nav-links ${menuOpen ? "active" : ""}`}
            id="navigation-menu"
            role="menu"
          >
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavbarRol;
