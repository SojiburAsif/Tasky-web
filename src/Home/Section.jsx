// Section.jsx
import React, { useState, useEffect, useContext } from "react";
import { FaExternalLinkAlt, FaBuilding, FaClock, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../Header/ThemsProvider";

const items = [{ id: 1, title: 'Frontend Developer - React', company: 'TechSolve', website: 'https://techsolve.example', short: 'Build responsive UIs with React & Tailwind.', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg', details: 'We need a React developer to build landing pages, dashboards and reusable UI components. Experience with Tailwind, React Hooks and component libraries is preferred.', skills: ['React', 'Tailwind', 'HTML', 'CSS'], budget: '$400 - $800', duration: '1 - 2 months', postedDate: '2025-07-01', }, { id: 2, title: 'Backend Developer - Node.js', company: 'NextGen Ltd.', website: 'https://nextgen.example', short: 'APIs, auth, and scalable services.', image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', details: 'Design RESTful APIs, integrate with databases, and ensure performance & security. Experience with Express, MongoDB and JWT-based auth is a plus.', skills: ['Node.js', 'Express', 'MongoDB', 'REST'], budget: '$600 - $1,200', duration: '2 - 3 months', postedDate: '2025-06-25', }, { id: 3, title: 'UI/UX Designer', company: 'DesignMax', website: 'https://designmax.example', short: 'Mobile-first UX & prototypes.', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', details: 'Create intuitive flows, wireframes, and hi-fi prototypes for mobile apps. Figma portfolio required.', skills: ['Figma', 'Prototyping', 'User Research'], budget: '$300 - $700', duration: '3 - 4 weeks', postedDate: '2025-05-30', }, { id: 4, title: 'Fullstack Developer (MERN)', company: 'StackWave', website: 'https://stackwave.example', short: 'Build fullstack features and integrations.', image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg', details: 'Looking for a MERN dev to deliver features end-to-end, write tests and help deploy to cloud (Vercel/Heroku/AWS).', skills: ['MongoDB', 'Express', 'React', 'Node.js'], budget: '$800 - $1,500', duration: '3 - 6 months', postedDate: '2025-06-10', }, { id: 5, title: 'Mobile App Developer (Flutter)', company: 'AppForge', website: 'https://appforge.example', short: 'Cross-platform mobile app with clean architecture.', image: 'https://images.pexels.com/photos/1000457/pexels-photo-1000457.jpeg', details: 'Develop a production-ready Flutter app, integrate with existing API and implement CI/CD for builds.', skills: ['Flutter', 'Dart', 'REST APIs'], budget: '$700 - $1,200', duration: '2 - 4 months', postedDate: '2025-05-20', }, { id: 6, title: 'WordPress Customization', company: 'WP Experts', website: 'https://wpexperts.example', short: 'Theme & plugin customization, optimization.', image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg', details: 'Customize and optimize an existing WordPress site with plugin setup, performance tuning and design fixes.', skills: ['WordPress', 'PHP', 'Performance'], budget: '$200 - $500', duration: '2 - 3 weeks', postedDate: '2025-04-30', },];
const timeAgo = (dateStr) => {
    const now = new Date();
    const then = new Date(dateStr);
    const diffMs = now - then;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
};

const Modal = ({ open, onClose, item }) => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                className={`relative z-10 w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
                    }`}
            >
                <div className={`flex items-start justify-between px-6 py-4 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"
                    }`}>
                    <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-sm text-purple-600 mt-1 flex items-center gap-2">
                            <FaBuilding /> {item.company}
                            {item.website && (
                                <a
                                    href={item.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`ml-3 inline-flex items-center gap-1 text-sm ${theme === "dark" ? "text-gray-400 hover:text-purple-500" : "text-gray-500 hover:text-purple-600"
                                        }`}
                                >
                                    <FaExternalLinkAlt /> Visit website
                                </a>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
                        aria-label="Close modal"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="px-6 py-6 space-y-4">
                    <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{item.details}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Skills required
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {item.skills.map((s, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${theme === "dark"
                                                ? "bg-gray-800 text-purple-300"
                                                : "bg-purple-50 text-purple-600"
                                            }`}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Budget</div>
                            <div className="mt-2 text-sm font-medium">{item.budget}</div>

                            <div className={`mt-4 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Estimated duration</div>
                            <div className="mt-1 text-sm">{item.duration}</div>

                            <div className={`mt-4 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Posted</div>
                            <div className="mt-1 text-sm flex items-center gap-2">
                                <FaClock /> {timeAgo(item.postedDate)}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t flex items-center justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Section = () => {
    const [openItem, setOpenItem] = useState(null);
    const { theme } = useContext(ThemeContext);

    return (
        <section className={`poppins-font py-12 ${theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-black"}`}>
            <div className="max-w-[1380px] mx-auto space-y-10">
                {/* Header */}
                <div className="px-6 md:px-2 text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-semibold">Featured Opportunities</h2>
                    <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Browse the latest projects and open roles — click View Details for full info.</p>
                </div>

                {/* Cards grid */}
                <div className="px-4 md:px-8 lg:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((it) => (
                            <article
                                key={it.id}
                                className={`group border rounded-2xl p-5 shadow-sm hover:shadow-lg transform transition hover:-translate-y-1 ${theme === "dark"
                                        ? "bg-gray-900 border-gray-800"
                                        : "bg-white border-gray-100"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <img
                                        src={it.image}
                                        alt={it.title}
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0 border-2 border-purple-500"
                                        loading="lazy"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{it.title}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="flex items-center gap-1 text-sm text-purple-600">
                                                <FaBuilding /> {it.company}
                                            </div>
                                            {it.website && (
                                                <a
                                                    href={it.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`flex items-center gap-1 text-sm hover:text-purple-600 truncate max-w-[10rem] ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                                        }`}
                                                >
                                                    <FaExternalLinkAlt /> Website
                                                </a>
                                            )}
                                        </div>
                                        <p className={`mt-3 text-sm line-clamp-3 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                            {it.short}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between gap-3">
                                            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                <FaClock /> {timeAgo(it.postedDate)}
                                            </div>
                                            <button
                                                onClick={() => setOpenItem(it)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium shadow-sm hover:bg-purple-700 transition"
                                                aria-haspopup="dialog"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal open={!!openItem} onClose={() => setOpenItem(null)} item={openItem} />
        </section>
    );
};

export default Section;
