<%@ WebHandler Language="C#" Class="Login" %>

using System;
using System.Web;
using System.Web.SessionState;
using System.Net;
using System.IO;
using System.Data;
using System.Data.SqlClient;

public class Login : IHttpHandler,IRequiresSessionState
{
    //public static HttpSessionState Session = HttpContext.Current.Session;
    public void ProcessRequest (HttpContext context)
    {
        HttpRequest request = context.Request;
        HttpResponse response = context.Response;
        context.Response.ContentType = "text/html";
        HttpServerUtility server = context.Server;
        //获取账号密码
        string username = context.Request.Form["username"].ToString();
        string password = context.Request.Form["password"].ToString();

        //验证账号 (先验证是否为管理员 再验证普通用户)
        string strAdmin = "Select UserName,Password From tb_AdminInfo ";
        string strUser = "Select UserName,Password From tb_UserInfo ";
        string strComm = "Where UserName='" + username + "' and Password='" + password + "'";
        strAdmin += strComm;
        strUser += strComm;

        SQLHelper sqlHelperObj = new SQLHelper();
        SqlConnection Sqlconn = sqlHelperObj.GetConn();
        Sqlconn.Open();

        SqlCommand cmd = new SqlCommand();
        cmd.Connection = Sqlconn;

        cmd.CommandText = strAdmin;
        SqlDataReader sqlDr = cmd.ExecuteReader();
        //如果是管理员 转入管理页面
        if (sqlDr.Read())
        {
            context.Session["UserName"] = username;
            context.Session["Password"] = password;
            context.Session["IsLoged"] = true;
            response.Redirect("adminPage.html");
            return;
        }
        sqlDr.Close();
        cmd.CommandText = strUser;
        sqlDr = cmd.ExecuteReader();
        //如果是普通用户 转入普通页面
        if (sqlDr.Read())
        {
            context.Session["UserName"] = username;
            context.Session["Password"] = password;
            context.Session["IsLoged"] = true;
            response.Redirect("index.html");
            return;
        }
        sqlDr.Close();
        Sqlconn.Close();
        response.Write("<script>alert('用户名或密码错误,请重新登录')</script>");
        //response.Redirect("index.html");
        //数据入库
        /*
         if (context.Request.Form["txtImgYesorNo"].ToString() == "Y")
         {
             HttpPostedFile file = context.Request.Files[0];
             string strFileExtension = Path.GetExtension(file.FileName); 
             string fileName = strPID;
             string fullName = fileName + strFileExtension;
             string phyFilePath = server.MapPath("~/pImgs/") + fullName;

             file.SaveAs(phyFilePath); 
         }*/

    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}