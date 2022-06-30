senvenProvide("moorCall.Phone");

sevenDeclare("moorCall.Phone", null, {

    m7MonitorServiceNum: [],
    m7MonitorQueues: [],
    m7AccountCall: null,
    m7MonitorPeers: [],
    m7NormalRinging: null,
    m7ConsultationRinging: null,
    m7ListenLink: null,
    m7PeerState: null,
    m7Invalid: null,
    m7Hold: null,
    m7Base: null,
    m7InnerRing: null,
    m7ConsultationLink: null,
    m7InnerLink: null,
    m7InnerRinging: null,
    m7DialoutLink: null,
    m7ThreeWayCallLink: null,
    m7NormalLink: null,
    m7Abate: null,
    m7ListenRing: null,
    m7NormalRing: null,
    callObject: {},
    m7IsWaitingEvent: false,
    m7CurentChannel: null,
    m7Destroyed: false,
    m7OtherChannel: null,
    m7IsSetbusy: false,
    m7BusyType: '0',
    m7CallId: null,
    m7IsLooter: false,
    m7IccCount:0,
    m7IsInvestigatting: false,
    dialoutData: null,
    m7Handle: [],
    m7IsRing: false,
    m7IsCallingOut:false,
    constructor: function(config) {
        var evtHandle = this.register("EvtAutoBusyTime", this, "m7AutoBusyTimeChanged");
        this.m7Handle.push(evtHandle);
        this.m7InitConfig(config);
        this._evtXhr = moor._xhrObj();
        if (!isWebsocket) {
            this.m7WaitEvent();
        }
    },
    m7InitConfig: function(config) {
        for (var i in config) {
            this[i] = config[i];
        }
    },
    m7stopEvent: function() {
        if (this._evtXhr) {
            this._evtXhr.abort();
            this._evtXhr = null;
        }
    },
    destroy: function(removeQueue) {
        if (!this.m7Destroyed) {
            for (var i in this.m7Handle) {
                this.m7Noregister(this.m7Handle[i]);
            }

            this.m7stopEvent();
            this.m7exit(this.loginName, removeQueue);
            this.m7Destroyed = true;
        }
    },
    m7RemoteRing: function(callId, remoteId) {
        this._outboundId = callId;
    },
    register: function(evtType, obj, method) {
        return senvenMSubscribe(evtType, obj, method);
    },
    m7Register: function(info) {
    },
    m7exit: function(loginName, removeQueue) {
        var self = this;
        if (!loginName) {
            loginName = self.loginName;
        }
        var returnUrl = "./login.html";
        if(removeQueue == undefined) {
            removeQueue = true;
        }
        var phoneJson = {
            Command:"Action",
            Action:"Logoff",
            Account: self.accountId,
            SessionID:self.uniqueId,
            User: self.userId,
            PBX: self.pbx_in_ip,
            ActionID:"Logoff"+Math.random(),
            QueueRemove:removeQueue
        };
        var url = this.proxy_url;
        var result = false;
        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: 15000,
            success: function(response, ioArgs) {
                window.userLogin = false
                if (window.webPhone) {
                    window.webPhone.destroy()
                }
                window.location = returnUrl;
            },
            error: function(response, ioArgs) {
                result = true;
                window.location = returnUrl;
            }
        });
    },
    m7pick: function (userId) {
        console.debug("签入座席"+userId);
        var self = this;
        var peer = self.m7MonitorPeers[userId];
        if(peer == null || peer.localNo == null || peer.localNo == ""){
            moorCall.moortools.error("不能对没有直线号码的座席做签入操作");
            return;
        }
        this.m7SendAction("SignIn", {
            User: userId
        },function(response, ioArgs) {
            if (response.Succeed) {
                moorCall.moortools.m7ShowSuccess("座席签入成功");
            } else {
                if(response.Expired && !isWebsocket){
                    self.m7Relogin();
                }
            }
        });
    },
    m7Noregister: function(handle) {
        sevenMUsubscribe(handle);
    },
    m7eventHandler: function(evtJsons) {
        var errorItem = ''
        try{
            var self = this;
            evtJsons.forEach(function (item) {
                errorItem=item
                if(self.m7Base == null) {
                    self.m7Base = new moorCall.stateElement.base(self);
                }
                self.m7Base.m7ChooiceState(item);
            })
        } catch (e){
            if (e && e.stack) {
                var currentTime = moorCall.recordError.getCurrentTime();
                var data = {error: e, errorTime: currentTime, flag: "pageError", errorItem: errorItem}
                moorCall.recordError.dataHandle(data)
            }
            console.dir(e);
        }
    },
    m7WaitEvent: function() {
        if (this.m7IsWaitingEvent) {
            return;
        }
        if (!this.uniqueId || !this.userId){
            return
        }
        if (this._evtXhr == null) return;
        this.m7IsWaitingEvent = true;
        var self = this;
        var url = this.proxy_url;
        var phoneJson = {
            Command: "Action",
            Action: "GetState",
            SessionID: this.uniqueId,
            ActionID: "GetState"+Math.random(),
            User: this.userId
        };
        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: 15000,
            success: function(response, ioArgs){
                moorCall.recordError.sendActionToPbx()
                self.m7IccCount = 0;
                self.display("");
                if (!response) {
                    return;
                }
                var datas=response;
                var _response = datas.Response;
                if (!_response) {
                    _response = datas;
                }
                if (_response.Succeed && !_response.HasEvent) {

                } else if (!_response.Succeed) {
                    if (_response.Expired) {
                        var currentTime = moorCall.recordError.getCurrentTime();
                        var errorData = {eventJson: "GetState", catchRecord: _response.Message, errorTime: currentTime}
                        moorCall.recordError.dataHandle(errorData)
                        self.m7Relogin();
                        self.m7IsWaitingEvent=false;
                        return;
                    }
					window.setTimeout(function () {
						self.m7IsWaitingEvent = false;
 						self.m7WaitEvent();
                    }, 2000)
                    return
                } else {
                    if (_response.Kick) {
                        var comments = "";
                        if(_response.Comments)
                            comments = _response.Comments;
                        if(comments == "ukick" || comments == "ekick")
                            moorCall.moortools.error("您当前的会话已经失效,导致该问题的原因是别的座席使用相同的帐号（或相同的分机）登录了");
                        else
                            moorCall.moortools.error("您当前的会话已经失效,导致该问题的原因可能是被管理员强制签出");
                        window.userLogin = false
                        if (window.webPhone) {
                            window.webPhone.destroy()
                        }
                        self.destroy();
                        window.location = "./notify.html";
                        return;
                    } else {
                        var events = datas.Event;
                        if(events != null) {
                            self.m7eventHandler(events);
                        }
                    }

                }
                self.m7IsWaitingEvent = false;
                self.m7WaitEvent();
            },

            error: function(response, ioArgs){
                self.m7IsWaitingEvent = false;
                window.setTimeout(function(){
                    self.m7IccCount++;
                    if (self.m7IccCount > 3) {
                        self.display("连接服务器超时，可能是您的网络问题，正在尝试重新连接...");
                        var currentTime = moorCall.recordError.getCurrentTime();
                        var errorData = {eventJson: "GetState", catchRecord: response, errorTime: currentTime}
                        moorCall.recordError.dataHandle(errorData)
                    }
                    self.m7WaitEvent();
                }, 1000);
                return;
            }
        });
    },
    m7hangupChann: function(channel){
        var self = this;
        console.debug("强拆"+channel);
        var params = {
            Channel: channel
        };
        var onload = function(response, ioArgs) {
            if (!response.Succeed) {
              if(response.Expired && !isWebsocket){
                self.m7Relogin();
              }
            }
        };
        if (this.m7Destroyed) return;
        var phoneJson = {};
        var url = this.proxy_url;
        m7$.extend(phoneJson,{
            Command:"Action",
            Action:"Hangup",
            Account:this.accountId,
            ActionID:"ForceHangup" + Math.random(),
            PBX:this.pbx_in_ip,
            SessionID:this.uniqueId
        });
        m7$.extend(phoneJson,params);
        if (onload == null) {
            onload = function(response, ioArgs) {
            }
        }

        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: 15000,
            success: onload,
            error: function(response, ioArgs) {
                console.dir(response);
            }
        });

    },
    display:function(message){
        var netMessage=m7$("#netMessage");
        if(netMessage){
            netMessage.html(message)
        }
    },
    m7Relogin: function(){
        if(this._isRelogin) {
            return;
        }
        var self = this;
        self._isRelogin = true;
        var url = this.proxy_url;
        var phoneJson = {
            Command:"Action",
            Action:"Login",
            User:self.loginName,
            Password:self.password,
            ActionID:"Login"+Math.random(),
            ExtenType:self.extenType,
            AutoBusy:false,
            BusyType: prePhonebarStatus.toString(),
            Monitor: self.Monitor
        };
        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: 15000,
            success: function(response, ioArgs) {
                var _response = response;
                if (_response.SessionID) {
                    isCtiRelogin = true
                    self.uniqueId = _response.SessionID;
                    var date = new Date();
                    var identity = date.valueOf();
                    self.currentServerTime = identity - _response.Timestamp*1000;
                    if (_cti_peerstate == 1) {
                        if(self.m7PeerState.m7CurPeerStateKey == '0') {
                            self.m7SetBusy(false,self.m7PeerState.m7CurPeerStateKey);
                        } else if(self.m7PeerState.m7CurPeerStateKey != '99') {
                            self.m7SetBusy(true,self.m7PeerState.m7CurPeerStateKey);
                        }
                    }
                    // moorCall.moortools.initPhoneAgentStatus(_response.PhonebarConfig);
                    self.m7WaitEvent();
                } else if (!_response.Succeed) {
                    var code = _response.Result;
                    if(code){
                        if(code == 400) {
                            moorCall.moortools.error("没有对应接听设备" + code);
                        } else if(code == 404) {
                            moorCall.moortools.error("密码，账号，或者proxy_url不正确" + code);
                        } else if(code == 406) {
                            moorCall.moortools.error("坐席license版本问题，您登陆坐席的版本不支持使用软电话条" + code);
                        } else if(code == 601){
                            moorCall.moortools.error("您的账户通话座席登录数已达最大或者已经到期" + code);
                        } else if(code == 602){
                            moorCall.moortools.error("您的账户无通话座席登录数已达最大或者已经到期" + code);
                        } else if(code == 603){
                            moorCall.moortools.error("账户license到期，请联系管理员" + code);
                        }
                    } else {
                        moorCall.moortools.error("您当前的会话已经失效,导致该问题的原因可能是被管理员强制签出");
                    }
                    window.userLogin = false
                    if (window.webPhone) {
                        window.webPhone.destroy()
                    }
                    window.location = "./notify.html";
                    self.destroy();
                }
                self._isRelogin = false;
            },
            error: function(response, ioArgs) {
                console.debug("ACTION返回错误[%s]", response);
            }
        });

    },
    m7Ring: function(callId, remoteId) {
        this.oldInboundId = this._inboundId;
        console.debug("控件onRing返回[callId:%s,remoteId:%s]", callId, remoteId);
        this._inboundId = callId;
    },
   m7AutoBusyTimeChanged: function(autoBusyTime) {
        this.autoBusyTime = autoBusyTime;
    },
    consult: function(phoneNum, mode) {
        var self = this;
        if(phoneNum.substr(0,1) == '9' && mode == 'external') {
            var firstExten = phoneNum ? phoneNum.slice(1, 2) : ''
            if ((firstExten && firstExten !== '1' && firstExten !== '0' && firstExten !== '9' && phoneNum.length === 6) || phoneNum.length <= 5) { // 5位号码除了1，0，9开头的以外，其他的都转内线
                phoneNum = phoneNum.substr(1)
            }
        }
        if(phoneNum.length > 4 && mode != 'skillgroup') {
            moorCall.moortools.m7ShowLoading(phoneNum, {num:phoneNum,type:'consult'});
            fromCid = this.sipNo + '@' + this.didNum;
        } else if(phoneNum.length <= 4 && mode != 'skillgroup'){
            if(phoneNum.substr(0,1) != '9') {
                moorCall.moortools.m7ShowLoading("工号  " + phoneNum + " ", {num:phoneNum,type:'consult'});
            } else {
                moorCall.moortools.m7ShowLoading(phoneNum, {num:phoneNum,type:'consult'});
            }
        } else if(mode == 'skillgroup') {
            moorCall.moortools.m7ShowLoading(phoneNum, {num:phoneNum,type:'consult'});
        }
        this.m7SendAction("Consult", {
            FromExten: self.sipNo,
            Exten: phoneNum,
            UserID: self.userId,
            Version: 'New',
            Timeout: 60000
        },function(response, ioArgs) {
            if (response.Succeed) {
                if (response.Version && response.Version === 'New') { // response.IsSupportCancel判断不能写外层，因为IsSupportCancel是后端加了才会显示，其他的还是默认隐藏
                    if (response.IsSupportCancel && response.IsSupportCancel === 'True') {
                        m7$('#cancelConsult').show().css({'display': 'block'}) // 显示取消咨询的按钮（其他情况默认隐藏）
                    } else {
                        m7$('#cancelConsult').hide()
                    }
                    // 为啦兼容老版电话条 如果有Version说明是新的咨询，需要通过事件来通知是成功还是失败
                } else {
                    moorCall.moortools.close();
                    m7$('#cancelConsult').hide()
                    moorCall.moortools.m7ShowSuccess("咨询成功");
                    self.m7changeState("stConcultTalking");
                }
            } else {
                moorCall.moortools.close();
                moorCall.moortools.error("咨询失败");
                if(response.Expired && !isWebsocket) {
                    self.m7Relogin();
                }
            }
        },function(response, ioArgs) {
            moorCall.moortools.close();
            moorCall.moortools.error("咨询失败");
        });
    },

    cancelConsult: function(exten){
        // m7OtherChannel当前会话的标志值
        var self = this
        var fromExten = this.User?this.User.substring(0,this.User.indexOf('@')):''
        if (self.m7OtherChannel) {
            this.m7SendAction("CancelConsult", {
                Channel: self.m7OtherChannel,
                ConsultExten: exten + '',
                FromExten: fromExten,
                UserID: self.userId,
                Version: 'New',
                Timeout: 60000
            },function(response, ioArgs) {
                if (response.Succeed) {
                    moorCall.moortools.close();
                    moorCall.moortools.m7ShowSuccess("取消咨询成功")
                } else {
                    alert("取消咨询失败!")
                    // moorCall.moortools.error("取消咨询失败!");
                    if(response.Expired && !isWebsocket) {
                        self.m7Relogin();
                    }
                }
            },function(response, ioArgs) {
                alert("取消咨询失败!")
                // moorCall.moortools.error("取消咨询失败");
            });
        }
    },

    batchDialout: function(phoneNum, data) {
        var self = this;
        if(phoneNum && data) {
            var context = data.context;
            var type = data.type;
            var callbackSuccFun = data.callbackSuccFun;
            var callbackFailFun = data.callbackFailFun;
            var callbackObj = data.callbackObj;

            this.m7SendAction("BatchDialout", {
                BatchDialoutType: type,
                Context: context,
                CallNumber: phoneNum,
                Timeout: 120000,
                Async: "true"
            },function(response, ioArgs) {

                if (response.Succeed) {
                    console.debug("批量外呼[%s]成功", phoneNum);
                    callbackSuccFun.call(callbackObj, response.Message);
                } else {
                    callbackFailFun.call(callbackObj, 0);
                }
            },function(response, ioArgs){
                callbackFailFun.call(callbackObj, 0);
            });
        }
    },
    playDtmf: function(num) {
        sipPhone.playDtmf(num);
    },
    m7StopSound: function(){
        try {
            if (document.soundPlayer) {
                document.soundPlayer.stop();
            }
        } catch (e) {
            console.debug(e);
        }
    },
    answer: function() {

    },
    dialout: function(phoneNum,type) {
        if(type == 'smallPhone'){
            //小号
            console.debug("呼叫："+phoneNum);
            var self = this;
            if (self.User&&self.User.indexOf("@") != -1) {
                var exten = self.User.split("@")[0];
            }
            var sendData = {
                exten:exten,
                called: phoneNum,
                cdrVar: phoneNum,
                actionId:"xiaohao",
            }
            //https的域名https://xiaohaobar.7moor.com
            var account = "N00000012351";//需要调整成自己账号的账户编号
            var secret = "a0d29a50-03b5-11e7-a6f4-5f4d6bb88e4b";//需要调整成自己账号的账户秘钥
            var timestamp = new Date().Format('yyyyMMddhhmmss');
            var sig_ = md5(account + secret + timestamp);
            var sig =sig_.toUpperCase();
            var authorization = Base64.encode(account + ':' + timestamp);
            m7$.ajax({
                url: "https://apis.7moor.com/v20160818/rlxh/dialout/" + account + "?sig="+ sig,
                type: 'post',
                data: JSON.stringify(sendData),
                dataType:'json',
                contentType: "application/json;charset=utf-8",
                headers: { 'Authorization': authorization},
                jsonp: 'callback',
                success:function(data){
                    if(data.Succeed == true){
                        console.debug("外呼[%s]成功", phoneNum);
                    } else {
                        console.debug("外呼失败");
                        moorCall.moortools.error(data.message);
                    }
                },
                error: function (data) {
                    alert("外呼失败")
                }
            });
        }else{
            //普通
            var self = this;
            var call_type = "";
            var firstNum = phoneNum.slice(0, 1)
            if(phoneNum.length < 5) {
                var peer = this.m7Base.m7getPhoneUserViaExten(phoneNum);
                if(!peer) {
                    phoneNum = "9" + phoneNum;
                    call_type = "dialout";
                    self.callObject.originCallNo = self.didNum;
                    self.callObject.originCalledNo = phoneNum;
                } else {
                    call_type = "inner";
                }
            } else if (phoneNum.length === 5 && firstNum !== '1' && firstNum !== '0' && firstNum !== '9') { // 号码是5位时,并且工号开头不能是1，0，9，判断是内部通话,避免10086等
                call_type = 'inner'
            } else {
                phoneNum = "9" + phoneNum;
                call_type = "dialout";
                self.callObject.originCallNo = self.didNum;
                self.callObject.originCalledNo = phoneNum;
            }

            this.m7SendAction("Originate", {
                Channel: "SIP/" + self.sipNo,
                Context: self.accountId,
                Exten: phoneNum,
                Priority: '1',
                UserID: self.userId,
                Timeout: 60000,
                Async: "true",
                CallType: call_type,
				HasCdrVar:true,
				ActionID:'123456'
            },function(response, ioArgs) {
                var json = response;
                if (!response.Succeed) {
                    if(response.Expired){
                        self.m7Relogin();
                    }
                }
            });
        }
    },
  m7SendAction: function(action, params, onload, onerror) {
        if (this.m7Destroyed) {
            return;
        }
        var phoneJson = {};
        var url = this.proxy_url;
        m7$.extend(phoneJson,{
            Command:"Action",
            Action:action,
            Account:this.accountId,
            ActionID:action+Math.random(),
            PBX:this.pbx_in_ip,
            SessionID:this.uniqueId
        });

        m7$.extend(phoneJson,params);

        var timeout = params.Timeout?params.Timeout:60000;

        if (onload == null) {
            onload = function(response, ioArgs) {
            }
        }

        if(onerror == null){
            onerror = function(response, ioArgs) {
            }
        }

        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: timeout,
            success: onload,
            error: onerror
        });
    },
    stopConsult: function() {
        var self = this;
        this.m7SendAction("StopConsult",  {
            FromExten: self.sipNo,
            UserID: self.userId,
            Timeout: 60000
        },function(response, ioArgs) {
            if (response.Succeed) {
                if(response.Message != undefined) {
                    if(response.Message == "Idle") {
                        self.m7changeState("stInvalid");
                    } else {
                        self.m7changeState("stTalking");
                    }
                } else {
                    self.m7changeState("stTalking");
                }
            } else {
                if(response.Expired && !isWebsocket){
                    self.m7Relogin();
                }
                moorCall.moortools.error("结束咨询通话失败");
            }
        });
    },
    hangup: function() {
        var self = this;
        this.m7SendAction('Hangup', {
            Channel: self.m7CurentChannel
        }, function(response, ioArgs) {
            if (!response.Succeed) {
              self.callObject = {};
              if(response.Expired && !isWebsocket){
                self.m7Relogin();
              }
            }
        });
    },
    hold: function() {
        var self = this;
        this.m7SendAction("Hold", {
            UserID: self.userId,
            Channel: self.m7OtherChannel,
            Async: "true"
        },function(response, ioArgs) {
            if (response.Succeed) {
                self._stateBeforeHold = self.m7Base.m7CurrentCallState.m7CallState;
                self.m7changeState("stHold");
            } else {
                if(response.Expired && !isWebsocket){
                    self.m7Relogin();
                }
            }
        });
    },
    unhold: function() {
        var self = this;
        this.m7SendAction("Unhold", {
            UserID: self.userId,
            Channel: self.m7OtherChannel,
            Async: "true"
        },function(response, ioArgs) {
            if (response.Succeed) {
                // self.m7changeState(self._stateBeforeHold);
                self.m7changeState('stTalking');
            } else {
                if(response.Expired && !isWebsocket){
                    self.m7Relogin();
                }
            }
        });
    },
    investigate: function() {
        if(this.m7IsInvestigatting) {
            return;
        } else {
            this.m7IsInvestigatting = true;
        }
        var self = this;
        var userId = self.userId;
        var context = self.accountId + "-investigate";
        self.m7SendAction('Transfer', {
            Exten: 's',
            Channel: self.m7OtherChannel,
            CallType: "investigate",
            UserID: userId,
            Context: context
        }, function(response, ioArgs) {
            if (!response.Succeed) {
              self.m7IsInvestigatting = false;
              if(response.Expired && !isWebsocket){
                self.m7Relogin();
              }
            }
        });
        this.m7IsInvestigatting = false;
    },
    transfer: function(destExten, mode, values) {
        var self = this;
        var fromCid = self.callObject.originCallNo;
        if(destExten.substr(0,1) == '9' && mode == 'external') {
            var firstExten = destExten ? destExten.slice(1, 2) : ''
            if ((firstExten && firstExten !== '1' && firstExten !== '0' && firstExten !== '9' && destExten.length === 6) || destExten.length <= 5) { // 5位号码除了1，0，9开头的以外，其他的都转内线
                destExten = destExten.substr(1)
            }
        }

        if(destExten.length > 4 && mode != 'skillgroup') {
            moorCall.moortools.m7ShowLoading(destExten);
            fromCid = this.sipNo + '@' + this.didNum;
        } else if(destExten.length <= 4 && mode != 'skillgroup'){
            if(destExten.substr(0,1) != '9') {
                moorCall.moortools.m7ShowLoading("工号  " + destExten + " ");
            } else {
                moorCall.moortools.m7ShowLoading(destExten);
            }
        } else if(mode == 'skillgroup') {
            destExten = destExten.substr(1)
            moorCall.moortools.m7ShowLoading(destExten);
        }

        var synData = moor.objectToQuery(values);
        var context = "";
        context = this.accountId;
        var workSheetId;
        var customerId;
        if(self.callObject && self.callObject.data){
            workSheetId = self.callObject.data.workSheetId;
            customerId = self.callObject.data.customerId;
        }
        self.m7SendAction('Transfer', {
            WorkSheetID: workSheetId?workSheetId:"",
            CustomerID: customerId?customerId:"",
            Exten: destExten,
            Channel: self.m7OtherChannel,
            ExtraChannel: self.m7CurentChannel,
            UserID: self.userId,
            Context: context
        }, function(response, ioArgs) {
            moorCall.moortools.close();
            if (response.Succeed) {
                moorCall.moortools.m7ShowSuccess("转接成功");
            } else{
                var message = "";
                if(response.Message == "310") {
                    message = "未配置外呼线路";
                } else if(response.Message == "311"){
                    message = "转接的用户忙";
                } else if(response.Message == "312"){
                    message = "转接的用户未签入";
                } else if(response.Message == "313"){
                    message = "转接的用户正在通话";
                } else if(response.Message == "314"){
                    message = "转接的用户没有以通话方式登录";
                } else if(response.Message == "315"){
                    message = "无法呼通转接的用户";
                } else if(response.Message == "316"){
                    message = "转接用户不存在";
                } else {
                    message = "";
                }

                if(message == "") {
                    moorCall.moortools.error("转接失败");
                } else {
                    moorCall.moortools.error("转接失败：" + message);
                }
                if(response.Expired && !isWebsocket){
                    self.m7Relogin();
                }
            }
        },function(response, ioArgs) {
            moorCall.moortools.close();
        });
    },
    m7CalloutFail: function(callId, cause) {
        if (this.state == "stConsulting") {
            if (this._inboundId) {
                sipPhone.ChangeCurrentCall(this._inboundId);
                this.m7changeState("stTalking");
            }
        }
    },
    listen: function(channel) {

        var self = this;
        if(this.m7PeerState.m7CurPeerStateKey == "0") {
            moorCall.moortools.error("请先将电话置为忙碌");
            return;
        }
        this.m7SendAction("Originate", {
            Channel: "SIP/" + self.sipNo,
            Application: "ChanSpy",
            Data: channel+"|bq",
            UserID: self.userId,
            Callerid: self.sipNo,
            Async: "true"
        },function(response, ioArgs) {
            if (response.Succeed) {
                console.debug("监听[%s]成功", channel);
                self.m7OtherChannel = channel;
            } else {
                console.debug("监听[%s]失败"+response.Message, channel);
                if(response.Expired && !isWebsocket){
                    self.m7Relogin();
                }
            }
        });
    },
    kick: function(exten){
        var self = this;
        this.m7SendAction("Kick", {
            Exten: exten
        },function(response, ioArgs) {
            if (response.Succeed) {
                var peer = self.m7MonitorPeers[exten];
                if(peer){
                    peer.C5Status = "";
                    peer.callNo = "";
                    peer.callStatus = "Idle";
                    var date = new Date();
                    var identity = date.valueOf();
                    peer.timestamp = identity/1000;
                    linked = false;
                    peer.channel = "";
                    peer.linkedChannel = "";
                    console.debug("kickoff");
                    senvenMPublish("EvtMonitorPeer",[peer]);
                    self.m7Base.m7UpdQueueInfo();
                }
            } else {
                if(response.Expired && !isWebsocket){
                    self.m7Relogin();
                }
            }
        });
    },
    m7PlaySound: function(){
        try {
            if (document.soundPlayer) {
              document.soundPlayer.play();
            }
        } catch (e) {
            console.debug(e);
        }
    },
    threeWayCall: function(phoneNum) {
        var self = this;
        this.m7SendAction("ThreeWayCall",
            {
                FromExten: self.sipNo,
                UserID: self.userId,
                Exten: phoneNum,
                Timeout: 60000
            },function(response, ioArgs) {
                if (response.Succeed) {
                    self.m7changeState("stThreeWayTalking");
                } else {
                    if(response.Expired && !isWebsocket){
                        self.m7Relogin();
                    }
                    moorCall.moortools.error("三方通话失败");
                }
            });
    },
    m7SetBusy: function(isBusy,busyType, mySelf) {
        if (m7$('.dialoutCenterBox').length >= 1){
            return
        }
        if (m7$(".HangupEnable").css('display') == 'inline-block') { // 通话中不能切换状态~
            moorCall.moortools.error('该状态下不能切换状态!')
            return
        }
        if(this.m7IsSetbusy) {
            return;
        } else {
            this.m7IsSetbusy = true;
        }
        if (busyType == undefined || busyType == 'undefined') {
            moorCall.moortools.error('状态有误，请重新登录')
            return;
        }
        var self = this;
        var params = {
            "Exten": self.userId,
            Busy: isBusy,
            BusyType: "" +busyType
        };
        self.m7SendAction('Busy', params, function(response, ioArgs) {
            var res = response;
            if (!response.Succeed) {
                moorCall.moortools.error('切换状态失败！')
              if(response.Expired){
                self.m7Relogin();
              }
            } else if (response.Succeed){
                prePhonebarStatus = busyType
                changePhoneBarStatus(busyType)
            }
        });
        this.m7IsSetbusy = false;
        this.m7BusyType = busyType
    },
    m7ToIVR: function() {
        var self = this;
        var context = userInfo.accountId + "-validate";
        var actionName = "Validate";
        if(userInfo.accountId == "Q000000003893" || userInfo.accountId == "B000000006069"){
            actionName = "Check";
        }
        self.m7SendAction(actionName, {
            Exten: 's',
            Channel: self.m7OtherChannel,
            Context: context
        }, function(response, ioArgs) {
            if (!response.Succeed) {
              if(response.Expired && !isWebsocket){
                self.m7Relogin();
              }
              return ERR_NO_SUCH_CHANNEL;
            }
        });
        this.m7IsInvestigatting = false;
        return SUCCESS;
    },
    m7Phone_toMenu: function(exten) {
        var self = this;
        //var exten = "";
        var actionName = "IvrMenu";
        var phoneJson = {
            Channel: this.m7OtherChannel,
            Context: exten
        };
        this.m7SendAction(actionName, phoneJson,function(v) {
            if (v.Succeed) {
                moorCall.moortools.m7ShowSuccess("\u6765\u7535\u6b63\u5728\u8f6c\u9a8c\u8bc1\uff0c\u8bf7\u7a0d\u540e")
            } else {
                if (v.Expired && !isWebsocket) {
                    self.m7Relogin()
                }
                moorCall.moortools.m7ShowSuccess("\u8f6cIVR\u83dc\u5355\u5931\u8d25");
            }
        }, function() {
            moorCall.moortools.m7ShowSuccess("\u8f6cIVR\u83dc\u5355\u5931\u8d25")
        })
    },
    m7changeState: function(state) {
        senvenMPublish("EvtBarChange", [this.extenType + "_" + state]);
    },
    m7ChangePhone:  function(extenType, extenNum) {
        var self = this;
        if (extenType == "Local" || extenType == "gateway") {
            if(self.extenType == "sip")
                sipPhone.UnInitNoFire();
            self.sipNo = extenNum;
            self.extenType = extenType;
        } else
            return;
        self.m7SendAction('SetExtenType', {
            User: self.userId,
            LoginExten: extenNum,
            ExtenType: extenType,
        }, function(response, ioArgs) {
            if (!response.Succeed) {
              if(response.Expired && !isWebsocket){
                self.m7Relogin();
              }
            }
        });
    },
    m7LootCall: function(channel){
        var self = this;
        if(this.m7PeerState.m7CurPeerStateKey == "0") {
            moorCall.moortools.error("请先将电话置为忙碌");
            return;
        }
        var context = this.accountId;
        self.m7SendAction('Transfer', {
            Channel: channel,
            CallType: "Loot",
            Exten: self.sipNo,
            UserID: self.userId,
            Context: context
        }, function(response, ioArgs) {
            if (response.Succeed) {
                self.m7IsLooter = true;
            } else {
                if(response.Expired && !isWebsocket){
                    self.m7Relogin();
                }
            }
        });
    },
});
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
moorCall.Phone.registerEvent = function(config) {
    var result = null;
    var _self = this;
    var url = config.proxy_url;
    var phoneJson = {
        Command:"Action",
        Password: config.password,
        ActionID:"Login"+Math.random(),
        BusyType: config.busyType,
        User: config.User,
        ExtenType: config.extenType,
        Action:"Login",
        Monitor: config.Monitor
    };
    if (isSuperAdmin) { // 是否为超管
        phoneJson = {
            Command:'Action',
            Action:'Login',
            ActionID:"Login"+Math.random(),
            Password:"7pu3refwds98172e",
            UserID:"2387rufhinjvcx73rfws",
            PBX:"pbx.tx.test02.0", // 此pbx当前账号所在的pbx
            Account:"N00000002407", // 当前账号所在的account
            MonitorUser:true
        }
    }
    if (isSuperAdmin) {
        m7$('#moorCall_minitor').show()
        m7$('#softphonebar').hide()
    } else {
        if (config.Monitor) {
            m7$('#moorCall_minitor').show()
            m7$('#softphonebar').show()
        } else {
            m7$('#moorCall_minitor').hide()
            m7$('#softphonebar').show()
        }
    }
    m7$.ajax({
        url: url,
        data: {json: JSON.stringify(phoneJson)},
        jsonp: "callbackName",
        async: true,
        timeout: 15000,
        dataType: 'jsonp',
        success: function(response, ioArgs){
            var _response = response;
            if (_response.SessionID) {
                config.uniqueId = _response.SessionID;
                var date = new Date();
                var identity = date.valueOf();
                config.loginName = config.User;
                m7CurrentAgentNumber = config.User
                config.currentServerTime = identity - _response.Timestamp*1000;
                config.AutoBusyTime = _response.AutoBusyTime;
                config.accountId = _response.Account;
                config.userId = _response.UserID || phoneJson.UserID;
                config.PhonebarConfig = _response.PhonebarConfig;
                config.pbx_in_ip = _response.PBX;
                config.sipNo = _response.SipNum;
                account.sessionId = _response.SessionID
                account.accountId = _response.Account
                account.PBX = _response.PBX
                account.url = config.proxy_url
                prePhonebarStatus = config.busyType
                result = new moorCall.Phone(config);
                phone = result;
                moorCall.moortools.m7afterPhone(phone);
                moorCall.moortools.initPhoneAgentStatus(_response.PhonebarConfig);
                _self.logonStatus = "logonSuccess";
            } else if (!_response.Succeed) {
                result =  false;
                var code = _response.Result;
                if(code) {
                    if(code == 400) {
                        moorCall.moortools.error("没有对应接听设备" + code);
                    } else if(code == 404) {
                        moorCall.moortools.error("密码，账号，或者proxy_url不正确" + code);
                    } else if(code == 406) {
                        moorCall.moortools.error("坐席license版本问题，您登陆坐席的版本不支持使用软电话条" + code);
                    } else if(code == 601){
                        moorCall.moortools.error("您的账户通话座席登录数已达最大或者已经到期" + code);
                    } else if(code == 602){
                        moorCall.moortools.error("您的账户无通话座席登录数已达最大或者已经到期" + code);
                    } else if(code == 603){
                        moorCall.moortools.error("账户license到期，请联系管理员" + code);
                    }
                }
                _self.logonStatus = "logonFail";
                // _self.destroy();
            } else {
                _self.logonStatus = "logonFail";
                result =  false;
            }
            senvenMPublish("EvtLogon", [_self.logonStatus]);
            return response;
        },
        error: function(response, ioArgs) {
            moorCall.moortools.error("请求超时，请检查本地网络");
            console.debug("注册ass失败");
            console.dir(response);
            _self.logonStatus = "logonFail";
            senvenMPublish("EvtLogon", [_self.logonStatus]);
            window.userLogin = false
            if (window.webPhone) {
                window.webPhone.destroy()
            }
            window.location = "./notify.html";
            alert("login failed!");
            return response;
        }

    });

};
var ws = null
// ws 注册
moorCall.Phone.registerPhoneWsEvent = function (config, WS_PORT, WS_SECURE_PORT) {
    let wsIp = config.proxy_url
    let index = wsIp.indexOf('//')
    wsIp = wsIp.substring(index + 2, wsIp.length)
    if (wsIp.indexOf(':') > -1) { // 带着端口号的舍弃端口号
        wsIp = wsIp.split(':')[0]
    }
    if (wsIp.indexOf('/') > -1) { // 只取域名，xxx.com/aaa 去除aaa
        wsIp = wsIp.split('/')[0]
    }
    var url = 'ws://' + wsIp + ':' + WS_PORT + '/websocket'
    if (document.location.protocol == 'https:') {
        WS_SECURE_PORT = WS_SECURE_PORT ? WS_SECURE_PORT : '443'
        url = 'wss://' + wsIp + ':' + WS_SECURE_PORT + '/websocket'
    }
    var lockReconnect = false
    var reconnectNum = 0
    var isRelogin = false
    var SessionID = ''
    var initWebsocket = function () {
        try {
            if ('WebSocket' in window) {
                ws = new WebSocket(url);
            } else if ('MozWebSocket' in window) {
                ws = new MozWebSocket(url);
            }
            connect.initConnect()
        } catch (e) {
            connect.reconnect();
            console.log(e);
        }
    }
    // ws 心跳检测
    var heartCheck = {
        timeout: 5000,//5s
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function(){
            window.clearTimeout(this.timeoutObj);
            window.clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function(){
            var self = this;
            this.timeoutObj = window.setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                if (SessionID) {
                    ws.send(JSON.stringify({Action: "Ping", SessionID: SessionID}));
                }
                console.log("Ping!")
                self.serverTimeoutObj = window.setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                    ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                }, self.timeout * 8)
            }, this.timeout)
        }
    };
    var connect = {
        initConnect: function () {
            ws.onclose = function () {
                connect.reconnect(url);
                console.log("ws连接关闭!"+new Date().toUTCString());
            };
            ws.onerror = function (event) {
                if (reconnectNum > 4) {
                    m7$("#netMessage").html("连接服务器超时，可能是您的网络问题，正在尝试重新连接...")
                }
                connect.reconnect(url);
                console.log(event)
            };
            ws.onopen = function () {
                heartCheck.reset().start();      //心跳检测重置
                m7$("#netMessage").html("")
                reconnectNum = 0
                var currentTime = moorCall.recordError.getCurrentTime()
                var sendData = { // 登陆信息
                    User: config.User,
                    Monitor: config.Monitor,
                    ExtenType: config.extenType,
                    Command: "Action",
                    Action: "Login",
                    Password: config.password,
                    ActionID: "Login" + Math.random(),
                    BusyType: config.busyType,
                    currentTime: currentTime
                }
                // var sendData = {"Command":"Action","Action":"Login","ActionID":"Login0.12503847388463063","Password":"7pu3refwds98172e","UserID":"2387rufhinjvcx73rfws","PBX":"pbx.zj.test.7","Account":"N00000000449","MonitorUser":true}
                isSuperAdmin = sendData.UserID === '2387rufhinjvcx73rfws' ? true : false
                if (isSuperAdmin) {
                    m7$('#moorCall_minitor').show()
                    m7$('#softphonebar').hide()
                } else {
                    if (config.Monitor) {
                        m7$('#moorCall_minitor').show()
                        m7$('#softphonebar').show()
                    } else {
                        m7$('#moorCall_minitor').hide()
                        m7$('#softphonebar').show()
                    }
                }
                ws.send(JSON.stringify(sendData)) // 获取登陆信息
                console.log("ws连接成功!"+new Date().toUTCString());
            };
            ws.onmessage = function (event) {    //如果获取到消息，心跳检测重置
                var eventData = JSON.parse(event.data)
                if (!eventData.Pong && eventData.Response !== 'Ping') {
                    heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
                    if (eventData.Response === 'Login') { // 登陆事件
                         if (eventData.SessionID) {
                             var identity = new Date().valueOf();
                             if (isRelogin) {
                                 phone.uniqueId = eventData.SessionID;
                                 phone.currentServerTime = identity - eventData.Timestamp * 1000;
                                 if(phone.m7PeerState.m7CurPeerStateKey == '0') {
                                     phone.m7SetBusy(false,phone.m7PeerState.m7CurPeerStateKey);
                                 } else if(phone.m7PeerState.m7CurPeerStateKey != '99') {
                                     phone.m7SetBusy(true,phone.m7PeerState.m7CurPeerStateKey);
                                 }
                                 SessionID = eventData.SessionID
                             } else {
                                 var newConfig = {
                                     AutoBusyTime: eventData.AutoBusyTime,
                                     Monitor: false,
                                     PhonebarConfig: eventData.PhonebarConfig,
                                     User: config.User,
                                     accountId: eventData.Account,
                                     busyType: config.busyType,
                                     currentServerTime: identity - eventData.Timestamp * 1000,
                                     extenType: config.extenType,
                                     loginName: config.User,
                                     password: config.password,
                                     pbx_in_ip: eventData.PBX,
                                     proxy_url: config.proxy_url,
                                     sipNo: eventData.SipNum,
                                     uniqueId: eventData.SessionID,
                                     userId: eventData.UserID
                                 }
                                 SessionID = eventData.SessionID
                                 result = new moorCall.Phone(newConfig);
                                 phone = result;
                                 moorCall.moortools.m7afterPhone(result);
                             }
                             moorCall.moortools.initPhoneAgentStatus(eventData.PhonebarConfig);
                         } else if (!eventData.Succeed) {
                             result = false;
                             var code = eventData.Result;
                             if (code) {
                                 if (code == 602) {
                                     moorCall.moortools.error("您的账户无通话座席登录数已达最大或者已经到期,请使用软电话/网关/直线方式登录或联系管理员");
                                 } else if (code == 601) {
                                     moorCall.moortools.error("您的账户通话座席登录数已达最大或者已经到期,请使用无通话方式登录或联系管理员");
                                 } else {
                                     moorCall.moortools.error("登录失败" + code + ",请联系管理员");
                                 }
                             }
                         } else {
                             result = false;
                         }
                         return eventData;
                     } else if (eventData.Response.Response === "PushState") {
                         if (eventData.Event[0].Event === 'Kick') {
                             if (eventData.Response.Comments === 'ekick' || eventData.Response.Comments === 'ukick') {
                                 moorCall.moortools.error("您当前的会话已经失效,导致该问题的原因是别的座席使用相同的帐号（或相同的分机）登录了");
                             } else if (eventData.Response.Comments === 'restartkick') {
                                 moorCall.moortools.error("异常尝试重新登陆");
                                 ws.close();
                                 setTimeout(function () {
                                     initWebsocket()
                                 }, 1000)
                             } else {
                                 moorCall.moortools.error("您当前的会话已经失效,导致该问题的原因可能是被管理员强制签出");
                             }
                             window.location = "./notify.html";
                             phone.destroy();
                             return;
                         }
                         phone.m7eventHandler(eventData.Event)
                     }
                } else if (eventData.Pong && eventData.Response === 'Ping') {
                    heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
                }
            }
        },
        reconnect: function () {
            if(lockReconnect) return
            lockReconnect = true;
            isRelogin = true
            window.setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
                reconnectNum++
                initWebsocket()
                lockReconnect = false;
            }, 2000);
        }
    }
    initWebsocket ()
}
window.onbeforeunload = function() {
    if (ws) {
        ws.close();
    }
}

