package com.xghh.mc.config;


import com.xghh.mc.realm.ShiroRealm;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.MemoryConstrainedCacheManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.web.config.DefaultShiroFilterChainDefinition;
import org.apache.shiro.spring.web.config.ShiroFilterChainDefinition;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
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
        //不用登陆就能访问的页面,shiro不能拦截静态文件路径
        //defaultShiroFilterChainDefinition.addPathDefinition("/index.html","anon");
        //静态资源
        defaultShiroFilterChainDefinition.addPathDefinition("/css/**","anon");
        defaultShiroFilterChainDefinition.addPathDefinition("/fonts/**","anon");
        defaultShiroFilterChainDefinition.addPathDefinition("/img/**","anon");
        defaultShiroFilterChainDefinition.addPathDefinition("/js/**","anon");
        //defaultShiroFilterChainDefinition.addPathDefinition("/login","anon");
        //登入登出
        defaultShiroFilterChainDefinition.addPathDefinition("/login","anon");
        defaultShiroFilterChainDefinition.addPathDefinition("/logout","logout");
        //配置以/**开头的资源必须都要经过认证，
        //其中 authc 为 shiro 框架指定的认证过滤器
        defaultShiroFilterChainDefinition.addPathDefinition("/**", "user");
        return defaultShiroFilterChainDefinition;
    }

    @Bean
    public SessionManager sessionManager(){
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        //session 的超时时间
        sessionManager.setGlobalSessionTimeout(1000*60*60);//1 个小时
        //sessionManager.setGlobalSessionTimeout(2*60*1000);//2 分钟
        //删除无效 session
        sessionManager.setDeleteInvalidSessions(true);
        //当客户端 cookie 被禁用是否要设置 url 重写
        sessionManager.setSessionIdUrlRewritingEnabled(false);
        return sessionManager;
    }
    @Bean
    protected CacheManager shiroCacheManager() {
        return new MemoryConstrainedCacheManager();
    }

}
