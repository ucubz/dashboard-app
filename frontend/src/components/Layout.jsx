import { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <>
      {/* Tombol ☰ hanya muncul di mobile */}
      <button
        onClick={toggleSidebar}
        className="sidebar-toggle"
        style={{
          position: 'fixed',
          top: 15,
          left: 15,
          zIndex: 1100,
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'none' // default: disembunyikan di desktop
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar show={showSidebar} onClose={closeSidebar} />

      {/* Overlay saat sidebar terbuka di mobile */}
      {showSidebar && (
        <div
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 998
          }}
        />
      )}

      {/* Konten utama */}
      <div
        className="main-content"
        style={{
          marginLeft: '220px',
          padding: '40px',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
          boxSizing: 'border-box',
          color: '#333'
        }}
      >
        {children}
      </div>

      {/* Style responsif */}
      <style>
        {`
          @media (max-width: 768px) {
            .main-content {
              margin-left: 0 !important;
              padding: 20px;
            }

            .sidebar-toggle {
              display: block;
            }
          }
        `}
      </style>
    </>
  );
};

export default Layout;
