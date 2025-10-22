import TodoApi from './TodoApi.js';
// Import our custom CSS
// import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { renderTodos } from "./main.js";
//import { renderTasks } from './dom.js';

const todoAPI = new TodoApi();

export function initializeEventHandlers(tasks, todoList, loadTasks, loadTasksSearch, updateTask) {

  // Search form
  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const searchTerm = document.getElementById("search-term").value.trim();
      const searchCategory = document.getElementById("search-category").value;
      renderTodos(searchTerm, searchCategory);
    });
  }

  // Search term input
  const searchTermInput = document.getElementById("search-term");
  if (searchTermInput) {
    searchTermInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.trim();
      if (!searchTerm) {
        renderTodos("", "");
      }
    });
  }

  // Filter buttons
  document.getElementById("all-btn").addEventListener("click", function (e) {
    e.preventDefault();
    renderTodos("", "");
  });

  document.getElementById("high-btn").addEventListener("click", function (e) {
    e.preventDefault();
    renderTodos("3", "priority");
  });

  document.getElementById("mid-btn").addEventListener("click", function (e) {
    e.preventDefault();
    renderTodos("2", "priority");
  });

  document.getElementById("low-btn").addEventListener("click", function (e) {
    e.preventDefault();
    renderTodos("1", "priority");
  });

  document.getElementById("completed-btn").addEventListener("click", function (e) {
    e.preventDefault();
    renderTodos("true", "completed");
  });

  // create task event 
  document.getElementById("todo-form").addEventListener("submit", async function (event) {
    try {
      event.preventDefault();
      const taskInput = document.getElementById("todo-input");
      const priorityInput = document.getElementById("priority-input");
      const taskText = taskInput.value.trim();
      const taskPriority = parseInt(priorityInput.value);
      const tagsInput = document.getElementById("tags-input");
      const rawTags = tagsInput ? tagsInput.value : "";
      if (taskText) {
        const tagsArray = rawTags.split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);

        await todoAPI.createTask({
          taskText,
          taskPriority,
          tagsArray,
        });
        // console.log(newTask);

        // tasks.push(newTask);
        // renderTasks(tasks, todoList);
        renderTodos();
        taskInput.value = "";
        if (tagsInput) tagsInput.value = "";
      }
    } catch (error) {
      alert("Failed to create task. Please try again.");
      console.log(error);
    }
  });

  // Task list events
  todoList.addEventListener("click", function (event) {
    const target = event.target;
    const li = target.closest("li");

    if (target.classList.contains("delete-btn")) {
      const taskId = li.dataset.id;
      const taskText = li.querySelector(".task-text").textContent;

      document.getElementById("taskToDeleteText").textContent = taskText;
      document.getElementById("confirmDeleteBtn").dataset.id = taskId;

      const deleteConfirmationModal = new bootstrap.Modal(
        document.getElementById("deleteConfirmationModal")
      );
      deleteConfirmationModal.show();
    }

    if (target.classList.contains("edit-btn")) {
      const taskId = li.dataset.id;
      const taskTextSpan = li.querySelector(".task-text");
      const editInput = li.querySelector(".edit-input");

      if (taskTextSpan.style.display !== "none") {
        taskTextSpan.style.display = "none";
        editInput.style.display = "block";
        editInput.focus();
        target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16" style="pointer-events: none;"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.243 8.381a.733.733 0 0 1 1.066-.01L7.293 10.98l5.17-5.17z"/></svg>`;
      } else {
        const updatedText = editInput.value.trim();
        if (updatedText) {
          updateTask(taskId, { text: updatedText });
        }
        taskTextSpan.style.display = "block";
        editInput.style.display = "none";
        target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" style="pointer-events: none;">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>`;
      }
    }
  });

  // Task completion toggle
  todoList.addEventListener("change", async function (event) {
    if (event.target.classList.contains("done-toggle")) {
      const li = event.target.closest("li");
      const taskId = li.dataset.id;
      const completed = event.target.checked;
      await updateTask(taskId, { completed });
    }
  });

  // Clear all button
  document.getElementById("clear-all-btn").addEventListener("click", function () {
    const deleteAllConfirmationModal = new bootstrap.Modal(
      document.getElementById("deleteAllConfirmationModal")
    );
    deleteAllConfirmationModal.show();
  });

  // Delete confirmation
  document.getElementById("confirmDeleteBtn").addEventListener("click", async function () {
    const taskId = this.dataset.id;
    try {
      await todoAPI.deleteTask(taskId);
      renderTodos();

      const deleteConfirmationModal = bootstrap.Modal.getInstance(
        document.getElementById("deleteConfirmationModal")
      );
      if (deleteConfirmationModal) {
        deleteConfirmationModal.hide();
      }
    } catch (error) {
      alert("Failed to delete task. Please try again.");
    }
  });

  // Delete all confirmation
  document.getElementById("confirmDeleteAllBtn").addEventListener("click", async function () {
    try {
      await todoAPI.deleteAllTasks();
      renderTodos();

      const deleteAllConfirmationModal = bootstrap.Modal.getInstance(
        document.getElementById("deleteAllConfirmationModal")
      );
      if (deleteAllConfirmationModal) {
        deleteAllConfirmationModal.hide();
      }
    } catch (error) {
      alert("Failed to delete all tasks. Please try again.");
    }
  });

}