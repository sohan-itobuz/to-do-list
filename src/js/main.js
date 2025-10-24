// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// const accessToken = localStorage.getItem('access-token');
// if (!accessToken) {
//   window.location.href = './pages/loginPage.html';
// }

import { initializeEventHandlers } from './events/events.js';
import { todoMain } from "./dom/domHandler.js";
import { renderTodos } from './utils/utils.js';



initializeEventHandlers(todoMain.todoList);

renderTodos();