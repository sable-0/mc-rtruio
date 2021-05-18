package com.xghh.mc.pojo;

import lombok.Data;

import java.io.Serializable;

@Data
public class JsonResult implements Serializable {
    private static final long serialVersionUID = -3787652085633240538L;
    private Integer state = 1;
    private String message = "success";
    private Object data;

    public JsonResult(){}
    public JsonResult(String message){
        this.message = message;
    }
    public JsonResult(Object data){
        this.data = data;
    }
    public JsonResult(Throwable e){
        this.state = 0;
        this.message = e.getMessage();
    }
}
