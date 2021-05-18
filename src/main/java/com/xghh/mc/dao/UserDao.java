package com.xghh.mc.dao;

import com.xghh.mc.pojo.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserDao {
    //通过用户名查询用户
    User selectUserByName(String UserName);

    //查询所有用户
    List<User> selectAllUser();

    //添加用户
    void insertUser(User user);

    //根据id删除用户
    void deleteUserById(int UserId);
}
