const db = require('../config/database');

const viewScansDentist = async (req, res) => {
  try {
    const result = await db.execute({ sql: "SELECT * FROM scans" });
    const scans = result.rows;

    res.status(200).json({ scans });
  } catch (error) {
    console.error("Error fetching scans:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = viewScansDentist;
