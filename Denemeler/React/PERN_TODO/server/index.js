const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
// Create a todos
app.post("/todos", async (req, res) => {
  try {
    // const value = req.body.description;
    const {description} = req.body;
    const newTodo = await pool.query("insert into todo (description) values($1) returning *", [description]);
    res.json(newTodo.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("select * from todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a todos
app.get("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [id]);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a todos
app.put("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updateTodo = await pool.query("update todo set description = $1 where todo_id = $2", [description, id]);
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a todos
app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("delete from todo where todo_id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

