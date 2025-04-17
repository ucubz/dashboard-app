const Dashboard = () => {
  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Selamat datang di aplikasi monitoring kasus!</p>
      <button
        onClick={() => {
          localStorage.removeItem('token') // Logout
          window.location.href = '/' // Redirect ke login
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard
