import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success('Logout successful!', {
          style: {
            fontSize: '18px',
            fontWeight: '600',
            padding: '16px 24px',
            borderRadius: '10px',
          },
        });
      })
      .catch(console.error);
  };

  const handleBrowseClick = () => {
    if (user?.email) {
      navigate('/main-tasks');
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  const isActive = (path) =>
    location.pathname === path ? 'border-b-2 border-purple-500 pb-1' : '';

  return (
    <nav className={`shadow-sm grotesk-font px-4 py-3 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between lg:hidden">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost p-2"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {menuOpen && (
            <ul
              className={`absolute left-0 z-10 mt-2 menu menu-compact dropdown-content p-2 shadow rounded-box w-48 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              <li><Link to="/">Home</Link></li>
              <li><button onClick={handleBrowseClick}>Browse Tasks</button></li>
              <li><Link to="/add-task">Add Task</Link></li>
              <li><Link to="/my-tasks">My Posted Tasks</Link></li>
            </ul>
          )}
        </div>

        <Link to="/">
          <img
            src="https://i.ibb.co/tM1fXLzx/Chat-GPT-Image-May-20-2025-05-52-48-PM.png"
            alt="Taskly Logo"
            className="h-10 w-auto"
          />
        </Link>

        <div className="flex space-x-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full border-1 border-purple-500">
                  <img src={user.photoURL || 'https://i.ibb.co/JmW6mPv/default-user.png'} alt="User Avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className={`dropdown-content menu p-2 shadow rounded-box w-44 mt-3 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
              >
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`btn btn-sm border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition duration-300 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`btn btn-sm border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition duration-300 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between">
        <Link to="/">
          <img
            src="https://i.ibb.co/tM1fXLzx/Chat-GPT-Image-May-20-2025-05-52-48-PM.png"
            alt="Taskly Logo"
            className="h-12 w-auto"
          />
        </Link>

        <div className="flex space-x-6">
          <Link to="/" className={`transition hover:text-purple-500 ${theme === 'dark' ? 'hover:text-purple-400' : ''} ${isActive('/')}`}>Home</Link>
          <button onClick={handleBrowseClick} className={`transition hover:text-purple-500 mb-1 ${theme === 'dark' ? 'hover:text-purple-400' : ''} ${isActive('/main-tasks')}`}>Browse Tasks</button>
          <Link to="/add-task" className={`transition hover:text-purple-500 ${theme === 'dark' ? 'hover:text-purple-400' : ''} ${isActive('/add-task')}`}>Add Task</Link>
          <Link to="/my-tasks" className={`transition hover:text-purple-500 ${theme === 'dark' ? 'hover:text-purple-400' : ''} ${isActive('/my-tasks')}`}>My Posted Tasks</Link>
        </div>

        <div className="flex gap-3 items-center">
          <label className="swap swap-rotate">
            {/* Theme toggle checkbox */}
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />

            {/* Sun icon (light mode) */}
            <svg
              className="swap-on h-8 w-8 fill-current text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon (dark mode) */}
            <svg
              className="swap-off h-8 w-8 fill-current text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>



          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full border-2 border-purple-500">
                  <img src={user.photoURL || 'https://i.ibb.co/S47T06r9/download-3.png'} alt="User Avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className={`dropdown-content menu p-2 shadow rounded-box w-44 mt-3 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
              >
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`btn pb-1 border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition duration-300 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`btn pb-1 border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition duration-300 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;