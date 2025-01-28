package com.example.travel.repository;

import com.example.travel.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Custom query methods (if needed) can be added here
}
