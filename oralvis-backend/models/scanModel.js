const dbPromise = require('../config/database');
async function createScansTable(){
    const db = await dbPromise; 
    const createScansTableQuery = `
    create table if not exists scans(
    id integer primary key AUTOINCREMENT,
    patientName text not null,
    patientId text not null, 
    scanType text not null,
    region text not null,
    imageUrl text not null,
    uploadDate datetime default CURRENT_TIMESTAMP
    )`;
    await db.run(createScansTableQuery);

}

createScansTable().catch(err=>{
    console.error("Error creating scans table:", err);
})

module.exports = {
    createScansTable
};