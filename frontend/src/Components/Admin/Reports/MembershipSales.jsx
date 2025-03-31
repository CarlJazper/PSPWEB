import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardContent, Typography, CircularProgress, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, MenuItem, Select, Box
} from "@mui/material";
import baseURL from "../../../utils/baseURL";

const MembershipSales = () => {
  const [salesData, setSalesData] = useState(null);
  const [transactions, setTransactions] = useState({ today: [], all: [], years: [] });
  const [selectedMonthYear, setSelectedMonthYear] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  const [selectedYearlyYear, setSelectedYearlyYear] = useState(new Date().getFullYear()); // Separate yearly filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const formatCurrency = (value) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value);


  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem("token");
        const salesResponse = await axios.get(`${baseURL}/transaction/membership-sales-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transactionsResponse = await axios.get(`${baseURL}/transaction/get-all-transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allTransactions = transactionsResponse.data.transactions;
        const today = new Date().setHours(0, 0, 0, 0);
        const years = [...new Set(allTransactions.map(t => new Date(t.subscribedDate).getFullYear()))];

        setTransactions({
          today: allTransactions.filter(t => new Date(t.subscribedDate) >= today),
          all: allTransactions,
          years: years.sort((a, b) => b - a),
        });

        setSalesData(salesResponse.data);
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

  const monthlyTransactions = transactions.all.filter(
    (t) =>
      new Date(t.subscribedDate).getFullYear() === selectedMonthYear.year &&
      new Date(t.subscribedDate).getMonth() + 1 === selectedMonthYear.month
  );
  const totalMonthlySales = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);

  const yearlyTransactions = transactions.all.filter(
    (t) => new Date(t.subscribedDate).getFullYear() === selectedYearlyYear
  );

  return (
    <Grid container spacing={2}>
      {["todayTotal", "monthlyTotal", "yearlyTotal"].map((key, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">{key.replace("Total", " Sales")}</Typography>
              <Typography variant="h4">{formatCurrency(salesData[key])}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Grid item xs={12}>
        {/* Today's Transactions */}
        <Typography variant="h6" gutterBottom>Today's Transactions</Typography>
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.today.length > 0 ? (
                transactions.today.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell>{t._id.slice(-6)}</TableCell>
                    <TableCell>{t.userId?.name || "N/A"}</TableCell>
                    <TableCell>{t.userId?.email || "N/A"}</TableCell>
                    <TableCell>{formatCurrency(t.amount)}</TableCell>
                    <TableCell>{t.transactionType}</TableCell>
                    <TableCell>{new Date(t.subscribedDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No transactions for today</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Monthly Transactions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Transactions
          </Typography>
          <Typography variant="h6" color="primary">
            Total Sales for {new Date(0, selectedMonthYear.month - 1).toLocaleString("default", { month: "long" })} {selectedMonthYear.year}: {formatCurrency(totalMonthlySales)}
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
          <Box sx={{ padding: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Select
              value={selectedMonthYear.year}
              onChange={(e) => setSelectedMonthYear((prev) => ({ ...prev, year: Number(e.target.value) }))}
              size="small"
              variant="outlined"
            >
              {transactions.years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
            <Select
              value={selectedMonthYear.month}
              onChange={(e) => setSelectedMonthYear((prev) => ({ ...prev, month: Number(e.target.value) }))}
              size="small"
              variant="outlined"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyTransactions.length > 0 ? (
                monthlyTransactions.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell>{t._id.slice(-6)}</TableCell>
                    <TableCell>{t.userId?.name || "N/A"}</TableCell>
                    <TableCell>{t.userId?.email || "N/A"}</TableCell>
                    <TableCell>{formatCurrency(t.amount)}</TableCell>
                    <TableCell>{t.transactionType}</TableCell>
                    <TableCell>{new Date(t.subscribedDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No transactions for this month</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Yearly Transactions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>Yearly Transactions</Typography>
        <Typography variant="h6" color="primary">
          Total Sales for Year {selectedYearlyYear}: {formatCurrency(yearlyTransactions.reduce((sum, t) => sum + t.amount, 0))}
        </Typography>
        </Box>
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
          <Box sx={{ padding: 2 }}>
            <Select
              value={selectedYearlyYear}
              onChange={(e) => setSelectedYearlyYear(Number(e.target.value))}
              size="small"
              variant="outlined"
            >
              {transactions.years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {yearlyTransactions.length > 0 ? (
                yearlyTransactions.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell>{t._id.slice(-6)}</TableCell>
                    <TableCell>{t.userId?.name || "N/A"}</TableCell>
                    <TableCell>{t.userId?.email || "N/A"}</TableCell>
                    <TableCell>{formatCurrency(t.amount)}</TableCell>
                    <TableCell>{t.transactionType}</TableCell>
                    <TableCell>{new Date(t.subscribedDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No transactions for this year</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default MembershipSales;
