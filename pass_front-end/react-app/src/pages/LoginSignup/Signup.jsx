import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './LoginSignup.css';
import Footer from '../Home/Footer';

import userIcon from '../../Assets/images/LoginSignup/person.png';
import emailIcon from '../../Assets/images/LoginSignup/email.png';
import passwordIcon from '../../Assets/images/LoginSignup/password.png';
import showPasswordIcon from '../../Assets/images/LoginSignup/show-image.png';
import hidePasswordIcon from '../../Assets/images/LoginSignup/hide-image.png';

const bodyStyle = {
  margin: 0,
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState(''); // Add email validation error state

  const navigate = useNavigate();

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    } else if (password !== reenteredPassword) {
      setPasswordError('Passwords do not match.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleSignup = async () => {
    if (!validateEmail() || !validatePassword()) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/Dashboard');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={bodyStyle}>
      <div className="container">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="description">Create a new account to get started.</div>
        </div>
        <div className="inputs">
          <authlabel>Full Name</authlabel>
          <div className={`input ${passwordError ? 'input-error' : ''}`}>
            <img src={userIcon} alt="User" />
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <authlabel>Email</authlabel>
          <div className={`input ${passwordError ? 'input-error' : ''}`}>
            <img src={emailIcon} alt="Email" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error-message">{emailError}</div>} {/* Display email validation error */}
          </div>
          <authlabel>Password</authlabel>
          <div className={`input ${passwordError ? 'input-error' : ''}`}>
            <img src={passwordIcon} alt="Password" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              <img
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt="Toggle Password"
              />
            </div>
          </div>
          <authlabel>Confirm Password</authlabel>
          <div className={`input ${passwordError ? 'input-error' : ''}`}>
            <img src={passwordIcon} alt="Password" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter Password"
              value={reenteredPassword}
              onChange={(e) => setReenteredPassword(e.target.value)}
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              <img
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt="Toggle Password"
              />
            </div>
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        <div className="continue-button" onClick={handleSignup}>
          Create an account
        </div>
        <div className="redirect-login">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
