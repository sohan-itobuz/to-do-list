import { showToast } from "../../utils/showToast.js";
import { signUp } from "../../dom/domHandler.js";
import authApi from "../api/AuthApi.js";
const authAPI = new authApi();

export async function handleSignup(event) {
  event.preventDefault();

  const email = signUp.emailInput.value.trim();
  const password = signUp.passwordInput.value;

  const originalText = signUp.submitButton.textContent;
  signUp.submitButton.textContent = 'Signing up...';
  signUp.submitButton.disabled = true;

  try {

    await authAPI.register(email, password);

    localStorage.setItem('pendingEmail', email);

    showToast("Registration successful! Please check your email for OTP.", "success");

    setTimeout(() => {
      window.location.href = '../../pages/otpPage.html';
    }, 1000);

  } catch (error) {
    console.error('Registration error:', error);

    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      showToast('Backend server is not running. Please start your backend server and try again.', "error");
    } else {
      showToast(error.message || 'Registration failed. Please try again.', "error");
    }
  } finally {
    signUp.submitButton.textContent = originalText;
    signUp.submitButton.disabled = false;
  }
}