package com.study.calendar.service;

import com.study.calendar.Entity.Task;
import com.study.calendar.Entity.User;
import com.study.calendar.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task save(Task task) {
        return taskRepository.save(task);
    }
    public List<Task> taskList(){
        return taskRepository.findAll();
    }
    public List<Task> findBydeadlineDate(LocalDate deadlineDate){
        return taskRepository.findByDeadlineDate(deadlineDate);
    }
    public List<Task> getTaskByUser(User user){
        return taskRepository.findByUser(user);
    }
    public void taskDelete(Long id){
        taskRepository.deleteById(id);
    }

    public Task getTaskById(Long id){
        return taskRepository.findById(id).get();
    }
    public List<Task> getTasksByDeadLineDate(LocalDate deadLineDate){
        return taskRepository.findByDeadlineDate(deadLineDate);

    }

}
