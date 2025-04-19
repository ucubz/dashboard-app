import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Jika sudah login dan ada token, redirect otomatis
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      if (user.role === 'kepala_subdir' || user.role === 'kepala_seksi') {
        navigate('/dashboard');
      } else if (user.role === 'petugas_dashboard') {
        navigate('/input-pengaduan');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username,
        password
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect sesuai role
      if (user.role === 'kepala_subdir' || user.role === 'kepala_seksi') {
        navigate('/dashboard');
      } else if (user.role === 'petugas_dashboard') {
        navigate('/input-pengaduan');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('Login gagal. Cek kembali username/password atau hubungi admin.');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login Aplikasi</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: 15 }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;