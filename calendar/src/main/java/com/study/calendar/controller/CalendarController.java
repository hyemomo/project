package com.study.calendar.controller;

import com.study.calendar.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Date;

@Controller
public class CalendarController {
    @Autowired
    private TaskService taskService;
    @GetMapping("/calendar")
    public String calendarMain(Model model) {
        model.addAttribute("list",taskService.taskList());
        Date date= new Date();
        System.out.println(date);
        return "calendar";
    }
    @PostMapping("/calendar/submit")
    public String calendwrSubmit(Model model){
        model.addAttribute("message", "등록했습니다.");
        model.addAttribute("url", "/calendar");
        return "message";


    }

}
