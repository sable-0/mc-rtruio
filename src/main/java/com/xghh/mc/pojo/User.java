package com.xghh.mc.pojo;

import lombok.Data;

@Data
public class User {
    private String UserName;
    private String Password;
    private int UserId;
    private String PhoneNumber;
    private String Salt;
}
