import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
  useTheme,
  alpha,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// Import Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import baseURL from "../../../utils/baseUrl";


const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/availTrainer/get-all-trainers`);
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/update-trainer/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;

    try {
      await axios.delete(`${baseURL}/availTrainer/delete-trainer/${id}`);
      setTrainers(trainers.filter((trainer) => trainer._id !== id));
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 3,
          background: theme.palette.background.paper,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)'
        }}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            pb: 2
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 28 }} />
            Trainer Management
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/create-trainer")}
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1
            }}
          >
            Add New Trainer
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 8 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <TableContainer sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                  <TableCell sx={{ fontWeight: 600, py: 2 }}>Trainer</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Contact Info</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sessions</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainers.length > 0 ? (
                  trainers.map((trainer) => (
                    <TableRow 
                      key={trainer._id}
                      hover
                      sx={{
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.02)
                        }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{ 
                              width: 45, 
                              height: 45,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main
                            }}
                          >
                            {trainer.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {trainer.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2">{trainer.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2">{trainer.phone}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<FitnessCenterIcon sx={{ fontSize: '16px !important' }} />}
                          label={`${trainer.sessions} Sessions`}
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(theme.palette.success.main, 0.1),
                            color: theme.palette.success.main,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Tooltip title="Edit Trainer">
                            <IconButton 
                              onClick={() => handleEdit(trainer._id)}
                              size="small"
                              sx={{ 
                                color: theme.palette.primary.main,
                                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) }
                              }}
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Trainer">
                            <IconButton 
                              onClick={() => handleDelete(trainer._id)}
                              size="small"
                              sx={{ 
                                color: theme.palette.error.main,
                                '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) }
                              }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={4} 
                      align="center" 
                      sx={{ 
                        py: 8,
                        backgroundColor: alpha(theme.palette.primary.main, 0.02)
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <PersonOutlineIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          No trainers found
                        </Typography>
                        <Button
                          onClick={() => navigate("/admin/create-trainer")}
                          variant="outlined"
                          startIcon={<AddCircleOutlineIcon />}
                          sx={{ mt: 1, textTransform: 'none' }}
                        >
                          Add Your First Trainer
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default TrainerList;
