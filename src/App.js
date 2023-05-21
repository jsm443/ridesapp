import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import SignIn from "./SignIn";
import Settings from "./Settings"
import MyAccount from "./MyAccount";
import CreateRide from "./CreateRide"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/createride" element={<CreateRide />} />
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;