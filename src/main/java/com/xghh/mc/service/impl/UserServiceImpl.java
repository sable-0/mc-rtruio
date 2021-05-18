package com.xghh.mc.service.impl;

import com.xghh.mc.dao.UserDao;
import com.xghh.mc.pojo.User;
import com.xghh.mc.service.UserService;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User selectUserByName(String UserName) {
        return userDao.selectUserByName(UserName);
    }

    @Override
    public List<User> selectAllUser() {
        return userDao.selectAllUser();
    }

    @Override
    public void insertUser(User user) {
        //对密码进行md5加密
        String password = user.getPassword();
        String salt = UUID.randomUUID().toString(); //加密盐
        SimpleHash simpleHash =  new SimpleHash("MD5",password, salt,1);
        password = simpleHash.toHex();//将加密结果转换为16进制
        user.setPassword(password);
        user.setSalt(salt);
        userDao.insertUser(user);
    }

    @Override
    public void deleteUserById(int UserId) {
        userDao.deleteUserById(UserId);
    }
}
