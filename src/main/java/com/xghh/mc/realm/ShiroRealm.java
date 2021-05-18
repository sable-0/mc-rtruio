package com.xghh.mc.realm;

import com.xghh.mc.dao.UserDao;
import com.xghh.mc.pojo.User;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;


public class ShiroRealm extends AuthorizingRealm {
    @Autowired
    private UserDao userDao;

    /**
     * 此方法负责获取并封装授权信息
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取登陆用户
        User user = (User) principalCollection.getPrimaryPrincipal();

        return null;
    }

    /**
     * 此方法负责获取并封装认证信息
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //获取用户提交的认证用户信息
        UsernamePasswordToken upToken = (UsernamePasswordToken) authenticationToken;
        //基于用户名查询从数据库用户信息后判断用户是否存在
        User user = userDao.selectUserByName(upToken.getUsername());
        if(user == null){
            //账户不存在
            throw new UnknownAccountException();
        }
        //封装认证信息并返回
        ByteSource credentialsSalt = ByteSource.Util.bytes(user.getSalt());
        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(
                user,   //用户身份
                user.getPassword(), //hashedCredentials   已加密的凭证（密码）
                credentialsSalt,    //credentialsSalt   （做了编码处理的加密盐对象）
                getName()
        );
        return simpleAuthenticationInfo;
    }

    /**
     *  底层队用户输入的密码加密需要算法
     * @return
     */
    @Override
    public CredentialsMatcher getCredentialsMatcher(){
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher();
        matcher.setHashAlgorithmName("MD5");
        matcher.setHashIterations(1);
        return matcher;
    }
}
