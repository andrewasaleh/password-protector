import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './PasswordForm.css'; 

const PasswordForm = () => {
    const [passwordData, setPasswordData] = useState({
      website: '',
      email: '',
      password: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // If a user is logged in, set the email in the passwordData
          setPasswordData((prevData) => ({
            ...prevData,
            email: user.email || '',
          }));
        } else {
          // If no user is logged in, set all fields to empty
          setPasswordData({
            website: '',
            email: '',
            password: '',
          });
        }
      });
  
      return () => unsubscribe();
    }, []); 
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPasswordData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
  
      try {
        // Validate form data
        if (!passwordData.website || !passwordData.email || !passwordData.password) {
          throw new Error('Please fill in all fields.');
        }
  
        // Add the password data to the Firestore collection
        await addDoc(collection(db, 'passwords'), {
          ...passwordData,
        });
        console.log('Password added successfully');
  
        // Reset the form after submission
        setPasswordData({
          website: '',
          email: '',
          password: '',
        });
  
        // Provide feedback to the user
        setError(null);
      } catch (error) {
        console.error('Error adding password: ', error);
        setError(error.message || 'An error occurred while submitting the form.');
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <form className="password-form-container" onSubmit={handleSubmit}>
        <label>
          Website:
          <input type="text" name="website" value={passwordData.website} onChange={handleInputChange} />
        </label>
        <br />
  
        <label>
          Email:
          <input type="email" name="email" value={passwordData.email} onChange={handleInputChange} />
        </label>
        <br />
  
        <label>
          Password:
          <input type="password" name="password" value={passwordData.password} onChange={handleInputChange} />
        </label>
        <br />
  
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Password'}
        </button>
  
        {error && <p className="error-message">{error}</p>}
      </form>
    );
  };
  
  export default PasswordForm;