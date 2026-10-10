
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const count = document.querySelector("#task-count");
const remainingCount = document.querySelector("#remaining-count");
const clearAllButton = document.querySelector("#clear-all");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let currentFilter = "all";

// Render tasks based on the selected filter
function renderTasks() {
  list.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") {
      return !task.completed;
    }

    if (currentFilter === "completed") {
      return task.completed;
    }

    return true;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderTasks();
    });

    li.append(checkbox, span, deleteButton);
    list.append(li);
  });

  // Total task count
  count.textContent = `Tasks: ${tasks.length}`;

  // Remaining task count
  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  remainingCount.textContent = `Remaining: ${remainingTasks}`;
}

// Add a new task
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  tasks.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });

  input.value = "";
  renderTasks();
});

// Clear all tasks
clearAllButton.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

// Filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    // Remove active class from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to the selected button
    button.classList.add("active");

    renderTasks();
  });
});

// Set All filter as active by default
const allButton = document.querySelector(
  '.filter-btn[data-filter="all"]'
);

if (allButton) {
  allButton.classList.add("active");
}

// Initial render
renderTasks();
