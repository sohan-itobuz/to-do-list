// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// const accessToken = localStorage.getItem('access-token');
// if (!accessToken) {
//   window.location.href = './pages/loginPage.html';
// }

import todoApi from './api/TodoApi.js';
import { initializeEventHandlers } from './events/events.js';
import { renderTodos } from './utils/utils.js';

const todoAPI = new todoApi();

const todoList = document.getElementById("todo-list");

initializeEventHandlers(todoList);