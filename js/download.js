$(function () { 
	$('#myTab a:first').tab('show');//初始化显示哪个tab 
	getserviceSetting();
	$('#myTab a').click(function (e) { 
	  e.preventDefault();//阻止a链接的跳转行为 
	  $(this).tab('show');//显示当前选中的链接及关联的content 
	}) 
  }); 
function getserviceSetting(){
	$.ajax({
		 url: "Default.aspx/GetServiceSetting",//发送到本页面后台AjaxMethod方法
		 type: "POST",
		 dataType: "json",
		 async: true,//async翻译为异步的，false表示同步，会等待执行完成，true为异步
		 contentType: "application/json; charset=utf-8",//不可少
		 data: "",
		 success: function (strJson) {
			parseData(strJson.d);
			},
			error: function () {
				alert("请求出错处理");
		 }
	});
}
function parseData(strJson) {
	var jsonObjList = JSON.parse(strJson);
	for (stuObj in jsonObjList) {
		var serviceOnline = jsonObjList[stuObj].ServiceOnline;
		var serviceState = jsonObjList[stuObj].ServiceState;
		
		if(serviceState=="1")
			serviceState = "开启";
		else
			serviceState = "关闭";
			
		var strhtml = "<div>A服 当前服务器状态:" + serviceState + "</div>" + 
			"<div >当前在线人数:A服" + serviceOnline + "</div>";
		$("#serviceSetting").append(strhtml);

}
}