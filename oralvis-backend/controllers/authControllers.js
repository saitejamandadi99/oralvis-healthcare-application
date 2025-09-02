const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user exists
    const result = await db.execute({
      sql: "SELECT * FROM userDetails WHERE email = ?",
      args: [email],
    });

    if (result.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.execute({
      sql: "INSERT INTO userDetails (username, email, password, role) VALUES (?, ?, ?, ?)",
      args: [username, email, hashedPassword, role],
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.execute({
      sql: "SELECT * FROM userDetails WHERE email = ?",
      args: [email],
    });

    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: "User with this email does not exist." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "Login successfully", userDetails: user, token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
