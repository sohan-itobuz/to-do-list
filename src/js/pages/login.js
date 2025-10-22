// Import our custom CSS
import "../../pages/scss/login.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";
import { showToast } from "../showToast.js";
import authApi from "./AuthApi.js";
const authAPI = new authApi();

const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const submitButton = document.querySelector('button[type="submit"]');

async function handleLogin(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', "error");
    return;
  }

  const originalText = submitButton.textContent;
  submitButton.textContent = 'Signing in...';
  submitButton.disabled = true;

  try {
    await authAPI.login(email, password);

    showToast('Login successful! Redirecting...', "success");

    setTimeout(() => {
      window.location.href = '../../index.html';
    }, 1000);

  } catch (error) {
    showToast(error.message || 'Login failed. Please check your credentials.', "success");
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}