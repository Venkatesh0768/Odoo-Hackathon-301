import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
// Import other pages here when needed
// import VenueList from "./pages/user/VenueList";
// import VenueDetail from "./pages/user/VenueDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/venues" element={<VenueList />} /> */}
        {/* <Route path="/venue/:id" element={<VenueDetail />} /> */}

        {/* You can add Owner/Admin routes here */}
      </Routes>
    </Router>
  );
};

export default App;
