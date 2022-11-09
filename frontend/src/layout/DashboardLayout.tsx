import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authReducer';

export default function DashboardLayout() {
  const auth = useAuth();

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
