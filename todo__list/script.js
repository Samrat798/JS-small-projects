const inputDom = document.querySelector('.input');
const addBtn = document.querySelector('.input-btn');
const todoDomCon = document.querySelector('.todo__container');

let todoList = [];
let edit_ID = null;

window.addEventListener('load', getFromLocalStorage());
addBtn.addEventListener('click', function (e) {
  e.preventDefault();
  addTask();
});

todoDomCon.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    deleteTask(e.target.parentNode.parentNode.getAttribute('data-set'));
  }
  if (e.target.classList.contains('edit-btn')) {
    editTask(e.target.parentNode.parentNode.getAttribute('data-set'));
  }
});

function addTask() {
  const task = inputDom.value;
  if (!task) return alert('Please enter a task.');

  if (edit_ID != null) {
    todoList.find((todo) => {
      if (todo.id == edit_ID) {
        todo.task = task;
        completed = false;
      }
    });
  }
  if (edit_ID == null) {
    const newTask = {
      task,
      id: Date.now(),
      completed: false,
    };
    todoList.push(newTask);
  }
  inputDom.value = '';
  inputDom.focus();
  saveToLocalStorage(todoList);
  edit_ID = null;
  addBtn.textContent = 'Add';
}

function displayTasks(tasks) {
  todoDomCon.innerHTML = '';
  tasks.map((task) => {
    const li = document.createElement('li');
    li.classList.add('todo__item');
    li.setAttribute('data-set', task.id);
    li.innerHTML = `
     ${task.task}
          <div class="btn-container">
            <button class="btn edit-btn">Edit</button
            ><button class="btn delete-btn">Delete</button>
          </div>
    `;
    todoDomCon.appendChild(li);
  });
}

function saveToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks(tasks);
}

function getFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    todoList = JSON.parse(tasks);
    displayTasks(todoList);
  }
}

function deleteTask(id) {
  todoList = todoList.filter((todo) => todo.id != id);
  saveToLocalStorage(todoList);
}

function editTask(id) {
  edit_ID = id;
  let task = todoList.find((task) => task.id == id);
  inputDom.focus();
  inputDom.value = task.task;
  addBtn.textContent = 'Done';
}
