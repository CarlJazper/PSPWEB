import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Grid } from "@mui/material";

const MembershipSales = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/v1/transaction/membership-sales-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSalesData(response.data);
      } catch (err) {
        setError("Failed to fetch membership sales data");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={2}>
      {["todayTotal", "monthlyTotal", "yearlyTotal"].map((key, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">{key.replace("Total", " Sales")}</Typography>
              <Typography variant="h4">₱{salesData[key]}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MembershipSales;
