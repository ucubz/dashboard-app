import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [role, setRole] = useState('');
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      console.log('Role dari user:', user.role); // Debug
      setRole(user.role);
    }
  }, []);

  const menuStyle = (path) => ({
    display: 'block',
    padding: '10px 20px',
    background: location.pathname === path ? '#e0e0e0' : 'transparent',
    textDecoration: 'none',
    color: '#333',
  });

  const sidebarStyle = {
    width: '200px',
    background: '#f5f5f5',
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <div style={sidebarStyle}>
      <div>
        <h3 style={{ padding: '20px' }}>Menu</h3>

        {(role === 'kepala_subdir' || role === 'kepala_seksi') && (
          <>
            <Link to="/dashboard" style={menuStyle('/dashboard')}>
              Dashboard
            </Link>
            <Link to="/daftar-pengaduan" style={menuStyle('/daftar-pengaduan')}>
              Daftar Pengaduan
            </Link>
          </>
        )}

        {role === 'petugas_dashboard' && (
          <Link to="/input-pengaduan" style={menuStyle('/input-pengaduan')}>
            Input Pengaduan
          </Link>
        )}
      </div>

      <div style={{ padding: '20px' }}>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
          }}
          style={{
            background: 'red',
            color: 'white',
            padding: '8px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;