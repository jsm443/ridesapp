import React, { useState, useContext } from 'react';
import './MyAccount.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { signOut, getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';

function MyAccount() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [joinCode, setJoinCode] = useState('');
  const [displayName] = useState(currentUser ? currentUser.displayName : '');
  //const name = currentUser.displayName;

  const handleJoinSubmit = (event) => {
    event.preventDefault();
    console.log('Join a ride with code:', joinCode);
    // handle joining a ride schedule here
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
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
      <div className="myaccount-container">
        <h1 className="title">Welcome {displayName} to your account</h1>



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

        <Link to="/createride">Create Ride</Link>
        <br></br>
        <Link to="/settings">Settings</Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }
}

export default MyAccount;