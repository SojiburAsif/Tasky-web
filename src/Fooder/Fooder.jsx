import React from 'react';
import { Link } from 'react-router';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Fooder = () => {
    return (
        <div>
            <footer className="bg-gray-100 dark:bg-black">
                <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex justify-center text-teal-600 dark:text-teal-300">
                        <img className='w-29' src="../../public/ChatGPT Image May 20, 2025, 05_52_48 PM.png" alt="" />
                    </div>

                    <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-gray-500 dark:text-gray-400">
                        Taskly is your go-to platform for hiring and offering freelance services for small, everyday tasks. Connect, collaborate, and get things done with ease.
                    </p>

                    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/browse">Browse Tasks</Link></li>
                        <li><Link to="/add-task">Add Task</Link></li>
                        <li><Link to="/main-tasks">My Posted Tasks</Link></li>
                        <li><Link to="/Blog">Blog</Link></li>
                    </ul>

                    <ul className="mt-12 flex justify-center gap-6 md:gap-8 text-gray-700 dark:text-white">
                        <li>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer 0">
                                <FaFacebook size={27} />
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer ">
                                <CiLinkedin size={27} />
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer ">
                                <FaInstagram size={27} />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer ">
                                <FaGithub size={27} />
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer ">
                                <FaTwitter size={27} />
                            </a>
                        </li>
                    </ul>



                    <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Taskly. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Fooder;
