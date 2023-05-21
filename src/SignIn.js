import React, { useContext } from 'react';
import './SignIn.css';
import FirebaseAuth from './FirebaseAuth';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
      <div className="myaccount-container">
        <h1 className="title">You are already logged in</h1>
        <button className="to-account-btn" onClick={() => navigate('/myaccount')}>View my account</button>
      </div>
    )
  }
  return (
    <div className="signin-container">
      <h1 className="title">Sign In to SportsRide</h1>
      <FirebaseAuth />
    </div>
  );
}

export default SignIn;