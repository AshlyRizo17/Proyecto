import React, { useState } from "react";

function LoginApp() {
  // Estados para formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para errores
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  // Estado para usuario logueado
  const [user, setUser] = useState(null);

  // Estado para historial de sesiones (simulado)
  const [sessionHistory, setSessionHistory] = useState([]);

  // Estado para tiempo de sesión
  const [sessionTime, setSessionTime] = useState(null);

  // Validaciones
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Mínimo 8 caracteres, al menos una mayúscula, un número y un símbolo
    const re =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\$\$:;<>,.?~\\/-]).{8,}$/;
    return re.test(password);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (!isEmailValid || !isPasswordValid) {
      setLoginMessage("Por favor corrige los errores antes de continuar.");
      return;
    }

    // Simular login exitoso
    const fakeUser = {
      id: "123456",
      email,
      name: email.split("@")[0], // Simular nombre desde email
    };

    setUser(fakeUser);
    setLoginMessage("");
    setSessionTime(new Date().toLocaleString());

    // Simular historial de sesiones
    setSessionHistory([
      { id: 1, time: "2024-04-01 10:00:00" },
      { id: 2, time: "2024-04-02 14:30:00" },
      { id: 3, time: new Date().toLocaleString(), location: "Madrid, ES" },
    ]);

    alert("Login exitoso con React integrado!");
  };

  // Función para cerrar sesión actual
  const logout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
    setSessionTime(null);
    setSessionHistory([]);
    setLoginMessage("");
    setEmailError(false);
    setPasswordError(false);
  };

  // Función para cerrar todas las sesiones (simulado)
  const logoutAll = () => {
    alert("Todas las sesiones han sido cerradas.");
    logout();
  };

  if (!user) {
    return (
      <div id="loginForm" className="form-container">
        <div className="form-header text-center mb-6">
          <h1>Bienvenido</h1>
          <p>Inicia sesión en tu cuenta</p>
        </div>

        {loginMessage && (
          <div
            id="loginMessage"
            className="mb-4 text-red-600 bg-red-50 p-3 rounded"
          >
            {loginMessage}
          </div>
        )}

        <form id="loginFormElement" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="loginEmail"
              className="block font-medium mb-2"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              required
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {emailError && (
              <small id="emailError" className="text-red-600 mt-1">
                Ingresa un correo válido
              </small>
            )}
          </div>

          <div className="form-group mb-6">
            <label
              htmlFor="loginPassword"
              className="block font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
            />
            <small className="text-gray-600 text-sm mt-1 block">
              La contraseña debe tener mínimo 8 caracteres, incluir mayúscula,
              número y símbolo
            </small>
            {passwordError && (
              <small id="passwordError" className="text-red-600 mt-1">
                La contraseña no cumple con los requisitos
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            id="loginBtn"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="form-footer mt-4 text-center">
          {/* Cambié el href por react-router-dom Link */}
          <a href="/register" className="text-blue-600 hover:underline">
            ¿No tienes cuenta? Regístrate
          </a>
        </div>
      </div>
    );
  }

  return (
    <div id="dashboard" className="dashboard">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        ¡Bienvenido al Dashboard!
      </h2>

      <div className="user-info bg-gray-50 p-4 rounded mb-6">
        <h3 className="text-xl mb-3">Información del Usuario</h3>
        <p className="mb-2">
          <strong>Nombre:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Usuario:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Sesión iniciada:</strong> {sessionTime}
        </p>
      </div>

      <div className="session-history bg-gray-50 p-4 rounded mb-6">
        <h3 className="text-xl mb-3">Historial de Sesiones</h3>
        <div id="sessionHistoryList">
          {sessionHistory.length > 0 ? (
            <ul>
              {sessionHistory.map((session) => (
                <li key={session.id} className="flex justify-between">
                  <span>{session.time}</span>
                  {session.location && (
                    <span className="text-gray-500">({session.location})</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay historial de sesiones.</p>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          className="logout-btn bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200 flex-1"
          onClick={logout}
        >
          Cerrar Sesión
        </button>
        <button
          className="btn btn-logout-all bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200 flex-1"
          onClick={logoutAll}
        >
          Cerrar Todas las Sesiones
        </button>
      </div>
    </div>
  );
}

export default LoginApp;
