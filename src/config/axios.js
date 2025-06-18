import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Pour les cookies Laravel Sanctum
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 ) {
      // Gérer la déconnexion si le token est invalide
      localStorage.removeItem('token');
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default api;