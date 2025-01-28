const taskForm = document.getElementById("task-form");
const taskTitleInput = document.getElementById("task-title");
const taskDescInput = document.getElementById("task-desc");
const tasksList = document.getElementById("tasks");

taskForm.addEventListener("submit", addTask);

function addTask(e) {
    e.preventDefault();

    const task = {
        title: taskTitleInput.value,
        description: taskDescInput.value,
    };

    fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Task added:", data);  // Check if task is added successfully
        taskTitleInput.value = "";
        taskDescInput.value = "";
        loadTasks();  // Load tasks after adding a new task
    })
    .catch(error => console.error("Error adding task:", error));
}


function loadTasks() {
    fetch("/api/tasks")
        .then(response => response.json())
        .then(tasks => {
            console.log("Fetched tasks:", tasks);  // Check if tasks are correctly received
            
            // Clear existing tasks
            tasksList.innerHTML = "";
            
            if (tasks.length === 0) {
                // Display the "No tasks" message if no tasks are present
                const emptyStateMessage = document.createElement("li");
                emptyStateMessage.classList.add("empty-state");
                emptyStateMessage.innerText = "No tasks available. Add a new task to get started!";
                tasksList.appendChild(emptyStateMessage);
            } else {
                // Add tasks to the list
                tasks.forEach(task => {
                    const taskItem = document.createElement("li");
                    taskItem.setAttribute("data-id", task.id);
                    taskItem.innerHTML = `
                        <div>
                            <strong>${task.title}</strong>
                            <p>${task.description}</p>
                        </div>
                        <button class="delete-btn">Delete</button>
                    `;
                    taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));
                    tasksList.appendChild(taskItem);
                });
            }
        })
        .catch(error => console.error("Error loading tasks:", error));
}

document.addEventListener("DOMContentLoaded", loadTasks);

function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })  // Ensure '/api/tasks' is used
        .then(response => {
            if (response.ok) {
                loadTasks();  // Reload tasks after deletion (without reloading the page)
            } else {
                console.error('Failed to delete task. Status:', response.status);
                alert('Failed to delete task');
            }
        })
        .catch(error => {
            console.error("Error deleting task:", error);
            alert("Error deleting task. Check console for details.");
        });
}






