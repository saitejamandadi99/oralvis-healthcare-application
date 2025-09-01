const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('OralVis Backend is running.');
})
//404 handler 
app.use((req,res)=>{
    res.status(404).json({message:'Route not found'});
})
//error handler to catch the errors.
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).json({message:err.message});
})
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
