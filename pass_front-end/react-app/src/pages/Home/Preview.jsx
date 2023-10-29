import React from 'react';
import './Preview.css';
import previewImage from '../../Assets/images/home/preview.png';
import './Divider.css'; 
import Divider from './Divider';

function Preview() {
  return (
    <div>
      <div id="presentation-text">
      <Divider />
        <h1>Dashboard Preview</h1>
        <p>In-Development</p>
      </div>
      <div id="presentation" style={{ backgroundImage: `url(${previewImage})`,
       backgroundSize: 'contain', height: '768px' }}></div>
    </div>
  );
}

export default Preview;
