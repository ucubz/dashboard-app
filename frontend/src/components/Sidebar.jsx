// components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{
      width: '220px',
      backgroundColor: '#f0f0f0',
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3>Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {(userRole === 'kepala_subdir' || userRole === 'kepala_seksi') && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/daftar-pengaduan">Daftar Pengaduan</Link></li>
            </>
          )}
          {userRole === 'petugas_dashboard' && (
            <li><Link to="/input-pengaduan">Input Pengaduan</Link></li>
          )}
        </ul>
      </div>

      <div>
        <button onClick={handleLogout} style={{ width: '100%', padding: '8px', marginTop: '30px' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;