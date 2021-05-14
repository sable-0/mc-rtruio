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
		$("#form_data").submit();
	}
$(function () {
	
    <!------------随机更换壁纸------------->
    function bodyBG(){
        var bodyBgs = [];
//        bodyBgs[0] = "url(/static/img/01.jpg)";
//        bodyBgs[1] = "url(/static/img/02.jpg)";
//        bodyBgs[2] = "url(/static/img/03.jpg)";
//        bodyBgs[3] = "url(/static/img/04.jpg)";
//        bodyBgs[4] = "url(/static/img/05.jpg)";
//        bodyBgs[5] = "url(/static/img/06.jpg)";
//        bodyBgs[6] = "url(/static/img/07.jpg)";
//        var randomBgIndex = Math.round( Math.random() * 6 );
//        $("#main_page").css("background-image", bodyBgs[randomBgIndex]);
        for(var i=0;i<7;i++){
            bodyBgs[i] = "url(img/0"+ (i+1) +".jpg)";
        }
        var randomBgIndex = Math.round( Math.random() * 7 );
        $("#main_page").css("background-image", bodyBgs[randomBgIndex]);
    }
    bodyBG();
	<!------------# 随机更换壁纸 #------------->

    function randomText(){
//    $.ajax({
//        type : 'post',
//        dataType : 'json',
//        url : 'rtruio/rT',
//        success : function(data){
//            var status = data.status;
//            if(data.code == "0"){
//                $(".text").empty();
//                $(".text").text(data.temp);
//            }else{
//                alert(data.status);
//            }
//        }
//    })
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

    function snum(){
        var num = Math.random();
        num = Math.ceil(num * 10)
        $("#num").text(num);
    }
    snum();
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
