import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './PasswordComponent.css'; // Import the external CSS file
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PasswordComponent = () => {
  const [passwords, setPasswords] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        setUser(user);
      } catch (error) {
        console.error('Error setting user: ', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'passwords'));
        const passwordsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPasswords(passwordsData);
      } catch (error) {
        console.error('Error fetching passwords: ', error);
      }
    };

    if (user) {
      fetchPasswords();
    }
  }, [user]);

  return (
    <div className="password-container">
      <h2 className="password-title">Passwords</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {passwords && passwords.length > 0 ? (
            <ul className="password-list">
              {passwords.map((password) => (
                <li key={password.id} className="password-item">
                  <img src={password.logo} alt="Logo" className="password-logo" />
                  <strong className="password-website">{password.website}</strong>
                  <p className="password-username">Username: {password.username}</p>
                  <p className="password-description">Posted by: {user ? user.displayName : 'Unknown User'}</p>
                  <p className="password-description">Password: {password.password}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No passwords available</p>
          )}
        </>
      )}
    </div>
  );
};

export default PasswordComponent;
