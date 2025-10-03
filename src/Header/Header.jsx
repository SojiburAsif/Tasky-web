import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { ThemeContext } from "./ThemsProvider";
import toast from "react-hot-toast";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout successful!", {
          style: { fontSize: "16px", fontWeight: "600", padding: "12px 18px", borderRadius: "10px" },
        });
        setAvatarOpen(false);
      })
      .catch(console.error);
  };

  const handleBrowseClick = () => {
    if (user?.email) navigate("/main-tasks");
    else navigate("/login", { state: { from: location.pathname } });
  };

  const isActive = (path) => (location.pathname === path ? "text-purple-500 font-semibold" : "");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setAvatarOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Button styles
  const primaryBtn = "inline-flex items-center px-4 py-2 rounded-full border border-purple-500 bg-purple-500 text-white font-medium shadow-sm hover:bg-purple-600 transition";
  const outlineBtn = "inline-flex items-center px-4 py-2 rounded-full border border-purple-500 text-purple-500 bg-transparent font-medium hover:bg-purple-50 transition";
  const ghostBtn = "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition";

  return (
    <nav className={`font-work-urbanist fixed w-full z-50 top-0 left-0 transition duration-300 shadow-md ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-2 py-3 flex items-center justify-between">
        {/* Left: Logo + Mobile menu button */}
        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/">
            <img
              src={theme === "dark" ? "/ChatGPT Image May 20, 2025, 05_52_48 PM.png" : "https://i.ibb.co/qLr0Nspj/ffee6d8c-7850-4475-972a-f68b63aa4eed.png"}
              alt="Taskly Logo"
              className="h-12 w-auto transition"
            />
          </Link>
        </div>

        {/* Center: Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6 font-medium">
          <li><Link to="/" className={isActive("/")}>Home</Link></li>
          <li><Link to="/all-page" className={isActive("/all-page")}>All Items</Link></li>
          {user && (
            <>
              <li><Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link></li>
              <li className="relative">
                <details>
                  <summary className="cursor-pointer">Browse</summary>
                  <ul className={`absolute mt-2 w-44 rounded-lg p-2 shadow-lg ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                    <li><button onClick={handleBrowseClick} className="w-full text-left px-2 py-1 hover:text-purple-500 transition">Browse Tasks</button></li>
                    <li><Link to="/add-task" className="block px-2 py-1 hover:text-purple-500 transition">Add Task</Link></li>
                    <li><Link to="/my-tasks" className="block px-2 py-1 hover:text-purple-500 transition">My Posted Tasks</Link></li>
                  </ul>
                </details>
              </li>
            </>
          )}
        </ul>

        {/* Right: Theme toggle + User */}
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className={ghostBtn}>
            {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div onClick={() => setAvatarOpen(!avatarOpen)} className={`cursor-pointer w-12 h-12 rounded-full border-2 border-purple-500 overflow-hidden ${theme === "dark" ? "shadow-md shadow-gray-800" : "shadow-md shadow-black/30"}`}>
                <img src={user.photoURL || "https://i.ibb.co/S47T06r9/download-3.png"} alt="User Avatar" className="w-full h-full object-cover" />
              </div>
              {avatarOpen && (
                <ul className={`absolute right-0 mt-3 w-44 rounded-lg shadow-lg p-2 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-2 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 transition rounded">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={outlineBtn}>Login</Link>
              <Link to="/register" className={primaryBtn}>Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`lg:hidden px-4 pb-4 space-y-2 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
          <Link to="/" className="block px-2 py-1 hover:text-purple-500 transition">Home</Link>
          <Link to="/all-page" className="block px-2 py-1 hover:text-purple-500 transition">All Items</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block px-2 py-1 hover:text-purple-500 transition">Dashboard</Link>
              <button onClick={handleBrowseClick} className="block w-full text-left px-2 py-1 hover:text-purple-500 transition">Browse Tasks</button>
              <Link to="/add-task" className="block px-2 py-1 hover:text-purple-500 transition">Add Task</Link>
              <Link to="/my-tasks" className="block px-2 py-1 hover:text-purple-500 transition">My Posted Tasks</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-2 py-1 hover:text-purple-500 transition">Login</Link>
              <Link to="/register" className="block px-2 py-1 hover:text-purple-500 transition">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
