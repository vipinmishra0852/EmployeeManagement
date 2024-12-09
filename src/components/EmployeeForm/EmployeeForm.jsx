import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  updateEmployee,
  fetchEmployeeById,
} from "../../services/api";
import { TextField, Button, Box, Typography } from "@mui/material";

const EmployeeForm = () => {
  const { id } = useParams(); // Get the employee ID from the route parameters
  const navigate = useNavigate(); // Use `useNavigate` for programmatic navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  // Fetch employee data for editing if `id` exists
  useEffect(() => {
    if (id) {
      fetchEmployeeById(id).then((data) => setFormData(data));
    }
  }, [id]);

  // Handle form submission for both create and update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateEmployee(id, formData).then(() => navigate("/employees"));
    } else {
      createEmployee(formData).then(() => navigate("/employees"));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "400px",
        margin: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h5" textAlign="center">
        {id ? "Edit Employee" : "Add New Employee"}
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        type="email"
      />
      <TextField
        label="Department"
        name="department"
        value={formData.department}
        onChange={(e) =>
          setFormData({ ...formData, department: e.target.value })
        }
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default EmployeeForm;
