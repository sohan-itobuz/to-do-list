import { forgotPasswordReset } from "../../dom/domHandler.js";
import { handleForgotPassReset } from "./eventHandlers.js";

// const form = document.getElementById("reset-form");
// const passwordInput = document.getElementById("newPassword");


if (forgotPasswordReset.form) {
  forgotPasswordReset.form.addEventListener('submit', handleForgotPassReset);
}