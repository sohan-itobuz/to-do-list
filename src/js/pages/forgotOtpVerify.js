import AuthApi from './AuthApi.js';
const authApi = new AuthApi();

// import showToast from '../showToast.js';

const otpForm = document.getElementById("otp-form");
const otpInput = document.getElementById("otp");

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("reset_email");
  const otp = otpInput.value.trim();

  if (!otp) {
    alert("Please enter OTP");
    return;
  }

  try {
    await authApi.forgetPasswordVerifyOtp(email, otp);

    // showToast("OTP Verified Successfully!");
    alert("OTP Verified Successfully!");

    window.location.href = "../../pages/forgotPasswordReset.html";
  } catch (error) {
    alert(error.message || "Invalid OTP. Please try again.");
  }
});

// if (otpForm) {
//   otpForm.addEventListener('submit', handleForgotPass);
// }