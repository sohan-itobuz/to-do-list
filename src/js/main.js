// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";

const API_BASE_URL = "http://localhost:3001/api";

const todoList = document.getElementById("todo-list");
let tasks = [];

const todoAPI = {


  async getAllTasks(searchTerm = "", searchCategory = "") {
    try {
      let url = `${API_BASE_URL}/todos`;
      const queryParams = [];

      if (searchTerm.trim() && searchCategory) {
        queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
        queryParams.push(`category=${encodeURIComponent(searchCategory)}`);
      }

      if (queryParams.length) {
        url += `?${queryParams.join("&")}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },


  async createTask(task) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      loadTasks();

      if (!response.ok) throw new Error("Failed to create task");
      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },


  async updateTask(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      loadTasks();
      if (!response.ok) throw new Error("Failed to update task");
      return await response.json();
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },


  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      if (response.status === 204) {
        return;
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },


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


function createTagsHtml(tags) {
  if (!tags || !Array.isArray(tags) || !tags.length) return '';
  const badges = tags
    .filter(tag => tag.trim())
    .map(tag => `<span class="badge fw-light rounded-pill tags-bg me-1">${tag.trim().toLowerCase()}</span>`)
    .join('');
  return `<div class="d-flex flex-wrap mb-1">${badges}</div>`;
};

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-md-flex  justify-content-between flex-column border border-danger";
  li.dataset.id = task._id; //_id

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

  // _id
  li.innerHTML = `
      
      <div class="d-flex align-items-center justify-content-center justify-content-md-between ">
        <div class"d-flex">
        <input type="checkbox" class="form-check-input done-toggle me-2" ${task.completed ? "checked" : ""
    }>
        <span class="task-text flex-grow-1">${task.text}</span>
        <input type="text" class="form-control edit-input" style="display: none;" value="${task.text
    }">
        <span class="${priorityClass} ">${task.priority === 3 ? "High" : task.priority === 2 ? "Medium" : "Low"
    }</span>
        </div> 
        <div class="btn-group gap-2 ms-2"> 
          <button class="btn  btn-sm edit-btn rounded-1" data-id="${task._id
    }"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" style="pointer-events: none;">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg></button>
          <button class="btn  btn-sm delete-btn rounded-1" data-id="${task._id
    }"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" style="pointer-events: none;">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg></button>
        </div>
      </div>
      ${createTagsHtml(task.tags)}
    `;
  return li;
}

// function sortAndRenderTasks() {
//   // const sortedTasks = [...tasks].sort((a, b) => {
//   //   if (a.completed && !b.completed) return 1;
//   //   if (!a.completed && b.completed) return -1;
//   //   if (!a.completed && !b.completed) {
//   //     return b.priority - a.priority;
//   //   }
//   //   return 0;
//   // });

//   todoList.innerHTML = "";

//   if (!tasks.length) {
//     const emptyMessage = document.createElement("li");
//     emptyMessage.className =
//       "list-group-item text-center p-3 text-muted border-0 bg-transparent";
//     emptyMessage.textContent = "No tasks found. Start adding or searching!";
//     todoList.appendChild(emptyMessage);
//   }

//   sortedTasks.forEach((task) => {
//     if (!task.tags) {
//       task.tags = [];
//     }
//     todoList.appendChild(createTaskElement(task));
//   });
// }

const sortAndRenderTasksSearch = () => {
  // tasks.sort((a, b) => {
  //   if (a.completed !== b.completed) {
  //     return a.completed ? 1 : -1;
  //   }
  //   return b.priority - a.priority;
  // });
  todoList.innerHTML = "";
  if (!tasks.length) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className =
      "list-group-item text-center p-3 text-muted border-0 bg-transparent";
    emptyMessage.textContent = "No tasks found. Start adding or searching!";
    todoList.appendChild(emptyMessage);
  } else {
    tasks.forEach((task) => {
      todoList.appendChild(createTaskElement(task));
    });
  }
};

async function loadTasks() {
  try {
    tasks = await todoAPI.getAllTasks();
    sortAndRenderTasksSearch();
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
}

const loadTasksSearch = async (searchTerm = "", searchCategory = "") => {
  try {
    const fetchedTasks = await todoAPI.getAllTasks(
      searchTerm,
      searchCategory
    );
    tasks = fetchedTasks;
    sortAndRenderTasksSearch();
  } catch (error) {
    todoList.innerHTML = '<div class="alert alert-danger text-center" role="alert">Failed to load tasks. Please check the server connection.</div>';
  }
};

// Event Listeners 

const searchForm = document.getElementById("search-form");
if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = document.getElementById("search-term").value.trim();
    const searchCategory = document.getElementById("search-category").value;

    loadTasksSearch(searchTerm, searchCategory);
  });
}

const searchTermInput = document.getElementById("search-term");
if (searchTermInput) {
  searchTermInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.trim();

    if (!searchTerm) {
      loadTasksSearch("", "");
    }
  });
}


document.getElementById("all-btn").addEventListener("click", function (e) {
  e.preventDefault();
  loadTasksSearch("", "");
  // document.getElementById("search-term").value = "";
  // document.getElementById("search-category").value = "";
});
document.getElementById("high-btn").addEventListener("click", function (e) {
  e.preventDefault();
  loadTasksSearch("3", "priority");
  // document.getElementById("search-term").value = "";
  // document.getElementById("search-category").value = "";
});
document.getElementById("mid-btn").addEventListener("click", function (e) {
  e.preventDefault();
  loadTasksSearch("2", "priority");
  // document.getElementById("search-term").value = "";
  // document.getElementById("search-category").value = "";
});
document.getElementById("low-btn").addEventListener("click", function (e) {
  e.preventDefault();
  loadTasksSearch("1", "priority");
  // document.getElementById("search-term").value = "";
  // document.getElementById("search-category").value = "";
});
document.getElementById("completed-btn").addEventListener("click", function (e) {
  e.preventDefault();
  loadTasksSearch("true", "completed");
  // document.getElementById("search-term").value = "";
  // document.getElementById("search-category").value = "";
});

document
  .getElementById("todo-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const taskInput = document.getElementById("todo-input");
    const priorityInput = document.getElementById("priority-input");
    const taskText = taskInput.value.trim();
    const taskPriority = parseInt(priorityInput.value);
    const tagsInput = document.getElementById("tags-input");
    const rawTags = tagsInput ? tagsInput.value.trim() : "";

    if (taskText) {
      try {
        const tagsArray = rawTags.split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);

        const newTask = await todoAPI.createTask({
          text: taskText,
          priority: taskPriority,
          tags: tagsArray,
        });

        tasks.push(newTask);
        sortAndRenderTasksSearch(); //updated
        taskInput.value = "";
        if (tagsInput) tagsInput.value = "";
      } catch (error) {
        alert("Failed to create task. Please try again.");
      }
    }
  });


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

todoList.addEventListener("change", async function (event) {
  if (event.target.classList.contains("done-toggle")) {
    const li = event.target.closest("li");
    const taskId = li.dataset.id;
    const completed = event.target.checked;

    await updateTask(taskId, { completed });
  }
});

async function updateTask(taskId, updates) {
  try {
    const updatedTask = await todoAPI.updateTask(taskId, updates);
    const taskIndex = tasks.findIndex((task) => task._id === taskId); //_id
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
      sortAndRenderTasksSearch();
    }
  } catch (error) {
    alert("Failed to update task. Please try again.");
    await loadTasksSearch();
  }
}


document
  .getElementById("clear-all-btn")
  .addEventListener("click", function () {
    const deleteAllConfirmationModal = new bootstrap.Modal(
      document.getElementById("deleteAllConfirmationModal")
    );
    deleteAllConfirmationModal.show();
  });


document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", async function () {
    const taskId = this.dataset.id;
    try {
      await todoAPI.deleteTask(taskId);
      tasks = tasks.filter((task) => task.id !== taskId);
      sortAndRenderTasksSearch(); //updated
      loadTasks(); //to refresh the list after deletion

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


document
  .getElementById("confirmDeleteAllBtn")
  .addEventListener("click", async function () {
    try {
      await todoAPI.deleteAllTasks();
      tasks = [];
      sortAndRenderTasksSearch(); //updated

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


loadTasksSearch();