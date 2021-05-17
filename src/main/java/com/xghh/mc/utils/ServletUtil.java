package com.cy.pj.common.utils;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class ServletUtil
{
    /**
     * 获取 request
     */
    public static HttpServletRequest getRequest()
    {
        return getRequestAttributes().getRequest();
    }
    /**
     * 获取 response
     */
    public static HttpServletResponse getResponse()
    {
        return getRequestAttributes().getResponse();
    }
    /**
     * 获取 session
     */
    public static HttpSession getSession(){
        return getRequest().getSession();
    }

    public static ServletRequestAttributes getRequestAttributes(){
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        return (ServletRequestAttributes) attributes;
    }
}