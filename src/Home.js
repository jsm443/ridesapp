import React from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="title">Welcome to SportsRide</h1>
      <p className="intro">Need a ride to your sports practice? You're in the right place!</p>
      <button className="sign-in-btn" onClick={() => navigate('/signin')}>Sign In to Find a Ride</button>
    </div>
  );
}

export default Home;