import React, { useState } from 'react';
import DashNavbar from './DashNavbar';
import Sidebar from './Sidebar';
import PasswordForm from './PasswordForm';
import PasswordGenerator from './PasswordGenerator';
import EditModify from './EditModify';
import './DashboardPage.css';

function DashboardPage() {
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [passwords, setPasswords] = useState([]);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);

  const handleSelectPassword = (password) => {
    setSelectedPassword(password);
    setShowPasswordForm(false);
  };

  const handleAddButtonClick = () => {
    setSelectedPassword(null);
    setShowPasswordForm(true);
    setShowPasswordGenerator(false);
  };

  const handlePasswordFormClose = () => {
    setShowPasswordForm(false);
  };

  const handlePasswordDelete = (deletedPasswordId) => {
    // Implement your logic for password deletion
    console.log('Password deleted:', deletedPasswordId);

    setPasswords((prevPasswords) =>
      prevPasswords.filter((password) => password.id !== deletedPasswordId)
    );
  };

  const handleTogglePasswordGenerator = () => {
    setShowPasswordGenerator(!showPasswordGenerator);
  };

  return (
    <div className="dashboard-page">
      <DashNavbar onTogglePasswordGenerator={handleTogglePasswordGenerator} />
      <div className="content-container">
        <Sidebar
          onSelectPassword={handleSelectPassword}
          onAddButtonClick={handleAddButtonClick}
          onPasswordDelete={handlePasswordDelete}
        />
        <EditModify
          selectedPassword={selectedPassword}
          setPasswords={setPasswords}
          setSelectedPassword={setSelectedPassword}
          onPasswordDelete={handlePasswordDelete} 
        />
        {showPasswordForm && (
          <PasswordForm
            selectedPassword={selectedPassword}
            setPasswords={setPasswords}
            onClose={handlePasswordFormClose}
            onPasswordDelete={handlePasswordDelete}
            setSelectedPassword={setSelectedPassword}
          />
        )}
        {showPasswordGenerator && (
          <PasswordGenerator
            onGenerate={(generatedPassword) => console.log('Generated Password:', generatedPassword)}
            onClose={() => setShowPasswordGenerator(false)}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
