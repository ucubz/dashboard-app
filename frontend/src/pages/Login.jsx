import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      alert("📡 Mengirim permintaan login...");
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username,
        password
      });

      const { token, user } = res.data;

      alert(`✅ Login berhasil. Role: ${user.role}`);
console.log("User object dari backend:",user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log("Token disimpan:", token);
      console.log("User disimpan:", user);

      if (user.role === 'kepala_subdir' || user.role === 'kepala_seksi') {
        alert("➡️ Redirect ke /dashboard");
        navigate('/dashboard');
      } else if (user.role === 'petugas_dashboard') {
        alert("➡️ Redirect ke /input-pengaduan");
        navigate('/input-pengaduan');
      } else {
        alert("⛔ Tidak dikenali, kembali ke halaman login");
        navigate('/');
      }

    } catch (err) {
      console.error(err);
      alert("❌ Login gagal. Username/password salah atau backend error.");
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