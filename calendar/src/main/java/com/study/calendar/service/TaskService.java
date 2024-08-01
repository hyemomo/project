package com.study.calendar.service;

import com.study.calendar.Entity.Board;
import com.study.calendar.Entity.Task;
import com.study.calendar.repository.BoardRepository;
import com.study.calendar.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    //글 작성 처리
    public void write(Task task){
        taskRepository.save(task);
    }
    //게시글 리스트 처리
    public List<Task> taskList(){
        return taskRepository.findAll();
    }
    //특정 게시글 불러오기
    public Task taskView(Integer id){
        return taskRepository.findById(id).get();
    }
    public void taskDelete(Integer id){
        taskRepository.deleteById(id);
    }
    public void taskModify(Integer id){

    }

}
