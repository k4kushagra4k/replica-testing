import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import About from "./Components/About/About.jsx";
import CreateReplica from "./Components/CreateReplica/CreateReplica.jsx";
import Pricing from "./Components/Pricing/Pricing.jsx";
import Replica from "./Components/Replica/Replica.jsx";
import Auth from "./Components/Auth/Auth.jsx";
import Chatbot from "./Components/Chatbot/Chatbot.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const App = () => {
  const apiUrl = process.env.REACT_APP_API_URL; // Access the API URL here

  console.log("API URL: ", apiUrl); // Just for checking if it's working

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/replica" element={<Replica />} />
        <Route
          path="/createReplica"
          element={
            <ProtectedRoute>
              <CreateReplica />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
};

export default App;
