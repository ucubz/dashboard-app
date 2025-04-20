// components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{
      width: '220px',
      background: '#f0f0f0',
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3>Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {(role === 'kepala_subdir' || role === 'kepala_seksi') && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/daftar-pengaduan">Daftar Tunggakan</Link></li>
            </>
          )}
          {role === 'petugas_dashboard' && (
            <li><Link to="/input-pengaduan">Input Pengaduan</Link></li>
          )}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: '#d9534f',
          color: 'white',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;