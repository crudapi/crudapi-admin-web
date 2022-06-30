senvenProvide("moorCall.moortools");
moorCall.moortools.m7BeginLogon = function (loginName, password, extenType, agentStatus) {
    var config = {
        Monitor: false,

        
		proxy_url: "https://pbx-bj-tx13.7moor.com",
		extenType: extenType,
        password: password,
        User: loginName,
        busyType: agentStatus || '0'
    };
    moorCall.moortools.m7initPhone(config);
};
moorCall.moortools.notifyDialogStayRemain;
moorCall.moortools.notifyDialogInterval = "";
moorCall.moortools.index = 1;
moorCall.moortools.input = function(connectType) {
    var clickBtn = "";
    var keyEvent = "";
    if(connectType == "transfer") {
        clickBtn = "<input type=button value='转接' class='btn' style='margin-left:5px;margin-top:0;' onclick=\"softphoneBar.m7exTransfer(m7$('#softphone-input').val())\" />";
        keyEvent = "onKeyDown=\"if(event.keyCode == 13){softphoneBar.m7exTransfer(m7$('#softphone-input').val())}\"";
    } else if(connectType == "consult") {
        clickBtn = "<input type=button value='咨询'  class='btn' style='margin-top:0;' onclick=\"softphoneBar.m7exConsult(m7$('#softphone-input').val())\" />";
        keyEvent = "onKeyDown=\"if(event.keyCode == 13){softphoneBar.m7exConsult(m7$('#softphone-input').val())}\"";
    }
    var maxsWidth=310;
    var maxheight=80;
    var bordercolor="#c6c6c6";
    var width=m7$("#softphonebar").offsetWidth;
    var height=m7$("#softphonebar").offsetHeight;
    var bgObj = m7$("<div></div>")
    bgObj.attr('id','hollyc5.bgDiv');
    bgObj.attr('class', 'dialoutBox')
    m7$('#cover').css("display", "block")
    bgObj.css({
        "width": width + "px",
        "heigth": height + "px",
    })
    m7$("#softphonebar").append(bgObj);
    var msgObj = m7$("<div></div>")
    msgObj.attr("id","hollyc5.msgDiv");
    msgObj.attr("align","center");
    msgObj.attr("class", "dialoutCenterBox")
    msgObj.css({
        "marginLeft": "-125px",
        "padding": "2px 4px 0px 10px",
        "top": "145px",
        "left": "50%",
        "border": "1px solid" + bordercolor,
        "marginTop": -75 + document.documentElement.scrollTop+"px",
        "width": maxsWidth + "px",
        "height": maxheight + "px",
    })
    if(connectType == "transfer") {
        msgObj.css({
          "height": "230px",
        })
    }
    var html = "<div style='text-align:right'>" +
        "<a href=javascript:moorCall.moortools.close();>" +
        "<img src='../imgs/close_one.png' />" +
        "</a>" +
        "</div>" +
        "<div style='height:35px;overflow:hidden;text-align:center'>" +
        "<div id='hollyc5.loading.message' style='float:left;color:#666666;padding-left:5px;'>" +
        "<input id='softphone-input' value='' class='ipt' style='width:216px;' placeholder='请输入手机号或工号' type='text' size='20' class='fl' "+keyEvent+" />" + clickBtn + "</div>" +
        "</div>"
    if(connectType == "transfer") {
      html += handleQueue()
    }
    msgObj.html(html) ;
    m7$("#softphonebar").append(msgObj);
};

moorCall.moortools.close = function() {
    m7$('#cover').css("display", "none")
    if(moorCall.moortools.notifyDialogInterval != "") {
        clearInterval(moorCall.moortools.notifyDialogInterval);
    }
    var bgObj = document.getElementById("hollyc5.bgDiv");
    var msgObj = document.getElementById("hollyc5.msgDiv");
    if(msgObj != null) {
        m7$(msgObj).remove();
    }
    if(bgObj != null) {
        m7$(bgObj).remove()
    }
};
moorCall.moortools.success = function(message) {
    var maxsWidth=170;
    var maxheight=55;
    var bordercolor="#c6c6c6";
    var width=m7$("#softphonebar").offsetWidth;
    var height=m7$("#softphonebar").offsetHeight;
    var bgObj = m7$("<div></div>")
    bgObj.attr('id','hollyc5.bgDiv');
    bgObj.attr("class", "dialoutBox")
    bgObj.css({
        "width": width + "px",
        "height": height + "px",
    })
    m7$('#cover').css("display", "block")
    m7$("softphonebar").append(bgObj);
    var msgObj = m7$("<div></div>")
    msgObj.attr("id","hollyc5.msgDiv");
    msgObj.attr("align","center");
    msgObj.attr("class", "dialoutCenterBox")
    msgObj.css({
        "marginLeft": "-125px",
        "top": "145px",
        "left": "50%",
        "padding": "18px 0px 0px 35px",
        "border": "1px solid " + bordercolor,
        "marginTop": -75+document.documentElement.scrollTop+"px",
        "width": maxsWidth + "px",
        "height": maxheight + "px",
    })
    var html = "<div style='height:30px;overflow:hidden'>" +
        "<img src='../imgs/success.jpg' style='float:left;margin-top:4px;' />" +
        "<div style='float:left;color:#666666;padding-left:5px;font-size:15px;padding-top:4px'>" + message + "</div>" +
        "<div class='clear1'>&nbsp;</div></div>"
    msgObj.html(html);
    m7$("#softphonebar").append(msgObj);
};
moorCall.moortools.loading = function(message, parentId, obj) {
    var maxsWidth=290;
    var maxheight=90;
    var bordercolor="#c6c6c6";
    var width=m7$("#" + parentId).offsetWidth;
    var height=m7$("#" + parentId).offsetHeight;
    var bgObj = m7$("<div></div>")
    bgObj.attr('id','hollyc5.bgDiv');
    bgObj.attr("class", "dialoutBox")
    m7$('#cover').css("display", "block")
    bgObj.css({
        "width": width + "px",
        "height": height + "px",
    })
    m7$("#" + parentId).append(bgObj);
    var msgObj = m7$("<div></div>")
    msgObj.attr("id","hollyc5.msgDiv");
    msgObj.attr("align","center");
    msgObj.attr("class", "dialoutCenterBox")
    msgObj.css({
        "padding": "11px 10px 0px 12px",
        "marginLeft": "-125px",
        "top": "145px",
        "left": "50%",
        "border": "1px solid " + bordercolor,
        "marginTop": -75+document.documentElement.scrollTop+"px",
        "width": maxsWidth + "px",
        "height": maxheight + "px",
    })
    var html = "<div style='overflow:hidden;text-align:center'>" +
        "<img src='../imgs/loading.gif' style='margin-top:5px;' />" +
        "<div id='hollyc5.loading.message' style='color:#666666;padding-left:5px;'>" + message + "</div>" +
        "</div>"
    if (obj.type && obj.type == 'consult') {
        html += '<input type="button" id="cancelConsult"  style="display:none;margin-left:116px" value="取消咨询" class="btn" onclick="javascript:softphoneBar.m7exCancelConsult('+obj.num+')">'
    }
    msgObj.html(html) ;
    m7$("#" + parentId).append(msgObj);
};


moorCall.moortools.getDate = function(date) {
    var year = date.getFullYear();
    var minute = date.getMinutes();
    var day = date.getDate();
    var hour = date.getHours();
    var month = date.getMonth() + 1;
    var second = date.getSeconds();
    return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) + " "
        + (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) + ":" + (second > 9 ? second : "0" + second);
};
moorCall.moortools.m7CheckHide = function() {
    if(moorCall.moortools.notifyDialogStayRemain <= 0){
        moorCall.moortools.m7HideNotify();
    }
    moorCall.moortools.notifyDialogStayRemain -= 500;
};
moorCall.moortools.m7CheckLoadingHide = function(destExten) {
    var index = moorCall.moortools.index ++;
    var html = ("正在等待<span style='color:#3fb23f;font-weight:bold'>"+destExten+ "</span>接听，" + "请稍后<span style='font-weight:bold'>(00:" + (index<10?("0"+index):index) +")</span>");
    document.getElementById("hollyc5.loading.message").innerHTML = html;
    if(moorCall.moortools.notifyDialogStayRemain <= 0){
        moorCall.moortools.m7HideNotify();
    }
    moorCall.moortools.notifyDialogStayRemain -= 1000;
};
moorCall.moortools.m7ShowLoading = function(destExten, obj) {
    moorCall.moortools.notifyDialogStayRemain = 40000;
    moorCall.moortools.index = 1;
    moorCall.moortools.loading("", "softphonebar", obj || {});
    moorCall.moortools.notifyDialogInterval = setInterval(function(){
        moorCall.moortools.m7CheckLoadingHide(destExten);
    }, 1000);
};
moorCall.moortools.error = function(message) {
    var maxsWidth=380;
    var maxheight=175;
    var bordercolor="#c6c6c6";
    var width=m7$("#softphonebar").offsetWidth;
    var height=m7$("#softphonebar").offsetHeight;
    var coverHeight;
    var softHeight = m7$('#softphonebar').height()
    var bodyHeight = m7$("body").height()
    var minitorHeight = m7$('#moorCall_minitor').height()
    if (softHeight + minitorHeight < bodyHeight) {
        coverHeight = bodyHeight + 50
    } else {
        coverHeight = softHeight + minitorHeight + 50
    }
    var bgObj = m7$("<div></div>")
    m7$('#cover').css({"display": "block", "height": coverHeight})
    bgObj.attr('id','hollyc5.bgDiv');
    bgObj.attr("class", "dialoutBox")
    bgObj.css({
        "width": width + "px",
        "height": height + "px",
    })
    m7$("#softphonebar").append(bgObj);
    var msgObj = m7$("<div></div>")
    msgObj.attr("id","hollyc5.msgDiv");
    msgObj.attr("align","center");
    msgObj.attr("class", "dialoutCenterBox")
    msgObj.css({
        "top": "180px",
        "left": "43%",
        "marginLeft": "-135px",
        "border": "1px solid " + bordercolor,
        "width": maxsWidth + "px",
        "height": maxheight + "px",
    })
    var html = "<div style='height:27px;overflow:hidden;padding-top:15px;padding-right:10px;text-align: left'><span style='font-weight: bold;font-size: 14px; margin: 20px'>提示</span><div style='float:right'><a href='javascript:moorCall.moortools.close();'><img src='../imgs/close_one.png' style='cursor: pointer;border:0px;' /></a></div></div>"+
        "<div style='height:30px;overflow:hidden;margin-top:20px;padding-left:20px;'><div style='float:left;color:#424242;padding-left:5px;font-size:15px;padding-top:4px'>"+message+"</div></div>"+
        "<div style='clear:both;height:1px;overflow:hidden'>&nbsp;</div>"+
        "<div style='padding-left:230px;padding-top:30px;'><a href='javascript:moorCall.moortools.close();' class='confirm'>确定</a></div>"
    msgObj.html(html);

    m7$("body").append(msgObj);
}
moorCall.moortools.initPhoneAgentStatus = function (message) {
    var statusStr = message.split(',').slice(3)
    var html = ""
    for (var i = 0; i < statusStr.length - 1; i++) {
        var item = statusStr[i]
        var statusStrName = item.split(':')[1]
        var statusStrIndex = item.split(':')[0].toString()
        html += '<a href="#" onclick="javascript:phone.m7SetBusy(true, '+statusStrIndex +', this)" id="userStatus_'+[i + 3]+'"  class="RestDisable userStatus">' +
            '<span class="ponit"></span>' + statusStrName + '<span class="line"></span></a>'
    }
    m7$("#phoneConfigStatus").html(html)
}
moorCall.moortools.m7ShowSuccess = function(message) {
    moorCall.moortools.notifyDialogStayRemain = 500;
    moorCall.moortools.success(message);
    moorCall.moortools.notifyDialogInterval = setInterval("moorCall.moortools.m7CheckHide()", 500);
};

moorCall.moortools.m7HideNotify = function() {
	moorCall.moortools.close();
	clearInterval(moorCall.moortools.notifyDialogInterval);
};
moorCall.moortools.m7getUrlVal = function (param) {
    var query = window.location.search;
    var iStart = query.indexOf(param);
    var iLen = param.length;
    if (iStart == -1) {
        return "";
    }
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);
    if (iEnd == -1){
        return query.substring(iStart);
    }
    return decodeURIComponent(query.substring(iStart, iEnd));
};
moorCall.moortools.m7initPhone = function (config) {
    var sendData = {
        Command:"Action",
        Password: config.password,
        ActionID:"Login"+Math.random(),
        BusyType: config.busyType,
        User: config.User,
        ExtenType: config.extenType,
        Action:"GetWSSupport",
    };
    m7$.ajax({
        url: config.proxy_url,
        data: {json: JSON.stringify(sendData)},
        jsonp: "callbackName",
        async: true,
        timeout: 15000,
        dataType: 'jsonp',
        success: function (res) {
            if (res && res.Succeed) {
                if (res.WS_PORT && ('WebSocket' in window || 'MozWebSocket' in window)) {
                    moorCall.Phone.registerPhoneWsEvent(config, res.WS_PORT, res.WS_SECURE_PORT)
                    console.log('websocket')
                } else {
                    moorCall.Phone.registerEvent(config);
                }
            } else {
                moorCall.Phone.registerEvent(config);
                console.log('jsonp')
            }
            isWebsocket = res.Succeed && res.WS_PORT ? true : false
        }
    })

};
moorCall.moortools.m7logout = function(){
    phone.destroy(true)
};
moorCall.moortools.m7afterPhone = function (phone) {
    if (phone) {
        softphoneBar = new moorCall.SoftphoneBar(phone, "softphonebar");
        callProcessor = new moorCall.callProcessor(phone);
        monitor = new moorCall.Monitor(phone)
    }
};