import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Managework() {
  const [works, setWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentWork, setCurrentWork] = useState({
    id: null,
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all works from the backend
  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/works");
      console.log('Fetched Works:', response.data); // Check the fetched data
      setWorks(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch works. Please try again later.");
      console.error("Error fetching works:", error);
    }
  };

  const handleOpen = (work = { id: null, title: "", description: "" }) => {
    setCurrentWork(work);
    setOpen(true);
  };

  const handleClose = () => {
    console.log('Closing modal');
    setOpen(false);
    setCurrentWork({ id: null, title: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWork({ ...currentWork, [name]: value });
  };

  const handleSave = async () => {
    console.log('Save button clicked');
    console.log('Current Work:', currentWork);

    try {
      if (currentWork.id) {
        // Update the existing work
        await axios.put(
          `http://localhost:5000/api/works/${currentWork.id}`,
          currentWork
        );
      } else {
        // Add a new work
        await axios.post("http://localhost:5000/api/works", currentWork);
      }
      fetchWorks(); // Fetch the updated list of works
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error saving work:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/works/${id}`);
      fetchWorks();
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f4f9", minHeight: "100vh" }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/AdminDashboard")}
        sx={{
          backgroundColor: "#34495e",
          color: "#ecf0f1",
          "&:hover": { backgroundColor: "#2c3e50" },
          mb: 2,
        }}
      >
        Back to Dashboard
      </Button>

      <Typography variant="h4" sx={{ textAlign: "center", mb: 2, color: "#34495e" }}>
        Manage Work
      </Typography>

      <Button
        variant="contained"
        onClick={() => handleOpen()}
        sx={{
          backgroundColor: "#1abc9c",
          color: "#fff",
          "&:hover": { backgroundColor: "#16a085" },
          mb: 3,
        }}
      >
        Add Work
      </Button>

      {error ? (
        <Typography variant="body1" sx={{ color: "red", textAlign: "center" }}>
          {error}
        </Typography>
      ) : works.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", color: "#7f8c8d" }}>
          No works available. Add a new work to get started.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {works.map((work) => (
                <TableRow key={work.id}>
                  <TableCell>{work.id}</TableCell>
                  <TableCell>{work.title}</TableCell>
                  <TableCell>{work.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(work)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(work.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentWork.id ? "Edit Work" : "Add Work"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={currentWork.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={currentWork.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: "#1abc9c", color: "#fff", "&:hover": { backgroundColor: "#16a085" } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Managework;
