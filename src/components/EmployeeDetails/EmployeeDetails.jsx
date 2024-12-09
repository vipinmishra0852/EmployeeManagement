import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEmployeeById } from "../../services/api";
import { Card, Typography, CircularProgress } from "@mui/material";

const EmployeeDetails = () => {
  const { id } = useParams(); // Get employee ID from route params
  const [employee, setEmployee] = useState(); // State for employee details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchEmployeeById(id)
      .then((data) => {
        setEmployee(data); // Set the employee data
        setLoading(false); // Loading complete
      })
      .catch((err) => {
        console.error("Error fetching employee details:", err);
        setError("Unable to fetch employee details.");
        setLoading(false); // Stop loading on error
      });
  }, [id]);

  if (loading) return <CircularProgress />; // Show loading spinner
  if (error) return <Typography color="error">{error}</Typography>; // Show error message

  // If employee data is still null, show a fallback
  if (!employee) return <Typography>No employee found for ID {id}.</Typography>;

  return (
    <Card style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">{employee.name}</Typography>
      <Typography>Email: {employee.email}</Typography>
      <Typography>Department: {employee.department}</Typography>
    </Card>
  );
};

export default EmployeeDetails;
