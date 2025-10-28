import { resetPassword } from "../../dom/domHandler.js";
import { showToast } from "../../utils/showToast.js";
import TodoApi from "../../api/TodoApi.js";
const todoApi = new TodoApi();

export async function handleResetPassword(e) {
  e.preventDefault();

  const oldPassword = resetPassword.oldPasswordInput.value.trim();
  const newPassword = resetPassword.newPasswordInput.value.trim();

  if (!oldPassword || !newPassword) {
    showToast("All fields are required", "error");
    return;
  }

  try {
    await todoApi.resetPassword(localStorage.getItem('userEmail'), oldPassword, newPassword);
    showToast("Password updated successfully! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "../../pages/loginPage.html";
    }, 1000);

  } catch (error) {
    showToast(error.message || "Something went wrong", "error");
  }
};