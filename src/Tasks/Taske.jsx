import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import { FaEdit, FaTrash, FaDollarSign } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading from '../Loding/Loding';
import { ThemeContext } from '../Header/ThemsProvider';

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch('https://backend-zeta-ochre-92.vercel.app/working')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setTasks(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const titleColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const badgeColor = theme === 'dark' ? 'border-purple-400 text-purple-400' : 'border-purple-600 text-purple-600';
  const buttonColor = 'bg-purple-600 hover:bg-purple-700 text-white';

  if (loading) return <Loading />;

  return (
    <div className={`${bgColor} min-h-screen transition-colors duration-300`}>
      <section className={`w-full px-8 mx-auto max-w-7xl py-12 ${sectionBg} rounded-xl`}>
        <h2 className={`text-3xl text-center font-bold mb-8 ${titleColor}`}>
          Featured Tasks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task._id} className={`card card-compact shadow-lg border-2 border-purple-100 dark:border-gray-700`}>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className={`card-title ${titleColor}`}>{task.title}</h2>
                  <div className="flex gap-3 items-center">
                    <Link to={`/update/${task._id}`}>
                      <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" size={18} />
                    </Link>
                    <FaTrash
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      size={18}
                    />
                  </div>
                </div>

                <p className={`text-sm font-semibold ${textColor}`}>{task.category}</p>
                <p className={`${textColor} line-clamp-2`}>{task.description}</p>

                <div className="card-actions justify-between items-center mt-4">
                  <span className={`badge badge-outline font-semibold flex items-center gap-1 ${badgeColor}`}>
                    <FaDollarSign size={12} /> {task.budget}
                  </span>
                  <span className={`text-xs ${textColor}`}>
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className={`mt-2 text-xs ${textColor}`}>
                  By {task.username}
                </div>

                <Link to={`/view-deatils/${task._id}`}>
                  <button className={`mt-4 btn ${buttonColor} w-full`}>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedTasks;
