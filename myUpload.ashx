<%@ WebHandler Language="C#" Class="myUpload" %>

using System;
using System.Web;
using System.Net;
using System.IO;

public class myUpload : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        HttpRequest request = context.Request;
        HttpResponse response = context.Response;
        context.Response.ContentType = "text/html";
        HttpServerUtility server = context.Server;

        HttpPostedFile file = context.Request.Files[0];
        string strFileExtension = Path.GetExtension(file.FileName);
        string currentFile = server.MapPath("~/img/background/");
        string[] files = Directory.GetFiles(currentFile);
        int fileNum = files.Length;
        string fileName = (fileNum + 1).ToString();
        string fullName = fileName + strFileExtension;
        string phyFilePath = server.MapPath("~/img/background/") + fullName;

        file.SaveAs(phyFilePath);

        string strResulet = string.Empty;
        string strDelete = "Update tb_indexInfo set backgroundNum = backgroundNum + 1";
        SQLHelper sqlHelper = new SQLHelper();

        strResulet = sqlHelper.ExcutCommand(strDelete).ToString();

        response.Write("<script>alert('上传成功')</script>");
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}