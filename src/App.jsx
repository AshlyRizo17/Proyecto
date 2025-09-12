import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar.jsx";
import Footer from "./pages/Footer.jsx";   

import Admin from "./pages/Admin.jsx";
import VentanaAdmin from "./pages/VentanaAdmin.jsx";
import Conductor from "./pages/Conductor";
import Ciudadano from "./pages/Ciudadano";
import VentanaCiudadano from "./pages/VentanaCiudadano.jsx";
import VentanaConductor from "./pages/VentanaConductor.jsx";
import VentanaSelectMap from "./pages/VentanaSelectMap.jsx";
import MapPrincipal from "./pages/MapPrincipal.jsx";
import MapSolicitudes from "./pages/MapSolicitudes.jsx";
import Crud from "./pages/Crud.jsx";

function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 Aquí sí aparece la barra de navegación */}
      
      <Routes>
        <Route path="/MapaPrincipal" element={<MapPrincipal />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ventana-admin" element={<VentanaAdmin />} />
        <Route path="/conductor" element={<Conductor />} />
        <Route path="/ciudadano" element={<Ciudadano />} />
        <Route path="/ventana-ciudadano" element={<VentanaCiudadano />} />
        <Route path="/ventana-conductor" element={<VentanaConductor />} />
        <Route path="/ventana-select-map" element={<VentanaSelectMap />} />
        <Route path="/map-solicitudes" element={<MapSolicitudes />} />
      </Routes>

      <Footer /> {/* 👈 Aquí el footer se renderiza SIEMPRE */}
    </Router>
  );
}

export default App;