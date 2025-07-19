import db from "../db.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getTodos = await db.query("SELECT * FROM todos WHERE user_id = $1", [
      req.userId,
    ]);
    //console.log(getTodos);
    //console.log(getTodos.rows);

    res.json(getTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res) => {
  const { task } = req.body;
  try {
    const insertTodo = await db.query(
      "INSERT INTO todos (user_id, task) VALUES ($1, $2)",
      [req.userId, task]
    );
    res.json({ id: insertTodo.lastID, task, completed: false });
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  console.log(completed);
  try {
    const completedTask = db.query(
      "UPDATE todos SET completed = $1 WHERE id = $2 ",
      [completed, id]
    );
    res.json({ message: "Todo completed" });
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = db.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json({ message: "Todo Deleted successfully " });
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
