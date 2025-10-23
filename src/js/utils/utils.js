import { showToast } from "./showToast.js";


export function createTagsHtml(tags) {
  if (!tags || !Array.isArray(tags) || !tags.length) return '';
  const badges = tags
    .filter(tag => tag.trim())
    .map(tag => `<span class="badge fw-light rounded-pill tags-bg me-1">${tag.trim().toLowerCase()}</span>`)
    .join('');
  return `<div class="d-flex flex-wrap mb-1">${badges}</div>`;
}

export function OTPInput(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keydown', function (event) {
      if (event.key === "Backspace") {
        inputs[i].value = ''; if (i !== 0) inputs[i - 1].focus();
      } else {
        if (i === inputs.length - 1 && inputs[i].value !== '') {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1)
            inputs[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 64 && event.keyCode < 91) {
          inputs[i].value = String.fromCharCode(event.keyCode);
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        }
      }
    });
  }
}

export async function updateTask(taskId, updates) {
  try {
    await todoAPI.updateTask(taskId, updates);
    renderTodos();

  } catch (error) {
    showToast("Failed to update task. Please try again.", "error");
    renderTodos();
  }
}

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


export function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "list-group-item d-md-flex justify-content-between flex-column border border-danger";
  li.dataset.id = task._id;

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
    <div class="d-flex align-items-center justify-content-center justify-content-md-between">
      <div class="d-flex">
        <input type="checkbox" class="form-check-input done-toggle me-2" ${task.completed ? "checked" : ""}>
        <span class="task-text flex-grow-1">${task.title}</span>
        <input type="text" class="form-control edit-input" style="display: none;" value="${task.title}">
        </div> 
        <span class="${priorityClass}">${task.priority === 3 ? "High" : task.priority === 2 ? "Medium" : "Low"}</span>
      <div class="btn-group gap-2 ms-2"> 
        <button class="btn btn-sm edit-btn rounded-1" data-id="${task._id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" style="pointer-events: none;">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
        </button>
        <button class="btn btn-sm delete-btn rounded-1" data-id="${task._id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" style="pointer-events: none;">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </button>
      </div>
    </div>
    ${createTagsHtml(task.tags)}
  `;
  return li;
}