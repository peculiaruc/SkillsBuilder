import { useAuth } from '../store/authReducer';

import LearnerDashboard from './public/dashboard';
import AdminDashboard from './admin/dashboard';

export default function DashboardProvider() {
  const auth = useAuth();

  return auth.user.role > 1 ? <AdminDashboard /> : <LearnerDashboard />;
}
