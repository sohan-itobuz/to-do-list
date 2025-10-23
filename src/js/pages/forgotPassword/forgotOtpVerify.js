import AuthApi from '../api/AuthApi.js';
import { OTPInput } from '../../utils.js';
import { showToast } from "../../showToast.js";
const authApi = new AuthApi();

const inputs = document.querySelectorAll('#otp > *[id]');
const otpForm = document.getElementById("otp-form");
const otpInputs = document.querySelectorAll('#otp input');
const validateButton = document.querySelector('.validate');

OTPInput(inputs);

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("reset_email");

  // console.log(email);
  const otp = Array.from(otpInputs).map(input => input.value).join('');

  if (!otp) {
    showToast("Please enter OTP");
    return;
  }

  if (otp.length !== 6) {
    showToast('Please enter the complete 6-digit OTP', "error");
    return;
  }

  // if (!email) {
  //   showToast('Email not found. Please try registering again.', "error");
  //   setTimeout(() => {
  //     window.location.href = '../../pages/signUpPage.html';
  //   }, 2000);
  //   return;
  // }

  validateButton.textContent = 'Verifying...';
  validateButton.disabled = true;


  try {
    const response = await authApi.forgetPasswordVerifyOtp(email, otp);
    sessionStorage.setItem('sessionToken', response.data.accessToken);

    showToast("OTP Verified Successfully!", "success");

    setTimeout(() => {
      window.location.href = '../../pages/forgotPasswordReset.html';
    }, 1000);

  } catch (error) {
    showToast(error.message || "Invalid OTP. Please try again.", "error");
  }
});

// if (otpForm) {
//   otpForm.addEventListener('submit', handleForgotPass);
// }