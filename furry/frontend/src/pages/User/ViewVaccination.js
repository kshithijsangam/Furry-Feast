import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewVaccination = () => {
  const navigate = useNavigate();
  const [vaccinationData, setVaccinationData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch vaccination records from the backend
    const fetchVaccinations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vaccinations");
        setVaccinationData(response.data);
      } catch (error) {
        console.error("Error fetching vaccination records:", error);
      }
    };

    fetchVaccinations();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate("/login");
  };

  const filteredData = vaccinationData.filter((record) =>
    record.petName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e6e9f0, #eef1f5)",
        padding: "2rem",
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ background: "#5d34ac" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", textTransform: "uppercase" }}
          >
            View Vaccination Records
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ maxWidth: "1200px", margin: "2rem auto", textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", marginBottom: "1rem" }}
        >
          Vaccination Records
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search by Pet Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            marginBottom: "1.5rem",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        />

        {/* Records Table */}
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Pet Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Vaccine</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.petName}</TableCell>
                  <TableCell>{record.vaccineName}</TableCell>
                  <TableCell>{record.vaccinationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          onClick={() => navigate("/user-dashboard")}
          sx={{
            marginTop: "2rem",
            background: "linear-gradient(145deg, #5d34ac, #9e54ff)",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "10px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(145deg, #5d34ac, #7438f5)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default ViewVaccination;
