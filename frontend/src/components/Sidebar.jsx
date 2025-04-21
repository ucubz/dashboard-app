import { useNavigate, Link } from 'react-router-dom';

const Sidebar = ({ show = true, onClose = () => {} }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) return null;

  const role = user.role;
  const isMobile = window.innerWidth <= 768;

  const sidebarStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    width: '220px',
    height: '100vh',
    padding: '20px',
    position: 'fixed',
    top: 0,
    left: isMobile ? (show ? 0 : '-240px') : 0,
    transition: 'left 0.3s ease-in-out',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
    display: 'block',
    padding: '8px 12px',
    borderRadius: '6px'
  };

  const SidebarItem = ({ to, label }) => (
    <li style={{ marginBottom: '12px' }}>
      <Link
        to={to}
        style={linkStyle}
        onClick={onClose}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#34495e')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <div style={sidebarStyle}>
      <div>
        <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {(role === 'Kepala Subdirektorat' || role === 'Kepala Seksi') && (
            <>
              <SidebarItem to="/dashboard" label="Dashboard" />
              <SidebarItem to="/daftar-pengaduan" label="Daftar Pengaduan" />
            </>
          )}
          {role === 'Kepala Subdirektorat' && (
            <SidebarItem to="/daftar-pegawai" label="Daftar Pegawai" />
          )}
          {role === 'Petugas Dashboard' && (
            <>
              <SidebarItem to="/daftar-pengaduan" label="Daftar Pengaduan" />
              <SidebarItem to="/daftar-pegawai" label="Daftar Pegawai" />   
              <SidebarItem to="/input-pengaduan" label="Input Pengaduan" />
              <SidebarItem to="/input-pegawai" label="Input Pegawai" />
            </>
          )}
        </ul>
      </div>

      <div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
          }}
          style={{
            padding: '10px 14px',
            backgroundColor: '#e74c3c',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%',
            marginTop: '20px'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;