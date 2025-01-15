import React, { useState } from "react";
import { auth } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate(); // Initialize navigate

  const googleProvider = new GoogleAuthProvider(); // Initialize Google Auth Provider

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Sign-in successful:", user);
      localStorage.setItem("token", user.accessToken); // Store the token in localStorage
      navigate("/createReplica"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
      setErrorMessage("An error occurred during Google sign-in.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    try {
      if (isSignup) {
        // Signup logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Signed up successfully:", userCredential.user);
        setShowPopup(true); // Show the success popup on account creation
        localStorage.setItem("token", userCredential.user.accessToken); // Store the token in localStorage
        navigate("/"); // Redirect to the home page after successful signup
      } else {
        // Login logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Logged in successfully:", userCredential.user);
        localStorage.setItem("token", userCredential.user.accessToken); // Store the token in localStorage
        navigate("/createReplica"); // Redirect to the home page after successful login
      }
    } catch (error) {
      console.error("Error:", error.message);
      if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email address.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Create Account" : "Welcome Back!"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <p className="toggle-auth">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <span onClick={() => setIsSignup(!isSignup)} className="toggle-link">
          {isSignup ? "Login" : "Sign Up"}
        </span>
      </p>

      {/* Google Sign-In Button */}
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        Sign in with Google
      </button>

      {/* Popup for successful account creation */}
      {showPopup && (
        <div className="popup">
          <p>Account created successfully!</p>
          <button onClick={() => setShowPopup(false)} className="popup-close">
            Close
          </button>
        </div>
      )}

      {/* Error message for incorrect credentials */}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Auth;
