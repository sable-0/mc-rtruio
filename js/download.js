// window.load
$(function() {
	$('#myTab a:first').tab('show'); //初始化显示哪个tab 
	getserviceSetting(); //获取管理页面的数据
	$('#myTab a').click(function(e) {
		e.preventDefault(); //阻止a链接的跳转行为 
		$(this).tab('show'); //显示当前选中的链接及关联的content 
	})
});
//切换服务器状态
function switchService(a, b) {
	$.ajax({
		url: "Default.aspx/switchService", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: "{'serviceID':" + a + ",'serviceState':" + b + "}",
		success: function() {
			alert("success");
			getserviceSetting();
		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
// 获取服务器状态（管理服务器页面）
function getserviceSetting() {
	$.ajax({
		url: "Default.aspx/GetServiceSetting", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: "",
		success: function(strJson) {
			var jsonObjList = JSON.parse(strJson.d);
			var serviceOnline1 = jsonObjList[0].ServiceOnline;
			var serviceState1 = jsonObjList[0].ServiceState;
			var serviceOnline2 = jsonObjList[1].ServiceOnline;
			var serviceState2 = jsonObjList[1].ServiceState;
			var strBtn1, strBtn2, strState1, strState2;
			if (serviceState1 == "1") {
				strState1 = "开启";
				strBtn1 = "<button type='button' class='btn btn-primary btn-lg active'>开启</button>" +
					"<button type='button' class='btn btn-default btn-lg active' onclick='switchService(1,0)'>关闭</button>";
				//switchService(‘服务器1 2’,‘服务器状态0 1’)
			} else {
				strState1 = "关闭";
				strBtn1 =
					"<button type='button' class='btn btn-default btn-lg active' onclick='switchService(1,1)'>开启</button>" +
					"<button type='button' class='btn btn-primary btn-lg active' >关闭</button>";
				serviceOnline1 = "0";
			}

			if (serviceState2 == "1") {
				strState2 = "开启";
				strBtn2 = "<button type='button' class='btn btn-primary btn-lg active'>开启</button>" +
					"<button type='button' class='btn btn-default btn-lg active' onclick='switchService(2,0)'>关闭</button>";
			} else {
				strState2 = "关闭";
				strBtn2 =
					"<button type='button' class='btn btn-default btn-lg active' onclick='switchService(2,1)'>开启</button>" +
					"<button type='button' class='btn btn-primary btn-lg active'>关闭</button>";
				serviceOnline2 = "0";
			}
			
			var strhtml1 = "<div>A服 当前服务器状态:" + strState1 + "</div>" +
				"<div >当前在线人数: " + serviceOnline1 + "</div>" + strBtn1;


			var strhtml2 = "<div>B服 当前服务器状态:" + strState2 + "</div>" +
				"<div >当前在线人数: " + serviceOnline2 + "</div>" + strBtn2;

			$("#serviceSetting1").html(strhtml1);
			$("#serviceSetting2").html(strhtml2);
		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
//获取用户信息
function loadUserInfo() {
	$("#search-keyword").val(null);
	$.ajax({
		url: "Default.aspx/GetUserInfoSetting", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: "{}",
		success: function(data) {
			parseData(data.d);
		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
//向表格写入数据
function parseData(strJson) {
	var jsonObjList = JSON.parse(strJson);
	$("#myTBody").empty();
	for (userObj in jsonObjList) {
		var UserName = jsonObjList[userObj].UserName;
		var Password = jsonObjList[userObj].Password;
		var PhoneNumber = jsonObjList[userObj].PhoneNumber;
		var Description = jsonObjList[userObj].Description;
		var GameTime = jsonObjList[userObj].GameTime;
		var TotalInAppPurchase = jsonObjList[userObj].TotalInAppPurchase;
		var UserID = jsonObjList[userObj].UserID;

		var strhtml = "<tr>";
		strhtml += "<td>" + UserID + "</td>";
		strhtml += "<td>" + UserName + "</td>";
		strhtml += "<td>" + Password + "</td>";
		strhtml += "<td>" + PhoneNumber + "</td>";
		strhtml += "<td>" + Description + "</td>";
		strhtml += "<td>" + GameTime + "</td>";
		strhtml += "<td>" + TotalInAppPurchase + "</td>";
		strhtml += "<td><button data-sid='" + UserID +
			"' class='btn btn-sm' data-toggle='modal' data-target='#updateModal' onclick='LoadModalInfo(this)'>修改</Button>" +
			"<button data-sid='" + UserID + "' class='btn btn-sm btn-success' onclick='userDelete(this)'>删除</Button>" +
			"</td>";
		strhtml += "</tr>";

		$("#myTBody").append(strhtml);

	}
}
//删除用户
function userDelete(obj) {
	var sid = $(obj).data("sid");
	$.ajax({
		url: "Default.aspx/DeleteUserInfo", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: "{'UserID':'" + sid + "'}",
		success: function(data) {
			alert("删除成功");
		},
		error: function() {
			alert("请求出错处理");
		}
	});
	$(obj).parent().parent().remove();

}
//添加用户
function AddUserInfo(){
	var ADDusername = $("#ADDusername").val().trim();
	var ADDpassword = $("#ADDpassword").val().trim();
	var ADDuserID = $("#ADDuserID").val().trim();
	var ADDphonenumber = $("#ADDphonenumber").val().trim();
	var ADDgametime = $("#ADDgametime").val().trim();
	var ADDinapppurchase = $("#ADDinapppurchase").val().trim();
	var ADDdescripption = $("#ADDdescripption").val().trim();
	
	
	if(ADDusername.length==0){
		alert("请输入用户名");
		return;
	}
	if(ADDpassword.length==0){
		alert("请输入密码");
		return;
	}
	if(ADDuserID.length==0){
		alert("请输入用户id");
		return;
	}
	else if(isNaN(ADDuserID))
	{
		 bootbox.alert("请输入纯数字的id！")
		 return;
	}	
	if(ADDphonenumber.length==0){
		alert("请输入手机号");
		return;
	}
	else if(isNaN(ADDphonenumber) || ADDphonenumber.length!=11)
	{
		 bootbox.alert("请输入正确的手机号！")
		 return;
	}
	var ajaxData = "{'UserID':'" + ADDuserID + "','UserName':'" + ADDusername + "','Password':'" + ADDpassword 
				+ "','PhoneNumber':'" + ADDphonenumber + "','Description':'" + ADDdescripption + "','GameTime':'"
				+ ADDgametime + "','TotalInAppPurchase':'" + ADDinapppurchase + "'}";
	$.ajax({
		url: "Default.aspx/AddUserInfo", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: ajaxData,
		success: function(data) {
			alert("添加成功");
			$("#myModal").modal('hide');
			loadUserInfo();
		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
//向模态框中写入当前行的数据
function LoadModalInfo(obj){
	var currentRow=$(obj).closest("tr");
	
	var userid=currentRow.find("td:eq(0)").text();
	var username=currentRow.find("td:eq(1)").text(); //获得当前行第一个TD值
	var password=currentRow.find("td:eq(2)").text(); //获得当前行第二个TD值
	var phonenumber=currentRow.find("td:eq(3)").text(); //获得当前行第三个TD值
	var description=currentRow.find("td:eq(4)").text();
	var gametime=currentRow.find("td:eq(5)").text();
	var totalinapppurchase=currentRow.find("td:eq(6)").text();
	
	$("#UpdateuserID").val(userid);
	$("#Updateusername").val(username);
	$("#Updatepassword").val(password);
	$("#Updatephonenumber").val(phonenumber);
	$("#Updategametime").val(gametime);
	$("#Updateinapppurchase").val(totalinapppurchase);
	$("#Updatedescripption").val(description);
}
//更新用户信息
function UpdateUserInfo(){
	bootbox.confirm("确定要提交吗？",
		function(confirmed){
			if(confirmed = true){
				var UpdateuserID = $("#UpdateuserID").val().trim();
				var Updateusername = $("#Updateusername").val().trim();
				var Updatepassword = $("#Updatepassword").val().trim();
				var Updatephonenumber = $("#Updatephonenumber").val().trim();
				var Updategametime = $("#Updategametime").val().trim();
				var Updateinapppurchase = $("#Updateinapppurchase").val().trim();
				var Updatedescripption = $("#Updatedescripption").val().trim();
				
				
				if(Updateusername.length==0){
					alert("请输入用户名");
					return;
				}
				if(Updatepassword.length==0){
					alert("请输入密码");
					return;
				}
				if(Updatephonenumber.length==0){
					alert("请输入手机号");
					return;
				}
				var ajaxData = "{'UserID':'" + UpdateuserID + "','UserName':'" + Updateusername + "','Password':'" + Updatepassword 
							+ "','PhoneNumber':'" + Updatephonenumber + "','Description':'" + Updatedescripption + "','GameTime':'"
							+ Updategametime + "','TotalInAppPurchase':'" + Updateinapppurchase + "'}";
				$.ajax({
					url: "Default.aspx/UpdateUserInfo", //发送到本页面后台AjaxMethod方法
					type: "POST",
					dataType: "json",
					async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
					contentType: "application/json; charset=utf-8", //不可少
					data: ajaxData,
					success: function(data) {
						alert("添加成功");
						$("#updateModal").modal('hide');
						loadUserInfo();
					},
					error: function() {
						alert("请求出错处理");
					}
				});
			}
		})
	
}
// 以用户名查询
function SelectUser(){
	var key = $("#search-keyword").val().trim();
	$.ajax({
		url: "Default.aspx/SelectUserInfo", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: "{'UserName':'" + key + "'}",
		success: function(data) {
			$("#myTBody").empty();
			parseData(data.d);
		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
//读取服务器信息
function loadSerInfo(){
	$.ajax({
		url: "Default.aspx/loadSerInfo", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: "{}",
		success: function(data) {
			$("#webInfo").empty();
			var jsonObjList = JSON.parse(data.d);
			for (serObj in jsonObjList) {
				var serviceID = jsonObjList[serObj].serviceID;
				var servicePg = jsonObjList[serObj].servicePg;
				var serviceVersion = jsonObjList[serObj].serviceVersion;
				var serviceLastUpdate = jsonObjList[serObj].serviceLastUpdate;
				var serviceSize = jsonObjList[serObj].serviceSize;

				var strhtml = "<tr>";
				strhtml += "<td>" + serviceID + "</td>";
				strhtml += "<td>" + servicePg + "</td>";
				strhtml += "<td>" + serviceVersion + "</td>";
				strhtml += "<td>" + serviceLastUpdate + "</td>";
				strhtml += "<td>" + serviceSize + "</td>";
				strhtml += "<td><button data-sid='" + serviceID +
					"' class='btn btn-sm' data-toggle='modal' data-target='#updateModal1' onclick='LoadModalInfo1(this)'>修改</Button>" +
					"</td>";
				strhtml += "</tr>";

				$("#webInfo").append(strhtml);

			}
				},
				error: function() {
					alert("请求出错处理");
				}
			});
}
// 向模态框写入服务器信息
function LoadModalInfo1(obj){
	var currentRow=$(obj).closest("tr");
	
	var serviceID=currentRow.find("td:eq(0)").text();
	var servicePg=currentRow.find("td:eq(1)").text(); //获得当前行第一个TD值
	var serviceVersion=currentRow.find("td:eq(2)").text(); //获得当前行第二个TD值
	var serviceLastUpdate=currentRow.find("td:eq(3)").text(); //获得当前行第三个TD值
	var serviceSize=currentRow.find("td:eq(4)").text();
	
	$("#UpdatewebID").val(serviceID);
	$("#UpdateserPg").val(servicePg);
	$("#UpdatewebVer").val(serviceVersion);
	$("#Updatedate").val(serviceLastUpdate);
	$("#UpdateserSize").val(serviceSize);
}
function UpdateSerInfo(){
	var serviceID = $("#UpdatewebID").val().trim();
	var servicePg = $("#UpdateserPg").val().trim();
	var serviceVersion = $("#UpdatewebVer").val().trim();
	var serviceLastUpdate = $("#Updatedate").val().trim();
	var serviceSize = $("#UpdateserSize").val().trim();
	
	var ajaxData = "{'serviceID':'" + serviceID + "','servicePg':'" + servicePg + "','serviceVersion':'" + serviceVersion 
				+ "','serviceLastUpdate':'" + serviceLastUpdate + "','serviceSize':'" + serviceSize + "'}";
	$.ajax({
		url: "Default.aspx/UpdateSerInfo", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: ajaxData,
		success: function(data) {
			alert("修改成功");
			$("#updateModal1").modal('hide');
			loadSerInfo();
		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
//上传背景
$(document).ready(function(){
	$("#fileUpload").change(function(){
		var objUrl = getImgFileURL(this.files[0]);
		if(objUrl){
			$("#selectedImg").attr("src",objUrl);
			$("#selectedImg").show();
			$("#txtImgYesorNo").val("Y");
		}
	});
});
function getImgFileURL(file){
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}