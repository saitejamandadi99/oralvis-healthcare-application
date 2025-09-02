const db = require('../config/database');

async function createScansTable() {
  try {
    await db.execute({
      sql: `
      CREATE TABLE IF NOT EXISTS scans(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patientName TEXT NOT NULL,
        patientId TEXT NOT NULL, 
        scanType TEXT NOT NULL,
        region TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `
    });
    console.log("Scans table ready ✅");
  } catch (err) {
    console.error("Error creating scans table:", err);
  }
}

// Initialize table immediately
createScansTable().catch(err => {
  console.error("Error creating scans table:", err);
});

module.exports = {
  createScansTable
};
