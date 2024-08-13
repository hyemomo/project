package com.study.calendar.controller;


import com.study.calendar.Entity.Task;
import com.study.calendar.Entity.User;
import com.study.calendar.dto.TaskUpdateRequest;
import com.study.calendar.service.TaskService;
import com.study.calendar.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CalendarController {
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    @GetMapping("/calendar")
    public String showmain(Model model) {
        model.addAttribute("list", taskService.taskList());
        return "calendar";
    }

    @PostMapping("/calendar/delete")
    @ResponseBody
    public String deleteTask(@RequestBody Integer id) {
        taskService.taskDelete(id);
        return "삭제 완료!";
    }

    @PostMapping("/calendar/update")
    @ResponseBody
    public ResponseEntity<List<Task>> updateTask(@RequestBody TaskUpdateRequest request, Model model) {
        List<Task> tasks = taskService.getTasksByDeadLineDate(request.getDeadlineDate());
        System.out.println(tasks);
        return ResponseEntity.ok(tasks);
    }

    //메인 왼쪽에 task 리스트 보여주기
    @PostMapping("/calendar/tasks")
    @ResponseBody
    public ResponseEntity<List<Task>> addTask(@RequestBody Task task) {
        taskService.save(task);
        List<Task> tasks = taskService.getTasksByDeadLineDate(task.getDeadlineDate());
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/calendar/login")
    public String home() {
        return "login";
    }

    @PostMapping("/calendar/login/submit")
    public String login(@RequestParam("email") String email, @RequestParam("password") String password) {
        return "login";
    }

    //회원가입창
    @GetMapping("/calendar/signup")
    public String signupForm() {
        return "signup";
    }

    //회원 등록
    @PostMapping("/calendar/signup/join")
    public String join(User user, Model model) {
        userService.saveUser(user);
        model.addAttribute("message", "회원가입 되었습니다");
        model.addAttribute("url", "/calendar/signup");
        return "message";
    }
}
