import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useEffect, useRef } from 'react';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const RedirectIfLoggedIn = () => {
  const token = localStorage.getItem('token');
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (token && !hasAlerted.current) {
      alert('You are already logged in. Please logout first to access the login page.');
      hasAlerted.current = true;
    }
  }, [token]);

  return token ? <Navigate to="/dashboard" /> : <Login />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<RedirectIfLoggedIn />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
