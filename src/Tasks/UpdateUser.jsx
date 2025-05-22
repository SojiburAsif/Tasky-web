import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const UpdateUser = () => {
    const { user } = useContext(AuthContext);
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

    return (
        <div className="flex justify-center items-start mt-8 font-display px-4">
            <form
                onSubmit={handlUpdateTask}
                className="bg-gradient-to-r from-[#040104] to-[#100415] border border-purple-900 rounded-2xl p-10 w-full max-w-screen-lg space-y-6 cursor-default"
            >
                <h2 className="text-3xl font-extrabold text-white text-center">Update Task Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <fieldset className="flex flex-col">
                        <label htmlFor="title" className="mb-2 text-purple-500 font-semibold">Task Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            defaultValue={title}
                            required
                            placeholder="Enter Task Title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label htmlFor="category" className="mb-2 text-purple-500 font-semibold">Category</label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={category}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                        >
                            <option value="Web Development">Web Development</option>
                            <option value="Design">Design</option>
                            <option value="Writing">Writing</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </fieldset>

                    <fieldset className="flex flex-col sm:col-span-2">
                        <label htmlFor="description" className="mb-2 text-purple-500 font-semibold">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            defaultValue={description}
                            required
                            placeholder="Describe the task"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                        ></textarea>
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label htmlFor="deadline" className="mb-2 text-purple-500 font-semibold">Deadline</label>
                        <input
                            id="deadline"
                            type="date"
                            name="deadline"
                            defaultValue={deadline}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label htmlFor="budget" className="mb-2 text-purple-500 font-semibold">Budget</label>
                        <input
                            id="budget"
                            type="number"
                            name="budget"
                            defaultValue={budget}
                            required
                            placeholder="Enter Budget"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                        />
                    </fieldset>

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

                <button
                    type="submit"
                    className="w-full py-4 bg-white text-purple-900 font-bold rounded-lg shadow-md transition hover:bg-purple-900 hover:text-white"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;
