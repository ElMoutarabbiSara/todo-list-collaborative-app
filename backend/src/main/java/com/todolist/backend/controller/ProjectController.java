package com.todolist.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.backend.model.Project;
import com.todolist.backend.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;


    @GetMapping("/user/{userId}")
    public List<Project> getProjectsByUserId(@PathVariable Long userId) {
        return projectRepository.findByUserId(userId);
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        System.out.println("Received project: " + project.getName() + ", user ID: " + (project.getUser() != null ? project.getUser().getId() : "null"));
        return projectRepository.save(project);
    }


    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }
}
