import AuthApi from "./AuthApi.js";
const authApi = new AuthApi();

// import showToast from '../showToast.js';

const form = document.getElementById("reset-form");
const passwordInput = document.getElementById("newPassword");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("reset_email");
  const newPassword = passwordInput.value.trim();

  if (!newPassword) {
    alert("Please enter a password to reset");
    return;
  }

  try {
    await authApi.forgetPasswordReset(email, newPassword);

    alert("Password reset successful!");

    localStorage.removeItem("reset_email");

    window.location.href = "../../pages/loginPage.html";
  } catch (error) {
    alert(error.message || "Failed to reset password");
  }
});