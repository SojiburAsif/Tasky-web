import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useLoaderData, useNavigate } from 'react-router'; 
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';
import { ThemeContext } from '../Header/ThemsProvider';
import 'react-tooltip/dist/react-tooltip.css';

const UpdateUser = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const { _id, budget, deadline, description, category, title } = useLoaderData();
    const navigate = useNavigate();

    const handlUpdateTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const taskData = Object.fromEntries(formData.entries());

        fetch(`https://backend-zeta-ochre-92.vercel.app/working/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(taskData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: 'Updated!',
                        text: 'Task updated successfully!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    setTimeout(() => {
                        navigate('/main-tasks');
                    }, 2000);
                }
            });
    };

    // Dynamic theme classes
    const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
    const formBg = theme === 'dark' ? 'bg-[#0F0F0F]' : 'bg-gray-100';
    const textInput = theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300';
    const labelText = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';
    const btnStyle = theme === 'dark'
        ? 'bg-purple-700 hover:bg-purple-900 text-white'
        : 'bg-purple-100 hover:bg-purple-600 hover:text-white text-purple-900';
    const inputDisabled = 'cursor-not-allowed';

    return (
        <div className={`min-h-screen ${bgColor} px-4 py-10 transition-colors duration-500`}>
            <div className="flex justify-center items-start poppins-font">
                <form
                    onSubmit={handlUpdateTask}
                    className={`${formBg} border border-purple-900 rounded-2xl p-10 w-full max-w-screen-lg space-y-6 transition-all duration-300`}
                >
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className={`py-2 px-4 rounded-lg font-semibold shadow transition ${btnStyle}`}
                        >
                            Home
                        </button>
                        <h2 className="text-3xl font-extrabold text-center flex-1 text-purple-400">
                            Update Task Details
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Task Title */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="title" className={`mb-2 font-semibold ${labelText}`}>
                                Task Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                defaultValue={title}
                                required
                                className={`w-full px-4 py-3 rounded-lg border ${textInput} cursor-help`}
                                placeholder="Enter Task Title"
                                data-tooltip-id="tooltip-title"
                                data-tooltip-content="Enter the title of the task"
                            />
                        </fieldset>

                        {/* Category */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="category" className={`mb-2 font-semibold ${labelText}`}>
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                defaultValue={category}
                                required
                                className={`w-full px-4 py-3 rounded-lg border ${textInput} cursor-help`}
                                data-tooltip-id="tooltip-category"
                                data-tooltip-content="Select the task category"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </fieldset>

                        {/* Description */}
                        <fieldset className="flex flex-col sm:col-span-2">
                            <label htmlFor="description" className={`mb-2 font-semibold ${labelText}`}>
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                defaultValue={description}
                                required
                                className={`w-full px-4 py-3 rounded-lg border ${textInput}`}
                                placeholder="Describe the task"
                            />
                        </fieldset>

                        {/* Deadline */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="deadline" className={`mb-2 font-semibold ${labelText}`}>
                                Deadline
                            </label>
                            <input
                                id="deadline"
                                type="date"
                                name="deadline"
                                defaultValue={deadline}
                                required
                                className={`w-full px-4 py-3 rounded-lg border ${textInput} cursor-help`}
                                data-tooltip-id="tooltip-deadline"
                                data-tooltip-content="Choose the deadline date"
                            />
                        </fieldset>

                        {/* Budget */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="budget" className={`mb-2 font-semibold ${labelText}`}>
                                Budget
                            </label>
                            <input
                                id="budget"
                                type="number"
                                name="budget"
                                defaultValue={budget}
                                required
                                className={`w-full px-4 py-3 rounded-lg border ${textInput} cursor-help`}
                                placeholder="Enter Budget"
                                data-tooltip-id="tooltip-budget"
                                data-tooltip-content="Set the budget for the task"
                            />
                        </fieldset>

                        {/* Email */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="email" className={`mb-2 font-semibold ${labelText}`}>
                                User Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                readOnly
                                defaultValue={user?.email || ''}
                                className={`w-full px-4 py-3 rounded-lg border ${textInput} ${inputDisabled}`}
                            />
                        </fieldset>

                        {/* User Name */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="username" className={`mb-2 font-semibold ${labelText}`}>
                                User Name
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                readOnly
                                defaultValue={user?.displayName || ''}
                                className={`w-full px-4 py-3 rounded-lg border ${textInput} ${inputDisabled}`}
                            />
                        </fieldset>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-4 font-bold rounded-lg shadow-md transition ${btnStyle}`}
                    >
                        Update Task
                    </button>

                    {/* Tooltip Components */}
                    <Tooltip id="tooltip-title" />
                    <Tooltip id="tooltip-category" />
                    <Tooltip id="tooltip-deadline" />
                    <Tooltip id="tooltip-budget" />
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
