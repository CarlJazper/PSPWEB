import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import baseURL from '../../../utils/baseURL';

const TrainingSessions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/availTrainer/get-all-trainers`); 
        const allTrainings = response.data;

        // Filter users who have active training sessions and include the assigned coach
        const activeUsers = await Promise.all(
          allTrainings.map(async (training) => {
            try {
              const sessionRes = await axios.get(`${baseURL}/availTrainer/has-active/${training.userId._id}`);
              if (sessionRes.data.hasActive) {
                return {
                  user: training.userId,
                  coach: training.coachID, // Assigned coach details
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

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Active Training Sessions
      </Typography>
      {users.length > 0 ? (
        users.map(({ user, coach }) => (
          <Card key={user._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
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
