import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
} from "@mui/material";
import { Delete, Edit, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ManageVaccination = () => {
  const navigate = useNavigate();
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [newVaccination, setNewVaccination] = useState({
    petName: "",
    vaccineName: "",
    vaccinationDate: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVaccinations();
  }, []);

  const fetchVaccinations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vaccinations");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setVaccinationRecords(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching vaccination records. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccination({ ...newVaccination, [name]: value });
  };

  const handleSave = async () => {
    const { petName, vaccineName, vaccinationDate } = newVaccination;

    if (!petName || !vaccineName || !vaccinationDate) {
      setError("All fields are required.");
      return;
    }

    try {
      const url = editId
        ? `http://localhost:5000/api/vaccinations/${editId}`
        : "http://localhost:5000/api/vaccinations";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVaccination),
      });

      if (!response.ok) throw new Error("Failed to save data.");

      fetchVaccinations(); // Reload records
      setNewVaccination({ petName: "", vaccineName: "", vaccinationDate: "" });
      setEditId(null);
      setError("");
    } catch (err) {
      console.error("Error saving data:", err);
      setError("Failed to save the vaccination record. Please try again.");
    }
  };

  const handleEdit = (id) => {
    const record = vaccinationRecords.find((rec) => rec.id === id);
    setNewVaccination(record);
    setEditId(id);
    setError("");
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vaccinations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete record.");

      fetchVaccinations(); // Reload records
    } catch (err) {
      console.error("Error deleting record:", err);
      setError("Failed to delete the vaccination record. Please try again.");
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 1000,
        margin: "auto",
        background: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <IconButton onClick={handleBack} sx={{ marginBottom: 2 }}>
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ marginBottom: 3, fontWeight: "bold", color: "#333" }}
      >
        Manage Vaccination Records
      </Typography>

      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          sx={{ marginBottom: 2 }}
        >
          {error}
        </Alert>
      )}

      <Box
        sx={{
          margin: "20px 0",
          padding: 2,
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#555" }}
        >
          {editId ? "Edit Vaccination Record" : "Add New Vaccination Record"}
        </Typography>

        <TextField
          label="Pet Name"
          name="petName"
          value={newVaccination.petName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Vaccine Name"
          name="vaccineName"
          value={newVaccination.vaccineName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Vaccination Date"
          name="vaccinationDate"
          type="date"
          value={newVaccination.vaccinationDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            padding: "10px 20px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {editId ? "Update Record" : "Add Record"}
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: 4,
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Pet Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Vaccine Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Vaccination Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccinationRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.petName}</TableCell>
                <TableCell>{record.vaccineName}</TableCell>
                <TableCell>{record.vaccinationDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(record.id)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(record.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageVaccination;
