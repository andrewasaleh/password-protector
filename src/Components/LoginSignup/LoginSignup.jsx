import React, { useState } from 'react';
import './LoginSignup.css';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Update this path if necessary

import userIcon from '../Assets/person.png';
import emailIcon from '../Assets/email.png';
import passwordIcon from '../Assets/password.png';
import logoIcon from '../Assets/logo.png';

export const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // For signup

    const toggleAction = () => setIsLogin(!isLogin);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "/homepage";
        } catch (error) {
            console.error("Error logging in:", error.message);
        }
    };

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Optionally, you can add more user details to Firestore or another database here
            window.location.href = "/homepage";
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
            <div className="logo">
                <img src={logoIcon} alt="Logo" />
                <span className="logo-text">Password Protector</span>
            </div>
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
