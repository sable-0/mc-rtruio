package com.xghh.mc.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * 封装短信发送的json字符串
 */

@Data
public class JsonPhoneCode implements Serializable {
    private static final long serialVersionUID = -4538936643452707678L;
    private String name;
    private String code;

    public JsonPhoneCode(String name ,String code){
        this.name = name;
        this.code = code;
    }

}
