package com.xghh.mc.config;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.alibaba.fastjson.JSONObject;
import com.xghh.mc.pojo.JsonPhoneCode;
import com.xghh.mc.pojo.User;


/**
 * 手机验证码配置类
 */

public class AliyunPhoneConfig {
    private static final String product = "Dysmsapi";   //产品名
    private static final String domian = "dysmsapi.aliyuncs.com";  //域名
    private static final String accessKeyId = "LTAI5t9eygKLTX2nYtyHmpvZ";
    private static final String accessKeySecret = "Y6vZvBYQgPsPJ6fqnmAOPsdNarv5Tf";

    public static SendSmsResponse sendALiSms(User user, String code)throws Exception{
        //区域id参考 https://www.alibabacloud.com/help/zh/doc-detail/198107.htm
        String regionId = "cn-shanghai";
        //设置超时时间
        System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
        System.setProperty("sun.net.client.defaultReadTimeout", "10000");
        //初始化acsClient,暂不支持region化
        IClientProfile iClientProfile = DefaultProfile.getProfile(regionId, accessKeyId, accessKeySecret);
        DefaultProfile.addEndpoint(regionId,regionId,product,domian);
        IAcsClient acsClient = new DefaultAcsClient(iClientProfile);

        //封装请求对象
        SendSmsRequest request = new SendSmsRequest();
        //使用post方式提交
        request.setMethod(MethodType.POST);
        //必填:待发送手机号
        request.setPhoneNumbers(user.getPhoneNumber());
        //必填:短信签名-可在短信控制台中找到
        request.setSignName("云通信");
        //必填:短信模板-可在短信控制台中找到
        request.setTemplateCode("SMS_1000000");
        //可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
        JsonPhoneCode jsonPhoneCode = new JsonPhoneCode(user.getUserName(),code);
        request.setTemplateParam(JSONObject.toJSONString(jsonPhoneCode));

        //选填-上行短信扩展码(无特殊需求用户请忽略此字段)如果需要查看短信回复。这个得填上
        //request.setSmsUpExtendCode("90997");

        //可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
        //request.setOutId("yourOutId");

        //hint 此处可能会抛出异常，注意catch
        SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);
        return sendSmsResponse;
    }


}
