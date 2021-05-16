$(function() {
	getUserInfo();
	//获取class为caname的元素
	$("#myPassword").click(function() {
	var span = $(this);
	var txt = span.text();
	var input = $("<input type='text'value='" + txt + "'/>");
	span.html(input);
	input.click(function() {
		return false;
	});
	//获取焦点
	input.trigger("focus");
	//文本框失去焦点后提交内容，重新变为文本
	input.blur(function() {
			var newtxt = $(this).val();
			//判断文本有没有修改
			if (newtxt != txt) {
				span.html(newtxt);
			}
		});
	});
});
function getUserInfo(){
	var UserName = $.cookie("username"); //获取cookie中的用户名
	$("#myUserName").text(UserName);
	$("#myPassword").text("*******");
	
}
function UserUpdatePassword(){
	var UserName = $("#myUserName").text().trim();
	var Password = $("#myPassword").text().trim();
	if(Password=="" || Password==null){
		alert("请输入密码");
		return;
	}
	var ajaxData = "{'UserName':'"+ UserName + "','Password':'" + Password + "'}";
	$.ajax({
		url: "Default.aspx/UserUpdate", //发送到本页面后台AjaxMethod方法
		type: "POST",
		dataType: "json",
		async: true, //async翻译为异步的，false表示同步，会等待执行完成，true为异步
		contentType: "application/json; charset=utf-8", //不可少
		data: ajaxData,
		success: function(data) {
			alert("修改成功");
		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
