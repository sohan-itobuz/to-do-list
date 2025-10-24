import * as bootstrap from "bootstrap";
import { renderTodos } from '../utils/utils.js';
import { updateTask } from '../utils/utils.js';
import TodoApi from '../api/TodoApi.js';

const todoAPI = new TodoApi();

export default class EventHandlers {
  static searchFormHandle(e) {
    e.preventDefault();
    const searchTerm = document.getElementById("search-term").value.trim();
    const searchCategory = document.getElementById("search-category").value;
    renderTodos(searchTerm, searchCategory);
  };

  static searchInputHandle(e) {
    const searchTerm = e.target.value.trim();
    if (!searchTerm) {
      renderTodos("", "");
    }
  };

  static handleAllBtn(e) {
    e.preventDefault();
    renderTodos("", "");
  }

  static handleHighBtn(e) {
    e.preventDefault();
    renderTodos("3", "priority");
  }

  static handleMidBtn(e) {
    e.preventDefault();
    renderTodos("2", "priority");
  }

  static handleLowBtn(e) {
    e.preventDefault();
    renderTodos("1", "priority");
  }

  static handleCompleteBtn(e) {
    e.preventDefault();
    renderTodos("true", "completed");
  }

  static async handleCreateTodo(event) {
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

        renderTodos();
        taskInput.value = "";
        if (tagsInput) tagsInput.value = "";
      }
    } catch (error) {
      alert("Failed to create task. Please try again.");
      console.log(error);
    }
  }


  static async handleDelBtn() {
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
  }

  static async handleDelAllBtn() {
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
  }

  static handleDelAllModal() {
    const deleteAllConfirmationModal = new bootstrap.Modal(
      document.getElementById("deleteAllConfirmationModal")
    );
    deleteAllConfirmationModal.show();
  }

  static async handleChecked(event) {
    if (event.target.classList.contains("done-toggle")) {
      const li = event.target.closest("li");
      const taskId = li.dataset.id;
      const completed = event.target.checked;
      updateTask(taskId, { completed });
    }
  }

}
