import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js"; // Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import auth functions
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate();
  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user state if logged in
      } else {
        setUser(null); // Reset user state if logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null); 
        localStorage.removeItem("token");
        navigate('/auth', { replace: true }); 
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">ReplicaVerse</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/replica">Replica</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
      </ul>

      {/* Conditional rendering for the login/signup button or user's email */}
      {user ? (
        <div className="navbar-user">
          <span>{user.email}</span>
          <button
            onClick={handleLogout}
            className="navbar-button navbar-logout"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/auth" className="navbar-button navbar-auth">
          Login / Sign Up
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
