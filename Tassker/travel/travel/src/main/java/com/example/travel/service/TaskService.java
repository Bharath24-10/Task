package com.example.travel.service;

import com.example.travel.model.Task;
import com.example.travel.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();  // or your DB fetching logic
        System.out.println("Tasks from DB: " + tasks);  // Log to verify
        return tasks;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public boolean deleteTaskById(Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            taskRepository.delete(taskOptional.get());
            return true;
        }
        return false;  // Task not found
    }
}
