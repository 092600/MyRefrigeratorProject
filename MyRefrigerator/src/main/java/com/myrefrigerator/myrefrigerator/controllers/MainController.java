package com.myrefrigerator.myrefrigerator.controllers;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequiredArgsConstructor
@RestController
public class MainController {
    @RequestMapping("/")
    public String index(){
        return "test";
    }

}
