/**
 * Created by chenguang on 08/04/2018.
 */
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;var e,i,a,h,d,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,h=v,d=m,l=o(l,g,v,m,n[e],7,-680876936),m=o(m,l,g,v,n[e+1],12,-389564586),v=o(v,m,l,g,n[e+2],17,606105819),g=o(g,v,m,l,n[e+3],22,-1044525330),l=o(l,g,v,m,n[e+4],7,-176418897),m=o(m,l,g,v,n[e+5],12,1200080426),v=o(v,m,l,g,n[e+6],17,-1473231341),g=o(g,v,m,l,n[e+7],22,-45705983),l=o(l,g,v,m,n[e+8],7,1770035416),m=o(m,l,g,v,n[e+9],12,-1958414417),v=o(v,m,l,g,n[e+10],17,-42063),g=o(g,v,m,l,n[e+11],22,-1990404162),l=o(l,g,v,m,n[e+12],7,1804603682),m=o(m,l,g,v,n[e+13],12,-40341101),v=o(v,m,l,g,n[e+14],17,-1502002290),g=o(g,v,m,l,n[e+15],22,1236535329),l=u(l,g,v,m,n[e+1],5,-165796510),m=u(m,l,g,v,n[e+6],9,-1069501632),v=u(v,m,l,g,n[e+11],14,643717713),g=u(g,v,m,l,n[e],20,-373897302),l=u(l,g,v,m,n[e+5],5,-701558691),m=u(m,l,g,v,n[e+10],9,38016083),v=u(v,m,l,g,n[e+15],14,-660478335),g=u(g,v,m,l,n[e+4],20,-405537848),l=u(l,g,v,m,n[e+9],5,568446438),m=u(m,l,g,v,n[e+14],9,-1019803690),v=u(v,m,l,g,n[e+3],14,-187363961),g=u(g,v,m,l,n[e+8],20,1163531501),l=u(l,g,v,m,n[e+13],5,-1444681467),m=u(m,l,g,v,n[e+2],9,-51403784),v=u(v,m,l,g,n[e+7],14,1735328473),g=u(g,v,m,l,n[e+12],20,-1926607734),l=c(l,g,v,m,n[e+5],4,-378558),m=c(m,l,g,v,n[e+8],11,-2022574463),v=c(v,m,l,g,n[e+11],16,1839030562),g=c(g,v,m,l,n[e+14],23,-35309556),l=c(l,g,v,m,n[e+1],4,-1530992060),m=c(m,l,g,v,n[e+4],11,1272893353),v=c(v,m,l,g,n[e+7],16,-155497632),g=c(g,v,m,l,n[e+10],23,-1094730640),l=c(l,g,v,m,n[e+13],4,681279174),m=c(m,l,g,v,n[e],11,-358537222),v=c(v,m,l,g,n[e+3],16,-722521979),g=c(g,v,m,l,n[e+6],23,76029189),l=c(l,g,v,m,n[e+9],4,-640364487),m=c(m,l,g,v,n[e+12],11,-421815835),v=c(v,m,l,g,n[e+15],16,530742520),g=c(g,v,m,l,n[e+2],23,-995338651),l=f(l,g,v,m,n[e],6,-198630844),m=f(m,l,g,v,n[e+7],10,1126891415),v=f(v,m,l,g,n[e+14],15,-1416354905),g=f(g,v,m,l,n[e+5],21,-57434055),l=f(l,g,v,m,n[e+12],6,1700485571),m=f(m,l,g,v,n[e+3],10,-1894986606),v=f(v,m,l,g,n[e+10],15,-1051523),g=f(g,v,m,l,n[e+1],21,-2054922799),l=f(l,g,v,m,n[e+8],6,1873313359),m=f(m,l,g,v,n[e+15],10,-30611744),v=f(v,m,l,g,n[e+6],15,-1560198380),g=f(g,v,m,l,n[e+13],21,1309151649),l=f(l,g,v,m,n[e+4],6,-145523070),m=f(m,l,g,v,n[e+11],10,-1120210379),v=f(v,m,l,g,n[e+2],15,718787259),g=f(g,v,m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,h),m=t(m,d);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function d(n){return a(i(h(n),8*n.length))}function l(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="0123456789abcdef",o="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}function v(n){return unescape(encodeURIComponent(n))}function m(n){return d(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
//# sourceMappingURL=md5.min.js.map

/*! jQuery JSON plugin 2.4.0 | code.google.com/p/jquery-json */
(function($){'use strict';var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},hasOwn=Object.prototype.hasOwnProperty;$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
    var pairs,k,name,val,type=$.type(o);if(type==='undefined'){return undefined;}
    if(type==='number'||type==='boolean'){return String(o);}
    if(type==='string'){return $.quoteString(o);}
    if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
    if(type==='date'){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
        if(day<10){day='0'+day;}
        if(hours<10){hours='0'+hours;}
        if(minutes<10){minutes='0'+minutes;}
        if(seconds<10){seconds='0'+seconds;}
        if(milli<100){milli='0'+milli;}
        if(milli<10){milli='0'+milli;}
        return'"'+year+'-'+month+'-'+day+'T'+
            hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
    pairs=[];if($.isArray(o)){for(k=0;k<o.length;k++){pairs.push($.toJSON(o[k])||'null');}
        return'['+pairs.join(',')+']';}
    if(typeof o==='object'){for(k in o){if(hasOwn.call(o,k)){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
        type=typeof o[k];if(type!=='function'&&type!=='undefined'){val=$.toJSON(o[k]);pairs.push(name+':'+val);}}}
        return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){return eval('('+str+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+str+')');}
    throw new SyntaxError('Error parsing JSON, source is not valid.');};$.quoteString=function(str){if(str.match(escape)){return'"'+str.replace(escape,function(a){var c=meta[a];if(typeof c==='string'){return c;}
    c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
    return'"'+str+'"';};}(jQuery));

/**
 * Created by chenguang on 08/04/2018.
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).adapter=e()}}(function(){return function e(t,r,n){function i(o,s){if(!r[o]){if(!t[o]){var c="function"==typeof require&&require;if(!s&&c)return c(o,!0);if(a)return a(o,!0);var d=new Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}var p=r[o]={exports:{}};t[o][0].call(p.exports,function(e){var r=t[o][1][e];return i(r||e)},p,p.exports,e,t,r,n)}return r[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(e,t,r){"use strict";function n(e,t,r,n){var i=c.writeRtpDescription(e.kind,t);if(i+=c.writeIceParameters(e.iceGatherer.getLocalParameters()),i+=c.writeDtlsParameters(e.dtlsTransport.getLocalParameters(),"offer"===r?"actpass":"active"),i+="a=mid:"+e.mid+"\r\n",e.direction?i+="a="+e.direction+"\r\n":e.rtpSender&&e.rtpReceiver?i+="a=sendrecv\r\n":e.rtpSender?i+="a=sendonly\r\n":e.rtpReceiver?i+="a=recvonly\r\n":i+="a=inactive\r\n",e.rtpSender){var a="msid:"+n.id+" "+e.rtpSender.track.id+"\r\n";i+="a="+a,i+="a=ssrc:"+e.sendEncodingParameters[0].ssrc+" "+a,e.sendEncodingParameters[0].rtx&&(i+="a=ssrc:"+e.sendEncodingParameters[0].rtx.ssrc+" "+a,i+="a=ssrc-group:FID "+e.sendEncodingParameters[0].ssrc+" "+e.sendEncodingParameters[0].rtx.ssrc+"\r\n")}return i+="a=ssrc:"+e.sendEncodingParameters[0].ssrc+" cname:"+c.localCName+"\r\n",e.rtpSender&&e.sendEncodingParameters[0].rtx&&(i+="a=ssrc:"+e.sendEncodingParameters[0].rtx.ssrc+" cname:"+c.localCName+"\r\n"),i}function i(e,t){var r=!1;return(e=JSON.parse(JSON.stringify(e))).filter(function(e){if(e&&(e.urls||e.url)){var n=e.urls||e.url;e.url&&!e.urls&&console.warn("RTCIceServer.url is deprecated! Use urls instead.");var i="string"==typeof n;return i&&(n=[n]),n=n.filter(function(e){return 0===e.indexOf("turn:")&&-1!==e.indexOf("transport=udp")&&-1===e.indexOf("turn:[")&&!r?(r=!0,!0):0===e.indexOf("stun:")&&t>=14393&&-1===e.indexOf("?transport=udp")}),delete e.url,e.urls=i?n[0]:n,!!n.length}return!1})}function a(e,t){var r={codecs:[],headerExtensions:[],fecMechanisms:[]},n=function(e,t){e=parseInt(e,10);for(var r=0;r<t.length;r++)if(t[r].payloadType===e||t[r].preferredPayloadType===e)return t[r]},i=function(e,t,r,i){var a=n(e.parameters.apt,r),o=n(t.parameters.apt,i);return a&&o&&a.name.toLowerCase()===o.name.toLowerCase()};return e.codecs.forEach(function(n){for(var a=0;a<t.codecs.length;a++){var o=t.codecs[a];if(n.name.toLowerCase()===o.name.toLowerCase()&&n.clockRate===o.clockRate){if("rtx"===n.name.toLowerCase()&&n.parameters&&o.parameters.apt&&!i(n,o,e.codecs,t.codecs))continue;(o=JSON.parse(JSON.stringify(o))).numChannels=Math.min(n.numChannels,o.numChannels),r.codecs.push(o),o.rtcpFeedback=o.rtcpFeedback.filter(function(e){for(var t=0;t<n.rtcpFeedback.length;t++)if(n.rtcpFeedback[t].type===e.type&&n.rtcpFeedback[t].parameter===e.parameter)return!0;return!1});break}}}),e.headerExtensions.forEach(function(e){for(var n=0;n<t.headerExtensions.length;n++){var i=t.headerExtensions[n];if(e.uri===i.uri){r.headerExtensions.push(i);break}}}),r}function o(e,t,r){return-1!=={offer:{setLocalDescription:["stable","have-local-offer"],setRemoteDescription:["stable","have-remote-offer"]},answer:{setLocalDescription:["have-remote-offer","have-local-pranswer"],setRemoteDescription:["have-local-offer","have-remote-pranswer"]}}[t][e].indexOf(r)}function s(e,t){e.getRemoteCandidates().find(function(e){return t.foundation===e.foundation&&t.ip===e.ip&&t.port===e.port&&t.priority===e.priority&&t.protocol===e.protocol&&t.type===e.type})||e.addRemoteCandidate(t)}var c=e("sdp");t.exports=function(e,t){var r=function(r){var n=this,a=document.createDocumentFragment();if(["addEventListener","removeEventListener","dispatchEvent"].forEach(function(e){n[e]=a[e].bind(a)}),this.onicecandidate=null,this.onaddstream=null,this.ontrack=null,this.onremovestream=null,this.onsignalingstatechange=null,this.oniceconnectionstatechange=null,this.onicegatheringstatechange=null,this.onnegotiationneeded=null,this.ondatachannel=null,this.canTrickleIceCandidates=null,this.needNegotiation=!1,this.localStreams=[],this.remoteStreams=[],this.localDescription=null,this.remoteDescription=null,this.signalingState="stable",this.iceConnectionState="new",this.iceGatheringState="new",r=JSON.parse(JSON.stringify(r||{})),this.usingBundle="max-bundle"===r.bundlePolicy,"negotiate"===r.rtcpMuxPolicy){var o=new Error("rtcpMuxPolicy 'negotiate' is not supported");throw o.name="NotSupportedError",o}switch(r.rtcpMuxPolicy||(r.rtcpMuxPolicy="require"),r.iceTransportPolicy){case"all":case"relay":break;default:r.iceTransportPolicy="all"}switch(r.bundlePolicy){case"balanced":case"max-compat":case"max-bundle":break;default:r.bundlePolicy="balanced"}if(r.iceServers=i(r.iceServers||[],t),this._iceGatherers=[],r.iceCandidatePoolSize)for(var s=r.iceCandidatePoolSize;s>0;s--)this._iceGatherers=new e.RTCIceGatherer({iceServers:r.iceServers,gatherPolicy:r.iceTransportPolicy});else r.iceCandidatePoolSize=0;this._config=r,this.transceivers=[],this._sdpSessionId=c.generateSessionId(),this._sdpSessionVersion=0};return r.prototype._emitGatheringStateChange=function(){var e=new Event("icegatheringstatechange");this.dispatchEvent(e),null!==this.onicegatheringstatechange&&this.onicegatheringstatechange(e)},r.prototype.getConfiguration=function(){return this._config},r.prototype.getLocalStreams=function(){return this.localStreams},r.prototype.getRemoteStreams=function(){return this.remoteStreams},r.prototype._createTransceiver=function(e){var t=this.transceivers.length>0,r={track:null,iceGatherer:null,iceTransport:null,dtlsTransport:null,localCapabilities:null,remoteCapabilities:null,rtpSender:null,rtpReceiver:null,kind:e,mid:null,sendEncodingParameters:null,recvEncodingParameters:null,stream:null,wantReceive:!0};if(this.usingBundle&&t)r.iceTransport=this.transceivers[0].iceTransport,r.dtlsTransport=this.transceivers[0].dtlsTransport;else{var n=this._createIceAndDtlsTransports();r.iceTransport=n.iceTransport,r.dtlsTransport=n.dtlsTransport}return this.transceivers.push(r),r},r.prototype.addTrack=function(t,r){for(var n,i=0;i<this.transceivers.length;i++)this.transceivers[i].track||this.transceivers[i].kind!==t.kind||(n=this.transceivers[i]);return n||(n=this._createTransceiver(t.kind)),this._maybeFireNegotiationNeeded(),-1===this.localStreams.indexOf(r)&&this.localStreams.push(r),n.track=t,n.stream=r,n.rtpSender=new e.RTCRtpSender(t,n.dtlsTransport),n.rtpSender},r.prototype.addStream=function(e){var r=this;if(t>=15025)e.getTracks().forEach(function(t){r.addTrack(t,e)});else{var n=e.clone();e.getTracks().forEach(function(e,t){var r=n.getTracks()[t];e.addEventListener("enabled",function(e){r.enabled=e.enabled})}),n.getTracks().forEach(function(e){r.addTrack(e,n)})}},r.prototype.removeStream=function(e){var t=this.localStreams.indexOf(e);t>-1&&(this.localStreams.splice(t,1),this._maybeFireNegotiationNeeded())},r.prototype.getSenders=function(){return this.transceivers.filter(function(e){return!!e.rtpSender}).map(function(e){return e.rtpSender})},r.prototype.getReceivers=function(){return this.transceivers.filter(function(e){return!!e.rtpReceiver}).map(function(e){return e.rtpReceiver})},r.prototype._createIceGatherer=function(t,r){var n=this;if(r&&t>0)return this.transceivers[0].iceGatherer;if(this._iceGatherers.length)return this._iceGatherers.shift();var i=new e.RTCIceGatherer({iceServers:this._config.iceServers,gatherPolicy:this._config.iceTransportPolicy});return Object.defineProperty(i,"state",{value:"new",writable:!0}),this.transceivers[t].candidates=[],this.transceivers[t].bufferCandidates=function(e){var r=!e.candidate||0===Object.keys(e.candidate).length;i.state=r?"completed":"gathering",null!==n.transceivers[t].candidates&&n.transceivers[t].candidates.push(e.candidate)},i.addEventListener("localcandidate",this.transceivers[t].bufferCandidates),i},r.prototype._gather=function(t,r){var n=this,i=this.transceivers[r].iceGatherer;if(!i.onlocalcandidate){var a=this.transceivers[r].candidates;this.transceivers[r].candidates=null,i.removeEventListener("localcandidate",this.transceivers[r].bufferCandidates),i.onlocalcandidate=function(e){if(!(n.usingBundle&&r>0)){var a=new Event("icecandidate");a.candidate={sdpMid:t,sdpMLineIndex:r};var o=e.candidate,s=!o||0===Object.keys(o).length;s?"new"!==i.state&&"gathering"!==i.state||(i.state="completed"):("new"===i.state&&(i.state="gathering"),o.component=1,a.candidate.candidate=c.writeCandidate(o));var d=c.splitSections(n.localDescription.sdp);d[a.candidate.sdpMLineIndex+1]+=s?"a=end-of-candidates\r\n":"a="+a.candidate.candidate+"\r\n",n.localDescription.sdp=d.join("");var p=n.transceivers.every(function(e){return e.iceGatherer&&"completed"===e.iceGatherer.state});"gathering"!==n.iceGatheringState&&(n.iceGatheringState="gathering",n._emitGatheringStateChange()),s||(n.dispatchEvent(a),null!==n.onicecandidate&&n.onicecandidate(a)),p&&(n.dispatchEvent(new Event("icecandidate")),null!==n.onicecandidate&&n.onicecandidate(new Event("icecandidate")),n.iceGatheringState="complete",n._emitGatheringStateChange())}},e.setTimeout(function(){a.forEach(function(e){var t=new Event("RTCIceGatherEvent");t.candidate=e,i.onlocalcandidate(t)})},0)}},r.prototype._createIceAndDtlsTransports=function(){var t=this,r=new e.RTCIceTransport(null);r.onicestatechange=function(){t._updateConnectionState()};var n=new e.RTCDtlsTransport(r);return n.ondtlsstatechange=function(){t._updateConnectionState()},n.onerror=function(){Object.defineProperty(n,"state",{value:"failed",writable:!0}),t._updateConnectionState()},{iceTransport:r,dtlsTransport:n}},r.prototype._disposeIceAndDtlsTransports=function(e){var t=this.transceivers[e].iceGatherer;t&&(delete t.onlocalcandidate,delete this.transceivers[e].iceGatherer);var r=this.transceivers[e].iceTransport;r&&(delete r.onicestatechange,delete this.transceivers[e].iceTransport);var n=this.transceivers[e].dtlsTransport;n&&(delete n.ondtlsstatechange,delete n.onerror,delete this.transceivers[e].dtlsTransport)},r.prototype._transceive=function(e,r,n){var i=a(e.localCapabilities,e.remoteCapabilities);r&&e.rtpSender&&(i.encodings=e.sendEncodingParameters,i.rtcp={cname:c.localCName,compound:e.rtcpParameters.compound},e.recvEncodingParameters.length&&(i.rtcp.ssrc=e.recvEncodingParameters[0].ssrc),e.rtpSender.send(i)),n&&e.rtpReceiver&&("video"===e.kind&&e.recvEncodingParameters&&t<15019&&e.recvEncodingParameters.forEach(function(e){delete e.rtx}),i.encodings=e.recvEncodingParameters,i.rtcp={cname:e.rtcpParameters.cname,compound:e.rtcpParameters.compound},e.sendEncodingParameters.length&&(i.rtcp.ssrc=e.sendEncodingParameters[0].ssrc),e.rtpReceiver.receive(i))},r.prototype.setLocalDescription=function(e){var t=this,r=arguments;if(!o("setLocalDescription",e.type,this.signalingState))return new Promise(function(n,i){var a=new Error("Can not set remote "+e.type+" in state "+t.signalingState);a.name="InvalidStateError",r.length>2&&"function"==typeof r[2]&&r[2].apply(null,[a]),i(a)});var n,i;if("offer"===e.type)n=c.splitSections(e.sdp),i=n.shift(),n.forEach(function(e,r){var n=c.parseRtpParameters(e);t.transceivers[r].localCapabilities=n}),this.transceivers.forEach(function(e,r){t._gather(e.mid,r)});else if("answer"===e.type){n=c.splitSections(t.remoteDescription.sdp),i=n.shift();var s=c.matchPrefix(i,"a=ice-lite").length>0;n.forEach(function(e,r){var n=t.transceivers[r],o=n.iceGatherer,d=n.iceTransport,p=n.dtlsTransport,u=n.localCapabilities,l=n.remoteCapabilities;if(!c.isRejected(e)&&!n.isDatachannel){var f=c.getIceParameters(e,i),m=c.getDtlsParameters(e,i);s&&(m.role="server"),t.usingBundle&&0!==r||(t._gather(n.mid,r),"new"===d.state&&d.start(o,f,s?"controlling":"controlled"),"new"===p.state&&p.start(m));var h=a(u,l);t._transceive(n,h.codecs.length>0,!1)}})}switch(this.localDescription={type:e.type,sdp:e.sdp},e.type){case"offer":this._updateSignalingState("have-local-offer");break;case"answer":this._updateSignalingState("stable");break;default:throw new TypeError('unsupported type "'+e.type+'"')}var d=arguments.length>1&&"function"==typeof arguments[1]&&arguments[1];return new Promise(function(e){d&&d.apply(null),e()})},r.prototype.setRemoteDescription=function(r){var n=this,i=arguments;if(!o("setRemoteDescription",r.type,this.signalingState))return new Promise(function(e,t){var a=new Error("Can not set remote "+r.type+" in state "+n.signalingState);a.name="InvalidStateError",i.length>2&&"function"==typeof i[2]&&i[2].apply(null,[a]),t(a)});var a={};this.remoteStreams.forEach(function(e){a[e.id]=e});var d=[],p=c.splitSections(r.sdp),u=p.shift(),l=c.matchPrefix(u,"a=ice-lite").length>0,f=c.matchPrefix(u,"a=group:BUNDLE ").length>0;this.usingBundle=f;var m=c.matchPrefix(u,"a=ice-options:")[0];switch(this.canTrickleIceCandidates=!!m&&m.substr(14).split(" ").indexOf("trickle")>=0,p.forEach(function(i,o){var p=c.splitLines(i),m=c.getKind(i),h=c.isRejected(i),v=p[0].substr(2).split(" ")[2],g=c.getDirection(i,u),y=c.parseMsid(i),C=c.getMid(i)||c.generateIdentifier();if("application"!==m||"DTLS/SCTP"!==v){var T,S,P,b,R,E,w,k,_,x,O,D=c.parseRtpParameters(i);h||(x=c.getIceParameters(i,u),(O=c.getDtlsParameters(i,u)).role="client"),w=c.parseRtpEncodingParameters(i);var M=c.parseRtcpParameters(i),I=c.matchPrefix(i,"a=end-of-candidates",u).length>0,j=c.matchPrefix(i,"a=candidate:").map(function(e){return c.parseCandidate(e)}).filter(function(e){return 1===e.component});if(("offer"===r.type||"answer"===r.type)&&!h&&f&&o>0&&n.transceivers[o]&&(n._disposeIceAndDtlsTransports(o),n.transceivers[o].iceGatherer=n.transceivers[0].iceGatherer,n.transceivers[o].iceTransport=n.transceivers[0].iceTransport,n.transceivers[o].dtlsTransport=n.transceivers[0].dtlsTransport,n.transceivers[o].rtpSender&&n.transceivers[o].rtpSender.setTransport(n.transceivers[0].dtlsTransport),n.transceivers[o].rtpReceiver&&n.transceivers[o].rtpReceiver.setTransport(n.transceivers[0].dtlsTransport)),"offer"!==r.type||h)"answer"!==r.type||h||(S=(T=n.transceivers[o]).iceGatherer,P=T.iceTransport,b=T.dtlsTransport,R=T.rtpReceiver,E=T.sendEncodingParameters,k=T.localCapabilities,n.transceivers[o].recvEncodingParameters=w,n.transceivers[o].remoteCapabilities=D,n.transceivers[o].rtcpParameters=M,j.length&&(!l&&!I||f&&0!==o||"new"!==P.state?j.forEach(function(e){s(T.iceTransport,e)}):P.setRemoteCandidates(j)),f&&0!==o||("new"===P.state&&P.start(S,x,"controlling"),"new"===b.state&&b.start(O)),n._transceive(T,"sendrecv"===g||"recvonly"===g,"sendrecv"===g||"sendonly"===g),!R||"sendrecv"!==g&&"sendonly"!==g?delete T.rtpReceiver:(_=R.track,y?(a[y.stream]||(a[y.stream]=new e.MediaStream),a[y.stream].addTrack(_),d.push([_,R,a[y.stream]])):(a.default||(a.default=new e.MediaStream),a.default.addTrack(_),d.push([_,R,a.default]))));else{if(T=n.transceivers[o]||n._createTransceiver(m),T.mid=C,T.iceGatherer||(T.iceGatherer=n._createIceGatherer(o,f)),j.length&&(!I||f&&0!==o||"new"!==T.iceTransport.state?j.forEach(function(e){s(T.iceTransport,e)}):T.iceTransport.setRemoteCandidates(j)),k=e.RTCRtpReceiver.getCapabilities(m),t<15019&&(k.codecs=k.codecs.filter(function(e){return"rtx"!==e.name})),E=[{ssrc:1001*(2*o+2)}],"sendrecv"===g||"sendonly"===g){var L=!T.rtpReceiver;if(R=T.rtpReceiver||new e.RTCRtpReceiver(T.dtlsTransport,m),L){var U;_=R.track,y?(a[y.stream]||(a[y.stream]=new e.MediaStream,Object.defineProperty(a[y.stream],"id",{get:function(){return y.stream}})),Object.defineProperty(_,"id",{get:function(){return y.track}}),U=a[y.stream]):(a.default||(a.default=new e.MediaStream),U=a.default),U.addTrack(_),d.push([_,R,U])}}T.localCapabilities=k,T.remoteCapabilities=D,T.rtpReceiver=R,T.rtcpParameters=M,T.sendEncodingParameters=E,T.recvEncodingParameters=w,n._transceive(n.transceivers[o],!1,"sendrecv"===g||"sendonly"===g)}}else n.transceivers[o]={mid:C,isDatachannel:!0}}),this.remoteDescription={type:r.type,sdp:r.sdp},r.type){case"offer":this._updateSignalingState("have-remote-offer");break;case"answer":this._updateSignalingState("stable");break;default:throw new TypeError('unsupported type "'+r.type+'"')}return Object.keys(a).forEach(function(t){var r=a[t];if(r.getTracks().length){if(-1===n.remoteStreams.indexOf(r)){n.remoteStreams.push(r);var i=new Event("addstream");i.stream=r,e.setTimeout(function(){n.dispatchEvent(i),null!==n.onaddstream&&n.onaddstream(i)})}d.forEach(function(t){var i=t[0],a=t[1];if(r.id===t[2].id){var o=new Event("track");o.track=i,o.receiver=a,o.transceiver={receiver:a},o.streams=[r],e.setTimeout(function(){n.dispatchEvent(o),null!==n.ontrack&&n.ontrack(o)})}})}}),e.setTimeout(function(){n&&n.transceivers&&n.transceivers.forEach(function(e){e.iceTransport&&"new"===e.iceTransport.state&&e.iceTransport.getRemoteCandidates().length>0&&(console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"),e.iceTransport.addRemoteCandidate({}))})},4e3),new Promise(function(e){i.length>1&&"function"==typeof i[1]&&i[1].apply(null),e()})},r.prototype.close=function(){this.transceivers.forEach(function(e){e.iceTransport&&e.iceTransport.stop(),e.dtlsTransport&&e.dtlsTransport.stop(),e.rtpSender&&e.rtpSender.stop(),e.rtpReceiver&&e.rtpReceiver.stop()}),this._updateSignalingState("closed")},r.prototype._updateSignalingState=function(e){this.signalingState=e;var t=new Event("signalingstatechange");this.dispatchEvent(t),null!==this.onsignalingstatechange&&this.onsignalingstatechange(t)},r.prototype._maybeFireNegotiationNeeded=function(){var t=this;"stable"===this.signalingState&&!0!==this.needNegotiation&&(this.needNegotiation=!0,e.setTimeout(function(){if(!1!==t.needNegotiation){t.needNegotiation=!1;var e=new Event("negotiationneeded");t.dispatchEvent(e),null!==t.onnegotiationneeded&&t.onnegotiationneeded(e)}},0))},r.prototype._updateConnectionState=function(){var e,t=this,r={new:0,closed:0,connecting:0,checking:0,connected:0,completed:0,disconnected:0,failed:0};if(this.transceivers.forEach(function(e){r[e.iceTransport.state]++,r[e.dtlsTransport.state]++}),r.connected+=r.completed,e="new",r.failed>0?e="failed":r.connecting>0||r.checking>0?e="connecting":r.disconnected>0?e="disconnected":r.new>0?e="new":(r.connected>0||r.completed>0)&&(e="connected"),e!==t.iceConnectionState){t.iceConnectionState=e;var n=new Event("iceconnectionstatechange");this.dispatchEvent(n),null!==this.oniceconnectionstatechange&&this.oniceconnectionstatechange(n)}},r.prototype.createOffer=function(){var r,i=this,a=arguments;1===arguments.length&&"function"!=typeof arguments[0]?r=arguments[0]:3===arguments.length&&(r=arguments[2]);var o=this.transceivers.filter(function(e){return"audio"===e.kind}).length,s=this.transceivers.filter(function(e){return"video"===e.kind}).length;if(r){if(r.mandatory||r.optional)throw new TypeError("Legacy mandatory/optional constraints not supported.");void 0!==r.offerToReceiveAudio&&(o=!0===r.offerToReceiveAudio?1:!1===r.offerToReceiveAudio?0:r.offerToReceiveAudio),void 0!==r.offerToReceiveVideo&&(s=!0===r.offerToReceiveVideo?1:!1===r.offerToReceiveVideo?0:r.offerToReceiveVideo)}for(this.transceivers.forEach(function(e){"audio"===e.kind?--o<0&&(e.wantReceive=!1):"video"===e.kind&&--s<0&&(e.wantReceive=!1)});o>0||s>0;)o>0&&(this._createTransceiver("audio"),o--),s>0&&(this._createTransceiver("video"),s--);var d=c.writeSessionBoilerplate(this._sdpSessionId,this._sdpSessionVersion++);this.transceivers.forEach(function(r,n){var a=r.track,o=r.kind,s=c.generateIdentifier();r.mid=s,r.iceGatherer||(r.iceGatherer=i._createIceGatherer(n,i.usingBundle));var d=e.RTCRtpSender.getCapabilities(o);t<15019&&(d.codecs=d.codecs.filter(function(e){return"rtx"!==e.name})),d.codecs.forEach(function(e){"H264"===e.name&&void 0===e.parameters["level-asymmetry-allowed"]&&(e.parameters["level-asymmetry-allowed"]="1")});var p=[{ssrc:1001*(2*n+1)}];a&&t>=15019&&"video"===o&&(p[0].rtx={ssrc:1001*(2*n+1)+1}),r.wantReceive&&(r.rtpReceiver=new e.RTCRtpReceiver(r.dtlsTransport,o)),r.localCapabilities=d,r.sendEncodingParameters=p}),"max-compat"!==this._config.bundlePolicy&&(d+="a=group:BUNDLE "+this.transceivers.map(function(e){return e.mid}).join(" ")+"\r\n"),d+="a=ice-options:trickle\r\n",this.transceivers.forEach(function(e,t){d+=n(e,e.localCapabilities,"offer",e.stream),d+="a=rtcp-rsize\r\n",!e.iceGatherer||"new"===i.iceGatheringState||0!==t&&i.usingBundle||(e.iceGatherer.getLocalCandidates().forEach(function(e){e.component=1,d+="a="+c.writeCandidate(e)+"\r\n"}),"completed"===e.iceGatherer.state&&(d+="a=end-of-candidates\r\n"))});var p=new e.RTCSessionDescription({type:"offer",sdp:d});return new Promise(function(e){if(a.length>0&&"function"==typeof a[0])return a[0].apply(null,[p]),void e();e(p)})},r.prototype.createAnswer=function(){var r=arguments,i=c.writeSessionBoilerplate(this._sdpSessionId,this._sdpSessionVersion++);this.usingBundle&&(i+="a=group:BUNDLE "+this.transceivers.map(function(e){return e.mid}).join(" ")+"\r\n");var o=c.splitSections(this.remoteDescription.sdp).length-1;this.transceivers.forEach(function(e,r){if(!(r+1>o))if(e.isDatachannel)i+="m=application 0 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\na=mid:"+e.mid+"\r\n";else{if(e.stream){var s;"audio"===e.kind?s=e.stream.getAudioTracks()[0]:"video"===e.kind&&(s=e.stream.getVideoTracks()[0]),s&&t>=15019&&"video"===e.kind&&(e.sendEncodingParameters[0].rtx={ssrc:1001*(2*r+2)+1})}var c=a(e.localCapabilities,e.remoteCapabilities);!c.codecs.filter(function(e){return"rtx"===e.name.toLowerCase()}).length&&e.sendEncodingParameters[0].rtx&&delete e.sendEncodingParameters[0].rtx,i+=n(e,c,"answer",e.stream),e.rtcpParameters&&e.rtcpParameters.reducedSize&&(i+="a=rtcp-rsize\r\n")}});var s=new e.RTCSessionDescription({type:"answer",sdp:i});return new Promise(function(e){if(r.length>0&&"function"==typeof r[0])return r[0].apply(null,[s]),void e();e(s)})},r.prototype.addIceCandidate=function(e){var t,r;if(e&&""!==e.candidate){if(!e.sdpMLineIndex&&!e.sdpMid)throw new TypeError("sdpMLineIndex or sdpMid required");if(this.remoteDescription){var n=e.sdpMLineIndex;if(e.sdpMid)for(var i=0;i<this.transceivers.length;i++)if(this.transceivers[i].mid===e.sdpMid){n=i;break}var a=this.transceivers[n];if(a){if(a.isDatachannel)return Promise.resolve();var o=Object.keys(e.candidate).length>0?c.parseCandidate(e.candidate):{};if("tcp"===o.protocol&&(0===o.port||9===o.port))return Promise.resolve();if(o.component&&1!==o.component)return Promise.resolve();(0===n||n>0&&a.iceTransport!==this.transceivers[0].iceTransport)&&a.iceTransport.addRemoteCandidate(o);var s=e.candidate.trim();0===s.indexOf("a=")&&(s=s.substr(2)),(r=c.splitSections(this.remoteDescription.sdp))[n+1]+="a="+(o.type?s:"end-of-candidates")+"\r\n",this.remoteDescription.sdp=r.join("")}else(t=new Error("Can not add ICE candidate")).name="OperationError"}else(t=new Error("Can not add ICE candidate without a remote description")).name="InvalidStateError"}else for(var d=0;d<this.transceivers.length&&(this.transceivers[d].isDatachannel||(this.transceivers[d].iceTransport.addRemoteCandidate({}),r=c.splitSections(this.remoteDescription.sdp),r[d+1]+="a=end-of-candidates\r\n",this.remoteDescription.sdp=r.join(""),!this.usingBundle));d++);var p=arguments;return new Promise(function(e,r){t?(p.length>2&&"function"==typeof p[2]&&p[2].apply(null,[t]),r(t)):(p.length>1&&"function"==typeof p[1]&&p[1].apply(null),e())})},r.prototype.getStats=function(){var e=[];this.transceivers.forEach(function(t){["rtpSender","rtpReceiver","iceGatherer","iceTransport","dtlsTransport"].forEach(function(r){t[r]&&e.push(t[r].getStats())})});var t=arguments.length>1&&"function"==typeof arguments[1]&&arguments[1],r=function(e){return{inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"}[e.type]||e.type};return new Promise(function(n){var i=new Map;Promise.all(e).then(function(e){e.forEach(function(e){Object.keys(e).forEach(function(t){e[t].type=r(e[t]),i.set(t,e[t])})}),t&&t.apply(null,i),n(i)})})},r}},{sdp:2}],2:[function(e,t,r){"use strict";var n={};n.generateIdentifier=function(){return Math.random().toString(36).substr(2,10)},n.localCName=n.generateIdentifier(),n.splitLines=function(e){return e.trim().split("\n").map(function(e){return e.trim()})},n.splitSections=function(e){return e.split("\nm=").map(function(e,t){return(t>0?"m="+e:e).trim()+"\r\n"})},n.matchPrefix=function(e,t){return n.splitLines(e).filter(function(e){return 0===e.indexOf(t)})},n.parseCandidate=function(e){for(var t,r={foundation:(t=0===e.indexOf("a=candidate:")?e.substring(12).split(" "):e.substring(10).split(" "))[0],component:parseInt(t[1],10),protocol:t[2].toLowerCase(),priority:parseInt(t[3],10),ip:t[4],port:parseInt(t[5],10),type:t[7]},n=8;n<t.length;n+=2)switch(t[n]){case"raddr":r.relatedAddress=t[n+1];break;case"rport":r.relatedPort=parseInt(t[n+1],10);break;case"tcptype":r.tcpType=t[n+1];break;case"ufrag":r.ufrag=t[n+1],r.usernameFragment=t[n+1];break;default:r[t[n]]=t[n+1]}return r},n.writeCandidate=function(e){var t=[];t.push(e.foundation),t.push(e.component),t.push(e.protocol.toUpperCase()),t.push(e.priority),t.push(e.ip),t.push(e.port);var r=e.type;return t.push("typ"),t.push(r),"host"!==r&&e.relatedAddress&&e.relatedPort&&(t.push("raddr"),t.push(e.relatedAddress),t.push("rport"),t.push(e.relatedPort)),e.tcpType&&"tcp"===e.protocol.toLowerCase()&&(t.push("tcptype"),t.push(e.tcpType)),e.ufrag&&(t.push("ufrag"),t.push(e.ufrag)),"candidate:"+t.join(" ")},n.parseIceOptions=function(e){return e.substr(14).split(" ")},n.parseRtpMap=function(e){var t=e.substr(9).split(" "),r={payloadType:parseInt(t.shift(),10)};return t=t[0].split("/"),r.name=t[0],r.clockRate=parseInt(t[1],10),r.numChannels=3===t.length?parseInt(t[2],10):1,r},n.writeRtpMap=function(e){var t=e.payloadType;return void 0!==e.preferredPayloadType&&(t=e.preferredPayloadType),"a=rtpmap:"+t+" "+e.name+"/"+e.clockRate+(1!==e.numChannels?"/"+e.numChannels:"")+"\r\n"},n.parseExtmap=function(e){var t=e.substr(9).split(" ");return{id:parseInt(t[0],10),direction:t[0].indexOf("/")>0?t[0].split("/")[1]:"sendrecv",uri:t[1]}},n.writeExtmap=function(e){return"a=extmap:"+(e.id||e.preferredId)+(e.direction&&"sendrecv"!==e.direction?"/"+e.direction:"")+" "+e.uri+"\r\n"},n.parseFmtp=function(e){for(var t,r={},n=e.substr(e.indexOf(" ")+1).split(";"),i=0;i<n.length;i++)r[(t=n[i].trim().split("="))[0].trim()]=t[1];return r},n.writeFmtp=function(e){var t="",r=e.payloadType;if(void 0!==e.preferredPayloadType&&(r=e.preferredPayloadType),e.parameters&&Object.keys(e.parameters).length){var n=[];Object.keys(e.parameters).forEach(function(t){n.push(t+"="+e.parameters[t])}),t+="a=fmtp:"+r+" "+n.join(";")+"\r\n"}return t},n.parseRtcpFb=function(e){var t=e.substr(e.indexOf(" ")+1).split(" ");return{type:t.shift(),parameter:t.join(" ")}},n.writeRtcpFb=function(e){var t="",r=e.payloadType;return void 0!==e.preferredPayloadType&&(r=e.preferredPayloadType),e.rtcpFeedback&&e.rtcpFeedback.length&&e.rtcpFeedback.forEach(function(e){t+="a=rtcp-fb:"+r+" "+e.type+(e.parameter&&e.parameter.length?" "+e.parameter:"")+"\r\n"}),t},n.parseSsrcMedia=function(e){var t=e.indexOf(" "),r={ssrc:parseInt(e.substr(7,t-7),10)},n=e.indexOf(":",t);return n>-1?(r.attribute=e.substr(t+1,n-t-1),r.value=e.substr(n+1)):r.attribute=e.substr(t+1),r},n.getMid=function(e){var t=n.matchPrefix(e,"a=mid:")[0];if(t)return t.substr(6)},n.parseFingerprint=function(e){var t=e.substr(14).split(" ");return{algorithm:t[0].toLowerCase(),value:t[1]}},n.getDtlsParameters=function(e,t){return{role:"auto",fingerprints:n.matchPrefix(e+t,"a=fingerprint:").map(n.parseFingerprint)}},n.writeDtlsParameters=function(e,t){var r="a=setup:"+t+"\r\n";return e.fingerprints.forEach(function(e){r+="a=fingerprint:"+e.algorithm+" "+e.value+"\r\n"}),r},n.getIceParameters=function(e,t){var r=n.splitLines(e);return{usernameFragment:(r=r.concat(n.splitLines(t))).filter(function(e){return 0===e.indexOf("a=ice-ufrag:")})[0].substr(12),password:r.filter(function(e){return 0===e.indexOf("a=ice-pwd:")})[0].substr(10)}},n.writeIceParameters=function(e){return"a=ice-ufrag:"+e.usernameFragment+"\r\na=ice-pwd:"+e.password+"\r\n"},n.parseRtpParameters=function(e){for(var t={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},r=n.splitLines(e)[0].split(" "),i=3;i<r.length;i++){var a=r[i],o=n.matchPrefix(e,"a=rtpmap:"+a+" ")[0];if(o){var s=n.parseRtpMap(o),c=n.matchPrefix(e,"a=fmtp:"+a+" ");switch(s.parameters=c.length?n.parseFmtp(c[0]):{},s.rtcpFeedback=n.matchPrefix(e,"a=rtcp-fb:"+a+" ").map(n.parseRtcpFb),t.codecs.push(s),s.name.toUpperCase()){case"RED":case"ULPFEC":t.fecMechanisms.push(s.name.toUpperCase())}}}return n.matchPrefix(e,"a=extmap:").forEach(function(e){t.headerExtensions.push(n.parseExtmap(e))}),t},n.writeRtpDescription=function(e,t){var r="";r+="m="+e+" ",r+=t.codecs.length>0?"9":"0",r+=" UDP/TLS/RTP/SAVPF ",r+=t.codecs.map(function(e){return void 0!==e.preferredPayloadType?e.preferredPayloadType:e.payloadType}).join(" ")+"\r\n",r+="c=IN IP4 0.0.0.0\r\n",r+="a=rtcp:9 IN IP4 0.0.0.0\r\n",t.codecs.forEach(function(e){r+=n.writeRtpMap(e),r+=n.writeFmtp(e),r+=n.writeRtcpFb(e)});var i=0;return t.codecs.forEach(function(e){e.maxptime>i&&(i=e.maxptime)}),i>0&&(r+="a=maxptime:"+i+"\r\n"),r+="a=rtcp-mux\r\n",t.headerExtensions.forEach(function(e){r+=n.writeExtmap(e)}),r},n.parseRtpEncodingParameters=function(e){var t,r=[],i=n.parseRtpParameters(e),a=-1!==i.fecMechanisms.indexOf("RED"),o=-1!==i.fecMechanisms.indexOf("ULPFEC"),s=n.matchPrefix(e,"a=ssrc:").map(function(e){return n.parseSsrcMedia(e)}).filter(function(e){return"cname"===e.attribute}),c=s.length>0&&s[0].ssrc,d=n.matchPrefix(e,"a=ssrc-group:FID").map(function(e){var t=e.split(" ");return t.shift(),t.map(function(e){return parseInt(e,10)})});d.length>0&&d[0].length>1&&d[0][0]===c&&(t=d[0][1]),i.codecs.forEach(function(e){if("RTX"===e.name.toUpperCase()&&e.parameters.apt){var n={ssrc:c,codecPayloadType:parseInt(e.parameters.apt,10),rtx:{ssrc:t}};r.push(n),a&&((n=JSON.parse(JSON.stringify(n))).fec={ssrc:t,mechanism:o?"red+ulpfec":"red"},r.push(n))}}),0===r.length&&c&&r.push({ssrc:c});var p=n.matchPrefix(e,"b=");return p.length&&(p=0===p[0].indexOf("b=TIAS:")?parseInt(p[0].substr(7),10):0===p[0].indexOf("b=AS:")?1e3*parseInt(p[0].substr(5),10)*.95-16e3:void 0,r.forEach(function(e){e.maxBitrate=p})),r},n.parseRtcpParameters=function(e){var t={},r=n.matchPrefix(e,"a=ssrc:").map(function(e){return n.parseSsrcMedia(e)}).filter(function(e){return"cname"===e.attribute})[0];r&&(t.cname=r.value,t.ssrc=r.ssrc);var i=n.matchPrefix(e,"a=rtcp-rsize");t.reducedSize=i.length>0,t.compound=0===i.length;var a=n.matchPrefix(e,"a=rtcp-mux");return t.mux=a.length>0,t},n.parseMsid=function(e){var t,r=n.matchPrefix(e,"a=msid:");if(1===r.length)return t=r[0].substr(7).split(" "),{stream:t[0],track:t[1]};var i=n.matchPrefix(e,"a=ssrc:").map(function(e){return n.parseSsrcMedia(e)}).filter(function(e){return"msid"===e.attribute});return i.length>0?(t=i[0].value.split(" "),{stream:t[0],track:t[1]}):void 0},n.generateSessionId=function(){return Math.random().toString().substr(2,21)},n.writeSessionBoilerplate=function(e,t){var r=void 0!==t?t:2;return"v=0\r\no=thisisadapterortc "+(e||n.generateSessionId())+" "+r+" IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"},n.writeMediaSection=function(e,t,r,i){var a=n.writeRtpDescription(e.kind,t);if(a+=n.writeIceParameters(e.iceGatherer.getLocalParameters()),a+=n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(),"offer"===r?"actpass":"active"),a+="a=mid:"+e.mid+"\r\n",e.direction?a+="a="+e.direction+"\r\n":e.rtpSender&&e.rtpReceiver?a+="a=sendrecv\r\n":e.rtpSender?a+="a=sendonly\r\n":e.rtpReceiver?a+="a=recvonly\r\n":a+="a=inactive\r\n",e.rtpSender){var o="msid:"+i.id+" "+e.rtpSender.track.id+"\r\n";a+="a="+o,a+="a=ssrc:"+e.sendEncodingParameters[0].ssrc+" "+o,e.sendEncodingParameters[0].rtx&&(a+="a=ssrc:"+e.sendEncodingParameters[0].rtx.ssrc+" "+o,a+="a=ssrc-group:FID "+e.sendEncodingParameters[0].ssrc+" "+e.sendEncodingParameters[0].rtx.ssrc+"\r\n")}return a+="a=ssrc:"+e.sendEncodingParameters[0].ssrc+" cname:"+n.localCName+"\r\n",e.rtpSender&&e.sendEncodingParameters[0].rtx&&(a+="a=ssrc:"+e.sendEncodingParameters[0].rtx.ssrc+" cname:"+n.localCName+"\r\n"),a},n.getDirection=function(e,t){for(var r=n.splitLines(e),i=0;i<r.length;i++)switch(r[i]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[i].substr(2)}return t?n.getDirection(t):"sendrecv"},n.getKind=function(e){return n.splitLines(e)[0].split(" ")[0].substr(2)},n.isRejected=function(e){return"0"===e.split(" ",2)[1]},t.exports=n},{}],3:[function(e,t,r){(function(r){"use strict";var n=e("./adapter_factory.js");t.exports=n({window:r.window})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./adapter_factory.js":4}],4:[function(e,t,r){"use strict";t.exports=function(t,r){var n=t&&t.window,i={shimChrome:!0,shimFirefox:!0,shimEdge:!0,shimSafari:!0};for(var a in r)hasOwnProperty.call(r,a)&&(i[a]=r[a]);var o=e("./utils"),s=o.log,c=o.detectBrowser(n),d={browserDetails:c,extractVersion:o.extractVersion,disableLog:o.disableLog,disableWarnings:o.disableWarnings},p=e("./chrome/chrome_shim")||null,u=e("./edge/edge_shim")||null,l=e("./firefox/firefox_shim")||null,f=e("./safari/safari_shim")||null,m=e("./common_shim")||null;switch(c.browser){case"chrome":if(!p||!p.shimPeerConnection||!i.shimChrome)return s("Chrome shim is not included in this adapter release."),d;s("adapter.js shimming chrome."),d.browserShim=p,p.shimGetUserMedia(n),p.shimMediaStream(n),o.shimCreateObjectURL(n),p.shimSourceObject(n),p.shimPeerConnection(n),p.shimOnTrack(n),p.shimAddTrackRemoveTrack(n),p.shimGetSendersWithDtmf(n),m.shimRTCIceCandidate(n);break;case"firefox":if(!l||!l.shimPeerConnection||!i.shimFirefox)return s("Firefox shim is not included in this adapter release."),d;s("adapter.js shimming firefox."),d.browserShim=l,l.shimGetUserMedia(n),o.shimCreateObjectURL(n),l.shimSourceObject(n),l.shimPeerConnection(n),l.shimOnTrack(n),m.shimRTCIceCandidate(n);break;case"edge":if(!u||!u.shimPeerConnection||!i.shimEdge)return s("MS edge shim is not included in this adapter release."),d;s("adapter.js shimming edge."),d.browserShim=u,u.shimGetUserMedia(n),o.shimCreateObjectURL(n),u.shimPeerConnection(n),u.shimReplaceTrack(n);break;case"safari":if(!f||!i.shimSafari)return s("Safari shim is not included in this adapter release."),d;s("adapter.js shimming safari."),d.browserShim=f,o.shimCreateObjectURL(n),f.shimRTCIceServerUrls(n),f.shimCallbacksAPI(n),f.shimLocalStreamsAPI(n),f.shimRemoteStreamsAPI(n),f.shimTrackEventTransceiver(n),f.shimGetUserMedia(n),m.shimRTCIceCandidate(n);break;default:s("Unsupported browser!")}return d}},{"./chrome/chrome_shim":5,"./common_shim":7,"./edge/edge_shim":8,"./firefox/firefox_shim":10,"./safari/safari_shim":12,"./utils":13}],5:[function(e,t,r){"use strict";var n=e("../utils.js"),i=n.log,a={shimMediaStream:function(e){e.MediaStream=e.MediaStream||e.webkitMediaStream},shimOnTrack:function(e){if("object"==typeof e&&e.RTCPeerConnection&&!("ontrack"in e.RTCPeerConnection.prototype)){Object.defineProperty(e.RTCPeerConnection.prototype,"ontrack",{get:function(){return this._ontrack},set:function(e){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=e)}});var t=e.RTCPeerConnection.prototype.setRemoteDescription;e.RTCPeerConnection.prototype.setRemoteDescription=function(){var r=this;return r._ontrackpoly||(r._ontrackpoly=function(t){t.stream.addEventListener("addtrack",function(n){var i;i=e.RTCPeerConnection.prototype.getReceivers?r.getReceivers().find(function(e){return e.track&&e.track.id===n.track.id}):{track:n.track};var a=new Event("track");a.track=n.track,a.receiver=i,a.transceiver={receiver:i},a.streams=[t.stream],r.dispatchEvent(a)}),t.stream.getTracks().forEach(function(n){var i;i=e.RTCPeerConnection.prototype.getReceivers?r.getReceivers().find(function(e){return e.track&&e.track.id===n.id}):{track:n};var a=new Event("track");a.track=n,a.receiver=i,a.transceiver={receiver:i},a.streams=[t.stream],r.dispatchEvent(a)})},r.addEventListener("addstream",r._ontrackpoly)),t.apply(r,arguments)}}},shimGetSendersWithDtmf:function(e){if("object"==typeof e&&e.RTCPeerConnection&&!("getSenders"in e.RTCPeerConnection.prototype)&&"createDTMFSender"in e.RTCPeerConnection.prototype){var t=function(e,t){return{track:t,get dtmf(){return void 0===this._dtmf&&("audio"===t.kind?this._dtmf=e.createDTMFSender(t):this._dtmf=null),this._dtmf},_pc:e}};if(!e.RTCPeerConnection.prototype.getSenders){e.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};var r=e.RTCPeerConnection.prototype.addTrack;e.RTCPeerConnection.prototype.addTrack=function(e,n){var i=this,a=r.apply(i,arguments);return a||(a=t(i,e),i._senders.push(a)),a};var n=e.RTCPeerConnection.prototype.removeTrack;e.RTCPeerConnection.prototype.removeTrack=function(e){var t=this;n.apply(t,arguments);var r=t._senders.indexOf(e);-1!==r&&t._senders.splice(r,1)}}var i=e.RTCPeerConnection.prototype.addStream;e.RTCPeerConnection.prototype.addStream=function(e){var r=this;r._senders=r._senders||[],i.apply(r,[e]),e.getTracks().forEach(function(e){r._senders.push(t(r,e))})};var a=e.RTCPeerConnection.prototype.removeStream;e.RTCPeerConnection.prototype.removeStream=function(e){var t=this;t._senders=t._senders||[],a.apply(t,[t._streams[e.id]||e]),e.getTracks().forEach(function(e){var r=t._senders.find(function(t){return t.track===e});r&&t._senders.splice(t._senders.indexOf(r),1)})}}else if("object"==typeof e&&e.RTCPeerConnection&&"getSenders"in e.RTCPeerConnection.prototype&&"createDTMFSender"in e.RTCPeerConnection.prototype&&e.RTCRtpSender&&!("dtmf"in e.RTCRtpSender.prototype)){var o=e.RTCPeerConnection.prototype.getSenders;e.RTCPeerConnection.prototype.getSenders=function(){var e=this,t=o.apply(e,[]);return t.forEach(function(t){t._pc=e}),t},Object.defineProperty(e.RTCRtpSender.prototype,"dtmf",{get:function(){return void 0===this._dtmf&&("audio"===this.track.kind?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}},shimSourceObject:function(e){var t=e&&e.URL;"object"==typeof e&&(!e.HTMLMediaElement||"srcObject"in e.HTMLMediaElement.prototype||Object.defineProperty(e.HTMLMediaElement.prototype,"srcObject",{get:function(){return this._srcObject},set:function(e){var r=this;this._srcObject=e,this.src&&t.revokeObjectURL(this.src),e?(this.src=t.createObjectURL(e),e.addEventListener("addtrack",function(){r.src&&t.revokeObjectURL(r.src),r.src=t.createObjectURL(e)}),e.addEventListener("removetrack",function(){r.src&&t.revokeObjectURL(r.src),r.src=t.createObjectURL(e)})):this.src=""}}))},shimAddTrackRemoveTrack:function(e){function t(e,t){var r=t.sdp;return Object.keys(e._reverseStreams||[]).forEach(function(t){var n=e._reverseStreams[t],i=e._streams[n.id];r=r.replace(new RegExp(i.id,"g"),n.id)}),new RTCSessionDescription({type:t.type,sdp:r})}function r(e,t){var r=t.sdp;return Object.keys(e._reverseStreams||[]).forEach(function(t){var n=e._reverseStreams[t],i=e._streams[n.id];r=r.replace(new RegExp(n.id,"g"),i.id)}),new RTCSessionDescription({type:t.type,sdp:r})}if(!e.RTCPeerConnection.prototype.addTrack){var n=e.RTCPeerConnection.prototype.getLocalStreams;e.RTCPeerConnection.prototype.getLocalStreams=function(){var e=this,t=n.apply(this);return e._reverseStreams=e._reverseStreams||{},t.map(function(t){return e._reverseStreams[t.id]})};var i=e.RTCPeerConnection.prototype.addStream;e.RTCPeerConnection.prototype.addStream=function(t){var r=this;if(r._streams=r._streams||{},r._reverseStreams=r._reverseStreams||{},t.getTracks().forEach(function(e){if(r.getSenders().find(function(t){return t.track===e}))throw new DOMException("Track already exists.","InvalidAccessError")}),!r._reverseStreams[t.id]){var n=new e.MediaStream(t.getTracks());r._streams[t.id]=n,r._reverseStreams[n.id]=t,t=n}i.apply(r,[t])};var a=e.RTCPeerConnection.prototype.removeStream;e.RTCPeerConnection.prototype.removeStream=function(e){var t=this;t._streams=t._streams||{},t._reverseStreams=t._reverseStreams||{},a.apply(t,[t._streams[e.id]||e]),delete t._reverseStreams[t._streams[e.id]?t._streams[e.id].id:e.id],delete t._streams[e.id]},e.RTCPeerConnection.prototype.addTrack=function(t,r){var n=this;if("closed"===n.signalingState)throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");var i=[].slice.call(arguments,1);if(1!==i.length||!i[0].getTracks().find(function(e){return e===t}))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(n.getSenders().find(function(e){return e.track===t}))throw new DOMException("Track already exists.","InvalidAccessError");n._streams=n._streams||{},n._reverseStreams=n._reverseStreams||{};var a=n._streams[r.id];if(a)a.addTrack(t),Promise.resolve().then(function(){n.dispatchEvent(new Event("negotiationneeded"))});else{var o=new e.MediaStream([t]);n._streams[r.id]=o,n._reverseStreams[o.id]=r,n.addStream(o)}return n.getSenders().find(function(e){return e.track===t})},["createOffer","createAnswer"].forEach(function(r){var n=e.RTCPeerConnection.prototype[r];e.RTCPeerConnection.prototype[r]=function(){var e=this,r=arguments;return arguments.length&&"function"==typeof arguments[0]?n.apply(e,[function(n){var i=t(e,n);r[0].apply(null,[i])},function(e){r[1]&&r[1].apply(null,e)},arguments[2]]):n.apply(e,arguments).then(function(r){return t(e,r)})}});var o=e.RTCPeerConnection.prototype.setLocalDescription;e.RTCPeerConnection.prototype.setLocalDescription=function(){var e=this;return arguments.length&&arguments[0].type?(arguments[0]=r(e,arguments[0]),o.apply(e,arguments)):o.apply(e,arguments)};var s=Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(e.RTCPeerConnection.prototype,"localDescription",{get:function(){var e=this,r=s.get.apply(this);return""===r.type?r:t(e,r)}}),e.RTCPeerConnection.prototype.removeTrack=function(e){var t=this;if("closed"===t.signalingState)throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!e._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(e._pc===t))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");t._streams=t._streams||{};var r;Object.keys(t._streams).forEach(function(n){t._streams[n].getTracks().find(function(t){return e.track===t})&&(r=t._streams[n])}),r&&(1===r.getTracks().length?t.removeStream(r):r.removeTrack(e.track),t.dispatchEvent(new Event("negotiationneeded")))}}},shimPeerConnection:function(e){var t=n.detectBrowser(e);if(e.RTCPeerConnection){var r=e.RTCPeerConnection;e.RTCPeerConnection=function(e,t){if(e&&e.iceServers){for(var i=[],a=0;a<e.iceServers.length;a++){var o=e.iceServers[a];!o.hasOwnProperty("urls")&&o.hasOwnProperty("url")?(n.deprecated("RTCIceServer.url","RTCIceServer.urls"),(o=JSON.parse(JSON.stringify(o))).urls=o.url,i.push(o)):i.push(e.iceServers[a])}e.iceServers=i}return new r(e,t)},e.RTCPeerConnection.prototype=r.prototype,Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:function(){return r.generateCertificate}})}else e.RTCPeerConnection=function(t,r){return i("PeerConnection"),t&&t.iceTransportPolicy&&(t.iceTransports=t.iceTransportPolicy),new e.webkitRTCPeerConnection(t,r)},e.RTCPeerConnection.prototype=e.webkitRTCPeerConnection.prototype,e.webkitRTCPeerConnection.generateCertificate&&Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:function(){return e.webkitRTCPeerConnection.generateCertificate}});var a=e.RTCPeerConnection.prototype.getStats;e.RTCPeerConnection.prototype.getStats=function(e,t,r){var n=this,i=arguments;if(arguments.length>0&&"function"==typeof e)return a.apply(this,arguments);if(0===a.length&&(0===arguments.length||"function"!=typeof arguments[0]))return a.apply(this,[]);var o=function(e){var t={};return e.result().forEach(function(e){var r={id:e.id,timestamp:e.timestamp,type:{localcandidate:"local-candidate",remotecandidate:"remote-candidate"}[e.type]||e.type};e.names().forEach(function(t){r[t]=e.stat(t)}),t[r.id]=r}),t},s=function(e){return new Map(Object.keys(e).map(function(t){return[t,e[t]]}))};if(arguments.length>=2){return a.apply(this,[function(e){i[1](s(o(e)))},arguments[0]])}return new Promise(function(e,t){a.apply(n,[function(t){e(s(o(t)))},t])}).then(t,r)},t.version<51&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){var e=arguments,t=this,n=new Promise(function(n,i){r.apply(t,[e[0],n,i])});return e.length<2?n:n.then(function(){e[1].apply(null,[])},function(t){e.length>=3&&e[2].apply(null,[t])})}}),t.version<52&&["createOffer","createAnswer"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){var e=this;if(arguments.length<1||1===arguments.length&&"object"==typeof arguments[0]){var t=1===arguments.length?arguments[0]:void 0;return new Promise(function(n,i){r.apply(e,[n,i,t])})}return r.apply(this,arguments)}}),["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){return arguments[0]=new("addIceCandidate"===t?e.RTCIceCandidate:e.RTCSessionDescription)(arguments[0]),r.apply(this,arguments)}});var o=e.RTCPeerConnection.prototype.addIceCandidate;e.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?o.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())}}};t.exports={shimMediaStream:a.shimMediaStream,shimOnTrack:a.shimOnTrack,shimAddTrackRemoveTrack:a.shimAddTrackRemoveTrack,shimGetSendersWithDtmf:a.shimGetSendersWithDtmf,shimSourceObject:a.shimSourceObject,shimPeerConnection:a.shimPeerConnection,shimGetUserMedia:e("./getusermedia")}},{"../utils.js":13,"./getusermedia":6}],6:[function(e,t,r){"use strict";var n=e("../utils.js"),i=n.log;t.exports=function(e){var t=n.detectBrowser(e),r=e&&e.navigator,a=function(e){if("object"!=typeof e||e.mandatory||e.optional)return e;var t={};return Object.keys(e).forEach(function(r){if("require"!==r&&"advanced"!==r&&"mediaSource"!==r){var n="object"==typeof e[r]?e[r]:{ideal:e[r]};void 0!==n.exact&&"number"==typeof n.exact&&(n.min=n.max=n.exact);var i=function(e,t){return e?e+t.charAt(0).toUpperCase()+t.slice(1):"deviceId"===t?"sourceId":t};if(void 0!==n.ideal){t.optional=t.optional||[];var a={};"number"==typeof n.ideal?(a[i("min",r)]=n.ideal,t.optional.push(a),(a={})[i("max",r)]=n.ideal,t.optional.push(a)):(a[i("",r)]=n.ideal,t.optional.push(a))}void 0!==n.exact&&"number"!=typeof n.exact?(t.mandatory=t.mandatory||{},t.mandatory[i("",r)]=n.exact):["min","max"].forEach(function(e){void 0!==n[e]&&(t.mandatory=t.mandatory||{},t.mandatory[i(e,r)]=n[e])})}}),e.advanced&&(t.optional=(t.optional||[]).concat(e.advanced)),t},o=function(e,n){if((e=JSON.parse(JSON.stringify(e)))&&"object"==typeof e.audio){var o=function(e,t,r){t in e&&!(r in e)&&(e[r]=e[t],delete e[t])};o((e=JSON.parse(JSON.stringify(e))).audio,"autoGainControl","googAutoGainControl"),o(e.audio,"noiseSuppression","googNoiseSuppression"),e.audio=a(e.audio)}if(e&&"object"==typeof e.video){var s=e.video.facingMode;s=s&&("object"==typeof s?s:{ideal:s});var c=t.version<61;if(s&&("user"===s.exact||"environment"===s.exact||"user"===s.ideal||"environment"===s.ideal)&&(!r.mediaDevices.getSupportedConstraints||!r.mediaDevices.getSupportedConstraints().facingMode||c)){delete e.video.facingMode;var d;if("environment"===s.exact||"environment"===s.ideal?d=["back","rear"]:"user"!==s.exact&&"user"!==s.ideal||(d=["front"]),d)return r.mediaDevices.enumerateDevices().then(function(t){var r=(t=t.filter(function(e){return"videoinput"===e.kind})).find(function(e){return d.some(function(t){return-1!==e.label.toLowerCase().indexOf(t)})});return!r&&t.length&&-1!==d.indexOf("back")&&(r=t[t.length-1]),r&&(e.video.deviceId=s.exact?{exact:r.deviceId}:{ideal:r.deviceId}),e.video=a(e.video),i("chrome: "+JSON.stringify(e)),n(e)})}e.video=a(e.video)}return i("chrome: "+JSON.stringify(e)),n(e)},s=function(e){return{name:{PermissionDeniedError:"NotAllowedError",InvalidStateError:"NotReadableError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotReadableError",MediaDeviceKillSwitchOn:"NotReadableError"}[e.name]||e.name,message:e.message,constraint:e.constraintName,toString:function(){return this.name+(this.message&&": ")+this.message}}};r.getUserMedia=function(e,t,n){o(e,function(e){r.webkitGetUserMedia(e,t,function(e){n&&n(s(e))})})};var c=function(e){return new Promise(function(t,n){r.getUserMedia(e,t,n)})};if(r.mediaDevices||(r.mediaDevices={getUserMedia:c,enumerateDevices:function(){return new Promise(function(t){var r={audio:"audioinput",video:"videoinput"};return e.MediaStreamTrack.getSources(function(e){t(e.map(function(e){return{label:e.label,kind:r[e.kind],deviceId:e.id,groupId:""}}))})})},getSupportedConstraints:function(){return{deviceId:!0,echoCancellation:!0,facingMode:!0,frameRate:!0,height:!0,width:!0}}}),r.mediaDevices.getUserMedia){var d=r.mediaDevices.getUserMedia.bind(r.mediaDevices);r.mediaDevices.getUserMedia=function(e){return o(e,function(e){return d(e).then(function(t){if(e.audio&&!t.getAudioTracks().length||e.video&&!t.getVideoTracks().length)throw t.getTracks().forEach(function(e){e.stop()}),new DOMException("","NotFoundError");return t},function(e){return Promise.reject(s(e))})})}}else r.mediaDevices.getUserMedia=function(e){return c(e)};void 0===r.mediaDevices.addEventListener&&(r.mediaDevices.addEventListener=function(){i("Dummy mediaDevices.addEventListener called.")}),void 0===r.mediaDevices.removeEventListener&&(r.mediaDevices.removeEventListener=function(){i("Dummy mediaDevices.removeEventListener called.")})}},{"../utils.js":13}],7:[function(e,t,r){"use strict";function n(e,t,r){if(e.RTCPeerConnection){var n=e.RTCPeerConnection.prototype,i=n.addEventListener;n.addEventListener=function(e,n){if(e!==t)return i.apply(this,arguments);var a=function(e){n(r(e))};return this._eventMap=this._eventMap||{},this._eventMap[n]=a,i.apply(this,[e,a])};var a=n.removeEventListener;n.removeEventListener=function(e,r){if(e!==t||!this._eventMap||!this._eventMap[r])return a.apply(this,arguments);var n=this._eventMap[r];return delete this._eventMap[r],a.apply(this,[e,n])},Object.defineProperty(n,"on"+t,{get:function(){return this["_on"+t]},set:function(e){this["_on"+t]&&(this.removeEventListener(t,this["_on"+t]),delete this["_on"+t]),e&&this.addEventListener(t,this["_on"+t]=e)}})}}var i=e("sdp");t.exports={shimRTCIceCandidate:function(e){if(!(e.RTCIceCandidate&&"foundation"in e.RTCIceCandidate.prototype)){var t=e.RTCIceCandidate;e.RTCIceCandidate=function(e){"object"==typeof e&&e.candidate&&0===e.candidate.indexOf("a=")&&((e=JSON.parse(JSON.stringify(e))).candidate=e.candidate.substr(2));var r=new t(e),n=i.parseCandidate(e.candidate),a=Object.assign(r,n);return a.toJSON=function(){return{candidate:a.candidate,sdpMid:a.sdpMid,sdpMLineIndex:a.sdpMLineIndex,usernameFragment:a.usernameFragment}},a},n(e,"icecandidate",function(t){return t.candidate&&Object.defineProperty(t,"candidate",{value:new e.RTCIceCandidate(t.candidate),writable:"false"}),t})}}}},{sdp:2}],8:[function(e,t,r){"use strict";var n=e("../utils"),i=e("rtcpeerconnection-shim");t.exports={shimGetUserMedia:e("./getusermedia"),shimPeerConnection:function(e){var t=n.detectBrowser(e);if(e.RTCIceGatherer&&(e.RTCIceCandidate||(e.RTCIceCandidate=function(e){return e}),e.RTCSessionDescription||(e.RTCSessionDescription=function(e){return e}),t.version<15025)){var r=Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype,"enabled");Object.defineProperty(e.MediaStreamTrack.prototype,"enabled",{set:function(e){r.set.call(this,e);var t=new Event("enabled");t.enabled=e,this.dispatchEvent(t)}})}!e.RTCRtpSender||"dtmf"in e.RTCRtpSender.prototype||Object.defineProperty(e.RTCRtpSender.prototype,"dtmf",{get:function(){return void 0===this._dtmf&&("audio"===this.track.kind?this._dtmf=new e.RTCDtmfSender(this):"video"===this.track.kind&&(this._dtmf=null)),this._dtmf}}),e.RTCPeerConnection=i(e,t.version)},shimReplaceTrack:function(e){!e.RTCRtpSender||"replaceTrack"in e.RTCRtpSender.prototype||(e.RTCRtpSender.prototype.replaceTrack=e.RTCRtpSender.prototype.setTrack)}}},{"../utils":13,"./getusermedia":9,"rtcpeerconnection-shim":1}],9:[function(e,t,r){"use strict";t.exports=function(e){var t=e&&e.navigator,r=function(e){return{name:{PermissionDeniedError:"NotAllowedError"}[e.name]||e.name,message:e.message,constraint:e.constraint,toString:function(){return this.name}}},n=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(e){return n(e).catch(function(e){return Promise.reject(r(e))})}}},{}],10:[function(e,t,r){"use strict";var n=e("../utils"),i={shimOnTrack:function(e){"object"!=typeof e||!e.RTCPeerConnection||"ontrack"in e.RTCPeerConnection.prototype||Object.defineProperty(e.RTCPeerConnection.prototype,"ontrack",{get:function(){return this._ontrack},set:function(e){this._ontrack&&(this.removeEventListener("track",this._ontrack),this.removeEventListener("addstream",this._ontrackpoly)),this.addEventListener("track",this._ontrack=e),this.addEventListener("addstream",this._ontrackpoly=function(e){e.stream.getTracks().forEach(function(t){var r=new Event("track");r.track=t,r.receiver={track:t},r.transceiver={receiver:r.receiver},r.streams=[e.stream],this.dispatchEvent(r)}.bind(this))}.bind(this))}}),"object"==typeof e&&e.RTCPeerConnection&&"receiver"in e.RTCTrackEvent.prototype&&!("transceiver"in e.RTCTrackEvent.prototype)&&Object.defineProperty(e.RTCTrackEvent.prototype,"transceiver",{get:function(){return{receiver:this.receiver}}})},shimSourceObject:function(e){"object"==typeof e&&(!e.HTMLMediaElement||"srcObject"in e.HTMLMediaElement.prototype||Object.defineProperty(e.HTMLMediaElement.prototype,"srcObject",{get:function(){return this.mozSrcObject},set:function(e){this.mozSrcObject=e}}))},shimPeerConnection:function(e){var t=n.detectBrowser(e);if("object"==typeof e&&(e.RTCPeerConnection||e.mozRTCPeerConnection)){e.RTCPeerConnection||(e.RTCPeerConnection=function(r,n){if(t.version<38&&r&&r.iceServers){for(var i=[],a=0;a<r.iceServers.length;a++){var o=r.iceServers[a];if(o.hasOwnProperty("urls"))for(var s=0;s<o.urls.length;s++){var c={url:o.urls[s]};0===o.urls[s].indexOf("turn")&&(c.username=o.username,c.credential=o.credential),i.push(c)}else i.push(r.iceServers[a])}r.iceServers=i}return new e.mozRTCPeerConnection(r,n)},e.RTCPeerConnection.prototype=e.mozRTCPeerConnection.prototype,e.mozRTCPeerConnection.generateCertificate&&Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:function(){return e.mozRTCPeerConnection.generateCertificate}}),e.RTCSessionDescription=e.mozRTCSessionDescription,e.RTCIceCandidate=e.mozRTCIceCandidate),["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){return arguments[0]=new("addIceCandidate"===t?e.RTCIceCandidate:e.RTCSessionDescription)(arguments[0]),r.apply(this,arguments)}});var r=e.RTCPeerConnection.prototype.addIceCandidate;e.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?r.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())};var i=function(e){var t=new Map;return Object.keys(e).forEach(function(r){t.set(r,e[r]),t[r]=e[r]}),t},a={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},o=e.RTCPeerConnection.prototype.getStats;e.RTCPeerConnection.prototype.getStats=function(e,r,n){return o.apply(this,[e||null]).then(function(e){if(t.version<48&&(e=i(e)),t.version<53&&!r)try{e.forEach(function(e){e.type=a[e.type]||e.type})}catch(t){if("TypeError"!==t.name)throw t;e.forEach(function(t,r){e.set(r,Object.assign({},t,{type:a[t.type]||t.type}))})}return e}).then(r,n)}}}};t.exports={shimOnTrack:i.shimOnTrack,shimSourceObject:i.shimSourceObject,shimPeerConnection:i.shimPeerConnection,shimGetUserMedia:e("./getusermedia")}},{"../utils":13,"./getusermedia":11}],11:[function(e,t,r){"use strict";var n=e("../utils"),i=n.log;t.exports=function(e){var t=n.detectBrowser(e),r=e&&e.navigator,a=e&&e.MediaStreamTrack,o=function(e){return{name:{InternalError:"NotReadableError",NotSupportedError:"TypeError",PermissionDeniedError:"NotAllowedError",SecurityError:"NotAllowedError"}[e.name]||e.name,message:{"The operation is insecure.":"The request is not allowed by the user agent or the platform in the current context."}[e.message]||e.message,constraint:e.constraint,toString:function(){return this.name+(this.message&&": ")+this.message}}},s=function(e,n,a){var s=function(e){if("object"!=typeof e||e.require)return e;var t=[];return Object.keys(e).forEach(function(r){if("require"!==r&&"advanced"!==r&&"mediaSource"!==r){var n=e[r]="object"==typeof e[r]?e[r]:{ideal:e[r]};if(void 0===n.min&&void 0===n.max&&void 0===n.exact||t.push(r),void 0!==n.exact&&("number"==typeof n.exact?n.min=n.max=n.exact:e[r]=n.exact,delete n.exact),void 0!==n.ideal){e.advanced=e.advanced||[];var i={};"number"==typeof n.ideal?i[r]={min:n.ideal,max:n.ideal}:i[r]=n.ideal,e.advanced.push(i),delete n.ideal,Object.keys(n).length||delete e[r]}}}),t.length&&(e.require=t),e};return e=JSON.parse(JSON.stringify(e)),t.version<38&&(i("spec: "+JSON.stringify(e)),e.audio&&(e.audio=s(e.audio)),e.video&&(e.video=s(e.video)),i("ff37: "+JSON.stringify(e))),r.mozGetUserMedia(e,n,function(e){a(o(e))})};if(r.mediaDevices||(r.mediaDevices={getUserMedia:function(e){return new Promise(function(t,r){s(e,t,r)})},addEventListener:function(){},removeEventListener:function(){}}),r.mediaDevices.enumerateDevices=r.mediaDevices.enumerateDevices||function(){return new Promise(function(e){e([{kind:"audioinput",deviceId:"default",label:"",groupId:""},{kind:"videoinput",deviceId:"default",label:"",groupId:""}])})},t.version<41){var c=r.mediaDevices.enumerateDevices.bind(r.mediaDevices);r.mediaDevices.enumerateDevices=function(){return c().then(void 0,function(e){if("NotFoundError"===e.name)return[];throw e})}}if(t.version<49){var d=r.mediaDevices.getUserMedia.bind(r.mediaDevices);r.mediaDevices.getUserMedia=function(e){return d(e).then(function(t){if(e.audio&&!t.getAudioTracks().length||e.video&&!t.getVideoTracks().length)throw t.getTracks().forEach(function(e){e.stop()}),new DOMException("The object can not be found here.","NotFoundError");return t},function(e){return Promise.reject(o(e))})}}if(!(t.version>55&&"autoGainControl"in r.mediaDevices.getSupportedConstraints())){var p=function(e,t,r){t in e&&!(r in e)&&(e[r]=e[t],delete e[t])},u=r.mediaDevices.getUserMedia.bind(r.mediaDevices);if(r.mediaDevices.getUserMedia=function(e){return"object"==typeof e&&"object"==typeof e.audio&&(e=JSON.parse(JSON.stringify(e)),p(e.audio,"autoGainControl","mozAutoGainControl"),p(e.audio,"noiseSuppression","mozNoiseSuppression")),u(e)},a&&a.prototype.getSettings){var l=a.prototype.getSettings;a.prototype.getSettings=function(){var e=l.apply(this,arguments);return p(e,"mozAutoGainControl","autoGainControl"),p(e,"mozNoiseSuppression","noiseSuppression"),e}}if(a&&a.prototype.applyConstraints){var f=a.prototype.applyConstraints;a.prototype.applyConstraints=function(e){return"audio"===this.kind&&"object"==typeof e&&(e=JSON.parse(JSON.stringify(e)),p(e,"autoGainControl","mozAutoGainControl"),p(e,"noiseSuppression","mozNoiseSuppression")),f.apply(this,[e])}}}r.getUserMedia=function(e,i,a){if(t.version<44)return s(e,i,a);n.deprecated("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),r.mediaDevices.getUserMedia(e).then(i,a)}}},{"../utils":13}],12:[function(e,t,r){"use strict";var n=e("../utils"),i={shimLocalStreamsAPI:function(e){if("object"==typeof e&&e.RTCPeerConnection){if("getLocalStreams"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),"getStreamById"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.getStreamById=function(e){var t=null;return this._localStreams&&this._localStreams.forEach(function(r){r.id===e&&(t=r)}),this._remoteStreams&&this._remoteStreams.forEach(function(r){r.id===e&&(t=r)}),t}),!("addStream"in e.RTCPeerConnection.prototype)){var t=e.RTCPeerConnection.prototype.addTrack;e.RTCPeerConnection.prototype.addStream=function(e){this._localStreams||(this._localStreams=[]),-1===this._localStreams.indexOf(e)&&this._localStreams.push(e);var r=this;e.getTracks().forEach(function(n){t.call(r,n,e)})},e.RTCPeerConnection.prototype.addTrack=function(e,r){r&&(this._localStreams?-1===this._localStreams.indexOf(r)&&this._localStreams.push(r):this._localStreams=[r]),t.call(this,e,r)}}"removeStream"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.removeStream=function(e){this._localStreams||(this._localStreams=[]);var t=this._localStreams.indexOf(e);if(-1!==t){this._localStreams.splice(t,1);var r=this,n=e.getTracks();this.getSenders().forEach(function(e){-1!==n.indexOf(e.track)&&r.removeTrack(e)})}})}},shimRemoteStreamsAPI:function(e){"object"==typeof e&&e.RTCPeerConnection&&("getRemoteStreams"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),"onaddstream"in e.RTCPeerConnection.prototype||Object.defineProperty(e.RTCPeerConnection.prototype,"onaddstream",{get:function(){return this._onaddstream},set:function(e){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=e),this.addEventListener("track",this._onaddstreampoly=function(e){var t=e.streams[0];if(this._remoteStreams||(this._remoteStreams=[]),!(this._remoteStreams.indexOf(t)>=0)){this._remoteStreams.push(t);var r=new Event("addstream");r.stream=e.streams[0],this.dispatchEvent(r)}}.bind(this))}}))},shimCallbacksAPI:function(e){if("object"==typeof e&&e.RTCPeerConnection){var t=e.RTCPeerConnection.prototype,r=t.createOffer,n=t.createAnswer,i=t.setLocalDescription,a=t.setRemoteDescription,o=t.addIceCandidate;t.createOffer=function(e,t){var n=arguments.length>=2?arguments[2]:arguments[0],i=r.apply(this,[n]);return t?(i.then(e,t),Promise.resolve()):i},t.createAnswer=function(e,t){var r=arguments.length>=2?arguments[2]:arguments[0],i=n.apply(this,[r]);return t?(i.then(e,t),Promise.resolve()):i};var s=function(e,t,r){var n=i.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n};t.setLocalDescription=s,s=function(e,t,r){var n=a.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n},t.setRemoteDescription=s,s=function(e,t,r){var n=o.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n},t.addIceCandidate=s}},shimGetUserMedia:function(e){var t=e&&e.navigator;t.getUserMedia||(t.webkitGetUserMedia?t.getUserMedia=t.webkitGetUserMedia.bind(t):t.mediaDevices&&t.mediaDevices.getUserMedia&&(t.getUserMedia=function(e,r,n){t.mediaDevices.getUserMedia(e).then(r,n)}.bind(t)))},shimRTCIceServerUrls:function(e){var t=e.RTCPeerConnection;e.RTCPeerConnection=function(e,r){if(e&&e.iceServers){for(var i=[],a=0;a<e.iceServers.length;a++){var o=e.iceServers[a];!o.hasOwnProperty("urls")&&o.hasOwnProperty("url")?(n.deprecated("RTCIceServer.url","RTCIceServer.urls"),(o=JSON.parse(JSON.stringify(o))).urls=o.url,delete o.url,i.push(o)):i.push(e.iceServers[a])}e.iceServers=i}return new t(e,r)},e.RTCPeerConnection.prototype=t.prototype,Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:function(){return t.generateCertificate}})},shimTrackEventTransceiver:function(e){"object"==typeof e&&e.RTCPeerConnection&&"receiver"in e.RTCTrackEvent.prototype&&!e.RTCTransceiver&&Object.defineProperty(e.RTCTrackEvent.prototype,"transceiver",{get:function(){return{receiver:this.receiver}}})}};t.exports={shimCallbacksAPI:i.shimCallbacksAPI,shimLocalStreamsAPI:i.shimLocalStreamsAPI,shimRemoteStreamsAPI:i.shimRemoteStreamsAPI,shimGetUserMedia:i.shimGetUserMedia,shimRTCIceServerUrls:i.shimRTCIceServerUrls,shimTrackEventTransceiver:i.shimTrackEventTransceiver}},{"../utils":13}],13:[function(e,t,r){"use strict";var n=!0,i=!0,a={disableLog:function(e){return"boolean"!=typeof e?new Error("Argument type: "+typeof e+". Please use a boolean."):(n=e,e?"adapter.js logging disabled":"adapter.js logging enabled")},disableWarnings:function(e){return"boolean"!=typeof e?new Error("Argument type: "+typeof e+". Please use a boolean."):(i=!e,"adapter.js deprecation warnings "+(e?"disabled":"enabled"))},log:function(){if("object"==typeof window){if(n)return;"undefined"!=typeof console&&"function"==typeof console.log&&console.log.apply(console,arguments)}},deprecated:function(e,t){i&&console.warn(e+" is deprecated, please use "+t+" instead.")},extractVersion:function(e,t,r){var n=e.match(t);return n&&n.length>=r&&parseInt(n[r],10)},detectBrowser:function(e){var t=e&&e.navigator,r={};if(r.browser=null,r.version=null,void 0===e||!e.navigator)return r.browser="Not a browser.",r;if(t.mozGetUserMedia)r.browser="firefox",r.version=this.extractVersion(t.userAgent,/Firefox\/(\d+)\./,1);else if(t.webkitGetUserMedia)if(e.webkitRTCPeerConnection)r.browser="chrome",r.version=this.extractVersion(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2);else{if(!t.userAgent.match(/Version\/(\d+).(\d+)/))return r.browser="Unsupported webkit-based browser with GUM support but no WebRTC support.",r;r.browser="safari",r.version=this.extractVersion(t.userAgent,/AppleWebKit\/(\d+)\./,1)}else if(t.mediaDevices&&t.userAgent.match(/Edge\/(\d+).(\d+)$/))r.browser="edge",r.version=this.extractVersion(t.userAgent,/Edge\/(\d+).(\d+)$/,2);else{if(!t.mediaDevices||!t.userAgent.match(/AppleWebKit\/(\d+)\./))return r.browser="Not a supported browser.",r;r.browser="safari",r.version=this.extractVersion(t.userAgent,/AppleWebKit\/(\d+)\./,1)}return r},shimCreateObjectURL:function(e){var t=e&&e.URL;if("object"==typeof e&&e.HTMLMediaElement&&"srcObject"in e.HTMLMediaElement.prototype&&t.createObjectURL&&t.revokeObjectURL){var r=t.createObjectURL.bind(t),n=t.revokeObjectURL.bind(t),i=new Map,o=0;t.createObjectURL=function(e){if("getTracks"in e){var t="polyblob:"+ ++o;return i.set(t,e),a.deprecated("URL.createObjectURL(stream)","elem.srcObject = stream"),t}return r(e)},t.revokeObjectURL=function(e){n(e),i.delete(e)};var s=Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype,"src");Object.defineProperty(e.HTMLMediaElement.prototype,"src",{get:function(){return s.get.apply(this)},set:function(e){return this.srcObject=i.get(e)||null,s.set.apply(this,[e])}});var c=e.HTMLMediaElement.prototype.setAttribute;e.HTMLMediaElement.prototype.setAttribute=function(){return 2===arguments.length&&"src"===(""+arguments[0]).toLowerCase()&&(this.srcObject=i.get(arguments[1])||null),c.apply(this,arguments)}}}};t.exports={log:a.log,deprecated:a.deprecated,disableLog:a.disableLog,disableWarnings:a.disableWarnings,extractVersion:a.extractVersion,shimCreateObjectURL:a.shimCreateObjectURL,detectBrowser:a.detectBrowser.bind(a)}},{}]},{},[3])(3)});
/*
	The MIT License (MIT)

	Copyright (c) 2016 Meetecho

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the "Software"),
	to deal in the Software without restriction, including without limitation
	the rights to use, copy, modify, merge, publish, distribute, sublicense,
	and/or sell copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included
	in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
	THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
 */
// List of sessions
Janus.sessions = {};

// Screensharing Chrome Extension ID
Janus.extensionId = "hapfgfdkleiggjjpfpenajgdnfckjpaj";
Janus.isExtensionEnabled = function() {
    if(window.navigator.userAgent.match('Chrome')) {
        var chromever = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10);
        var maxver = 33;
        if(window.navigator.userAgent.match('Linux'))
            maxver = 35;	// "known" crash in chrome 34 and 35 on linux
        if(chromever >= 26 && chromever <= maxver) {
            // Older versions of Chrome don't support this extension-based approach, so lie
            return true;
        }
        return Janus.checkJanusExtension();
    } else {
        // Firefox of others, no need for the extension (but this doesn't mean it will work)
        return true;
    }
};

Janus.useDefaultDependencies = function (deps) {
    var f = (deps && deps.fetch) || fetch;
    var p = (deps && deps.Promise) || Promise;
    var socketCls = (deps && deps.WebSocket) || WebSocket;
    console.log(adapter)
    return {
        newWebSocket: function(server, proto) { return new socketCls(server, proto); },
        isArray: function(arr) { return Array.isArray(arr); },
        checkJanusExtension: function() { return document.querySelector('#janus-extension-installed') !== null; },
        webRTCAdapter: (deps && deps.adapter) || adapter,
        httpAPICall: function(url, options) {
            var fetchOptions = {method: options.verb, cache: 'no-cache'};
            if(options.withCredentials !== undefined) {
                fetchOptions.credentials = options.withCredentials === true ? 'include' : (options.withCredentials ? options.withCredentials : 'omit');
            }
            if(options.body !== undefined) {
                fetchOptions.body = JSON.stringify(options.body);
            }
            
            var fetching = f(url, fetchOptions).catch(function(error) {
                return p.reject({message: 'Probably a network error, is the gateway down?', error: error});
            });

            /*
             * fetch() does not natively support timeouts.
             * Work around this by starting a timeout manually, and racing it agains the fetch() to see which thing resolves first.
             */

            if(options.timeout !== undefined) {
                var timeout = new p(function(resolve, reject) {
                    var timerId = setTimeout(function() {
                        clearTimeout(timerId);
                        return reject({message: 'Request timed out', timeout: options.timeout});
                    }, options.timeout);
                });
                fetching = p.race([fetching,timeout]);
            }

            fetching.then(function(response) {
                if(response.ok) {
                    if(typeof(options.success) === typeof(Janus.noop)) {
                        return response.json().then(function(parsed) {
                            options.success(parsed);
                        }).catch(function(error) {
                            return p.reject({message: 'Failed to parse response body', error: error, response: response});
                        });
                    }
                }
                else {
                    return p.reject({message: 'API call failed', response: response});
                }
            }).catch(function(error) {
                if(typeof(options.error) === typeof(Janus.noop)) {
                    options.error(error.message || '<< internal error >>', error);
                }
            });

            return fetching;
        }
    }
};

Janus.useOldDependencies = function (deps) {
    var jq = (deps && deps.jQuery) || jQuery;
    var socketCls = (deps && deps.WebSocket) || WebSocket;
    return {
        newWebSocket: function(server, proto) { return new socketCls(server, proto); },
        isArray: function(arr) { return jq.isArray(arr); },
        checkJanusExtension: function() { return jq('#janus-extension-installed').length > 0; },
        webRTCAdapter: (deps && deps.adapter) || adapter,
        httpAPICall: function(url, options) {
            var payload = options.body !== undefined ? {
                contentType: 'application/json',
                data: JSON.stringify(options.body)
            } : {};
            var credentials = options.withCredentials !== undefined ? {xhrFields: {withCredentials: options.withCredentials}} : {};

            return jq.ajax(jq.extend(payload, credentials, {
                url: url,
                type: options.verb,
                cache: false,
                dataType: 'json',
                async: options.async,
                timeout: options.timeout,
                success: function(result) {
                    if(typeof(options.success) === typeof(Janus.noop)) {
                        options.success(result);
                    }
                },
                error: function(xhr, status, err) {
                    if(typeof(options.error) === typeof(Janus.noop)) {
                        options.error(status, err);
                    }
                }
            }));
        },
    };
};

Janus.noop = function() {};

// Initialization
Janus.init = function(options) {
    options = options || {};
    options.callback = (typeof options.callback == "function") ? options.callback : Janus.noop;
    if(Janus.initDone === true) {
        // Already initialized
        options.callback();
    } else {
        if(typeof console == "undefined" || typeof console.log == "undefined")
            console = { log: function() {} };
        // Console logging (all debugging disabled by default)
        Janus.trace = Janus.noop;
        Janus.debug = Janus.noop;
        Janus.vdebug = Janus.noop;
        Janus.log = Janus.noop;
        Janus.warn = Janus.noop;
        Janus.error = Janus.noop;
        if(options.debug === true || options.debug === "all") {
            // Enable all debugging levels
            Janus.trace = console.trace.bind(console);
            Janus.debug = console.debug.bind(console);
            Janus.vdebug = console.debug.bind(console);
            Janus.log = console.log.bind(console);
            Janus.warn = console.warn.bind(console);
            Janus.error = console.error.bind(console);
        } else if(Array.isArray(options.debug)) {
            for(var i in options.debug) {
                var d = options.debug[i];
                switch(d) {
                    case "trace":
                        Janus.trace = console.trace.bind(console);
                        break;
                    case "debug":
                        Janus.debug = console.debug.bind(console);
                        break;
                    case "vdebug":
                        Janus.vdebug = console.debug.bind(console);
                        break;
                    case "log":
                        Janus.log = console.log.bind(console);
                        break;
                    case "warn":
                        Janus.warn = console.warn.bind(console);
                        break;
                    case "error":
                        Janus.error = console.error.bind(console);
                        break;
                    default:
                        console.error("Unknown debugging option '" + d + "' (supported: 'trace', 'debug', 'vdebug', 'log', warn', 'error')");
                        break;
                }
            }
        }
        Janus.log("Initializing library");

        var usedDependencies = options.dependencies || Janus.useDefaultDependencies();
        Janus.isArray = usedDependencies.isArray;
        Janus.webRTCAdapter = usedDependencies.webRTCAdapter;
        Janus.httpAPICall = usedDependencies.httpAPICall;
        Janus.checkJanusExtension = usedDependencies.checkJanusExtension;
        Janus.newWebSocket = usedDependencies.newWebSocket;

        // Helper method to enumerate devices
        Janus.listDevices = function(callback, config) {
            callback = (typeof callback == "function") ? callback : Janus.noop;
            if (config == null) config = { audio: true, video: true };
            if(navigator.mediaDevices) {
                navigator.mediaDevices.getUserMedia(config)
                    .then(function(stream) {
                        navigator.mediaDevices.enumerateDevices().then(function(devices) {
                            Janus.debug(devices);
                            callback(devices);
                            // Get rid of the now useless stream
                            try {
                                var tracks = stream.getTracks();
                                for(var i in tracks) {
                                    var mst = tracks[i];
                                    if(mst !== null && mst !== undefined)
                                        mst.stop();
                                }
                            } catch(e) {}
                        });
                    })
                    .catch(function(err) {
                        Janus.error(err);
                        callback([]);
                    });
            } else {
                Janus.warn("navigator.mediaDevices unavailable");
                callback([]);
            }
        }
        // Helper methods to attach/reattach a stream to a video element (previously part of adapter.js)
        Janus.attachMediaStream = function(element, stream) {
            if(Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
                var chromever = Janus.webRTCAdapter.browserDetails.version;
                if(chromever >= 43) {
                    element.srcObject = stream;
                } else if(typeof element.src !== 'undefined') {
                    element.src = URL.createObjectURL(stream);
                } else {
                    Janus.error("Error attaching stream to element");
                }
            } else {
                element.srcObject = stream;
            }
        };
        Janus.reattachMediaStream = function(to, from) {
            if(Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
                var chromever = Janus.webRTCAdapter.browserDetails.version;
                if(chromever >= 43) {
                    to.srcObject = from.srcObject;
                } else if(typeof to.src !== 'undefined') {
                    to.src = from.src;
                } else {
                    Janus.error("Error reattaching stream to element");
                }
            } else {
                to.srcObject = from.srcObject;
            }
        };
        // Detect tab close: make sure we don't loose existing onbeforeunload handlers
        var oldOBF = window.onbeforeunload;
        window.onbeforeunload = function() {
            Janus.log("Closing window");
            for(var s in Janus.sessions) {
                if(Janus.sessions[s] !== null && Janus.sessions[s] !== undefined &&
                    Janus.sessions[s].destroyOnUnload) {
                    Janus.log("Destroying session " + s);
                    Janus.sessions[s].destroy({asyncRequest: false});
                }
            }
            if(oldOBF && typeof oldOBF == "function")
                oldOBF();
        }
        Janus.initDone = true;
        options.callback();
    }
};

// Helper method to check whether WebRTC is supported by this browser
Janus.isWebrtcSupported = function() {
    return window.RTCPeerConnection !== undefined && window.RTCPeerConnection !== null &&
        navigator.getUserMedia !== undefined && navigator.getUserMedia !== null;
};

// Helper method to create random identifiers (e.g., transaction)
Janus.randomString = function(len) {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


function Janus(gatewayCallbacks) {
    if(Janus.initDone === undefined) {
        gatewayCallbacks.error("Library not initialized");
        return {};
    }
    if(!Janus.isWebrtcSupported()) {
        gatewayCallbacks.error("WebRTC not supported by this browser");
        return {};
    }
    Janus.log("Library initialized: " + Janus.initDone);
    gatewayCallbacks = gatewayCallbacks || {};
    gatewayCallbacks.success = (typeof gatewayCallbacks.success == "function") ? gatewayCallbacks.success : Janus.noop;
    gatewayCallbacks.error = (typeof gatewayCallbacks.error == "function") ? gatewayCallbacks.error : Janus.noop;
    gatewayCallbacks.destroyed = (typeof gatewayCallbacks.destroyed == "function") ? gatewayCallbacks.destroyed : Janus.noop;
    if(gatewayCallbacks.server === null || gatewayCallbacks.server === undefined) {
        gatewayCallbacks.error("Invalid gateway url");
        return {};
    }
    var websockets = false;
    var ws = null;
    var wsHandlers = {};
    var wsKeepaliveTimeoutId = null;

    var servers = null, serversIndex = 0;
    var server = gatewayCallbacks.server;
    if(Janus.isArray(server)) {
        Janus.log("Multiple servers provided (" + server.length + "), will use the first that works");
        server = null;
        servers = gatewayCallbacks.server;
        Janus.debug(servers);
    } else {
        if(server.indexOf("ws") === 0) {
            websockets = true;
            Janus.log("Using WebSockets to contact Janus: " + server);
        } else {
            websockets = false;
            Janus.log("Using REST API to contact Janus: " + server);
        }
    }
    var iceServers = gatewayCallbacks.iceServers;
    if(iceServers === undefined || iceServers === null)
        iceServers = [{urls: "stun:stun.l.google.com:19302"}];
    var iceTransportPolicy = gatewayCallbacks.iceTransportPolicy;
    var bundlePolicy = gatewayCallbacks.bundlePolicy;
    // Whether IPv6 candidates should be gathered
    var ipv6Support = gatewayCallbacks.ipv6;
    if(ipv6Support === undefined || ipv6Support === null)
        ipv6Support = false;
    // Whether we should enable the withCredentials flag for XHR requests
    var withCredentials = false;
    if(gatewayCallbacks.withCredentials !== undefined && gatewayCallbacks.withCredentials !== null)
        withCredentials = gatewayCallbacks.withCredentials === true;
    // Optional max events
    var maxev = null;
    if(gatewayCallbacks.max_poll_events !== undefined && gatewayCallbacks.max_poll_events !== null)
        maxev = gatewayCallbacks.max_poll_events;
    if(maxev < 1)
        maxev = 1;
    // Token to use (only if the token based authentication mechanism is enabled)
    var token = null;
    if(gatewayCallbacks.token !== undefined && gatewayCallbacks.token !== null)
        token = gatewayCallbacks.token;
    // API secret to use (only if the shared API secret is enabled)
    var apisecret = null;
    if(gatewayCallbacks.apisecret !== undefined && gatewayCallbacks.apisecret !== null)
        apisecret = gatewayCallbacks.apisecret;
    // Whether we should destroy this session when onbeforeunload is called
    this.destroyOnUnload = true;
    if(gatewayCallbacks.destroyOnUnload !== undefined && gatewayCallbacks.destroyOnUnload !== null)
        this.destroyOnUnload = (gatewayCallbacks.destroyOnUnload === true);

    var connected = false;
    var sessionId = null;
    var pluginHandles = {};
    var that = this;
    var retries = 0;
    var transactions = {};
    var connectTimeOut
    var connectSecond = 0

    destroySession({
        success: function() {       
          createSession(gatewayCallbacks);
        }
    })
  
    // createSession(gatewayCallbacks);

    // Public methods
    this.getServer = function() { return server; };
    this.isConnected = function() { return connected; };
    this.getSessionId = function() { return sessionId; };
    this.destroy = function(callbacks) { destroySession(callbacks); };
    this.attach = function(callbacks) { createHandle(callbacks); };

    function eventHandler() {
        if(sessionId == null)
            return;
        Janus.debug('Long poll...');
        if(!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            return;
        }
        var longpoll = server + "/" + sessionId + "?rid=" + new Date().getTime();
        if(maxev !== undefined && maxev !== null)
            longpoll = longpoll + "&maxev=" + maxev;
        if(token !== null && token !== undefined)
            longpoll = longpoll + "&token=" + token;
        if(apisecret !== null && apisecret !== undefined)
            longpoll = longpoll + "&apisecret=" + apisecret; 
        Janus.httpAPICall(longpoll, {
            verb: 'GET',
            withCredentials: withCredentials,
            success: handleEvent,
            timeout: 60000,	// FIXME
            error: function(textStatus, errorThrown) {
                Janus.error(textStatus + ": " + errorThrown);
                if (errorThrown && errorThrown.error && errorThrown.error.message === 'Failed to fetch') {
                    gatewayCallbacks.error('cookieDisable')
                }
                retries++;
                console.log('retries:' + retries)
                if(retries > 5) {
                    // Did we just lose the gateway? :-(
                    connected = false;
                    gatewayCallbacks.error("Lost connection to the gateway (is it down?)");
                    return;
                }
                eventHandler();
            }
        });
    }

    // Private event handler: this will trigger plugin callbacks, if set
    function handleEvent(json, skipTimeout) {
        retries = 0;
        if(!websockets && sessionId !== undefined && sessionId !== null && skipTimeout !== true)
            setTimeout(eventHandler, 200);
        if(!websockets && Janus.isArray(json)) {
            // We got an array: it means we passed a maxev > 1, iterate on all objects
            for(var i=0; i<json.length; i++) {
                handleEvent(json[i], true);
            }
            return;
        }
        if(json["janus"] === "keepalive") {
            // Nothing happened
            Janus.vdebug("Got a keepalive on session " + sessionId);
            return;
        } else if(json["janus"] === "ack") {
            // Just an ack, we can probably ignore
            Janus.debug("Got an ack on session " + sessionId);
            Janus.debug(json);
            var transaction = json["transaction"];
            if(transaction !== null && transaction !== undefined) {
                var reportSuccess = transactions[transaction];
                if(reportSuccess !== null && reportSuccess !== undefined) {
                    reportSuccess(json);
                }
                delete transactions[transaction];
            }
            return;
        } else if(json["janus"] === "success") {
            // Success!
            Janus.debug("Got a success on session " + sessionId);
            Janus.debug(json);
            var transaction = json["transaction"];
            if(transaction !== null && transaction !== undefined) {
                var reportSuccess = transactions[transaction];
                if(reportSuccess !== null && reportSuccess !== undefined) {
                    reportSuccess(json);
                }
                delete transactions[transaction];
            }
            return;
        } else if(json["janus"] === "webrtcup") {
            // The PeerConnection with the gateway is up! Notify this
            Janus.debug("Got a webrtcup event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if(sender === undefined || sender === null) {
                Janus.warn("Missing sender...");
                return;
            }
            var pluginHandle = pluginHandles[sender];
            if(pluginHandle === undefined || pluginHandle === null) {
                Janus.debug("This handle is not attached to this session");
                return;
            }
            pluginHandle.webrtcState(true);
            return;
        } else if(json["janus"] === "hangup") {
            // A plugin asked the core to hangup a PeerConnection on one of our handles
            Janus.debug("Got a hangup event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if(sender === undefined || sender === null) {
                Janus.warn("Missing sender...");
                return;
            }
            var pluginHandle = pluginHandles[sender];
            if(pluginHandle === undefined || pluginHandle === null) {
                Janus.debug("This handle is not attached to this session");
                return;
            }
            pluginHandle.webrtcState(false, json["reason"]);
            pluginHandle.hangup();
        } else if(json["janus"] === "detached") {
            // A plugin asked the core to detach one of our handles
            Janus.debug("Got a detached event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if(sender === undefined || sender === null) {
                Janus.warn("Missing sender...");
                return;
            }
            var pluginHandle = pluginHandles[sender];
            if(pluginHandle === undefined || pluginHandle === null) {
                // Don't warn here because destroyHandle causes this situation.
                return;
            }
            pluginHandle.detached = true;
            pluginHandle.ondetached();
            pluginHandle.detach();
        } else if(json["janus"] === "media") {
            // Media started/stopped flowing
            Janus.debug("Got a media event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if(sender === undefined || sender === null) {
                Janus.warn("Missing sender...");
                return;
            }
            var pluginHandle = pluginHandles[sender];
            if(pluginHandle === undefined || pluginHandle === null) {
                Janus.debug("This handle is not attached to this session");
                return;
            }
            pluginHandle.mediaState(json["type"], json["receiving"]);
        } else if(json["janus"] === "slowlink") {
            Janus.debug("Got a slowlink event on session " + sessionId);
            Janus.debug(json);
            // Trouble uplink or downlink
            var sender = json["sender"];
            if(sender === undefined || sender === null) {
                Janus.warn("Missing sender...");
                return;
            }
            var pluginHandle = pluginHandles[sender];
            if(pluginHandle === undefined || pluginHandle === null) {
                Janus.debug("This handle is not attached to this session");
                return;
            }
            pluginHandle.slowLink(json["uplink"], json["nacks"]);
        } else if(json["janus"] === "error") {
            // Oops, something wrong happened
            Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
            Janus.debug(json);
            var transaction = json["transaction"];
            if(transaction !== null && transaction !== undefined) {
                var reportSuccess = transactions[transaction];
                if(reportSuccess !== null && reportSuccess !== undefined) {
                    reportSuccess(json);
                }
                delete transactions[transaction];
            }
            return;
        } else if(json["janus"] === "event") {
            Janus.debug("Got a plugin event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if(sender === undefined || sender === null) {
                Janus.warn("Missing sender...");
                return;
            }
            var plugindata = json["plugindata"];
            if(plugindata === undefined || plugindata === null) {
                Janus.warn("Missing plugindata...");
                return;
            }
            Janus.debug("  -- Event is coming from " + sender + " (" + plugindata["plugin"] + ")");
            var data = plugindata["data"];
            Janus.debug(data);
            var pluginHandle = pluginHandles[sender];
            if(pluginHandle === undefined || pluginHandle === null) {
                Janus.warn("This handle is not attached to this session");
                return;
            }
            var jsep = json["jsep"];
            if(jsep !== undefined && jsep !== null) {
                Janus.debug("Handling SDP as well...");
                Janus.debug(jsep);
            }
            var callback = pluginHandle.onmessage;
            if(callback !== null && callback !== undefined) {
                Janus.debug("Notifying application...");
                // Send to callback specified when attaching plugin handle
                callback(data, jsep);
            } else {
                // Send to generic callback (?)
                Janus.debug("No provided notification callback");
            }
        } else {
            Janus.warn("Unkown message/event  '" + json["janus"] + "' on session " + sessionId);
            Janus.debug(json);
        }
    }

    // Private helper to send keep-alive messages on WebSockets
    function keepAlive() {
        if(server === null || !websockets || !connected)
            return;
        wsKeepaliveTimeoutId = setTimeout(keepAlive, 30000);
        var request = { "janus": "keepalive", "session_id": sessionId, "transaction": Janus.randomString(12) };
        if(token !== null && token !== undefined)
            request["token"] = token;
        if(apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
        ws.send(JSON.stringify(request));
    }

    // Private method to create a session
    function createSession(callbacks) {
        var transaction = Janus.randomString(12);
        var request = { "janus": "create", "transaction": transaction };
        if(token !== null && token !== undefined)
            request["token"] = token;
        if(apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
        if(server === null && Janus.isArray(servers)) {
            // We still need to find a working server from the list we were given
            server = servers[serversIndex];
            if(server.indexOf("ws") === 0) {
                websockets = true;
                Janus.log("Server #" + (serversIndex+1) + ": trying WebSockets to contact Janus (" + server + ")");
            } else {
                websockets = false;
                Janus.log("Server #" + (serversIndex+1) + ": trying REST API to contact Janus (" + server + ")");
            }
        }
        if(websockets) {
            ws = Janus.newWebSocket(server, 'janus-protocol');
            wsHandlers = {
                'error': function() {
                    Janus.error("Error connecting to the Janus WebSockets server... " + server);
                    if (Janus.isArray(servers)) {
                        serversIndex++;
                        if (serversIndex == servers.length) {
                            // We tried all the servers the user gave us and they all failed
                            callbacks.error("Error connecting to any of the provided Janus servers: Is the gateway down?");
                            return;
                        }
                        // Let's try the next server
                        server = null;
                        setTimeout(function() {
                            createSession(callbacks);
                        }, 200);
                        return;
                    }
                    callbacks.error("Error connecting to the Janus WebSockets server: Is the gateway down?");
                },

                'open': function() {
                    // We need to be notified about the success
                    transactions[transaction] = function(json) {
                        Janus.debug(json);
                        if (json["janus"] !== "success") {
                            Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                            callbacks.error(json["error"].reason);
                            return;
                        }
                        wsKeepaliveTimeoutId = setTimeout(keepAlive, 30000);
                        connected = true;
                        sessionId = json.data["id"];
                        Janus.log("Created session: " + sessionId);
                        Janus.sessions[sessionId] = that;
                        callbacks.success();
                    };
                    ws.send(JSON.stringify(request));
                },

                'message': function(event) {
                    handleEvent(JSON.parse(event.data));
                },

                'close': function() {
                    if (server === null || !connected) {
                        return;
                    }
                    connected = false;
                    // FIXME What if this is called when the page is closed?
                    gatewayCallbacks.error("Lost connection to the gateway (is it down?)");
                }
            };

            for(var eventName in wsHandlers) {
                ws.addEventListener(eventName, wsHandlers[eventName]);
            }

            return;
        }
        Janus.httpAPICall(server, {
            verb: 'POST',
            withCredentials: withCredentials,
            body: request,
            success: function(json) {
                Janus.debug(json);
                if(json["janus"] !== "success") {
                    Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                    callbacks.error(json["error"].reason);
                    return;
                }
                connected = true;
                sessionId = json.data["id"];
                Janus.log("Created session: " + sessionId);
                Janus.sessions[sessionId] = that;
                console.log("Created session: " + sessionId)
                window.localStorage.setItem('rtcSessionId', sessionId)
                eventHandler();
                callbacks.success();
            },
            error: function(textStatus, errorThrown) {
                Janus.error(textStatus + ": " + errorThrown);	// FIXME
                if(Janus.isArray(servers)) {
                    serversIndex++;
                    if(serversIndex == servers.length) {
                        // We tried all the servers the user gave us and they all failed
                        callbacks.error("Error connecting to any of the provided Janus servers: Is the gateway down?");
                        return;
                    }
                    // Let's try the next server
                    server = null;
                    setTimeout(function() { createSession(callbacks); }, 200);
                    return;
                }
                if(errorThrown === "")
                    callbacks.error(textStatus + ": Is the gateway down?");
                else
                    callbacks.error(textStatus + ": " + errorThrown);
            }
        });
    }

    // Private method to destroy a session
    function destroySession(callbacks) {
        if (!sessionId && window.localStorage.getItem('rtcSessionId')) {
            sessionId = window.localStorage.getItem('rtcSessionId')
            connected = true
        }
        callbacks = callbacks || {};
        // FIXME This method triggers a success even when we fail
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        var asyncRequest = true;
        if(callbacks.asyncRequest !== undefined && callbacks.asyncRequest !== null)
            asyncRequest = (callbacks.asyncRequest === true);
        Janus.log("Destroying session " + sessionId + " (async=" + asyncRequest + ")");
        if(!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            callbacks.success();
            return;
        }
        if(sessionId === undefined || sessionId === null) {
            Janus.warn("No session to destroy");
            callbacks.success();
            gatewayCallbacks.destroyed();
            return;
        }
        delete Janus.sessions[sessionId];
        // No need to destroy all handles first, Janus will do that itself
        var request = { "janus": "destroy", "transaction": Janus.randomString(12) };
        if(token !== null && token !== undefined)
            request["token"] = token;
        if(apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
        if(websockets) {
            request["session_id"] = sessionId;

            var unbindWebSocket = function() {
                for(var eventName in wsHandlers) {
                    ws.removeEventListener(eventName, wsHandlers[eventName]);
                }
                ws.removeEventListener('message', onUnbindMessage);
                ws.removeEventListener('error', onUnbindError);
                if(wsKeepaliveTimeoutId) {
                    clearTimeout(wsKeepaliveTimeoutId);
                }
            };

            var onUnbindMessage = function(event){
                var data = JSON.parse(event.data);
                if(data.session_id == request.session_id && data.transaction == request.transaction) {
                    unbindWebSocket();
                    callbacks.success();
                    gatewayCallbacks.destroyed();
                }
            };
            var onUnbindError = function(event) {
                unbindWebSocket();
                callbacks.error("Failed to destroy the gateway: Is the gateway down?");
                gatewayCallbacks.destroyed();
            };

            ws.addEventListener('message', onUnbindMessage);
            ws.addEventListener('error', onUnbindError);

            ws.send(JSON.stringify(request));
            return;
        }
        Janus.httpAPICall(server + "/" + sessionId, {
            verb: 'POST',
            async: asyncRequest,	// Sometimes we need false here, or destroying in onbeforeunload won't work
            withCredentials: withCredentials,
            body: request,
            success: function(json) {
                Janus.log("Destroyed session:");
                Janus.debug(json);
                sessionId = null;
                connected = false;
                window.localStorage.removeItem('rtcSessionId')
                if(json["janus"] !== "success") {
                    Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                }
                callbacks.success();
                gatewayCallbacks.destroyed();
            },
            error: function(textStatus, errorThrown) {
                Janus.error(textStatus + ": " + errorThrown);	// FIXME
                // Reset everything anyway
                sessionId = null;
                connected = false;
                localStorage.removeItem('rtcSessionId')
                callbacks.success();
                gatewayCallbacks.destroyed();
            }
        });
    }

    // Private method to create a plugin handle
    function createHandle(callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
        callbacks.consentDialog = (typeof callbacks.consentDialog == "function") ? callbacks.consentDialog : Janus.noop;
        callbacks.iceState = (typeof callbacks.iceState == "function") ? callbacks.iceState : Janus.noop;
        callbacks.mediaState = (typeof callbacks.mediaState == "function") ? callbacks.mediaState : Janus.noop;
        callbacks.webrtcState = (typeof callbacks.webrtcState == "function") ? callbacks.webrtcState : Janus.noop;
        callbacks.slowLink = (typeof callbacks.slowLink == "function") ? callbacks.slowLink : Janus.noop;
        callbacks.onmessage = (typeof callbacks.onmessage == "function") ? callbacks.onmessage : Janus.noop;
        callbacks.onlocalstream = (typeof callbacks.onlocalstream == "function") ? callbacks.onlocalstream : Janus.noop;
        callbacks.onremotestream = (typeof callbacks.onremotestream == "function") ? callbacks.onremotestream : Janus.noop;
        callbacks.ondata = (typeof callbacks.ondata == "function") ? callbacks.ondata : Janus.noop;
        callbacks.ondataopen = (typeof callbacks.ondataopen == "function") ? callbacks.ondataopen : Janus.noop;
        callbacks.oncleanup = (typeof callbacks.oncleanup == "function") ? callbacks.oncleanup : Janus.noop;
        callbacks.ondetached = (typeof callbacks.ondetached == "function") ? callbacks.ondetached : Janus.noop;
        if(!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            callbacks.error("Is the gateway down? (connected=false)");
            return;
        }
        var plugin = callbacks.plugin;
        if(plugin === undefined || plugin === null) {
            Janus.error("Invalid plugin");
            callbacks.error("Invalid plugin");
            return;
        }
        var opaqueId = callbacks.opaqueId;
        var transaction = Janus.randomString(12);
        var request = { "janus": "attach", "plugin": plugin, "opaque_id": opaqueId, "transaction": transaction };
        if(token !== null && token !== undefined)
            request["token"] = token;
        if(apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
        // If we know the browser supports BUNDLE and/or rtcp-mux, let's advertise those right away
        if(adapter.browserDetails.browser == "chrome" || adapter.browserDetails.browser == "firefox" ||
            adapter.browserDetails.browser == "safari") {
            request["force-bundle"] = true;
            request["force-rtcp-mux"] = true;
        }
        if(websockets) {
            transactions[transaction] = function(json) {
                Janus.debug(json);
                if(json["janus"] !== "success") {
                    Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                    callbacks.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                    return;
                }
                var handleId = json.data["id"];
                Janus.log("Created handle: " + handleId);
                var pluginHandle =
                    {
                        session : that,
                        plugin : plugin,
                        id : handleId,
                        detached : false,
                        webrtcStuff : {
                            started : false,
                            myStream : null,
                            streamExternal : false,
                            remoteStream : null,
                            mySdp : null,
                            pc : null,
                            dataChannel : null,
                            dtmfSender : null,
                            trickle : true,
                            iceDone : false,
                            sdpSent : false,
                            volume : {
                                value : null,
                                timer : null
                            },
                            bitrate : {
                                value : null,
                                bsnow : null,
                                bsbefore : null,
                                tsnow : null,
                                tsbefore : null,
                                timer : null
                            }
                        },
                        getId : function() { return handleId; },
                        getPlugin : function() { return plugin; },
                        getVolume : function() { return getVolume(handleId); },
                        isAudioMuted : function() { return isMuted(handleId, false); },
                        muteAudio : function() { return mute(handleId, false, true); },
                        unmuteAudio : function() { return mute(handleId, false, false); },
                        isVideoMuted : function() { return isMuted(handleId, true); },
                        muteVideo : function() { return mute(handleId, true, true); },
                        unmuteVideo : function() { return mute(handleId, true, false); },
                        getBitrate : function() { return getBitrate(handleId); },
                        send : function(callbacks) { sendMessage(handleId, callbacks); },
                        data : function(callbacks) { sendData(handleId, callbacks); },
                        dtmf : function(callbacks) { sendDtmf(handleId, callbacks); },
                        consentDialog : callbacks.consentDialog,
                        iceState : callbacks.iceState,
                        mediaState : callbacks.mediaState,
                        webrtcState : callbacks.webrtcState,
                        slowLink : callbacks.slowLink,
                        onmessage : callbacks.onmessage,
                        createOffer : function(callbacks) { prepareWebrtc(handleId, callbacks); },
                        createAnswer : function(callbacks) { prepareWebrtc(handleId, callbacks); },
                        handleRemoteJsep : function(callbacks) { prepareWebrtcPeer(handleId, callbacks); },
                        onlocalstream : callbacks.onlocalstream,
                        onremotestream : callbacks.onremotestream,
                        ondata : callbacks.ondata,
                        ondataopen : callbacks.ondataopen,
                        oncleanup : callbacks.oncleanup,
                        ondetached : callbacks.ondetached,
                        hangup : function(sendRequest) { cleanupWebrtc(handleId, sendRequest === true); },
                        detach : function(callbacks) { destroyHandle(handleId, callbacks); }
                    }
                pluginHandles[handleId] = pluginHandle;
                callbacks.success(pluginHandle);
            };
            request["session_id"] = sessionId;
            ws.send(JSON.stringify(request));
            return;
        }
        Janus.httpAPICall(server + "/" + sessionId, {
            verb: 'POST',
            withCredentials: withCredentials,
            body: request,
            success: function(json) {
                Janus.debug(json);
                if(json["janus"] !== "success") {
                    if (json["error"].code === 458) {
                        gatewayCallbacks.error('cookieDisable')
                    }
                    Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                    callbacks.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                    return;
                }
                var handleId = json.data["id"];
                Janus.log("Created handle: " + handleId);
                var pluginHandle =
                    {
                        session : that,
                        plugin : plugin,
                        id : handleId,
                        detached : false,
                        webrtcStuff : {
                            started : false,
                            myStream : null,
                            streamExternal : false,
                            remoteStream : null,
                            mySdp : null,
                            pc : null,
                            dataChannel : null,
                            dtmfSender : null,
                            trickle : true,
                            iceDone : false,
                            sdpSent : false,
                            volume : {
                                value : null,
                                timer : null
                            },
                            bitrate : {
                                value : null,
                                bsnow : null,
                                bsbefore : null,
                                tsnow : null,
                                tsbefore : null,
                                timer : null
                            }
                        },
                        getId : function() { return handleId; },
                        getPlugin : function() { return plugin; },
                        getVolume : function() { return getVolume(handleId); },
                        isAudioMuted : function() { return isMuted(handleId, false); },
                        muteAudio : function() { return mute(handleId, false, true); },
                        unmuteAudio : function() { return mute(handleId, false, false); },
                        isVideoMuted : function() { return isMuted(handleId, true); },
                        muteVideo : function() { return mute(handleId, true, true); },
                        unmuteVideo : function() { return mute(handleId, true, false); },
                        getBitrate : function() { return getBitrate(handleId); },
                        send : function(callbacks) { sendMessage(handleId, callbacks); },
                        data : function(callbacks) { sendData(handleId, callbacks); },
                        dtmf : function(callbacks) { sendDtmf(handleId, callbacks); },
                        consentDialog : callbacks.consentDialog,
                        iceState : callbacks.iceState,
                        mediaState : callbacks.mediaState,
                        webrtcState : callbacks.webrtcState,
                        slowLink : callbacks.slowLink,
                        onmessage : callbacks.onmessage,
                        createOffer : function(callbacks) { prepareWebrtc(handleId, callbacks); },
                        createAnswer : function(callbacks) { prepareWebrtc(handleId, callbacks); },
                        handleRemoteJsep : function(callbacks) { prepareWebrtcPeer(handleId, callbacks); },
                        onlocalstream : callbacks.onlocalstream,
                        onremotestream : callbacks.onremotestream,
                        ondata : callbacks.ondata,
                        ondataopen : callbacks.ondataopen,
                        oncleanup : callbacks.oncleanup,
                        ondetached : callbacks.ondetached,
                        hangup : function(sendRequest) { cleanupWebrtc(handleId, sendRequest === true); },
                        detach : function(callbacks) { destroyHandle(handleId, callbacks); },
                        updateBitrate: function(callbacks) {updateBitrate(handleId, callbacks)}
                    }
                pluginHandles[handleId] = pluginHandle;
                callbacks.success(pluginHandle);
            },
            error: function(textStatus, errorThrown) {
                console.log(textStatus, errorThrown)
                console.log('错错错错错错错错错错错错错错错错错错错错错错错错错')
                Janus.error(textStatus + ": " + errorThrown);	// FIXME
            }
        });
    }

    // Private method to send a message
    function sendMessage(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
        if(!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            callbacks.error("Is the gateway down? (connected=false)");
            return;
        }
        var message = callbacks.message;
        var jsep = callbacks.jsep;
        var transaction = Janus.randomString(12);
        var request = { "janus": "message", "body": message, "transaction": transaction };
        if(token !== null && token !== undefined)
            request["token"] = token;
        if(apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
        if(jsep !== null && jsep !== undefined)
            request.jsep = jsep;
        Janus.debug("Sending message to plugin (handle=" + handleId + "):");
        Janus.debug(request);
        if(websockets) {
            request["session_id"] = sessionId;
            request["handle_id"] = handleId;
            transactions[transaction] = function(json) {
                Janus.debug("Message sent!");
                Janus.debug(json);
                if(json["janus"] === "success") {
                    // We got a success, must have been a synchronous transaction
                    var plugindata = json["plugindata"];
                    if(plugindata === undefined || plugindata === null) {
                        Janus.warn("Request succeeded, but missing plugindata...");
                        callbacks.success();
                        return;
                    }
                    Janus.log("Synchronous transaction successful (" + plugindata["plugin"] + ")");
                    var data = plugindata["data"];
                    Janus.debug(data);
                    callbacks.success(data);
                    return;
                } else if(json["janus"] !== "ack") {
                    // Not a success and not an ack, must be an error
                    if(json["error"] !== undefined && json["error"] !== null) {
                        Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                        callbacks.error(json["error"].code + " " + json["error"].reason);
                    } else {
                        Janus.error("Unknown error");	// FIXME
                        callbacks.error("Unknown error");
                    }
                    return;
                }
                // If we got here, the plugin decided to handle the request asynchronously
                callbacks.success();
            };
            ws.send(JSON.stringify(request));
            return;
        }
        Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
            verb: 'POST',
            withCredentials: withCredentials,
            body: request,
            success: function(json) {
                Janus.debug("Message sent!");
                Janus.debug(json);
                if(json["janus"] === "success") {
                    // We got a success, must have been a synchronous transaction
                    var plugindata = json["plugindata"];
                    if(plugindata === undefined || plugindata === null) {
                        Janus.warn("Request succeeded, but missing plugindata...");
                        callbacks.success();
                        return;
                    }
                    Janus.log("Synchronous transaction successful (" + plugindata["plugin"] + ")");
                    var data = plugindata["data"];
                    Janus.debug(data);
                    callbacks.success(data);
                    return;
                } else if(json["janus"] !== "ack") {
                    // Not a success and not an ack, must be an error
                    if(json["error"] !== undefined && json["error"] !== null) {
                        Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                        callbacks.error(json["error"].code + " " + json["error"].reason);
                    } else {
                        Janus.error("Unknown error");	// FIXME
                        callbacks.error("Unknown error");
                    }
                    return;
                }
                // If we got here, the plugin decided to handle the request asynchronously
                callbacks.success();
            },
            error: function(textStatus, errorThrown) {
                Janus.error(textStatus + ": " + errorThrown);	// FIXME
                callbacks.error(textStatus + ": " + errorThrown);
            }
        });
    }

    // Private method to send a trickle candidate
    function sendTrickleCandidate(handleId, candidate) {

        console.log("candiadate........",candidate)
        if (candidate.completed) {
            console.log('candidate error')
        }
        if(!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            return;
        }
        var request = { "janus": "trickle", "candidate": candidate, "transaction": Janus.randomString(12) };
        if(token !== null && token !== undefined)
            request["token"] = token;
        if(apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
        Janus.vdebug("Sending trickle candidate (handle=" + handleId + "):");
        Janus.vdebug(request);
        if(websockets) {
            request["session_id"] = sessionId;
            request["handle_id"] = handleId;
            ws.send(JSON.stringify(request));
            return;
        }
        Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
            verb: 'POST',
            withCredentials: withCredentials,
            body: request,
            success: function(json) {
                Janus.vdebug("Candidate sent!");
                Janus.vdebug(json);
                if(json["janus"] !== "ack") {
                    Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                    return;
                }
            },
            error: function(textStatus, errorThrown) {
                Janus.error(textStatus + ": " + errorThrown);	// FIXME
            }
        });
    }

    // Private method to send a data channel message
    function sendData(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
        }
        var config = pluginHandle.webrtcStuff;
        var text = callbacks.text;
        if(text === null || text === undefined) {
            Janus.warn("Invalid text");
            callbacks.error("Invalid text");
            return;
        }
        Janus.log("Sending string on data channel: " + text);
        config.dataChannel.send(text);
        callbacks.success();
    }

    // Private method to send a DTMF tone
    function sendDtmf(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
        }
        var config = pluginHandle.webrtcStuff;
        if(config.dtmfSender === null || config.dtmfSender === undefined) {
            // Create the DTMF sender, if possible
            if(config.myStream !== undefined && config.myStream !== null) {
                var tracks = config.myStream.getAudioTracks();
                if(tracks !== null && tracks !== undefined && tracks.length > 0) {
                    var local_audio_track = tracks[0];
                    config.dtmfSender = config.pc.createDTMFSender(local_audio_track);
                    Janus.log("Created DTMF Sender");
                    config.dtmfSender.ontonechange = function(tone) { Janus.debug("Sent DTMF tone: " + tone.tone); };
                }
            }
            if(config.dtmfSender === null || config.dtmfSender === undefined) {
                Janus.warn("Invalid DTMF configuration");
                callbacks.error("Invalid DTMF configuration");
                return;
            }
        }
        var dtmf = callbacks.dtmf;
        if(dtmf === null || dtmf === undefined) {
            Janus.warn("Invalid DTMF parameters");
            callbacks.error("Invalid DTMF parameters");
            return;
        }
        var tones = dtmf.tones;
        if(tones === null || tones === undefined) {
            Janus.warn("Invalid DTMF string");
            callbacks.error("Invalid DTMF string");
            return;
        }
        var duration = dtmf.duration;
        if(duration === null || duration === undefined)
            duration = 500;	// We choose 500ms as the default duration for a tone
        var gap = dtmf.gap;
        if(gap === null || gap === undefined)
            gap = 50;	// We choose 50ms as the default gap between tones
        Janus.debug("Sending DTMF string " + tones + " (duration " + duration + "ms, gap " + gap + "ms)");
        config.dtmfSender.insertDTMF(tones, duration, gap);
    }

    // Private method to destroy a plugin handle
    function destroyHandle(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
        Janus.warn(callbacks);
        var asyncRequest = true;
        if(callbacks.asyncRequest !== undefined && callbacks.asyncRequest !== null)
            asyncRequest = (callbacks.asyncRequest === true);
        Janus.log("Destroying handle " + handleId + " (async=" + asyncRequest + ")");
        cleanupWebrtc(handleId);
        if (pluginHandles[handleId].detached) {
            // Plugin was already detached by Janus, calling detach again will return a handle not found error, so just exit here
            delete pluginHandles[handleId];
            callbacks.success();
            return;
        }
        if(!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            callbacks.error("Is the gateway down? (connected=false)");
            return;
        }
        var request = { "janus": "detach", "transaction": Janus.randomString(12) };
        if(token !== null && token !== undefined)
            request["token"] = token;
        if(apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
        if(websockets) {
            request["session_id"] = sessionId;
            request["handle_id"] = handleId;
            ws.send(JSON.stringify(request));
            delete pluginHandles[handleId];
            callbacks.success();
            return;
        }
        Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
            verb: 'POST',
            async: asyncRequest,	// Sometimes we need false here, or destroying in onbeforeunload won't work
            withCredentials: withCredentials,
            body: request,
            success: function(json) {
                Janus.log("Destroyed handle:");
                Janus.debug(json);
                if(json["janus"] !== "success") {
                    Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);	// FIXME
                }
                delete pluginHandles[handleId];
                callbacks.success();
            },
            error: function(textStatus, errorThrown) {
                Janus.error(textStatus + ": " + errorThrown);	// FIXME
                // We cleanup anyway
                delete pluginHandles[handleId];
                callbacks.success();
            }
        });
    }

    // WebRTC stuff
    function streamsDone(handleId, jsep, media, callbacks, stream) {
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
        }
        var config = pluginHandle.webrtcStuff;
        Janus.debug("streamsDone:", stream);
        config.myStream = stream;
        var pc_config = {"iceServers": iceServers, "iceTransportPolicy": iceTransportPolicy, "bundlePolicy": bundlePolicy};
        //~ var pc_constraints = {'mandatory': {'MozDontOfferDataChannel':true}};
        var pc_constraints = {
            "optional": [{"DtlsSrtpKeyAgreement": true}]
        };
        if(ipv6Support === true) {
            // FIXME This is only supported in Chrome right now
            // For support in Firefox track this: https://bugzilla.mozilla.org/show_bug.cgi?id=797262
            pc_constraints.optional.push({"googIPv6":true});
        }
        if(Janus.webRTCAdapter.browserDetails.browser === "edge") {
            // This is Edge, enable BUNDLE explicitly
            pc_config.bundlePolicy = "max-bundle";
        }
        Janus.log("Creating PeerConnection");
        Janus.debug(pc_constraints);
        config.pc = new RTCPeerConnection(pc_config, pc_constraints);
        Janus.debug(config.pc);
        if(config.pc.getStats) {	// FIXME
            config.volume.value = 0;
            config.bitrate.value = "0 kbits/sec";
        }
        Janus.log("Preparing local SDP and gathering candidates (trickle=" + config.trickle + ")");
        config.pc.oniceconnectionstatechange = function(e) {
            if(config.pc)
                pluginHandle.iceState(config.pc.iceConnectionState);
        };
        config.pc.onicecandidate = function(event) {
            if (event.candidate == null ||
                (Janus.webRTCAdapter.browserDetails.browser === 'edge' && event.candidate.candidate.indexOf('endOfCandidates') > 0)) {
                Janus.log("End of candidates.");
                config.iceDone = true;
                if(config.trickle === true) {
                    // Notify end of candidates
                    sendTrickleCandidate(handleId, {"completed": true});
                } else {
                    // No trickle, time to send the complete SDP (including all candidates)
                    sendSDP(handleId, callbacks);
                }
            } else {
                // JSON.stringify doesn't work on some WebRTC objects anymore
                // See https://code.google.com/p/chromium/issues/detail?id=467366
                var candidate = {
                    "candidate": event.candidate.candidate,
                    "sdpMid": event.candidate.sdpMid,
                    "sdpMLineIndex": event.candidate.sdpMLineIndex
                };
                if(config.trickle === true) {
                    // Send candidate
                    sendTrickleCandidate(handleId, candidate);
                }
            }
        };
        if(stream !== null && stream !== undefined) {
            Janus.log('Adding local stream');
            stream.getTracks().forEach(track => config.pc.addTrack(track, stream));
            pluginHandle.onlocalstream(stream);
        }
        config.pc.ontrack = function(event) {
            Janus.log("Handling Remote Track");
            Janus.debug(event);
            if(!event.streams)
                return;
            config.remoteStream = event.streams[0];
            pluginHandle.onremotestream(config.remoteStream);
        };
        // Any data channel to create?
        if(isDataEnabled(media)) {
            Janus.log("Creating data channel");
            var onDataChannelMessage = function(event) {
                Janus.log('Received message on data channel: ' + event.data);
                pluginHandle.ondata(event.data);	// FIXME
            }
            var onDataChannelStateChange = function() {
                var dcState = config.dataChannel !== null ? config.dataChannel.readyState : "null";
                Janus.log('State change on data channel: ' + dcState);
                if(dcState === 'open') {
                    pluginHandle.ondataopen();	// FIXME
                }
            }
            var onDataChannelError = function(error) {
                Janus.error('Got error on data channel:', error);
                // TODO
            }
            // Until we implement the proxying of open requests within the Janus core, we open a channel ourselves whatever the case
            config.dataChannel = config.pc.createDataChannel("JanusDataChannel", {ordered:false});	// FIXME Add options (ordered, maxRetransmits, etc.)
            config.dataChannel.onmessage = onDataChannelMessage;
            config.dataChannel.onopen = onDataChannelStateChange;
            config.dataChannel.onclose = onDataChannelStateChange;
            config.dataChannel.onerror = onDataChannelError;
        }
        // Create offer/answer now
        if(jsep === null || jsep === undefined) {
            createOffer(handleId, media, callbacks);
        } else {
            config.pc.setRemoteDescription(
                new RTCSessionDescription(jsep),
                function() {
                    Janus.log("Remote description accepted!");
                    createAnswer(handleId, media, callbacks);
                }, callbacks.error);
        }
    }

    function prepareWebrtc(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : webrtcError;
        var jsep = callbacks.jsep;
        var media = callbacks.media;
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
        }
        var config = pluginHandle.webrtcStuff;
        // Are we updating a session?
        if(config.pc !== undefined && config.pc !== null) {
            Janus.log("Updating existing media session");
            // Create offer/answer now
            if(jsep === null || jsep === undefined) {
                createOffer(handleId, media, callbacks);
            } else {
                config.pc.setRemoteDescription(
                    new RTCSessionDescription(jsep),
                    function() {
                        Janus.log("Remote description accepted!");
                        createAnswer(handleId, media, callbacks);
                    }, callbacks.error);
            }
            return;
        }
        config.trickle = isTrickleEnabled(callbacks.trickle);
        // Was a MediaStream object passed, or do we need to take care of that?
        if(callbacks.stream !== null && callbacks.stream !== undefined) {
            var stream = callbacks.stream;
            Janus.log("MediaStream provided by the application");
            Janus.debug(stream);
            // Skip the getUserMedia part
            config.streamExternal = true;
            streamsDone(handleId, jsep, media, callbacks, stream);
            return;
        }
        if(isAudioSendEnabled(media) || isVideoSendEnabled(media)) {
            var constraints = { mandatory: {}, optional: []};
            pluginHandle.consentDialog(true);
            var audioSupport = isAudioSendEnabled(media);
            if(audioSupport === true && media != undefined && media != null) {
                if(typeof media.audio === 'object') {
                    audioSupport = media.audio;
                }
            }
            var videoSupport = isVideoSendEnabled(media);
            if(videoSupport === true && media != undefined && media != null) {
                var simulcast = callbacks.simulcast === true ? true : false;
                if(simulcast && !jsep && (media.video === undefined || media.video === false))
                    media.video = "hires";
                if(media.video && media.video != 'screen' && media.video != 'window') {
                    var width = 0;
                    var height = 0, maxHeight = 0;
                    if(media.video === 'lowres') {
                        // Small resolution, 4:3
                        height = 240;
                        maxHeight = 240;
                        width = 320;
                    } else if(media.video === 'lowres-16:9') {
                        // Small resolution, 16:9
                        height = 180;
                        maxHeight = 180;
                        width = 320;
                    } else if(media.video === 'hires' || media.video === 'hires-16:9' ) {
                        // High resolution is only 16:9
                        height = 720;
                        maxHeight = 720;
                        width = 1280;
                        if(navigator.mozGetUserMedia) {
                            var firefoxVer = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
                            if(firefoxVer < 38) {
                                // Unless this is and old Firefox, which doesn't support it
                                Janus.warn(media.video + " unsupported, falling back to stdres (old Firefox)");
                                height = 480;
                                maxHeight = 480;
                                width  = 640;
                            }
                        }
                    } else if(media.video === 'stdres') {
                        // Normal resolution, 4:3
                        height = 480;
                        maxHeight = 480;
                        width  = 640;
                    } else if(media.video === 'stdres-16:9') {
                        // Normal resolution, 16:9
                        height = 360;
                        maxHeight = 360;
                        width = 640;
                    } else {
                        Janus.log("Default video setting is stdres 4:3");
                        height = 480;
                        maxHeight = 480;
                        width = 640;
                    }
                    Janus.log("Adding media constraint:", media.video);
                    if(navigator.mozGetUserMedia) {
                        var firefoxVer = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
                        if(firefoxVer < 38) {
                            videoSupport = {
                                'require': ['height', 'width'],
                                'height': {'max': maxHeight, 'min': height},
                                'width':  {'max': width,  'min': width}
                            };
                        } else {
                            // http://stackoverflow.com/questions/28282385/webrtc-firefox-constraints/28911694#28911694
                            // https://github.com/meetecho/janus-gateway/pull/246
                            videoSupport = {
                                'height': {'ideal': height},
                                'width':  {'ideal': width}
                            };
                        }
                    } else {
                        videoSupport = {
                            'mandatory': {
                                'maxHeight': maxHeight,
                                'minHeight': height,
                                'maxWidth':  width,
                                'minWidth':  width
                            },
                            'optional': []
                        };
                    }
                    if(typeof media.video === 'object') {
                        videoSupport = media.video;
                    }
                    Janus.debug(videoSupport);
                } else if(media.video === 'screen' || media.video === 'window') {
                    if(!media.screenshareFrameRate) {
                        media.screenshareFrameRate = 3;
                    }
                    // Not a webcam, but screen capture
                    if(window.location.protocol !== 'https:') {
                        // Screen sharing mandates HTTPS
                        Janus.warn("Screen sharing only works on HTTPS, try the https:// version of this page");
                        pluginHandle.consentDialog(false);
                        callbacks.error("Screen sharing only works on HTTPS, try the https:// version of this page");
                        return;
                    }
                    // We're going to try and use the extension for Chrome 34+, the old approach
                    // for older versions of Chrome, or the experimental support in Firefox 33+
                    var cache = {};
                    function callbackUserMedia (error, stream) {
                        pluginHandle.consentDialog(false);
                        if(error) {
                            callbacks.error({code: error.code, name: error.name, message: error.message});
                        } else {
                            streamsDone(handleId, jsep, media, callbacks, stream);
                        }
                    };
                    function getScreenMedia(constraints, gsmCallback, useAudio) {
                        Janus.log("Adding media constraint (screen capture)");
                        Janus.debug(constraints);
                        navigator.mediaDevices.getUserMedia(constraints)
                            .then(function(stream) {
                                if(useAudio){
                                    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                                        .then(function (audioStream) {
                                            stream.addTrack(audioStream.getAudioTracks()[0]);
                                            gsmCallback(null, stream);
                                        })
                                } else {
                                    gsmCallback(null, stream);
                                }
                            })
                            .catch(function(error) { pluginHandle.consentDialog(false); gsmCallback(error); });
                    };
                    if(Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
                        var chromever = Janus.webRTCAdapter.browserDetails.version;
                        var maxver = 33;
                        if(window.navigator.userAgent.match('Linux'))
                            maxver = 35;	// "known" crash in chrome 34 and 35 on linux
                        if(chromever >= 26 && chromever <= maxver) {
                            // Chrome 26->33 requires some awkward chrome://flags manipulation
                            constraints = {
                                video: {
                                    mandatory: {
                                        googLeakyBucket: true,
                                        maxWidth: window.screen.width,
                                        maxHeight: window.screen.height,
                                        minFrameRate: media.screenshareFrameRate,
                                        maxFrameRate: media.screenshareFrameRate,
                                        chromeMediaSource: 'screen'
                                    }
                                },
                                audio: isAudioSendEnabled(media)
                            };
                            getScreenMedia(constraints, callbackUserMedia);
                        } else {
                            // Chrome 34+ requires an extension
                            var pending = window.setTimeout(
                                function () {
                                    error = new Error('NavigatorUserMediaError');
                                    error.name = 'The required Chrome extension is not installed: click <a href="#">here</a> to install it. (NOTE: this will need you to refresh the page)';
                                    pluginHandle.consentDialog(false);
                                    return callbacks.error(error);
                                }, 1000);
                            cache[pending] = [callbackUserMedia, null];
                            window.postMessage({ type: 'janusGetScreen', id: pending }, '*');
                        }
                    } else if (window.navigator.userAgent.match('Firefox')) {
                        var ffver = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
                        if(ffver >= 33) {
                            // Firefox 33+ has experimental support for screen sharing
                            constraints = {
                                video: {
                                    mozMediaSource: media.video,
                                    mediaSource: media.video
                                },
                                audio: isAudioSendEnabled(media)
                            };
                            getScreenMedia(constraints, function (err, stream) {
                                callbackUserMedia(err, stream);
                                // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1045810
                                if (!err) {
                                    var lastTime = stream.currentTime;
                                    var polly = window.setInterval(function () {
                                        if(!stream)
                                            window.clearInterval(polly);
                                        if(stream.currentTime == lastTime) {
                                            window.clearInterval(polly);
                                            if(stream.onended) {
                                                stream.onended();
                                            }
                                        }
                                        lastTime = stream.currentTime;
                                    }, 500);
                                }
                            });
                        } else {
                            var error = new Error('NavigatorUserMediaError');
                            error.name = 'Your version of Firefox does not support screen sharing, please install Firefox 33 (or more recent versions)';
                            pluginHandle.consentDialog(false);
                            callbacks.error(error);
                            return;
                        }
                    }

                    // Wait for events from the Chrome Extension
                    window.addEventListener('message', function (event) {
                        if(event.origin != window.location.origin)
                            return;
                        if(event.data.type == 'janusGotScreen' && cache[event.data.id]) {
                            var data = cache[event.data.id];
                            var callback = data[0];
                            delete cache[event.data.id];

                            if (event.data.sourceId === '') {
                                // user canceled
                                var error = new Error('NavigatorUserMediaError');
                                error.name = 'You cancelled the request for permission, giving up...';
                                pluginHandle.consentDialog(false);
                                callbacks.error(error);
                            } else {
                                constraints = {
                                    audio: false,
                                    video: {
                                        mandatory: {
                                            chromeMediaSource: 'desktop',
                                            maxWidth: window.screen.width,
                                            maxHeight: window.screen.height,
                                            minFrameRate: media.screenshareFrameRate,
                                            maxFrameRate: media.screenshareFrameRate,
                                        },
                                        optional: [
                                            {googLeakyBucket: true},
                                            {googTemporalLayeredScreencast: true}
                                        ]
                                    }
                                };
                                constraints.video.mandatory.chromeMediaSourceId = event.data.sourceId;
                                getScreenMedia(constraints, callback, isAudioSendEnabled(media));
                            }
                        } else if (event.data.type == 'janusGetScreenPending') {
                            window.clearTimeout(event.data.id);
                        }
                    });
                    return;
                }
            }
            // If we got here, we're not screensharing
            if(media === null || media === undefined || media.video !== 'screen') {
                // Check whether all media sources are actually available or not
                navigator.mediaDevices.enumerateDevices().then(function(devices) {
                    var audioExist = devices.some(function(device) {
                            return device.kind === 'audioinput';
                        }),
                        videoExist = devices.some(function(device) {
                            return device.kind === 'videoinput';
                        });

                    // Check whether a missing device is really a problem
                    var audioSend = isAudioSendEnabled(media);
                    var videoSend = isVideoSendEnabled(media);
                    var needAudioDevice = isAudioSendRequired(media);
                    var needVideoDevice = isVideoSendRequired(media);
                    if(audioSend || videoSend || needAudioDevice || needVideoDevice) {
                        // We need to send either audio or video
                        var haveAudioDevice = audioSend ? audioExist : false;
                        var haveVideoDevice = videoSend ? videoExist : false;
                        if(!haveAudioDevice && !haveVideoDevice) {
                            // FIXME Should we really give up, or just assume recvonly for both?
                            pluginHandle.consentDialog(false);
                            callbacks.error('No capture device found');
                            return false;
                        } else if(!haveAudioDevice && needAudioDevice) {
                            pluginHandle.consentDialog(false);
                            callbacks.error('Audio capture is required, but no capture device found');
                            return false;
                        } else if(!haveVideoDevice && needVideoDevice) {
                            pluginHandle.consentDialog(false);
                            callbacks.error('Video capture is required, but no capture device found');
                            return false;
                        }
                    }

                    navigator.mediaDevices.getUserMedia({
                        audio: media.audio ? media.audio : false,
                        video: videoExist ? videoSupport : false
                    })
                        .then(function(stream) { pluginHandle.consentDialog(false); streamsDone(handleId, jsep, media, callbacks, stream); })
                        .catch(function(error) { pluginHandle.consentDialog(false); callbacks.error({code: error.code, name: error.name, message: error.message}); });
                })
                    .catch(function(error) {
                        pluginHandle.consentDialog(false);
                        callbacks.error('enumerateDevices error', error);
                    });
            }
        } else {
            // No need to do a getUserMedia, create offer/answer right away
            streamsDone(handleId, jsep, media, callbacks);
        }
    }

    function prepareWebrtcPeer(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : webrtcError;
        var jsep = callbacks.jsep;
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
        }
        var config = pluginHandle.webrtcStuff;
        if(jsep !== undefined && jsep !== null) {
            if(config.pc === null) {
                Janus.warn("Wait, no PeerConnection?? if this is an answer, use createAnswer and not handleRemoteJsep");
                callbacks.error("No PeerConnection: if this is an answer, use createAnswer and not handleRemoteJsep");
                return;
            }
            config.pc.setRemoteDescription(
                new RTCSessionDescription(jsep),
                function() {
                    Janus.log("Remote description accepted!");
                    callbacks.success();
                }, callbacks.error);
        } else {
            callbacks.error("Invalid JSEP");
        }
    }
    function updateBitrate (handleId, callbacks) {
        var pluginHandle = pluginHandles[handleId];
        var config = pluginHandle.webrtcStuff;
        console.log(config, 'config')
        console.log(config.pc.getSenders())
        var sender = config.pc.getSenders()[0];
            Janus.log(sender);
            var parameters = sender.getParameters();
            Janus.log(parameters);
            parameters.encodings.forEach(e => {
                e.maxBitrate = (e.maxBitrate && e.maxBitrate > 0) ? e.maxBitrate = e.maxBitrate - 10000 : e.maxBitrate = 100000;
            })
            console.log('当前参数:', parameters)
            sender.setParameters(parameters).then(() => {console.log("Bitrate:设置成功");}).catch((e) => { 
              console.log('bitrate失败：', e)
            });
    }
    function createOffer(handleId, media, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
        }
        var config = pluginHandle.webrtcStuff;
        var simulcast = callbacks.simulcast === true ? true : false;
        if(!simulcast) {
            Janus.log("Creating offer (iceDone=" + config.iceDone + ")");
        } else {
            Janus.log("Creating offer (iceDone=" + config.iceDone + ", simulcast=" + simulcast + ")");
        }
        // https://code.google.com/p/webrtc/issues/detail?id=3508
        var mediaConstraints = null;
        if(Janus.webRTCAdapter.browserDetails.browser == "firefox" || Janus.webRTCAdapter.browserDetails.browser == "edge") {
            mediaConstraints = {
                'offerToReceiveAudio':isAudioRecvEnabled(media),
                'offerToReceiveVideo':isVideoRecvEnabled(media)
            };
        } else {
            mediaConstraints = {
                'mandatory': {
                    'OfferToReceiveAudio':isAudioRecvEnabled(media),
                    'OfferToReceiveVideo':isVideoRecvEnabled(media)
                }
            };
        }
        Janus.debug(mediaConstraints);
        // Check if this is Firefox and we've been asked to do simulcasting
        var sendVideo = isVideoSendEnabled(media);
        if(sendVideo && simulcast && adapter.browserDetails.browser === "firefox") {
            // FIXME Based on https://gist.github.com/voluntas/088bc3cc62094730647b
            Janus.log("Enabling Simulcasting for Firefox (RID)");
            var sender = config.pc.getSenders()[1];
            Janus.log(sender);
            var parameters = sender.getParameters();
            Janus.log(parameters);
            sender.setParameters({encodings: [
                    { rid: "high", active: true, priority: "high", maxBitrate: 1000000 },
                    { rid: "medium", active: true, priority: "medium", maxBitrate: 300000 },
                    { rid: "low", active: true, priority: "low", maxBitrate: 100000 }
                ]});
        }
        config.pc.createOffer(
            function(offer) {
                Janus.debug(offer);
                if(config.mySdp === null || config.mySdp === undefined) {
                    Janus.log("Setting local description");
                    if(sendVideo && simulcast) {
                        // This SDP munging only works with Chrome
                        if(adapter.browserDetails.browser === "chrome") {
                            Janus.log("Enabling Simulcasting for Chrome (SDP munging)");
                            offer.sdp = mungeSdpForSimulcasting(offer.sdp);
                        } else if(adapter.browserDetails.browser !== "firefox") {
                            Janus.warn("simulcast=true, but this is not Chrome nor Firefox, ignoring");
                        }
                    }
                    config.mySdp = offer.sdp;
                    config.pc.setLocalDescription(offer);
                }
                if(!config.iceDone && !config.trickle) {
                    // Don't do anything until we have all candidates
                    Janus.log("Waiting for all candidates...");
                    return;
                }
                if(config.sdpSent) {
                    Janus.log("Offer already sent, not sending it again");
                    return;
                }
                Janus.log("Offer ready");
                Janus.debug(callbacks);
                config.sdpSent = true;
                // JSON.stringify doesn't work on some WebRTC objects anymore
                // See https://code.google.com/p/chromium/issues/detail?id=467366
                var jsep = {
                    "type": offer.type,
                    "sdp": offer.sdp
                };
                console.log(jsep, '媒体信息')
                callbacks.success(jsep);
            }, callbacks.error, mediaConstraints);
    }

    function createAnswer(handleId, media, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
        }
        var config = pluginHandle.webrtcStuff;
        var simulcast = callbacks.simulcast === true ? true : false;
        if(!simulcast) {
            Janus.log("Creating answer (iceDone=" + config.iceDone + ")");
        } else {
            Janus.log("Creating answer (iceDone=" + config.iceDone + ", simulcast=" + simulcast + ")");
        }
        var mediaConstraints = null;
        if(Janus.webRTCAdapter.browserDetails.browser == "firefox" || Janus.webRTCAdapter.browserDetails.browser == "edge") {
            mediaConstraints = {
                'offerToReceiveAudio':isAudioRecvEnabled(media),
                'offerToReceiveVideo':isVideoRecvEnabled(media)
            };
        } else {
            mediaConstraints = {
                'mandatory': {
                    'OfferToReceiveAudio':isAudioRecvEnabled(media),
                    'OfferToReceiveVideo':isVideoRecvEnabled(media)
                }
            };
        }
        Janus.debug(mediaConstraints);
        // Check if this is Firefox and we've been asked to do simulcasting
        var sendVideo = isVideoSendEnabled(media);
        if(sendVideo && simulcast && adapter.browserDetails.browser === "firefox") {
            // FIXME Based on https://gist.github.com/voluntas/088bc3cc62094730647b
            Janus.log("Enabling Simulcasting for Firefox (RID)");
            var sender = config.pc.getSenders()[1];
            Janus.log(sender);
            var parameters = sender.getParameters();
            Janus.log(parameters);
            sender.setParameters({encodings: [
                    { rid: "high", active: true, priority: "high", maxBitrate: 1000000 },
                    { rid: "medium", active: true, priority: "medium", maxBitrate: 300000 },
                    { rid: "low", active: true, priority: "low", maxBitrate: 100000 }
                ]});
        }
        config.pc.createAnswer(
            function(answer) {
                Janus.debug(answer);
                if(config.mySdp === null || config.mySdp === undefined) {
                    Janus.log("Setting local description");
                    if(sendVideo && simulcast) {
                        // This SDP munging only works with Chrome
                        if(adapter.browserDetails.browser === "chrome") {
                            // FIXME Apparently trying to simulcast when answering breaks video in Chrome...
                            //~ Janus.log("Enabling Simulcasting for Chrome (SDP munging)");
                            //~ answer.sdp = mungeSdpForSimulcasting(answer.sdp);
                            Janus.warn("simulcast=true, but this is an answer, and video breaks in Chrome if we enable it");
                        } else if(adapter.browserDetails.browser !== "firefox") {
                            Janus.warn("simulcast=true, but this is not Chrome nor Firefox, ignoring");
                        }
                    }
                    config.mySdp = answer.sdp;
                    config.pc.setLocalDescription(answer);
                }
                if(!config.iceDone && !config.trickle) {
                    // Don't do anything until we have all candidates
                    Janus.log("Waiting for all candidates...");
                    return;
                }
                if(config.sdpSent) {	// FIXME badly
                    Janus.log("Answer already sent, not sending it again");
                    return;
                }
                config.sdpSent = true;
                // JSON.stringify doesn't work on some WebRTC objects anymore
                // See https://code.google.com/p/chromium/issues/detail?id=467366
                var jsep = {
                    "type": answer.type,
                    "sdp": answer.sdp
                };
                callbacks.success(jsep);
            }, callbacks.error, mediaConstraints);
    }

    function sendSDP(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
        callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle, not sending anything");
            return;
        }
        var config = pluginHandle.webrtcStuff;
        Janus.log("Sending offer/answer SDP...");
        if(config.mySdp === null || config.mySdp === undefined) {
            Janus.warn("Local SDP instance is invalid, not sending anything...");
            return;
        }
        config.mySdp = {
            "type": config.pc.localDescription.type,
            "sdp": config.pc.localDescription.sdp
        };
        if(config.sdpSent) {
            Janus.log("Offer/Answer SDP already sent, not sending it again");
            return;
        }
        if(config.trickle === false)
            config.mySdp["trickle"] = false;
        Janus.debug(callbacks);
        config.sdpSent = true;
        callbacks.success(config.mySdp);
    }

    function getVolume(handleId) {
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            return 0;
        }
        var config = pluginHandle.webrtcStuff;
        // Start getting the volume, if getStats is supported
        if(config.pc.getStats && Janus.webRTCAdapter.browserDetails.browser == "chrome") {	// FIXME
            if(config.remoteStream === null || config.remoteStream === undefined) {
                Janus.warn("Remote stream unavailable");
                return 0;
            }
            // http://webrtc.googlecode.com/svn/trunk/samples/js/demos/html/constraints-and-stats.html
            if(config.volume.timer === null || config.volume.timer === undefined) {
                Janus.log("Starting volume monitor");
                config.volume.timer = setInterval(function() {
                    config.pc.getStats(function(stats) {
                        var results = stats.result();
                        for(var i=0; i<results.length; i++) {
                            var res = results[i];
                            if(res.type == 'ssrc' && res.stat('audioOutputLevel')) {
                                config.volume.value = res.stat('audioOutputLevel');
                            }
                        }
                    });
                }, 200);
                return 0;	// We don't have a volume to return yet
            }
            return config.volume.value;
        } else {
            Janus.log("Getting the remote volume unsupported by browser");
            return 0;
        }
    }

    function isMuted(handleId, video) {
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            return true;
        }
        var config = pluginHandle.webrtcStuff;
        if(config.pc === null || config.pc === undefined) {
            Janus.warn("Invalid PeerConnection");
            return true;
        }
        if(config.myStream === undefined || config.myStream === null) {
            Janus.warn("Invalid local MediaStream");
            return true;
        }
        if(video) {
            // Check video track
            if(config.myStream.getVideoTracks() === null
                || config.myStream.getVideoTracks() === undefined
                || config.myStream.getVideoTracks().length === 0) {
                Janus.warn("No video track");
                return true;
            }
            return !config.myStream.getVideoTracks()[0].enabled;
        } else {
            // Check audio track
            if(config.myStream.getAudioTracks() === null
                || config.myStream.getAudioTracks() === undefined
                || config.myStream.getAudioTracks().length === 0) {
                Janus.warn("No audio track");
                return true;
            }
            return !config.myStream.getAudioTracks()[0].enabled;
        }
    }

    function mute(handleId, video, mute) {
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            return false;
        }
        var config = pluginHandle.webrtcStuff;
        if(config.pc === null || config.pc === undefined) {
            Janus.warn("Invalid PeerConnection");
            return false;
        }
        if(config.myStream === undefined || config.myStream === null) {
            Janus.warn("Invalid local MediaStream");
            return false;
        }
        if(video) {
            // Mute/unmute video track
            if(config.myStream.getVideoTracks() === null
                || config.myStream.getVideoTracks() === undefined
                || config.myStream.getVideoTracks().length === 0) {
                Janus.warn("No video track");
                return false;
            }
            config.myStream.getVideoTracks()[0].enabled = mute ? false : true;
            return true;
        } else {
            // Mute/unmute audio track
            if(config.myStream.getAudioTracks() === null
                || config.myStream.getAudioTracks() === undefined
                || config.myStream.getAudioTracks().length === 0) {
                Janus.warn("No audio track");
                return false;
            }
            config.myStream.getAudioTracks()[0].enabled = mute ? false : true;
            return true;
        }
    }

    function getBitrate(handleId) {
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            return "Invalid handle";
        }
        var config = pluginHandle.webrtcStuff;
        if(config.pc === null || config.pc === undefined)
            return "Invalid PeerConnection";
        // Start getting the bitrate, if getStats is supported
        if(config.pc.getStats) {
            if(config.bitrate.timer === null || config.bitrate.timer === undefined) {
                Janus.log("Starting bitrate timer (via getStats)");
                config.bitrate.timer = setInterval(function() {
                    config.pc.getStats()
                        .then(function(stats) {
                            stats.forEach(function (res) {
                                if(!res)
                                    return;
                                var inStats = false;
                                // Check if these are statistics on incoming media
                                if((res.mediaType === "video" || res.id.toLowerCase().indexOf("video") > -1) &&
                                    res.type === "inbound-rtp" && res.id.indexOf("rtcp") < 0) {
                                    // New stats
                                    inStats = true;
                                } else if(res.type == 'ssrc' && res.bytesReceived &&
                                    (res.googCodecName === "VP8" || res.googCodecName === "")) {
                                    // Older Chromer versions
                                    inStats = true;
                                }
                                // Parse stats now
                                if(inStats) {
                                    config.bitrate.bsnow = res.bytesReceived;
                                    config.bitrate.tsnow = res.timestamp;
                                    if(config.bitrate.bsbefore === null || config.bitrate.tsbefore === null) {
                                        // Skip this round
                                        config.bitrate.bsbefore = config.bitrate.bsnow;
                                        config.bitrate.tsbefore = config.bitrate.tsnow;
                                    } else {
                                        // Calculate bitrate
                                        var timePassed = config.bitrate.tsnow - config.bitrate.tsbefore;
                                        if(adapter.browserDetails.browser == "safari")
                                            timePassed = timePassed/1000;	// Apparently the timestamp is in microseconds, in Safari
                                        var bitRate = Math.round((config.bitrate.bsnow - config.bitrate.bsbefore) * 8 / timePassed);
                                        config.bitrate.value = bitRate + ' kbits/sec';
                                        //~ Janus.log("Estimated bitrate is " + config.bitrate.value);
                                        config.bitrate.bsbefore = config.bitrate.bsnow;
                                        config.bitrate.tsbefore = config.bitrate.tsnow;
                                    }
                                }
                                
                            });
                        });
                }, 1000);
                return "0 kbits/sec";	// We don't have a bitrate value yet
            }
            return config.bitrate.value;
        } else {
            Janus.warn("Getting the video bitrate unsupported by browser");
            return "Feature unsupported by browser";
        }
    }

    function webrtcError(error) {
        Janus.error("WebRTC error:", error);
    }

    function cleanupWebrtc(handleId, hangupRequest) {
        Janus.log("Cleaning WebRTC stuff");
        var pluginHandle = pluginHandles[handleId];
        if(pluginHandle === null || pluginHandle === undefined) {
            // Nothing to clean
            return;
        }
        var config = pluginHandle.webrtcStuff;
        if(config !== null && config !== undefined) {
            if(hangupRequest === true) {
                // Send a hangup request (we don't really care about the response)
                var request = { "janus": "hangup", "transaction": Janus.randomString(12) };
                if(token !== null && token !== undefined)
                    request["token"] = token;
                if(apisecret !== null && apisecret !== undefined)
                    request["apisecret"] = apisecret;
                Janus.debug("Sending hangup request (handle=" + handleId + "):");
                Janus.debug(request);
                if(websockets) {
                    request["session_id"] = sessionId;
                    request["handle_id"] = handleId;
                    ws.send(JSON.stringify(request));
                } else {
                    Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
                        verb: 'POST',
                        withCredentials: withCredentials,
                        data: request
                    });
                }
            }
            // Cleanup stack
            config.remoteStream = null;
            if(config.volume.timer)
                clearInterval(config.volume.timer);
            config.volume.value = null;
            if(config.bitrate.timer)
                clearInterval(config.bitrate.timer);
            config.bitrate.timer = null;
            config.bitrate.bsnow = null;
            config.bitrate.bsbefore = null;
            config.bitrate.tsnow = null;
            config.bitrate.tsbefore = null;
            config.bitrate.value = null;
            try {
                // Try a MediaStreamTrack.stop() for each track
                if(!config.streamExternal && config.myStream !== null && config.myStream !== undefined) {
                    Janus.log("Stopping local stream tracks");
                    var tracks = config.myStream.getTracks();
                    for(var i in tracks) {
                        var mst = tracks[i];
                        Janus.log(mst);
                        if(mst !== null && mst !== undefined)
                            mst.stop();
                    }
                }
            } catch(e) {
                // Do nothing if this fails
            }
            config.streamExternal = false;
            config.myStream = null;
            // Close PeerConnection
            try {
                config.pc.close();
            } catch(e) {
                // Do nothing
            }
            config.pc = null;
            config.mySdp = null;
            config.iceDone = false;
            config.sdpSent = false;
            config.dataChannel = null;
            config.dtmfSender = null;
        }
        pluginHandle.oncleanup();
    }

    // Helper method to munge an SDP to enable simulcasting (Chrome only)
    function mungeSdpForSimulcasting(sdp) {
        // Let's munge the SDP to add the attributes for enabling simulcasting
        // (based on https://gist.github.com/ggarber/a19b4c33510028b9c657)
        var lines = sdp.split("\r\n");
        var video = false;
        var ssrc = [ -1 ], ssrc_fid = -1;
        var cname = null, msid = null, mslabel = null, label = null;
        var insertAt = -1;
        for(var i=0; i<lines.length; i++) {
            var mline = lines[i].match(/m=(\w+) */);
            if(mline) {
                var medium = mline[1];
                if(medium === "video") {
                    // New video m-line: make sure it's the first one
                    if(ssrc[0] < 0) {
                        video = true;
                    } else {
                        // We're done, let's add the new attributes here
                        insertAt = i;
                        break;
                    }
                } else {
                    // New non-video m-line: do we have what we were looking for?
                    if(ssrc[0] > -1) {
                        // We're done, let's add the new attributes here
                        insertAt = i;
                        break;
                    }
                }
                continue;
            }
            if(!video)
                continue;
            var fid = lines[i].match(/a=ssrc-group:FID (\d+) (\d+)/);
            if(fid) {
                ssrc[0] = fid[1];
                ssrc_fid = fid[2];
                lines.splice(i, 1); i--;
                continue;
            }
            if(ssrc[0]) {
                var match = lines[i].match('a=ssrc:' + ssrc[0] + ' cname:(.+)')
                if(match) {
                    cname = match[1];
                }
                match = lines[i].match('a=ssrc:' + ssrc[0] + ' msid:(.+)')
                if(match) {
                    msid = match[1];
                }
                match = lines[i].match('a=ssrc:' + ssrc[0] + ' mslabel:(.+)')
                if(match) {
                    mslabel = match[1];
                }
                match = lines[i].match('a=ssrc:' + ssrc + ' label:(.+)')
                if(match) {
                    label = match[1];
                }
                if(lines[i].indexOf('a=ssrc:' + ssrc_fid) === 0) {
                    lines.splice(i, 1); i--;
                    continue;
                }
                if(lines[i].indexOf('a=ssrc:' + ssrc[0]) === 0) {
                    lines.splice(i, 1); i--;
                    continue;
                }
            }
            if(lines[i].length == 0) {
                lines.splice(i, 1); i--;
                continue;
            }
        }
        if(ssrc[0] < 0) {
            // Couldn't find a FID attribute, let's just take the first video SSRC we find
            insertAt = -1;
            video = false;
            for(var i=0; i<lines.length; i++) {
                var mline = lines[i].match(/m=(\w+) */);
                if(mline) {
                    var medium = mline[1];
                    if(medium === "video") {
                        // New video m-line: make sure it's the first one
                        if(ssrc[0] < 0) {
                            video = true;
                        } else {
                            // We're done, let's add the new attributes here
                            insertAt = i;
                            break;
                        }
                    } else {
                        // New non-video m-line: do we have what we were looking for?
                        if(ssrc[0] > -1) {
                            // We're done, let's add the new attributes here
                            insertAt = i;
                            break;
                        }
                    }
                    continue;
                }
                if(!video)
                    continue;
                if(ssrc[0] < 0) {
                    var value = lines[i].match(/a=ssrc:(\d+)/);
                    if(value) {
                        ssrc[0] = value[1];
                        lines.splice(i, 1); i--;
                        continue;
                    }
                } else {
                    var match = lines[i].match('a=ssrc:' + ssrc[0] + ' cname:(.+)')
                    if(match) {
                        cname = match[1];
                    }
                    match = lines[i].match('a=ssrc:' + ssrc[0] + ' msid:(.+)')
                    if(match) {
                        msid = match[1];
                    }
                    match = lines[i].match('a=ssrc:' + ssrc[0] + ' mslabel:(.+)')
                    if(match) {
                        mslabel = match[1];
                    }
                    match = lines[i].match('a=ssrc:' + ssrc + ' label:(.+)')
                    if(match) {
                        label = match[1];
                    }
                    if(lines[i].indexOf('a=ssrc:' + ssrc_fid) === 0) {
                        lines.splice(i, 1); i--;
                        continue;
                    }
                    if(lines[i].indexOf('a=ssrc:' + ssrc[0]) === 0) {
                        lines.splice(i, 1); i--;
                        continue;
                    }
                }
                if(lines[i].length == 0) {
                    lines.splice(i, 1); i--;
                    continue;
                }
            }
        }
        if(ssrc[0] < 0) {
            // Still nothing, let's just return the SDP we were asked to munge
            Janus.warn("Couldn't find the video SSRC, simulcasting NOT enabled");
            return sdp;
        }
        if(insertAt < 0) {
            // Append at the end
            insertAt = lines.length;
        }
        // Generate a couple of SSRCs
        ssrc[1] = Math.floor(Math.random()*0xFFFFFFFF);
        ssrc[2] = Math.floor(Math.random()*0xFFFFFFFF);
        // Add attributes to the SDP
        for(var i=0; i<ssrc.length; i++) {
            if(cname) {
                lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' cname:' + cname);
                insertAt++;
            }
            if(msid) {
                lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' msid:' + msid);
                insertAt++;
            }
            if(mslabel) {
                lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' mslabel:' + msid);
                insertAt++;
            }
            if(label) {
                lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' label:' + msid);
                insertAt++;
            }
        }
        lines.splice(insertAt, 0, 'a=ssrc-group:SIM ' + ssrc[0] + ' ' + ssrc[1] + ' ' + ssrc[2]);
        sdp = lines.join("\r\n");
        if(!sdp.endsWith("\r\n"))
            sdp += "\r\n";
        return sdp;
    }

    // Helper methods to parse a media object
    function isAudioSendEnabled(media) {
        Janus.debug("isAudioSendEnabled:", media);
        if(media === undefined || media === null)
            return true;	// Default
        if(media.audio === false)
            return false;	// Generic audio has precedence
        if(media.audioSend === undefined || media.audioSend === null)
            return true;	// Default
        return (media.audioSend === true);
    }

    function isAudioSendRequired(media) {
        Janus.debug("isAudioSendRequired:", media);
        if(media === undefined || media === null)
            return false;	// Default
        if(media.audio === false || media.audioSend === false)
            return false;	// If we're not asking to capture audio, it's not required
        if(media.failIfNoAudio === undefined || media.failIfNoAudio === null)
            return false;	// Default
        return (media.failIfNoAudio === true);
    }

    function isAudioRecvEnabled(media) {
        Janus.debug("isAudioRecvEnabled:", media);
        if(media === undefined || media === null)
            return true;	// Default
        if(media.audio === false)
            return false;	// Generic audio has precedence
        if(media.audioRecv === undefined || media.audioRecv === null)
            return true;	// Default
        return (media.audioRecv === true);
    }

    function isVideoSendEnabled(media) {
        Janus.debug("isVideoSendEnabled:", media);
        if(media === undefined || media === null)
            return true;	// Default
        if(media.video === false)
            return false;	// Generic video has precedence
        if(media.videoSend === undefined || media.videoSend === null)
            return true;	// Default
        return (media.videoSend === true);
    }

    function isVideoSendRequired(media) {
        Janus.debug("isVideoSendRequired:", media);
        if(media === undefined || media === null)
            return false;	// Default
        if(media.video === false || media.videoSend === false)
            return false;	// If we're not asking to capture video, it's not required
        if(media.failIfNoVideo === undefined || media.failIfNoVideo === null)
            return false;	// Default
        return (media.failIfNoVideo === true);
    }

    function isVideoRecvEnabled(media) {
        Janus.debug("isVideoRecvEnabled:", media);
        if(media === undefined || media === null)
            return true;	// Default
        if(media.video === false)
            return false;	// Generic video has precedence
        if(media.videoRecv === undefined || media.videoRecv === null)
            return true;	// Default
        return (media.videoRecv === true);
    }

    function isDataEnabled(media) {
        Janus.debug("isDataEnabled:", media);
        if(Janus.webRTCAdapter.browserDetails.browser == "edge") {
            Janus.warn("Edge doesn't support data channels yet");
            return false;
        }
        if(media === undefined || media === null)
            return false;	// Default
        return (media.data === true);
    }

    function isTrickleEnabled(trickle) {
        Janus.debug("isTrickleEnabled:", trickle);
        if(trickle === undefined || trickle === null)
            return true;	// Default is true
        return (trickle === true);
    }
};
