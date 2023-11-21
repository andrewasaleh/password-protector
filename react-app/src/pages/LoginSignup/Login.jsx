import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/dashboard');
      })
      .catch((error) => {
        
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <div style={bodyStyle}>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="description">Your dashboard is just a click away!</div>
        </div>
        <div className="inputs">
          <form onSubmit={login}>
            <name-label>Email</name-label>
            <div className="input">
              <img src={emailIcon} alt="Email" className="icon" />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <name-label>Password</name-label>
            <div className="input">
              <img src={passwordIcon} alt="Password" className="icon" />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Display error message if there's an error */}
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
        <div className="continue-button" onClick={login}>
          Sign in
        </div>
        <div className="redirect-signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
