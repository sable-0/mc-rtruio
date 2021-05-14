package com.xghh.mc;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controller {
    @GetMapping("/login/{username}/{password}")
    public void login(@PathVariable String username, @PathVariable String password){
        System.out.println("xghh" + username + password);
    }
}
