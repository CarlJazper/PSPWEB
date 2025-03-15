import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import baseURL from '../../../utils/baseURL';

const TrainingSessions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  console.log(users,'Users Data')

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/availTrainer/get-all-trainers`);
        const allTrainings = response.data;

        const activeUsers = await Promise.all(
          allTrainings.map(async (training) => {
            try {
              const sessionRes = await axios.get(`${baseURL}/availTrainer/has-active/${training.userId._id}`);
              if (sessionRes.data.hasActive) {
                return {
                  user: training.userId,
                  coach: training.coachID,
                  sessions: sessionRes.data.training.schedule || [],
                  trainingId: training._id,
                };
              }
              return null;
            } catch (err) {
              return null;
            }
          })
        );

        setUsers(activeUsers.filter(user => user !== null));
      } catch (error) {
        console.error("Error fetching active users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 1500);
    return () => clearInterval(interval);
  }, []);

  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${baseURL}/users/get-all-users?role=coach`);
      setCoaches(response.data.users);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    }
  };

  const handleOpenModal = (trainingId) => {
    setSelectedUserId(trainingId);
    setOpenModal(true);
    fetchCoaches(); // Fetch available coaches when the modal opens
  };

  const handleAssignCoach = async () => {
    if (!selectedCoach || !selectedUserId) return;
    setLoading(true);
    try {
      await axios.put(`${baseURL}/availTrainer/${selectedUserId}`, { coachID: selectedCoach });
      const assignedCoach = coaches.find(c => c._id === selectedCoach);
      setUsers(users.map(user =>
        user.trainingId === selectedUserId
          ? { ...user, coach: assignedCoach }
          : user
      ));
      setOpenModal(false);
    } catch (error) {
      console.error("Error assigning coach:", error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Active Training Sessions
      </Typography>
      {users.length > 0 ? (
        users.map(({ user, coach, sessions, trainingId }) => (
          <Card key={user._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">Client name: {user.name}</Typography>
              <Typography color="textSecondary">Email: {user.email}</Typography>
              <Typography color="green">Has Active Training</Typography>

              {coach ? (
                <>
                  <Typography variant="body2" sx={{ marginTop: 1, fontWeight: "bold" }}>
                    Assigned Coach:
                  </Typography>
                  <Typography color="textSecondary">{coach.name} ({coach.email})</Typography>
                </>
              ) : (
                <>
                  <Typography color="error">No coach assigned</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(trainingId)}>
                    Assign Coach
                  </Button>
                </>
              )}

              {sessions.length > 0 && (
                <Accordion sx={{ marginTop: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2" fontWeight="bold">
                      View Training Sessions ({sessions.length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {sessions.map((session, index) => (
                      <Typography key={index} color="textSecondary" sx={{ paddingLeft: 2 }}>
                        {session.dateAssigned
                          ? `Session ${index + 1}: Scheduled for ${new Date(session.dateAssigned).toLocaleDateString()} - at ${new Date(session.timeAssigned).toLocaleTimeString()} - Status: ${session.status}`
                          : `Session ${index + 1}: Not scheduled`}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No users with active training sessions.</Typography>
      )}

      {/* Assign Coach Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Assign a Coach</DialogTitle>
        <DialogContent>
          <Select
            value={selectedCoach}
            onChange={(e) => setSelectedCoach(e.target.value)}
            fullWidth
          >
            {coaches.map((coach) => (
              <MenuItem key={coach._id} value={coach._id}>
                {coach.name} ({coach.email})
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="error">Cancel</Button>
          <Button onClick={handleAssignCoach} color="primary">Assign</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TrainingSessions;