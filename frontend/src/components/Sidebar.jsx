import { useNavigate } from 'react-router-dom';

const Sidebar = ({ show = true, onClose = () => {} }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) return null;

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
  

  return (
    <div style={sidebarStyle}>
      <div>
        <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {/* menu item */}
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
            width: '100%'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};


export default Sidebar;
