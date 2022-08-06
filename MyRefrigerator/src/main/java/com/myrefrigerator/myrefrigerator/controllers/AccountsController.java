package com.myrefrigerator.myrefrigerator.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/accounts")
public class AccountsController {
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(){
        return "/accounts/loginPage";
    }

}
