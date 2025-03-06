import { useEffect, useState } from "react";
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Avatar } from "@mui/material";
import axios from "axios";

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching logs...");
        axios.get("http://localhost:8000/api/v1/logs/get-all-logs")
            .then(response => {
                console.log("Logs response:", response.data);
                setLogs(response.data.logs);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching logs:", error);
                setLoading(false);
            });
    }, []);

    return (
        <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                PSP <span style={{ color: "#FFAC1C" }}>Logs</span>
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : logs.length === 0 ? (
                <Typography variant="h5" color="gray">0 users in the gym</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ backgroundColor: "#212121", color: "white" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell sx={{ color: "#FFAC1C", fontWeight: "bold" }}>User</TableCell>
                                <TableCell sx={{ color: "#FFAC1C", fontWeight: "bold" }}>Date</TableCell>
                                <TableCell sx={{ color: "#FFAC1C", fontWeight: "bold" }}>Time In</TableCell>
                                <TableCell sx={{ color: "#FFAC1C", fontWeight: "bold" }}>Time Out</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map((log) => {
                                console.log("Log user image:", log.userId?.image);
                                return (
                                    <TableRow key={log._id}>
                                        <TableCell>
                                        <Avatar src={log.userId?.image && Array.isArray(log.userId.image) && log.userId.image.length > 0 ? log.userId.image[0].url : "https://via.placeholder.com/50"} />
                                        </TableCell>
                                        <TableCell sx={{ color: "white" }}>{log.userId?.name || "Unknown User"}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{new Date(log.date).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{new Date(log.timeIn).toLocaleTimeString()}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{log.timeOut ? new Date(log.timeOut).toLocaleTimeString() : "Active"}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default Logs;
