import React, { useState } from 'react';
import PasswordForm from './PasswordForm';

const PasswordDetails = ({ password }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleClose = () => {
    setEditMode(false);
  };

  return (
    <div>
      <h2>Password Details</h2>
      <p><strong>Site Name:</strong> {password.siteNameSearch }</p>
      <p><strong>Email:</strong> {password.email}</p>
      <p><strong>username:</strong> {password.username}</p>
      <p><strong>Password:</strong> {password.password}</p>
      <p><strong>Notes:</strong> {password.notes}</p>
      <button onClick={handleEdit}>Edit</button>

      {editMode && (
        <PasswordForm
          passwordDetails={password}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default PasswordDetails;
