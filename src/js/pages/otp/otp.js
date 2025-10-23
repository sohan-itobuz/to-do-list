// Import our custom CSS
// import "../scss/login.scss";
// import "../scss/otp.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";
import { showToast } from "../../showToast.js";
import authApi from "../api/AuthApi.js";
import { OTPInput } from "../../utils.js";

const authAPI = new authApi();

const inputs = document.querySelectorAll('#otp > *[id]');

OTPInput(inputs);

async function handleOTPVerification() {
  const otpInputs = document.querySelectorAll('#otp input');
  const otp = Array.from(otpInputs).map(input => input.value).join('');

  if (otp.length !== 6) {
    showToast('Please enter the complete 6-digit OTP', "error");
    return;
  }

  const email = localStorage.getItem('pendingEmail');
  if (!email) {
    showToast('Email not found. Please try registering again.', "error");
    window.location.href = '../../pages/signUpPage.html';
    return;
  }

  const validateButton = document.querySelector('.validate');
  const originalText = validateButton.textContent;
  validateButton.textContent = 'Verifying...';
  validateButton.disabled = true;

  try {
    await authAPI.verifyOTP(email, otp);

    localStorage.removeItem('pendingEmail');

    showToast("OTP verified successfully! ", "success");

    setTimeout(() => {
      window.location.href = '../../pages/loginPage.html';
    }, 1500);

  } catch (error) {
    showToast(error.message, "error", 5000 || 'OTP verification failed. Please try again.', "error");
  } finally {

    validateButton.textContent = originalText;
    validateButton.disabled = false;
  }
}

async function handleResendOTP() {
  const email = localStorage.getItem('pendingEmail');
  if (!email) {
    showToast('Email not found. Please try registering again.', "error");
    window.location.href = './signUpPage.html';
    return;
  }

  // const resendLink = document.querySelector('.text-decoration-none .ms-3');
  // const originalText = resendLink.textContent;
  // resendLink.textContent = 'Sending...';
  // resendLink.style.pointerEvents = 'none';

  try {
    await authAPI.resendOTP(email);
    showToast('OTP has been resent to your email.', "success");
  } catch (error) {
    showToast(error.message || 'Failed to resend OTP. Please try again.', "success");
  } finally {
    // resendLink.textContent = originalText;
    resendLink.style.pointerEvents = 'auto';
  }
}


const validateButton = document.querySelector('.validate');
if (validateButton) {
  validateButton.addEventListener('click', handleOTPVerification);
}

const resendLink = document.querySelector('.resend-link');
if (resendLink) {
  resendLink.addEventListener('click', (e) => {
    e.preventDefault();
    handleResendOTP();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handleResendOTP();
})
