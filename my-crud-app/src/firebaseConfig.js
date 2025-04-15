// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2io2pJL_gIDE2Jprh8nbeRjWCA3m1frM",
  authDomain: "dbmsfinbanker.firebaseapp.com",
  projectId: "dbmsfinbanker",
  storageBucket: "dbmsfinbanker.appspot.com", // ✅ fixed incorrect domain
  messagingSenderId: "832501371052",
  appId: "1:832501371052:web:2890d2d907bdb43daf8f09",
  measurementId: "G-TSN843ML1W"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Export what you need for Email OTP
export {
  auth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
};
