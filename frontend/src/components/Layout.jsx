import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  // Cek ukuran layar dan update isMobile + showSidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile); // sidebar terbuka di desktop, tertutup di mobile
    };

    handleResize(); // langsung cek saat render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cek ulang saat route berubah (untuk sidebar di mobile)
  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setShowSidebar(!mobile);
  }, [location.pathname]);

  const toggleSidebar = () => setShowSidebar(prev => !prev);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <>
      {/* Tombol toggle sidebar hanya di mobile */}
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

      {/* Sidebar */}
      <Sidebar show={showSidebar} onClose={closeSidebar} />

      {/* Overlay untuk tutup sidebar di mobile */}
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

      {/* Konten utama */}
      <div
        className="main-content"
        style={{
          marginLeft: isMobile ? 0 : '220px',
          padding: '40px',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
          boxSizing: 'border-box',
          color: '#333',
          transition: 'margin-left 0.3s ease-in-out'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
