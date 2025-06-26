import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import Header from '../Header/Header';
import Loading from '../Loding/Loding';
import { ThemeContext } from '../Header/ThemsProvider';

const AllPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);

    const [deadlineOrder, setDeadlineOrder] = useState('asc'); // asc or desc
    const [budgetOrder, setBudgetOrder] = useState('asc');     // asc or desc
    const [filterCategory, setFilterCategory] = useState('All');

    useEffect(() => {
        fetch('https://backend-zeta-ochre-92.vercel.app/working')
            .then(res => {
                if (!res.ok) throw new Error('Fetch failed');
                return res.json();
            })
            .then(data => {
                setTasks(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading />;
    if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

    const categories = ['All', ...new Set(tasks.map(t => t.category))];

    let filtered = tasks.filter(t => filterCategory === 'All' || t.category === filterCategory);

    // Sort by deadline first
    filtered.sort((a, b) => {
        const aD = new Date(a.deadline);
        const bD = new Date(b.deadline);
        return deadlineOrder === 'asc' ? aD - bD : bD - aD;
    });

    // Then sort by budget
    filtered.sort((a, b) => {
        const aB = +a.budget;
        const bB = +b.budget;
        return budgetOrder === 'asc' ? aB - bB : bB - aB;
    });

    // Theme based classes
    const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-base-200';
    const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
    const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const cardTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const cardBorder = theme === 'dark' ? 'border border-gray-700' : 'border border-gray-300';
    const selectBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900';
    const selectBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

    return (
        <div className={`${bgColor} min-h-screen`}>
            <Header />

            <div className={`max-w-6xl mx-auto px-4 py-6 ${textColor}`}>
                <h1 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">All Freelancing Tasks</h1>

                {/* Controls */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* Filter by category */}
                    <div className="form-control w-48">
                        <label className={`label ${textColor}`}>
                            <span className="label-text font-semibold">Category</span>
                        </label>
                        <select
                            className={`select select-bordered ${selectBg} border ${selectBorder} focus:outline-none focus:ring-2 focus:ring-purple-500 rounded`}
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort by deadline */}
                    <div className="form-control w-48">
                        <label className={`label ${textColor}`}>
                            <span className="label-text font-semibold">Sort Deadline</span>
                        </label>
                        <select
                            className={`select select-bordered ${selectBg} border ${selectBorder} focus:outline-none focus:ring-2 focus:ring-purple-500 rounded`}
                            value={deadlineOrder}
                            onChange={e => setDeadlineOrder(e.target.value)}
                        >
                            <option value="asc">Earliest First</option>
                            <option value="desc">Latest First</option>
                        </select>
                    </div>

                    {/* Sort by budget */}
                    <div className="form-control w-48">
                        <label className={`label ${textColor}`}>
                            <span className="label-text font-semibold">Sort Budget</span>
                        </label>
                        <select
                            className={`select select-bordered ${selectBg} border ${selectBorder} focus:outline-none focus:ring-2 focus:ring-purple-500 rounded`}
                            value={budgetOrder}
                            onChange={e => setBudgetOrder(e.target.value)}
                        >
                            <option value="asc">Lowest First</option>
                            <option value="desc">Highest First</option>
                        </select>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(task => (
                        <Link
                            to={`/tasks/${task._id}`}
                            key={task._id}
                            className={`${cardBg} ${cardTextColor} ${cardBorder} card card-compact shadow-lg hover:shadow-2xl transition rounded-lg`}
                        >
                            <div className="card-body">
                                <h2 className="card-title text-purple-500">{task.title}</h2>
                                <p className="text-sm font-semibold">{task.category}</p>
                                <p className="line-clamp-2">{task.description}</p>
                                <div className="card-actions justify-between items-center mt-4">
                                    <span className="badge badge-outline border-purple-600 text-purple-600 font-semibold dark:border-purple-400 dark:text-purple-400">
                                        ৳{task.budget}
                                    </span>
                                    <span className="text-xs">
                                        Deadline: {new Date(task.deadline).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="mt-2 text-xs">
                                    By {task.username}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllPage;
