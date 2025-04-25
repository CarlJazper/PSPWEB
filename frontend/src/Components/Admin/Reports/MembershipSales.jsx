import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import baseURL from "../../../utils/baseURL";

const MembershipSales = () => {
  const [salesData, setSalesData] = useState(null);
  const [transactions, setTransactions] = useState({ today: [], all: [], years: [] });
  const [selectedMonthYear, setSelectedMonthYear] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [selectedYearlyYear, setSelectedYearlyYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState("chart"); // chart | today | monthly | yearly
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [salesResponse, transactionsResponse] = await Promise.all([
          axios.get(`${baseURL}/transaction/membership-sales-stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseURL}/transaction/get-all-transactions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const allTransactions = transactionsResponse.data.transactions;
        const today = new Date().setHours(0, 0, 0, 0);
        const years = [...new Set(allTransactions.map((t) =>
          new Date(t.subscribedDate).getFullYear()))].sort((a, b) => b - a);

        setTransactions({
          today: allTransactions.filter((t) =>
            new Date(t.subscribedDate) >= today),
          all: allTransactions,
          years,
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

  const prepareChartData = () => {
    if (!transactions.all.length) return [];

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      amount: 0,
    }));

    transactions.all.forEach((t) => {
      const date = new Date(t.subscribedDate);
      if (date.getFullYear() === selectedYearlyYear) {
        monthlyData[date.getMonth()].amount += t.amount;
      }
    });

    return monthlyData;
  };

  const prepareCountChartData = () => {
    if (!transactions.all.length) return [];
  
    const monthlyCounts = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      count: 0,
    }));
  
    transactions.all.forEach((t) => {
      const date = new Date(t.subscribedDate);
      if (date.getFullYear() === selectedYearlyYear) {
        monthlyCounts[date.getMonth()].count += 1;
      }
    });
  
    return monthlyCounts;
  };
  

  const getMonthlyTransactions = () =>
    transactions.all.filter(
      (t) =>
        new Date(t.subscribedDate).getFullYear() === selectedMonthYear.year &&
        new Date(t.subscribedDate).getMonth() + 1 === selectedMonthYear.month
    );

  const getYearlyTransactions = () =>
    transactions.all.filter(
      (t) => new Date(t.subscribedDate).getFullYear() === selectedYearlyYear
    );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const renderTable = (data, title) => (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
        <Typography variant="h6">{title}</Typography>
        <Button variant="outlined" onClick={() => setViewMode("chart")}>Back to Chart</Button>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 3, mt: 1 }}>
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
            {data.length ? data.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{t._id.slice(-6)}</TableCell>
                <TableCell>{t.userId?.name || "N/A"}</TableCell>
                <TableCell>{t.userId?.email || "N/A"}</TableCell>
                <TableCell>{formatCurrency(t.amount)}</TableCell>
                <TableCell>{t.transactionType}</TableCell>
                <TableCell>{new Date(t.subscribedDate).toLocaleDateString()}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No transactions</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const yearlyTransactions = getYearlyTransactions();
  const monthlyTransactions = getMonthlyTransactions();

  return (
    <Grid container spacing={2}>
      {/* Summary Cards */}
      <Grid item xs={12} sm={4}>
        <Card onClick={() => setViewMode("today")} sx={{ cursor: "pointer" }}>
          <CardContent>
            <Typography variant="h6">Today's Sales</Typography>
            <Typography variant="h4">{formatCurrency(salesData.todayTotal)}</Typography>
            <Typography variant="caption" color="primary">View Today's Transactions</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card onClick={() => setViewMode("monthly")} sx={{ cursor: "pointer" }}>
          <CardContent>
            <Typography variant="h6">Monthly Sales</Typography>
            <Typography variant="h4">{formatCurrency(salesData.monthlyTotal)}</Typography>
            <Typography variant="caption" color="primary">View Monthly Transactions</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card onClick={() => setViewMode("yearly")} sx={{ cursor: "pointer" }}>
          <CardContent>
            <Typography variant="h6">Yearly Sales</Typography>
            <Typography variant="h4">{formatCurrency(salesData.yearlyTotal)}</Typography>
            <Typography variant="caption" color="primary">View Yearly Transactions</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Chart */}
      {viewMode === "chart" && (
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Sales Trend ({selectedYearlyYear})</Typography>
            <Select
              value={selectedYearlyYear}
              onChange={(e) => setSelectedYearlyYear(Number(e.target.value))}
              size="small"
            >
              {transactions.years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={prepareChartData()}
              margin={{ left: 50, right: 20, top: 20, bottom: 20 }} // 👈 Give left space for currency
            >
              <Line type="monotone" dataKey="amount" stroke="#1976d2" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </LineChart>
          </ResponsiveContainer>

          <Box mt={4}>
            <Typography variant="h6">Transaction Volume ({selectedYearlyYear})</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={prepareCountChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#66bb6a" />
              </BarChart>
            </ResponsiveContainer>
          </Box>


        </Grid>
      )}

      {/* Today Table */}
      {viewMode === "today" && (
        <Grid item xs={12}>
          {renderTable(transactions.today, "Today's Transactions")}
        </Grid>
      )}

      {/* Monthly Table */}
      {viewMode === "monthly" && (
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Select
              value={selectedMonthYear.year}
              onChange={(e) => setSelectedMonthYear((prev) => ({ ...prev, year: +e.target.value }))}
              size="small"
            >
              {transactions.years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
            <Select
              value={selectedMonthYear.month}
              onChange={(e) => setSelectedMonthYear((prev) => ({ ...prev, month: +e.target.value }))}
              size="small"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Total Sales for the Month of
            </Typography>
            <Typography variant="h6" color="primary">
              {new Date(0, selectedMonthYear.month - 1).toLocaleString("default", { month: "long" })} {selectedMonthYear.year}:{" "}
              {formatCurrency(monthlyTransactions.reduce((sum, t) => sum + t.amount, 0))}
            </Typography>
          </Box>

          {renderTable(getMonthlyTransactions(), "Monthly Transactions")}
        </Grid>
      )}

      {/* Yearly Table */}
      {viewMode === "yearly" && (
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Select
              value={selectedYearlyYear}
              onChange={(e) => setSelectedYearlyYear(+e.target.value)}
              size="small"
            >
              {transactions.years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </Box>

          <Box
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Total Sales for
            </Typography>
            <Typography variant="h6" color="primary">
              Year {selectedYearlyYear}: {formatCurrency(yearlyTransactions.reduce((sum, t) => sum + t.amount, 0))}
            </Typography>
          </Box>

          {renderTable(getYearlyTransactions(), "Yearly Transactions")}
        </Grid>
      )}
    </Grid>
  );
};
export default MembershipSales;
