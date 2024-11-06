const { Pool } = require("pg");
require("dotenv").config({ path: "../../.env" });

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

let isPoolClosed = false;

const closePool = async () => {
  if (!isPoolClosed) {
    // Vérifier si le pool est déjà fermé
    isPoolClosed = true; // Marquer le pool comme fermé
    await pool.end();
  }
};

process.on("SIGTERM", closePool);
process.on("SIGINT", closePool);

module.exports = {
  query: (text, params) => pool.query(text, params),
  closePool,
};
