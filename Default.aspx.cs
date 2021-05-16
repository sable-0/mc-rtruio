using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        
    }
    
    [WebMethod]
    public static bool GetSession()
    {
        //获取session
        //string username = HttpContext.Current.Session["UserName"].ToString();
        if (HttpContext.Current.Session["IsLoged"] != null)
            return true;
        else
            return false;
    }
    [WebMethod]
    public static string GetServiceSetting()
    {
        //获取服务器状态和在线人数
        string strJson = string.Empty;

        SQLHelper sqlHelper = new SQLHelper();

        string strSelect = "Select serviceState,serviceOnline from tb_serviceInfo";

        DataSet ds = sqlHelper.getDataSet(strSelect);

        DataTable dt = ds.Tables[0];

        if (dt.Rows.Count >= 1)
        {
            List<ServiceInfo> si = new List<ServiceInfo>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                ServiceInfo stuObj = new ServiceInfo();
                stuObj.ServiceOnline = dt.Rows[i]["serviceOnline"].ToString().Trim();
                stuObj.ServiceState = dt.Rows[i]["serviceState"].ToString().Trim();
                si.Add(stuObj);
            }
            strJson = (new JavaScriptSerializer()).Serialize(si);
        }

        return strJson;
    }
    [WebMethod]
    public static string switchService(string serviceID, string serviceState)
    {
        // 开启/关闭服务器
        string strResulet = string.Empty;
        string strUpdate = "Update tb_serviceInfo set serviceState = " + serviceState + " Where serviceID = " + serviceID ;
        SQLHelper sqlHelper = new SQLHelper();

        strResulet = sqlHelper.ExcutCommand(strUpdate).ToString();
        return strResulet;
    }
    [WebMethod]
    public static string GetUserInfoSetting()
    {
        // 管理员端获取用户信息
        string strJson = string.Empty;

        SQLHelper sqlHelper = new SQLHelper();

        string strSelect = "Select * from tb_UserInfo";
        DataSet ds = sqlHelper.getDataSet(strSelect);

        DataTable dt = ds.Tables[0];

        if (dt.Rows.Count >= 1)
        {
            List<UserInfo> userList = new List<UserInfo>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                UserInfo userObj = new UserInfo();
                userObj.UserName = dt.Rows[i]["UserName"].ToString().Trim();
                userObj.Password = dt.Rows[i]["Password"].ToString().Trim();
                userObj.PhoneNumber = dt.Rows[i]["PhoneNumber"].ToString().Trim();
                userObj.Description = dt.Rows[i]["Description"].ToString().Trim();
                userObj.GameTime = dt.Rows[i]["GameTime"].ToString().Trim();
                userObj.TotalInAppPurchase = dt.Rows[i]["TotalInAppPurchase"].ToString().Trim();
                userObj.UserID = dt.Rows[i]["UserID"].ToString().Trim();

                userList.Add(userObj);
            }
            strJson = (new JavaScriptSerializer()).Serialize(userList);
        }

        return strJson;
    }
    [WebMethod]
    public static string AddUserInfo(String UserID, String UserName, String Password, String PhoneNumber, String Description, String GameTime, String TotalInAppPurchase)
    {
        // 向数据库写入用户信息
        string strResult = string.Empty;
        string strInsert = "Insert into tb_UserInfo(UserName,Password,UserID,PhoneNumber,Description,GameTime,TotalInAppPurchase) Values('"
                        + UserName + "','" + Password + "'," + UserID + ",'" + PhoneNumber + "','" + Description + "',"
                        + GameTime + "," + TotalInAppPurchase + ")";
        SQLHelper sqlHelper = new SQLHelper();
        strResult = sqlHelper.ExcutCommand(strInsert).ToString();

        return strResult;
    }

    [WebMethod]
    public static string UpdateUserInfo(String UserID, String UserName, String Password, String PhoneNumber, String Description, String GameTime, String TotalInAppPurchase)
    {
        // 更新用户信息
        string strResult = string.Empty;
        string strInsert = "Update tb_UserInfo set UserName='" + UserName + "',Password='" + Password + "',PhoneNumber='" + PhoneNumber +
                        "',Description='" + Description + "',GameTime=" + GameTime + ",TotalInAppPurchase=" + TotalInAppPurchase +
                        " Where UserID='" + UserID + "'";
        SQLHelper sqlHelper = new SQLHelper();
        strResult = sqlHelper.ExcutCommand(strInsert).ToString();

        return strResult;
    }
    [WebMethod]
    public static string DeleteUserInfo(string UserID)
    {
        //删除用户信息
        string strResulet = string.Empty;
        string strDelete = "Delete From tb_UserInfo Where UserID = '" + UserID + "'";
        SQLHelper sqlHelper = new SQLHelper();

        strResulet = sqlHelper.ExcutCommand(strDelete).ToString();

        return strResulet;
    }
    [WebMethod]
    public static string SelectUserInfo(string UserName)
    {
        //查询用户信息
        string strJson = string.Empty;
        SQLHelper sqlHelper = new SQLHelper();
        string strSelect = "Select * from tb_UserInfo Where UserName = '" + UserName + "'";
        DataSet ds = sqlHelper.getDataSet(strSelect);

        DataTable dt = ds.Tables[0];

        if (dt.Rows.Count >= 1)
        {
            List<UserInfo> userList = new List<UserInfo>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                UserInfo userObj = new UserInfo();
                userObj.UserName = dt.Rows[i]["UserName"].ToString().Trim();
                userObj.Password = dt.Rows[i]["Password"].ToString().Trim();
                userObj.PhoneNumber = dt.Rows[i]["PhoneNumber"].ToString().Trim();
                userObj.Description = dt.Rows[i]["Description"].ToString().Trim();
                userObj.GameTime = dt.Rows[i]["GameTime"].ToString().Trim();
                userObj.TotalInAppPurchase = dt.Rows[i]["TotalInAppPurchase"].ToString().Trim();
                userObj.UserID = dt.Rows[i]["UserID"].ToString().Trim();

                userList.Add(userObj);
            }
            strJson = (new JavaScriptSerializer()).Serialize(userList);
        }
        return strJson;
    }

    [WebMethod]
    public static string loadSerInfo()
    {
        //读取服务器信息
        string strJson = string.Empty;

        SQLHelper sqlHelper = new SQLHelper();

        string strSelect = "Select serviceID,servicePg,serviceVersion,serviceLastUpdate,serviceSize from tb_serviceInfo";

        DataSet ds = sqlHelper.getDataSet(strSelect);

        DataTable dt = ds.Tables[0];

        if (dt.Rows.Count >= 1)
        {
            List<ServiceInfo> si = new List<ServiceInfo>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                ServiceInfo stuObj = new ServiceInfo();
                stuObj.serviceID = dt.Rows[i]["serviceID"].ToString().Trim();
                stuObj.servicePg = dt.Rows[i]["servicePg"].ToString().Trim();
                stuObj.serviceVersion = dt.Rows[i]["serviceVersion"].ToString().Trim();
                stuObj.serviceLastUpdate = dt.Rows[i]["serviceLastUpdate"].ToString().Trim();
                stuObj.serviceSize = dt.Rows[i]["serviceSize"].ToString().Trim();

                si.Add(stuObj);
            }
            strJson = (new JavaScriptSerializer()).Serialize(si);
        }

        return strJson;
    }
    [WebMethod]
    public static string UpdateSerInfo(String serviceID, String servicePg, String serviceVersion, String serviceLastUpdate, String serviceSize)
    {
        // 更新用户信息
        string strResult = string.Empty;
        string strInsert = "Update tb_serviceInfo set servicePg='" + servicePg + "',serviceVersion='" + serviceVersion + "',serviceLastUpdate='" + serviceLastUpdate +
                        "',serviceSize='" + serviceSize + "' Where serviceID=" + serviceID + " ";
        SQLHelper sqlHelper = new SQLHelper();
        strResult = sqlHelper.ExcutCommand(strInsert).ToString();

        return strResult;
    }

    [WebMethod]
    public static string getBackgroundNum()
    {
        //查询用户信息
        string strJson = string.Empty;
        SQLHelper sqlHelper = new SQLHelper();
        string strSelect = "Select backgroundNum from tb_indexInfo";
        DataSet ds = sqlHelper.getDataSet(strSelect);
        DataTable dt = ds.Tables[0];
        string backgroundNum = dt.Rows[0][0].ToString().Trim();
        
        return backgroundNum;
    }
    [WebMethod]
    public static string getIndexShortInfo()
    {
        //读取短语信息
        string strJson = string.Empty;

        SQLHelper sqlHelper = new SQLHelper();

        string strSelect = "Select indexSign from tb_indexInfo";

        DataSet ds = sqlHelper.getDataSet(strSelect);

        DataTable dt = ds.Tables[0];

        if (dt.Rows.Count >= 1)
        {
            List<IndexShortInfo> isi = new List<IndexShortInfo>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                IndexShortInfo isiObj = new IndexShortInfo();
                isiObj.indexSign = dt.Rows[i]["indexSign"].ToString().Trim();

                isi.Add(isiObj);
            }
            strJson = (new JavaScriptSerializer()).Serialize(isi);
        }

        return strJson;
    }
    
    [WebMethod]
    public static string UserUpdate(String UserName,String Password)
    {
        // 用户更改信息
        string strResult = string.Empty;
        string strInsert = "Update tb_UserInfo set Password='" + Password + "' Where UserName = '" + UserName + "'";
        SQLHelper sqlHelper = new SQLHelper();
        strResult = sqlHelper.ExcutCommand(strInsert).ToString();

        return strResult;
    }
    [WebMethod]
    public static string DeleteSession()
    {
        //退出登录
        HttpContext.Current.Session.Clear();
        return "0";
            
    }
    class ServiceInfo
    {
        public string ServiceOnline { get; set; }
        public string ServiceState { get; set; }
        public string serviceID { get; set; }
        public string servicePg { get; set; }
        public string serviceVersion { get; set; }
        public string serviceLastUpdate { get; set; }
        public string serviceSize { get; set; }

    }
    class UserInfo
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string GameTime { get; set; }
        public string TotalInAppPurchase { get; set; }
        public string UserID { get; set; }
    }
    class IndexShortInfo
    {
        public string indexSign { get; set; }

    }
}