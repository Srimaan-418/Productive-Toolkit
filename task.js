document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('zenith-tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('zenith-tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        if (tasks.length === 0) {
            taskList.innerHTML = '<p class="empty-state">No tasks yet. Add one above!</p>';
            return;
        }

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.setAttribute('data-id', task.id);

            taskItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <span class="priority-tag priority-${task.priority}">${task.priority}</span>
                <div class="task-actions">
                    <button class="btn-complete">✅</button>
                    <button class="btn-delete">🗑️</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text === '') return;

        const newTask = {
            id: Date.now(),
            text: text,
            priority: prioritySelect.value,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        const id = e.target.closest('.task-item').getAttribute('data-id');

        if (e.target.classList.contains('btn-complete')) {
            const task = tasks.find(t => t.id == id);
            task.completed = !task.completed;
        }

        if (e.target.classList.contains('btn-delete')) {
            tasks = tasks.filter(t => t.id != id);
        }

        saveTasks();
        renderTasks();
    });

    renderTasks();
});