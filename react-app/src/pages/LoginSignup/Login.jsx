import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import emailIcon from '../../Assets/images/LoginSignup/email-icon.png';
import passwordIcon from '../../Assets/images/LoginSignup/password-icon.png';
import './LoginSignup.css';

const bodyStyle = {
  margin: 0,
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const googleSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
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
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
        {/* Standard Sign-In button */}
        <div className="continue-button" onClick={login}>
          Sign in
        </div>
        <p className="signin-options-text">OR</p>
        {/* Use the provided Google Sign-In button */}
        <button className="gsi-material-button" onClick={googleLogin}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon" dangerouslySetInnerHTML={{ __html: googleSvg }} />
            <span className="gsi-material-button-contents">Sign in with Google</span>
            <span style={{ display: 'none' }}>Sign in with Google</span>
          </div>
        </button>
        <div className="redirect-signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>

        {/* Display user ID (for testing purposes) */}
        {/* {userId && <p>User ID: {userId}</p>} */}
      </div>
    </div>
  );
};

export default Login;
