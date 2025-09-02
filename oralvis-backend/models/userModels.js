const db = require('../config/database');

const createUserTable = async () => {
  try {
    await db.execute({
      sql: `
      CREATE TABLE IF NOT EXISTS userDetails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `
    });
    console.log("User table ready ✅");
  } catch (err) {
    console.error("Error creating user table:", err);
  }
};

// Initialize table immediately
createUserTable().catch(err => {
  console.error("Error creating user table:", err);
});

module.exports = {
  createUserTable
};
