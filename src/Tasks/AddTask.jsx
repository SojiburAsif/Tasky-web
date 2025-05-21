import React, { useContext } from 'react';
import Header from '../Header/Header';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/AuthContext';

const AddTask = () => {
    const { user } = useContext(AuthContext);

    const handleAddTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const taskData = Object.fromEntries(formData.entries());

        // Optional: add createdAt timestamp
        taskData.createdAt = new Date().toISOString();

        console.log('Submitting task:', taskData);

        fetch('http://localhost:3000/working', {
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
                    form.reset(); // Clear the form
                }
            });
    };

    return (
        <section className="bg-black min-h-screen">
            <Header />
            <div className="flex justify-center items-start mt-8 px-4">
                <form
                    onSubmit={handleAddTask}
                    className="bg-gradient-to-r from-[#040104] to-[#100415] border border-purple-900 rounded-2xl p-10 w-full max-w-screen-lg space-y-6 cursor-default"
                >
                    <h2 className="text-3xl font-extrabold text-white text-center">Add Task Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Task Title */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="title" className="mb-2 text-purple-500 font-semibold">Task Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                required
                                placeholder="Enter Task Title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                            />
                        </fieldset>

                        {/* Category */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="category" className="mb-2 text-purple-500 font-semibold">Category</label>
                            <select
                                id="category"
                                name="category"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </fieldset>

                        {/* Description */}
                        <fieldset className="flex flex-col sm:col-span-2">
                            <label htmlFor="description" className="mb-2 text-purple-500 font-semibold">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                required
                                placeholder="Describe the task"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                            ></textarea>
                        </fieldset>

                        {/* Deadline */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="deadline" className="mb-2 text-purple-500 font-semibold">Deadline</label>
                            <input
                                id="deadline"
                                type="date"
                                name="deadline"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                            />
                        </fieldset>

                        {/* Budget */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="budget" className="mb-2 text-purple-500 font-semibold">Budget</label>
                            <input
                                id="budget"
                                type="number"
                                name="budget"
                                required
                                placeholder="Enter Budget"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                            />
                        </fieldset>

                        {/* Email */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="email" className="mb-2 text-purple-500 font-semibold">User Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                readOnly
                                defaultValue={user?.email || ''}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 cursor-not-allowed"
                            />
                        </fieldset>

                        {/* Username */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="username" className="mb-2 text-purple-500 font-semibold">User Name</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                readOnly
                                defaultValue={user?.displayName || ''}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 cursor-not-allowed"
                            />
                        </fieldset>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-purple-900 font-bold rounded-lg shadow-md transition hover:bg-purple-900 hover:text-white"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddTask;
