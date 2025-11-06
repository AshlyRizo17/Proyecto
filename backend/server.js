import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // tu usuario
  password: "", // tu contraseña
  database: "zerowaste"
});

db.connect(err => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL");
});

// Ruta de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
  "SELECT * FROM usuarios WHERE email = ? AND contraseña = ?",
  [email, password],
  (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    if (result.length > 0) {
      res.json({ success: true, user: result[0] });
    } else {
      res.json({ success: false, message: "Credenciales incorrectas" });
    }
  }
);
});

// Ruta de registro
app.post("/register", (req, res) => {
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

  // Insertar en la tabla usuarios
  db.query(
    "INSERT INTO usuarios (email, contraseña, rol) VALUES (?, ?, 'ciudadano')",
    [registerEmail, password],
    (err, result) => {
      if (err) {
        console.error("❌ Error insertando en usuarios:", err);
        return res.status(500).json({ error: "Error al registrar usuario" });
      }

      const userId = result.insertId;

      // Insertar en la tabla ciudadanos
      db.query(
        "INSERT INTO ciudadanos (id_usuario, nombre, apellido, documento, localidad, email, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          firstName,
          lastName,
          documentNumber,
          localidad,
          registerEmail,
          password,
        ],
        (err2) => {
          if (err2) {
            console.error("❌ Error insertando en ciudadanos:", err2);
            return res.status(500).json({ error: "Error al registrar ciudadano" });
          }

          res.json({ success: true, message: "✅ Registro exitoso" });
        }
      );
    }
  );
});


app.listen(3001, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3001");
});