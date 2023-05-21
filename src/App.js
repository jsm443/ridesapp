import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import SignIn from "./SignIn";
import MyAccount from "./MyAccount"; // assuming you have created this component
//import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/myaccount" element={<MyAccount />} />
        {/* <PrivateRoute path="/myaccount" element={<MyAccount />} /> */}
      </Routes>
    </Router>

  );
}

export default App;