import React, { useContext, useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/AuthContext';
import Loading from '../Loding/Loding';
import { ThemeContext } from '../Header/ThemsProvider';

const HomeTasks = () => {
  const { loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

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
    return <Loading />;
  }

  // Text colors: dark mode = white, light mode = black/dark gray
  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const ringNormal = theme === 'dark' ? 'ring-gray-800 hover:ring-purple-400 hover:shadow-purple-800' : 'ring-gray-300 hover:ring-purple-600 hover:shadow-purple-500';
  const ringUrgent = theme === 'dark' ? 'ring-red-500 hover:ring-red-300' : 'ring-red-600 hover:ring-red-400';

  return (
    <div className={`${bgColor} min-h-screen poppins-font transition-colors duration-500 ease-in-out`}>
      <section className={`w-full px-8 mx-auto max-w-7xl py-21 ${sectionBg} rounded-xl my-5`}>
        <h2 className={`text-3xl text-center font-bold mb-8 ${textPrimary}`}>Featured Tasks</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.slice(0, 6).map(task => {
            const days = daysUntil(task.deadline);
            const urgent = days <= 15 && days >= 0;

            return (
              <div
                key={task._id}
                className={`card card-compact bg-base-100 shadow-lg ring-2 transition-all duration-300 flex flex-col justify-between
                  ${urgent ? ringUrgent : ringNormal} ${textPrimary}`}>
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="card-title text-purple-600 dark:text-purple-400">{task.title}</h3>
                    <div className="flex gap-3 items-center">
                      <Link to={`/update/${task._id}`}>
                        <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" size={20} />
                      </Link>
                      <FaTrash
                        onClick={() => handleDelete(task._id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        size={20}
                      />
                    </div>
                  </div>
                  <p className={`text-sm mb-2 ${textSecondary}`}>
                    <strong>Category:</strong> {task.category}
                  </p>
                  <p className={`mb-4 flex-grow ${textSecondary}`}>{task.description}</p>
                  <div className="flex justify-between text-sm mb-4">
                    <p>
                      <strong>Budget:</strong>{' '}
                      <span className="text-indigo-500">${task.budget}</span>
                    </p>
                    <p className={`font-semibold text-base ${urgent ? 'text-red-600' : 'text-purple-600'}`}>
                      Deadline: {task.deadline} ({days}d)
                    </p>
                  </div>
                  <Link to={`/view-deatils/${task._id}`}>
                    <button className="btn w-full mt-auto bg-purple-600 text-white hover:bg-purple-700 border-none">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomeTasks;
