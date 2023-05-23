import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "rides-ffcdd.firebaseapp.com",
  projectId: "rides-ffcdd",
  storageBucket: "rides-ffcdd.appspot.com",
  messagingSenderId: "12857926308",
  appId: "1:12857926308:web:a09aa9e9857f419a82bc31",
  measurementId: "G-5LDTH04Z7N"
};



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
