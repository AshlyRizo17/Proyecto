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
  const [isLoading, setIsLoading] = useState(false);

  // Validación de contraseña mejorada
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password); // Permite mayúscula O minúscula
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return minLength && hasLetter && hasNumber && hasSymbol;
  };

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar mensaje cuando el usuario empiece a escribir
    if (message) {
      setMessage("");
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validaciones mejoradas
    if (!validateEmail(formData.registerEmail)) {
      setMessage("❌ Por favor ingresa un correo electrónico válido");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage("❌ La contraseña debe tener al menos 8 caracteres, incluir una letra, número y símbolo");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    // Validar que el número de documento sea válido
    if (formData.documentNumber.length < 6) {
      setMessage("❌ El número de documento debe tener al menos 6 dígitos");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Limpiar datos antes de enviar
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          registerEmail: formData.registerEmail.trim().toLowerCase(),
        }),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        setMessage("✅ Registro exitoso");
        // Limpiar formulario
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
        setMessage(`⚠️ Error: ${data.error || data.message || 'Error desconocido'}`);
      }
    } catch (error) {
      setMessage("⚠️ Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div id="registerForm" className="form-container">
        <div className="form-header">
          <h1>Crear Cuenta</h1>
          <p>Regístrate para comenzar</p>
        </div>

        {message && (
          <div 
            id="registerMessage" 
            className={`message ${message.includes('✅') ? 'success' : 'error'}`}
          >
            {message}
          </div>
        )}

        <form id="registerFormElement" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="firstName">Nombre *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="50"
              pattern="[A-Za-zÀ-ÿ\s]+"
              title="Solo se permiten letras y espacios"
            />
          </div>

          {/* Apellido */}
          <div className="form-group">
            <label htmlFor="lastName">Apellido *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="50"
              pattern="[A-Za-zÀ-ÿ\s]+"
              title="Solo se permiten letras y espacios"
            />
          </div>

          {/* Correo */}
          <div className="form-group">
            <label htmlFor="registerEmail">Correo electrónico *</label>
            <input
              type="email"
              id="registerEmail"
              name="registerEmail"
              value={formData.registerEmail}
              onChange={handleChange}
              required
              placeholder="ejemplo@correo.com"
              autoComplete="email"
            />
          </div>

          {/* Tipo de documento */}
          <div className="form-group">
            <label>Tipo de documento *</label>
            <div className="radio-group">
              {[
                { value: "cc", label: "Cédula de ciudadanía" },
                { value: "ti", label: "Tarjeta de identidad" },
                { value: "ce", label: "Cédula de extranjería" },
                { value: "pp", label: "Pasaporte" }
              ].map((doc) => (
                <div className="radio-option" key={doc.value}>
                  <input
                    type="radio"
                    id={doc.value}
                    name="documentType"
                    value={doc.value}
                    checked={formData.documentType === doc.value}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor={doc.value}>{doc.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Número de documento */}
          <div className="form-group">
            <label htmlFor="documentNumber">Número de documento *</label>
            <input
              type="text"
              id="documentNumber"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              required
              pattern="[0-9]+"
              minLength="6"
              maxLength="15"
              title="Solo se permiten números, mínimo 6 dígitos"
            />
          </div>

          {/* Caracterización de población */}
          <div className="form-group">
            <label htmlFor="populationType">Caracterización de población *</label>
            <select
              id="populationType"
              name="populationType"
              value={formData.populationType}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="indigena">Indígena</option>
              <option value="afrodescendiente">Afrodescendiente</option>
              <option value="discapacidad">Persona con discapacidad</option>
              <option value="desplazado">Desplazado</option>
              <option value="ninguna">Ninguna</option>
            </select>
          </div>

          {/* Localidad */}
          <div className="form-group">
            <label htmlFor="localidad">Localidad *</label>
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
            <label htmlFor="registerPassword">Contraseña *</label>
            <input
              type="password"
              id="registerPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
              autoComplete="new-password"
            />
            <small className="password-hint">
              Mínimo 8 caracteres, incluir una letra, número y símbolo.
            </small>
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Botón */}
          <button 
            type="submit" 
            className="btn btn-primary" 
            id="registerBtn"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
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