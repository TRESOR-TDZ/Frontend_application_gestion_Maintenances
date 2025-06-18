import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Si l'utilisateur est en cours de vérification, afficher le spinner de chargement
  if (loading) {
    return <LoadingSpinner />;
  }

  // si utilisateur pas authentifie, retourner vers le login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // si role user pas autorise, rediriger vers dashbord 
  if (allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/dashboard" replace />
  }
// si tout est bon afficher le contenu de la route protegee 
  return children;
}

export default ProtectedRoute;