var m7PeerCalculagraph = null
var _topics = {};
var _loadedModules = {};
var opts = Object.prototype.toString;
var xtor = new Function;
var cname = "constructor";
var counter = 0;
var softphoneBar = null;
var phone = null;
var monitor = null;
var monitorTimers=[];
var monitoring = null;
var _cti_peerstate = null;
var prePhonebarStatus = '0';
var isCtiRelogin = false;
var currentEventObj = {}
var isWebsocket = true
var isSuperAdmin = false // 是否是超级管理员
var account = {}
var m7MonitorQueuesList = []
var m7MonitorPeersList = []
var m7CurrentAgentNumber = null
var m7MyQueue = []
var m7QueueWaitObj = {}
var m7queueNumber = 0
var m7IsCalling = false
function handleQueue() {
    var transferData = []
    for (var key in m7MonitorQueuesList) {
        var queue = {
            queueId: m7MonitorQueuesList[key].queueId,
            queueName: m7MonitorQueuesList[key].DisplayName,
            idleAgentCount: m7MonitorQueuesList[key].idleAgentCount,
            NotTransfer: m7MonitorQueuesList[key].NotTransfer || false,
            children: [],
            agentList: []
        }
        var members = m7MonitorQueuesList[key].members
        for (var key in members) {
            var child = {}
            var child1 = {}
            for (var peer in m7MonitorPeersList) {
                if (members[key] === m7MonitorPeersList[peer].sipNo) {
                    child1.exten = m7MonitorPeersList[peer].exten
                    child1.DisplayName = m7MonitorPeersList[peer].DisplayName
                    queue.agentList.push(child1)
                    if (m7MonitorPeersList[peer].callStatus === 'Idle' && (m7MonitorPeersList[peer].extenType === 'Local' || ((m7MonitorPeersList[peer].extenType === 'sip' || m7MonitorPeersList[peer].extenType === 'gateway') && m7MonitorPeersList[peer].register)) && !m7MonitorPeersList[peer].busy) {
                        child.exten = m7MonitorPeersList[peer].exten
                        child.DisplayName = m7MonitorPeersList[peer].DisplayName
                        queue.children.push(child)
                        break
                    }
                }
            }
        }
        transferData.push(queue)
    }
    return handleTransferHtml(transferData)
}
function m7TooglePop (index) {
  m7$('div[class*=m7TooglePop] .m7OperateIcon').removeClass('m7OperateIconOpen')
  m7$('.m7TooglePop' + index +' .m7OperateIcon').addClass('m7OperateIconOpen')
  m7$('ul[class*=m7-child-]').hide()
  m7$('.m7-child-'+ index).show()
}
function handleTransferHtml (transferData) {
    var str = '<ul style="margin:0;padding:0;list-style-type: none;margin-top:10px;height:166px;overflow:auto;">'
    for (var i = 0; i < transferData.length; i++) {
      var item = transferData[i]
      if (!item.NotTransfer || getAgentBelong(item.agentList)) {
          str += '<li>'
          if (item.children && item.children.length > 0) {
            str += ' <div onclick="m7TooglePop('+i+')" class="clear1 m7TooglePop'+i+'" style="height:auto;margin-top:10px;"><span class="m7OperateIcon"></span>'
          } else {
            str += ' <div onclick="m7TooglePop('+i+')"  class="clear1" style="height:auto;margin-top:10px;margin-left:4px;">'
          }
          str += '<span style="display: inline-block;max-width: 10em;cursor:pointer;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;float:left;" title="'+item.queueName+'">'+item.queueName+'</span><span style="display:inline-block;float:left;">(空闲座席数:<span style="color:#09c;">'+item.idleAgentCount+'</span>) </span><span style="cursor:pointer;float:right;margin-right:10px;" onclick="softphoneBar.m7exTransfer('+item.queueId+' ,\'skillgroup\')">转技能组</span>' +
              '</div>'
          str += '<ul style="margin:0;padding:0;list-style-type: none;display:none" class="m7-child-'+i+'">'
          for (var j = 0; j < item.children.length; j++) {
              var item2 = item.children[j]
              str += '<li class="clear10" style="height:20px;line-height:20px;"><span class="fl" style="cursor: pointer;display: inline-block;max-width: 14em;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-left:20px;">'+item2.DisplayName +'['+item2.exten+']</span><span class="fr" style="cursor:pointer;margin-right:10px" onclick="softphoneBar.m7exTransfer('+item2.exten+', \'skillgroup\')">转接</span></li>'
          }
          str += '</ul>'
          str += '</li>'
      }
    }
    str += '</ul>'
    return str
}
function getAgentBelong (agentArr) {
    var state = false
    var agentExten = m7CurrentAgentNumber ? m7CurrentAgentNumber.split('@')[0] : ''
    if (agentArr && agentArr.length > 0) {
      agentArr.forEach((item) => {
        if (item.exten === agentExten) {
          state = true
        }
      })
    }
    return state
}
function changePhoneBarStatus (busyType) {
    for (var i = 0; i < m7$('.userStatus').length; i ++) {
        m7$(m7$('.userStatus')[i]).css("color", "#8a8a8a")
        m7$(m7$('.userStatus')[i]).find("span").css("background-color", "#8a8a8a")
    }
    if (busyType == "0") {
        m7$("#IdleDisable").css("color", "#53d466")
        m7$("#IdleDisable").find("span").css("background-color", "#53d466")
        m7$('.peerTimeState').css("color", "#53d466")

    } else if (busyType == "2") {
        m7$("#RestDisable").css("color", "#e3a42c")
        m7$("#RestDisable").find("span").css("background-color", "#e3a42c")
        m7$('.peerTimeState').css("color", "#e3a42c")
    } else if (busyType == "1") {
        m7$("#BusyDisable").css("color", "#ff7a72")
        m7$("#BusyDisable").find("span").css("background-color", "#ff7a72")
        m7$('.peerTimeState').css("color", "#ff7a72")
    } else {
        m7$('#userStatus_'+ busyType).css("color", "#ff7a72")
        m7$('#userStatus_'+ busyType).find("span").css("background-color", "#ff7a72")
        m7$('.peerTimeState').css("color", "#ff7a72")
        m7$(m7$('.softphone_timer').find("span")[0]).css("color", "#ff7a72")
    }
}
function senvenProvide(resourceName) {
    resourceName = resourceName + "";
    return (_loadedModules[resourceName] = sevenGetObject(resourceName, true));
}
function senvenMPublish (topic, args) {
    var f = _topics[topic];
    if(f){
        f.apply(this, args||[]);
    }
}

function senvenMSubscribe(topic, context, method) {
    return [topic, _listener.add(_topics, topic, moor.hitch(context, method))];
}
function sevenMUsubscribe (handle) {
    if(handle){
        _listener.remove(_topics, handle[0], handle[1]);
    }
}
function senvenGetIndexof(array, value, fromIndex, findLast) {
        var step = 1, end = array.length || 0, i = 0;
        if(findLast){
            i = end - 1;
            step = end = -1;
        }
        if(fromIndex != undefined){ i = fromIndex; }
        if((findLast && i > end) || i < end){
            for(; i != end; i += step){
                if(array[i] == value){ return i; }
            }
        }
        return -1;
}
function sevenContent(obj, event, context, method, dontFix) {
    var a=arguments, args=[], i=0;
    args.push(isString(a[0]) ? null : a[i++], a[i++]);
    var a1 = a[i+1];
    args.push(isString(a1)||isFunction(a1) ? a[i++] : null, a[i++]);
    for(var l=a.length; i<l; i++){	args.push(a[i]); }
    return _connect.apply(this, args)
}
function isFunction (it) {
    return Object.prototype.toString.call(it) === "[object Function]";
}
function isString(it) {
    return (typeof it == "string" || it instanceof String)
}
function _connect(obj, event, context, method) {
    var l=_listener, h=l.add(obj, event, moor.hitch(context, method));
    return [obj, event, h, l];
}
function sevenGetObject(name, create, context) {
    return _getProp(name.split("."), create, context)
}
function _getProp(parts, create, context) {
    var obj=context || moor.global;
    for(var i=0, p; obj && (p=parts[i]); i++){
        if(i == 0 && moor._scopeMap[p]){
            p = moor._scopeMap[p];
        }
        obj = (p in obj ? obj[p] : (create ? obj[p]={} : undefined));
    }
    return obj;
}

function sevenDeclare(className, superclass, props) {
    if (typeof className != "string") {
        props = superclass;
        superclass = className;
        className = "";
    }
    props = props || {};

    var proto, i, t, ctor, name, bases, chains, mixins = 1, parents = superclass;
    if (opts.call(superclass) == "[object Array]") {
        bases = c3mro(superclass, className);
        t = bases[0];
        mixins = bases.length - t;
        superclass = bases[mixins];
    } else {
        bases = [0];
        if (superclass) {
            if (opts.call(superclass) == "[object Function]") {
                t = superclass._meta;
                bases = bases.concat(t ? t.bases : superclass);
            } else {
                err("base class is not a callable constructor.", className);
            }
        } else if (superclass !== null) {
            err("unknown base class. Did you use moor.require to pull it in?", className);
        }
    }
    if (superclass) {
        for (i = mixins - 1; ; --i) {
            proto = forceNew(superclass);
            if (!i) {
                break;
            }
            t = bases[i];
            (t._meta ? mixOwn : moor._mixin)(proto, t.prototype);
            ctor = new Function;
            ctor.superclass = superclass;
            ctor.prototype = proto;
            superclass = proto.constructor = ctor;
        }
    } else {
        proto = {};
    }
    safeMixin(proto, props);
    t = props.constructor;
    if (t !== Object.prototype.constructor) {
        t.nom = cname;
        proto.constructor = t;
    }

    for (i = mixins - 1; i; --i) {
        t = bases[i]._meta;
        if (t && t.chains) {
            chains = moor._mixin(chains || {}, t.chains);
        }
    }
    if (proto["-chains-"]) {
        chains = moor._mixin(chains || {}, proto["-chains-"]);
    }

    t = !chains || !chains.hasOwnProperty(cname);
    bases[0] = ctor = (chains && chains.constructor === "manual") ? simpleConstructor(bases) :
        (bases.length == 1 ? singleConstructor(props.constructor, t) : chainedConstructor(bases, t));

    ctor._meta = {
        bases: bases, hidden: props, chains: chains,
        parents: parents, ctor: props.constructor
    };
    ctor.superclass = superclass && superclass.prototype;
    ctor.extend = extend;
    ctor.prototype = proto;
    proto.constructor = ctor;

    proto.getInherited = getInherited;
    proto.inherited = inherited;
    proto.isInstanceOf = isInstanceOf;

    if (className) {
        proto.declaredClass = className;
        setObject(className, ctor);
    }
    if (chains) {
        for (name in chains) {
            if (proto[name] && typeof chains[name] == "string" && name != cname) {
                t = proto[name] = chain(name, bases, chains[name] === "after");
                t.nom = name;
            }
        }
    }
    return ctor;
}
function err(msg, cls){
    throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg);
}
function extend(source){
    safeMixin(this.prototype, source);
    return this;
}
function setObject(name, value, context) {
    var parts=name.split("."), p=parts.pop(), obj=_getProp(parts, true, context);
    return obj && p ? (obj[p]=value) : undefined;
}
function getInherited(name, args){
    if(typeof name == "string"){
        return this.inherited(name, args, true);
    }
    return this.inherited(name, true);
}

function chain(name, bases, reversed){
    return function(){
        var b, m, f, i = 0, step = 1;
        if(reversed){
            i = bases.length - 1;
            step = -1;
        }
        for(; b = bases[i]; i += step){
            m = b._meta;
            f = (m ? m.hidden : b.prototype)[name];
            if(f){
                f.apply(this, arguments);
            }
        }
    };
}
function isInstanceOf(cls){
    var bases = this.constructor._meta.bases;
    for(var i = 0, l = bases.length; i < l; ++i){
        if(bases[i] === cls){
            return true;
        }
    }
    return this instanceof cls;
}
function inherited(args, a, f){
    var name, chains, bases, caller, meta, base, proto, opf, pos,
        cache = this._inherited = this._inherited || {};

    if(typeof args == "string"){
        name = args;
        args = a;
        a = f;
    }
    f = 0;

    caller = args.callee;
    name = name || caller.nom;
    if(!name){
        err("can't deduce a name to call inherited()", this.declaredClass);
    }

    meta = this.constructor._meta;
    bases = meta.bases;

    pos = cache.p;
    if(name != cname){
        if(cache.c !== caller){
            pos = 0;
            base = bases[0];
            meta = base._meta;
            if(meta.hidden[name] !== caller){
                chains = meta.chains;
                if(chains && typeof chains[name] == "string"){
                    err("calling chained method with inherited: " + name, this.declaredClass);
                }
                do{
                    meta = base._meta;
                    proto = base.prototype;
                    if(meta && (proto[name] === caller && proto.hasOwnProperty(name) || meta.hidden[name] === caller)){
                        break;
                    }
                }while(base = bases[++pos]);
                pos = base ? pos : -1;
            }
        }
        base = bases[++pos];
        if(base){
            proto = base.prototype;
            if(base._meta && proto.hasOwnProperty(name)){
                f = proto[name];
            }else{
                opf = Object.prototype[name];
                do{
                    proto = base.prototype;
                    f = proto[name];
                    if(f && (base._meta ? proto.hasOwnProperty(name) : f !== opf)){
                        break;
                    }
                }while(base = bases[++pos]);
            }
        }
        f = base && f || Object.prototype[name];
    }else{
        if(cache.c !== caller){
            pos = 0;
            meta = bases[0]._meta;
            if(meta && meta.ctor !== caller){
                chains = meta.chains;
                if(!chains || chains.constructor !== "manual"){
                    err("calling chained constructor with inherited", this.declaredClass);
                }
                while(base = bases[++pos]){
                    meta = base._meta;
                    if(meta && meta.ctor === caller){
                        break;
                    }
                }
                pos = base ? pos : -1;
            }
        }
        while(base = bases[++pos]){
            meta = base._meta;
            f = meta ? meta.ctor : base;
            if(f){
                break;
            }
        }
        f = base && f;
    }

    cache.c = f;
    cache.p = pos;

    if(f){
        return a === true ? f : f.apply(this, a || args);
    }
}

function safeMixin(target, source){
    var name, t, i = 0, l = extraNames.length;
    for(name in source){
        t = source[name];
        if((t !== Object.prototype[name] || !(name in Object.prototype)) && name != cname){
            if(opts.call(t) == "[object Function]"){
                t.nom = name;
            }
            target[name] = t;
        }
    }
    for(; i < l; ++i){
        name = extraNames[i];
        t = source[name];
        if((t !== Object.prototype[name] || !(name in Object.prototype)) && name != cname){
            if(opts.call(t) == "[object Function]"){
                t.nom = name;
            }
            target[name] = t;
        }
    }
    return target;
}
function singleConstructor(ctor, ctorSpecial){
    return function(){
        var a = arguments, t = a, a0 = a[0], f;

        if(!(this instanceof a.callee)){
            return applyNew(a);
        }
        if(ctorSpecial){
            if(a0){
                f = a0.preamble;
                if(f){
                    t = f.apply(this, t) || t;
                }
            }
            f = this.preamble;
            if(f){
                f.apply(this, t);
            }
        }
        if(ctor){
            ctor.apply(this, a);
        }
        f = this.postscript;
        if(f){
            f.apply(this, a);
        }
    };
}
function chainedConstructor(bases, ctorSpecial){
    return function(){
        var a = arguments, args = a, a0 = a[0], f, i, m,
            l = bases.length, preArgs;

        if(!(this instanceof a.callee)){
            return applyNew(a);
        }
        if(ctorSpecial && (a0 && a0.preamble || this.preamble)){
            preArgs = new Array(bases.length);
            preArgs[0] = a;
            for(i = 0;;){
                a0 = a[0];
                if(a0){
                    f = a0.preamble;
                    if(f){
                        a = f.apply(this, a) || a;
                    }
                }
                f = bases[i].prototype;
                f = f.hasOwnProperty("preamble") && f.preamble;
                if(f){
                    a = f.apply(this, a) || a;
                }
                if(++i == l){
                    break;
                }
                preArgs[i] = a;
            }
        }
        for(i = l - 1; i >= 0; --i){
            f = bases[i];
            m = f._meta;
            f = m ? m.ctor : f;
            if(f){
                f.apply(this, preArgs ? preArgs[i] : a);
            }
        }
        f = this.postscript;
        if(f){
            f.apply(this, args);
        }
    };
}

function simpleConstructor(bases){
    return function(){
        var a = arguments, i = 0, f, m;

        if(!(this instanceof a.callee)){
            return applyNew(a);
        }
        for(; f = bases[i]; ++i){
            m = f._meta;
            f = m ? m.ctor : f;
            if(f){
                f.apply(this, a);
                break;
            }
        }
        f = this.postscript;
        if(f){
            f.apply(this, a);
        }
    };
}
function applyNew(args){
    var ctor = args.callee, t = forceNew(ctor);
    ctor.apply(t, args);
    return t;
}
function forceNew(ctor){
    xtor.prototype = ctor.prototype;
    var t = new new Function;
    xtor.prototype = null;
}
function extraNames() {
    var extraNames, extraLen, empty = {};
    for(var i in {toString: 1}){ extraNames = []; break; }
    return extraNames = extraNames || ["hasOwnProperty", "valueOf", "isPrototypeOf",
        "propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
    extraLen = extraNames.length;
}
function mixOwn(target, source){
    var name, i = 0, l = extraNames.length;
    for(name in source){
        if(name != cname && source.hasOwnProperty(name)){
            target[name] = source[name];
        }
    }
    for(; i < l; ++i){
        name = extraNames[i];
        if(name != cname && source.hasOwnProperty(name)){
            target[name] = source[name];
        }
    }
}
function c3mro(bases, className){
    var result = [], roots = [{cls: 0, refs: []}], nameMap = {}, clsCount = 1,
        l = bases.length, i = 0, j, lin, base, top, proto, rec, name, refs;

    for(; i < l; ++i){
        base = bases[i];
        if(!base){
            err("mixin #" + i + " is unknown. Did you use moor.require to pull it in?", className);
        }else if(opts.call(base) != "[object Function]"){
            err("mixin #" + i + " is not a callable constructor.", className);
        }
        lin = base._meta ? base._meta.bases : [base];
        top = 0;
        for(j = lin.length - 1; j >= 0; --j){
            proto = lin[j].prototype;
            if(!proto.hasOwnProperty("declaredClass")){
                proto.declaredClass = "uniqName_" + (counter++);
            }
            name = proto.declaredClass;
            if(!nameMap.hasOwnProperty(name)){
                nameMap[name] = {count: 0, refs: [], cls: lin[j]};
                ++clsCount;
            }
            rec = nameMap[name];
            if(top && top !== rec){
                rec.refs.push(top);
                ++top.count;
            }
            top = rec;
        }
        ++top.count;
        roots[0].refs.push(top);
    }

    while(roots.length){
        top = roots.pop();
        result.push(top.cls);
        --clsCount;
        while(refs = top.refs, refs.length == 1){
            top = refs[0];
            if(!top || --top.count){
                top = 0;
                break;
            }
            result.push(top.cls);
            --clsCount;
        }
        if(top){
            for(i = 0, l = refs.length; i < l; ++i){
                top = refs[i];
                if(!--top.count){
                    roots.push(top);
                }
            }
        }
    }
    if(clsCount){
        err("can't build consistent linearization", className);
    }

    base = bases[0];
    result[0] = base ?
        base._meta && base === result[result.length - base._meta.bases.length] ?
            base._meta.bases.length : 1 : 0;

    return result;
}

var _listener = {
        getDispatcher: function(){
            return function(){
                var ap = Array.prototype, c = arguments.callee, ls = c._listeners, t = c.target,
                    r = t && t.apply(this, arguments),
                    i, lls = [].concat(ls);

                for(i in lls){
                    if(!(i in ap)){
                        lls[i].apply(this, arguments);
                    }
                }
                return r;
            };
        },
        add: function(source, method, listener){
            source = source || moor.global;
            var f = source[method];
            if(!f || !f._listeners){
                var d = _listener.getDispatcher();
                d.target = f;
                d._listeners = [];
                f = source[method] = d;
            }
            return f._listeners.push(listener);
        },
        remove: function(source,  method, handle){
            var f = (source || moor.global)[method];
            if(f && f._listeners && handle--){
                delete f._listeners[handle];
            }
        }
}