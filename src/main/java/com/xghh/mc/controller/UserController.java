package com.xghh.mc.controller;

import com.xghh.mc.pojo.JsonResult;
import com.xghh.mc.pojo.User;
import com.xghh.mc.service.UserService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController("/user")
@RequiresAuthentication //只有用户登陆后才能进行操作
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
