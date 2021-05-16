$(function () {
	loadDownloadInfo();
});
function loadDownloadInfo() {
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

			var servicePg1 = jsonObjList[0].servicePg;
			var serviceVersion1 = jsonObjList[0].serviceVersion;
			var serviceLastUpdate1 = jsonObjList[0].serviceLastUpdate;
			var serviceSize1 = jsonObjList[0].serviceSize;

			$("#servicePg1").html(servicePg1);
			$("#serviceVersion1").html(serviceVersion1);
			$("#serviceLastUpdate1").html(serviceLastUpdate1);
			$("#serviceSize1").html(serviceSize1);

			var servicePg2 = jsonObjList[1].servicePg;
			var serviceVersion2 = jsonObjList[1].serviceVersion;
			var serviceLastUpdate2 = jsonObjList[1].serviceLastUpdate;
			var serviceSize2 = jsonObjList[1].serviceSize;


			$("#servicePg2").html(servicePg2);
			$("#serviceVersion2").html(serviceVersion2);
			$("#serviceLastUpdate2").html(serviceLastUpdate2);
			$("#serviceSize2").html(serviceSize2);	


		},
		error: function() {
			alert("请求出错处理");
		}
	});
}
