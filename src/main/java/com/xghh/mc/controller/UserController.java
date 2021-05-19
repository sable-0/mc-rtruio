package com.xghh.mc.controller;

import com.xghh.mc.pojo.JsonResult;
import com.xghh.mc.pojo.User;
import com.xghh.mc.service.UserService;
import com.xghh.mc.utils.PhoneUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public JsonResult doSelectAllUser(){
        return new JsonResult(userService.selectAllUser());
    }

    @GetMapping("/{UserName}")
    public JsonResult doSelectUserByName(@PathVariable String UserName){
        return new JsonResult(userService.selectUserByName(UserName));
    }

    @PostMapping("/{id}")
    public JsonResult doDeleteById(@PathVariable int userId){
        userService.deleteUserById(userId);
        return new JsonResult("delete ok");
    }

    @PostMapping
    public JsonResult doInsertUser(@RequestBody User user){
        userService.insertUser(user);
        return new JsonResult("save ok");
    }



}
