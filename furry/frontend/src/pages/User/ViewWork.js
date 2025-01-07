import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewWork = () => {
  const navigate = useNavigate();
  const [workItems, setWorkItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/works");
        setWorkItems(response.data); // Assuming the backend is sending the work items without image URL
        setLoading(false);
      } catch (error) {
        console.error("Error fetching works:", error);
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  const handleBack = () => {
    navigate("/user-dashboard");
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", padding: "2rem" }}>
        <Typography variant="h5">Loading works...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to bottom, #e9f1f7, #c5d8e8)", padding: "2rem" }}>
      <AppBar position="static" sx={{ background: "#3f0071" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", textTransform: "uppercase" }}>
            View Work
          </Typography>
          <Button color="inherit" onClick={handleBack} sx={{ fontWeight: "bold", textTransform: "none" }}>
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: "1200px", margin: "2rem auto", textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: "2rem", fontWeight: "bold", color: "#444" }}>
          Our Work Portfolio
        </Typography>
        <Grid container spacing={4}>
          {workItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  background: "#ffffff",
                  borderRadius: "15px",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  padding: "1.5rem",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewWork;
