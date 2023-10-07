import React from 'react';
import FeatureBox from './FeatureBox';
import featureimage from  '../../Assets/images/home/feature_1.png';
import featureimage1 from '../../Assets/images/home/feature_2.png';
import featureimage2 from '../../Assets/images/home/feature_3.png';
import './styles.css';


function Feature() {
  return (
    <div id='features'>
        <h2>Our Features</h2> {/* This is the title */}
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
  )
}

export default Feature;