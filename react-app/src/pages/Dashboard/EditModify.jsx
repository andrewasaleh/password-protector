import React, { useState, useEffect } from 'react';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import showImage from '../../Assets/images/LoginSignup/show-image.png';
import hideImage from '../../Assets/images/LoginSignup/hide-image.png';
import './PasswordForm.css';

const EditModify = ({ selectedPassword, setPasswords, setSelectedPassword, onPasswordDelete }) => {
  const [originalData, setOriginalData] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copyMessage, setCopyMessage] = useState(null);

  useEffect(() => {
    if (selectedPassword) {
      setOriginalData(selectedPassword);
      setEditingData({ ...selectedPassword });
      setEditMode(false); // Reset edit mode when a new password is selected
    }
  }, [selectedPassword]);

  useEffect(() => {
    if (selectedPassword === null) {
      setEditingData(null); // Reset editing data when no password is selected
    }
  }, [selectedPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditingData({ ...originalData });
    setEditMode(false);
  };

  const handleModify = async () => {
    try {
      if (!selectedPassword || !selectedPassword.id || !editingData) {
        console.error('Selected password, its ID, or editingData is missing.');
        return;
      }

      const passwordRef = doc(db, 'passwords', selectedPassword.id);

      await updateDoc(passwordRef, {
        siteNameSearch: editingData.siteNameSearch,
        url: editingData.url,
        email: editingData.email,
        username: editingData.username,
        password: editingData.password,
        notes: editingData.notes && editingData.notes.trim() !== '' ? editingData.notes : null,
      });

      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password: ', error);
      setError(error.message || 'An error occurred while updating the password.');
    } finally {
      setEditMode(false);
      setSubmitting(false);
      setError(null);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedPassword || !selectedPassword.id) {
        console.error('Selected password or its ID is missing.');
        return;
      }

      const passwordRef = doc(db, 'passwords', selectedPassword.id);

      await deleteDoc(passwordRef);

      console.log('Password deleted successfully');

      // Use the onPasswordDelete callback to notify the parent component about the deletion
      onPasswordDelete(selectedPassword.id);

      setEditingData(null);
      setError(null);

      // Close the form by resetting selectedPassword
      setSelectedPassword(null);
    } catch (error) {
      console.error('Error deleting password: ', error);
      setError(error.message || 'An error occurred while deleting the password.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCopy = (field) => {
    const fieldData = editingData ? editingData[field] : '';
    navigator.clipboard.writeText(fieldData);
    console.log(`${field} copied to clipboard:`, fieldData);

    // Set a temporary message
    setCopyMessage(`${field} copied to clipboard`);

    // Clear the message after 3 seconds (adjust the duration as needed)
    setTimeout(() => {
      setCopyMessage(null);
    }, 3000);
  };

  const handleRedirect = () => {
    if (editingData && editingData.url) {
      const formattedUrl = editingData.url.toLowerCase().startsWith('http')
        ? editingData.url
        : `http://${editingData.url}`; // Add http:// if not present

      window.open(formattedUrl, '_blank'); // Open the URL in a new tab
    }
  };

  const handleClose = () => {
    setSelectedPassword(null); // Reset selectedPassword to close the form
  };

  const handleOverlayClick = (e) => {
    // Close the form only if the click is outside the form container
    if (!e.target.closest('.password-form-container')) {
      handleClose();
    }
  };

  return (
    <div>
      {selectedPassword && (
        <div>
          <div className="overlay" onClick={handleOverlayClick}></div>
          <form className="password-form-container" onSubmit={(e) => e.preventDefault()}>
            <label>
              <div className="display-field">
                {editingData ? editingData.siteNameSearch : ''}
              </div>
            </label>
            <br />
  
            <label>
              URL
              <div className="url-input-container">
                <input
                  type="text"
                  name="url"
                  value={editingData ? editingData.url : ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
                <FontAwesomeIcon icon={faExternalLinkAlt} className="button-icon" onClick={handleRedirect} />
              </div>
            </label>
            <br />
  
            <label>
              Email
              <div className="field-with-icon-container">
                <input
                  type="email"
                  name="email"
                  value={editingData ? editingData.email : ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
                <FontAwesomeIcon
                  icon={faCopy}
                  className="field-icon"
                  onClick={() => handleCopy('email')}
                />
              </div>
            </label>
            <br />
  
            <label>
              Username (Optional)
              <div className="field-with-icon-container">
                <input
                  type="text"
                  name="username"
                  value={editingData ? editingData.username : ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
                <FontAwesomeIcon
                  icon={faCopy}
                  className="field-icon"
                  onClick={() => handleCopy('username')}
                />
              </div>
            </label>
            <br />
  
            <label>
              Password
              <div className="field-with-icon-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={editingData ? editingData.password : ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
                <FontAwesomeIcon
                  icon={faCopy}
                  className="field-icon"
                  onClick={() => handleCopy('password')}
                />
                <img
                  src={showPassword ? hideImage : showImage}
                  alt={showPassword ? 'Hide Password' : 'Show Password'}
                  onClick={toggleShowPassword}
                  className="password-icon"
                />
              </div>
            </label>
            <br />
  
            <label>
              Notes (Optional)
              <div className="field-with-icon-container">
                <textarea
                  name="notes"
                  value={editingData && editingData.notes !== null ? editingData.notes : ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
                <FontAwesomeIcon
                  icon={faCopy}
                  className="field-icon"
                  onClick={() => handleCopy('notes')}
                />
              </div>
            </label>
            <br />
  
            {copyMessage && <p className="copy-message">{copyMessage}</p>}
  
            <button onClick={editMode ? handleCancelEdit : handleEdit} disabled={submitting}>
              {editMode ? 'Cancel' : 'Edit'}
            </button>
  
            {!editMode && (
              <button onClick={handleDelete} disabled={submitting}>
                {submitting ? 'Deleting...' : 'Delete'}
              </button>
            )}
  
            {editMode && (
              <button onClick={handleModify} disabled={submitting}>
                {submitting ? 'Modifying...' : 'Modify'}
              </button>
            )}
  
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
  
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );  
};

export default EditModify;
