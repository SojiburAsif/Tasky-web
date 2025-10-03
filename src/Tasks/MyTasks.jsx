import React, { useContext, useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Header from '../Header/Header';
import { FaTrash, FaEdit, FaDollarSign } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { ThemeContext } from '../Header/ThemsProvider';

const MyTasks = () => {
    const tasks = useLoaderData();
    const { user } = useContext(AuthContext);
    const [myTasks, setMyTasks] = useState(
        tasks.filter(task => task.email === user?.email)
    );
    const { theme } = useContext(ThemeContext);

    const handleDelete = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://backend-zeta-ochre-92.vercel.app/working/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0 || data.success) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your task has been deleted.',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            setMyTasks(prev => prev.filter(task => task._id !== _id));
                        } else {
                            Swal.fire('Error!', 'Could not delete the task.', 'error');
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error!', 'An error occurred while deleting.', 'error');
                    });
            }
        });
    };

    const cardText = theme === 'dark' ? 'text-white' : 'text-black';
    const badgeColor = theme === 'dark' ? 'border-purple-400 text-purple-400' : 'border-purple-600 text-purple-600';

    return (
        <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} min-h-screen poppins-font`}>
            <Header />
            <div className="max-w-6xl mx-auto px-4 mt-12 py-12">
                <h2 className={`text-4xl font-bold text-center mb-10 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    My Posted Tasks
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myTasks.length > 0 ? myTasks.map(task => (
                        <div key={task._id} className="card card-compact shadow-lg border border-purple-200 dark:border-gray-700">
                            <div className="card-body">
                                <h2 className="card-title text-purple-700 dark:text-purple-400">{task.title}</h2>
                                <p className={`text-sm font-semibold ${cardText}`}>{task.category}</p>
                                <p className={`${cardText} line-clamp-2`}>{task.description}</p>

                                <div className="card-actions justify-between items-center mt-4">
                                    <span className={`badge badge-outline font-semibold flex items-center gap-1 ${badgeColor}`}>
                                        <FaDollarSign size={12} />{task.budget}
                                    </span>
                                    <span className={`text-xs ${cardText}`}>
                                        Deadline: {new Date(task.deadline).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className={`mt-2 text-xs ${cardText}`}>
                                    By {task.username}
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <Link to={`/update/${task._id}`} className="text-purple-500 hover:text-purple-300">
                                        <FaEdit size={20} />
                                    </Link>
                                    <button onClick={() => handleDelete(task._id)} className="text-red-500 mb-4 hover:text-red-300">
                                        <FaTrash size={20} />
                                    </button>
                                    <Link
                                        to={`/view-deatils/${task._id}`}
                                        className="ml-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className={`text-center text-lg col-span-full ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                            You have not posted any tasks yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyTasks;
