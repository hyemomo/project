package com.study.calendar.controller;

import com.study.calendar.Entity.Board;
import com.study.calendar.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
 //localhost:8080/board/write
public class BoardController {
    @Autowired
    private BoardService boardService;
    @GetMapping("/board/write")
    public String boardWriteForm(){
        return "boardWrite";
    }
    @PostMapping("/board/writePro")
    public String boardWritePro(Board board, Model model) {
        boardService.write(board);
        model.addAttribute("message", "글 작성이 완료되었습니다.");
        model.addAttribute("url", "/board/list");

        return "message";
    }
    @GetMapping("/board/list")
    public String boardList(Model model){
        model.addAttribute("list", boardService.boardList());
        return "boardList";
    }
    @GetMapping("/board/view") //local:8080/board/view?id=1
    public String boardView(Model model, @RequestParam("id") Integer id){
        model.addAttribute("board",boardService.boardView(id));
        return "boardView";
    }
    @GetMapping("/board/delete")
    public String boardDelete(@RequestParam("id") Integer id){
        boardService.boardDelete(id);
        return "message";

    }
    @GetMapping("/board/modify/{id}")
    //pathvariable 은 modify/ 뒷 부분에 오는 id 부분이 변수로 들어감
    public String boardModify(@PathVariable("id") Integer id, Model model){
        model.addAttribute("board", boardService.boardView(id));


return "boardModify";
    }
    @PostMapping("/board/update/{id}")
    public String boardUpdate(@PathVariable("id") Integer id, Board board){
       Board boardtemp = boardService.boardView(id);
        boardtemp.setTitle(board.getTitle());
        boardtemp.setContent(board.getContent());

boardService.write(boardtemp);
        return "message";
    }

}
