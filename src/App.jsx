import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import Navbar from "./components/Layout/Navbar";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/add" element={<EmployeeForm />} />
      <Route path="/employees/:id" element={<EmployeeDetails />} />
      <Route path="/employees/:id/edit" element={<EmployeeForm />} />
    </Routes>
  </Router>
);

export default App;
