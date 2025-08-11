import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/user/Home";
import Login from "./components/SignIn";
import SignUp from "./components/SignUp";
import MyBookings from "./pages/user/MyBookings";
import Profile from "./pages/user/MyProfile";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "https://dd183bddabf9.ngrok-free.app/api/v1/auth/signup",
          {
            method: "GET",
            credentials: "include",
            headers: { "ngrok-skip-browser-warning": "true" },
          }
        );

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      {/* Pass isLoggedIn state to Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<SignUp />} />

        {isLoggedIn && (
          <>
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
