import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function FirebaseAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        navigate("/myaccount");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: getAuth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      <h1>Welcome to SportsRide!</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
}

export default FirebaseAuth;