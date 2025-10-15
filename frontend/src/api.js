import axios from "axios";

const API_BASE = "http://localhost:8000"; // Change to your backend URL

export const login = (email, password) =>
  axios.post(`${API_BASE}/login`, { email, password });

export const signup = (email, password) =>
  axios.post(`${API_BASE}/signup`, { email, password });

export const getRides = (token) =>
  axios.get(`${API_BASE}/rides`, { headers: { Authorization: `Bearer ${token}` } });

export const bookRide = (rideData, token) =>
  axios.post(`${API_BASE}/book`, rideData, { headers: { Authorization: `Bearer ${token}` } });
