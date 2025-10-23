import * as bootstrap from "bootstrap";
import { showToast } from "../../utils/showToast.js";
import authApi from "../api/AuthApi.js";
import { OTPInput } from "../../utils/utils.js";

const authAPI = new authApi();

import { handleOTPVerification, handleResendOTP } from "./eventHandler.js";
import { otpSelector } from "../../dom/domHandler.js";
// const inputs = document.querySelectorAll('#otp > *[id]');
// const otpInputs = document.querySelectorAll('#otp input');
// const validateButton = document.querySelector('.validate');
// const resendLink = document.querySelector('.resend-link');

OTPInput(otpSelector.inputs);

document.addEventListener("DOMContentLoaded", handleResendOTP);

if (otpSelector.validateButton) {
  otpSelector.validateButton.addEventListener('click', handleOTPVerification);
}

if (otpSelector.resendOtp) {
  otpSelector.resendOtp.addEventListener('click', (e) => {
    e.preventDefault();
    handleResendOTP();
  });
}

