import React from 'react';
import Navbar from './Navbar';
import './styles.css';


function Header() {
  return (
    <div id='main'>
        <Navbar/>
        <div className='name'>
            <h1>
                <span className="secure">Personal</span>
                <span className="safe">Data Protection</span>
            </h1>
            <p className='details' ></p>
            {/* <a href='/signup' className='cv-btn'>Login</a> */}
        </div>
    </div>
  )
}

export default Header;