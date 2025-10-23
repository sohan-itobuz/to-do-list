import { signUp } from "../../dom/domHandler.js";
import { handleSignup } from "./eventHandler.js";
// const signupForm = document.getElementById('signup-form');
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const submitButton = document.getElementById('submit-btn');


if (signUp.signupForm) {
  signUp.signupForm.addEventListener('submit', handleSignup);
}
