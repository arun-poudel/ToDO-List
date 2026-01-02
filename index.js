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
    INSERT INTO todo (title, description) 
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

// GET Route to fetch all todos

app.get("/todos/all", async (req, res) => {
  try {
    const queryText = `
    SELECT * FROM todo ORDER BY created_at DESC;
    `;
    const result = await pool.query(queryText);

    res.status(200).json({
      count: result.rowCount,
      todos: result.rows,
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "internal server error" });
  }
});

// UPDATE Route -Update a specific todo by ID

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const queryText = `
    UPDATE todo
    SET 
      title =  COALESCE($1, title),
      description = COALESCE($2, description),
      completed = COALESCE($3, completed)

    WHERE id = $4
    RETURNING *;
    `;
    const values = [title, description, completed, id];
    const result = await pool.query(queryText, values);

    // IF result.rows is empty, it means the ID wasn't found

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({
      mmessage: "Todo update successfully",
      todo: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "internal server error" });
  }
});

// Delete Route - Remove a specific todo by ID
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const queryText = `
    DELETE FROM todo
    WHERE 
    id = $1 
    RETURNING *;
    `;
    const result = await pool.query(queryText, [id]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "todo is not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      deletedTodo: result.rows[0],
    });
  } catch (err) {
    console.error("Error Deleting todo:", err);
    res.status(500).json({ error: "internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
