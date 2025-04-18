import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from './pages/dashboard';
import RequireAuth from './RequireAuth'; // <- fix typo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* <- lowercase route */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
