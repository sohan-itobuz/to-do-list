// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

const accessToken = localStorage.getItem('access-token');
if (!accessToken) {
  window.location.href = './pages/loginPage.html';
}
// Import modules
import todoApi from './api.js';
import { renderTasks } from './dom.js';
import { initializeEventHandlers } from './events.js';
import { createTaskElement } from "./dom.js";
const todoAPI = new todoApi();

const todoList = document.getElementById("todo-list");
let tasks = [];

// console.log(...todos.data);
// console.log(tasks);
export async function renderTodos(searchTerm = "", searchCategory = "") {
  try {
    let taskArray = [];
    const todos = await todoAPI.getAllTasks(searchTerm, searchCategory);
    taskArray.push(...todos.data);

    todoList.innerHTML = "";
    if (!taskArray.length) {
      const emptyMessage = document.createElement("li");
      emptyMessage.className = "list-group-item text-center p-3 text-muted border-0 bg-transparent";
      emptyMessage.textContent = "No tasks found. Start adding or searching!";
      todoList.appendChild(emptyMessage);
    } else {
      taskArray.forEach((todo) => {
        todoList.appendChild(createTaskElement(todo));
      });
    }
  } catch (error) {
    todoList.innerHTML = '<div class="alert alert-danger text-center" role="alert">Failed to load tasks.</div>';
  }
};
renderTodos();

//have to remove
export async function loadTasks() {
  try {
    tasks = await todoAPI.getAllTasks();
    renderTasks(tasks, todoList);
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
}

//have to remove
export const loadTasksSearch = async (searchTerm = "", searchCategory = "") => {
  try {
    const fetchedTasks = await todoAPI.getAllTasks(searchTerm, searchCategory);
    tasks.push(...fetchedTasks.data);
    renderTasks(tasks, todoList);
  } catch (error) {
    todoList.innerHTML = '<div class="alert alert-danger text-center" role="alert">Failed to load tasks.</div>';
  }
};

async function updateTask(taskId, updates) {
  try {
    // const updatedTask = 
    // const taskIndex = tasks.findIndex((task) => task._id === taskId);
    // if (taskIndex !== -1) {
    //   tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    //   renderTasks(tasks, todoList);
    // }
    await todoAPI.updateTask(taskId, updates);
    renderTodos();

  } catch (error) {
    alert("Failed to update task. Please try again.");
    await loadTasksSearch();
  }
}


initializeEventHandlers(tasks, todoList, loadTasks, loadTasksSearch, updateTask);

// loadTasksSearch();  