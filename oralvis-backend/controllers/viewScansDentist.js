const dbPromise = require('../config/database');
const {createScansTable} = require('../models/scanModel');
const {authenticateDentist} = require('../middleware/authMiddleware');

const viewScansDentist = async (req , res) =>{
    try {

        const db = await dbPromise;
        const scans = await db.all(`select * from scans`);
        res.status(200).json({scans});
        
    } catch (error) {
       console.error("Error fetching scans:", error);
       res.status(500).json({message: "Internal Server Error"}); 
    }
}

module.exports = viewScansDentist;