import React, { useContext } from 'react';
import Header from '../Header/Header';
import Banner from './Banner';
import Latest from './Latest';
import HomeTasks from '../Tasks/HomeTasks';
import { Outlet } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Servis from './Servis';
import Loading from '../Loding/Loding';


const Home = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <Header />
            <Banner />
            <Outlet />


            {user && <HomeTasks />}
            <Servis></Servis>
            <Latest />
        </div>
    );
};

export default Home;
