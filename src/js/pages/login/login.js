import { login } from "../../dom/domHandler.js";
import { handleLogin } from "./eventHandler.js";
// const loginForm = document.querySelector('form');
// const emailInput = document.getElementById('email-input');
// const passwordInput = document.getElementById('password-input');
// const submitButton = document.querySelector('button[type="submit"]');


if (login.loginForm) {
  login.loginForm.addEventListener('submit', handleLogin);
}