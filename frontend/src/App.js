import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BookRidePage from "./pages/BookRidePage";
import RidesPage from "./pages/RidesPage";
import DriverDashboard from "./pages/DriverDashboard";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<BookRidePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/rides" element={<RidesPage />} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;