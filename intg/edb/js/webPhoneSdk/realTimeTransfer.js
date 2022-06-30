function RealTimeTransfer (config) {
  this.config = config
  this.init()
}

RealTimeTransfer.prototype.init = function() {
  let that = this
  try {
    const password = this.config.password
    const exten = this.config.exten
    const account = this.config.account
    const segment = this.config.segment ? '1' : '0'
    const server = this.config.server || 'test.7moor.com:5003'
    const options = {
      query: {
        account: account,
        exten: exten,
        password: password,
        segment: segment
      }
    };
    const socket = io('wss://'+ server +'/cdr-translation', options)
    
    socket.on('error', (err) => {
      that._error(err)
    });
    
    socket.on('message', (msg) => {
      that._message(msg)
    });
    
    socket.on('data', (msg) => {
      that._message(msg)
    });
    socket.on('connection', (msg) => {
      if(that.config.success && typeof that.config.success === "function") {
        if (!msg.success) {
          that._error(msg) 
        } else {
          that.config.success()
        }
      }
    });
  } catch (err) {
    that._error(err)
  }
}

RealTimeTransfer.prototype._error = function(errorObj) {
  console.log(errorObj)
  if(this.config.error && typeof this.config.error === "function") {
    this.config.error(errorObj)
  }
}

RealTimeTransfer.prototype._message = function(data) {
  if(this.config.message && typeof this.config.message === "function") {
    this.config.message(data)
  }
}
