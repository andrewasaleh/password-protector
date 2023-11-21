import React, { useState, useEffect, useRef } from 'react';
import logo from '../../Assets/images/home/logo.png';
import { Link } from 'react-router-dom';
import { Link as NavLink, useLocation, useNavigate } from 'react-router-dom';


import './Navbar.css';

function Navbar() {
    const [nav, setNav] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const sections = {
        home: '#main',
        features: '#features',
        presentation: '#presentation-text',
        about: '#about-section',
    };

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNav(true);
        } else {
            setNav(false);
        }

        let foundActive = false;
        for (const section in sections) {
            const element = document.querySelector(sections[section]);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 0) {
                    setActiveSection(section);
                    foundActive = true;
                }
            }
        }

        if (!foundActive) {
            setActiveSection('home'); 
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);

    const scrollToSection = (section) => {
        const element = document.querySelector(sections[section]);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

const handleButtonClick = (section) => {
    if (section === 'home') {
        setActiveSection('home');
        navigate('/');
    } else if (section === 'login') {
        setActiveSection('login');
        navigate('/login');
    } else if (section === 'signup') {
        setActiveSection('signup');
        navigate('/signup');
    } else if (section === 'about') {
        setActiveSection('about');
        navigate('/#about-section');
    }
    setMenuOpen(false);
};


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={nav ? 'nav active' : 'nav'}>
            <Link to="/" className='logo'>
                <img src={logo} alt='Company Logo' />
            </Link>
            <input type='checkbox' className='menu-btn' id='menu-btn' onClick={toggleMenu} />
            <label className='menu-icon' htmlFor='menu-btn'>
                <span className='nav-icon'></span>
            </label>
            <ul className={`menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
                {Object.keys(sections).map((sectionKey) => (
                    <li key={sectionKey}>
                        <NavLink
                            to="/"
                            onClick={() => scrollToSection(sectionKey)}
                            className={activeSection === sectionKey ? 'active' : ''}
                        >
                            {sectionKey === 'home' ? 'Home' : sectionKey}
                        </NavLink>
                    </li>
                ))}
                <li>
                    <NavLink
                        to="/login"
                        className={location.pathname === '/login' ? 'active' : ''}
                        onClick={() => handleButtonClick('login')}
                    >
                        Log In
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/signup"
                        className={location.pathname === '/signup' ? 'active' : ''}
                        onClick={() => handleButtonClick('signup')}
                    >
                        Get Started
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
