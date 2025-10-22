import AuthApi from './AuthApi.js';
import { OTPInput } from './otp.js';
import { showToast } from "../showToast.js";
const authApi = new AuthApi();

// import showToast from '../showToast.js';
OTPInput();

const otpForm = document.getElementById("otp-form");
const otpInput = document.getElementById("otp");

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("reset_email");
  // const otp = otpInput.value.trim();

  if (!otp) {
    showToast("Please enter OTP");
    return;
  }

  const otpInputs = document.querySelectorAll('#otp input');
  const otp = Array.from(otpInputs).map(input => input.value).join('');

  if (otp.length !== 6) {
    showToast('Please enter the complete 6-digit OTP', "error");
    return;
  }

  if (!email) {
    showToast('Email not found. Please try registering again.', "error");
    window.location.href = '../../pages/signUpPage.html';
    return;
  }

  const validateButton = document.querySelector('.validate');
  const originalText = validateButton.textContent;
  validateButton.textContent = 'Verifying...';
  validateButton.disabled = true;

  setTimeout(() => {
    window.location.href = '../../pages/forgotPasswordReset.html';
  }, 1000);

  try {
    const response = await authApi.forgetPasswordVerifyOtp(email, otp);
    sessionStorage.setItem('sessionToken', response.accessToken);
    // showToast("OTP Verified Successfully!");
    showToast("OTP Verified Successfully!", "success");

    window.location.href = "../../pages/forgotPasswordReset.html";
  } catch (error) {
    showToast(error.message || "Invalid OTP. Please try again.", "error");
  }
});

// if (otpForm) {
//   otpForm.addEventListener('submit', handleForgotPass);
// }