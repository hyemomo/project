package calendar.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CalendarController {
    @GetMapping("/")
    @ResponseBody
    public String main (){
        return "hellpojl;dflksafjl";
    }
}
