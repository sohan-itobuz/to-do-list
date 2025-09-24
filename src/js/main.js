// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';
loadTasks();

function addTask(task) {
  const todoList = document.getElementById("todo-list");
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
        <span class="task-text">${task}</span>
        <input type="text" class="form-control edit-input" style="display: none;" value="${task}">
        <div class="btn-group gap-2">
          <button class="btn btn-primary btn-sm edit-btn rounded-1" >&#9998;</button>
          <button class="btn btn-danger btn-sm delete-btn rounded-1">&#x2715;</button>
        </div>
      `;
  todoList.appendChild(li);
  saveTasks();
}

document.getElementById

// Event listener for form submission
document.getElementById("todo-form").addEventListener("submit",
  function (event) {
    event.preventDefault();
    const taskInput = document.getElementById("todo-input");
    const task = taskInput.value.trim();
    if (task !== "") {
      addTask(task);
      saveTasks();
      taskInput.value = "";
    }
  });

// Event listener for delete button click
document.getElementById("todo-list").addEventListener("click",
  function (event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.parentElement.parentElement.remove();
      saveTasks();
    }
  });

// Event listener for edit button click
document.getElementById("todo-list").addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    const taskText = event.target.parentElement
      .parentElement.querySelector(".task-text");
    const editInput = event.target.parentElement
      .parentElement.querySelector(".edit-input");
    if (taskText.style.display !== "none") {
      taskText.style.display = "none";
      editInput.style.display = "block";
      editInput.focus();
      event.target.innerHTML = "&#10004;";
    } else {
      taskText.textContent = editInput.value;
      taskText.style.display = "inline";
      editInput.style.display = "none";
      event.target.innerHTML = "&#9998;";
      saveTasks();
    }
  }
});
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const taskText = li.querySelector('span').textContent;
    const isCompleted = li.classList.contains('text-decoration-line-through');
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
      addTask(task.text);
      // Apply the strike-through if the task was completed
      if (task.completed) {
        const lastChild = taskList.lastChild;
        lastChild.classList.add('text-decoration-line-through');
      }
    });
  }
}