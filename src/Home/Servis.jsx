import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaPaintBrush, FaBullhorn, FaLaptopCode, FaVideo, FaChartBar, FaCamera } from 'react-icons/fa';

const services = [
    {
        title: 'Design & Creative',
        icon: <FaPaintBrush size={29} className="text-purple-500 mb-4" />,
        services: 8,
        desc: 'Logos, branding, illustrations, and UI/UX design tailored to your brand.'
    },
    {
        title: 'Digital Marketing',
        icon: <FaBullhorn size={29} className="text-green-500 mb-4" />,
        services: 12,
        desc: 'Boost your reach through SEO, social media marketing, and paid ads.'
    },
    {
        title: 'Web Designing',
        icon: <FaLaptopCode size={29} className="text-blue-500 mb-4" />,
        services: 5,
        desc: 'Clean and responsive web design for personal, business, or eCommerce sites.'
    },
    {
        title: 'Video Editing',
        icon: <FaVideo size={29} className="text-red-500 mb-4" />,
        services: 7,
        desc: 'Professional video production, cuts, transitions, and motion graphics.'
    },
    {
        title: 'Data Analysis',
        icon: <FaChartBar size={29} className="text-indigo-500 mb-4" />,
        services: 6,
        desc: 'Data mining, visualization, and actionable insights from your datasets.'
    },
    {
        title: 'Photography',
        icon: <FaCamera size={29} className="text-pink-500 mb-4" />,
        services: 9,
        desc: 'Professional photo shoots, editing, and event coverage services.'
    },
];

const Servis = () => {
    return (
        <div className="bg-white dark:bg-black poppins-font px-6 py-12">
            <div className="max-w-7xl mx-auto">
                {/* Marquee Section */}
                <Marquee gradient={false} speed={50} className="mb-8">
                    <div className="flex items-center gap-8 text-purple-600 dark:text-purple-400 font-semibold text-lg">
                        <FaPaintBrush /> Design & Creative
                        <FaBullhorn /> Digital Marketing
                        <FaLaptopCode /> Web Design
                        <FaVideo /> Video Editing
                        <FaChartBar /> Data Analysis
                        <FaCamera /> Photography
                    </div>
                </Marquee>

                {/* Section Title */}
                <h2 className="text-4xl font-bold text-purple-500 text-left">
                    Our Services
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Get inspired by 800+ skills and discover the perfect freelancer for your next big project.
                </p>

                {/* Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 justify-center items-center">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="border border-purple-500 p-6 rounded-lg flex flex-col max-w-xs w-full items-start bg-white dark:bg-gray-800 hover:border-purple-900 hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            {service.icon}
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                {service.services} Services
                            </p>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-purple-500">
                                {service.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Servis;
