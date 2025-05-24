import React from 'react';
import { Fade, Slide, Zoom, AttentionSeeker, JackInTheBox } from 'react-awesome-reveal';

// Original theme retained
const theme = {
    primary: '#000000',
    secondary: '#6b21a8',
};

const timeAgo = (postedDate) => {
    const now = new Date();
    const posted = new Date(postedDate);
    const diffInMs = now - posted;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
};

const projects = [
    {
        title: 'Developer for ACG iOS apps and Website',
        company: 'APInter',
        postedDate: '2024-10-12',
        proposals: '12 proposals',
        image: 'https://i.ibb.co/HDHfcBry/download-2.jpg',
        description: 'Looking for a skilled iOS developer for our ACG platform.',
    },
    {
        title: 'React Landing Page Developer',
        company: 'TechSolve',
        postedDate: '2024-12-20',
        proposals: '8 proposals',
        image: 'https://i.ibb.co/xK78xMYv/download-2.png',
        description: 'Build a responsive landing page for our startup launch.',
    },
    {
        title: 'Backend Developer for eCommerce',
        company: 'NextGen Ltd.',
        postedDate: '2025-01-10',
        proposals: '18 proposals',
        image: 'https://i.ibb.co/99ZVk0kv/download.jpg',
        description: 'Need a Node.js expert for our scalable backend APIs.',
    },
    {
        title: 'UI/UX Designer for Mobile App',
        company: 'DesignMax',
        postedDate: '2025-04-01',
        proposals: '5 proposals',
        image: 'https://i.ibb.co/CpfD18Xb/download-1.jpg',
        description: 'Revamp our mobile app UX and visual interface.',
    },
    {
        title: 'WordPress Website Customization',
        company: 'WP Experts',
        postedDate: '2025-05-10',
        proposals: '10 proposals',
        image: 'https://i.ibb.co/LdjZZYQn/download.png',
        description: 'Customize and optimize a WordPress site.',
    },
];

const Latest = () => (
    <div className="min-h-screen py-12 poppins-font" style={{ backgroundColor: theme.primary }}>
        <div className="px-6 py-10 max-w-7xl mx-auto bg-gray-800 rounded-2xl text-center">
            <Fade cascade direction="up" triggerOnce damping={0.2}>
                <h1 className="text-5xl font-bold mb-4 text-white">Latest Projects</h1>
            </Fade>

            <AttentionSeeker effect="pulse" triggerOnce>
                <p className="text-lg text-purple-300 mb-10">
                    Discover exciting gigs that match your skills and passions.
                </p>
            </AttentionSeeker>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                    <Zoom triggerOnce delay={i * 100} key={i}>
                        <div
                            className="group border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 bg-black text-white flex flex-col"
                            style={{ borderColor: theme.secondary, minHeight: '480px' }}
                        >
                            <JackInTheBox triggerOnce>
                                <div className="my-6">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-32 h-32 rounded-full mx-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </JackInTheBox>

                            <div className="p-6 text-left flex flex-col flex-grow">
                                <Fade direction="left" triggerOnce>
                                    <h3 className="text-xl font-semibold mb-1 text-purple-400">
                                        {project.title}
                                    </h3>
                                </Fade>

                                <Slide direction="up" triggerOnce>
                                    <p className="text-sm text-purple-500 mb-4">{project.company}</p>
                                </Slide>

                                <p className="text-gray-300 mb-6 line-clamp-3 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex justify-between text-xs text-gray-400 mt-auto">
                                    <div>
                                        <span className="font-medium text-purple-500">Posted:</span> {timeAgo(project.postedDate)}
                                    </div>
                                    <div>
                                        <span className="font-medium text-purple-500">Proposals:</span> {project.proposals}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                ))}
            </div>
        </div>
    </div>
);

export default Latest;