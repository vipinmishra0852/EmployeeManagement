import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchEmployees } from "../../services/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // Initial state as an array
  const [filteredEmployees, setFilteredEmployees] = useState([]); // For filtered results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setEmployees(data); // Set employee data from API
        setFilteredEmployees(data); // Initialize filtered results
        setLoading(false); // Loading complete
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setError("Unable to fetch employees.");
        setLoading(false); // Stop loading on error
      });
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive matching
    setSearchTerm(term);
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
  };

  if (loading) return <p>Loading employees...</p>; // Show loading message
  if (error) return <p>{error}</p>; // Show error message

  return (
    <div>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmployees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>
                <Button component={Link} to={`/employees/${emp.id}`}>
                  Details
                </Button>
                <Button component={Link} to={`/employees/${emp.id}/edit`}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeList;
