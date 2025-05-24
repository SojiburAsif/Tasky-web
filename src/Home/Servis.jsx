import React, { useContext } from 'react';
import Marquee from 'react-fast-marquee';
import { FaPaintBrush, FaBullhorn, FaLaptopCode, FaVideo, FaChartBar, FaCamera } from 'react-icons/fa';
import { ThemeContext } from '../Header/ThemsProvider';  

const services = [
    {
        title: 'Design & Creative',
        icon: <FaPaintBrush size={29} className="mb-4" />,
        services: 8,
        desc: 'Logos, branding, illustrations, and UI/UX design tailored to your brand.'
    },
    {
        title: 'Digital Marketing',
        icon: <FaBullhorn size={29} className="mb-4" />,
        services: 12,
        desc: 'Boost your reach through SEO, social media marketing, and paid ads.'
    },
    {
        title: 'Web Designing',
        icon: <FaLaptopCode size={29} className="mb-4" />,
        services: 5,
        desc: 'Clean and responsive web design for personal, business, or eCommerce sites.'
    },
    {
        title: 'Video Editing',
        icon: <FaVideo size={29} className="mb-4" />,
        services: 7,
        desc: 'Professional video production, cuts, transitions, and motion graphics.'
    },
    {
        title: 'Data Analysis',
        icon: <FaChartBar size={29} className="mb-4" />,
        services: 6,
        desc: 'Data mining, visualization, and actionable insights from your datasets.'
    },
    {
        title: 'Photography',
        icon: <FaCamera size={29} className="mb-4" />,
        services: 9,
        desc: 'Professional photo shoots, editing, and event coverage services.'
    },
];

const Servis = () => {
    const { theme } = useContext(ThemeContext);


    const iconColor = (index) => {
        const colorsLight = ['text-purple-500', 'text-green-500', 'text-blue-500', 'text-red-500', 'text-indigo-500', 'text-pink-500'];
        const colorsDark = ['text-purple-400', 'text-green-400', 'text-blue-400', 'text-red-400', 'text-indigo-400', 'text-pink-400'];
        return theme === 'dark' ? colorsDark[index] : colorsLight[index];
    };

    return (
        <div className={`poppins-font px-6 py-12 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
            
                <Marquee gradient={false} speed={50} className="mb-8">
                    <div className={`flex items-center gap-8 font-semibold text-lg ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                        <FaPaintBrush /> Design & Creative
                        <FaBullhorn /> Digital Marketing
                        <FaLaptopCode /> Web Design
                        <FaVideo /> Video Editing
                        <FaChartBar /> Data Analysis
                        <FaCamera /> Photography
                    </div>
                </Marquee>

        
                <h2 className={`text-4xl font-bold text-left ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`}>
                    Our Services
                </h2>
                <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Get inspired by 800+ skills and discover the perfect freelancer for your next big project.
                </p>

          
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 justify-center items-center">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`border p-6 rounded-lg flex flex-col max-w-xs w-full items-start transition duration-300 ease-in-out
                                ${theme === 'dark'
                                    ? 'bg-gray-900 border-purple-700 hover:border-purple-500 hover:shadow-lg text-white'
                                    : 'bg-white border-purple-500 hover:border-purple-900 hover:shadow-lg text-gray-900'
                                }
                            `}
                        >
                        
                            {React.cloneElement(service.icon, { className: `${iconColor(index)} mb-4` })}

                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm mb-1`}>
                                {service.services} Services
                            </p>
                            <h3 className={`${theme === 'dark' ? 'text-purple-400' : 'text-gray-800'} text-lg font-semibold`}>
                                {service.title}
                            </h3>
                            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm mt-1`}>
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
