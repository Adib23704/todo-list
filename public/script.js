document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('task-list');
    let tasks = [];


    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="task-item">
                    <span class="task-text" data-index="${index}">${task}</span>
                    <div class="button-container">
                        <button class="edit-button" data-index="${index}">Edit</button>
                        <button class="delete-button" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
            taskList.appendChild(listItem);
        });
        addEditListeners();
    }


    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    function getTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            renderTasks();
        }
    }


    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push(taskText);
            taskInput.value = '';
            saveTasksToLocalStorage();
            renderTasks();
        }
    });


    function addEditListeners() {
        const editButtons = document.querySelectorAll('.edit-button');
        const deleteButtons = document.querySelectorAll('.delete-button');

        editButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const index = button.getAttribute('data-index');
                const newText = prompt('Edit the task:', tasks[index]);
                if (newText !== null) {
                    tasks[index] = newText;
                    saveTasksToLocalStorage();
                    renderTasks();
                }
            });
        });

        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const index = button.getAttribute('data-index');
                if (confirm('Are you sure you want to delete this task?')) {
                    tasks.splice(index, 1);
                    saveTasksToLocalStorage();
                    renderTasks();
                }
            });
        });
    }


    getTasksFromLocalStorage();

});
