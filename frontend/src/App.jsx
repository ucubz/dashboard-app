import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; import Login from "./pages/Login"; import Dashboard from './pages/dashboard'; import InputPengaduan from './pages/InputPengaduan'; import DaftarPengaduan from './pages/DaftarPengaduan'; import RequireAuth from './components/RequireAuth';

function App() { return ( <Router> <Routes> <Route path="/" element={<Login />} />

<Route
      path="/dashboard"
      element={
        <RequireAuth allowedRoles={['kepala_subdir', 'kepala_seksi']}>
          <Dashboard />
        </RequireAuth>
      }
    />

    <Route
      path="/input-pengaduan"
      element={
        <RequireAuth allowedRoles={['petugas_dashboard']}>
          <InputPengaduan />
        </RequireAuth>
      }
    />

    <Route
      path="/daftar-pengaduan"
      element={
        <RequireAuth allowedRoles={['kepala_subdir', 'kepala_seksi']}>
          <DaftarPengaduan />
        </RequireAuth>
      }
    />
  </Routes>
</Router>

); }

export default App;

