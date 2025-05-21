import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const FeaturedTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/working')
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/working/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data?.deletedCount > 0 || data?.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            });
                            setTasks(prev => prev.filter(task => task._id !== _id));
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Could not delete the task.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(err => {
                        console.error("Delete error:", err);
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while deleting.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const handleUpdate = (_id) => {
        console.log('Updating task with ID:', _id);
        // Future: Navigate to edit form or show modal
    };

    const handleDetails = (_id) => {
        console.log('Viewing details for task ID:', _id);
        // Future: Navigate to /task/:id or open modal
    };

    return (
        <section className="w-full max-w-6xl mx-auto py-12">
            <h2 className="text-3xl text-center font-bold text-purple-500 mb-8">Featured Tasks</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map(task => (
                    <article
                        key={task._id}
                        className="rounded-xl bg-black text-white p-4 shadow- ring-1 ring-gray-800
                         hover:ring-purple-200 hover:shadow-purple-800 transition-all duration-300 sm:p-6 lg:p-8"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-purple-400">
                                {task.title}
                            </h3>

                            <div className="flex gap-3">
                                <Link to={`/update/${task._id}`}>
                                    <button onClick={() => handleUpdate(task._id)} className="text-blue-400 hover:text-blue-600">
                                        <FaEdit />
                                    </button>
                                </Link>
                                <button onClick={() => handleDelete(task._id)} className="text-red-400 hover:text-red-600">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>

                        <p className="text-sm mb-2">
                            <strong className="text-gray-300">Category:</strong> {task.category}
                        </p>

                        <p className="text-gray-300 mb-4">{task.description}</p>

                        <div className="flex justify-between text-sm text-gray-400 mb-4">
                            <p><strong>Budget:</strong> ${task.budget}</p>
                            <p><strong>Deadline:</strong> {task.deadline}</p>
                        </div>
                        <Link to={`/view-deatils/${task._id}`} >
                            <button
                                onClick={() => handleDetails(task._id)}
                                className="mt-auto bg-purple-600 hover:bg-purple-700 hover:shadow-purple-400 text-white  px-4 py-2 rounded w-full text-center"
                            >
                                View Details
                            </button>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FeaturedTasks;
