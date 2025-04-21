import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // tambahkan ini
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const location = useLocation(); // tambahkan ini
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile); // true di desktop, false di mobile
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // tambahkan ini supaya check ulang setiap kali halaman berubah
  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setShowSidebar(!mobile);
  }, [location.pathname]); // ketika route berubah, cek ulang

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <>
      {isMobile && (
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
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      )}

      <Sidebar show={showSidebar} onClose={closeSidebar} />

      {isMobile && showSidebar && (
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

      <div
        className="main-content"
        style={{
          marginLeft: isMobile ? 0 : '220px',
          padding: '40px',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
          boxSizing: 'border-box',
          color: '#333',
          transition: 'margin-left 0.3s'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
