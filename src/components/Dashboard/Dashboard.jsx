import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  Card,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// Register required components for the chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]); // Employee data state
  const [totalEmployees, setTotalEmployees] = useState(0); // Total employees state
  const [recentlyJoined, setRecentlyJoined] = useState(""); // Recently joined employee
  const [chartData, setChartData] = useState(null); // Dynamic chart data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for adding an employee
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
  }); // New employee state

  // Fetch employee data from the API
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    setLoading(true);
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        if (Array.isArray(data)) {
          setEmployeeData(data);
          setTotalEmployees(data.length);

          if (data.length > 0) {
            setRecentlyJoined(data[data.length - 1].name);
          }

          const departmentCounts = data.reduce((acc, emp) => {
            acc[emp.department] = (acc[emp.department] || 0) + 1;
            return acc;
          }, {});

          const labels = Object.keys(departmentCounts);
          const counts = Object.values(departmentCounts);

          setChartData({
            labels,
            datasets: [
              {
                label: "# of Employees",
                data: counts,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#8A2BE2",
                  "#32CD32",
                ],
                hoverBackgroundColor: [
                  "#FF6384AA",
                  "#36A2EBAA",
                  "#FFCE56AA",
                  "#8A2BE2AA",
                  "#32CD32AA",
                ],
              },
            ],
          });
        } else {
          setError("No employees found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        setError("Error fetching employee data.");
      })
      .finally(() => setLoading(false));
  };

  const handleAddEmployee = () => {
    fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then(() => {
        setNewEmployee({ name: "", email: "", department: "" });
        setOpenDialog(false);
        fetchEmployeeData(); // Refresh employee data
      })
      .catch((error) => {
        console.error("Error adding new employee:", error);
      });
  };

  // If data is loading, show a loading message
  if (loading) return <p>Loading data...</p>;

  // If there was an error, display the error message
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {/* Dashboard Title */}
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Company Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the company dashboard. Here, you can track employee
          statistics, including total employees, recently joined members, and
          department-wise distribution. Utilize this data for better workforce
          management and strategic planning.
        </Typography>
      </Grid>

      {/* Total Employees Card */}
      <Grid item xs={12} sm={6}>
        <Card style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Total Employees
          </Typography>
          <Typography variant="h4" color="primary">
            {totalEmployees}
          </Typography>
          <Typography variant="body2">
            This is the total number of employees currently active in the
            company across all departments.
          </Typography>
        </Card>
      </Grid>

      {/* Recently Joined Card */}
      <Grid item xs={12} sm={6}>
        <Card style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Recently Joined
          </Typography>
          <Typography variant="h4" color="secondary">
            {recentlyJoined || "No recent hires"}
          </Typography>
          <Typography variant="body2">
            This section highlights the most recently added employee to the
            company's workforce. Stay updated with new team members.
          </Typography>
        </Card>
      </Grid>

      {/* Pie Chart */}
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 4 }}
      >
        {chartData ? (
          <Box sx={{ width: "60%", maxWidth: "400px" }}>
            <Pie data={chartData} />
          </Box>
        ) : (
          <Typography variant="body1">
            No data available for the chart.
          </Typography>
        )}
      </Grid>

      {/* Add New Employee Button */}
      <Grid item xs={12} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Add New Employee
        </Button>
      </Grid>

      {/* Dialog for Adding a New Employee */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddEmployee}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Dashboard;
