import React from 'react'
import './styles.css';
import presentationImage from '../../Assets/images/home/presentation.png';



function Presentation() {
  return (
    <div id='presentation' style={{ backgroundImage: `url(${presentationImage})`, backgroundSize: 'cover', height: '768px' }}>
        <h1>UI Dashboard</h1>
        <p></p>
    </div>
  )
}

export default Presentation;
