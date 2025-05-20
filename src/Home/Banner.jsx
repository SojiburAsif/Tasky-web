import React from 'react';

const Banner = () => {
    return (
        <section className="bg-gradient-to-r from-black via-[rgba(255,255,255,0.05)] via-5% via-purple-700 via-30% to-black to-60% lg:grid lg:h-screen lg:place-content-center">
            <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 text-white">
                <div className="max-w-prose">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Understand user flow and
                        <strong className="text-purple-300"> increase </strong>
                        conversions
                    </h1>

                    <p className="mt-4 text-base sm:text-lg/relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident
                        accusamus impedit minima harum corporis iusto.
                    </p>

                    <div className="mt-6 flex gap-4">
                        <a
                            className="inline-block rounded border border-purple-300 bg-purple-300 px-5 py-3 font-medium text-black shadow-sm transition-colors hover:bg-purple-400"
                            href="#"
                        >
                            Get Started
                        </a>

                        <a
                            className="inline-block rounded border border-white px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-purple-800"
                            href="#"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
