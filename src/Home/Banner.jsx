import React, { useContext } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import { ThemeContext } from '../Header/ThemsProvider';

const images = [
    "https://images.pexels.com/photos/461064/pexels-photo-461064.jpeg",
    "https://i.postimg.cc/YCH4GvTd/jeshoots-com-p8ka-VRe4ed-M-unsplash-1.jpg",
    "https://i.postimg.cc/LXWDWwvx/image.png",
];

const Banner = () => {
    const { theme } = useContext(ThemeContext); 

    return (
        <section
            className={`min-h-screen flex  flex-col md:flex-row items-start justify-start poppins-font transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                }`}
        >
            <div className="w-full md:w-1/2 px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-24 lg:py-32 mx-auto">
                <div className="max-w-prose mx-4 text-left">
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                        Empower Your{' '}
                        <span className="text-purple-500">
                            <Typewriter
                                words={['Projects', 'Ideas', 'Visions']}
                                loop={true}
                                cursor
                                cursorStyle="|"
                                typeSpeed={100}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>{' '}
                        with Top Freelancers
                    </h1>

                    <p className="mt-4 text-base sm:text-lg">
                        our platform connects you to skilled professionals worldwide. Post your project, collaborate seamlessly, and achieve outstanding results.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/add-task"
                            className="inline-block rounded border border-purple-500 bg-purple-500 px-6 py-3 font-medium text-white shadow-sm 
              transition-transform duration-300 hover:bg-purple-700 hover:scale-105 
              active:scale-95 active:bg-purple-800"
                        >
                            Post a Project
                        </Link>

                        <Link
                            to="#"
                            className={`inline-block rounded border px-6 py-3 font-medium shadow-sm transition-colors ${theme === 'dark'
                                    ? 'border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            Find Freelancer
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[50%] px-4 pt-6 md:pt-12 md:pr-12">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    keyboard={{ enabled: true }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Keyboard, Pagination, Navigation]}
                    className="rounded-2xl"
                >
                    {images.map((src, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                className="w-full h-[200px] sm:h-[250px] md:h-full object-cover rounded-2xl"
                                src={src}
                                alt={`Slide ${idx + 1}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Banner;
