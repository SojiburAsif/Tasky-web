import React from 'react';
import { useLoaderData, Link } from 'react-router';

const Deatils = () => {
  const data = useLoaderData();
  const { title, category, description, budget, deadline } = data;

  return (
    <div className="min-h-screen bg-black font-display  text-white p-8">
      <Link
        to="/"
        className="inline-block mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-800 rounded-lg text-white font-semibold transition"
      >
        ← Back to Home
      </Link>

      <article className="bg-gray-900 p-10 shadow-2xl rounded-3xl ring-1 ring-gray-700 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:gap-12">
          <div
            className="hidden sm:grid sm:size-32 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-4 sm:border-purple-600"
            aria-hidden="true"
          >
            <div className="flex items-center gap-1">
              <span className="h-14 w-1 rounded-full bg-purple-600"></span>
              <span className="h-12 w-1 rounded-full bg-purple-600"></span>
              <span className="h-10 w-1 rounded-full bg-purple-600"></span>
              <span className="h-12 w-1 rounded-full bg-purple-600"></span>
              <span className="h-14 w-1 rounded-full bg-purple-600"></span>
            </div>
          </div>

          <div className="flex-1">
            <span className="inline-block rounded-full border border-purple-600 bg-purple-600 px-5 py-2 text-sm font-medium text-white">
              {category}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold text-white">
              {title}
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              {description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-10 text-xl text-gray-200">
              <p><strong>Budget:</strong> <span className="text-purple-400">${budget}</span></p>
              <p><strong>Deadline:</strong> <span className="text-purple-400">{deadline}</span></p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Deatils;
