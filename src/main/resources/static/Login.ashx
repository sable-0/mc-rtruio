<%@ WebHandler Language="C#" Class="Login" %>

using System;
using System.Web;

public class Login : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        HttpRequest request = context.Request;
        HttpResponse response = context.Response;
        context.Response.ContentType = "text/html";
        HttpServerUtility server = context.Server;

        string username = context.Request.Form["username"].ToString();
        string number = context.Request.Form["number"].ToString();
        string password = context.Request.Form["password"].ToString();
        
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


        response.Redirect("indexLoged.html");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}