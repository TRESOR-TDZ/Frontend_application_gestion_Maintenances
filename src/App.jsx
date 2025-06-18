import AuthProvider from './context/AuthContext';
import SearchProvider from './context/SearchContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <AppRoutes />
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;

  
