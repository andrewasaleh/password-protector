import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, orderBy, startAt, endAt, onSnapshot } from 'firebase/firestore';
import { db, auth, deleteDoc } from '../../firebase';
import { ReactComponent as PlusIcon } from '../../Assets/images/Dashboard/square-plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ onSelectPassword, onAddButtonClick, onPasswordDelete }) {
  const [passwords, setPasswords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [copyMessage, setCopyMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let q;
        if (searchQuery.trim() !== '') {
          const startSearch = searchQuery;
          const endSearch = searchQuery + '\uf8ff';

          q = query(
            collection(db, 'passwords'),
            where('uid', '==', user.uid),
            orderBy('siteNameSearch'), // Ensure 'siteNameSearch' is indexed in Firebase
            startAt(startSearch),
            endAt(endSearch)
          );
        } else {
          q = query(collection(db, 'passwords'), where('uid', '==', user.uid));
        }

        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const passwordData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPasswords(passwordData);
        });

        return () => {
          // Cleanup both the authStateChanged and snapshot listeners
          unsubscribe();
          unsubscribeSnapshot();
        };
      }
    });
  }, [searchQuery]);

  const handleKeyPress = async (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    if (newSearchQuery === '') {
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'passwords'), where('uid', '==', user.uid));

        try {
          const querySnapshot = await getDocs(q);
          const passwordData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPasswords(passwordData);
        } catch (error) {
          console.error('Error fetching passwords:', error);
        }
      }
    }
  };

  const handleAddPassword = () => {
    console.log('Add Password clicked');
    onAddButtonClick();
  };

  const handlePasswordClick = (selectedPassword) => {
    console.log('Password clicked', selectedPassword);
    setSelectedPassword(selectedPassword);
    onSelectPassword(selectedPassword);
  };

  const handleDeletePassword = async (selectedPassword) => {
    console.log('Delete Password clicked', selectedPassword);
  
    try {
      const passwordRef = doc(db, 'passwords', selectedPassword.id);
      await deleteDoc(passwordRef);
  
      // Remove the deleted password from the state
      setPasswords((prevPasswords) =>
        prevPasswords.filter((password) => password.id !== selectedPassword.id)
      );
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  };

  const handleCopy = (password, event) => {
    // Stop the click event propagation
    event.stopPropagation();
  
    // Copy to clipboard
    navigator.clipboard.writeText(password);
  
    // Set a temporary message including the site name
    setCopyMessage(`password copied to clipboard`);
  
    // Clear the message after 3 seconds (adjust the duration as needed)
    setTimeout(() => {
      setCopyMessage(null);
    }, 3000);
  };
  

  return (
    <div className="sidebar-container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search passwords"
          className="search-bar"
          onChange={handleKeyPress}
        />
        <button className="add-password-button" onClick={onAddButtonClick}>
          <PlusIcon />
        </button>
      </div>

      <div className="sidebar">
        {passwords.map((password) => (
          <div
            key={password.id}
            className="sidebar-item"
            onClick={() => handlePasswordClick(password)}
          >
            <div className="site-name">{password.siteNameSearch}</div>
            <div className="email">{password.email}</div>

            {/* Separate copy icon button outside of the sidebar items */}
            <div className="copy-icon-container" onClick={(event) => handleCopy(password.password, event)}>
            <FontAwesomeIcon icon={faCopy} />
          </div>
          </div>
        ))}
      </div>

      {/* Display copy message */}
      {copyMessage && (
        <div className="copy-message">
          {copyMessage}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
