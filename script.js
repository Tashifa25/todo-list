let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push(taskText);
    input.value = '';
    renderTasks();
    saveTasks(); // 🔄 Save to local storage
  }
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function editTask(index) {
  const newTask = prompt('Edit your task:', tasks[index]);
  if (newTask !== null && newTask.trim() !== '') {
    tasks[index] = newTask.trim();
    renderTasks();
    saveTasks(); // 🔄 Save after editing
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks(); // 🔄 Save after deleting
}

// ✅ Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ✅ Load from localStorage when page opens
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// ⏳ Run this when the page loads
window.onload = loadTasks;
