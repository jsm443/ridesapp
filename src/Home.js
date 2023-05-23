import React from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="title">Zoot Ride</h1>
      <p className="intro">Create or Join a Ride</p>
      <button className="sign-in-btn" onClick={() => navigate('/signin')}>Sign In / Signup</button>
    </div>
  );
}

export default Home;