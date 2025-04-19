// src/RequireAuth.jsx
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('💾 token:', token);
  console.log('👤 user:', user);
  console.log('🔐 allowedRoles:', allowedRoles);

  if (!token || !user) {
    console.log('🚫 Belum login. Redirect ke "/"');
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log('🚫 Role tidak diizinkan:', user.role);
    return <Navigate to="/" replace />;
  }

  console.log('✅ Akses diizinkan. Render halaman.');
  return children;
};


  return children;
};

export default RequireAuth;