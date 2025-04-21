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
        left: 0,
        top: 0,
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
            padding: '10px 14
