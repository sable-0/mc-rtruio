package com.xghh.mc.config;

import com.xghh.mc.realm.ShiroRealm;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.web.config.DefaultShiroFilterChainDefinition;
import org.apache.shiro.spring.web.config.ShiroFilterChainDefinition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShiroConfig {
    /**
     *  通过此对象访问数据库中的用户和权限信息并进行封装
     * @return
     */
    @Bean
    public Realm realm() {//org.apache.shiro.realm.Realm
        return new ShiroRealm();
    }

    @Bean
    public ShiroFilterChainDefinition shiroFilterChainDefinition(){
        DefaultShiroFilterChainDefinition defaultShiroFilterChainDefinition = new DefaultShiroFilterChainDefinition();
        //登陆页面连接
        defaultShiroFilterChainDefinition.addPathDefinition("/login/**","anon");
        //登出
        defaultShiroFilterChainDefinition.addPathDefinition("","logout");
        //配置以/**开头的资源必须都要经过认证，
        //其中 authc 为 shiro 框架指定的认证过滤器
        defaultShiroFilterChainDefinition.addPathDefinition("/**", "user");
        return defaultShiroFilterChainDefinition;
    }

}
