import React, { useContext, useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaGavel } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import Header from '../Header/Header';
import { AuthContext } from '../Contexts/AuthContext';
import Loading from '../Loding/Loding';

const HomeTasks = () => {
    const { loading } = useContext(AuthContext);



    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('https://backend-zeta-ochre-92.vercel.app/working')
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
                setTasks(sorted);
            });
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
                fetch(`https://backend-zeta-ochre-92.vercel.app/working/${_id}`, {
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
                            Swal.fire({ title: "Error!", text: "Could not delete the task.", icon: "error" });
                        }
                    })
                    .catch(() => {
                        Swal.fire({ title: "Error!", text: "An error occurred while deleting.", icon: "error" });
                    });
            }
        });
    };

    const daysUntil = (deadline) => {
        const today = new Date();
        const taskDate = new Date(deadline);
        const diff = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));
        return diff;
    };



    if (loading) {
        return <Loading></Loading>;
    }
    return (
        <div className='   bg-black
    min-h-screen
poppins-font
    hover:animate-purpleGlow
    transition-colors duration-500 ease-in-out '>

            <section className="w-full px-8 mx-auto max-w-7xl py-12">
                <h2 className="text-3xl text-center font-bold text-purple-500 mb-8">Featured Tasks</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.slice(0, 6).map(task => {
                        const days = daysUntil(task.deadline);
                        const urgent = days <= 15 && days >= 0;
                        return (
                            <div
                                key={task._id}
                                className={`rounded-xl bg-gray-900 text-white p-6 shadow ring-2 transition-all duration-300 flex flex-col justify-between
                                    ${urgent
                                        ? 'ring-red-500 hover:ring-red-300'
                                        : 'ring-gray-800 hover:ring-purple-200 hover:shadow-purple-800'
                                    }`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-purple-400">{task.title}</h3>
                                        <div className="flex gap-3 items-center">

                                            <Link to={`/update/${task._id}`}><FaEdit className="text-blue-400 hover:text-blue-600 cursor-pointer" size={20} /></Link>
                                            <FaTrash onClick={() => handleDelete(task._id)} className="text-red-400 hover:text-red-600 cursor-pointer" size={20} />
                                        </div>
                                    </div>
                                    <p className="text-sm mb-2"><strong className="text-gray-400">Category:</strong> {task.category}</p>
                                    <p className="text-gray-300 mb-4 flex-grow">{task.description}</p>
                                    <div className="flex justify-between text-sm text-gray-400 mb-4">
                                        <p><strong>Budget:</strong> <span className="text-indigo-400">${task.budget}</span></p>
                                        <p className={`font-semibold text-base ${urgent ? 'text-red-500' : 'text-purple-400'}`}>Deadline: {task.deadline} ({days}d)</p>
                                    </div>
                                </div>
                                <Link to={`/view-deatils/${task._id}`}>
                                    <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full text-center transition">View Details</button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default HomeTasks;
