// Footer.jsx
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaHome,
  FaBlog,
  FaInfoCircle,
  FaEnvelope,
  FaFileContract,
  FaShieldAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { ThemeContext } from "../Header/ThemsProvider";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const [email, setEmail] = useState("");

  const isActive = (path) =>
    currentPath === path
      ? "text-purple-500 font-semibold"
      : "hover:text-purple-500";

  const socialClass =
    "inline-flex items-center justify-center w-10 h-10 rounded-full transition-transform transform hover:scale-105";

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }
    setEmail("");
    alert("Thanks! You've been subscribed.");
  };

  return (
    <footer
      role="contentinfo"
      className={`roboto-font transition-colors duration-300 ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Left - logo + description + socials */}
          <div className="flex flex-col gap-5">
            <Link
              to="/"
              aria-label="Go to homepage"
              className="inline-flex items-center gap-3"
            >
              <img
                src={
                  theme === "dark"
                    ? "/ChatGPT Image May 20, 2025, 05_52_48 PM.png"
                    : "https://i.ibb.co/qLr0Nspj/ffee6d8c-7850-4475-972a-f68b63aa4eed.png"
                }
                alt="Taskly Logo"
                className="h-12 w-auto transition"
              />
              <span className="sr-only">Taskly</span>
            </Link>

            <p
              className={`max-w-sm text-sm leading-relaxed ${
                theme === "dark"
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              Taskly helps you hire and offer freelance services for
              everyday tasks — fast, reliable and community-driven.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialClass} bg-white/60 text-blue-600 dark:bg-white/10`}
                aria-label="Taskly on Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialClass} bg-white/60 text-blue-700 dark:bg-white/10`}
                aria-label="Taskly on LinkedIn"
              >
                <CiLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialClass} bg-white/60 text-pink-500 dark:bg-white/10`}
                aria-label="Taskly on Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialClass} bg-white/60 text-gray-700 dark:text-gray-300 dark:bg-white/10`}
                aria-label="Taskly on GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialClass} bg-white/60 text-blue-400 dark:bg-white/10`}
                aria-label="Taskly on Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Middle - navigation */}
          <nav
            aria-label="footer navigation"
            className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-8"
          >
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className={`flex items-center gap-2 text-sm ${isActive("/")}`}
                >
                  <FaHome /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`flex items-center gap-2 text-sm ${isActive("/blog")}`}
                >
                  <FaBlog /> <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`flex items-center gap-2 text-sm ${isActive("/about")}`}
                >
                  <FaInfoCircle /> <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`flex items-center gap-2 text-sm ${isActive("/contact")}`}
                >
                  <FaEnvelope /> <span>Contact</span>
                </Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/terms"
                  className="flex items-center gap-2 text-sm hover:text-purple-500"
                >
                  <FaFileContract /> <span>Terms</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="flex items-center gap-2 text-sm hover:text-purple-500"
                >
                  <FaShieldAlt /> <span>Privacy</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right - contact + newsletter */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <div
                className={`font-medium ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Need help?
              </div>
              <a
                href="mailto:support@taskly.example"
                className="block mt-1 hover:text-purple-500"
              >
                asif81534@gmail.com
              </a>
              <a
                href="tel:+880123456789"
                className="block mt-1 hover:text-purple-500"
              >
                +880 00000000
              </a>
            </div>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="w-full max-w-sm">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-2 py-2 border border-gray-200 dark:border-gray-700 shadow-sm">
                <FaEnvelope className="ml-2 text-gray-400" />
                <input
                  id="foot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-transparent outline-none text-sm px-2 py-1 text-gray-800 dark:text-gray-100"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-purple-600 text-white px-3 py-2 text-sm font-medium hover:bg-purple-700 transition"
                >
                  Subscribe <FaPaperPlane className="text-xs" />
                </button>
              </div>
             
            </form>

            <p
              className={`text-sm mt-4 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              © {new Date().getFullYear()} Taskly. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
