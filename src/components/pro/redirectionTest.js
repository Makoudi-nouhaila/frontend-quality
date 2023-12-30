// Dashboard.js

import React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Paper } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      const response = await axios.post(
        "http://localhost:8080/blog/auth/signout"
      );
      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Logout failed.", error);
    }
  };
  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          This is the content of your dashboard page. You can add more
          components and features here.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Dashboard;
