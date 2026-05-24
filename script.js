let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = Number(localStorage.getItem("xp")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("xp", xp);
  localStorage.setItem("streak", streak);
}

function renderTasks() {

  document.getElementById("taskList").innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    li.innerHTML = `
      ${task}
      <button class="complete-btn" onclick="completeTask(${index})">
        Complete
      </button>
    `;

    document.getElementById("taskList").appendChild(li);

  });

  document.getElementById("xp").textContent = xp;
  document.getElementById("streak").textContent = streak;

}

function addTask() {

  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push(input.value);

  input.value = "";

  saveData();
  renderTasks();

}

function completeTask(index) {

  tasks.splice(index, 1);

  xp += 10;
  streak += 1;

  saveData();
  renderTasks();

}

renderTasks();
