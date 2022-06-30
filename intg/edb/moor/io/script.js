moor.provide("moor.io.script");

/*=====
moor.declare("moor.io.script.__ioArgs", moor.__IoArgs, {
	constructor: function(){
		//	summary:
		//		All the properties described in the moor.__ioArgs type, apply to this
		//		type as well, EXCEPT "handleAs". It is not applicable to
		//		moor.io.script.get() calls, since it is implied by the usage of
		//		"jsonp" (response will be a JSONP call returning JSON)
		//		or the response is pure JavaScript defined in
		//		the body of the script that was attached.
		//	callbackParamName: String
		//		Deprecated as of Dojo 1.4 in favor of "jsonp", but still supported for
		// 		legacy code. See notes for jsonp property.
		//	jsonp: String
		//		The URL parameter name that indicates the JSONP callback string.
		//		For instance, when using Yahoo JSONP calls it is normally, 
		//		jsonp: "callback". For AOL JSONP calls it is normally 
		//		jsonp: "c".
		//	checkString: String
		//		A string of JavaScript that when evaluated like so: 
		//		"typeof(" + checkString + ") != 'undefined'"
		//		being true means that the script fetched has been loaded. 
		//		Do not use this if doing a JSONP type of call (use callbackParamName instead).
		//	frameDoc: Document
		//		The Document object for a child iframe. If this is passed in, the script
		//		will be attached to that document. This can be helpful in some comet long-polling
		//		scenarios with Firefox and Opera.
		this.callbackParamName = callbackParamName;
		this.jsonp = jsonp;
		this.checkString = checkString;
		this.frameDoc = frameDoc;
	}
});
=====*/
;(function(){
	var loadEvent = moor.isIE ? "onreadystatechange" : "load",
		readyRegExp = /complete|loaded/;

	moor.io.script = {
		get: function(/*moor.io.script.__ioArgs*/args){
			//	summary:
			//		sends a get request using a dynamically created script tag.
			var dfd = this._makeScriptDeferred(args);
			var ioArgs = dfd.ioArgs;
			moor._ioAddQueryToUrl(ioArgs);
	
			moor._ioNotifyStart(dfd);

			if(this._canAttach(ioArgs)){
				var node = this.attach(ioArgs.id, ioArgs.url, args.frameDoc);

				//If not a jsonp callback or a polling checkString case, bind
				//to load event on the script tag.
				if(!ioArgs.jsonp && !ioArgs.args.checkString){
					var handle = moor.connect(node, loadEvent, function(evt){
						if(evt.type == "load" || readyRegExp.test(node.readyState)){
							moor.disconnect(handle);
							ioArgs.scriptLoaded = evt;
						}
					});
				}
			}

			moor._ioWatch(dfd, this._validCheck, this._ioCheck, this._resHandle);
			return dfd;
		},
	
		attach: function(/*String*/id, /*String*/url, /*Document?*/frameDocument){
			//	summary:
			//		creates a new <script> tag pointing to the specified URL and
			//		adds it to the document.
			//	description:
			//		Attaches the script element to the DOM.  Use this method if you
			//		just want to attach a script to the DOM and do not care when or
			//		if it loads.
			var doc = (frameDocument || moor.doc);
			var element = doc.createElement("script");
			element.type = "text/javascript";
			element.src = url;
			element.id = id;
			element.charset = "utf-8";
			return doc.getElementsByTagName("head")[0].appendChild(element);
		},
	
		remove: function(/*String*/id, /*Document?*/frameDocument){
			//summary: removes the script element with the given id, from the given frameDocument.
			//If no frameDocument is passed, the current document is used.
			moor.destroy(moor.byId(id, frameDocument));
			
			//Remove the jsonp callback on moor.io.script, if it exists.
			if(this["jsonp_" + id]){
				delete this["jsonp_" + id];
			}
		},
	
		_makeScriptDeferred: function(/*Object*/args){
			//summary: 
			//		sets up a Deferred object for an IO request.
			var dfd = moor._ioSetArgs(args, this._deferredCancel, this._deferredOk, this._deferredError);
	
			var ioArgs = dfd.ioArgs;
			ioArgs.id = moor._scopeName + "IoScript" + (this._counter++);
			ioArgs.canDelete = false;
	
			//Special setup for jsonp case
			ioArgs.jsonp = args.callbackParamName || args.jsonp;
			if(ioArgs.jsonp){
				//Add the jsonp parameter.
				ioArgs.query = ioArgs.query || "";
				if(ioArgs.query.length > 0){
					ioArgs.query += "&";
				}
				ioArgs.query += ioArgs.jsonp
					+ "="
					+ (args.frameDoc ? "parent." : "")
					+ moor._scopeName + ".io.script.jsonp_" + ioArgs.id + "._jsonpCallback";
	
				ioArgs.frameDoc = args.frameDoc;
	
				//Setup the Deferred to have the jsonp callback.
				ioArgs.canDelete = true;
				dfd._jsonpCallback = this._jsonpCallback;
				this["jsonp_" + ioArgs.id] = dfd;
			}
			return dfd; // moor.Deferred
		},
		
		_deferredCancel: function(/*Deferred*/dfd){
			//summary: canceller function for moor._ioSetArgs call.
	
			//DO NOT use "this" and expect it to be moor.io.script.
			dfd.canceled = true;
			if(dfd.ioArgs.canDelete){
				moor.io.script._addDeadScript(dfd.ioArgs);
			}
		},
	
		_deferredOk: function(/*Deferred*/dfd){
			//summary: okHandler function for moor._ioSetArgs call.
	
			//DO NOT use "this" and expect it to be moor.io.script.
			var ioArgs = dfd.ioArgs;
	
			//Add script to list of things that can be removed.		
			if(ioArgs.canDelete){
				moor.io.script._addDeadScript(ioArgs);
			}
	
			//Favor JSONP responses, script load events then lastly ioArgs.
			//The ioArgs are goofy, but cannot return the dfd since that stops
			//the callback chain in Deferred. The return value is not that important
			//in that case, probably a checkString case.
			return ioArgs.json || ioArgs.scriptLoaded || ioArgs;
		},
	
		_deferredError: function(/*Error*/error, /*Deferred*/dfd){
			//summary: errHandler function for moor._ioSetArgs call.
	
			if(dfd.ioArgs.canDelete){
				//DO NOT use "this" and expect it to be moor.io.script.
				if(error.dojoType == "timeout"){
					//For timeouts, remove the script element immediately to
					//avoid a response from it coming back later and causing trouble.
					moor.io.script.remove(dfd.ioArgs.id, dfd.ioArgs.frameDoc);
				}else{
					moor.io.script._addDeadScript(dfd.ioArgs);
				}
			}
			console.log("moor.io.script error", error);
			return error;
		},
	
		_deadScripts: [],
		_counter: 1,
	
		_addDeadScript: function(/*Object*/ioArgs){
			//summary: sets up an entry in the deadScripts array.
			moor.io.script._deadScripts.push({id: ioArgs.id, frameDoc: ioArgs.frameDoc});
			//Being extra paranoid about leaks:
			ioArgs.frameDoc = null;
		},
	
		_validCheck: function(/*Deferred*/dfd){
			//summary: inflight check function to see if dfd is still valid.
	
			//Do script cleanup here. We wait for one inflight pass
			//to make sure we don't get any weird things by trying to remove a script
			//tag that is part of the call chain (IE 6 has been known to
			//crash in that case).
			var _self = moor.io.script;
			var deadScripts = _self._deadScripts;
			if(deadScripts && deadScripts.length > 0){
				for(var i = 0; i < deadScripts.length; i++){
					//Remove the script tag
					_self.remove(deadScripts[i].id, deadScripts[i].frameDoc);
					deadScripts[i].frameDoc = null;
				}
				moor.io.script._deadScripts = [];
			}
	
			return true;
		},
	
		_ioCheck: function(/*Deferred*/dfd){
			//summary: inflight check function to see if IO finished.
			var ioArgs = dfd.ioArgs;
			//Check for finished jsonp
			if(ioArgs.json || (ioArgs.scriptLoaded && !ioArgs.args.checkString)){
				return true;
			}
	
			//Check for finished "checkString" case.
			var checkString = ioArgs.args.checkString;
			if(checkString && eval("typeof(" + checkString + ") != 'undefined'")){
				return true;
			}
	
			return false;
		},
	
		_resHandle: function(/*Deferred*/dfd){
			//summary: inflight function to handle a completed response.
			if(moor.io.script._ioCheck(dfd)){
				dfd.callback(dfd);
			}else{
				//This path should never happen since the only way we can get
				//to _resHandle is if _ioCheck is true.
				dfd.errback(new Error("inconceivable moor.io.script._resHandle error"));
			}
		},
	
		_canAttach: function(/*Object*/ioArgs){
			//summary: A method that can be overridden by other modules
			//to control when the script attachment occurs.
			return true;
		},
		
		_jsonpCallback: function(/*JSON Object*/json){
			//summary: 
			//		generic handler for jsonp callback. A pointer to this function
			//		is used for all jsonp callbacks.  NOTE: the "this" in this
			//		function will be the Deferred object that represents the script
			//		request.
			this.ioArgs.json = json;
		}
	}
})();