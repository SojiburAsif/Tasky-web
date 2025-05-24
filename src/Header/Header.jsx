import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from './ThemsProvider';
import toast from 'react-hot-toast';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const location = useLocation();

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
            <ul className={`absolute left-0 z-10 mt-2 menu menu-compact dropdown-content p-2 shadow rounded-box w-48 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
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

        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.49-8.49h1M3 12h1m15.36 4.95l.7.71M6.34 6.34l.7.71m12.02 0l-.7.71M6.34 17.66l-.7.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full border-1 border-purple-500">
                  <img src={user.photoURL || 'https://i.ibb.co/JmW6mPv/default-user.png'} alt="User Avatar" />
                </div>
              </label>
              <ul className={`dropdown-content menu p-2 shadow rounded-box w-44 mt-3 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition duration-300">Login</Link>
              <Link to="/register" className="btn btn-sm border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition duration-300">Register</Link>
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
          <Link to="/" className={`transition hover:text-purple-500 ${isActive('/')}`}>Home</Link>
          <button onClick={handleBrowseClick} className={`transition hover:text-purple-500 mb-1 ${isActive('/main-tasks')}`}>Browse Tasks</button>
          <Link to="/add-task" className={`transition hover:text-purple-500 ${isActive('/add-task')}`}>Add Task</Link>
          <Link to="/my-tasks" className={`transition hover:text-purple-500 ${isActive('/my-tasks')}`}>My Posted Tasks</Link>
        </div>

        <div className="flex gap-4 items-center">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.49-8.49h1M3 12h1m15.36 4.95l.7.71M6.34 6.34l.7.71m12.02 0l-.7.71M6.34 17.66l-.7.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full border-2 border-purple-500">
                  <img src={user.photoURL || 'https://i.ibb.co/S47T06r9/download-3.png'} alt="User Avatar" />
                </div>
              </label>
              <ul className={`dropdown-content menu p-2 shadow rounded-box w-44 mt-3 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn pb-1 border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100">Login</Link>
              <Link to="/register" className="btn pb-1 border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
