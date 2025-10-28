// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import { initializeEventHandlers } from './events/events.js';
import { todoMain } from "./dom/domHandler.js";
import { renderTodos } from './utils/utils.js';



initializeEventHandlers(todoMain.todoList);

renderTodos();