import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Navbar from './components/Header/Navbar.jsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Agar token nahi hai aur user login/signup page par bhi nahi hai
    if (!token && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [token, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar sirf logged-in user ke liye */}
      {token && <Navbar />}

      <Outlet />
    </div>
  );
}

export default App;
