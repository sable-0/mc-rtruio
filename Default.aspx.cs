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
        //string username = HttpContext.Current.Session["UserName"].ToString();
        if (HttpContext.Current.Session["IsLoged"] != null)
            return true;
        else
            return false;
    }
    [WebMethod]
    public static string GetServiceSetting()
    {
        string strJson = string.Empty;

        SQLHelper sqlHelper = new SQLHelper();

        string strSelect = "Select serviceState,serviceOnline from tb_serviceinfo";

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
    class ServiceInfo
    {
        public string ServiceOnline { get; set; }
        public string ServiceState { get; set; }

    }

}