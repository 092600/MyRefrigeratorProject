package com.myrefrigerator.myrefrigerator.controllers;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/accounts")
public class AccountsController {
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public boolean login(@RequestParam(value = "error", required = false) boolean error,
                         @RequestParam(value = "exception", required = false)String exception,
                         Model model){

        model.addAttribute("exception", exception);
        return error;
    }
}
