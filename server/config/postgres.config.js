const { Pool } = require("pg");
require("dotenv").config({ path: "../../.env" });

const pool = new Pool({
  connectionString: process.env.DB_URL,
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
