import React, { useContext } from 'react';
import Header from '../Header/Header';
import Banner from './Banner';
import Latest from './Latest';
import HomeTasks from '../Tasks/HomeTasks';
import { Outlet } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Servis from './Servis';
import Loading from '../Loding/Loding';
import { ThemeContext } from '../Header/ThemsProvider';
import Section from './Section';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-500`}>
            <Header />
            <Banner />
            <Outlet />

            {user && <HomeTasks />}

            <Servis />
            <Section></Section>
            <Latest />

        </div>
    );
};

export default Home;
