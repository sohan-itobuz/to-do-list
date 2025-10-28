
// const forgotPassForm = document.querySelector('form');
// const emailInput = document.getElementById('email-input');
// const submitButton = document.querySelector('button[type="submit"]');
import { forgotPasswordPage } from "../../dom/domHandler.js";
import { handleForgotPass } from "./eventHandlers.js";

if (forgotPasswordPage.forgotPassForm) {
  forgotPasswordPage.forgotPassForm.addEventListener('submit', handleForgotPass);
}