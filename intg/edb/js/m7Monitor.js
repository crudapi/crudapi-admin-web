senvenProvide("moorCall.Monitor");
moorCall.Monitor.monitorTimersHandle=null;
moorCall.Monitor.listenNode = null;
moorCall.Monitor.endListenHandler = null;
sevenDeclare("moorCall.Monitor", null, {
    constructor: function(phone) {
        this.m7Phone = phone;
        this._statusDesc["stReady"] = "签出";
        this._statusDesc["stInner"] = "内部通话";
        this._statusDesc["stNormal"] = "普通通话";
        this._statusDesc["stValidate"] = "验证通话";
        this._statusDesc["stOffline"] = "离线";
        this._statusDesc["stListen"] = "监听";
        this._statusDesc["stRing"] = "呼叫中";
        this._statusDesc["stDialout"] = "外呼通话";
        this._statusDesc["stDialTransfer"] = "外呼转接通话";
        this._statusDesc["stIdle"] = "空闲";
        this._statusDesc["stBusy"] = "忙碌";
        this._statusDesc["stRinging"] = "来电振铃";
        this._statusDesc["stTransfer"] = "转接通话";
        this._statusDesc["stUnavaliable"] = "失效";
        this._statusDesc["stWebcall"] = "网络来电";

        this._init(this.m7Phone);
        var evtHandle = this.m7Phone.register("EvtMonitorQueue", this, "m7ChangedQueue");
        this.m7Handle.push(evtHandle);
        evtHandle = this.m7Phone.register("EvtMonitorPeer", this, "onAgentChanged");
        this.m7Handle.push(evtHandle);
        evtHandle = this.m7Phone.register("EvtMonitorServiceNo", this, "m7ChangedServiceNo");
        this.m7Handle.push(evtHandle);
    },
    destroy: function() {
        for (var i in this.m7Handle) {
            this.m7Phone.m7Noregister(this.m7Handle[i]);
        }
    },
    m7Handle: [],
    m7Phone: null,
    _statusDesc: [],
    _busyType: "0",

    _init:function(phone){
        var tblQueues = document.getElementById("monitor.queues");
        var tblAgets = document.getElementById("monitor.agents");
        var tblServiceNos = document.getElementById("monitor.serviceNos");
        m7MonitorQueuesList = phone.m7MonitorQueues || []
        m7MonitorPeersList = phone.m7MonitorPeers || []
        if(phone && phone.m7MonitorQueues){
            for(var j in phone.m7MonitorQueues)	{
                var item=phone.m7MonitorQueues[j];
                if(!item || !item.queueId)
                    continue;
                var tempArray=[item.members, item.queueName,item.idleAgentCount,item.totalAgentCount,
                    item.queueWaitCount,(item.totalCalls-item.abadonedCalls)];
                var curRow=this.m7QueryQueue(item.queueId,tblQueues,'queueId');
                if(!curRow){
                    this.m7CreateRowCell(tblQueues,item.queueId,tempArray,'queueId');
                }else{
                    this.m7UpdateRowCell(curRow,item.queueId,tempArray,'queueId',true);
                }
            }
        }
        if(phone && phone.m7MonitorServiceNum){
            for(var j in phone.m7MonitorServiceNum)	{
                var item=phone.m7MonitorServiceNum[j];
                if(!item || !item.serviceNo)
                    continue;
                var tempArray=[item.serviceNo,item.inCalls,item.inLost,item.inComplete];
                var curRow=this.m7QueryQueue(item.serviceNo,tblServiceNos,'serviceNo');
                if(!curRow){
                    this.m7CreateRowCell(tblServiceNos,item.serviceNo,tempArray,'serviceNo');
                }else{
                    this.m7UpdateRowCell(curRow,item.serviceNo,tempArray,'serviceNo',true);
                }
            }
        }
        moorCall.Monitor.setInterval();
    },
    displayExtenType:function(userId){
        var displayExtenType='';
        if(phone && phone.m7MonitorPeers){
            var peer = phone.m7MonitorPeers[userId];
            switch (peer.extenType) {
                case "sip":
                    displayExtenType='软电话';
                    break
                case "gateway":
                    displayExtenType='SIP话机/网关';
                    break
                case "Local":
                    displayExtenType=peer.localNo;
                    break
                case "none":
                    displayExtenType='无电话接入';
                    break
            }
        }
        return displayExtenType;
    },
    onAgentChanged: function(monitorAgent) {
        var self=this;
        if(!monitorAgent.userId){
            return;
        }
        if(!monitorAgent) {
            return;
        }
        var tblAgents = document.getElementById("icc.monitor.agents");
        var tempArray=[monitorAgent.DisplayName,monitorAgent.exten,monitorAgent.InComplete,
            monitorAgent.OutComplete,monitorAgent.callNo,monitorAgent.extenType,
            monitorAgent.callStatus,monitorAgent.timestamp,monitorAgent.status,0,
            monitorAgent.channel,monitorAgent.linkedChannel,monitorAgent.login];
        var curRow=self.m7QueryQueue(monitorAgent.userId,tblAgents,'userId');
        if (monitorAgent.user.indexOf('admin') == -1) {
            if (!curRow) {
                self.m7CreateRowCell(tblAgents, monitorAgent.userId, tempArray, 'userId');
            }
            else {
                self.m7UpdateRowCell(curRow, monitorAgent.userId, tempArray, 'userId');
            }
        }
        this.updatePeerNum();
    },
    updatePeerNum: function() {
        var idleNum = 0;
        var totalNum = 0;
        var onlineNum = 0;
        for(var i in phone.m7MonitorPeers) {
            var item=phone.m7MonitorPeers[i];
            var peerState = this.m7DisplayStatus(item.userId);
            if(item.user != null && item.user.indexOf('admin') != -1) {
                continue;
            }
            totalNum++;
            if(peerState != this._statusDesc["stOffline"] && peerState != this._statusDesc["stUnavaliable"] && peerState != this._statusDesc["stReady"]) {
                onlineNum++;
                if(peerState == this._statusDesc["stIdle"]) {
                    idleNum++;
                }
            }
        }
        document.getElementById("icc.monitor.agents.onlinePeer").innerHTML = onlineNum;
        document.getElementById("icc.monitor.agents.idlePeer").innerHTML = idleNum;
        document.getElementById("icc.monitor.agents.totalPeer").innerHTML = totalNum;
    },
    m7ChangedServiceNo: function(monitorServiceNo) {
        var self=this;
        if(!monitorServiceNo || !monitorServiceNo.serviceNo){
            return;
        }
        var tblServiceNos = document.getElementById("icc.monitor.serviceNos");
        var curRow=self.m7QueryQueue(monitorServiceNo.serviceNo,tblServiceNos,'serviceNo');
        var tempArray=[monitorServiceNo.serviceNo,monitorServiceNo.inCalls,monitorServiceNo.inLost,monitorServiceNo.inComplete];
        if(!curRow){
            self.m7CreateRowCell(tblServiceNos,monitorServiceNo.serviceNo,tempArray,'serviceNo');
        }else{
            self.m7UpdateRowCell(curRow,monitorServiceNo.serviceNo,tempArray,'serviceNo');
        }
    },
    m7CreateRowCell:function(tab, qid, arrCellText,key){
        var htmls = [];
        var userEvents = [];
        htmls.push("<table border=0 cellSpacing=0 cellPadding=0 width=100% >");
        htmls.push("<COLGROUP >");
        switch (key) {
            case "userId":
                htmls.push("<col width='9%' /><col width='7%' /><col width='9%' /><col width='9%' /><col width='11%' /><col width='9%' /><col width='9%' /><col width='9%' /><col width='9%' /><col width='19%' />");
                break
            case "queueId":
                htmls.push("<COL width='10%' span='5'>");
                break
            case "serviceNo":
                htmls.push("<COL width='10%' span='4'>");
                break
        }
        htmls.push("</COLGROUP>");
        htmls.push("<tr "+key+"="+qid+" class='even' >");
        switch (key) {
            case "userId":
                for(var i=0; i<10; i++) {
                    if(i==7) {
                        htmls.push("<td id='"+qid+"_7'></td>");
                        if(arrCellText[i] && (arrCellText[6] != "Idle" && !arrCellText[12] || arrCellText[12])){
                            var date = new Date();
                            var identity = date.valueOf();
                            var oldTime=((identity-phone.currentServerTime)-parseFloat(arrCellText[i])*1000)/1000;//设定初始值
                            if(oldTime<0){
                                oldTime=0;
                            }
                            var countTimer={
                                count:oldTime
                            }
                            monitorTimers[qid]=countTimer;
                        }
                    } else if(i==9) {
                        htmls.push("<td id='"+qid+"_9' extension='"+arrCellText[0]+"' status='"+arrCellText[6]+"' curChannel='"+arrCellText[10]+"' linkedChannel='"+arrCellText[11]+"' userId='"+qid+"'>");
                        var textNode
                        if (isSuperAdmin) {
                            textNode = '<a href="javascript:;" class="operation">&nbsp;强拆&nbsp;</a><a href="javascript:;" class="operation">&nbsp;签出&nbsp;</a><a href="javascript:;" class="operation">&nbsp;签入&nbsp;</a>';
                        } else {
                            textNode = '<a href="javascript:;"  class="operation">&nbsp;监听&nbsp;</a><a style="display:none" href="javascript:;" class="operation">&nbsp;结束监听&nbsp;</a>' +
                                '<a href="javascript:;" class="operation">&nbsp;强拆&nbsp;</a><a href="javascript:;" class="operation">&nbsp;抢接&nbsp;</a><a href="javascript:;" class="operation">&nbsp;签出&nbsp;</a><a href="javascript:;" class="operation">&nbsp;签入&nbsp;</a>';
                        }
                        htmls.push(textNode);
                        htmls.push("</td>");
                        userEvents.push(qid);
                    } else if(i==5)	{
                        htmls.push("<td>");
                        var extenType=this.displayExtenType(qid);
                        htmls.push(extenType);
                        htmls.push("</td>");
                    } else if(i==6) {
                        htmls.push("<td");
                        var statusName=this.m7DisplayStatus(qid);
                        if(statusName==this._statusDesc["stBusy"]){
                            if(this.m7Phone.m7PeerState && this.m7Phone.m7PeerState._get(this._busyType) != null) {
                                htmls.push(" style='color: #E09A16'");
                                statusName = this.m7Phone.m7PeerState._get(this._busyType).value;
                            }
                        } else if(statusName==this._statusDesc["stWebcall"] || statusName==this._statusDesc["stInner"]
                            || statusName==this._statusDesc["stRing"] || statusName==this._statusDesc["stRinging"]
                            || statusName== this._statusDesc["stListen"] || statusName==	this._statusDesc["stNormal"]
                            || statusName==this._statusDesc["stDialout"] || statusName==this._statusDesc["stDialTransfer"]
                            || statusName== this._statusDesc["stTransfer"]){
                            htmls.push(" style='color:#FF33FF'");
                        } else if(statusName==this._statusDesc["stIdle"]){
                            htmls.push(" style='color: #4DB690'");
                        }
                        htmls.push(">");
                        htmls.push(statusName)
                        htmls.push("</td>")
                    }  else {
                        htmls.push("<td>");
                        htmls.push(arrCellText[i])
                        htmls.push("</td>")
                    }
                }
                break
            case "queueId":
                var tipTitle = "";
                for(var i=0; i<arrCellText.length; i++){
                    if(i == 0) {
                        for(var j in arrCellText[i]){
                            if(this.m7Phone.m7Base.m7getAgentViaSipNum(j) != null) {
                                tipTitle += this.m7Phone.m7Base.m7getAgentViaSipNum(j).DisplayName + ",";
                            }
                        }
                        if(tipTitle != "") {
                            tipTitle = tipTitle.substring(0, tipTitle.lastIndexOf(","));
                        }
                    } else {
                        if(i == 3) {
                            htmls.push("<td title=" + tipTitle + "> ");
                            htmls.push("<a href='#'>");
                            htmls.push(arrCellText[i]);
                            htmls.push("</a>");
                            htmls.push("</td>");
                        } else {
                            htmls.push("<td ");
                            if(i==4&&arrCellText[i]!='0'){
                                htmls.push(" style='color:#E09A16'");
                            }
                            htmls.push(" >");
                            htmls.push(arrCellText[i])
                            htmls.push("</td>")
                        }
                    }
                }
                break
            case "serviceNo":
                for(var i=0; i<arrCellText.length; i++){
                    htmls.push("<td>");
                    htmls.push(arrCellText[i])
                    htmls.push("</td>")
                }
                break
        }
        htmls.push("</tr>");
        htmls.push("</table>")
        var row = document.createElement("tr");
        for(i = 0; i< tab.childNodes.length; i++) {
            if(tab.childNodes[i].nodeType == 1) {
                if(tab.childNodes[i].tagName == "TBODY") {
                    tab.childNodes[i].appendChild(row);
                }
            }
        }

        var cell = document.createElement("th");
        cell.style.paddingLeft = "1px";
        row.appendChild(cell);
        cell.innerHTML = htmls.join("");
        if(userEvents != '') {
            this.m7ConnectEvent(userEvents);
        }

    },
    m7DisplayStatus:function(userId){
        var displayName='';
        if(phone && phone.m7MonitorPeers){
            var peer= phone.m7MonitorPeers[userId];
            if(peer.login && peer.extenType!='none'){
                if((peer.extenType=='sip' || peer.extenType=='gateway') && peer.register==false){
                    displayName=this._statusDesc["stUnavaliable"];
                }else if(peer.callStatus=='Idle'){
                    if(peer.busyType != "0")	{
                        displayName=this._statusDesc["stBusy"];
                        this._busyType = peer.busyType;
                    }else{
                        displayName=this._statusDesc["stIdle"];
                        this._busyType = "0";
                    }
                }else if(peer.callStatus=='Ringing'){
                    displayName=this._statusDesc["stRinging"];
                }else if(peer.callStatus=='Ring'){
                    displayName=this._statusDesc["stRing"];
                }else if(peer.callStatus=='normal'){
                    displayName=this._statusDesc["stNormal"];
                }else if(peer.callStatus=='inner'){
                    displayName=this._statusDesc["stInner"];
                }else if(peer.callStatus=='dialout'){
                    displayName=this._statusDesc["stDialout"];
                }else if(peer.callStatus=='transfer'){
                    displayName=this._statusDesc["stTransfer"];
                }else if(peer.callStatus=='dialTransfer'){
                    displayName=this._statusDesc["stDialTransfer"];
                }else if(peer.callStatus=='listen'){
                    displayName=this._statusDesc["stListen"];
                }else if(peer.callStatus=='webcall'){
                    displayName=this._statusDesc["stWebcall"];
                }else if(peer.callStatus=='validate'){
                    displayName=this._statusDesc["stValidate"];
                }else {
                    displayName=peer.callStatus+'ass';
                }
            }else if(peer.login && peer.extenType=='none'){
                displayName='';
            }else{
                switch (peer.callStatus) {
                    case "Ring":
                        displayName=this._statusDesc["stRing"];
                        break
                    case "Ringing":
                        displayName=this._statusDesc["stRinging"];
                        break
                    case "inner":
                        displayName=this._statusDesc["stInner"];
                        break
                    case "normal":
                        displayName=this._statusDesc["stNormal"];
                        break
                    case "dialout":
                        displayName=this._statusDesc["stDialout"];
                        break
                    case "dialTransfer":
                        displayName=this._statusDesc["stDialTransfer"];
                        break
                    case "transfer":
                        displayName=this._statusDesc["stTransfer"];
                        break
                    case "listen":
                        displayName=this._statusDesc["stListen"];
                        break
                    case "webcall":
                        displayName=this._statusDesc["stWebcall"];
                        break
                    case "validate":
                        displayName=this._statusDesc["stValidate"];
                        break
                    default:
                        if(!peer.login && (peer.extenType=='gateway' || peer.extenType=='Local')){
                            displayName=this._statusDesc["stOffline"];
                        }else{
                            displayName=this._statusDesc["stReady"];
                        }
                }
            }
        }
        return displayName;
    },
    m7ConnectEvent:function(userEvents) {
        for(var i=0;i<userEvents.length;i++) {
            sevenContent(document.getElementById(userEvents[i]+"_9").firstChild, "onclick", this.listen);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[1], "onclick", this.endListen);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[2], "onclick", this.forceHangup);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[3], "onclick", this.loot);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[4], "onclick", this.m7ForKickout);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[5], "onclick", this.m7Checkin);
        }
    },
    m7ChangedQueue: function(monitorQueue) {
        var self=this;
        if(!monitorQueue || !monitorQueue.queueId)	{
            return;
        }
        var tblAgents = document.getElementById("icc.monitor.queues");
        var curRow=self.m7QueryQueue(monitorQueue.queueId,tblAgents,'queueId');
        var tempArray=[monitorQueue.members, monitorQueue.queueName,monitorQueue.idleAgentCount,monitorQueue.totalAgentCount,
            monitorQueue.queueWaitCount,(monitorQueue.totalCalls-monitorQueue.abadonedCalls)];
        if(!curRow){
            self.m7CreateRowCell(tblAgents,monitorQueue.queueId,tempArray,'queueId');
        }else{
            self.m7UpdateRowCell(curRow,monitorQueue.queueId,tempArray,'queueId');
        }
    },
    endListen:function(event) {
        phone.hangup();
    },
    m7QueryQueue:function(qid,table,key){
        for(var i=0; i<table.rows.length; i++)
        {
            var row = table.rows[i].cells[0].firstChild.rows[0];
            var trID=row.getAttribute(key);
            if(qid==trID){
                return table.rows[i].cells[0].firstChild.rows[0];
            }
        }
        return null;
    },
    m7UpdateOtherRowCell:function(row,qid,arrCellText,key,isFirst){
        if(key=='userId'){
            for(var i=0; i<row.cells.length; i++)
            {
                if(i==6){
                    row.cells[i].setAttribute("extension", arrCellText[0]);
                    row.cells[i].setAttribute("curChannel", arrCellText[7]);
                    row.cells[i].setAttribute("status", arrCellText[4]);
                    row.cells[i].setAttribute("linkedChannel", arrCellText[8]);
                    row.cells[i].setAttribute("userId", qid);
                    if(isFirst){
                        sevenContent(row.cells[i].firstChild, "onclick", this.listen);
                        sevenContent(row.cells[i].childNodes(4), "onclick", this.m7ForKickout);
                        sevenContent(row.cells[i].childNodes(2), "onclick", this.forceHangup);
                        sevenContent(row.cells[i].childNodes(3), "onclick", this.loot);
                        sevenContent(row.cells[i].childNodes(1), "onclick", this.endListen);
                        sevenContent(row.cells[i].childNodes(5), "onclick", this.m7Checkin);
                    }
                }
                else{
                    row.cells[i].innerText =arrCellText[i];
                }
            }
        }
    },
    loot:function(event){
        var o = event.target;
        var curChannel = o.parentNode.getAttribute("linkedChannel");
        var status = o.parentNode.getAttribute("status");
        var userId = o.parentNode.getAttribute("userId");
        if (userId == phone.userId) {
            moorCall.moortools.error('不允许对自身进行该操作')
            return;
        }
        if (sevenGetObject("phone.extenType")=='none') {
            moorCall.moortools.error('执行该操作必须以电话方式登录')
            return;
        }
        if(moorCall.Monitor.m7IsPeerSelf()){
            moorCall.moortools.error('该状态不允许抢接')
            return;
        }
        phone.m7LootCall(curChannel);
    },
    forceHangup:function(event){
        var o = event.target;
        var status = o.parentNode.getAttribute("status");
        var curChannel = o.parentNode.getAttribute("curChannel");
        if (status != "listen" && status != "Idle") {
            phone.m7hangupChann(curChannel);
        } else {
            moorCall.moortools.error('该状态不允许强拆')
        }
    },
    listen:function(event) {
        var self=this;
        if (sevenGetObject("phone.extenType")=='none') {
            moorCall.moortools.error('执行该操作必须以电话方式登录')
            return;
        }
        var o = event.target;
        var userId = o.parentNode.getAttribute("userId");
        var phoneNum = o.parentNode.getAttribute("extension");
        var status = o.parentNode.getAttribute("status");
        var channel = o.parentNode.getAttribute("curChannel");
        if (userId == phone.userId) {
            moorCall.moortools.error('不允许对自身进行该操作')
            return;
        }
        if(moorCall.Monitor.m7IsPeerSelf()){
            moorCall.moortools.error('该状态不允许监听')
            return;
        }
        if (status != "webcall" && status != "inner" && status!="normal" && status!="dialout" && status!="dialTransfer" && status!="transfer") {
            moorCall.moortools.error('该状态不允许监听')
            return;
        }
        if(phone.m7PeerState.m7CurPeerStateKey == "0") {
            moorCall.moortools.error('请先将电话置为忙碌')
            return;
        }
        o.style.display = "none";
        o.nextSibling.style.display = "";
        moorCall.Monitor.endListenHandler = phone.register("EvtEndListen", null, function() {moorCall.Monitor.onEndListen();});
        moorCall.Monitor.listenNode = o;
        phone.listen(channel);
    },
    m7UpdateRowCell:function(row,qid,arrCellText,key,isFirst){
        switch (key) {
            case "userId":
                for(var i=0; i<row.cells.length; i++) {
                    switch (i) {
                        case 7:
                            if(arrCellText[i] && (arrCellText[6] != "Idle" && !arrCellText[12] || arrCellText[12])){
                                var date = new Date();
                                var identity = date.valueOf();
                                var oldTime=((identity-phone.currentServerTime)-parseFloat(arrCellText[i])*1000)/1000;//设定初始值
                                if(oldTime<0){
                                    oldTime=0;
                                }
                                var countTimer={
                                    count:oldTime,
                                    tdNode:row.cells[i]
                                }
                                monitorTimers[qid]=countTimer;
                            }else{
                                delete monitorTimers[qid];
                                row.cells[i].innerText="";
                            }
                            break
                        case 6:
                            var statusName=this.m7DisplayStatus(qid);
                            if(statusName==this._statusDesc["stBusy"] && this.m7Phone.m7PeerState && this.m7Phone.m7PeerState._get(this._busyType) != null){
                                row.cells[i].style.color = "red";
                                statusName = this.m7Phone.m7PeerState._get(this._busyType).value;
                            }else if(statusName==this._statusDesc["stIdle"]){
                                row.cells[i].style.color = "green";
                            } else if (statusName == this._statusDesc["stWebcall"]
                                || statusName == this._statusDesc["stInner"]
                                || statusName == this._statusDesc["stNormal"]
                                || statusName == this._statusDesc["stDialTransfer"]
                                || statusName == this._statusDesc["stDialout"]
                                || statusName == this._statusDesc["stRing"]
                                || statusName == this._statusDesc["stRinging"]
                                || statusName == this._statusDesc["stListen"]
                                || statusName == this._statusDesc["stTransfer"]) {
                                row.cells[i].style.color = "#FF33FF";
                            }else{
                                row.cells[i].style.color = "";
                            }
                            row.cells[i].innerHTML = statusName;
                            break
                        case 5:
                            var extenType = this.displayExtenType(qid);
                            row.cells[i].innerHTML = extenType;
                            break
                        case 9:
                            row.cells[i].setAttribute("linkedChannel", arrCellText[11]);
                            row.cells[i].setAttribute("extension", arrCellText[0]);
                            row.cells[i].setAttribute("curChannel", arrCellText[10]);
                            row.cells[i].setAttribute("status", arrCellText[6]);
                            if(isFirst){
                                sevenContent(row.cells[i].firstChild, "onclick", this.listen);
                                sevenContent(row.cells[i].childNodes(1), "onclick", this.endListen);
                                sevenContent(row.cells[i].childNodes(4), "onclick", this.m7ForKickout);
                                sevenContent(row.cells[i].childNodes(3), "onclick", this.loot);
                                sevenContent(row.cells[i].childNodes(2), "onclick", this.forceHangup);
                                sevenContent(row.cells[i].childNodes(5), "onclick", this.m7Checkin);
                            }
                            break
                        default:
                            row.cells[i].innerHTML = arrCellText[i];

                    }
                }
                break
            case "queueId":
                var tipTitle = "";
                for(var i = 1; i<row.cells.length; i++) {
                    if(i == 2) {
                        row.cells[i].title = tipTitle;
                        row.cells[i].innerHTML = "<a href='#'>" + arrCellText[i + 1] + "</a>";
                    } else {
                        row.cells[i].innerText =arrCellText[i + 1];
                        if(i==3 &&arrCellText[i + 1]!='0'){
                            row.cells[i].style.color='red';
                        }else{
                            row.cells[i].style.color='';
                        }
                    }
                }
                for(var j in arrCellText[0]){
                    if(this.m7Phone.m7Base.m7getAgentViaSipNum(j) != null) {
                        tipTitle += this.m7Phone.m7Base.m7getAgentViaSipNum(j).DisplayName + ",";
                    }
                }
                if(tipTitle != "") {
                    tipTitle = tipTitle.substring(0, tipTitle.lastIndexOf(","));
                }
                break
            case "serviceNo":
                for(var i=1; i<row.cells.length; i++) {
                    row.cells[i].innerText =arrCellText[i];
                }
                break
        }
    },
    m7ForKickout:function(event) {
        var o = event.target;
        var sipNo = o.parentNode.getAttribute("extension");
        var username = o.parentNode.getAttribute("username");
        var userId = o.parentNode.getAttribute("userId");
        if (userId == phone.userId) {
            moorCall.moortools.error('不允许对自身进行该操作')
            return;
        }
        if(phone && phone.m7MonitorPeers){
            var peer=phone.m7MonitorPeers[userId];
            if(!peer.login && peer.extenType!='Local'  && peer.extenType!='gateway'){//离线的可以签出
                moorCall.moortools.error('不允许对签出坐席进行该操作')
                return;
            }
        }
        phone.kick(userId);
    },
    m7Checkin:function(event) {
        var o = event.target;
        var username = o.parentNode.getAttribute("username");
        var sipNo = o.parentNode.getAttribute("extension");
        var userId = o.parentNode.getAttribute("userId");
        if (userId == phone.userId) {
            moorCall.moortools.error('不允许对签出坐席进行该操作')
            return;
        }
        if(phone && phone.m7MonitorPeers){
            var peer=phone.m7MonitorPeers[userId];
            if(peer.login){
                moorCall.moortools.error('不允许对签入坐席进行该操作')
                return;
            }
            if(!peer.login && peer.extenType == 'Local'){
                return;
            }
        }
        phone.m7pick(userId);
    },
});
moorCall.Monitor.onEndListen=function() {
    var o = moorCall.Monitor.listenNode;
    o.nextSibling.style.display = "none";
    o.style.display = "";
    phone.m7Noregister(moorCall.Monitor.endListenHandler);
};
moorCall.Monitor.getTimer=function(countTimer){
    var minute="0";
    var second="0";
    var hour="0";
    countTimer = parseInt(countTimer)+1;
    hour=parseInt(countTimer/3600);
    minute = parseInt((countTimer%3600)/60);
    second = (countTimer%3600)%60;
    var mtime = (hour<10)? "0" + hour : hour;
    mtime += ":";
    mtime += (minute<10)? "0" + minute : minute;
    mtime += ":";
    mtime += (second<10)? "0" + second : second;

    return mtime;
};
moorCall.Monitor.setInterval=function(){
    if (moorCall.Monitor.monitorTimersHandle) {
        window.clearInterval(moorCall.Monitor.monitorTimersHandle);
    }
    moorCall.Monitor.monitorTimersHandle = window.setInterval("moorCall.Monitor.m7DoCallTimer()",1000);
};
moorCall.Monitor.m7DoCallTimer=function(){
    if(monitorTimers){
        for(var i in monitorTimers) {
            if(document.getElementById(i+"_7") != null) {
                document.getElementById(i+"_7").innerText = moorCall.Monitor.getTimer(monitorTimers[i].count);
                monitorTimers[i].count++;
            }
        }
    }
};
moorCall.Monitor.m7IsPeerSelf=function() {
    var me=phone.userId;
    if(me && phone && phone.m7MonitorPeers){
        var peer=	phone.m7MonitorPeers[me];
        if(peer.callStatus=='Ring' ||peer.callStatus=='Ringing' || peer.callStatus=='inner'
            ||peer.callStatus=='normal'||peer.callStatus=='dialout'||peer.callStatus=='dialTransfer'
            ||peer.callStatus=='transfer'||peer.callStatus=='listen'){
            return true;
        }
    }
    return false;
};




