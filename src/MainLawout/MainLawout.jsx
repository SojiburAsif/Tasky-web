import React from 'react';
import Home from '../Home/Home';
import { Outlet } from 'react-router';
import Taske from '../Tasks/Taske';

const MainLaout = () => {
    return (
        <div>
            <Home></Home>

            <Outlet></Outlet>
        </div>
    );
};

export default MainLaout;