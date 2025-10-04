import React, { useState } from 'react';
import { FaGavel } from 'react-icons/fa';
import { useLoaderData, Link } from 'react-router';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FaArrowLeft } from "react-icons/fa";
// hiiii
const Details = () => {
    const data = useLoaderData();
    const { _id, title, category, description, budget, deadline } = data;

    const [bidCount, setBidCount] = useState(data.bidCount || 0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePlaceBid = () => {
     
        setLoading(true);
        const newCount = bidCount + 1;

        fetch(`https://backend-zeta-ochre-92.vercel.app/working/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bidCount: newCount })
        })
            .then(res => {
                if (!res.ok) throw new Error('Network response not ok');
                return res.json();
            })
            .then(updated => {
                setBidCount(updated.bidCount || newCount);
                setSuccess(true);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen bg-black text-white poppins-font p-8">
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-800 rounded-lg text-white font-semibold transition">
                    <FaArrowLeft />
                    Back to Home
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
                            {category || 'N/A'}
                        </span>

                        <h1 className="mt-6 text-4xl font-extrabold text-white">{title || 'No Title'}</h1>

                        <p className="mt-6 text-lg text-gray-300 leading-relaxed">{description || 'No description provided.'}</p>

                        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-10 text-xl text-gray-200">
                            <p
                                className="cursor-help"
                                data-tooltip-id="tooltip-budget"
                                data-tooltip-content="Estimated budget for this task">
                                <strong>Budget:</strong>{' '}
                                <span className="text-purple-400">${budget || 0}</span>
                            </p>
                            <p
                                className="cursor-help"
                                data-tooltip-id="tooltip-deadline"
                                data-tooltip-content="Deadline for task completion">
                                <strong>Deadline:</strong>{' '}
                                <span className="text-purple-400">{deadline || 'Not set'}</span>
                            </p>
                        </div>

                        <div className="mt-10 flex flex-col items-start gap-4">
                            <button
                                onClick={handlePlaceBid}
                                disabled={loading}
                                className={`bg-purple-500 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded-lg transition flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <FaGavel size={20} />
                                {loading ? 'Placing...' : 'Place a Bid'}
                            </button>
                            {success && (
                                <span className="text-sm text-green-400">
                                    Your bid has been placed successfully!
                                </span>
                            )}
                            <span className="text-sm text-gray-300">
                                Bids placed: <span className="font-bold text-purple-400">{bidCount}</span>
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

export default Details;