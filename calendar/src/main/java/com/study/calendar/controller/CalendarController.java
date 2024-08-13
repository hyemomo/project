package com.study.calendar.controller;

import com.study.calendar.Entity.Task;
import com.study.calendar.Entity.User;
import com.study.calendar.dto.TaskUpdateRequest;
import com.study.calendar.service.TaskService;
import com.study.calendar.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Controller
public class CalendarController {
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    //"calendr.html" 뷰 보여주기
    @GetMapping("/calendar")
    public String showmain() {
        return "calendar";
    }
  //데이터 베이스에서 해당 id의 task 삭제하기
    @PostMapping("/calendar/delete")
    @ResponseBody
    public String deleteTask(@RequestBody Map<String, Long> request) {

        Long id= request.get("id");
        taskService.taskDelete(id);
        return "삭제 완료!" ;
    }
    //캘린더 처음 시작할때와 날짜 바뀔 때마다 데이터 베이스에서 tasklist 새로 받아오기
    //body로 날짜 받아오고 그 날짜의 데이터를 보냄
    @PostMapping("/calendar/update")
    @ResponseBody
    public ResponseEntity<List<Task>> updateTask(@RequestBody TaskUpdateRequest request, Model model) {
        List<Task> tasks = taskService.getTasksByDeadLineDate(request.getDeadlineDate());
        return ResponseEntity.ok(tasks);
    }

    //새로운 task 등록하기
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
