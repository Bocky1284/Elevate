let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = +localStorage.getItem("xp") || 0;
let streak = +localStorage.getItem("streak") || 0;
let maxStreak = +localStorage.getItem("maxStreak") || 0;
let totalCompleted = +localStorage.getItem("totalCompleted") || 0;

let rewards = [
  { name: "Dark Theme Glow", cost: 50, unlocked:false },
  { name: "Focus Mode Music", cost: 120, unlocked:false },
  { name: "Golden UI", cost: 250, unlocked:false }
];

let trendingGoals = [
  "Drink water 💧",
  "Study 25 mins 📚",
  "Clean your room 🧹",
  "Workout 💪",
  "No phone 1 hour 📵"
];

function save(){
localStorage.setItem("tasks", JSON.stringify(tasks));
localStorage.setItem("xp", xp);
localStorage.setItem("streak", streak);
localStorage.setItem("maxStreak", maxStreak);
localStorage.setItem("totalCompleted", totalCompleted);
}

function level(){
return Math.floor(xp/100)+1;
}

function render(){

document.getElementById("level").innerText = level();

let fill = (xp % 100);
document.getElementById("xpFill").style.width = fill + "%";

let list = document.getElementById("taskList");
list.innerHTML = "";

tasks.forEach((t,i)=>{
let div = document.createElement("div");
div.className="task";
div.innerHTML = `
<span>${t}</span>
<button onclick="done(${i})">✔</button>
`;
list.appendChild(div);
});

document.getElementById("trending").innerHTML =
trendingGoals.map(t=>`<div class="card">${t}</div>`).join("");

document.getElementById("rewards").innerHTML =
rewards.map((r,i)=>`
<div class="card">
${r.name} - ${r.cost} XP
<button onclick="buy(${i})">Buy</button>
</div>
`).join("");

document.getElementById("maxStreak").innerText = maxStreak;
document.getElementById("totalCompleted").innerText = totalCompleted;

save();
}

function addTask(){
let v = document.getElementById("taskInput").value;
if(!v) return;
tasks.push(v);
document.getElementById("taskInput").value="";
render();
}

function done(i){
tasks.splice(i,1);
xp += 10;
streak++;
totalCompleted++;

if(streak > maxStreak) maxStreak = streak;

render();
}

function buy(i){
if(xp >= rewards[i].cost && !rewards[i].unlocked){
xp -= rewards[i].cost;
rewards[i].unlocked = true;
alert("Unlocked: " + rewards[i].name);
render();
}
}

function showTab(id){
document.querySelectorAll(".tab").forEach(t=>t.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

function resetAll(){
if(confirm("Reset EVERYTHING?")){
localStorage.clear();
location.reload();
}
}

function saveSettings(){
let time = document.getElementById("resetTime").value;
localStorage.setItem("resetTime", time);
alert("Saved reset time (feature logic can be upgraded later)");
}

render();

/* SWIPE SUPPORT (simple version) */
let startX = 0;

document.addEventListener("touchstart", e=>{
startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e=>{
let endX = e.changedTouches[0].clientX;

if(startX - endX > 50){
showTab("trendingTab");
}
if(endX - startX > 50){
showTab("homeTab");
}
});
