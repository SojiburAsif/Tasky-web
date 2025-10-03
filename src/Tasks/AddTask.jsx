import React, { useContext } from 'react';
import Header from '../Header/Header';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router'; // <-- make sure it's 'react-router-dom'
import { ThemeContext } from '../Header/ThemsProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleAddTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const taskData = Object.fromEntries(formData.entries());
        taskData.createdAt = new Date().toISOString();

        fetch('https://backend-zeta-ochre-92.vercel.app/working', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(taskData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Task Added Successfully!",
                        icon: "success"
                    });
                    form.reset();
                    navigate('/main-tasks');
                }
            });
    };

    // Dynamic theme styles
    const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
    const cardBg = theme === 'dark' ? 'bg-[#0F0F0F]' : 'bg-gray-100';
    const labelColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';
    const inputText = theme === 'dark' ? 'text-white bg-gray-800 border-gray-600' : 'text-gray-800 bg-gray-100 border-gray-300';
    const btnStyle = theme === 'dark'
        ? 'bg-purple-600 hover:bg-purple-800 text-white'
        : 'bg-purple-100 hover:bg-purple-600 hover:text-white text-purple-800';

    return (
        <section className={`${bgColor} min-h-screen transition-colors duration-500 mt-18`}>
            <Header />
            <div className="flex justify-center poppins-font items-start mt-8 px-4">
                <form
                    onSubmit={handleAddTask}
                    className={`${cardBg} border border-purple-900 rounded-2xl p-10 w-full max-w-screen-lg space-y-6 cursor-default transition-all duration-300`}
                >
                    <h2 className="text-3xl font-extrabold text-center text-purple-400">Add Task Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <fieldset className="flex flex-col">
                            <label htmlFor="title" className={`mb-2 font-semibold ${labelColor}`}>Task Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                required
                                placeholder="Enter Task Title"
                                className={`w-full px-4 py-3 rounded-lg border ${inputText}`}
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="category" className={`mb-2 font-semibold ${labelColor}`}>Category</label>
                            <select
                                id="category"
                                name="category"
                                required
                                className={`w-full px-4 py-3 rounded-lg border ${inputText}`}
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </fieldset>

                        <fieldset className="flex flex-col sm:col-span-2">
                            <label htmlFor="description" className={`mb-2 font-semibold ${labelColor}`}>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                required
                                placeholder="Describe the task"
                                className={`w-full px-4 py-3 rounded-lg border ${inputText}`}
                            ></textarea>
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="deadline" className={`mb-2 font-semibold ${labelColor}`}>Deadline</label>
                            <input
                                id="deadline"
                                type="date"
                                name="deadline"
                                required
                                className={`w-full px-4 py-3 rounded-lg border ${inputText}`}
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="budget" className={`mb-2 font-semibold ${labelColor}`}>Budget</label>
                            <input
                                id="budget"
                                type="number"
                                name="budget"
                                required
                                placeholder="Enter Budget"
                                className={`w-full px-4 py-3 rounded-lg border ${inputText}`}
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="email" className={`mb-2 font-semibold ${labelColor}`}>User Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                readOnly
                                defaultValue={user?.email || ''}
                                className={`w-full px-4 py-3 rounded-lg border ${inputText} cursor-not-allowed`}
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="username" className={`mb-2 font-semibold ${labelColor}`}>User Name</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                readOnly
                                defaultValue={user?.displayName || ''}
                                className={`w-full px-4 py-3 rounded-lg border ${inputText} cursor-not-allowed`}
                            />
                        </fieldset>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-4 font-bold rounded-lg shadow-md transition ${btnStyle}`}
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddTask;
