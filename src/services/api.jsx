import axios from "axios";

const API_URL = "http://localhost:5000/employees";

export const fetchEmployees = async () => {
  const response = await axios.get(API_URL);
  // Ensure the response data is an array
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchEmployeeById = async (id) =>
  (await axios.get(`${API_URL}/${id}`)).data;

export const createEmployee = async (data) =>
  (await axios.post(API_URL, data)).data;

export const updateEmployee = async (id, data) =>
  (await axios.put(`${API_URL}/${id}`, data)).data;

export const deleteEmployee = async (id) =>
  await axios.delete(`${API_URL}/${id}`);
