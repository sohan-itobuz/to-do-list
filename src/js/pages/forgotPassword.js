
// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";
import { showToast } from "../showToast.js";
import authApi from "./AuthApi.js";
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
    showToast('Please enter a valid email address', "error");
    return;
  }

  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending otp...';
  submitButton.disabled = true;

  try {
    const response1 = await authAPI.forgetPasswordSendOtp(email);
    // console.log(response1);

    localStorage.setItem('reset_email', email);

    showToast('Otp sent! Check your email...', "success");

    setTimeout(() => {
      window.location.href = '../../pages/forgotOtpVerify.html';
    }, 1000);


  } catch (error) {
    showToast(error.message, "error" || 'Otp sending failed. Please try again...', "error");
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

if (forgotPassForm) {
  forgotPassForm.addEventListener('submit', handleForgotPass);
}

