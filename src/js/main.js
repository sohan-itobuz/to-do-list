// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';

// Wrap all the code in a listener to ensure the HTML is loaded first
document.addEventListener('DOMContentLoaded', () => {

  // Global variables to store tasks and the list element
  const todoList = document.getElementById("todo-list");
  let tasks = [];

  // Helper function to create the list item HTML from a task object
  function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.dataset.id = task.id; // Add data-id to the list item itself
    
    if (task.completed) {
      li.classList.add('task-completed');
    }

    let priorityClass = '';
    switch (task.priority) {
      case 3: priorityClass = 'badge text-bg-danger'; break; // High
      case 2: priorityClass = 'badge text-bg-warning'; break; // Medium
      case 1: priorityClass = 'badge text-bg-success'; break; // Low
    }

    li.innerHTML = `
      <input type="checkbox" class="form-check-input done-toggle me-2" ${task.completed ? 'checked' : ''}>
      <span class="task-text flex-grow-1">${task.text}</span>
      <span class="${priorityClass}">${task.priority === 3 ? 'High' : (task.priority === 2 ? 'Medium' : 'Low')}</span>
      <input type="text" class="form-control edit-input" style="display: none;" value="${task.text}">
      <div class="btn-group gap-2 ms-2">
        <button class="btn btn-primary btn-sm edit-btn rounded-1" data-id="${task.id}">&#9998;</button>
        <button class="btn btn-danger btn-sm delete-btn rounded-1" data-id="${task.id}">&#x2715;</button>
      </div>
    `;
    return li;
  }

  // Function to sort tasks and render the list
  function sortAndRenderTasks() {
    tasks.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      if (!a.completed && !b.completed) {
        return b.priority - a.priority;
      }
      return 0;
    });

    todoList.innerHTML = '';
    tasks.forEach(task => {
      todoList.appendChild(createTaskElement(task));
    });

    saveTasks();
  }

  // Function to save tasks to local storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      tasks.forEach(task => {
        if (!task.id) {
          // If old task has no ID, assign a new string ID
          task.id = Date.now().toString() + Math.random().toString().substring(2, 6);
        }
      });
      sortAndRenderTasks();
    }
  }

  // --- Event Listeners ---

  // Event listener for form submission
  document.getElementById("todo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const taskInput = document.getElementById("todo-input");
    const priorityInput = document.getElementById("priority-input");
    const taskText = taskInput.value.trim();
    const taskPriority = parseInt(priorityInput.value);

    if (taskText !== "") {
      const newTask = {
        // Generate a unique string ID
        id: Date.now().toString() + Math.random().toString().substring(2, 6),
        text: taskText,
        completed: false,
        priority: taskPriority
      };
      tasks.push(newTask);
      sortAndRenderTasks();
      taskInput.value = "";
    }
  });

  // Event listeners for list item actions (delete, edit)
  todoList.addEventListener("click", function (event) {
    const target = event.target;
    const li = target.closest('li');
    
    if (target.classList.contains("delete-btn")) {
      const taskId = li.dataset.id;
      const taskText = li.querySelector('.task-text').textContent;

      // Set the task text in the modal
      document.getElementById('taskToDeleteText').textContent = taskText;

      // Set the ID on the confirm button for later use
      document.getElementById('confirmDeleteBtn').dataset.id = taskId;

      // Show the modal
      const deleteConfirmationModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
      deleteConfirmationModal.show();
    }

    if (target.classList.contains("edit-btn")) {
      const taskId = li.dataset.id; // Get ID as a string
      const taskTextSpan = li.querySelector(".task-text");
      const editInput = li.querySelector(".edit-input");

      if (taskTextSpan.style.display !== "none") {
        taskTextSpan.style.display = "none";
        editInput.style.display = "block";
        editInput.focus();
        target.innerHTML = "&#10004;";
      } else {
        const updatedText = editInput.value;
        const taskToEdit = tasks.find(task => task.id === taskId);
        if (taskToEdit) {
          taskToEdit.text = updatedText;
        }
        sortAndRenderTasks();
        target.innerHTML = "&#9998;";
      }
    }
  });

  // Event listener for task completion toggle
  todoList.addEventListener("change", function (event) {
    if (event.target.classList.contains("done-toggle")) {
      const li = event.target.closest('li');
      const taskId = li.dataset.id; // Get ID as a string
      const taskToToggle = tasks.find(task => task.id === taskId); 
      if (taskToToggle) {
        taskToToggle.completed = event.target.checked;
        sortAndRenderTasks();
      }
    }
  });

  // Event listener for the "Clear All" button
  document.getElementById("clear-all-btn").addEventListener("click", function() {
      const deleteAllConfirmationModal = new bootstrap.Modal(document.getElementById('deleteAllConfirmationModal'));
      deleteAllConfirmationModal.show();
  });

  document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    const taskId = this.dataset.id;
    tasks = tasks.filter(task => task.id !== taskId);
    sortAndRenderTasks();

    const deleteConfirmationModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
    if (deleteConfirmationModal) {
      deleteConfirmationModal.hide();
    }
  });
  document.getElementById('confirmDeleteAllBtn').addEventListener('click', function() {
    tasks = []; 
    sortAndRenderTasks();

    const deleteAllConfirmationModal = bootstrap.Modal.getInstance(document.getElementById('deleteAllConfirmationModal'));
    if (deleteAllConfirmationModal) {
      deleteAllConfirmationModal.hide();
    }
});

  // Initial call to load tasks
  loadTasks();
});