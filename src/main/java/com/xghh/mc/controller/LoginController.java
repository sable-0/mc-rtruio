package com.xghh.mc.controller;

import com.xghh.mc.pojo.JsonResult;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
public class LoginController {
    @RequestMapping("/login")
    public JsonResult login(@RequestParam(required = true) String username, @RequestParam(required = true) String password){
        //将账号和密码封装 token 对象
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        //基于 subject 对象将 token 提交给 securityManager
        //token.setRememberMe(true);//设置记住我
        Subject subject = SecurityUtils.getSubject();
        System.out.println(subject);
        subject.login(token);//提交给 securityManager
        return new JsonResult();
    }
}
