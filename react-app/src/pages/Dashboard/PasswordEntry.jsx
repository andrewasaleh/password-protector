import React, { useState } from 'react';
import PasswordEntryForm from './PasswordForm';

const PasswordEntry = () => {
  const [passwords, setPasswords] = useState([]);

  const addPassword = (newPassword) => {
    setPasswords([...passwords, newPassword]);
  };

  return (
    <div>
      <h2>Submit a New Password</h2>
      <PasswordEntryForm addPassword={addPassword} />
      {/* Display existing passwords */}
      <ul>
        {passwords.map((password) => (
          <li key={password.id}>
            {password.name} - {password.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordEntry;
