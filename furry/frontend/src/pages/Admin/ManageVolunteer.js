import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch volunteers from API
  const fetchVolunteers = () => {
    axios
      .get("http://localhost:5000/api/volunteers") // Replace with your backend URL
      .then((response) => setVolunteers(response.data))
      .catch((error) => {
        console.error("Error fetching volunteers:", error);
      });
  };

  useEffect(() => {
    fetchVolunteers(); // Fetch volunteers when component mounts
  }, []);

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!role.trim()) newErrors.role = "Role is required.";
    if (contact && !/^[0-9]+$/.test(contact)) {
      newErrors.contact = "Contact must be a valid number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add a new volunteer
  const handleAddVolunteer = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newVolunteer = { name, role, contact };

    // Call the API to add the volunteer
    axios
      .post("http://localhost:5000/api/volunteers", newVolunteer) // Ensure correct endpoint
      .then((response) => {
        console.log("Volunteer added successfully:", response.data);
        setName("");
        setRole("");
        setContact("");
        setErrors({});
        fetchVolunteers(); // Re-fetch the list of volunteers
      })
      .catch((error) => {
        console.error("Error adding volunteer:", error);
      });
  };

  // Delete a volunteer
  const handleDeleteVolunteer = (id) => {
    // Call the API to delete the volunteer
    axios
      .delete(`http://localhost:5000/api/volunteers/${id}`) // Ensure correct endpoint
      .then((response) => {
        console.log("Volunteer deleted successfully:", response.data);
        setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id)); // Update local list
      })
      .catch((error) => {
        console.error("Error deleting volunteer:", error);
      });
  };

  // Handle back button click
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Blue top border and Back button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          borderTop: "5px solid blue",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back
        </button>
        <h1>Manage Volunteers</h1>
      </div>

      {/* Add Volunteer Form */}
      <form
        onSubmit={handleAddVolunteer}
        style={{
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          background: "#f9f9f9",
        }}
      >
        <h2>Add Volunteer</h2>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.role && <span style={{ color: "red" }}>{errors.role}</span>}
        </div>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.contact && <span style={{ color: "red" }}>{errors.contact}</span>}
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Volunteer
        </button>
      </form>

      {/* Volunteer List */}
      <h2>Volunteer List</h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {volunteers.map((volunteer) => (
          <li
            key={volunteer.id}
            style={{
              padding: "15px",
              background: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <strong>{volunteer.name}</strong>
            <p>{volunteer.role}</p>
            <p>{volunteer.contact || "N/A"}</p>
            <button
              onClick={() => handleDeleteVolunteer(volunteer.id)}
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                background: "#ff4d4d",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageVolunteer;
