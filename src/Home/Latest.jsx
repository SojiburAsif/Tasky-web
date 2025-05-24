import React, { useContext } from 'react';
import { ThemeContext } from '../Header/ThemsProvider';


const timeAgo = (postedDate) => {
    // আগের মতোই...
    const now = new Date();
    const posted = new Date(postedDate);
    const diffInMs = now - posted;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
};

const projects = [
    {
        title: "Developer for ACG iOS apps and Website",
        company: "APInter",
        postedDate: "2024-10-12",
        proposals: "12 proposals",
        image: "https://i.ibb.co/HDHfcBry/download-2.jpg",
        description: "Looking for a skilled iOS developer to handle both mobile and web aspects of our ACG platform."
    },
    {
        title: "React Landing Page Developer",
        company: "TechSolve",
        postedDate: "2024-12-20",
        proposals: "8 proposals",
        image: "https://i.ibb.co/xK78xMYv/download-2.png",
        description: "Design and develop a responsive landing page for our startup product launch using React and Tailwind."
    },
    {
        title: "Backend Developer for eCommerce",
        company: "NextGen Ltd.",
        postedDate: "2025-01-10",
        proposals: "18 proposals",
        image: "https://i.ibb.co/99ZVk0kv/download.jpg",
        description: "Need a Node.js expert to build scalable backend APIs for our growing eCommerce platform."
    },
    {
        title: "UI/UX Designer for Mobile App",
        company: "DesignMax",
        postedDate: "2025-04-01",
        proposals: "5 proposals",
        image: "https://i.ibb.co/CpfD18Xb/download-1.jpg",
        description: "Seeking a creative designer to revamp our mobile app’s user experience and visual interface."
    },
    {
        title: "WordPress Website Customization",
        company: "WP Experts",
        postedDate: "2025-05-10",
        proposals: "10 proposals",
        image: "https://i.ibb.co/LdjZZYQn/download.png",
        description: "Customize and optimize an existing WordPress site with plugin setup, performance tuning and design fixes."
    },
];

const Latest = () => {
    const { theme } = useContext(ThemeContext);

    const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
    const containerBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
    const hoverBorder = theme === 'dark' ? 'hover:border-purple-500' : 'hover:border-purple-700';
    const hoverShadow = theme === 'dark' ? 'hover:shadow-purple-700/30' : 'hover:shadow-purple-500/40';

    return (
        <div className={`${bgColor} min-h-screen py-9 poppins-font`}>
            <div className={`px-6 py-10 max-w-7xl mx-auto rounded-2xl text-left ${containerBg}`}>
                <div className="mb-8">
                    <h1 className={`text-4xl text-center font-semibold mb-2 ${textPrimary}`}>Latest Projects</h1>
                    <p className={`text-center ${textSecondary}`}>Know your worth and find the project that qualifies your life</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`border ${borderColor} rounded-xl p-5 transition duration-300 bg-transparent text-left cursor-pointer
                          ${hoverBorder} ${hoverShadow} ${textPrimary}`}
                        >
                            <div className="sm:flex sm:items-start sm:gap-4 lg:gap-6">
                                <div className="sm:shrink-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`size-16 rounded-full object-cover sm:size-[72px] border-2 border-purple-600`}
                                    />
                                </div>

                                <div className="mt-4 sm:mt-0 flex-1">
                                    <h3 className="text-lg font-semibold text-purple-400">{project.title}</h3>
                                    <p className="text-sm text-purple-500">{project.company}</p>
                                    <p className={`mt-3 text-sm line-clamp-3 ${textSecondary}`}>
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            <dl className={`mt-6 flex flex-wrap gap-4 lg:gap-6 text-xs ${textSecondary}`}>
                                <div>
                                    <dt className="font-medium text-purple-500">Posted</dt>
                                    <dd>{timeAgo(project.postedDate)}</dd>
                                </div>
                                <div>
                                    <dt className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Proposals</dt>
                                    <dd>{project.proposals}</dd>
                                </div>
                            </dl>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Latest;
