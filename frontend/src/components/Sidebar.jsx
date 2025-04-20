import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      setRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{
      width: '200px',
      height: '100vh',
      background: '#f0f0f0',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3>Menu</h3>
        {(role === 'kepala_subdirektorat' || role === 'kepala_seksi') && (
          <>
            <div><Link to="/dashboard">Dashboard</Link></div>
            <div><Link to="/daftar-pengaduan">Daftar Pengaduan</Link></div>
          </>
        )}

        {role === 'petugas_dashboard' && (
          <div><Link to="/input-pengaduan">Input Pengaduan</Link></div>
        )}
      </div>

      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;