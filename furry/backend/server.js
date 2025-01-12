// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const authRoutes = require("./routes/auth");


// Load environment variables
dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());




// Set up MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost", 
  user: process.env.DB_USER || "root", 
  password: process.env.DB_PASSWORD || "", 
  database: process.env.DB_NAME || "registration_db", //database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Routes
app.use("/auth", authRoutes);

//dashboard username
app.get('/api/get-username/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT username FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Error fetching username:', err);
          return res.status(500).json({ message: 'Server error. Please try again later.' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ username: results[0].username });
  });
});



// API routes for work management
// Get all works
app.get("/api/works", (req, res) => {
  db.query("SELECT * FROM works", (err, results) => {
    if (err) {
      console.error("Error fetching works:", err);
      return res.status(500).json({ error: "Failed to fetch works" });
    }
    res.json(results);
  });
});

// Add a new work
app.post("/api/works", (req, res) => {
  const { title, description } = req.body;

  // Insert new work into the database
  db.query(
    "INSERT INTO works (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) {
        console.error("Error adding work:", err);
        return res.status(500).json({ error: "Failed to add work" });
      }
      res.json({ id: result.insertId, title, description });
    }
  );
});

// Update an existing work
app.put("/api/works/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Update work in the database
  db.query(
    "UPDATE works SET title = ?, description = ? WHERE id = ?",
    [title, description, id],
    (err, result) => {
      if (err) {
        console.error("Error updating work:", err);
        return res.status(500).json({ error: "Failed to update work" });
      }
      res.json({ id, title, description });
    }
  );
});

// Delete a work
app.delete("/api/works/:id", (req, res) => {
  const { id } = req.params;

  // Delete work from the database
  db.query("DELETE FROM works WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting work:", err);
      return res.status(500).json({ error: "Failed to delete work" });
    }
    res.status(200).json({ message: "Work deleted successfully" });
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// API to add an image
app.post('/api/add-image', (req, res) => {
  const { type, url, title } = req.body; // Extract title from the request body

  if (!type || !url || !title) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  const query = 'INSERT INTO images (type, url, title) VALUES (?, ?, ?)';
  db.query(query, [type, url, title], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Image added successfully', id: result.insertId });
  });
});

// API to fetch all images
app.get('/api/images', (req, res) => {
  const query = 'SELECT * FROM images';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// Delete image by ID
app.delete('/api/delete-image/:id', (req, res) => {
  const { id } = req.params;
  images = images.filter((image) => image.id !== parseInt(id));
  res.status(200).send({ message: 'Image deleted successfully' });
});



// Get all volunteers
app.get("/api/volunteers", (req, res) => {
  db.query("SELECT * FROM volunteers", (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error fetching volunteers" });
    } else {
      res.json(result);
    }
  });
});

// Add a new volunteer
app.post("/api/volunteers", (req, res) => {
  const { name, role, contact } = req.body;
  const sql = "INSERT INTO volunteers (name, role, contact) VALUES (?, ?, ?)";
  db.query(sql, [name, role, contact], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding volunteer" });
    } else {
      res.status(201).json({ message: "Volunteer added successfully" });
    }
  });
});

// Delete a volunteer
app.delete("/api/volunteers/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM volunteers WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error deleting volunteer" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Volunteer not found" });
    } else {
      res.status(200).json({ message: "Volunteer deleted successfully" });
    }
  });
});

// API Endpoint to Add Donation
app.post("/api/add-donation", (req, res) => {
  const { donorName, email, amount, message } = req.body;

  const sql = "INSERT INTO donations (donorName, email, amount, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [donorName, email, amount, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error saving donation");
    } else {
      res.status(200).send("Donation saved successfully");
    }
  });
});

app.get("/api/donations", (req, res) => {
  const sql = "SELECT * FROM donations";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching donations:", err);
      res.status(500).send("Error fetching donations");
    } else {
      res.json(results);
    }
  });
});


// API Routes
// GET all vaccination records
app.get("/api/vaccinations", (req, res) => {
  const query = "SELECT * FROM vaccinations";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching records");
    } else {
      res.json(results);
    }
  });
});

// POST a new vaccination record
app.post("/api/vaccinations", (req, res) => {
  const { petName, vaccineName, vaccinationDate } = req.body;
  const query =
    "INSERT INTO vaccinations (petName, vaccineName, vaccinationDate) VALUES (?, ?, ?)";
  db.query(query, [petName, vaccineName, vaccinationDate], (err, result) => {
    if (err) {
      res.status(500).send("Error saving vaccination record");
    } else {
      res.status(201).json({ id: result.insertId, petName, vaccineName, vaccinationDate });
    }
  });
});

// PUT (update) a vaccination record
app.put("/api/vaccinations/:id", (req, res) => {
  const { petName, vaccineName, vaccinationDate } = req.body;
  const query =
    "UPDATE vaccinations SET petName = ?, vaccineName = ?, vaccinationDate = ? WHERE id = ?";
  db.query(
    query,
    [petName, vaccineName, vaccinationDate, req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating vaccination record");
      } else {
        res.json({ id: req.params.id, petName, vaccineName, vaccinationDate });
      }
    }
  );
});

// DELETE a vaccination record
app.delete("/api/vaccinations/:id", (req, res) => {
  const query = "DELETE FROM vaccinations WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting vaccination record");
    } else {
      res.status(204).send();
    }
  });
});


//veterinary
// Get all records
app.get('/api/veterinary', (req, res) => {
  const query = 'SELECT * FROM veterinary_records';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      res.status(500).send('Error fetching records');
      return;
    }
    res.json(results);
  });
});

// Add a new record
app.post('/api/veterinary', (req, res) => {
  const { name, contact, specialization } = req.body;
  const query = 'INSERT INTO veterinary_records (name, contact, specialization) VALUES (?, ?, ?)';
  db.query(query, [name, contact, specialization], (err, results) => {
    if (err) {
      console.error('Error adding record:', err);
      res.status(500).send('Error adding record');
      return;
    }
    res.json({ id: results.insertId, name, contact, specialization });
  });
});

// Update a record
app.put('/api/veterinary/:id', (req, res) => {
  const { id } = req.params;
  const { name, contact, specialization } = req.body;
  const query = 'UPDATE veterinary_records SET name = ?, contact = ?, specialization = ? WHERE id = ?';
  db.query(query, [name, contact, specialization, id], (err, results) => {
    if (err) {
      console.error('Error updating record:', err);
      res.status(500).send('Error updating record');
      return;
    }
    res.json({ id, name, contact, specialization });
  });
});

// Delete a record
app.delete('/api/veterinary/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM veterinary_records WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting record:', err);
      res.status(500).send('Error deleting record');
      return;
    }
    res.json({ id });
  });
});



// API endpoint to handle form submissions
app.post("/api/rescues", (req, res) => {
  const { name, location, description, contact } = req.body;

  if (!name || !location || !description || !contact) {
    return res.status(400).send({ message: "All fields are required." });
  }

  const query = "INSERT INTO rescues (name, location, description, contact) VALUES (?, ?, ?, ?)";
  db.query(query, [name, location, description, contact], (err) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      return res.status(500).send({ message: "Database error." });
    }
    res.status(200).send({ message: "Rescue data added successfully!" });
  });
});

// API endpoint to fetch all rescues
app.get("/api/rescues", (req, res) => {
  const query = "SELECT * FROM rescues"; // Adjust this query to match your table structure
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send({ message: "Database error." });
    }
    res.status(200).json(results);
  });
});

// API endpoint to delete a rescue record
app.delete("/api/rescues/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM rescues WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting rescue:", err);
      return res.status(500).send({ message: "Failed to delete rescue." });
    }
    if (results.affectedRows > 0) {
      res.status(200).send({ message: "Rescue deleted successfully." });
    } else {
      res.status(404).send({ message: "Rescue not found." });
    }
  });
});


// Manage Pets - Add a Pet
app.post('/api/pets', (req, res) => {
  const { petName, petImg, breed, age, description } = req.body;
  const query = 'INSERT INTO pets (name, image, breed, age, description) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [petName, petImg, breed, age, description], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving pet details');
    } else {
      res.status(200).send('Pet added successfully');
    }
  });
});

// Manage Pets - Get All Pets
app.get('/api/pets', (req, res) => {
  const query = 'SELECT id, name AS petName, image AS petImg, breed, age, description FROM pets';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching pets');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/pets', (req, res) => {
  const query = 'SELECT id, name, image, breed, age, description, adopted FROM pets';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

///view adopt
// Route to get all available pets
app.get('/api/pets', (req, res) => {
  const query = 'SELECT * FROM pets WHERE id NOT IN (SELECT petId FROM adoptions)';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching pets' });
    } else {
      res.json(result);
    }
  });
});

// Route to get details of a single pet
app.get('/api/pet/:id', (req, res) => {
  const petId = req.params.id;
  const query = 'SELECT * FROM pets WHERE id = ?';
  
  db.query(query, [petId], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching pet details' });
    } else {
      res.json(result[0]);
    }
  });
});

// Route to submit adoption request
app.post('/api/adopt', (req, res) => {
  const { userName, email, phone, petId, petName, petBreed } = req.body;

  if (!userName || !email || !phone || !petId || !petName || !petBreed) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO adoptions (userName, email, phone, petId, petName, petBreed, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const status = 'Pending'; // Set default status as "Pending"

  db.query(query, [userName, email, phone, petId, petName, petBreed, status], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error submitting adoption request' });
    } else {
      res.json({ message: 'Adoption request submitted successfully' });
    }
  });
});

// Route to get adopted pets by user
app.get('/api/adoptions/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT petId FROM adoptions WHERE userId = ?';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching adopted pets' });
    } else {
      res.json(results);
    }
  });
});


//manage pet request
// API endpoint to fetch adoption requests
// API endpoint to fetch adoption requests
// API endpoint to fetch adoption requests
app.get("/api/adoption-requests", (req, res) => {
  const query = "SELECT id, userName, email, phone, petId, petName, petBreed, status FROM adoptions";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching adoption requests:", err);
      return res.status(500).json({ error: "Failed to fetch adoption requests" });
    }
    res.status(200).json(results);
  });
});

// API endpoint to approve an adoption request
app.put("/api/adoption-requests/:id/approve", (req, res) => {
  const requestId = req.params.id;
  const query = "UPDATE adoptions SET status = 'Approved' WHERE id = ?";

  db.query(query, [requestId], (err, result) => {
    if (err) {
      console.error("Error approving adoption request:", err);
      return res.status(500).json({ error: "Failed to approve adoption request" });
    }
    res.status(200).json({ message: "Request approved successfully" });
  });
});

// API endpoint to reject an adoption request
app.put("/api/adoption-requests/:id/reject", (req, res) => {
  const requestId = req.params.id;
  const query = "UPDATE adoptions SET status = 'Rejected' WHERE id = ?";

  db.query(query, [requestId], (err, result) => {
    if (err) {
      console.error("Error rejecting adoption request:", err);
      return res.status(500).json({ error: "Failed to reject adoption request" });
    }
    res.status(200).json({ message: "Request rejected successfully" });
  });
});



//user view pet request
    // Fetch data for the specific email
    app.get("/api/user", async (req, res) =>{
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({
          success: false,
          error: "Email is required"
        });
      }
    
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: "Invalid email format"
        });
      }
    
      try {
        // Fetch data for the specific email
        const [results] = await db.execute(
          "SELECT id, userName, email, phone, petId, petName, petBreed, status FROM adoptions WHERE email = ?",
          [email]
        );
    
        // Check if records are found
        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No records found for the provided email"
          });
        }
    
        // Return the matched user's data
        res.json({
          success: true,
          data: results
        });
      } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({
          success: false,
          error: "Server error"
        });
      }
    });

    //settings admin page user data
    // Route to fetch all users
    app.get('/api/users', (req, res) => {
      const query = 'SELECT * FROM users'; // Fetch all user data from the users table
    
      db.query(query, (err, results) => {
          if (err) {
              console.error('Error fetching user data:', err);
              res.status(500).json({ error: 'Failed to fetch user data' });
              return;
          }
          res.json(results); // Return all user data
      });
    });
