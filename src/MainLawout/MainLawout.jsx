import React from 'react';
import Home from '../Home/Home';
import { Outlet } from 'react-router';

import Fooder from '../Fooder/Fooder';

const MainLaout = () => {
    return (
        <div>
            <Home></Home>
  
            <Outlet></Outlet>
         
            <Fooder></Fooder>
        </div>
    );
};

export default MainLaout;