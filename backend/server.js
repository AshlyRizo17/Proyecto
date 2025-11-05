import express from "express";
// Importar la versión Promise de mysql2
import mysql from "mysql2/promise"; 
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE SEGURIDAD ---
const saltRounds = 10; // Nivel de sal para bcrypt

// --- CONFIGURACIÓN DE LA BASE DE DATOS (Usando Pool o Connection para Promesas) ---
// Usaremos un Pool para gestionar múltiples conexiones de forma eficiente
const pool = mysql.createPool({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "zerowaste",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Probar la conexión al iniciar el servidor
pool.getConnection()
    .then(connection => {
        console.log("✅ Pool de conexiones a MySQL creado y probado.");
        connection.release(); // Liberar la conexión de prueba
    })
    .catch(err => {
        console.error("❌ Error FATAL al conectar/crear Pool de MySQL:", err);
        process.exit(1); // Detener la aplicación si no puede conectar
    });

// ----------------------------------------
// --- RUTA DE LOGIN (Con Hashing) ---
// ----------------------------------------
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Faltan email o contraseña." });
    }

    try {
        // 1. Buscar el usuario en la tabla 'usuarios'
        const [results] = await pool.query(
            "SELECT id, email, contraseña, rol FROM usuarios WHERE email = ?",
            [email]
        );
        
        if (results.length === 0) {
            // Mensaje genérico para no dar pistas sobre qué falló (usuario o contraseña)
            return res.json({ success: false, message: "Credenciales incorrectas" });
        }

        const user = results[0];
        const hashedPassword = user.contraseña;

        // 2. Comparar la contraseña en texto plano con el hash guardado
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            // 3. Login exitoso: Eliminar el hash de la contraseña antes de responder
            delete user.contraseña; 
            res.json({ success: true, user: user });
        } else {
            // 4. Contraseña incorrecta
            res.json({ success: false, message: "Credenciales incorrectas" });
        }

    } catch (error) {
        console.error("❌ Error en el login:", error);
        return res.status(500).json({ success: false, error: "Error interno del servidor." });
    }
});

// ----------------------------------------
// --- RUTA DE REGISTRO (Con Transacción y Hashing) ---
// ----------------------------------------
app.post("/register", async (req, res) => {
    // ⚠️ Nota: documentType y populationType no se usan en el SQL, 
    // pero se mantienen en el destructuring por si los necesitas después.
    const {
        firstName,
        lastName,
        registerEmail,
        documentType, // Se mantiene, aunque no se usa en este SQL
        documentNumber,
        populationType, // Se mantiene, aunque no se usa en este SQL
        localidad,
        password,
    } = req.body;

    let connection; // Variable para mantener la conexión de la transacción
    
    // Validaciones básicas
    if (!firstName || !lastName || !registerEmail || !documentNumber || !localidad || !password) {
        return res.status(400).json({ success: false, message: "Faltan campos obligatorios." });
    }

    try {
        // 1. Crear el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 2. Obtener una conexión del Pool e iniciar la transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 3. Insertar en la tabla 'usuarios'
        const [userResult] = await connection.query(
            "INSERT INTO usuarios (email, contraseña, rol) VALUES (?, ?, 'ciudadano')",
            [registerEmail, hashedPassword]
        );
        const userId = userResult.insertId;

        // 4. Insertar en la tabla 'ciudadanos'
        // NOTA: Se ha quitado la columna 'contraseña' de esta inserción, ya que solo debe estar hasheada en la tabla 'usuarios'.
        await connection.query(
            "INSERT INTO ciudadanos (id_usuario, nombre, apellido, documento, localidad, email) VALUES (?, ?, ?, ?, ?, ?)",
            [
                userId,
                firstName,
                lastName,
                documentNumber,
                localidad,
                registerEmail,
            ]
        );

        // 5. Commit (Confirmar) la transacción
        await connection.commit();

        res.json({ success: true, message: "✅ Registro exitoso. ¡Bienvenido!" });

    } catch (error) {
        // 6. Rollback (Revertir) en caso de cualquier error
        if (connection) {
            await connection.rollback();
        }

        console.error("❌ Error en el registro o transacción:", error);

        // Manejo de error de clave duplicada (ej. el email ya existe)
        if (error.code === 'ER_DUP_ENTRY') {
             return res.status(409).json({ success: false, error: "El correo electrónico ya está registrado. Por favor, inicia sesión." });
        }

        return res.status(500).json({ success: false, error: "Error interno del servidor al registrar." });
    } finally {
        // 7. Liberar la conexión al Pool siempre
        if (connection) {
            connection.release();
        }
    }
});


// ----------------------------------------
// --- INICIO DEL SERVIDOR ---
// ----------------------------------------
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});