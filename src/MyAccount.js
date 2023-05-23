import React, { useState, useContext, useEffect } from 'react';
import './MyAccount.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { signOut, getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

function MyAccount() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState('');
  const [displayName] = useState(currentUser ? currentUser.displayName : '');
  const [rides, setRides] = useState({});//for displaying existing rides configurations
  const db = getDatabase();

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

  useEffect(() => {//handles displaying the rides
    const rideRef = ref(db, `rides/${currentUser.uid}`);
    onValue(rideRef, (snapshot) => {
      const data = snapshot.val();
      setRides(data || {});
    });
  }, [currentUser.uid]);

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

        <div className="my-rides">
          <h2>My Rides</h2>
          {Object.entries(rides).map(([id, ride]) => (
            <div key={id}>
              <Link to={`/manageride/${id}`}>{ride.name}</Link>
            </div>
          ))}
        </div>


        <Link to="/createride">Create Ride</Link>
        <br></br>
        <Link to="/settings">Settings</Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }
}

export default MyAccount;