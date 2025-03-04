import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const BranchList = ({ refresh }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, [refresh]); // Refresh list when a new branch is created

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/branch/get-all-branches");
      setBranches(response.data.branch);
    } catch (error) {
      console.error("Error fetching branches", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBranch = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/branch/delete-branch/${id}`);
      setBranches(branches.filter((branch) => branch._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting branch", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Branch List</Typography>
        <Button component={Link} to="/admin/create-branch" variant="contained" color="primary">
          Create Branch
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches.length > 0 ? (
                branches.map((branch) => (
                  <TableRow key={branch._id} hover>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.email}</TableCell>
                    <TableCell>{branch.contact}</TableCell>
                    <TableCell>{branch.place}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/admin/update-branch/${branch._id}`}
                        variant="outlined"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteBranch(branch._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3, fontStyle: "italic", color: "gray" }}>
                    No branches found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default BranchList;
