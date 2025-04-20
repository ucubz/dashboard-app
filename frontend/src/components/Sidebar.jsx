// Sidebar.jsx import { Link, useNavigate } from 'react-router-dom'; import { useEffect, useState } from 'react';

const Sidebar = () => { const navigate = useNavigate(); const [role, setRole] = useState(null);

useEffect(() => { const user = JSON.parse(localStorage.getItem('user')); if (user) setRole(user.role); }, []);

const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); };

return ( <div style={{ width: '200px', height: '100vh', background: '#f0f0f0', padding: '20px' }}> <h3>Menu</h3> <ul style={{ listStyle: 'none', padding: 0 }}> {(role === 'kepala_subdirektorat' || role === 'kepala_seksi') && ( <> <li><Link to="/dashboard">Dashboard</Link></li> <li><Link to="/daftar-pengaduan">Daftar Pengaduan</Link></li> </> )} {role === 'petugas_dashboard' && ( <li><Link to="/input-pengaduan">Input Pengaduan</Link></li> )} </ul>

<button onClick={handleLogout} style={{ marginTop: '30px' }}>
    Logout
  </button>
</div>

); };

export default Sidebar;

