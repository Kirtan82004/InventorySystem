import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Inventory<span className="text-blue-400">System</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/categories" className="hover:text-blue-400">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/admin/inventory" className="hover:text-blue-400">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/stock" className="hover:text-blue-400">
              Stock
            </Link>
          </li>
          <li
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 cursor-pointer"
          >
            Logout
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden mt-4 space-y-3 bg-gray-800 p-4 rounded">
          <li>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="hover:text-blue-400"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              onClick={() => setOpen(false)}
              className="hover:text-blue-400"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/admin/inventory"
              onClick={() => setOpen(false)}
              className="hover:text-blue-400"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/stock"
              onClick={() => setOpen(false)}
              className="hover:text-blue-400"
            >
              Stock
            </Link>
          </li>
          <li
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer text-center"
          >
            Logout
          </li>
        </ul>
      )}
    </nav>
  );
}
