import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from './pages/dashboard';
import InputPengaduan from './pages/InputPengaduan';
import DaftarPengaduan from './pages/DaftarPengaduan';
import RequireAuth from './RequireAuth'; // ✅ ini yang kurang

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/input-pengaduan"
          element={
            <RequireAuth>
              <InputPengaduan />
            </RequireAuth>
          }
        />
        <Route
          path="/daftar-pengaduan"
          element={
            <RequireAuth>
              <DaftarPengaduan />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
