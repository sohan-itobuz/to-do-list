export const todoMain = {
  todoList: document.getElementById("todo-list"),
  searchForm: document.getElementById("search-form"),
  searchTermInput: document.getElementById("search-term"),
  allBtn: document.getElementById("all-btn"),
  highBtn: document.getElementById("high-btn"),
  midBtn: document.getElementById("mid-btn"),
  lowBtn: document.getElementById("low-btn"),
  completeBtn: document.getElementById("completed-btn"),
  todoForm: document.getElementById("todo-form"),

  delAllModal: document.getElementById("clear-all-btn"),
  delBtn: document.getElementById("confirmDeleteBtn"),
  delAllBtn: document.getElementById("confirmDeleteAllBtn"),
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
  resendOtp: document.getElementById('resend-otp'),
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

export const otpSelector = {
  inputs: document.querySelectorAll('#otp > *[id]'),
  otpInputs: document.querySelectorAll('#otp input'),
  validateButton: document.querySelector('.validate'),
  resendLink: document.querySelector('.resend-link'),
  resendOtp: document.getElementById('resend-otp'),
}

export const resetPassword = {
  form: document.getElementById("resetPasswordForm"),
  emailInput: document.getElementById("emailInput"),
  oldPasswordInput: document.getElementById("oldPasswordInput"),
  newPasswordInput: document.getElementById("newPasswordInput"),
}

export const signUp = {
  signupForm: document.getElementById('signup-form'),
  emailInput: document.getElementById('email'),
  passwordInput: document.getElementById('password'),
  submitButton: document.getElementById('submit-btn'),
}

export const profile = {
  emailSpan: document.getElementById('user-email'),
  logoutBtn: document.getElementById('logout-btn'),
}