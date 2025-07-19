import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Todos",
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err));

export default db;

// import sqlite3 from "sqlite3";

// const db = new sqlite3.Database("mydb.sqlite", (err) => {
//   if (err) {
//     console.error("Failed to connect to database:", err.message);
//   } else {
//     console.log("Connected to SQLite database.");
//   }
// });

// db.serialize(() => {
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS users (
//       id SRIAL PRIMARY KEY AUTOINCREMENT,
//       username TEXT UNIQUE,
//       password TEXT
//     );
//   `);

//   db.exec(`
//     CREATE TABLE IF NOT EXISTS todos (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       user_id INTEGER,
//       task TEXT,
//       completed BOOLEAN DEFAULT 0,
//       FOREIGN KEY(user_id) REFERENCES users(id)
//     );
//   `);
// });

// export default db;
