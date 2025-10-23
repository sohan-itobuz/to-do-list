import { showToast } from "../../showToast.js";
import axios from "axios";
import AuthApi from "../api/AuthApi.js";
const authApi = new AuthApi();


const form = document.getElementById("reset-form");
const passwordInput = document.getElementById("newPassword");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("reset_email");
  const newPassword = passwordInput.value.trim();

  if (!newPassword) {
    showToast("Please enter a password to reset", "error");
    return;
  }

  try {

    await authApi.forgetPasswordReset(email, newPassword);

    showToast("Password reset successful!", "success");

    localStorage.removeItem("reset_email");

    window.location.href = "../../pages/loginPage.html";
  } catch (error) {
    showToast(error.message, "error" || "Failed to reset password", "error");
  }
});