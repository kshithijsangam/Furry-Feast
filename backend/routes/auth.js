const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

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

module.exports = router;
