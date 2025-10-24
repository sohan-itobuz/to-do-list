// Import our custom CSS
// import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { renderTodos } from '../utils/utils.js';
import { updateTask } from '../utils/utils.js';
import { todoMain } from "../dom/domHandler.js";
import TodoApi from '../api/TodoApi.js';
const todoAPI = new TodoApi();

import EventHandlers from "./EventHandlers.js";

export function initializeEventHandlers(todoList) {

  // Search form
  if (todoMain.searchForm) {
    todoMain.searchForm.addEventListener("submit", EventHandlers.searchFormHandle);
  }

  // Search term input
  if (todoMain.searchTermInput) {
    todoMain.searchTermInput.addEventListener("input", EventHandlers.searchInputHandle);
  }

  // Filter buttons
  if (todoMain.allBtn) {
    todoMain.allBtn.addEventListener("click", EventHandlers.handleAllBtn);
  }

  if (todoMain.highBtn) {
    todoMain.highBtn.addEventListener("click", EventHandlers.handleHighBtn);
  }

  if (todoMain.midBtn) {
    todoMain.midBtn.addEventListener("click", EventHandlers.handleMidBtn);
  }

  if (todoMain.lowBtn) {
    todoMain.lowBtn.addEventListener("click", EventHandlers.handleLowBtn);
  }

  if (todoMain.completeBtn) {
    todoMain.completeBtn.addEventListener("click", EventHandlers.handleCompleteBtn);
  }

  // create task event 
  if (todoMain.todoForm) {
    todoMain.todoForm.addEventListener("submit", EventHandlers.handleCreateTodo);
  }

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
          updateTask(taskId, { title: updatedText });
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




  if (todoList) {
    todoList.addEventListener("change", EventHandlers.handleChecked);

  }



  if (todoMain.delAllModal) {
    todoMain.delAllModal.addEventListener("click", EventHandlers.handleDelAllModal);
  }


  // Delete confirmation
  if (todoMain.delBtn) {
    todoMain.delBtn.addEventListener("click", EventHandlers.handleDelBtn);
  }

  // Delete all confirmation
  if (todoMain.delAllBtn) {
    todoMain.delAllBtn.addEventListener("click", EventHandlers.handleDelAllBtn);
  }

}