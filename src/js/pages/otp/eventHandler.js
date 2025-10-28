import { otpSelector } from "../../dom/domHandler.js";
import { showToast } from "../../utils/showToast.js";
import authApi from "../api/AuthApi.js";
const authAPI = new authApi();

export async function handleOTPVerification() {
  const otp = Array.from(otpSelector.otpInputs).map(input => input.value).join('');

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

  const originalText = otpSelector.validateButton.textContent;
  otpSelector.validateButton.textContent = 'Verifying...';
  otpSelector.validateButton.disabled = true;

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

    otpSelector.validateButton.textContent = originalText;
    otpSelector.validateButton.disabled = false;
  }
}

export async function handleResendOTP() {
  const email = localStorage.getItem('pendingEmail');
  if (!email) {
    showToast('Email not found. Please try registering again.', "error");
    window.location.href = '../../../pages/signUpPage.html';
    return;
  }

  try {
    await authAPI.resendOTP(email);
    showToast('OTP has been resent to your email.', "success");
  } catch (error) {
    showToast(error.message || 'Failed to resend OTP. Please try again.', "success");
  }
}