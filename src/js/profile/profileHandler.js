export function profileIcon() {
  document.addEventListener('DOMContentLoaded', () => {
    const emailSpan = document.getElementById('user-email');
    const logoutBtn = document.getElementById('logout-btn');

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email && emailSpan) {
      emailSpan.textContent = user.email;
    }

    logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = '../pages/loginPage.html';
    });
  });
}