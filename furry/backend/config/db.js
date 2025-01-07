const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // XAMPP MySQL host
  user: "root",      // Default username
  password: "",      // Default password (leave blank if none)
  database: "registration_db", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to MySQL database.");
});

module.exports = db;
