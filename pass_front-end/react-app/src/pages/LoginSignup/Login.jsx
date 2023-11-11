import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import app from '../../App.js'; // Import your Firebase configuration
import emailIcon from '../../Assets/images/LoginSignup/email.png';
import passwordIcon from '../../Assets/images/LoginSignup/password.png';
import './LoginSignup.css'; // Include your CSS styles
import Footer from '../Home/Footer.jsx';

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
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');

      // Access Firestore and add user data
      const db = collection(app.firestore(), 'users'); // Replace 'users' with your Firestore collection name
      const userDoc = {
        email,
        // Add other user-related data here
      };
      await addDoc(db, userDoc);

      navigate('/Dashboard'); // Redirect to the homepage after a successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
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
          <label>Email</label>
          <div className="input">
            <img src={emailIcon} alt="User" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label>Password</label>
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
        <Footer />
      </div>
    </div>
  );
}

export default Login;
