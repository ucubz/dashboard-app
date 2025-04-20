import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from './pages/dashboard';
import InputPengaduan from './pages/InputPengaduan';
import DaftarPengaduan from './pages/DaftarPengaduan';
import DaftarPegawai from './pages/DaftarPegawai'; // ✅ Tambahkan impor
import RequireAuth from './RequireAuth';

function App() {
  return (
    <Router>
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

        {/* Fallback jika path tidak ditemukan */}
        <Route
          path="*"
          element={<div style={{ padding: 40 }}>404 - Halaman tidak ditemukan</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;