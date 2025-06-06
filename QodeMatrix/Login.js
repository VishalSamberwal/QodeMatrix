// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCn48lQsjPQMQFljvVi13SLeyOzUkTZLjc",
  authDomain: "nvera-30059.firebaseapp.com",
  projectId: "nvera-30059",
  storageBucket: "nvera-30059.appspot.com",
  messagingSenderId: "702251547090",
  appId: "1:702251547090:web:2dcf6f14ebaf89cd15700b",
  measurementId: "G-4NNYHH8M3J"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const form = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordDiv = document.getElementById("confirmPasswordDiv");
const confirmPasswordInput = document.getElementById("confirmPassword");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const switchText = document.getElementById("switchText");
const messageBox = document.getElementById("messageBox");
const googleBtn = document.getElementById("googleBtn");

let isLogin = true;

// Function to toggle between Login and Signup modes
function toggleMode(login = !isLogin) {
  isLogin = login;
  formTitle.textContent = isLogin ? "Login Form" : "Signup Form";
  submitBtn.textContent = isLogin ? "Login" : "Signup";
  confirmPasswordDiv.style.display = isLogin ? "none" : "block";

  loginTab.classList.toggle("active", isLogin);
  signupTab.classList.toggle("active", !isLogin);

  switchText.innerHTML = isLogin
    ? 'Create an account <a href="#" id="switchLink">Signup now</a>'
    : 'Already have an account? <a href="#" id="switchLink">Login now</a>';

  // Re-bind switch link
  document.getElementById("switchLink").addEventListener("click", (e) => {
    e.preventDefault();
    toggleMode(!isLogin);
  });

  clearMessage();
}

// Function to display messages
function displayMessage(msg, type = "info") {
  messageBox.textContent = msg;
  messageBox.style.color = type === "success" ? "green" : "red";
  messageBox.style.display = "block";
}

// Function to clear messages
function clearMessage() {
  messageBox.textContent = "";
  messageBox.style.display = "none";
}

// Form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : null;

  if (isLogin) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        displayMessage("Logged in successfully!", "success");
        console.log(userCredential.user);
        setTimeout(() => {
      window.location.href = "Home.html";
    }, 1500); 
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          displayMessage("Wrong password.", "error");
        } else if (error.code === "auth/user-not-found") {
          displayMessage("No user found with this email.", "error");
        } else {
          displayMessage(error.message, "error");
        }
      });
  } else {
    if (password !== confirmPassword) {
      displayMessage("Passwords do not match!", "error");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        displayMessage("Account created successfully!", "success");
        console.log(userCredential.user);
        
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          displayMessage("Email already in use.", "error");
        } else if (error.code === "auth/weak-password") {
          displayMessage("Password is too weak.", "error");
        } else {
          displayMessage(error.message, "error");
        }
      });
  }
});

// Google Sign-In handler
googleBtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
   provider.setCustomParameters({
    prompt: 'select_account'
  });
  signInWithPopup(auth, provider)
    .then((result) => {
      displayMessage("Signed in with Google!", "success");
      console.log(result.user);
      setTimeout(() => {
      window.location.href = "Home.html";
    }, 1500);
    })
    .catch((error) => {
      displayMessage(error.message, "error");
    });
});

const resetLink = document.getElementById("reset");

resetLink.addEventListener("click", () => {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email address to reset your password.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent. Please check your inbox.");
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        alert("No user found with this email.");
      } else if (error.code === 'auth/invalid-email') {
        alert("Invalid email format.");
      } else {
        alert(error.message);
      }
    });
});
 const name = document.getElementById('username').value;

    // Save the value to localStorage
    localStorage.setItem('userName', name);

    // Optionally, redirect to the second page
    window.location.href = 'C:\Users\HP\Documents\NVEra\Home.html';
    window.onload = function() {
    // Get the saved name from localStorage
    const name = localStorage.getItem('userName');

    // Display the name on the page
    document.getElementById('displayName').textContent = name ? name : "No name saved";
}

// Tab switching handlers
loginTab.addEventListener("click", () => toggleMode(true));
signupTab.addEventListener("click", () => toggleMode(false));

// Initialize in login mode
toggleMode(true);