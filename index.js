import express from "express";
import dotenv from "dotenv";
import pool, { initDB } from "./db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON bodies (Required to read req.body)

app.use(express.json());

initDB();

app.get("/", (req, res) => {
  res.send("Database and table are initialized");
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  try {
    const queryText = `
    INSERT INTO Todo (title, description) 
    VALUES ($1, $2)
    RETURNING *;
    `;
    const values = [title, description || null];

    const result = await pool.query(queryText, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting todo", err);
    res.status(500).json({ error: "internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
