import TodoApi from "../../api/TodoApi.js";
import { showToast } from "../../utils/showToast.js";
const todoApi = new TodoApi();

const form = document.getElementById("resetPasswordForm");
const emailInput = document.getElementById("emailInput");
const oldPasswordInput = document.getElementById("oldPasswordInput");
const newPasswordInput = document.getElementById("newPasswordInput");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const oldPassword = oldPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();

  if (!email || !oldPassword || !newPassword) {
    showToast("All fields are required", "error");
    return;
  }

  try {
    await todoApi.resetPassword(email, oldPassword, newPassword);
    showToast("Password updated successfully! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "../../pages/loginPage.html";
    }, 1000);

  } catch (error) {
    showToast(error.message, "error" || "Something went wrong", "error");
  }
});
