package com.myrefrigerator.myrefrigerator.controllers;

import com.myrefrigerator.myrefrigerator.config.auth.dto.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class MainController {
    private final HttpSession httpSession;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model){

        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        if(user != null){
            model.addAttribute("userName", user.getName());
        }

        return "/Main/index";
    }

    @RequestMapping(value = "/mypage", method = RequestMethod.GET)
    public String myPage(){

        return "/Main/myPage/myPage";
    }
}
