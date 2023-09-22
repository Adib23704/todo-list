document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="task-text" data-index="${index}">${task}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
        addEditListeners();
    }

    // Function to add event listeners for editing tasks
    function addEditListeners() {
        const taskTexts = document.querySelectorAll('.task-text');
        const editButtons = document.querySelectorAll('.edit-button');

        editButtons.forEach(function (button, index) {
            button.addEventListener('click', function () {
                const taskText = taskTexts[index];
                const currentTask = taskText.innerText;
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = currentTask;
                taskText.innerHTML = '';
                taskText.appendChild(editInput);
                editInput.focus();

                // Save changes when Enter is pressed or input loses focus
                editInput.addEventListener('blur', function () {
                    const newTaskText = editInput.value.trim();
                    tasks[index] = newTaskText;
                    renderTasks();
                });

                editInput.addEventListener('keyup', function (event) {
                    if (event.key === 'Enter') {
                        const newTaskText = editInput.value.trim();
                        tasks[index] = newTaskText;
                        renderTasks();
                    }
                });
            });
        });
    }

    // Event listener for adding tasks
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
        }
    });

    // Event listener for deleting tasks
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-button')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    // Initial rendering
    renderTasks();

});
