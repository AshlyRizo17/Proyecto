import React, { useState } from "react";
import "../styles/styles.css"; // tu hoja de estilos

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    registerEmail: "",
    documentType: "",
    documentNumber: "",
    populationType: "",
    localidad: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Registro exitoso");
        setFormData({
          firstName: "",
          lastName: "",
          registerEmail: "",
          documentType: "",
          documentNumber: "",
          populationType: "",
          localidad: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage("⚠️ Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Error conectando con el servidor.");
    }
  };

  return (
    <div className="container">
      <div id="registerForm" className="form-container">
        <div className="form-header">
          <h1>Crear Cuenta</h1>
          <p>Regístrate para comenzar</p>
        </div>

        {message && <div id="registerMessage">{message}</div>}

        <form id="registerFormElement" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Apellido */}
          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Correo */}
          <div className="form-group">
            <label htmlFor="registerEmail">Correo electrónico</label>
            <input
              type="email"
              id="registerEmail"
              name="registerEmail"
              value={formData.registerEmail}
              onChange={handleChange}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          {/* Tipo de documento */}
          <div className="form-group">
            <label>Tipo de documento</label>
            <div className="radio-group">
              {["cc", "ti", "ce", "pp"].map((doc) => (
                <div className="radio-option" key={doc}>
                  <input
                    type="radio"
                    id={doc}
                    name="documentType"
                    value={doc}
                    checked={formData.documentType === doc}
                    onChange={handleChange}
                  />
                  <label htmlFor={doc}>
                    {doc === "cc"
                      ? "Cédula de ciudadanía"
                      : doc === "ti"
                      ? "Tarjeta de identidad"
                      : doc === "ce"
                      ? "Cédula de extranjería"
                      : "Pasaporte"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Número de documento */}
          <div className="form-group">
            <label htmlFor="documentNumber">Número de documento</label>
            <input
              type="number"
              id="documentNumber"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Caracterización de población */}
          <div className="form-group">
            <label htmlFor="populationType">Caracterización de población</label>
            <select
              id="populationType"
              name="populationType"
              value={formData.populationType}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="indigena">Indígena</option>
              <option value="Afrodescendiente">Afrodescendiente</option>
              <option value="Discapacitado">Discapacitado</option>
              <option value="Desplazado">Desplazado</option>
              <option value="discapacidad">Persona con discapacidad</option>
              <option value="Ninguna">Ninguna</option>
            </select>
          </div>

          {/* Localidad */}
          <div className="form-group">
            <label htmlFor="localidad">Elija localidad</label>
            <select
              id="localidad"
              name="localidad"
              value={formData.localidad}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="usaquen">Usaquén</option>
              <option value="chapinero">Chapinero</option>
              <option value="santa_fe">Santa Fe</option>
              <option value="san_cristobal">San Cristóbal</option>
              <option value="usme">Usme</option>
              <option value="tunjuelito">Tunjuelito</option>
              <option value="bosa">Bosa</option>
              <option value="kennedy">Kennedy</option>
              <option value="fontibon">Fontibón</option>
              <option value="engativa">Engativá</option>
              <option value="suba">Suba</option>
              <option value="barrios_unidos">Barrios Unidos</option>
              <option value="teusaquillo">Teusaquillo</option>
              <option value="los_martires">Los Mártires</option>
              <option value="antonio_narino">Antonio Nariño</option>
              <option value="puente_aranda">Puente Aranda</option>
              <option value="candelaria">La Candelaria</option>
              <option value="rafael_uribe">Rafael Uribe Uribe</option>
              <option value="ciudad_bolivar">Ciudad Bolívar</option>
            </select>
          </div>

          {/* Contraseña */}
          <div className="form-group">
            <label htmlFor="registerPassword">Contraseña</label>
            <input
              type="password"
              id="registerPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
            <small className="password-hint">Mínimo 8 caracteres, incluir mayúscula,
              número y símbolo.</small>
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botón */}
          <button type="submit" className="btn btn-primary" id="registerBtn">
            Crear Cuenta
          </button>
        </form>

        <div className="form-footer">
          <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
