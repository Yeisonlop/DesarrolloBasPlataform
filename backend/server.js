const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");

const app = express();
const PORT = 4000;
const JWT_SECRET = "soundstage_secret_2024_jwt";
const DB_PATH = path.join(__dirname, "soundstage.db");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://desarrollo-bas-plataform-w1dm.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// ─── Base de datos ───────────────────────────────────────────────────────────
let db;

function guardarDB() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

async function inicializarDB() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
    console.log("✅ Base de datos cargada desde disco");
  } else {
    db = new SQL.Database();
    console.log("✅ Nueva base de datos creada");
  }

  // Crear tablas
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      total REAL NOT NULL,
      nombre_envio TEXT,
      direccion TEXT,
      ciudad TEXT,
      estado TEXT DEFAULT 'completado',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pedido_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id INTEGER NOT NULL,
      producto_id INTEGER,
      nombre TEXT NOT NULL,
      precio REAL NOT NULL,
      cantidad INTEGER NOT NULL,
      FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS carrito_guardado (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL UNIQUE,
      items TEXT DEFAULT '[]',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);

  guardarDB();
  console.log("✅ Tablas inicializadas");
}

// ─── Helper: query helper ────────────────────────────────────────────────────
function queryAll(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  } catch (e) {
    console.error("queryAll error:", e.message);
    return [];
  }
}

function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows[0] || null;
}

function runSQL(sql, params = []) {
  try {
    db.run(sql, params);
    guardarDB();
    return true;
  } catch (e) {
    console.error("runSQL error:", e.message);
    return false;
  }
}

function getLastId() {
  const row = queryOne("SELECT last_insert_rowid() as id");
  return row ? row.id : null;
}

// ─── Middleware auth ──────────────────────────────────────────────────────────
function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });
  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

// ─── AUTH ROUTES ─────────────────────────────────────────────────────────────

// Registro
app.post("/api/auth/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  const existe = queryOne("SELECT id FROM usuarios WHERE email = ?", [email]);
  if (existe) return res.status(400).json({ error: "El email ya está registrado" });

  const hash = await bcrypt.hash(password, 10);
  const ok = runSQL("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, hash]);
  if (!ok) return res.status(500).json({ error: "Error al registrar usuario" });

  const usuario = queryOne("SELECT id, nombre, email FROM usuarios WHERE email = ?", [email]);
  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email y contraseña requeridos" });

  const usuario = queryOne("SELECT * FROM usuarios WHERE email = ?", [email]);
  if (!usuario) return res.status(401).json({ error: "Credenciales incorrectas" });

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) return res.status(401).json({ error: "Credenciales incorrectas" });

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
});

// Perfil
app.get("/api/auth/perfil", autenticar, (req, res) => {
  const usuario = queryOne("SELECT id, nombre, email, created_at FROM usuarios WHERE id = ?", [req.usuario.id]);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
});

// ─── CARRITO ROUTES ───────────────────────────────────────────────────────────

// Guardar carrito
app.post("/api/carrito", autenticar, (req, res) => {
  const { items } = req.body;
  const itemsJson = JSON.stringify(items || []);

  const existe = queryOne("SELECT id FROM carrito_guardado WHERE usuario_id = ?", [req.usuario.id]);
  if (existe) {
    runSQL("UPDATE carrito_guardado SET items = ?, updated_at = CURRENT_TIMESTAMP WHERE usuario_id = ?", [itemsJson, req.usuario.id]);
  } else {
    runSQL("INSERT INTO carrito_guardado (usuario_id, items) VALUES (?, ?)", [req.usuario.id, itemsJson]);
  }
  res.json({ ok: true });
});

// Obtener carrito
app.get("/api/carrito", autenticar, (req, res) => {
  const row = queryOne("SELECT items FROM carrito_guardado WHERE usuario_id = ?", [req.usuario.id]);
  const items = row ? JSON.parse(row.items) : [];
  res.json({ items });
});

// ─── PEDIDOS ROUTES ───────────────────────────────────────────────────────────

// Crear pedido
app.post("/api/pedidos", autenticar, (req, res) => {
  const { items, total, nombre_envio, direccion, ciudad } = req.body;

  if (!items || items.length === 0)
    return res.status(400).json({ error: "El carrito está vacío" });

  runSQL(
    "INSERT INTO pedidos (usuario_id, total, nombre_envio, direccion, ciudad) VALUES (?, ?, ?, ?, ?)",
    [req.usuario.id, total, nombre_envio, direccion, ciudad]
  );

  const pedidoId = getLastId();

  for (const item of items) {
    runSQL(
      "INSERT INTO pedido_items (pedido_id, producto_id, nombre, precio, cantidad) VALUES (?, ?, ?, ?, ?)",
      [pedidoId, item.id, item.nombre, item.precio, item.cantidad]
    );
  }

  // Limpiar carrito guardado
  runSQL("UPDATE carrito_guardado SET items = '[]' WHERE usuario_id = ?", [req.usuario.id]);

  res.json({ ok: true, pedido_id: pedidoId });
});

// Historial de pedidos
app.get("/api/pedidos", autenticar, (req, res) => {
  const pedidos = queryAll(
    "SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY created_at DESC",
    [req.usuario.id]
  );

  const pedidosConItems = pedidos.map((p) => {
    const items = queryAll("SELECT * FROM pedido_items WHERE pedido_id = ?", [p.id]);
    return { ...p, items };
  });

  res.json(pedidosConItems);
});

// ─── INICIO ──────────────────────────────────────────────────────────────────
inicializarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor SOUNDSTAGE corriendo en http://localhost:${PORT}`);
    console.log(`📌 Endpoints:`);
    console.log(`   POST /api/auth/registro`);
    console.log(`   POST /api/auth/login`);
    console.log(`   GET  /api/auth/perfil`);
    console.log(`   GET  /api/carrito`);
    console.log(`   POST /api/carrito`);
    console.log(`   GET  /api/pedidos`);
    console.log(`   POST /api/pedidos`);
  });
});