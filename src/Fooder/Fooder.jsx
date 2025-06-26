import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { FaFacebook, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { ThemeContext } from '../Header/ThemsProvider';

const Fooder = () => {
    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) =>
        currentPath === path
            ? 'border-b-2 border-purple-500 text-purple-500'
            : 'hover:text-purple-500';

    return (
        <footer className={`roboto-font transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-center text-teal-600 dark:text-teal-300">
                    <Link to="/">
                        <img
                            src={
                                theme === 'dark'
                                    ? '/ChatGPT Image May 20, 2025, 05_52_48 PM.png'
                                    : 'https://i.ibb.co/qLr0Nspj/ffee6d8c-7850-4475-972a-f68b63aa4eed.png'
                            }
                            alt="Taskly Logo"
                            className="h-12 w-auto transition duration-300"
                        />
                    </Link>
                </div>

                <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-gray-500 dark:text-gray-400">
                    Taskly is your go-to platform for hiring and offering freelance services for small, everyday tasks. Connect, collaborate, and get things done with ease.
                </p>

                <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12 text-base font-medium">
                    <li>
                        <Link to="/" className={isActive('/')}>Home</Link>
                    </li>
                    <li>
                        <Link to="/blog" className={isActive('/blog')}>Blog</Link>
                    </li>
                    <li>
                        <Link to="/about" className={isActive('/about')}>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={isActive('/contact')}>Contact</Link>
                    </li>
                </ul>

                <ul className="mt-12 flex justify-center gap-6 md:gap-8">
                    <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition">
                            <FaFacebook size={27} />
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900 transition">
                            <CiLinkedin size={27} />
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-700 transition">
                            <FaInstagram size={27} />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                            className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition">
                            <FaGithub size={27} />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-600 transition">
                            <FaTwitter size={27} />
                        </a>
                    </li>
                </ul>

                <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Taskly. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Fooder;
