// components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={{
      width: '220px',
      background: '#f4f4f4',
      padding: '20px',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {(user.role === 'Kepala Subdirektorat' || user.role === 'Kepala Seksi') && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/daftar-pengaduan">Daftar Pengaduan</Link></li>
          </>
        )}
        {user.role === 'Petugas Dashboard' && (
          <li><Link to="/input-pengaduan">Input Pengaduan</Link></li>
        )}
      </ul>

      <div style={{ position: 'absolute', bottom: 20 }}>
        <button onClick={handleLogout} style={{ padding: '8px 12px' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;