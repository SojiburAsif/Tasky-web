import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';

const images = [
    "https://images.pexels.com/photos/461064/pexels-photo-461064.jpeg",
    "https://i.postimg.cc/YCH4GvTd/jeshoots-com-p8ka-VRe4ed-M-unsplash-1.jpg",
    "https://i.postimg.cc/LXWDWwvx/image.png",
];

const Banner = () => {
    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen flex flex-col poppins-font md:flex-row items-start justify-start">
            <div className="w-full md:w-1/2 px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-24 lg:py-32 mx-auto">
                <div className="max-w-prose text-left">
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
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

                    <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-200">
                        our platform connects you to skilled professionals worldwide. Post your project, collaborate seamlessly, and achieve outstanding results.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/add-task"
                            className="inline-block rounded border border-purple-500 bg-purple-500 px-6 py-3 font-medium text-white shadow-sm 
             transition-transform duration-300 hover:bg-purple-700 hover:scale-105 
             active:scale-95 active:bg-purple-800" >
                            Post a Project
                        </Link>

                        <Link
                            to="#"
                            className="inline-block rounded border border-gray-200 px-6 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
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
