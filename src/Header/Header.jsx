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
    location.pathname === path ? 'text-purple-500 font-semibold' : '';

  const shadowClass = theme === 'dark' ? 'shadow-md shadow-gray-800' : '';

  return (
    <nav className={`${shadowClass} transition duration-300 grotesk-font px-4 py-2 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>

     {/* ✅ Mobile Navbar */}
<div className="flex items-center justify-between lg:hidden">
  <div className="relative">
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="btn btn-ghost p-2"
      aria-label="Toggle menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    {menuOpen && (
      <ul className={`absolute left-0 mt-3 w-64 menu menu-compact dropdown-content z-30 p-2 rounded-box transition ${theme === 'dark' ? 'bg-black text-white shadow-lg shadow-gray-800' : 'bg-white text-black shadow-lg shadow-black/30'}`}>
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/all-page" className={isActive('/all-page')}>All Items Page</Link></li>
        {user && (
          <>
            <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
            <li><button onClick={handleBrowseClick} className={isActive('/main-tasks')}>Browse Tasks</button></li>
            <li><Link to="/add-task" className={isActive('/add-task')}>Add Task</Link></li>
            <li><Link to="/my-tasks" className={isActive('/my-tasks')}>My Posted Tasks</Link></li>
          </>
        )}
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    )}
  </div>

  <Link to="/">
    <img
      src={theme === 'dark'
        ? '/ChatGPT Image May 20, 2025, 05_52_48 PM.png'
        : 'https://i.ibb.co/qLr0Nspj/ffee6d8c-7850-4475-972a-f68b63aa4eed.png'}
      alt="Taskly Logo"
      className="h-10 w-auto transition"
    />
  </Link>

  <div className="flex items-center gap-3">
    {/* Theme Toggle */}
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1M21 12h1M3 12H2m16.36 4.95l.7.71M6.34 6.34l-.7-.71M17.66 6.34l.7-.71M6.34 17.66l-.7.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>

    {/* ✅ User Avatar with Logout (Mobile) */}
    {user && (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="avatar cursor-pointer">
          <div className={`w-10 rounded-full border-2 border-purple-500 ${theme === 'dark' ? 'shadow-md shadow-gray-800' : 'shadow-md shadow-black/30'}`}>
            <img src={user.photoURL || 'https://i.ibb.co/S47T06r9/download-3.png'} alt="User Avatar" />
          </div>
        </label>
        <ul className={`dropdown-content menu p-2 rounded-box w-44 mt-3 transition ${theme === 'dark' ? 'bg-black text-white shadow-lg shadow-gray-800' : 'bg-white text-black shadow-lg shadow-black/30'}`}>
          <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
        </ul>
      </div>
    )}
  </div>
</div>

      {/* ✅ Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between mt-2">
        <Link to="/">
          <img
            src={theme === 'dark'
              ? '/ChatGPT Image May 20, 2025, 05_52_48 PM.png'
              : 'https://i.ibb.co/qLr0Nspj/ffee6d8c-7850-4475-972a-f68b63aa4eed.png'}
            alt="Taskly Logo"
            className="h-12 w-auto transition duration-300"
          />
        </Link>

        <ul className="menu menu-horizontal px-1 space-x-4">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/all-page" className={isActive('/all-page')}>All Items Page</Link></li>
          {user && (
            <>
              <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
              <li>
                <details>
                  <summary className="cursor-pointer">Browse</summary>
                  <ul className={`p-2 w-64 z-10 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <li><button onClick={handleBrowseClick} className={isActive('/main-tasks')}>Browse Tasks</button></li>
                    <li><Link to="/add-task" className={isActive('/add-task')}>Add Task</Link></li>
                    <li><Link to="/my-tasks" className={isActive('/my-tasks')}>My Posted Tasks</Link></li>
                  </ul>
                </details>
              </li>
            </>
          )}
        </ul>

        <div className="flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1M21 12h1M3 12H2m16.36 4.95l.7.71M6.34 6.34l-.7-.71M17.66 6.34l.7-.71M6.34 17.66l-.7.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
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
                <div className={`w-10 rounded-full border-2 border-purple-500 ${theme === 'dark' ? 'shadow-md shadow-gray-800' : 'shadow-md shadow-black/30'}`}>
                  <img src={user.photoURL || 'https://i.ibb.co/S47T06r9/download-3.png'} alt="User Avatar" />
                </div>
              </label>
              <ul className={`dropdown-content menu p-2 rounded-box w-44 mt-3 transition ${theme === 'dark' ? 'bg-black text-white shadow-lg shadow-gray-800' : 'bg-white text-black shadow-lg shadow-black/30'}`}>
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition">Login</Link>
              <Link to="/register" className="btn border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
