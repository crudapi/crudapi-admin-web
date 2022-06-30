senvenProvide("moorCall.recordError");
var errorArr = []
var recordErrorFun = null
moorCall.recordError.sendActionToPbx = function (){
    if (recordErrorFun) { // 定时器还在跑时，不重新new 定时器
        return
    }
   recordErrorFun = window.setInterval(function () {
       if (errorArr.length > 0) {
           var url = account.url;
           var phoneJson = {
               Command: "Action",
               Action: "sykjRecordError",
               Account: account.accountId,
               ActionID: "sykjRecordError" + Math.random(),
               PBX: account.PBX,
               SessionID: account.sessionId,
               ErrorTime: errorArr[0].errorTime
           };
           if (errorArr[0] && errorArr[0].eventJson) {
               phoneJson.EventJson =  errorArr[0].eventJson
           }
           if (errorArr[0] && errorArr[0].catchRecord) {
               phoneJson.CatchRecord =  errorArr[0].catchRecord
           }
           if (errorArr[0] && errorArr[0].type) {
               phoneJson.type =  errorArr[0].type
           }
           m7$.ajax({
               url: url,
               data: {json: JSON.stringify(phoneJson)},
               jsonp: "callbackName",
               async: true,
               timeout: 15000,
               dataType: 'jsonp',
               success: function (response, ioArgs) {
               },
               error: function (response, ioArgs) {
               }
           });
           errorArr.splice(0, 1)
       } else {
           window.clearInterval(recordErrorFun)
           recordErrorFun = null
       }
   }, 5000)
}
moorCall.recordError.dataHandle = function (data) {
    if (data.flag && data.flag == 'pageError') { // m7eventHandler 捕获页面报错
        var errIndex = data.error.stack.indexOf('at ',data.error.stack.indexOf('at ')+1) // 获取第二个at的下标
        var errStr = data.error.stack.substring(0, errIndex) // 从0开始截取到第一个at结束
        var jsIndex = errStr.indexOf('/js/')// 截取出报错的js的下标
        var atIndex = errStr.indexOf('at ')// 截取出第一个at的下标
        var jsStr = errStr.substring(jsIndex+1,errStr.length) // 截取出报错的js名称
        var atStr = errStr.substring(0, atIndex) // 截取出第一个at之前的报错信息
        var lastStr = atStr + jsStr
        //汇总：第一个at之前的信息保留，第一个at之后，第二个at之前的信息保留.js部分，第二个at开始删除掉
        lastStr = lastStr.replace(/\ +/g,"").replace(/[\r\n]/g,"") // 去掉空格和回车~
        var errObj = {
            ChannelStatus: data.errorItem.ChannelStatus,
            ChannelType: data.errorItem.ChannelType,
            Event: data.errorItem.Event,
            Exten: data.errorItem.Exten,
            ExtenType: data.errorItem.ExtenType
        } // 截取事件中比较重要的信息
        var pushData = {eventJson: errObj, catchRecord: {str:lastStr}, errorTime: data.errorTime}
        errorArr.push(pushData)
    } else {
        errorArr.push(data)
    }
}
moorCall.recordError.getCurrentTime= function() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day + " ";
    if(hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}