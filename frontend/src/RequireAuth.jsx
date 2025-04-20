import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  const userRole = user.role?.toLowerCase().replace(/\s/g, '_');

  if (!allowedRoles.includes(userRole)) {
    console.warn('⛔ Akses ditolak untuk role:', user.role);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;