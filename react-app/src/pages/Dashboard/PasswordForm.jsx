import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase';
import './PasswordForm.css';

const PasswordForm = ({ selectedPassword, setPasswords, onClose }) => {
  const [passwordData, setPasswordData] = useState({
    siteNameSearch: '',
    url: '',
    email: '',
    password: '',
    notes: '',
    username: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedPassword) {
      setPasswordData({
        siteNameSearch: selectedPassword.siteNameSearch || '',
        url: selectedPassword.url || '',
        email: selectedPassword.email || '',
        password: selectedPassword.password || '',
        notes: selectedPassword.notes || '',
        username: selectedPassword.username || '',
      });
    }
  }, [selectedPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updatePasswords = async (dataToAdd) => {
    try {
      setSubmitting(true);

      await addDoc(collection(db, 'passwords'), dataToAdd);
      console.log('Password added successfully');

      setPasswords((prevPasswords) => [...prevPasswords, dataToAdd]);

      setPasswordData({
        siteNameSearch: '',
        url: '',
        email: '',
        password: '',
        notes: '',
        username: '',
      });

      setError(null);
    } catch (error) {
      console.error('Error adding password: ', error);
      setError(error.message || 'An error occurred while submitting the form.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simple form validation
      if (!passwordData.siteNameSearch || !passwordData.url || !passwordData.email || !passwordData.password) {
        setError('Please fill in all required fields.');
        return;
      }

      const auth = getAuth();
      const user = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            unsubscribe();
            resolve(user);
          }
        });
      });

      const dataToAdd = {
        siteNameSearch: passwordData.siteNameSearch.trim(),
        url: passwordData.url.trim(),
        email: passwordData.email.trim(),
        password: passwordData.password.trim(),
        notes: passwordData.notes.trim() !== '' ? passwordData.notes.trim() : null,
        username: passwordData.username.trim() !== '' ? passwordData.username.trim() : null,
        uid: user.uid,
      };

      await updatePasswords(dataToAdd);
    } catch (error) {
      console.error('Error handling form submission: ', error);
    }
  };

  const handleClose = () => {
    // Reset form data and close the form
    setPasswordData({
      siteNameSearch: '',
      url: '',
      email: '',
      password: '',
      notes: '',
      username: '',
    });
    setError(null);

    // Close the form by calling the onClose prop
    onClose();
  };

  return (
    <form className="password-form-container" onSubmit={handleSubmit}>

      <label>
        Site Name
        <input type="text" name="siteNameSearch" value={passwordData.siteNameSearch} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        URL
        <input type="text" name="url" value={passwordData.url} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        Email
        <input type="email" name="email" value={passwordData.email} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        Username (Optional)
        <input type="text" name="username" value={passwordData.username} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        Password
        <input type="text" name="password" value={passwordData.password} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        Notes (Optional)
        <textarea name="notes" value={passwordData.notes} onChange={handleInputChange} />
      </label>
      <br />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>

      <button type="button" onClick={handleClose}>
        Close
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default PasswordForm;
