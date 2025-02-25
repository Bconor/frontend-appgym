import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Cambia esto por la URL de tu backend

// Función para obtener datos de progreso
export const fetchProgressData = async (token) => {
  const response = await axios.get(`${API_URL}/progress`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Otras funciones (loginUser, registerUser, etc.)
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};