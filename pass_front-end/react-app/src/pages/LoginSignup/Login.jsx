import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import emailIcon from '../../Assets/images/LoginSignup/email.png';
import passwordIcon from '../../Assets/images/LoginSignup/password.png';
import './LoginSignup.css';

const bodyStyle = {
  margin: 0,
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/homepage'); // Redirect to the homepage after successful login
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  }

  return (
    <div style={bodyStyle}>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="description">Your dashboard is just a click away!</div>
        </div>
        <div className="inputs">
        <authlabel>Email</authlabel>
          <div className="input">
            <img src={emailIcon} alt="User" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <authlabel>Password</authlabel>
          <div className="input">
            <img src={passwordIcon} alt="Password" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="continue-button" onClick={handleLogin}>
          Sign in
        </div>
        <div className="redirect-signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
        {/* <div className="forgot-password">
          <span>Forgot your password?</span>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
