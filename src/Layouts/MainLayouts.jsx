import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
        <div>
            <header>
                <nav>
                    <Header></Header>
                </nav>
              
            </header>
            <div>
                <Outlet></Outlet>
            </div>
            <footer className='mt-6'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayouts;