import AuthApi from './AuthApi.js';
import { showToast } from "../showToast.js";
const authApi = new AuthApi();

// import showToast from '../showToast.js';

const otpForm = document.getElementById("otp-form");
const otpInput = document.getElementById("otp");

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("reset_email");
  const otp = otpInput.value.trim();

  if (!otp) {
    showToast("Please enter OTP");
    return;
  }

  try {
    await authApi.forgetPasswordVerifyOtp(email, otp);

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