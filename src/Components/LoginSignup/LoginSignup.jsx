import React, { useState } from 'react';
import './LoginSignup.css';

import userIcon from '../Assets/person.png';
import emailIcon from '../Assets/email.png';
import passwordIcon from '../Assets/password.png';
import logoIcon from '../Assets/logo.png';

export const LoginSignup = () => {
    const [action, setAction] = useState("Log in");

    const toggleAction = () => {
        setAction(prevAction => prevAction === "Log in" ? "Sign Up" : "Log in");
    };

    const handleContinue = () => {
        window.location.href = "/homepage";
    };

    const headingText = action === "Log in" ? "Log in" : "Create an Account";
    const buttonText = action === "Log in" ? "Sign Up" : "Log in";
    const additionalText = action === "Log in" ? "Don't have an account?" : "Already have an account?";

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
                <div className={action === "Log in" ? "submit gray" : "submit"} onClick={toggleAction}>
                    {buttonText}
                </div>
            </div>
            <div className="inputs">
                {action === "Log in" ? null : (
                    <div className="input">
                        <img src={userIcon} alt="User" />
                        <input placeholder="name" type="text" />
                    </div>
                )}
                <div className="input">
                    <img src={emailIcon} alt="Email" />
                    <input placeholder="email address" type="email" />
                </div>
                <div className="input">
                    <img src={passwordIcon} alt="Password" />
                    <input placeholder="password" type="password" />
                </div>
            </div>
            <div className="continue-button" onClick={handleContinue}>
                Continue
            </div>
            {action === "Sign Up" ? null : (
                <div className="forgot-password">
                    <span>Forgot your password?</span>
                </div>
            )}
        </div>
    );
};
