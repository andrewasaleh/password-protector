import React from 'react';
import './About.css';
import './Divider.css'; 
import Divider from './Divider';
import Footer from './Footer';
const About = () => {
  const developerData = [
    {
      name: 'Andrew Saleh',
      title: 'Full Stack Developer',
      description: 'Bringing ideas to life by working on both frontend and backend aspects.',
      github: '',
      linkedin: '',
      profileImage: 'https://avatars.githubusercontent.com/u/67487615?v=4', // Add the image URL for Andrew's profile picture
    },
    {
      name: 'Kevin Tran',
      title: 'Backend Developer',
      description: 'Experienced in building scalable and secure server-side applications.',
      github: '',
      linkedin: '',
      profileImage: 'https://avatars.githubusercontent.com/u/143236084?v=4', // Add the image URL for Kevin's profile picture
    },
    {
      name: 'Qing Gao',
      title: 'Full Stack Developer',
      description: 'Passionate about creating responsive and interactive web apps.',
      github: '',
      linkedin: '',
      profileImage: 'https://avatars.githubusercontent.com/u/122762285?v=4', // Add the image URL for Qing's profile picture
    },
    {
      name: 'Sohrab Bahari',
      title: 'UI/UX Designer',
      description: 'Creating delightful user experiences with a focus on design and usability.',
      github: '',
      linkedin: '',
      profileImage: 'https://avatars.githubusercontent.com/u/80855997?v=4', // Add the image URL for Sohrab's profile picture
    },
  ];

  return (
    <div id="about-section">
      <div>
      <Divider />
        <h1>About Us</h1>
        <p className="description">Students at CSUF (California State University, Fullerton) majoring in computer science are 
        collaborating to develop a web-based password management application using a technology stack that 
        includes React for the front-end, JavaScript for scripting, CSS for styling, and Firebase API for various features.</p>
        <div className="developer-list">
          {developerData.map((developer, index) => (
            <div className="developer" key={index}>
              <div className="profile-picture">
                <img src={developer.profileImage} alt={`Profile ${developer.name}`} />
              </div>
              <h3>{developer.name}</h3>
              <h3>{developer.title}</h3>
              <p className="developer-description">{developer.description}</p>
              <div className="buttons">
                <a href={developer.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default About;
