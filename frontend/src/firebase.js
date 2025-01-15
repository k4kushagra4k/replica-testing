import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5o6tJrenVYAqOYX13aKO8P8y4gd2Qcg0",
  authDomain: "dig-replica.firebaseapp.com",
  projectId: "dig-replica",
  storageBucket: "dig-replica.firebasestorage.app",
  messagingSenderId: "534406396403",
  appId: "1:534406396403:web:a76425c9c1b39b804fba86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
