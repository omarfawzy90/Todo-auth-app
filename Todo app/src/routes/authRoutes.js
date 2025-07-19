import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    //
    const insertUserQuery = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`;
    const userResult = await db.query(insertUserQuery, [
      username,
      hashedPassword,
    ]);

    const userId = userResult.rows[0].id;

    //
    const defaultTodo = `Hello :) Add your first ToDo`;
    const insertTodoQuery = `INSERT INTO todos (user_id, task) VALUES ($1, $2)`;
    await db.query(insertTodoQuery, [userId, defaultTodo]);

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Get user from database
    const getUserQuery = `SELECT * FROM users WHERE username = $1`;
    const userResult = await db.query(getUserQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(404).send({ message: "User not found!" });
    }

    const user = userResult.rows[0];

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.sendStatus(503);
  }
});

export default router;
