import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ 
      width: '200px', 
      height: '100vh', 
      background: '#f0f0f0', 
      padding: '20px', 
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/input-pengaduan">Input Pengaduan</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
