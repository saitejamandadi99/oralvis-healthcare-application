const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.resolve(__dirname, 'oralvis.db');

const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database
})
  .then((db) => {
    console.log('Connected to the SQLite database.');
    return db;
  })
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
    process.exit(1);
  });

module.exports = dbPromise;
