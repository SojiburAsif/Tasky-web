import React from 'react';
import Header from '../Header/Header';

import Appp from './HomePage';
import Banner from './Banner';
import Taske from '../Tasks/Taske';
import TaskSliderWithCard from '../Tasks/Taske';
import TaskCard from '../Tasks/Taske';
import Servis from './Servis';
import Latest from './Latest';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            {/* <TaskCard ></TaskCard> */}
            <Servis></Servis>
            <Latest></Latest>

        </div>
    );
};

export default Home;