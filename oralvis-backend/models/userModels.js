const dbPromise = require('../config/database');

const createUserTable = async () =>{
    const db = await dbPromise;
    const createTablequery = ` 
    CREATE TABLE IF NOT EXISTS userDetails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`
        await db.run(createTablequery);
}

    (createUserTable().catch((err)=>{
    console.error("Error creating user table:", err);
}));

module.exports = {
    createUserTable
};