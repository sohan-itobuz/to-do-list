export const todos = {

}

export const forgotPasswordPage = {
  forgotPassForm: document.querySelector('form'),
  emailInput: document.getElementById('email-input'),
  submitButton: document.querySelector('button[type="submit"]'),
}

export const forgotOtpVerify = {
  inputs: document.querySelectorAll('#otp > *[id]'),
  otpForm: document.getElementById("otp-form"),
  otpInputs: document.querySelectorAll('#otp input'),
  validateButton: document.querySelector('.validate'),
}

export const forgotPasswordReset = {
  form: document.getElementById("reset-form"),
  passwordInput: document.getElementById("newPassword"),
}

export const login = {
  loginForm: document.querySelector('form'),
  emailInput: document.getElementById('email-input'),
  passwordInput: document.getElementById('password-input'),
  submitButton: document.querySelector('button[type="submit"]'),
}