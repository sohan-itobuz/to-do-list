// Import our custom CSS
import "../scss/login.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";

const registerLink = document.querySelector('#pills-login a[data-bs-target="#pills-register"]');

if (registerLink) {
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();

    const pillElement = document.getElementById('tab-register');

    if (pillElement && window.bootstrap && window.bootstrap.Tab) {
      const pill = new window.bootstrap.Tab(pillElement);
      pill.show();
    } else if (pillElement) {
      pillElement.click();
    }
  });
}