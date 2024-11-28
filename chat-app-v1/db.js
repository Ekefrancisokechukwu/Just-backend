const postgresql = require("pg");
const { Pool } = postgresql;

const db = new Pool({
  user: "postgres",
  database: "test_chatapp",
  password: "ekeSpecter",
  host: "localhost",
  port: 5432,
});

//  function to create  the table MESSAGES IF DOESN'T EXISTS;
const initDB = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      client_offset TEXT UNIQUE,
      content TEXT NOT NULL
    );`);
    console.log("Database initialized and table created (if not existing)");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

// Test connect database connection and initialize
db.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the PostgreSQL database");
    initDB(); // Initialize table db
    release(); // Release the client back to the pool
  }
});

module.exports = db;
