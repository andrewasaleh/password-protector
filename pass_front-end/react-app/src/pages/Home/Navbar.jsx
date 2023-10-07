import React, { useState, useEffect } from 'react';
import logo from '../../Assets/images/home/logo.png';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './styles.css';


function Navbar() {
    const [nav, setNav] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNav(true);
        } else {
            setNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        // Cleanup: remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []); // Empty dependency array means this useEffect runs once when component mounts and cleans up when it unmounts

    return (
        <nav className={nav ? 'nav active' : 'nav'}>
            <Link to="/" className='logo'>
                <img src={logo} alt='Company Logo'/>
            </Link>
            <input type='checkbox' className='menu-btn' id='menu-btn'/>
            <label className='menu-icon' htmlFor='menu-btn'>
                <span className='nav-icon'></span>
            </label>
                <ul className='menu'>
                    <li><NavLink to="/" exact activeClassName='active'>Home</NavLink></li>
                    <li><NavLink to="/features" activeClassName='active'>Features</NavLink></li>
                    <li><NavLink to="/about" activeClassName='active'>About</NavLink></li>
                    <li><NavLink to="/ui-ss" activeClassName='active'>UI SS</NavLink></li>
                    <li><NavLink to="/login" activeClassName='active'>Login</NavLink></li>
                </ul>
        </nav>
    );
}

export default Navbar;
