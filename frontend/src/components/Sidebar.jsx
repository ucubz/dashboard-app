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
    <div
      className={`sidebar-wrapper ${className}`}
      style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        width: '220px',
        height: '100vh',
        padding: '20px',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {(user.role === 'Kepala Subdirektorat' || user.role === 'Kepala Seksi') && (
            <>
              <SidebarItem to="/dashboard" label="Dashboard" />
              <SidebarItem to="/daftar-pengaduan" label="Daftar Pengaduan" />
            </>
          )}
          {user.role === 'Kepala Subdirektorat' && (
            <SidebarItem to="/daftar-pegawai" label="Daftar Pegawai" />
          )}
          {user.role === 'Petugas Dashboard' && (
            <>
              <SidebarItem to="/input-pengaduan" label="Input Pengaduan" />
              <SidebarItem to="/input-pegawai" label="Input Pegawai" />
            </>
          )}
        </ul>
      </div>

      <div>
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

const SidebarItem = ({ to, label }) => (
  <li style={{ marginBottom: '12px' }}>
    <Link
      to={to}
      style={{
        color: 'white',
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '15px',
        display: 'block',
        padding: '8px 12px',
        borderRadius: '6px'
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#34495e')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
    >
      {label}
    </Link>
  </li>
);

export default Sidebar;
