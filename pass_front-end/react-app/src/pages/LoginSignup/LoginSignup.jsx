import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

import userIcon from '../../Assets/images/LoginSignup/person.png';
import emailIcon from '../../Assets/images/LoginSignup/email.png';
import passwordIcon from '../../Assets/images/LoginSignup/password.png';

export const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // For signup

    const navigate = useNavigate(); 

    const toggleAction = () => setIsLogin(!isLogin);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate.push("/homepage"); // 
        } catch (error) {
            console.error("Error logging in:", error.message);
        }
    };

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Optionally, you can add more user details to Firestore or another database here
            navigate.push("/homepage");
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    };

    const handleContinue = () => {
        if (isLogin) {
            handleLogin();
        } else {
            handleSignup();
        }
    };

    const headingText = isLogin ? "Log in" : "Create an Account";
    const buttonText = isLogin ? "Sign Up" : "Log in";
    const additionalText = isLogin ? "Don't have an account?" : "Already have an account?";

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{headingText}</div>
            </div>
            <div className="submit-container">
                <span className="additional-text">{additionalText}</span>
                <div className={isLogin ? "submit gray" : "submit"} onClick={toggleAction}>
                    {buttonText}
                </div>
            </div>
            <div className="inputs">
                {!isLogin && (
                    <div className="input">
                        <img src={userIcon} alt="User" />
                        <input 
                            placeholder="name" 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}
                <div className="input">
                    <img src={emailIcon} alt="Email" />
                    <input 
                        placeholder="email address" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={passwordIcon} alt="Password" />
                    <input 
                        placeholder="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="continue-button" onClick={handleContinue}>
                Continue
            </div>
            {isLogin && (
                <div className="forgot-password">
                    <span>Forgot your password?</span>
                </div>
            )}
        </div>
    );
};
