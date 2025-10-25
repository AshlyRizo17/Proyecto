// ============================================
// BACKEND - ZeroWaste Server
// ============================================
import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ============================================
// CONFIGURACIÓN
// ============================================
const SECRET_KEY = "clave_super_secreta"; // 🔒 Cambia esto en producción

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "zerowaste",
});

// ============================================
// MIDDLEWARE PARA VERIFICAR TOKEN
// ============================================
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

// ============================================
// RUTA: REGISTRO DE CIUDADANO
// ============================================
app.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    registerEmail,
    documentType,
    documentNumber,
    populationType,
    localidad,
    password,
  } = req.body;

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const [result] = await pool.query(
      "INSERT INTO usuarios (email, contraseña, rol) VALUES (?, ?, 'ciudadano')",
      [registerEmail, hashedPassword]
    );

    const userId = result.insertId;

    // Insertar en tabla ciudadanos
    await pool.query(
      "INSERT INTO ciudadanos (id_usuario, nombre, apellido, tipo_documento, documento, tipo_poblacion, localidad, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        firstName,
        lastName,
        documentType,
        documentNumber,
        populationType,
        localidad,
        registerEmail,
      ]
    );

    res.json({ success: true, message: "✅ Registro exitoso" });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// ============================================
// RUTA: LOGIN
// ============================================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [usuarios] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (usuarios.length === 0)
      return res.status(401).json({ message: "Usuario no encontrado" });

    const usuario = usuarios[0];
    const passwordValida = await bcrypt.compare(password, usuario.contraseña);

    if (!passwordValida)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // Generar token
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, rol: usuario.rol, email: usuario.email },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      rol: usuario.rol,
      id_usuario: usuario.id_usuario,
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// ============================================
// RUTA: PERFIL DEL USUARIO (por ID o token)
// ============================================
app.get("/api/usuarios/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT * FROM ciudadanos WHERE id_usuario = ?",
      [id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(result[0]);
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// ============================================
// RUTA: PERFIL DESDE TOKEN
// ============================================
app.get("/api/perfil", verifyToken, async (req, res) => {
  const { id_usuario, rol } = req.user;

  try {
    if (rol === "ciudadano") {
      const [result] = await pool.query(
        "SELECT * FROM ciudadanos WHERE id_usuario = ?",
        [id_usuario]
      );
      res.json(result[0]);
    } else {
      res.json({ message: `Perfil del rol: ${rol}` });
    }
  } catch (error) {
    console.error("❌ Error en perfil:", error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
});

// ============================================
// INICIAR SERVIDOR
// ============================================
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ZeroWaste corriendo en http://localhost:${PORT}`);
});
