// src/RequireAuth.jsx
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');

  let user = null;
  try {
    user = JSON.parse(userString);
  } catch (err) {
    console.error('Gagal parsing user dari localStorage:', err);
  }

  console.log('===[DEBUG RequireAuth]===');
  console.log('Token:', token);
  console.log('User:', user);
  console.log('Allowed roles:', allowedRoles);

  if (!token || !user) {
    console.warn('User tidak login. Redirect ke halaman login.');
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.warn('Role tidak diizinkan:', user.role);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;