import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
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

    const isActive = (path) => location.pathname === path ? 'border-b-2 border-purple-500 pb-1' : '';

    return (
        <nav className="shadow-sm bg-neutral text-neutral-content font-display px-4 py-3">

            <div className="flex items-center justify-between lg:hidden">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost p-2" aria-label="Toggle menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                    <ul tabIndex={0} className="menu menu-compact  dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-48">
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
                        <button
                            onClick={handleLogout}
                            className="btn btn-sm border border-white rounded-full text-white hover:text-red-400 hover:border-none transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-sm border border-white rounded-full text-white hover:text-purple-500 hover:border-none transition duration-300">Login</Link>
                            <Link to="/register" className="btn btn-sm border border-white rounded-full text-white hover:text-purple-500 hover:border-none transition duration-300">Register</Link>
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
                    <Link
                        to="/"
                        className={`transition hover:text-purple-500 ${isActive('/')}`}
                    >
                        Home
                    </Link>

                    <button
                        onClick={handleBrowseClick}
                        className={`transition hover:text-purple-500 mb-1 ${isActive('/main-tasks')}`}
                    >
                        Browse Tasks
                    </button>

                    <Link
                        to="/add-task"
                        className={`transition hover:text-purple-500 ${isActive('/add-task')}`}
                    >
                        Add Task
                    </Link>
                    <Link
                        to="/my-tasks"
                        className={`transition hover:text-purple-500 ${isActive('/Mytasks')}`}
                    >
                        My Posted Tasks
                    </Link>
                </div>

                <div className="flex gap-3">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="btn border border-white rounded-full text-white hover:text-purple-500 hover:border-none transition duration-300 pb-1"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="btn border pb-1 border-white rounded-full text-white hover:text-purple-500 hover:border-none transition duration-300">Login</Link>
                            <Link to="/register" className="btn pb-1 border border-white rounded-full text-white hover:text-purple-500 hover:border-none transition duration-300">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
