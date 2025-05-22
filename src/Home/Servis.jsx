import React from 'react';
import { SiAltiumdesigner } from 'react-icons/si';

const Servis = () => {
    return (
        <div className="bg-white font-display px-6   dark:bg-black py-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-purple-500 dark:text-purple-500 text-left">
                    Our Services
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Get inspired by 800+ skills and discover the perfect freelancer for your next big project.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 justify-center items-center">
                    {[
                        { title: 'Design & Creative', color: 'text-purple-500', services: 8, desc: 'Logos, branding, illustrations, and UI/UX design tailored to your brand.' },
                        { title: 'Digital Marketing', color: 'text-green-500', services: 12, desc: 'Boost your reach through SEO, social media marketing, and paid ads.' },
                        { title: 'Web Designing', color: 'text-blue-500', services: 5, desc: 'Clean and responsive web design for personal, business, or eCommerce sites.' },
                        { title: 'Video Editing', color: 'text-red-500', services: 7, desc: 'Professional video production, cuts, transitions, and motion graphics.' },
                        { title: 'Data Analysis', color: 'text-indigo-500', services: 6, desc: 'Data mining, visualization, and actionable insights from your datasets.' },
                        { title: 'Photography', color: 'text-pink-500', services: 9, desc: 'Professional photo shoots, editing, and event coverage services.' },

                    ].map((service, index) => (


                        <div
                            key={index}
                            className="border border-purple-500 p-6 rounded-lg flex flex-col max-w-xs w-full items-start bg-white dark:bg-gray-800  hover:border-purple-900 hover:shadow-lg transition  duration-300 ease-in-out">
                            <SiAltiumdesigner size={29} className={`${service.color} mb-4`} />
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{service.services} Services</p>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-purple-500">{service.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{service.desc}</p>
                        </div>



                    ))}
                </div>
            </div>
        </div>
    );
};

export default Servis;
