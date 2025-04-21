import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowSidebar(true); // always show on desktop
      } else {
        setShowSidebar(false); // hide by default on mobile
      }
    };

    checkMobile(); // run on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          transition: 'margin-left 0.3s ease'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;