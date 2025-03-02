import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";

const UpdateBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState({ name: "", email: "", contact: "", place: "" });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBranchDetails();
  }, []);

  const fetchBranchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/branch/get-branch/${id}`);
      setBranch(response.data.branch);
    } catch (error) {
      console.error("Error fetching branch details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`http://localhost:8000/api/v1/branch/update-branch/${id}`, branch);
      navigate("/admin/branches"); // Redirect to branch list
    } catch (error) {
      console.error("Error updating branch", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Update Branch
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={branch.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={branch.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contact"
          name="contact"
          value={branch.contact}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location"
          name="place"
          value={branch.place}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={() => navigate("/admin/branches")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={updating}>
            {updating ? "Updating..." : "Update"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default UpdateBranch;
