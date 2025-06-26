import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import MainLayout from '../layout/MainLayout';



const Register = lazy(() => import('../pages/auth/Register'))
const Login = lazy(() => import('../pages/auth/Login'))
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const Users = lazy(() => import('../pages/users/Users'))

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        {/* <Route path="/register/:token" element={<PublicRoute><Register /></PublicRoute>} /> */}
        <Route path="/register/:token" element={<PublicRoute><Register /></PublicRoute>} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/users" element={ <ProtectedRoute allowedRoles={['super_admin', 'admin']}> <Users /> </ProtectedRoute> }/>
          {/*  d'autres routes protégées ici */}
        </Route>

        {/* <Route path="*" element={<Navigate to="/NotFoundPage" />} /> */}
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes;