import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from './pages/dashboard';
import InputPengaduan from './pages/InputPengaduan';
import DaftarPengaduan from './pages/DaftarPengaduan';
import DaftarPegawai from './pages/DaftarPegawai';
import RequireAuth from './RequireAuth';
import InputPegawai from './pages/InputPegawai';
import useAutoLogout from './hooks/useAutoLogout'; // ✅

function AppRoutes() {
  useAutoLogout(); // ✅ Dipanggil di dalam Router context

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <RequireAuth allowedRoles={['Kepala Subdirektorat', 'Kepala Seksi']}>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/input-pengaduan"
        element={
          <RequireAuth allowedRoles={['Petugas Dashboard']}>
            <InputPengaduan />
          </RequireAuth>
        }
      />

      <Route
        path="/daftar-pengaduan"
        element={
          <RequireAuth allowedRoles={['Kepala Subdirektorat', 'Kepala Seksi']}>
            <DaftarPengaduan />
          </RequireAuth>
        }
      />

      <Route
        path="/daftar-pegawai"
        element={
          <RequireAuth allowedRoles={['Kepala Subdirektorat']}>
            <DaftarPegawai />
          </RequireAuth>
        }
      />

      <Route
        path="/input-pegawai"
        element={
          <RequireAuth allowedRoles={['Petugas Dashboard']}>
            <InputPegawai />
          </RequireAuth>
        }
      />

      <Route
        path="*"
        element={<div style={{ padding: 40 }}>404 - Halaman tidak ditemukan</div>}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
