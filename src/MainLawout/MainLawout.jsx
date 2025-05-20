import React from 'react';
import Home from '../Home/Home';
import { Outlet } from 'react-router';

const MainLaout = () => {
    return (
        <div>
            <Home></Home>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLaout;