import { login } from "../../dom/domHandler";
import { showToast } from "../../utils/showToast";
import AuthApi from "../api/AuthApi";
const authAPI = new AuthApi();

export async function handleLogin(event) {
  event.preventDefault();

  const email = login.emailInput.value.trim();
  const password = login.passwordInput.value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', "error");
    return;
  }

  const originalText = login.submitButton.textContent;
  login.submitButton.textContent = 'Signing in...';
  login.submitButton.disabled = true;

  try {
    await authAPI.login(email, password);

    localStorage.setItem('userEmail', email);

    showToast('Login successful! Redirecting...', "success");

    setTimeout(() => {
      window.location.href = '../../index.html';
    }, 1000);

  } catch (error) {
    showToast(error.message || 'Login failed. Please check your credentials.', "success");
  } finally {
    login.submitButton.textContent = originalText;
    login.submitButton.disabled = false;
  }
};