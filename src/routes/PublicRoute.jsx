import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function PublicRoute({ children }) {
  const { isAuthenticated, Loading } = useAuth();

  // si lutilisateur est en cours de verification afficher le spinner de chargement
  if (Loading){
    return <LoadingSpinner/>  
    // return <LoadingSpinner fullScreen/>  
  }

  // si utilisateur authentifiee, retourner vers dashboard 
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // sinon afficher le contenu de la route publique 
  return children;
}

export default PublicRoute;