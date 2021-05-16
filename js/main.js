 // 登录按钮（表单发送）
function btnLogin(){
		var username = $("#username").val().trim();
		if(username.length == 0){
			bootbox.alert("请输入账号");
			return;
		}
		var password = $("#password").val().trim();
		if(password.length==0){
			bootbox.alert("请输入密码");
			return;
		}
		if($("[name='SaveInfo']").attr("checked","true")){  
			//添加cookie  
			setCookie();
		}
		$("#formUpload").submit();
		
	}
	
 //记住密码
function setCookie(){ //设置cookie  
	 var loginCode = $("#username").val(); //获取用户名信息  
	 var pwd = $("#password").val(); //获取登陆密码信息  
	 var checked = $("[name='SaveInfo']:checked");//获取“是否记住密码”复选框

	 if(checked){ //判断是否选中了“记住密码”复选框  
		$.cookie("username",loginCode);//调用jquery.cookie.js中的方法设置cookie中的用户名  
		$.cookie("pwd",$.base64.encode(pwd));//调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密  
	 }else{   
		$.cookie("pwd", null);   
	 }    
}   
function getCookie(){ //获取cookie  
	 var loginCode = $.cookie("username"); //获取cookie中的用户名  
	 var pwd =  $.cookie("pwd"); //获取cookie中的登陆密码  
	 if(pwd){//密码存在的话把“记住用户名和密码”复选框勾选住  
		$("[name='SaveInfo']").attr("checked","true");  
	 }  
	 if(loginCode){//用户名存在的话把用户名填充到用户名文本框  
		$("#username").val(loginCode);  
	 }  
	 if(pwd){//密码存在的话把密码填充到密码文本框  
		$("#password").val($.base64.decode(pwd)); 
	 }  
}   
 //获取session
function SetSession(d){
	d = window.sessionStorage.getItem("IsLoged");
	if(d=="true"){
			 //获取cookie中username的值 传入serLogedHtml
			 var username = $.cookie("username");
			 setLogedHtml(username);
	}
}
 function GetSession() {
	 $.ajax({
		 url: "Default.aspx/GetSession",//发送到本页面后台AjaxMethod方法
		 type: "POST",
		 dataType: "json",
		 async: true,//async翻译为异步的，false表示同步，会等待执行完成，true为异步
		 contentType: "application/json; charset=utf-8",//不可少
		 data: "",
		 success: function (obj) {
			var d = window.sessionStorage.setItem("IsLoged",obj.d);
			SetSession(d)
		 },
		 error: function () {
			 alert("请求出错处理");
		 }
	 });
 }
 // 修改登陆成功后网页中的数据
 function setLogedHtml(username){
	 if(username=="admin"){
		 $("#personalInfo").empty();
		  var strAppend = "<li><a href='adminPage.html' style='cursor: pointer;transition: .5s;' > "
		 		+ username + "</a></li>";
		  $("#personalInfo").append(strAppend);
		  $("#personalInfo2").empty();
		  strAppend ="<a class='btn_main_login' style='text-decoration: none;' href='download.html'>下载客户端</a>"
		 			+	"<a class='btn_main_login' style='margin-left: 50px;text-decoration: none;'"
		 			+	"href='userSpace.html'>个人中心</a>"
		 $("#personalInfo2").append(strAppend);
	 }
	 else{
		 $("#personalInfo").empty();
		  var strAppend = "<li><a href='userSpace.html' style='cursor: pointer;transition: .5s;' > "
		 		+ username + "</a></li>";
		  $("#personalInfo").append(strAppend);
		  $("#personalInfo2").empty();
		  strAppend ="<a class='btn_main_login' style='text-decoration: none;' href='download.html'>下载客户端</a>"
		 			+	"<a class='btn_main_login' style='margin-left: 50px;text-decoration: none;'"
		 			+	"href='adminPage.html'>个人中心</a>"
		 $("#personalInfo2").append(strAppend);
	 }
 }
// 获取服务器状态 显示在主页中央
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
			var strState1;
			if (serviceState1 == "1") {
				strState1 = "开启";
			} else {
				strState1 = "关闭";
				serviceOnline1 = "0";
			}
			$("#serState").html(strState1);
			$("#serNum").html(serviceOnline1);
		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
 // 随机更换壁纸
function bodyBG(){
	var bodyBgs = [];
	for(var i=0;i<7;i++){
		bodyBgs[i] = "url(img/background/"+ (i+1) +".jpg)";
	}
	var randomBgIndex = Math.round( Math.random() * bodyBgs.length);
	$("#main_page").css("background-image", bodyBgs[randomBgIndex]);
}
$(function () {
	getCookie();
	GetSession();
    bodyBG();
	getserviceSetting();
    function randomText(){
<!-----------ajax请求问题暂时无法解决，用数组代替--------------->
        var rT = [];
        rT[0] = "这些天你都做了些什么？";
        rT[1] = "欢迎来到食物链的顶端";
        rT[2] = "为我们的友谊干杯";
        rT[3] = "你不用跟我说两次";
        rT[4] = "嘿！那是癫子才会听的音乐！";
        rT[5] = "矿脉已经枯竭！";
        rT[6] = "其实我是一个演员";
        rT[7] = "同道中人啊！";
        rT[8] = "该练习一下APM了";
        rT[9] = "死透了";
        rT[10] = "不将就";
        rT[11] = "手里拿着旺旺";
        var rrT = Math.round( Math.random() * 11 );
        $(".text").text(rT[rrT]);
        $(".shadow").text(rT[rrT]);
    }
    randomText();

	$(".dropdown").mouseover(function () { 
		$(this).addClass("open"); }); 
	$(".dropdown").mouseleave(function(){
		$(this).removeClass("open"); })
	$("#userinfo").mouseover(function () {
		$("#pulldown").css("display","block") });
	$("#pulldown").mouseleave(function(){
		$(this).css("display","none"); })

    <!------------雪花特效------------>
    function aniSnow(){
        var wh=$(window).height();
      setInterval(function(){
        var f=$(document).width();
        var e=Math.random()*f-100;//雪花的定位left值
        var o=0.3+Math.random();//雪花的透明度
        var fon=10+Math.random()*30;//雪花大小
        var l = e - 300 + 600 * Math.random();//雪花的横向位移
        var k=2000 + 8000 * Math.random();
		var html;
		switch(Math.floor(Math.random()*3+1)){
			case 1:
			  html = "<div class='snow'>a<div>";
			  break;
			case 2:
			  html = "<div class='snow'>b<div>";
			  break;
			case 3:
			  html = "<div class='snow'>❅<div>";
			  break;
		}
        $(html).clone().appendTo("body").css({
          left:e+"px",
          opacity:o,
          "font-size":fon,
        }).animate({
          top:(wh*2)+"px",
          left:l+"px",
          opacity:0.1,
        },k,"linear",function(){$(this).remove()})
      },100)
    }
    aniSnow();
    <!------------#雪花特效#------------>

    <!------------主页动画------------>
    var css = {fontSize:'30px'};
    $('.text').animate(css,800,rowBack);
    function rowBack(){
        if(css.fontSize==='30px')
            css.fontSize='20px';
        else if(css.fontSize==='20px')
            css.fontSize='30px';
        $('.text').animate(css,800,rowBack);
    }
    var css1 = {fontSize:'30px'};
    $('.shadow').animate(css1,800,rowBack1);
    function rowBack1(){
        if(css1.fontSize==='30px')
            css1.fontSize='20px';
        else if(css1.fontSize==='20px')
            css1.fontSize='30px';
        $('.shadow').animate(css,800,rowBack1);
    }
    <!------------￥主页动画￥------------>


})
