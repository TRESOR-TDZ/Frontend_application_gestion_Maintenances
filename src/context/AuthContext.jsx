import { createContext, useContext, useState, useEffect} from 'react';
import api from '../config/axios';
import { useNavigate } from 'react-router-dom';

// creation du context authentification
const AuthContext = createContext();

// fournisseur de contexte authentification
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

// Vérifier le token et charger l'utilisateur
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          try {
            const { data } = await api.get('/auth/me');
            // Gérer le cas où l'utilisateur peut être à la racine ou dans un champ user
            const userData = data.user || data;
            if (userData) {
              setUser(userData);
              setIsAuthenticated(true);
            } else {
              logout();
            }
          } catch (err) {
            if (err.response?.status === 401) {
              logout();
            } else {
              setError(err.response?.data?.message || 'Erreur survenue lors de la récupération du token');
              logout();
            }
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        logout();
        setError(err.response?.data?.message || 'Erreur survenue lors de la vérification d\'authentification');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // connexion
  const login = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', credentials);
      if (!data.access_token) {
        throw new Error('Token d\'accès manquant dans la réponse');
      }
      if (!data.user) {
        throw new Error('Utilisateur manquant dans la réponse');
      }
      
      localStorage.setItem('token', data.access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      setUser(data.user);
      setIsAuthenticated(true);
      setError(null);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (err.response?.status === 401 ? 'Identifiants invalides' : 
        (err.response?.status === 403 ? 'Accès non autorisé' : 
        err.message || 'Erreur de connexion'));
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }

// deconnexion
  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  // inviter un utilisateur
const inviteUser = async (email, role) => {
  try {
    const { data } = await api.post('/users/invite', { email, role })
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message || "Échec de l'invitation")
  }
};

// mettre a jour un utilisateur 
const updateUser = async (userId, userData) => {
  try {
    const { data } = await api.put(`/users/${userId}`, userData)
    setUser(current => current?.id === userId ? data : current)
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message || "Échec de la mise à jour")
  }
};


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, logout, inviteUser, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit etre utilisee dans un AuthProvider');
  };
  return context;
};

