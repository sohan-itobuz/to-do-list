// const emailSpan = document.getElementById('user-email');
// const logoutBtn = document.getElementById('logout-btn');
import { profile } from "../dom/domHandler";


export function profileHandler() {
  document.addEventListener('DOMContentLoaded', () => {

    const userEmail = localStorage.getItem('userEmail');
    const userEmailFirst = userEmail.split('')[0];

    if (userEmail && userEmailFirst && profile.emailSpan) {
      profile.emailSpan.textContent = userEmailFirst;
    }

    profile.logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = '../pages/loginPage.html';
    });
  });
}