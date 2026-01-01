import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const initDB = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS todo (
    id SERIAL PRIMARY KEY,
    title  TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

  try {
    await pool.query(queryText);
    console.log("✅ todo table is ready");
  } catch (err) {
    console.error("X error creating table: ", err);
  }
};

export default pool;
