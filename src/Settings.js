import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from "react-router-dom";
import './Settings.css';
import { updateProfile } from "firebase/auth";

function Settings() {
  const { currentUser, logout } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameUpdate = async () => {
    if (currentUser) {
      await updateProfile(currentUser, { displayName });
    }
  }

  if (!currentUser) {
    navigate('/signin');
  }
  if (!currentUser) {
    return (
      <div className="myaccount-container">
        <h1 className="title">You are logged out.  Please Sign in</h1>
        <button className="sign-in-btn" onClick={() => navigate('/signin')}>Sign In to Find a Ride</button>
      </div>
    )
  }
  else {
    return (

      <div className="settings-container">
        <h1 className="title">Settings</h1>
        <div>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button onClick={handleNameUpdate}>Update Display Name</button>
        </div>
        <br></br>

        <button onClick={handleSignOut}>Sign Out</button>
        <button onClick={() => navigate('/myaccount')}>My Account</button>
      </div>
    );
  }
}

export default Settings;