const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

// Create a MySQL connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "registration_db", // Replace with your database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Register route
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert the user data into the database
  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }

    console.log("User registered successfully:", result);
    res.status(200).json({ message: "Registration Successful!" });
  });
});



// Login route
// Login route (plaintext password comparison)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required." });
  }

  // Query to find user by email
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = results[0];

    // Compare plaintext password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Password matches, return success response
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: "customer", // Default role
    });
  });
});

//user settings
// Get User Data
// Fetch User Data
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT username, email, password FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(results[0]);
  });
});

// Update User Data
router.put("/update", (req, res) => {
  console.log("Received data:", req.body);
  const { userId, username, email, password } = req.body;

  if (!userId || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
  db.query(query, [username, email, password, userId], (err, results) => {
    if (err) {
      console.error("Error updating user data:", err);
      return res.status(500).json({ message: "Error updating user data." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User details updated successfully!" });
  });
});



module.exports = router;

