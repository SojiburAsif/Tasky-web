import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
  const [theme, setTheme] = useState('dark');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else if (systemDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
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

  const isActive = (path) => (location.pathname === path ? 'border-b-2 border-purple-500 pb-1' : '');

  return (
    <nav
      className="shadow-sm text-white grotesk-font px-4 py-3"
      style={{ backgroundColor: '#000000' }}  // Full pure black background
    >
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between lg:hidden">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost p-2" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-black text-white rounded-box w-48">
            <li><Link to="/">Home</Link></li>
            <li><button onClick={handleBrowseClick}>Browse Tasks</button></li>
            <li><Link to="/add-task">Add Task</Link></li>
            <li><Link to="/my-tasks">My Posted Tasks</Link></li>
          </ul>
        </div>

        <Link to="/">
          <img src="https://i.ibb.co/tM1fXLzx/Chat-GPT-Image-May-20-2025-05-52-48-PM.png" alt="Taskly Logo" className="h-10 w-auto" />
        </Link>

        <div className="flex space-x-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full border-1 border-purple-500">
                  <img src={user.photoURL || 'https://i.ibb.co/JmW6mPv/default-user.png'} alt="User Avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-black text-white rounded-box w-44 mt-3">
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
          <img src="https://i.ibb.co/tM1fXLzx/Chat-GPT-Image-May-20-2025-05-52-48-PM.png" alt="Taskly Logo" className="h-12 w-auto" />
        </Link>

        <div className="flex space-x-6">
          <Link to="/" className={`transition hover:text-purple-500 ${isActive('/')}`}>Home</Link>
          <button onClick={handleBrowseClick} className={`transition hover:text-purple-500 mb-1 ${isActive('/main-tasks')}`}>Browse Tasks</button>
          <Link to="/add-task" className={`transition hover:text-purple-500 ${isActive('/add-task')}`}>Add Task</Link>
          <Link to="/my-tasks" className={`transition hover:text-purple-500 ${isActive('/my-tasks')}`}>My Posted Tasks</Link>
        </div>

        <div className="flex gap-3">
          <label className="flex cursor-pointer gap-2 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input type="checkbox" className="toggle" checked={theme === 'dark'} onChange={toggleTheme} />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full border-2 border-purple-500">
                  <img src={user.photoURL || 'https://i.ibb.co/S47T06r9/download-3.png'} alt="User Avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-black text-white rounded-box w-44 mt-3">
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn border pb-1 border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition duration-300">Login</Link>
              <Link to="/register" className="btn pb-1 border border-purple-500 rounded-full text-purple-500 hover:bg-purple-100 transition duration-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
