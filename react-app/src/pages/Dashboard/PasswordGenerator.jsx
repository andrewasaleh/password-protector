import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './PasswordGenerator.css';

const PasswordGenerator = ({ onGenerate, onClose }) => {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [copyMessage, setCopyMessage] = useState(null);

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()-_+=";

    let availableChars = lowercaseChars;

    if (includeUppercase) {
      availableChars += uppercaseChars;
    }

    if (includeNumbers) {
      availableChars += numberChars;
    }

    if (includeSpecialChars) {
      availableChars += specialChars;
    }

    let newPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      newPassword += availableChars.charAt(randomIndex);
    }

    setGeneratedPassword(newPassword);
    onGenerate(newPassword);
  };

  const handleCopy = (field) => {
    const fieldData = generatedPassword;
    navigator.clipboard.writeText(fieldData);
    console.log(`${field} copied to clipboard:`, fieldData);

    // Set a temporary message
    setCopyMessage(`${field} copied to clipboard`);

    // Clear the message after 3 seconds (adjust the duration as needed)
    setTimeout(() => {
      setCopyMessage(null);
    }, 3000);
  };

  const handleClose = () => {
    // Reset the state and close the PasswordGenerator
    setGeneratedPassword("");
    setPasswordLength(12);
    setIncludeUppercase(true);
    setIncludeNumbers(true);
    setIncludeSpecialChars(true);
    onClose();
  };

  return (
    <div className="password-generator-container">
      <p>Password Generator</p>
      <label>
        <div className="field-with-icon-container">
          <input type="text" readOnly value={generatedPassword} />
          {/* Copy icon */}
          <FontAwesomeIcon
            icon={faCopy}
            className="field-icon"
            onClick={() => handleCopy('generatedPassword')}
          />
        </div>
      </label>

      <label>
        Password Length:
        <input
          type="number"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </label>
      <br />
      <label>
        Include Uppercase:
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
        />
      </label>
      <br />
      <label>
        Include Numbers:
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
      </label>
      <br />
      <label>
        Include Special Characters:
        <input
          type="checkbox"
          checked={includeSpecialChars}
          onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
        />
      </label>
      <br />

      <button className="close-button" onClick={generatePassword}>
        Generate Password
      </button>

      {/* Close button */}
      <button className="close-button" onClick={handleClose}>
        Close
      </button>

      {/* Copy success message */}
      {copyMessage && <p className="copy-success">Password copied to clipboard </p>}
    </div>
  );
};

export default PasswordGenerator;
