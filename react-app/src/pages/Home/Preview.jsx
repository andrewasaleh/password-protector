import React from 'react';
import './Preview.css';
import previewImage from '../../Assets/images/home/preview.png';
import Separator from './Separator';

function Preview() {
  return (
    <div>
      <div id="presentation-text">
      <Separator />
        <h1>Dashboard Preview</h1>
        <div className='centered-text'>
      <p>In-Development</p>
    </div>
      </div>
      <div id="presentation" style={{ backgroundImage: `url(${previewImage})`,
       backgroundSize: 'contain' }}></div>
    </div>
  );
}

export default Preview;
