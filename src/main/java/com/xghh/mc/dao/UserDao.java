package com.xghh.mc.dao;

import com.xghh.mc.pojo.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {
    User selectUserByName(String UserName);
}
