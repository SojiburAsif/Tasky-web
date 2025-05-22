import React, { useContext, useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Header from '../Header/Header';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyTasks = () => {
    const tasks = useLoaderData(); // assume loader returns array of tasks
    const { user } = useContext(AuthContext);
    const [myTasks, setMyTasks] = useState(
        tasks.filter(task => task.email === user?.email)
    );

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

    return (
        <div className="bg-gray-800 min-h-screen font-display">
            <Header />
            <div className="max-w-5xl mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold text-white text-center mb-10">
                    My Posted Tasks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                    {myTasks.length > 0 ? myTasks.map(task => (
                        <div
                            key={task._id}
                            className="bg-black w-full max-w-md p-6 rounded-2xl shadow-lg border-2 border-purple-600 hover:border-purple-300 hover:shadow-purple-800 transition"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4">
                                {task.title}
                            </h3>
                            <p className="text-white mb-6 line-clamp-3">
                                {task.description}
                            </p>
                            <div className="space-y-2 text-purple-200 mb-4">
                                <p><span className="font-semibold">Category:</span> {task.category}</p>
                                <p><span className="font-semibold">Budget:</span> ${task.budget}</p>
                                <p><span className="font-semibold">Deadline:</span> {task.deadline}</p>
                            </div>
                            <div className="flex gap-4 mt-auto">
                                <Link to={`/update/${task._id}`} className="mt-2 text-purple-400 hover:text-purple-200">
                                    <FaEdit size={22} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="text-red-500 hover:text-red-300"
                                >
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
                    )) : (
                        <p className="text-center text-purple-300 text-lg col-span-full">
                            You have not posted any tasks yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyTasks;
