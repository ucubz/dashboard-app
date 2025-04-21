// components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ className = '' }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className={`sidebar-wrapper ${className}`}>
      <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {(user.role === 'Kepala Subdirektorat' || user.role === 'Kepala Seksi') && (
          <>
            <li style={{ marginBottom: '12px' }}>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <Link to="/daftar-pengaduan" style={linkStyle}>Daftar Pengaduan</Link>
            </li>
          </>
        )}

        {user.role === 'Kepala Subdirektorat' && (
          <li style={{ marginBottom: '12px' }}>
            <Link to="/daftar-pegawai" style={linkStyle}>Daftar Pegawai</Link>
          </li>
        )}

        {user.role === 'Petugas Dashboard' && (
          <>
            <li style={{ marginBottom: '12px' }}>
              <Link to="/input-pengaduan" style={linkStyle}>Input Pengaduan</Link>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <Link to="/input-pegawai" style={linkStyle}>Input Pegawai</Link>
            </li>
          </>
        )}
      </ul>

      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 14px',
            backgroundColor: '#e74c3c',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '15px'
};

export default Sidebar;
