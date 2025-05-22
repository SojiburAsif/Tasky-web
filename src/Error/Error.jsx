import React from "react";
import { Link } from "react-router";  

const Error = () => {
    return (
        <section className="w-screen  h-screen bg-black flex items-center justify-center relative overflow-hidden">
            <div className="text-center px-4">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-purple-500 sm:text-[80px] md:text-[100px]">
                    404
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                    Oops! That page can’t be found
                </h4>
                <p className="mb-8 text-lg text-gray-300">
                    The page you are looking for might have been deleted or moved.
                </p>

                <Link
                    to="/"
                    className="inline-block rounded-lg border border-purple-500 px-8 py-3 text-base font-semibold text-purple-500 transition hover:bg-purple-500 hover:text-black"
                >
                    Go To Home
                </Link>
            </div>

          
            <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14 opacity-10">
                <div className="h-full w-1/3 bg-gradient-to-t from-purple-500 to-transparent"></div>
                <div className="flex h-full w-1/3">
                    <div className="h-full w-1/2 bg-gradient-to-b from-purple-500 to-transparent"></div>
                    <div className="h-full w-1/2 bg-gradient-to-t from-purple-500 to-transparent"></div>
                </div>
                <div className="h-full w-1/3 bg-gradient-to-b from-purple-500 to-transparent"></div>
            </div>
        </section>
    );
};

export default Error;
