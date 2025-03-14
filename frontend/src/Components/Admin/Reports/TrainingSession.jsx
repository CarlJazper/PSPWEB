import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import baseURL from '../../../utils/baseURL';

const TrainingSessions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return "Not scheduled";
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Active Training Sessions
      </Typography>
      {users.length > 0 ? (
        users.map(({ user, coach, sessions }) => (
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
                <Typography color="error">No coach assigned</Typography>
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
                          ? `Session ${index + 1}: ${formatDateTime(session.dateAssigned)} - Ends at ${formatDateTime(session.timeAssigned)} - Status: ${session.status}`
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
    </div>
  );
};

export default TrainingSessions;
