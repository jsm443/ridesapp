import React from 'react';
import './SignIn.css';
import FirebaseAuth from './FirebaseAuth';

function SignIn() {
  return (
    <div className="signin-container">
      <h1 className="title">Sign In to SportsRide</h1>
      <FirebaseAuth />
    </div>
  );
}

export default SignIn;