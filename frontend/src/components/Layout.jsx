import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div style={{
        marginLeft: '220px',
        padding: '40px',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9'
      }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
