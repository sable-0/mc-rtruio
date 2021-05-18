package com.xghh.mc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//该类用于转发页面跳转（未启用）
//@Controller
public class PageJumpController {
    @RequestMapping("/homepage")
    public String index(){
        return "index";
    }

    @RequestMapping("/download")
    public String download(){
        return "download";
    }

}
