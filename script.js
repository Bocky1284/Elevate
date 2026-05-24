let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let xp = Number(localStorage.getItem("xp")) || 0;

let streak = Number(localStorage.getItem("streak")) || 0;

const quotes = [

  "Small progress is still progress.",
  "Discipline beats motivation.",
  "One task at a time.",
  "Your future self will thank you.",
  "Done is better than perfect."

];

document.getElementById("quote").textContent =
  quotes[Math.floor(Math.random() * quotes.length)];

function saveData() {

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("xp", xp);
  localStorage.setItem("streak", streak);

}

function getLevel() {
  return Math.floor(xp / 100) + 1;
}

function updateProgressBar() {

  const currentXP = xp % 100;

  document.getElementById("progressBar").style.width =
    currentXP + "%";

}

function renderTasks() {

  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task}</span>

      <button class="complete-btn"
        onclick="completeTask(${index}, this)">
        Complete
      </button>
    `;

    taskList.appendChild(li);

  });

  document.getElementById("xp").textContent = xp;

  document.getElementById("level").textContent = getLevel();

  document.getElementById("streak").textContent = streak;

  updateProgressBar();

}

function addTask() {

  const input = document.getElementById("taskInput");

  const task = input.value.trim();

  if (!task) return;

  tasks.push(task);

  input.value = "";

  saveData();

  renderTasks();

}

function completeTask(index, button) {

  const li = button.parentElement;

  li.classList.add("completed");

  setTimeout(() => {

    tasks.splice(index, 1);

    xp += 10;

    streak += 1;

    saveData();

    renderTasks();

  }, 250);

}

renderTasks();

if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("service-worker.js");

}
