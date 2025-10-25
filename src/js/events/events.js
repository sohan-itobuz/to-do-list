import { todoMain } from "../dom/domHandler.js";

import EventHandlers from "./EventHandlers.js";

export function initializeEventHandlers(todoList) {
  // Search form
  if (todoMain.searchForm) {
    todoMain.searchForm.addEventListener(
      "submit",
      EventHandlers.searchFormHandle
    );
  }

  // Search term input
  if (todoMain.searchTerm) {
    todoMain.searchTerm.addEventListener(
      "input",
      EventHandlers.searchInputHandle
    );
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
    todoMain.completeBtn.addEventListener(
      "click",
      EventHandlers.handleCompleteBtn
    );
  }

  // create task event
  if (todoMain.todoForm) {
    todoMain.todoForm.addEventListener(
      "submit",
      EventHandlers.handleCreateTodo
    );
  }

  // Task list events
  todoList.addEventListener("click", EventHandlers.handleDelEdtBtn);

  if (todoList) {
    todoList.addEventListener("change", EventHandlers.handleChecked);
  }

  if (todoMain.delAllModal) {
    todoMain.delAllModal.addEventListener(
      "click",
      EventHandlers.handleDelAllModal
    );
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
