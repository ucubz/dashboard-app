import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from './pages/dashboard';
import InputPengaduan from './pages/InputPengaduan';
import RequireAuth from './RequireAuth';

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
      </Routes>
    </Router>
  );
}

export default App;
