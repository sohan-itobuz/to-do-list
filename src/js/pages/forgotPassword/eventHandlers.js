import { forgotPasswordPage, forgotOtpVerify, forgotPasswordReset } from "../../dom/domHandler.js";
import { showToast } from "../../utils/showToast.js";

import authApi from "../api/AuthApi.js";
const authAPI = new authApi();

export async function handleForgotPass(event) {
  event.preventDefault();

  let email = sessionStorage.getItem('userEmail');
  if (!email) {

    let email = forgotPasswordPage.emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', "error");
      return;
    }

    sessionStorage.setItem('userEmail', email);
  }

  const originalText = forgotPasswordPage.submitButton.textContent;
  forgotPasswordPage.submitButton.textContent = 'Sending otp...';
  forgotPasswordPage.submitButton.disabled = true;

  try {
    const response1 = await authAPI.forgetPasswordSendOtp(email);
    // console.log(response1);

    localStorage.setItem('reset_email', email);

    showToast('Otp sent! Check your email...', "success");

    setTimeout(() => {
      window.location.href = '../../pages/forgotOtpVerify.html';
    }, 1000);


  } catch (error) {
    showToast(error.message || 'Otp sending failed. Please try again...', "error");
  } finally {
    forgotPasswordPage.submitButton.textContent = originalText;
    forgotPasswordPage.submitButton.disabled = false;
  }
};

export async function handleForgotPassOtp(e) {
  e.preventDefault();

  const email = localStorage.getItem("reset_email");

  const otp = Array.from(forgotOtpVerify.otpInputs).map(input => input.value).join('');

  if (!otp) {
    showToast("Please enter OTP");
    return;
  }

  if (otp.length !== 6) {
    showToast('Please enter the complete 6-digit OTP', "error");
    return;
  }

  forgotOtpVerify.validateButton.textContent = 'Verifying...';
  forgotOtpVerify.validateButton.disabled = true;


  try {
    const response = await authAPI.forgetPasswordVerifyOtp(email, otp);
    sessionStorage.setItem('sessionToken', response.data.accessToken);

    showToast("OTP Verified Successfully!", "success");

    setTimeout(() => {
      window.location.href = '../../pages/forgotPasswordReset.html';
    }, 1000);

  } catch (error) {
    showToast(error.message || "Invalid OTP. Please try again.", "error");
  }
};

export async function handleForgotPassReset(e) {
  e.preventDefault();

  const email = localStorage.getItem("reset_email");
  const newPassword = forgotPasswordReset.passwordInput.value.trim();

  if (!newPassword) {
    showToast("Please enter a password to reset", "error");
    return;
  }

  try {
    await authAPI.forgetPasswordReset(email, newPassword);

    showToast("Password reset successful!", "success");

    localStorage.removeItem("reset_email");

    window.location.href = "../../pages/loginPage.html";
  } catch (error) {
    showToast(error.message || "Failed to reset password", "error");
  }
};