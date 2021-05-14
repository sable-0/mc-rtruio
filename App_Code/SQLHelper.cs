using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// SQLHelper 的摘要说明
/// </summary>
public class SQLHelper
{
    public SqlConnection GetConn()
    {
        //1、建立数据库连接并打开连接
        string connString = "Server=(local);Database=DB_rtruio;uid=sa;pwd=111111";
        SqlConnection con = new SqlConnection(connString);
        return con;
    }
    public DataSet getDataSet(string strSelect)
    {
        //创建命令
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = GetConn();
        cmd.CommandText = strSelect;

        //获取DataSet
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataSet ds = new DataSet();
        da.Fill(ds);

        return ds;
    }
    public int ExcutCommand(string strCmd)
    {
        int n = 0;
        SqlConnection sqlConn = GetConn();
        sqlConn.Open();

        SqlCommand cmd = new SqlCommand();
        cmd.Connection = sqlConn;
        cmd.CommandText = strCmd;

        //执行命令
        int intResulet = cmd.ExecuteNonQuery();
        sqlConn.Close();
        return intResulet;
    }
    
}