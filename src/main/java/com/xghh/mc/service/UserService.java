package com.xghh.mc.service;

import com.xghh.mc.pojo.User;

import java.util.List;

public interface UserService {
    //通过用户名查询用户
    User selectUserByName(String UserName);

    //查询所有用户
    List<User> selectAllUser();

    //添加用户
    void insertUser(User user);

    //根据id删除用户
    void deleteUserById(int UserId);

    //发送验证码
    public String sendSms(User user,String phoneNumber) throws Exception;

}
