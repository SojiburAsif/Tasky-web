import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../Header/ThemsProvider';
import { AuthContext } from '../Contexts/AuthContext';
import Header from '../Header/Header';
import Loading from '../Loding/Loding';
import {
  FaBox,
  FaUser,
  FaClipboardList,
  FaInfoCircle,
  FaGavel,
  FaUsers
} from 'react-icons/fa';

const TASK_API = 'https://backend-zeta-ochre-92.vercel.app/working';
const USER_API = 'https://backend-zeta-ochre-92.vercel.app/users';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskRes, userRes] = await Promise.all([
          fetch(TASK_API),
          fetch(USER_API)
        ]);

        if (!taskRes.ok || !userRes.ok) throw new Error('Failed to fetch');

        const taskData = await taskRes.json();
        const userData = await userRes.json();

        setItems(Array.isArray(taskData) ? taskData : []);
        setUsers(Array.isArray(userData) ? userData : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="text-error text-center mt-6">{error}</p>;

  // Calculated metrics
  const totalProducts = items.length;
  const myItemsCount = items.filter(i => i.email === user?.email).length;
  const totalUsersFromAPI = users.length;
  const totalBids = items.reduce((sum, item) => sum + (item.bidCount || 0), 0);

  const baseBg =
    theme === 'dark' ? 'bg-purple-900 text-purple-100' : 'bg-purple-50 text-purple-900';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-neutral' : 'bg-base-200'}`}>
      <Header />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-500">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Total Tasks */}
          <div className={`${baseBg} card shadow transition hover:bg-purple-500 hover:text-white hover:shadow-[0_8px_16px_rgba(128,0,128,0.4)] cursor-pointer rounded-xl`}>
            <div className="card-body items-center text-center">
              <h2 className="card-title flex items-center space-x-2">
                <FaBox />
                <span>Total Tasks</span>
                <FaInfoCircle title="Total posted tasks" className="text-current opacity-60 hover:opacity-90 cursor-help" />
              </h2>
              <p className="text-5xl font-extrabold">{totalProducts}</p>
            </div>
          </div>

          {/* My Tasks */}
          <div className={`${baseBg} card shadow transition hover:bg-purple-500 hover:text-white hover:shadow-[0_8px_16px_rgba(128,0,128,0.4)] cursor-pointer rounded-xl`}>
            <div className="card-body items-center text-center">
              <h2 className="card-title flex items-center space-x-2">
                <FaClipboardList />
                <span>My Tasks</span>
                <FaInfoCircle title="Your added tasks" className="text-current opacity-60 hover:opacity-90 cursor-help" />
              </h2>
              <p className="text-5xl font-extrabold">{myItemsCount}</p>
              <progress className="progress progress-primary w-full mt-2" value={myItemsCount} max={totalProducts} />
              <p className="text-xs mt-1">
                {totalProducts ? `${((myItemsCount / totalProducts) * 100).toFixed(0)}% of total` : 'No data'}
              </p>
            </div>
          </div>

        

          {/* Total Bids */}
          <div className={`${baseBg} card shadow transition hover:bg-purple-500 hover:text-white hover:shadow-[0_8px_16px_rgba(128,0,128,0.4)] cursor-pointer rounded-xl`}>
            <div className="card-body items-center text-center">
              <h2 className="card-title flex items-center space-x-2">
                <FaGavel />
                <span>Total Bids</span>
                <FaInfoCircle title="Total bids across all tasks" className="text-current opacity-60 hover:opacity-90 cursor-help" />
              </h2>
              <p className="text-5xl font-extrabold">{totalBids}</p>
            </div>
          </div>

          {/* Total Users from API */}
          <div className={`${baseBg} card shadow transition hover:bg-purple-500 hover:text-white hover:shadow-[0_8px_16px_rgba(128,0,128,0.4)] cursor-pointer rounded-xl col-span-full sm:col-span-2 lg:col-span-1`}>
            <div className="card-body items-center text-center">
              <h2 className="card-title flex items-center space-x-2">
                <FaUsers />
                <span>Registered Users</span>
                <FaInfoCircle title="Total registered users in system" className="text-current opacity-60 hover:opacity-90 cursor-help" />
              </h2>
              <p className="text-5xl font-extrabold">{totalUsersFromAPI}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
