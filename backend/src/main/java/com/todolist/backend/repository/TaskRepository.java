package com.todolist.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.backend.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
}
