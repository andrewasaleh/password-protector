import React from 'react';
import featureimage from '../../Assets/images/home/feature_1.png';
import featureimage1 from '../../Assets/images/home/feature_2.png';
import featureimage2 from '../../Assets/images/home/feature_3.png';
import './Feature.css';
import './Media.css';
import './Divider.css'; 
import Divider from './Divider';


function FeatureBox(props) {
  return (
    <div className='a-box'>
      <div className='a-b-img'>
        <img src={props.image} alt={props.title} />
      </div>
      <div className='s-b-text'>
        <h2> {props.title} </h2>
        <p> {props.description} </p>
      </div>
    </div>
  );
}
function Feature() {
  return (
    <div id='features'>
        <Divider />
       <h1>Key Features</h1>
      <div className='a-container'>
        <FeatureBox
          image={featureimage}
          title='Password Generator'
          description='Generate strong and unique passwords easily.'
        />
        <FeatureBox
          image={featureimage1}
          title='Encryption'
          description='Your passwords are encrypted for maximum security.'
        />
        <FeatureBox
          image={featureimage2}
          title='Multi-platform support'
          description='Access your passwords on any device, anytime.'
        />
      </div>
    </div>
  );
}

export default Feature;
