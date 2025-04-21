import { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 1000,
          display: 'none',
          background: '#2c3e50',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '18px',
          cursor: 'pointer'
        }}
        className="toggle-button"
        onClick={toggleSidebar}
      >
        ☰
      </div>

      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

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

      <style>
        {`
          @media (max-width: 768px) {
            .main-content {
              margin-left: 0;
              padding: 20px;
            }

            .toggle-button {
              display: block;
            }
          }
        `}
      </style>
    </>
  );
};

export default Layout;
