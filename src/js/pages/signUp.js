// Import our custom CSS
// import "../scss/login.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { showToast } from "../showToast.js";

import authApi from "./AuthApi.js";
const authAPI = new authApi();

const signupForm = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit-btn');

async function handleSignup(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const originalText = submitButton.textContent;
  submitButton.textContent = 'Signing up...';
  submitButton.disabled = true;

  try {

    const response = await authAPI.register(email, password);
    console.log('Registration response:', response);

    localStorage.setItem('pendingEmail', email);

    showToast("Registration successful! Please check your email for OTP.", "success");

    setTimeout(() => {
      window.location.href = '../../pages/otpPage.html';
    }, 1000);

  } catch (error) {
    console.error('Registration error:', error);

    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      showToast('Backend server is not running. Please start your backend server and try again.', "error");
    } else {
      showToast(error.message || 'Registration failed. Please try again.', "error");
    }
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

if (signupForm) {

  signupForm.addEventListener('submit', handleSignup);
} else {
  console.error('Signup form not found!');
}
