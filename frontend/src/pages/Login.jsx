import { useState } from 'react'; import { useNavigate } from 'react-router-dom'; import axios from 'axios';

const Login = () => { const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const navigate = useNavigate();

const handleSubmit = async (e) => { e.preventDefault(); try { const res = await axios.post(${import.meta.env.VITE_API_URL}/api/auth/login, { username, password });

const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  // Redirect berdasarkan role
  if (user.role === 'kepala_subdir' || user.role === 'kepala_seksi') {
    navigate('/dashboard');
  } else if (user.role === 'petugas_dashboard') {
    navigate('/input-pengaduan');
  } else {
    navigate('/');
  }
} catch (err) {
  setError('Login gagal. Cek kembali username/password.');
}

};

return ( <div style={{ padding: 40 }}> <h1>Login Dong</h1> <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}> <div> <label>Username:</label><br /> <input type="text" value={username} onChange={e => setUsername(e.target.value)} required /> </div> <div style={{ marginTop: 10 }}> <label>Password:</label><br /> <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /> </div> {error && <p style={{ color: 'red' }}>{error}</p>} <button type="submit" style={{ marginTop: 15 }}> Login </button> </form> </div> ); };

export default Login;

