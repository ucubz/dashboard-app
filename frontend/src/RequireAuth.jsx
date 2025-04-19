// components/RequireAuth.jsx
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Jika tidak login, redirect ke halaman login
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Jika role tidak sesuai, redirect ke halaman default (bisa disesuaikan)
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Jika semua cocok, render children (halaman yang diminta)
  return children;
};

export default RequireAuth;