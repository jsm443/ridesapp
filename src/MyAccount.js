import React, { useState, useContext } from 'react';
import './MyAccount.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { updateProfile, signOut, getAuth } from "firebase/auth";

function MyAccount() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [joinCode, setJoinCode] = useState('');
  const [createCode, setCreateCode] = useState('');
  const [displayName, setDisplayName] = useState(currentUser ? currentUser.displayName : '');
  const name = currentUser.displayName;

  const handleJoinSubmit = (event) => {
    event.preventDefault();
    console.log('Join a ride with code:', joinCode);
    // handle joining a ride schedule here
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    console.log('Create a ride with code:', createCode);
    // handle creating a ride schedule herejac
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate('/signin');
  }

  const handleNameUpdate = async () => {
    if (currentUser) {
      await updateProfile(currentUser, { displayName });
    }
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
      <div className="myaccount-container">
        <h1 className="title">Welcome {name} to your account</h1>

        <div>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button onClick={handleNameUpdate}>Update Display Name</button>
        </div>

        <button onClick={handleSignOut}>Sign Out</button>

        <form onSubmit={handleJoinSubmit}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter code to join a ride"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value)}
            />
          </div>
          <button className="button" type="submit" disabled={!joinCode.trim()}>
            Join a Ride
          </button>
        </form>

        <form onSubmit={handleCreateSubmit}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter code to create a ride"
              value={createCode}
              onChange={e => setCreateCode(e.target.value)}
            />
          </div>
          <button className="button" type="submit" disabled={!createCode.trim()}>
            Create a Ride
          </button>
        </form>
      </div>
    );
  }
}

export default MyAccount;