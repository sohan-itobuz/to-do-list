// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";

// API base URL
const API_BASE_URL = "http://localhost:3001/api";

// Wrap all the code in a listener to ensure the HTML is loaded first
document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo-list");
  let tasks = [];

  // API functions
  const todoAPI = {
    // Get all tasks
    async getAllTasks() {
      try {
        const response = await fetch(`${API_BASE_URL}/todos`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        return await response.json();
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
      }
    },

    // Create new task
    async createTask(task) {
      try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Failed to create task");
        return await response.json();
      } catch (error) {
        console.error("Error creating task:", error);
        throw error;
      }
    },

    // Update task
    async updateTask(id, updates) {
      try {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error("Failed to update task");
        return await response.json();
      } catch (error) {
        console.error("Error updating task:", error);
        throw error;
      }
    },

    // Delete task
    async deleteTask(id) {
      try {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete task");
        return await response.json();
      } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
      }
    },

    // Delete all tasks
    async deleteAllTasks() {
      try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete all tasks");
        return await response.json();
      } catch (error) {
        console.error("Error deleting all tasks:", error);
        throw error;
      }
    },
  };

  // Helper function to create the list item HTML from a task object
  function createTaskElement(task) {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("task-completed");
    }

    let priorityClass = "";
    switch (task.priority) {
      case 3:
        priorityClass = "badge text-bg-danger";
        break;
      case 2:
        priorityClass = "badge text-bg-warning";
        break;
      case 1:
        priorityClass = "badge text-bg-success";
        break;
    }

    li.innerHTML = `
      <input type="checkbox" class="form-check-input done-toggle me-2" ${
        task.completed ? "checked" : ""
      }>
      <span class="task-text flex-grow-1">${task.text}</span>
      <input type="text" class="form-control edit-input" style="display: none;" value="${
        task.text
      }">
      <span class="${priorityClass}">${
      task.priority === 3 ? "High" : task.priority === 2 ? "Medium" : "Low"
    }</span>
      <div class="btn-group gap-2 ms-2">
        <button class="btn btn-primary btn-sm edit-btn rounded-1" data-id="${
          task.id
        }">✏️</button>
        <button class="btn btn-danger btn-sm delete-btn rounded-1" data-id="${
          task.id
        }">❌</button>
      </div>
    `;
    return li;
  }

  // Function to sort tasks and render the list
  function sortAndRenderTasks() {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      if (!a.completed && !b.completed) {
        return b.priority - a.priority;
      }
      return 0;
    });

    todoList.innerHTML = "";
    sortedTasks.forEach((task) => {
      todoList.appendChild(createTaskElement(task));
    });
  }

  // Function to load tasks from backend
  async function loadTasks() {
    try {
      tasks = await todoAPI.getAllTasks();
      sortAndRenderTasks();
    } catch (error) {
      alert("Failed to load tasks. Make sure the backend server is running.");
    }
  }

  // --- Event Listeners ---

  // Event listener for form submission
  document
    .getElementById("todo-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const taskInput = document.getElementById("todo-input");
      const priorityInput = document.getElementById("priority-input");
      const taskText = taskInput.value.trim();
      const taskPriority = parseInt(priorityInput.value);

      if (taskText !== "") {
        try {
          const newTask = await todoAPI.createTask({
            text: taskText,
            priority: taskPriority,
          });

          tasks.push(newTask);
          sortAndRenderTasks();
          taskInput.value = "";
        } catch (error) {
          alert("Failed to create task. Please try again.");
        }
      }
    });

  // Event listeners for list item actions (delete, edit)
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
        // Start editing
        taskTextSpan.style.display = "none";
        editInput.style.display = "block";
        editInput.focus();
        target.textContent = "✅";
      } else {
        // Save editing
        const updatedText = editInput.value.trim();
        if (updatedText) {
          updateTask(taskId, { text: updatedText });
        }
        target.textContent = "✏️";
      }
    }
  });

  // Event listener for task completion toggle
  todoList.addEventListener("change", async function (event) {
    if (event.target.classList.contains("done-toggle")) {
      const li = event.target.closest("li");
      const taskId = li.dataset.id;
      const completed = event.target.checked;

      await updateTask(taskId, { completed });
    }
  });

  // Helper function to update task
  async function updateTask(taskId, updates) {
    try {
      const updatedTask = await todoAPI.updateTask(taskId, updates);
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        sortAndRenderTasks();
      }
    } catch (error) {
      alert("Failed to update task. Please try again.");
      // Reload tasks to sync with server
      await loadTasks();
    }
  }

  // Event listener for the "Clear All" button
  document
    .getElementById("clear-all-btn")
    .addEventListener("click", function () {
      const deleteAllConfirmationModal = new bootstrap.Modal(
        document.getElementById("deleteAllConfirmationModal")
      );
      deleteAllConfirmationModal.show();
    });

  // Confirm delete single task
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", async function () {
      const taskId = this.dataset.id;
      try {
        await todoAPI.deleteTask(taskId);
        tasks = tasks.filter((task) => task.id !== taskId);
        sortAndRenderTasks();

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

  // Confirm delete all tasks
  document
    .getElementById("confirmDeleteAllBtn")
    .addEventListener("click", async function () {
      try {
        await todoAPI.deleteAllTasks();
        tasks = [];
        sortAndRenderTasks();

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

  // Initial call to load tasks
  loadTasks();
});
