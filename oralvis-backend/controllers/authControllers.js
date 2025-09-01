const dbPromise = require('../config/database');
const {createUserTable} = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register User 
const registerUser = async (req ,res ) =>{
    try{
        const {username, email, password,role} = req.body; 
        const db = await dbPromise;
        const ifuserExists = await db.get(`select * from userDetails where email = ?`,[email]);
        if(ifuserExists){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUserInsert = `Insert into userDetails (username, email, password,role) values(?,?,?,?)`;
        const result = await db.run(newUserInsert,[username,email,hashedPassword,role]);
        const UserId = result.lastID;
        res.status(201).json({message:'User registered successfully',userID:UserId}); //user should login to get token after registration.


    }catch(err){
        console.error("Registration Error:", err);
        res.status(500).json({message:"Server Error"});
    }
}

//login user
const loginUser = async (req,res) =>{ 
    try{
            const {email,password} = req.body;
            const db = await dbPromise; 
            const ifuserExists = await db.get(`select * from userDetails where email = ?`, [email]);
            if(!ifuserExists){
                return res.status(400).json({message:"User with this email does not exist."});
            }
            const isPasswordValid = await bcrypt.compare(password,ifuserExists.password);
            if(!isPasswordValid){
                return res.status(400).json({message:"Invalid password"});
            }
            const token = jwt.sign({id:ifuserExists.id,email,role}, process.env.JWT_SECRET,{expiresIn:'2h'}) //token is used for authentication.
            res.status(200).json({message:'Login successfully',userDetails:ifuserExists, token});
    }
    catch(err){
        console.error("Login Error:", err);
        res.status(500).json({message:"Server Error"});
    }
}

module.exports = {
    registerUser,loginUser
};