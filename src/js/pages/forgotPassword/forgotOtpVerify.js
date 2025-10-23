import { OTPInput } from '../../utils/utils.js';
import { forgotOtpVerify } from '../../dom/domHandler.js';
import { handleForgotPassOtp, handleForgotPass } from './eventHandlers.js';

// const inputs = document.querySelectorAll('#otp > *[id]');
// const otpForm = document.getElementById("otp-form");
// const otpInputs = document.querySelectorAll('#otp input');
// const validateButton = document.querySelector('.validate');

OTPInput(forgotOtpVerify.inputs);

if (forgotOtpVerify.otpForm) {
  forgotOtpVerify.otpForm.addEventListener('submit', handleForgotPassOtp);
}

if (forgotOtpVerify.resendOtp) {
  forgotOtpVerify.resendOtp.addEventListener('click', handleForgotPass);
}