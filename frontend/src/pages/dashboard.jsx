import Sidebar from '../components/Sidebar'; // import sidebar

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ marginLeft: '220px', padding: '40px' }}>
        <h1>Dashboard</h1>
        <p>Selamat datang di aplikasi monitoring kasus!</p>
        
        <button
          onClick={() => {
            localStorage.removeItem('token'); // Hapus token
            window.location.href = '/'; // Redirect ke login
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
