// src/components/Sidebar.jsx import { Link } from 'react-router-dom';

const Sidebar = () => { const user = JSON.parse(localStorage.getItem('user')); const role = user?.role;

const menu = [ { label: 'Dashboard', to: '/dashboard', roles: ['kepala_subdir', 'kepala_seksi'] }, { label: 'Input Pengaduan', to: '/input-pengaduan', roles: ['petugas_dashboard'] }, { label: 'Daftar Pengaduan', to: '/daftar-pengaduan', roles: ['kepala_subdir', 'kepala_seksi'] }, ];

return ( <div style={{ width: 200, background: '#eee', height: '100vh', padding: 20 }}> <h3>Menu</h3> <ul style={{ listStyle: 'none', paddingLeft: 0 }}> {menu .filter(item => item.roles.includes(role)) .map((item, index) => ( <li key={index} style={{ marginBottom: 10 }}> <Link to={item.to}>{item.label}</Link> </li> ))} </ul> </div> ); };

export default Sidebar;

