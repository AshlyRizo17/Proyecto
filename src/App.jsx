import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar.jsx";
import Footer from "./pages/Footer.jsx";
import Admin from "./pages/admin.jsx";
import VentanaAdmin from "./pages/VentanaAdmin.jsx";


// Ejemplo de páginas extra 
// VentanaAdmin";
 function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Página principal */}
        <Route
          path="/"
          element={
            <>
              <Footer />
            </>
          }
        />

        {/* Ruta para admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Ruta para ventana_admin */}
        <Route path="/ventana_admin" element={<VentanaAdmin />} />
      </Routes>
    </Router>
  );
}
export default App;
