// var server = "https://mrcpserver.7moor.com:8089/janus";

//走阿里云内网的slb
var server = "https://janus-ykf.7moor.com/janus";
//var server = "https://webqhbalislb.7moor.com:9099/janus"
//走外网的slb
var server_waiwang = "https://janus-ykf.7moor.com/janus";

// 测试网络地址
var networkTestingUrl = 'https://janusslb.7moor.com/heart'

var janus = null;
var sipcall = null;
var opaqueId = "7moorSip-" + Janus.randomString(12);

var started = false;
var spinner = null;

var selectedApproach = "secret";
var registered = false;

var incoming = null;

var media_server = null;

var current_jsep = null;
var current_result = null;

var reconnect_set_time_out = null;

var networkTestingInterval = null

var m7webPhoneUtils = {
	qhbUrl: 'https://txwebphone.7moor.com',
    //qhbUrl: 'https://test.7moor.com:9443',
    kickSocketUrl: 'wss://ccpclient.7moor.com/ws',
    // kickSocketUrl: 'wss://qhb.ccpclient.7moor.com/ws',
    kickSocket: null,
    _isKicked: false,
    setKickSocket: function (kickToken) {
        m7webPhoneUtils.kickSocket = new WebSocket(m7webPhoneUtils.kickSocketUrl);
        m7webPhoneUtils.kickSocket.onopen = function () {
            console.log("Socket has been opened");
            console.log("{\"flag\": \"qhb\", \"user\": \"" + kickToken + "\"}")
            m7webPhoneUtils.kickSocket.send("{\"flag\": \"qhb\", \"user\": \"" + kickToken + "\"}")
        }
        m7webPhoneUtils.kickSocket.onmessage = function (msg) {
            if (msg.data === 'kick') {
                m7webPhoneUtils._isKicked = true
                if (m7WebPhone.onMessage && typeof m7WebPhone.onMessage === 'function') {
                    m7WebPhone.onMessage('kicked')
                }
            }
        }
        m7webPhoneUtils.kickSocket.onclose = function () {
            console.log("Socket has been closed");
            m7WebPhone.onError({ type: 'socket', error: "Socket has been closed" })

        }
        m7webPhoneUtils.kickSocket.onerror = function (err) {
            console.log(err)
            console.log('socket error')
            m7WebPhone.onError({ type: 'socket', error: err })
        }
    },
    sendPostCommand: function (command, callback, errorCallback, async, timeout) {
        var data = m7$.toJSON(command.data)
        command.data = data
        console.log('http--send-->' + m7$.toJSON(command))
        m7$.ajax({
            type: 'POST',
            url: m7webPhoneUtils.qhbUrl + '/action',
            async: async,
            data: command,
            timeout: timeout != null ? timeout : 30000,
            dataType: 'json',
            success: function (data, status) {
                if (typeof callback == 'function') {
                    if (data.Succeed) {
                        callback(data)
                    } else {
                        errorCallback(data)
                    }
                }
            },
            error: function (xhr, status, error) {
                if (errorCallback && (typeof errorCallback == 'function')) {
                    errorCallback(xhr, status, error)
                } else {
                    if (xhr.statusText != 'success') {
                        console.log('请求超时或网络问题,' + status || error)
                    }
                }
            }
        })
    },
    networkTesting: function () {
        let time1 = new Date().getTime()
        let _spend
        if (!m7webPhoneUtils.sendNetWork) {
            return
        }
        m7$.ajax({
            type: 'get',
            url: networkTestingUrl,
            async: true,
            timeout: 30000,
            dataType: 'jsonp',
            success: function (data, status) {
                let time2 = new Date().getTime()
                if (status === 'success') {
                    _spend = (time2 - time1) / 2
                    m7webPhoneUtils.sendNetWork(_spend)
                } else {
                    m7webPhoneUtils.sendNetWork('error')
                }
            },
            error: function (xhr, status, error) {
                let time2 = new Date().getTime()
                if (xhr.status === 200) {
                    _spend = (time2 - time1) / 2
                    m7webPhoneUtils.sendNetWork(_spend)
                } else {
                    m7webPhoneUtils.sendNetWork('error')
                }
            }
        })
    }
}
var m7WebPhone = {
    onMessageCallback: null,
    initCallback: null,
    onError: null,
    loginQhbWebPhone: function (loginData) {
        var kickToken = loginData.username + '-' + new Date().getTime()
        var action = {
            'action': 'softphone.loginNoCode',
            'data': {
                'loginName': loginData.username,
                'password': loginData.pwd,
                'kickToken': kickToken
            }
        }
        m7webPhoneUtils.sendPostCommand(action, function (response) {
            m7webPhoneUtils.setKickSocket(kickToken)
            console.log('final: media_ip=' + response.media_ip + ';janus_server=' + server + ';assDomain=' + response.assDomain);
            media_server = response.media_ip + ':' + response.media_port;
            console.log('sip:' + media_server, 'sip:' + response.sip_id + '@' + media_server, response.sip_id, response.sip_pwd, response.sip_id)
            m7WebPhone.media_server = media_server;
            m7WebPhone.sip_id = response.sip_id;
            m7WebPhone.sip_pwd = response.sip_pwd;
            m7WebPhone.initWebSipPhone('sip:' + media_server, 'sip:' + response.sip_id + '@' + media_server, response.sip_id, response.sip_pwd, response.sip_id);
        }, function (err) {
            m7WebPhone.onError(err)
        })
        if (!networkTestingInterval) {
            networkTestingInterval = setInterval(function () {
                // m7webPhoneUtils.networkTesting()
            }, 5000)
        }
    },
    initWebSipPhone: function (media_server, media_username, media_authuser, media_pwd, media_dispalyname) {
        // Initialize the library (all console debuggers enabled)
        Janus.init({
            debug: true, callback: function () {
                // Use a button to start the demo
                if (started)
                    return;
                started = true;
                console.log('Init janus...')

                // Make sure the browser supports WebRTC
                if (!Janus.isWebrtcSupported()) {
                    alert("No WebRTC support... ");
                    return;
                }
                // Create session
                janus = new Janus(
                    {
                        debug: 'all',
                        server: server,
                        withCredentials: true,
                        iceTransportPolicy: 'relay',
                        iceServers: [
                            { urls: "stun:116.62.108.217:3478" },
                            {
                                urls: "turn:116.62.108.217:3478",
                                username: '7moor',
                                credential: '7moorpasswd',
                            }],
                        success: function () {
                            // Attach to echo test plugin
                            janus.attach(
                                {
                                    plugin: "janus.plugin.sip",
                                    opaqueId: opaqueId,
                                    success: function (pluginHandle) {
                                        // $('#details').remove();
                                        sipcall = pluginHandle;
                                        // m7WebPhone.initCallback(pluginHandle)
                                        Janus.log("Plugin attached! (" + sipcall.getPlugin() + ", id=" + sipcall.getId() + ")");
                                        selectedApproach = 'secret';
                                        registerUsername(media_server, media_username, media_authuser, media_pwd, media_dispalyname);
                                    },
                                    error: function (error) {
                                        // alert('初始化软电话失败！');
                                        m7WebPhone.onError(error)
                                        // Janus.error("  -- Error attaching plugin...", error);
                                        // bootbox.alert("  -- Error attaching plugin... " + error);
                                    },
                                    consentDialog: function (on) {
                                        Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
                                    },
                                    onmessage: function (msg, jsep) {
                                        if (jsep !== undefined) {
                                            current_jsep = jsep;
                                        }
                                        if (m7WebPhone.onMessage && typeof m7WebPhone.onMessage === 'function') {
                                            var backMsg
                                            if (msg['result']['event'] === 'incomingcall') {
                                                if (msg['result']["displayname"].replace(/"/g, "") === 'asterisk') {
                                                    backMsg = 'Outbound'
                                                } else {
                                                    backMsg = 'incomingcall'
                                                }
                                            } else {
                                                backMsg = msg['result']['event']
                                            }
                                            m7WebPhone.onMessage(backMsg)
                                        }
                                        Janus.debug(" ::: Got a message :::");
                                        Janus.debug(msg);
                                        // Any error?
                                        var error = msg["error"];
                                        if (error != null && error != undefined) {
                                            if (!registered) {

                                            } else {
                                                // Reset status
                                                sipcall.hangup();
                                            }
                                            alert(error);
                                            return;
                                        }
                                        var result = msg["result"];
                                        current_result = result
                                        if (result !== null && result !== undefined && result["event"] !== undefined && result["event"] !== null) {
                                            var event = result["event"];
                                            if (event === 'registration_failed') {
                                                Janus.warn("Registration failed: " + result["code"] + " " + result["reason"]);
                                                // 登录话机失败
                                                return;
                                            }

                                            if (event === 'registered') {
                                                // 登录话机成功
                                                Janus.log("Successfully registered as " + result["username"] + "!");
                                                // TODO Enable buttons to call now
                                                if (!registered) {
                                                    registered = true;
                                                }
                                            } else if (event === 'calling') {
                                                Janus.log("Waiting for the peer to answer...");
                                                // TODO Any ringtone?
                                            } else if (event === 'incomingcall') {
                                                // 有来电或外呼
                                                incoming = true
                                                Janus.log("Incoming call from " + result["username"] + "!");
                                                var callerNum = result["displayname"].replace(/"/g, "");
                                                if (callerNum === 'asterisk') {
                                                    // 外呼
                                                    window.setTimeout(function () {
                                                        m7WebPhone.AnswerCall()
                                                    }, 300)
                                                }
                                                //H5 notify and sound
                                                var Notification = window.Notification || window.mozNotification || window.webkitNotification;
                                                var ringingTone = document.getElementById('ringing-tone')
                                                if (ringingTone) {
                                                    ringingTone.currentTime = 0
                                                    ringingTone.play();
                                                }
                                                if (Notification) {
                                                    Notification.requestPermission(function (status) {
                                                        //status默认值'default'等同于拒绝 'denied' 意味着用户不想要通知 'granted' 意味着用户同意启用通知
                                                        if ("granted" != status) {
                                                            return;
                                                        } else {
                                                            var tag = "sds" + Math.random();
                                                            var notify = new Notification('来电通知', {
                                                                dir: 'auto',
                                                                lang: '',
                                                                tag: '来电通知', // 部分chrome59受影响
                                                                renotify: true,
                                                                body: 'callerNum'
                                                            })
                                                            notify.onclick = function () {
                                                                //如果通知消息被点击,通知窗口将被激活
                                                                window.focus();
                                                            },
                                                                notify.onerror = function (e) {
                                                                    console.log(e)
                                                                    console.log("HTML5桌面消息出错！！！");
                                                                };
                                                            notify.onshow = function () {
                                                                setTimeout(function () {
                                                                    notify.close();
                                                                }, 10000)
                                                            };
                                                            notify.onclose = function () {
                                                                console.log("HTML5桌面消息关闭！！！");
                                                            };
                                                        }
                                                    });
                                                } else {
                                                    console.log("您的浏览器不支持桌面消息");
                                                }
                                            } else if (event === 'accepting') {
                                                // Response to an offerless INVITE, let's wait for an 'accepted'
                                            } else if (event === 'progress') {
                                                Janus.log("There's early media from " + result["username"] + ", wairing for the call!");
                                                Janus.log(jsep);
                                                // Call can start already: handle the remote answer
                                                if (jsep !== null && jsep !== undefined) {
                                                    sipcall.handleRemoteJsep({ jsep: jsep, error: doHangup });
                                                }
                                                toastr.info("Early media...");
                                            } else if (event === 'accepted') {
                                                var ringingTone = document.getElementById('ringing-tone')
                                                if (ringingTone) {
                                                    ringingTone.pause();
                                                }
                                                Janus.log(result["username"] + " accepted the call!");
                                                Janus.log(jsep);
                                                // Call can start, now: handle the remote answer
                                                if (jsep !== null && jsep !== undefined) {
                                                    sipcall.handleRemoteJsep({ jsep: jsep, error: doHangup });
                                                }
                                            } else if (event === 'hangup') {
                                                var ringingTone = document.getElementById('ringing-tone')
                                                if (ringingTone) {
                                                    ringingTone.pause();
                                                }
                                                if (incoming != null) {
                                                    // incoming.modal('hide');
                                                    incoming = null;
                                                }
                                                Janus.log("Call hung up (" + result["code"] + " " + result["reason"] + ")!");
                                                // Reset status
                                                sipcall.hangup();
                                            }
                                        }
                                    },
                                    onlocalstream: function (stream) {
                                        Janus.debug(" ::: Got a local stream :::");
                                        Janus.debug(stream);
                                        if (m7$('#myvideo').length === 0)
                                            m7$('body').append('<video class="rounded centered" id="myvideo" width=320 height=240 autoplay muted="muted"/>');
                                        Janus.attachMediaStream(m7$('#myvideo').get(0), stream);
                                        m7$("#myvideo").get(0).muted = "muted";
                                        // m7$("#myvideo").get(0).volume = 1.0;
                                        // No remote video yet
                                        m7$('body').append('<video class="rounded centered" id="waitingvideo" width=320 height=240 />');
                                        var videoTracks = stream.getVideoTracks();
                                    },
                                    onremotestream: function (stream) {
                                        Janus.debug(" ::: Got a remote stream :::");
                                        Janus.debug(stream);
                                        m7$('body').append('<video class="rounded centered hide" id="remotevideo" width=320 height=240 autoplay />');
                                        // m7$('#remotevideo').get(0).volume = 1.0;
                                        Janus.attachMediaStream(m7$('#remotevideo').get(0), stream);
                                    },
                                    oncleanup: function () {
                                        Janus.log(" ::: Got a cleanup notification :::");
                                    },
                                    mediaState: function (type, receiving) {
                                        if (m7WebPhone.onMediaState && typeof m7WebPhone.onMediaState === 'function') {
                                            m7WebPhone.onMediaState({
                                                type: type,
                                                receiving: receiving
                                            })
                                        }
                                    }
                                });
                        },
                        error: function (error) {
                            Janus.error(error);
                            // alert(error, function () {
                            //     window.location.reload();
                            // });
                            m7WebPhone.onError('JanusError:' + error)
                            console.log('Lost connection to the gateway.', error)
                            if (error === 'Lost connection to the gateway (is it down?)') {
                                started = false
                                m7WebPhone.onError('JanusError: destroyed')
                            }
                        },
                        destroyed: function () {
                            m7WebPhone.onError('JanusError: destroyed')
                            // window.location.reload();
                        }
                    });
            }
        });
    },
    AnswerCall: function () {
        if (incoming === true && current_jsep !== null && current_result !== null) {
            var doAudio = true, doVideo = true;
            var offerlessInvite = false;
            if (current_jsep !== null && current_jsep !== undefined) {
                doAudio = (current_jsep.sdp.indexOf("m=audio ") > -1);
                doVideo = (current_jsep.sdp.indexOf("m=video ") > -1);
                Janus.debug("Audio " + (doAudio ? "has" : "has NOT") + " been negotiated");
                Janus.debug("Video " + (doVideo ? "has" : "has NOT") + " been negotiated");
            } else {
                Janus.log("This call doesn't contain an offer... we'll need to provide one ourselves");
                offerlessInvite = true;
                doVideo = false;
            }
            var rtpType = "";
            var srtp = current_result["srtp"];
            if (srtp === "sdes_optional")
                rtpType = " (SDES-SRTP offered)";
            else if (srtp === "sdes_mandatory")
                rtpType = " (SDES-SRTP mandatory)";

            var extra = "";
            if (offerlessInvite)
                extra = " (no SDP offer provided)"
        }
        incoming = null;
        var sipcallAction = (offerlessInvite ? sipcall.createOffer : sipcall.createAnswer);
        sipcallAction(
            {
                jsep: current_jsep,
                media: { audio: doAudio, video: doVideo },
                success: function (jsep) {
                    Janus.debug("Got SDP " + jsep.type + "! audio=" + doAudio + ", video=" + doVideo);
                    Janus.debug(jsep);
                    var body = { request: "accept" };
                    sipcall.send({ "message": body, "jsep": jsep });
                },
                error: function (error) {
                    Janus.error("WebRTC error:", error);
                    if (error.indexOf('capture') > -1) {
                        error = '未检测到接听设备，请检查对应设备是否正常，如耳机。'
                    } else if (error.indexOf('DTMF') > -1) {
                        error = '按键错误！'
                    } else if (error.indexOf('gateway')) {
                        error = '服务异常！'
                    } else if (error.indexOf('Unknown error')) {
                        error = '未知错误！'
                    } else if (error.indexOf('HTTPS')) {
                        error = '环境错误，请使用https环境'
                    }
                    alert("WebRTC error... " + JSON.stringify(error));
                    var body = { "request": "decline", "code": 480 };
                    sipcall.send({ "message": body });
                }
            })
    }

}

function initM7WebPhone (loginData) {
    this.init(loginData)
}

initM7WebPhone.prototype.onMessage = function (callback) {
    m7WebPhone.onMessage = callback
}

initM7WebPhone.prototype.onError = function (callback) {
    m7WebPhone.onError = callback
    if (!getUserMedia()) {
        m7WebPhone.onError('No capture device found')
    }
}

initM7WebPhone.prototype.onMediaState = function (callback) {
    m7WebPhone.onMediaState = callback
}

initM7WebPhone.prototype.init = function (loginData) {
    if (janus) {
        started = false
        janus.destroy()
    }
    m7WebPhone.loginQhbWebPhone(loginData)
}

initM7WebPhone.prototype.destroy = function (loginData) {
    if (janus) {
        started = false
        janus.destroy()
    }
}

initM7WebPhone.prototype.networkMonitoring = function (callback) {
    m7webPhoneUtils.sendNetWork = callback
}

initM7WebPhone.prototype.sendDTMF = function (value) {
    if (sipcall) {
        sipcall.send({ message: { request: "dtmf_info", digit: value } })
    }
}


initM7WebPhone.prototype.Outbound = function () {
    if (sipcall) {
        sipcall.createOffer({
            jsep: current_jsep,
            media: {
                video: false, audio: {
                    // 是否开启自动增益，也就是在原有录制的声音的基础上是否增加音量
                    autoGainControl: true,
                    // 是否开启回音消除
                    echoCancellation: true,
                    // 是否开启降噪
                    noiseSuppression: true
                }
            },
            success: function (jsep) {
                var body = { request: "accept" };
                sipcall.send({ "message": body, "jsep": jsep });
            },
            error: function (error) {
                m7WebPhone.onError(error)
            }
        })
    } else {
        m7WebPhone.onError('初始化失败')
    }
}

initM7WebPhone.prototype.dialout = function (phone) {
    if (!phone || !media_server || !sipcall) {
        return;
    }
    let uri = "sip:" + phone + "@" + media_server;
    sipcall.createOffer(
        {
            media: {
                // audioSend: true, audioRecv: true,		// We DO want audio
                videoSend: false, videoRecv: false,	// We MAY want video
                audio: {
                    autoGainControl: true,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            },
            success: function (jsep) {
                Janus.debug("Got SDP!");
                Janus.debug(jsep);
                testjsep = jsep;
                var body = { request: "call", uri: uri };
                sipcall.send({ "message": body, "jsep": jsep });
            },
            error: function (error) {
                Janus.error("WebRTC error...", error);
                alert("WebRTC error... " + JSON.stringify(error));
            }
        })
}

initM7WebPhone.prototype.hangup = function () {
    var body = { "request": "decline" };
    sipcall.send({ "message": body });
    let hangup = { "request": "hangup" };
    sipcall.send({ "message": hangup });
    sipcall.hangup()
}


// initM7WebPhone.prototype.updateBitrate = function () {
//     console.log(sipcall, 'sipcall')
//     console.log(sipcall.Bitrate())
// }

initM7WebPhone.prototype.isSecretBrowse = function(){
    try{
      var _localStorage = window.localStorage;
      if(!_localStorage){
          return true;
      }
      }catch (error){
          return true;
      }
  }

initM7WebPhone.prototype.updateBitrate = function () {
    sipcall.updateBitrate()
}


initM7WebPhone.prototype.toggleMute = function () {
    var muted = sipcall.isAudioMuted();
    Janus.log((muted ? "Unmuting" : "Muting") + " local stream...");
    if (muted) {
        sipcall.unmuteAudio()
    } else {
        sipcall.muteAudio()
    }
    muted = sipcall.isAudioMuted();
}

function registerUsername (media_server, media_username, media_authuser, media_pwd, media_dispalyname) {
    var sipserver = media_server;

    var username = media_username;

    var password = media_pwd;

    var register = {
        "request": "register",
        "username": username
    };

    register.authuser = media_authuser;

    register.display_name = media_dispalyname;

    register["secret"] = password;

    register["proxy"] = sipserver;
    sipcall.send({ "message": register });

}

function doHangup () {
    // Hangup a call
    m7$('#call').attr('disabled', true).unbind('click');
    var hangup = { "request": "hangup" };
    sipcall.send({ "message": hangup });
    sipcall.hangup();
}

function getUserMedia () {
    var userMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    return userMedia
}
