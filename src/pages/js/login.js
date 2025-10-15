// Import our custom CSS
import "../scss/login.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";
import { authAPI } from "./authApi";

const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.querySelector('button[type="submit"]');

async function handleLogin(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // if (!email || !password) {
  //   showError('Please fill in all fields');
  //   return;
  // }
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   showError('Please enter a valid email address');
  //   return;
  // }

  const originalText = submitButton.textContent;
  submitButton.textContent = 'Signing in...';
  submitButton.disabled = true;

  try {
    await authAPI.login(email, password);

    showSuccess('Login successful! Redirecting...');

    setTimeout(() => {
      window.location.href = '../../index.html';
    }, 1500);

  } catch (error) {
    showError(error.message || 'Login failed. Please check your credentials.');
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}

function showError(message) {
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger error-message mt-3';
  errorDiv.textContent = message;

  loginForm.parentNode.insertBefore(errorDiv, loginForm.nextSibling);
}

function showSuccess(message) {

  const existingMessage = document.querySelector('.error-message, .success-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success success-message mt-3';
  successDiv.textContent = message;

  loginForm.parentNode.insertBefore(successDiv, loginForm.nextSibling);
}