const { Client } = require("pg");
const client = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await client.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new todo
app.post("/todos", async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const newTodo = await client.query(
      "INSERT INTO todos (title, description, completed) VALUES($1, $2, $3) RETURNING *",
      [title, description, completed]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedTodo = await client.query(
      "UPDATE todos SET description = $1 WHERE id = $2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await client.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
