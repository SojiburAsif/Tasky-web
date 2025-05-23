import React, { } from 'react';
import { FaGavel } from 'react-icons/fa';
import { useLoaderData, Link } from 'react-router';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


const Deatils = () => {
    const data = useLoaderData();
    const { _id,  title, category, description, budget, deadline } = data;



    return (
        <div className="min-h-screen bg-black poppins-font text-white p-8">
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/"
                    className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-800 rounded-lg text-white font-semibold transition">
                    ← Back to Home
                </Link>

            </div>

            <article className="bg-gray-900 p-10 shadow-2xl rounded-3xl ring-1 ring-gray-700 max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:gap-12">
                    <div
                        className="hidden sm:grid sm:size-32 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-4 sm:border-purple-600"
                        aria-hidden="true">
                        <div className="flex items-center gap-1">
                            <span className="h-14 w-1 rounded-full bg-purple-600"></span>
                            <span className="h-12 w-1 rounded-full bg-purple-600"></span>
                            <span className="h-10 w-1 rounded-full bg-purple-600"></span>
                            <span className="h-12 w-1 rounded-full bg-purple-600"></span>
                            <span className="h-14 w-1 rounded-full bg-purple-600"></span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <span
                            className="inline-block rounded-full border border-purple-600 bg-purple-600 px-5 py-2 text-sm font-medium text-white cursor-help"
                            data-tooltip-id="tooltip-category"
                            data-tooltip-content="This is the task category">
                            {category}
                        </span>

                        <h1 className="mt-6 text-4xl font-extrabold text-white">{title}</h1>

                        <p className="mt-6 text-lg text-gray-300 leading-relaxed">{description}</p>

                        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-10 text-xl text-gray-200">
                            <p
                                className="cursor-help"
                                data-tooltip-id="tooltip-budget"
                                data-tooltip-content="Estimated budget for this task">
                                <strong>Budget:</strong>{' '}
                                <span className="text-purple-400">${budget}</span>
                            </p>
                            <p
                                className="cursor-help"
                                data-tooltip-id="tooltip-deadline"
                                data-tooltip-content="Deadline for task completion">
                                <strong>Deadline:</strong>{' '}
                                <span className="text-purple-400">{deadline}</span>
                            </p>
                        </div>

                        <div className="mt-10 flex items-center gap-4 justify-between">
                            <button
                                onClick={() => { alert('Place bid logic here'); }}
                                className="bg-purple-500 hover:bg-purple-700 cursor-pointer text-black font-bold py-2 px-4 rounded-lg transition flex items-center gap-2">
                                <FaGavel className="text-black" size={20} />
                                Place a Bid
                            </button>

                            <span className="text-sm text-gray-300">
                                Bids placed: <span className="font-bold text-purple-400">23</span>
                            </span>
                        </div>
                    </div>
                </div>
            </article>

            <Tooltip id="tooltip-category" />
            <Tooltip id="tooltip-budget" />
            <Tooltip id="tooltip-deadline" />
        </div>
    );
};

export default Deatils;
