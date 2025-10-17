// Import our custom CSS
import "../scss/login.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";
import authApi from "./authApi.js";
const authAPI = new authApi();

const forgotPassForm = document.querySelector('form');
const emailInput = document.getElementById('email-input');
const submitButton = document.querySelector('button[type="submit"]');

async function handleForgotPass(event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  // if (!email || !password) {
  //   showError('Please fill in all fields');
  //   return;
  // }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address');
    return;
  }

  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending otp...';
  submitButton.disabled = true;

  try {
    const response1 = await authAPI.forgetPasswordSendOtp(email);
    console.log(response1);

    showSuccess('Otp sent! Check your email...');

    await authAPI.forgetPasswordVerifyOtp(email, response1.otp);

    showSuccess('Otp verified!!!');

    setTimeout(() => {
      window.location.href = '../otpPage.html';
    }, 1000);


  } catch (error) {
    showError(error.message || 'Otp verification failed. Please try again...');
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

if (forgotPassForm) {
  forgotPassForm.addEventListener('submit', handleForgotPass);
}

export function showError(message) {
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger error-message mt-3';
  errorDiv.textContent = message;

  forgotPassForm.parentNode.insertBefore(errorDiv, forgotPassForm.nextSibling);
}

export function showSuccess(message) {

  const existingMessage = document.querySelector('.error-message, .success-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success success-message mt-3';
  successDiv.textContent = message;

  forgotPassForm.parentNode.insertBefore(successDiv, forgotPassForm.nextSibling);
}
