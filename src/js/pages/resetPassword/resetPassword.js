import { handleResetPassword } from "./eventHandler.js";
import { resetPassword } from "../../dom/domHandler.js";
// const form = document.getElementById("resetPasswordForm");
// const emailInput = document.getElementById("emailInput");
// const oldPasswordInput = document.getElementById("oldPasswordInput");
// const newPasswordInput = document.getElementById("newPasswordInput");


if (resetPassword.form) {
  resetPassword.form.addEventListener('submit', handleResetPassword);
}