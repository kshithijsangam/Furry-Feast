import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const ManageVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch volunteers from API
  const fetchVolunteers = () => {
    axios
      .get("/api/volunteers") // Replace with your API endpoint
      .then((response) => setVolunteers(response.data))
      .catch((error) => console.error("Error fetching volunteers:", error));
  };

  useEffect(() => {
    fetchVolunteers();
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
      return; // Prevent submission if validation fails
    }

    const newVolunteer = { name, role, contact };

    axios
      .post("/api/volunteers", newVolunteer) // Replace with your API endpoint
      .then((response) => {
        setName("");
        setRole("");
        setContact("");
        setErrors({});
        fetchVolunteers(); // Fetch updated list of volunteers
      })
      .catch((error) => console.error("Error adding volunteer:", error));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{
          padding: "10px 15px",
          background: "#6c757d",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Back
      </button>

      <h1 style={{ textAlign: "center" }}>Volunteer Management</h1>

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
        <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {errors.role && <span style={{ color: "red" }}>{errors.role}</span>}
        </div>
        <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
          <label>Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
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
            onClick={() => setSelectedVolunteer(volunteer)}
            style={{
              cursor: "pointer",
              padding: "15px",
              background: selectedVolunteer?.id === volunteer.id ? "#e7f3ff" : "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <strong>{volunteer.name}</strong>
            <p>{volunteer.role}</p>
            <p>{volunteer.contact || "N/A"}</p>
          </li>
        ))}
      </ul>

      {/* Volunteer Details */}
      {selectedVolunteer && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            background: "#f9f9f9",
          }}
        >
          <h3>Volunteer Details</h3>
          <p><strong>Name:</strong> {selectedVolunteer.name}</p>
          <p><strong>Role:</strong> {selectedVolunteer.role}</p>
          {selectedVolunteer.contact && <p><strong>Contact:</strong> {selectedVolunteer.contact}</p>}
        </div>
      )}
    </div>
  );
};

export default ManageVolunteer;
