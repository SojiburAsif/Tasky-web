// TaskSliderWithCard.jsx
import React from 'react';
import { useLoaderData } from 'react-router';

const TaskSliderWithCard = () => {
    const tasks = useLoaderData();

    return (
        <div className="w-full max-w-6xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
                <div
                    key={task.id}
                    className="flex flex-col rounded-xl border-2 border-purple-500 p-6 space-y-4 bg-black"
                >
                    <div className="space-y-2 text-white font-bold">
                        <p className="text-lg">
                            Category: <span className="text-white font-medium">{task.category}</span>
                        </p>
                        <p className="text-lg">
                            Title: <span className="text-white font-medium">{task.title}</span>
                        </p>
                        <p>
                            Deadline: <span className="text-white font-medium">{task.deadline}</span>
                        </p>
                        <p>
                            Budget: <span className="text-white font-medium">{task.budget}</span>
                        </p>
                        <p>
                            Email: <span className="text-white font-medium">{task.email}</span>
                        </p>
                        <p>
                            Username: <span className="text-white font-medium">{task.username}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskSliderWithCard;