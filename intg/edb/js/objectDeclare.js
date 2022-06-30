/**
 * Created by yangjiao on 2018/10/23.
 */
senvenProvide("moorCall.stateElement.ring.innerRing");
senvenProvide("moorCall.stateElement.ring.normalRing");
senvenProvide("moorCall.stateElement.ring.listenRing");
senvenProvide("moorCall.stateElement.link.consultationLink");
senvenProvide("moorCall.stateElement.link.dialoutLink");
senvenProvide("moorCall.stateElement.link.innerLink");
senvenProvide("moorCall.stateElement.link.listenLink");
senvenProvide("moorCall.stateElement.link.normalLink");
senvenProvide("moorCall.stateElement.link.threeWayCallLink");
senvenProvide("moorCall.stateElement.ringring.normalRinging");
senvenProvide("moorCall.stateElement.ringring.innerRinging");
senvenProvide("moorCall.stateElement.ringring.consultationRinging");
senvenProvide("moorCall.stateElement.abate");
senvenProvide("moorCall.stateElement.hold");
senvenProvide("moorCall.stateElement.invalid");
senvenProvide("moorCall.stateElement.peerState");
senvenProvide("moorCall.stateElement.base");
senvenProvide("moorCall.SoftphoneBar");
senvenProvide("moorCall.callProcessor");
sevenDeclare("moorCall.stateElement.link.consultationLink", null, {
  constructor: function(base) {
    this.m7Base = base;
  },

  m7Base: null,

  m7ChooiceState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus") {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
      } else if(evtJson.ChannelStatus == "hold") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneHold();
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "threeWayCall") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
        } else if(evtJson.LinkedChannel.ChannelType == "transfer") {
          this.m7Base.m7bus();
        } else if(evtJson.LinkedChannel.ChannelType == "inner") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerLink();
        } else if(evtJson.LinkedChannel.ChannelType == "normal") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
        } else if(evtJson.LinkedChannel.ChannelType == "dialout") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
        }
      }
    }
  },
  m7changeState:function() {
  }

});
sevenDeclare("moorCall.stateElement.link.dialoutLink", null, {
  constructor: function(base) {
    this.m7Base = base;
  },

  m7Base: null,

  m7CallState: "stDialTalking",

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "hold") {
        this.m7Base.m7CurrentCallState = new moorCall.stateElement.hold();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "consultation") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        } else if(evtJson.LinkedChannel.ChannelType == "ThreeWayCall") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      }
    }
  },
  m7changeToolBarState:function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.link.innerLink", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stInnerTalking",
  m7Base: null,
  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "hold") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneHold();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "consultation") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      }
    }
  },
  m7changeToolBarState:function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.link.listenLink", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stListened",
  m7Base: null,

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        senvenMPublish("EvtEndListen", []);
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.link.normalLink", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stTalking",
  m7Base: null,

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "hold") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneHold();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "consultation") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        } else if(evtJson.LinkedChannel.ChannelType == "ThreeWayCall") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      }
    }
  },
  m7changeToolBarState:function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.link.threeWayCallLink", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stThreeWayTalking",
  m7Base: null,

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      }
    }
  },
  m7changeToolBarState:function(obj) {
    senvenMPublish("m7Base",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.ring.innerRing", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stInnerDialing",
  m7Base: null,

  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "inner") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      }
    }
  },

  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.ring.listenRing", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stListening",
  m7Base: null,
  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Up") {
        if(evtJson.ChannelType == "listen") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneListenLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        senvenMPublish("EvtEndListen", []);
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.ring.normalRing", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stDialing",
  m7Base: null,
  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "dialout") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        } else if(evtJson.LinkedChannel.ChannelType == "dialTransfer") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }

      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.ringring.consultationRinging", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7Base: null,
  m7ChooiceState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus") {
      if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "consultation") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
        }
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
      }
    }
  },

  m7changeState: function() {
  }
});
sevenDeclare("moorCall.stateElement.ringring.innerRinging", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stInnerBelling",
  m7Base: null,

  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "threeWayCall") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          if(this.m7Base.m7Phone.m7IsRing) {
            this.m7Base.m7Phone.m7StopSound();
            this.m7Base.m7Phone.m7IsRing = false;
          }
        } else if(evtJson.LinkedChannel.ChannelType == "inner") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          if(this.m7Base.m7Phone.m7IsRing) {
            this.m7Base.m7Phone.m7StopSound();
            this.m7Base.m7Phone.m7IsRing = false;
          }
        }
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        if(this.m7Base.m7Phone.m7IsRing) {
          this.m7Base.m7Phone.m7StopSound();
          this.m7Base.m7Phone.m7IsRing = false;
        }
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.ringring.normalRinging", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stBelling",
  m7Base: null,

  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if (evtJson.ChannelStatus == "Hangup") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          if(this.m7Base.m7Phone.m7IsRing) {
              this.m7Base.m7Phone.m7StopSound();
              this.m7Base.m7Phone.m7IsRing = false;
          }
      } else if(evtJson.LinkedChannel.ChannelType == "threeWayCall") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        if(this.m7Base.m7Phone.m7IsRing) {
          this.m7Base.m7Phone.m7StopSound();
          this.m7Base.m7Phone.m7IsRing = false;
        }
      } else if(evtJson.LinkedChannel.ChannelType == "transfer") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        if(this.m7Base.m7Phone.m7IsRing) {
          this.m7Base.m7Phone.m7StopSound();
          this.m7Base.m7Phone.m7IsRing = false;
        }
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "normal") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          if(this.m7Base.m7Phone.m7IsRing) {
            this.m7Base.m7Phone.m7StopSound();
            this.m7Base.m7Phone.m7IsRing = false;
          }
        }

      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.abate", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stAbate",
  m7Base: null,

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "PeerStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      var isRegistered = false;
      if(evtJson.PeerStatus == "Registered") {
        isRegistered = true;
      }
      if (isRegistered && this.m7Base.m7CurrentCallState.m7CallState == "stAbate"){
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

});
sevenDeclare("moorCall.stateElement.hold", null, {
  constructor: function(base) {
    this.m7Base = base;
  },
  m7Base: null,
  m7ChooiceState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus") {
      switch(evtJson.ChannelStatus) {
        case 'Hangup':
          this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
          break;
        case 'Link':
          if(evtJson.LinkedChannel.ChannelType == "normalInner") {
            this.m7Base.m7CurrentCallState = this.m7Base._getNormalInnerLink();
          } else if(evtJson.LinkedChannel.ChannelType == "normal") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
          } else if(evtJson.LinkedChannel.ChannelType == "consultation") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
          } else if(evtJson.LinkedChannel.ChannelType == "dialoutInner") {
            this.m7Base.m7CurrentCallState = this.m7Base._getDialoutInnerLink();
          } else if(evtJson.LinkedChannel.ChannelType == "dialout") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
          }
          break;
      }
    }
  },
  m7changeState:function() {
  }

});
sevenDeclare("moorCall.stateElement.invalid", null, {

  constructor: function(base) {
    this.m7Base = base;
  },
  m7CallState: "stInvalid",
  m7Base: null,

  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      switch(evtJson.ChannelStatus)
      {
        case 'Ringing':
          if(evtJson.LinkedChannel.ChannelType == "normal") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalRinging();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
            if(!this.m7Base.m7Phone.m7IsRing) {
              this.m7Base.m7Phone.m7PlaySound();
              this.m7Base.m7Phone.m7IsRing = true;
            }
          } else if(evtJson.LinkedChannel.ChannelType == "consultation") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationRinging();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "inner") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerRinging();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
            if(!this.m7Base.m7Phone.m7IsRing) {
              this.m7Base.m7Phone.m7PlaySound();
              this.m7Base.m7Phone.m7IsRing = true;
            }
          } else if(evtJson.LinkedChannel.ChannelType == "dialTransfer") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalRing();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "transfer"){
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalRinging();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
            if(!this.m7Base.m7Phone.m7IsRing) {
              this.m7Base.m7Phone.m7PlaySound();
              this.m7Base.m7Phone.m7IsRing = true;
            }
          }
          break;
        case 'Hangup':
          this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          break;
        case 'hold':
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneHold();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          break;
        case 'Ring':
          if(evtJson.ChannelType == "dialout") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalRing();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.ChannelType == "inner") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerRing();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.ChannelType == "listen") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneListenRing();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          }
          break;
        case 'Up':
          if(evtJson.ChannelType == "listen") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneListenLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          }
          break;
        case 'Link':
          if(evtJson.LinkedChannel.ChannelType == "normal") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "consultation") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "threeWayCall") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "inner") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "dialout") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "transfer") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          }
          break;
      }
    }

  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }
});
sevenDeclare("moorCall.stateElement.peerState", null, {
  m7CallStateValue: [],
  constructor: function(base) {
    this.m7Base = base;
    if(this.m7States == '') {
      var self = this;
      self.m7Base.m7Phone.PhonebarConfig.split(",").forEach(function(items) {
        self.m7put(items.split(":")[0],items.split(":")[1]);
        self.m7CallStateValue.push(items.split(":")[1]);
      });
    }
    this.m7CallStateValue["0"] = "stInvalid";
    this.m7CallStateValue["1"] = "stBusy";
    this.m7CallStateValue["2"] = "stRest";
    this.m7CallStateValue["99"] = "stSystemBusy";

  },
  m7CurPeerStateKey: "0",
  m7States: new Array(),
  m7Base: null,
  m7CurPeerAutoTimeStateKey: "",

  _get: function(_key) {
    try{
      for (var i = 0; i< this.m7States.length; i++) {
        if (this.m7States[i].key == _key) {
          return this.m7States[i];
        }
      }
    }catch(e) {
      return null;
    }
  },
  m7ChooicePeerState: function (evtJson) {
    if(evtJson.Event == 'UserStatus' || evtJson.Event == 'UserBusy') {
      if(this.m7Base.m7Phone.userId == evtJson.UserID) {
        this.m7Base.m7CurrentPeerState = this.m7Base.m7getPhonePeerState();
        this.m7Base.m7CurrentPeerState.m7setPeerState(evtJson.BusyType)
          if(this.m7Base.m7CurrentCallState != null) {
          if(this.m7Base.m7CurrentCallState.m7CallState == 'stInvalid') {
              this.m7changeToolBarState(this.m7Base.m7CurrentPeerState);
          }
        }
      }
    }
  },
  m7setPeerState: function(curPeerStateKey) {
    this.m7CurPeerStateKey = curPeerStateKey;
    this.m7CurPeerAutoTimeStateKey = curPeerStateKey;

  },
  m7put: function(_key,_value) {
    this.m7States.push({key:_key,value:_value});
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtPeerToolBarChange",[obj.m7CurPeerStateKey]);
  }

});
sevenDeclare("moorCall.stateElement.base", null , {
  constructor: function(phone) {
    this.m7Phone = phone;
  },
  m7CurrentCallState: null,
  m7OldCurrentCallState: null,

  m7CurrentPeerState: null,

  m7Phone: null,

  m7getInvalid: function() {
    if(this.m7Phone.m7Invalid == null) {
      this.m7Phone.m7Invalid = new moorCall.stateElement.invalid(this);
    }
    return this.m7Phone.m7Invalid;
  },
  m7getPhonePeerState: function() {
    if(this.m7Phone.m7PeerState == null) {
      this.m7Phone.m7PeerState = new moorCall.stateElement.peerState(this);
    }
    return this.m7Phone.m7PeerState;
  },
  m7getPhoneHold: function() {
    if(this.m7Phone.m7Hold == null) {
      this.m7Phone.m7Hold = new moorCall.stateElement.hold(this);
    }
    return this.m7Phone.m7Hold;
  },
  m7getPhoneAbate: function() {
    if(this.m7Phone.m7Abate == null) {
      this.m7Phone.m7Abate = new moorCall.stateElement.abate(this);
    }
    return this.m7Phone.m7Abate;
  },
  m7getPhoneNormalLink: function() {
    if(this.m7Phone.m7NormalLink == null) {
      this.m7Phone.m7NormalLink = new moorCall.stateElement.link.normalLink(this);
    }
    return this.m7Phone.m7NormalLink;
  },
  m7getPhoneInnerLink: function() {
    if(this.m7Phone.m7InnerLink == null) {
      this.m7Phone.m7InnerLink = new moorCall.stateElement.link.innerLink(this);
    }
    return this.m7Phone.m7InnerLink;
  },
  m7getPhoneConsultationLink: function() {
    if(this.m7Phone.m7ConsultationLink == null) {
      this.m7Phone.m7ConsultationLink = new moorCall.stateElement.link.consultationLink(this);
    }
    return this.m7Phone.m7ConsultationLink;
  },
  m7getPhoneThreeWayCallLink: function() {
    if(this.m7Phone.m7ThreeWayCallLink == null) {
      this.m7Phone.m7ThreeWayCallLink = new moorCall.stateElement.link.threeWayCallLink(this);
    }
    return this.m7Phone.m7ThreeWayCallLink;
  },
  m7getPhoneConsultationRinging: function() {
    if(this.m7Phone.m7ConsultationRinging == null) {
      this.m7Phone.m7ConsultationRinging = new moorCall.stateElement.ringring.consultationRinging(this);
    }
    return this.m7Phone.m7ConsultationRinging;
  },
  m7getPhoneListenLink: function() {
    if(this.m7Phone.m7ListenLink == null) {
      this.m7Phone.m7ListenLink = new moorCall.stateElement.link.listenLink(this);
    }
    return this.m7Phone.m7ListenLink;
  },
  m7getPhoneDialoutLink: function() {
    if(this.m7Phone.m7DialoutLink == null) {
      this.m7Phone.m7DialoutLink = new moorCall.stateElement.link.dialoutLink(this);
    }
    return this.m7Phone.m7DialoutLink;
  },
  m7getPhoneNormalRinging: function() {
    if(this.m7Phone.m7NormalRinging == null) {
      this.m7Phone.m7NormalRinging = new moorCall.stateElement.ringring.normalRinging(this);
    }
    return this.m7Phone.m7NormalRinging;
  },
  m7getPhoneInnerRing: function() {
    if(this.m7Phone.m7InnerRing == null) {
      this.m7Phone.m7InnerRing = new moorCall.stateElement.ring.innerRing(this);
    }
    return this.m7Phone.m7InnerRing;
  },
  m7getPhoneNormalRing: function() {
    if(this.m7Phone.m7NormalRing == null) {
      this.m7Phone.m7NormalRing = new moorCall.stateElement.ring.normalRing(this);
    }
    return this.m7Phone.m7NormalRing;
  },
  m7getPhoneInnerRinging: function() {
    if(this.m7Phone.m7InnerRinging == null) {
      this.m7Phone.m7InnerRinging = new moorCall.stateElement.ringring.innerRinging(this);
    }
    return this.m7Phone.m7InnerRinging;
  },
  m7getPhoneListenRing: function() {
    if(this.m7Phone.m7ListenRing == null) {
      this.m7Phone.m7ListenRing = new moorCall.stateElement.ring.listenRing(this);
    }
    return this.m7Phone.m7ListenRing;
  },
  m7getPhoneUserViaExten:function(exten) {
    if(!this.m7Phone.m7MonitorPeers) return null;
    for(var i in this.m7Phone.m7MonitorPeers) {
      if(this.m7Phone.m7MonitorPeers[i].exten == exten){
        return this.m7Phone.m7MonitorPeers[i];
      }
    }
    return null;
  },
  m7bus:function() {
  },
  m7ChooiceState:function(evtJson) {
    currentEventObj = evtJson
    this.m7setCallObj(evtJson);
    this.m7setMonitorObjs(evtJson);
    if(evtJson.Event == "PeerStatus") {
      if(evtJson.Exten == this.m7Phone.sipNo) {
        if(evtJson.PeerStatus == "Registered" && (this.m7Phone.extenType == "gateway" || this.m7Phone.extenType == "sip" || this.m7Phone.extenType == 'Local')) {
            this.m7CurrentCallState = this.m7getInvalid();
            this.m7CurrentCallState.m7changeToolBarState(this.m7CurrentCallState);
        } else if(evtJson.PeerStatus != "Registered" && (this.m7Phone.extenType == "gateway" || this.m7Phone.extenType == "sip" || this.m7Phone.extenType == 'Local')) {
          this.m7CurrentCallState = this.m7getPhoneAbate();
          this.m7CurrentCallState.m7changeToolBarState(this.m7CurrentCallState);
        }
      }
    } else {
      if(this.m7CurrentPeerState == null) {
        this.m7CurrentPeerState = this.m7getPhonePeerState();
      }
      this.m7CurrentPeerState.m7ChooicePeerState(evtJson);

      if(this.m7CurrentCallState == null) {
        this.m7CurrentCallState = this.m7getInvalid();
        if(this.m7Phone.extenType == "Local") {
          this.m7CurrentCallState.m7changeToolBarState(this.m7CurrentCallState);
        }
      }
      this.m7CurrentCallState.m7ChooiceCallState(evtJson);

    }

  },
  m7setCallObj: function(evtJson) {
    if(evtJson.ChannelStatus == "Hangup" || evtJson.PeerStatus == "Registered" || evtJson.PeerStatus == "Unregistered") {
        _cti_peerstate = 1
    } else {
        _cti_peerstate = null
    }
    if (evtJson.Event == 'UserBusy' && evtJson.UserID == this.m7Phone.userId && evtJson.BusyType && evtJson.BusyType != '99') {
        m7IsCalling = false
        changePhoneBarStatus(evtJson.BusyType)
    }
    if (evtJson.Event == "ChannelStatus") {
      if(evtJson.Exten == this.m7Phone.sipNo) {
        if(evtJson.ChannelStatus == "Ring"){
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          m7IsCalling = true
          if(evtJson.ChannelType == "listen"){

          } else if(evtJson.ChannelType == "dialout") {
            var callsheetid = "";
            if(evtJson.Data.CallSheetID) {
              callsheetid = evtJson.Data.CallSheetID;
            }
            this.m7Phone.callObject = {
              callSheetId: callsheetid,
              originCallNo: evtJson.FromCid,
              originCalledNo: evtJson.FromDid,
              callType: "dialout",
              offeringTime: moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000)),
              data: evtJson.Data,
              status: "notDeal",
              monitorFilename: ""
            };

            if(this.m7Phone.dialoutData){
              this.m7Phone.callObject.data = this.m7Phone.dialoutData;
              this.m7Phone.dialoutData = null;
            }
            senvenMPublish("EvtDialing", [this.m7Phone.callObject]);
          }



        } else if(evtJson.ChannelStatus == "Ringing"){
          m7IsCalling = true
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          this.m7Phone.m7OtherChannel = evtJson.LinkedChannel.Channel;
          if(evtJson.LinkedChannel.ChannelType == "dialTransfer"
            ||evtJson.LinkedChannel.ChannelType == "transfer"){
            if(evtJson.Link){
              var linkedChannel = evtJson.LinkedChannel;
              var callsheetid = "";
              if(linkedChannel.Data && linkedChannel.Data.CallSheetID)
                callsheetid = linkedChannel.Data.CallSheetID;
              this.m7Phone.m7CallId = linkedChannel.Uniqueid;
              this.m7Phone.callObject = {
                callSheetId: callsheetid,
                originId: linkedChannel.Uniqueid,
                originCallNo: linkedChannel.FromCid,
                originCalledNo: linkedChannel.FromDid,
                callType: linkedChannel.ChannelType,
                queue: linkedChannel.Queue,
                location: linkedChannel.Location,
                callId: linkedChannel.Uniqueid,
                skillgroupNo: linkedChannel.Queue,
                monitorFilename: "",
                offeringTime: moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000)),
                data: {},

                agent: evtJson.Data.Agent,
                status: "notDeal",
                beginTime: "",
                endTime: ""
              };
              if (linkedChannel.Data) {
                this.m7Phone.callObject.data = linkedChannel.Data;
                this.m7Phone.callObject.data.callSheetId = callsheetid;
              }
              senvenMPublish("EvtRing", [this.m7Phone.callObject]);
            }
          }
          if(evtJson.LinkedChannel.ChannelType == "normal") {
            if (evtJson.Link) {
              var linkedChannel = evtJson.LinkedChannel;
              if(this.m7Phone.m7CallId != linkedChannel.Uniqueid) {
                this.m7Phone.m7CallId = linkedChannel.Uniqueid;
                var callsheetid = "";
                if(linkedChannel.Data && linkedChannel.Data.CallSheetID) {
                  callsheetid = linkedChannel.Data.CallSheetID;
                }
                this.m7Phone.callObject = {
                  callSheetId: callsheetid,
                  originId: linkedChannel.Uniqueid,
                  originCallNo: linkedChannel.FromCid,
                  originCalledNo: linkedChannel.FromDid,
                  callType: linkedChannel.ChannelType,
                  callId: linkedChannel.Uniqueid,
                  queue: linkedChannel.Queue,
                  location: linkedChannel.Location,
                  skillgroupNo: linkedChannel.Queue,
                  monitorFilename: "",
                  offeringTime: moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000)),
                  data: {},
                  beginTime: "",
                  endTime: "",
                  agent: evtJson.Data.Agent,
                  status: "notDeal",
                  ivrkey: linkedChannel.Data.IVRKEY,
                  callerCity: linkedChannel.CallerCity,
                  callerProvince: linkedChannel.CallerProvince,
                  queueName: linkedChannel.QueueName,
                };
                if (linkedChannel.Data) {
                  this.m7Phone.callObject.data = linkedChannel.Data;
                  this.m7Phone.callObject.data.callSheetId = callsheetid;
                }
                senvenMPublish("EvtRing", [this.m7Phone.callObject]);
              }
            }
          }

          if(this.m7Phone.m7IsLooter){
            this.m7Phone.m7IsLooter = false;

          }

          this.m7Phone.m7CurentChannel = evtJson.Channel;

        } else if(evtJson.ChannelStatus == "Link") {
          m7IsCalling = true
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          var linkedChannel = evtJson.LinkedChannel;
          this.m7Phone.m7OtherChannel = linkedChannel.Channel;
          this.m7Phone.callObject.callType = evtJson.ChannelType;
          if (!this.m7Phone.callObject.beginTime) {
            this.m7Phone.callObject.beginTime = moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000));
          }
          var callsheetid = "";
          if(linkedChannel.Data && linkedChannel.Data.CallSheetID) {
            callsheetid = linkedChannel.Data.CallSheetID;
          }
          this.m7Phone.callObject.originCallNo = linkedChannel.FromCid;
          this.m7Phone.callObject.originCalledNo = linkedChannel.FromDid;
          this.m7Phone.callObject.callSheetId = callsheetid;
          this.m7Phone.callObject.originId = linkedChannel.Uniqueid;
          this.m7Phone.callObject.queue = linkedChannel.Queue;
          this.m7Phone.callObject.location = linkedChannel.Location;
          this.m7Phone.callObject.callId = linkedChannel.Uniqueid;
          this.m7Phone.callObject.skillgroupNo = linkedChannel.Queue;

          this.m7Phone.callObject.status = "dealing";
          if(evtJson.RingTime) {
            this.m7Phone.callObject.offeringTime = moorCall.moortools.getDate(new Date(evtJson.RingTime * 1000));
          }

          if (linkedChannel.Data) {
            this.m7Phone.callObject.data = linkedChannel.Data;
            this.m7Phone.callObject.data.callSheetId = callsheetid;
          }
          senvenMPublish("EvtConnected", [this.m7Phone.callObject]);
        } else if(evtJson.ChannelStatus == "Unlink") {
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          this.m7Phone.m7CallId = "";
        } else if(evtJson.ChannelStatus == "Hangup") {
          m7IsCalling = false
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          this.m7Phone.m7CallId = "";
          if(this.m7Phone.m7CurentChannel == evtJson.Channel) {
            if (evtJson.ChannelType == "normal" || evtJson.ChannelType == "dialout"
              || evtJson.ChannelType == "dialTransfer"
              || evtJson.ChannelType == "transfer"
              || evtJson.ChannelType == "webcall") {
              this.m7Phone.callObject.endTime = moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000));
              this.m7Phone.callObject.ringTime = moorCall.moortools.getDate(new Date(evtJson.Data.RingTime * 1000));

              if(evtJson.ChannelType == "dialout" || evtJson.ChannelType == "dialTransfer") {
                this.m7Phone.callObject.data = evtJson.Data;
              }
              // delete this.m7Phone.callObject.data
              senvenMPublish("EvtHangup", [this.m7Phone.callObject]);
            } else if (evtJson.ChannelType == "listen") {
              this.m7Phone.m7OtherChannel = "";
              senvenMPublish("EvtEndListen", []);
            }

          }

        }

      }
    }else if (evtJson.Event === 'ConsultSuccess' || evtJson.Event === 'ConsultFailed') {
        moorCall.moortools.close();
        if (evtJson.Event === 'ConsultSuccess') {
            moorCall.moortools.m7ShowSuccess("咨询成功")
            senvenMPublish("EvtBarChange", [this.m7Phone.extenType + "_" + "stConcultTalking"]);
        } else if (evtJson.Event === 'ConsultFailed') {
            moorCall.moortools.error("咨询失败");
        }
    }
  },

  m7getAgentViaSipNum:function(sipNum) {
    if(!this.m7Phone.m7MonitorPeers) return null;
    for(var i in this.m7Phone.m7MonitorPeers) {
      var test = this.m7Phone.m7MonitorPeers[i].sipNo;
      if(this.m7Phone.m7MonitorPeers[i].sipNo == sipNum){
        return this.m7Phone.m7MonitorPeers[i];
      }
    }
    return null;
  },

  m7setMonitorObjs: function(evtJson) {
    if (evtJson.Event == "ChannelStatus") {
      if(evtJson.ChannelStatus == "Hangup"){
        if(evtJson.UserID == undefined) {
          return;
        }
      }

      var peer = this.m7getAgentViaSipNum(evtJson.Exten);
      if(!peer){
        return;
      }

      if(evtJson.ChannelStatus == "Down"){
        peer.callStatus = "Down";
        peer.channel = evtJson.Channel;
        this.m7UpdQueueInfo();
      } else if(evtJson.ChannelStatus == "Ring") {
        peer.callStatus = "Ring";
        peer.called = false;
        peer.C5Status = evtJson.C5Status;
        peer.timestamp = evtJson.Timestamp;
        peer.channel = evtJson.Channel;
        if(evtJson.C5Status == "OutboundCall"
          || evtJson.C5Status == "InboundCall"
          || evtJson.C5Status == "listen"){
          peer.callNo = evtJson.Data.ListenExten;
        } else if(evtJson.FromDid)
          peer.callNo = evtJson.FromDid;
        senvenMPublish("EvtMonitorPeer",[peer]);
      } else if(evtJson.ChannelStatus == "Ringing"){
        peer.called = true;
        peer.callStatus = "Ringing";
        peer.C5Status = evtJson.C5Status;
        peer.channel = evtJson.Channel;
        peer.linkedChannel = evtJson.LinkedChannel.Channel;
        if(evtJson.ChannelType == "dialTransfer"){
          peer.callNo = evtJson.FromDid;
        } else {
          peer.callNo = evtJson.FromCid;
        }
        peer.timestamp = evtJson.Timestamp;
        senvenMPublish("EvtMonitorPeer",[peer]);
      } else if(evtJson.ChannelStatus == "Up") {
        if(evtJson.ChannelType == "listen"){
          peer.callNo = evtJson.Data.ListenExten;
          peer.timestamp = evtJson.Timestamp;
          peer.C5Status = evtJson.C5Status;
          peer.callStatus = evtJson.ChannelType;
          peer.linked = true;
          peer.channel = evtJson.Channel;
          senvenMPublish("EvtMonitorPeer",[peer]);
        }
      } else if(evtJson.ChannelStatus == "Link") {
        peer.timestamp = evtJson.Timestamp;
        peer.C5Status = evtJson.C5Status;
        linked = true;
        peer.channel = evtJson.Channel;
        peer.linkedChannel = evtJson.LinkedChannel.Channel;
        peer.callStatus = evtJson.ChannelType;
        if(evtJson.ChannelType == "dialout" || evtJson.ChannelType == "dialTransfer") {
          peer.callNo = evtJson.LinkedChannel.FromDid;
        } else {
          peer.callNo = evtJson.LinkedChannel.FromCid;
          if (this.m7Phone.userId == evtJson.UserID) {
              m7$("#moorCall-dialout-input").val(peer.callNo);
          }
        }
        senvenMPublish("EvtMonitorPeer",[peer]);
      } else if(evtJson.ChannelStatus == "Unlink") {

      } else if(evtJson.ChannelStatus == "Hangup"){
        if(peer.channel == evtJson.Channel) {
          if(this.m7Phone.m7OtherChannel == evtJson.Channel
            && (this.m7CurrentCallState.m7CallState == "stListening" ||this.m7CurrentCallState.m7CallState == "stListened")) {
            this.m7Phone.hangup();
          }
          peer.C5Status = evtJson.C5Status;
          peer.callNo = "";
          peer.callStatus = "Idle";
          peer.timestamp = evtJson.Timestamp;
          linked = false;
          peer.channel = "";
          peer.linkedChannel = "";
          senvenMPublish("EvtMonitorPeer",[peer]);
        }
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "QueueParams") {
      var queueItem={};
      queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem) {
        if(evtJson.Removed) {
          queueItem.removed = true;
        }
        queueItem.queueName = evtJson.DisplayName;
        queueItem.idleAgentCount=evtJson.Members - evtJson.BusyMembers;
        queueItem.busyAgentCount=evtJson.BusyMembers;
        queueItem.totalAgentCount=evtJson.Members;
        queueItem.queueWaitCount=evtJson.Calls;
        queueItem.abadonedCalls=evtJson.Abandoned;
        queueItem.totalCalls=evtJson.TotalCalls;
        queueItem.DisplayName = evtJson.DisplayName;
        queueItem.NotTransfer = evtJson.NotTransfer || false;
        queueItem.members=[];
        for(var i in evtJson.QueueMember){
          var member = evtJson.QueueMember[i];
          queueItem.members[member] = member;
        }
        senvenMPublish("EvtMonitorQueue",[queueItem]);
      } else {
        queueItem = {
          queueName:evtJson.DisplayName,
          queueId:evtJson.Queue,
          idleAgentCount:evtJson.Members - evtJson.BusyMembers,
          busyAgentCount:evtJson.BusyMembers,
          totalAgentCount:evtJson.Members,
          queueWaitCount:evtJson.Calls,
          abadonedCalls:evtJson.Abandoned,
          DisplayName: evtJson.DisplayName,
          totalCalls:evtJson.TotalCalls,
          NotTransfer: evtJson.NotTransfer || false,
          members:[],
          removed:false
        };
        for(var i in evtJson.QueueMember){
          var member = evtJson.QueueMember[i];
          queueItem.members[member] =member; //change
        }
        this.m7Phone.m7MonitorQueues[evtJson.Queue]= queueItem;
      }
      this.m7UpdQueueInfo();
    } else if(evtJson.Event == "QueueMemberAdded") {
      var queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem) {
        if(!queueItem.members[evtJson.Exten]){
          queueItem.members[evtJson.Exten] = evtJson.Exten;  //change
          queueItem.totalAgentCount++;
          this.m7UpdQueueInfo();
        }
      } else {
      }
    } else if(evtJson.Event == "QueueMemberRemoved"){
      var queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem){
        if(queueItem.members[evtJson.Exten]){
          delete queueItem.members[evtJson.Exten];
          queueItem.totalAgentCount--;
          this.m7UpdQueueInfo();
        }
      }else{
      }
    } else if(evtJson.Event == "QueueMemberPaused"){

    } else if(evtJson.Event == "Join"){
      var queueItem = this.m7queryQueueItems(evtJson);
      if(queueItem){
        queueItem.queueWaitCount++;
        senvenMPublish("EvtMonitorQueue",[queueItem]);
      } else {
      }
      senvenMPublish("EvtQueueEntryAdd", [evtJson]);
    } else if(evtJson.Event == "Leave"){
      var queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem){
        queueItem.totalCalls++;
        queueItem.queueWaitCount--;
        if(queueItem.queueWaitCount < 0)
          queueItem.queueWaitCount = 0;
        senvenMPublish("EvtMonitorQueue",[queueItem]);
      } else {
      }
      senvenMPublish("EvtQueueEntryRemove", [evtJson]);
    } else if(evtJson.Event == "QueueCallerAbandon"){
      var queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem){
        queueItem.abadonedCalls++;
        senvenMPublish("EvtMonitorQueue",[queueItem]);
      }
      senvenMPublish("EvtQueueEntryRemove", [evtJson]);
    }

    else if(evtJson.Event == "UserStatus") {
      var isRegistered = false;
      if(evtJson.PeerStatus == "Registered") {
        isRegistered = true;
      }
      if(!this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = {
          exten:evtJson.Exten,
          sipNo:evtJson.SipNum,
          name:evtJson.User,
          DisplayName: evtJson.DisplayName,
          loginExten:evtJson.LoginExten,
          peerStatus:evtJson.PeerStatus,
          status:evtJson.Status,
          C5Status:evtJson.C5Status,
          busy:evtJson.Busy,
          extenType:evtJson.ExtenType,
          login:evtJson.Login,
          userId:evtJson.UserID,
          user:evtJson.User,
          localNo:evtJson.Local,
          register: isRegistered,
          InCalls: evtJson.InCalls,
          InComplete: evtJson.InComplete,
          OutCalls: evtJson.OutCalls,
          OutComplete: evtJson.OutComplete,
          linked:false,
          channel:"",
          linkedChannel:"",
          called:false,
          //Idle, Ring, Ringing, inner, normal, dialout, dialTransfer,transfer, listen, webcall
          callStatus:"Idle",
          callNo:"",
          timestamp:evtJson.Login?(evtJson.BusyTimestamp):"",
          busyTimestamp:evtJson.BusyTimestamp,
          loginTimestamp:evtJson.LoginTimestamp,
          busyType:evtJson.BusyType
        };
        this.m7Phone.m7MonitorPeers[evtJson.UserID] = peer;
        senvenMPublish("EvtMonitorPeer",[peer]);
      } else {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.peerStatus = evtJson.PeerStatus;
        peer.status = evtJson.Status;
        peer.exten = evtJson.Exten;
        peer.sipNo = evtJson.SipNum;
        peer.C5Status = evtJson.C5Status;
        peer.busy = evtJson.Busy;
        peer.extenType = evtJson.ExtenType;
        peer.login = evtJson.Login;
        peer.loginExten = evtJson.LoginExten;
        peer.name = evtJson.User;
        peer.DisplayName = evtJson.DisplayName;
        peer.userId = evtJson.UserID;
        peer.user = evtJson.User;
        peer.localNo = evtJson.Local;
        peer.register = isRegistered;
        peer.InCalls = evtJson.InCalls;
        peer.InComplete = evtJson.InComplete;
        peer.OutCalls = evtJson.OutCalls;
        peer.OutComplete = evtJson.OutComplete;
        peer.busyTimestamp=evtJson.BusyTimestamp;
        peer.loginTimestamp=evtJson.LoginTimestamp;
        peer.busyType=evtJson.BusyType;
        peer.timestamp = peer.login?(peer.busyTimestamp):"";
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "UserBusy") {
      if(this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.busy = evtJson.Busy;
        peer.busyType=evtJson.BusyType;
        peer.busyTimestamp = evtJson.BusyTimestamp;
        peer.timestamp = peer.login?(peer.busyTimestamp):"";
        peer.loginTimestamp=evtJson.LoginTimestamp;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "UserCallsUpdate") {
      if(this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.InCalls = evtJson.InCalls;
        peer.InComplete = evtJson.InComplete;
        peer.OutCalls = evtJson.OutCalls;
        peer.OutComplete = evtJson.OutComplete;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "UserSignIn") {
      if(this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.extenType = evtJson.ExtenType;
        peer.login = evtJson.Login;
        peer.sipNo = evtJson.SipNum;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "UserSignOut") {
      if(this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.extenType = evtJson.ExtenType;
        peer.sipNo = evtJson.SipNum;
        peer.login = evtJson.Login;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "TrunkStatus") {
      if(!this.m7Phone.m7MonitorServiceNum[evtJson.ServiceNo]){
        var serviceNo = {
          serviceNo: evtJson.ServiceNo,
          inCalls: evtJson.InCalls,
          inLost: evtJson.InLost,
          inComplete: evtJson.InComplete,
          outCalls: 0,
          outComplete: 0
        };
        this.m7Phone.m7MonitorServiceNum[evtJson.ServiceNo] = serviceNo;
      } else {
        var serviceNo = this.m7Phone.m7MonitorServiceNum[evtJson.ServiceNo];
        serviceNo.inCalls = evtJson.InCalls,
          serviceNo.inLost = evtJson.InLost,
          serviceNo.inComplete = evtJson.InComplete,
          serviceNo.outCalls = 0,
          serviceNo.outComplete = 0
      }
      senvenMPublish("EvtMonitorServiceNo", [this.m7Phone.m7MonitorServiceNum[evtJson.ServiceNo]]);
    }

    else if(evtJson.Event == "PeerStatus") {
      var isRegistered = false;
      if(evtJson.PeerStatus == "Registered")
        isRegistered = true;
      var peer = this.m7getAgentViaSipNum(evtJson.Exten);
      if(peer){
        peer.register = isRegistered;
        peer.status = evtJson.Status;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "AccountStatus"){
      this.m7Phone.m7AccountCall = evtJson;
      senvenMPublish("EvtAccountStatus", [evtJson]);
    }

  },
  m7queryQueueItems:function(evtJson) {
    if(!this.m7Phone.m7MonitorQueues) {
      return null;
    }
    for(var i in this.m7Phone.m7MonitorQueues) {
      if(this.m7Phone.m7MonitorQueues[i].queueId==evtJson.Queue) {
        return this.m7Phone.m7MonitorQueues[i];
      }
    }
    return null;
  },
  m7UpdQueueInfo:function(){
    for(var i in this.m7Phone.m7MonitorQueues) {
      var queue = this.m7Phone.m7MonitorQueues[i];
      var members = queue.members;
      queue.busyAgentCount = 0;
      queue.idleAgentCount = 0;
      for(var j in members){
        var peer = this.m7getAgentViaSipNum(members[j]);
        if(peer){
          if(peer.extenType == "sip"){
            if(!peer.register
              || !peer.login
              || peer.busy
              || peer.callStatus != "Idle"){
              queue.busyAgentCount++;
            }else {
              queue.idleAgentCount++;
            }
          } else if(peer.extenType == "gateway"){
            if(!peer.register
              || peer.busy
              || peer.callStatus != "Idle"){
              queue.busyAgentCount++;
            }else {
              queue.idleAgentCount++;
            }
          } else if(peer.extenType == "Local"){
            if(peer.busy
              || peer.callStatus != "Idle"){
              queue.busyAgentCount++;
            } else {
              queue.idleAgentCount++;
            }
          } else {
            queue.busyAgentCount++;
          }
        } else {
          queue.idleAgentCount++;
        }
      }
      senvenMPublish("EvtMonitorQueue",[queue]);
    }
  },
  m7GetQueueInfo: function() {
    var info = "";
    for(var i in this.m7Phone.m7MonitorQueues) {
      var queue = this.m7Phone.m7MonitorQueues[i];
      if(queue == null) {
        continue;
      }
      var members = queue.members;
      for(var j in members) {
        var peer = this.m7getAgentViaSipNum(members[j]);
        if(peer != null) {
          info += (peer.exten + "," + peer.busyType + ";");
        }
      }
    }
    return info;
  }

});
sevenDeclare("moorCall.SoftphoneBar", null, {
  constructor: function(phone,srcNodeName) {
    this.m7Phone = phone;
    this.m7CallStateDescription["stInnerDialing"] = "呼叫中";
    this.m7CallStateDescription["stInnerTalking"] = "内部通话";
    this.m7CallStateDescription["stInvalid"] = "空闲";
    this.m7CallStateDescription["stAbate"] = "失效";
    this.m7CallStateDescription["stBelling"] = "来电振铃";
    this.m7CallStateDescription["stTalking"] = "普通通话";
    this.m7CallStateDescription["stListening"] = "监听振铃";
    this.m7CallStateDescription["stListened"] = "监听中";
    this.m7CallStateDescription["stDialing"] = "呼叫中";
    this.m7CallStateDescription["stDialTalking"] = "外呼通话";
    this.m7CallStateDescription["stHold"] = "保持";
    this.m7CallStateDescription["stInnerBelling"] = "来电振铃";
    this.m7CallStateDescription["stThreeWayTalking"] = "三方通话";
    this.m7CallStateColor["0"] = "#53D464";
    this.m7CallStateColor["1"] = "#FF7A90";
    this.m7CallStateColor["2"] = "#E3A42C";
    this.m7CallStateColor["99"] = "#ff6400";
    this.m7CallStateColor["call"] = "#FF33FF";
    this.m7Phone.register("EvtPeerToolBarChange", this, "m7ChangedPeerToolBarState");
    this.m7Phone.register("EvtCallToolBarChange", this, "m7ChangedCallToolBarState");
    this.m7SrcNodeDom = document.getElementById(srcNodeName);
    this.m7SrcNodePeerStateDom = document.getElementById(srcNodeName + ".peerState");
    this.m7SrcNodePeerTimeStateDom = document.getElementById(srcNodeName + ".peerTimeState");
    this.m7SrcNodeCallTimeStateDom = document.getElementById(srcNodeName + ".callTimeState");
    this.m7SrcNodeSelectStateDom = document.getElementById(srcNodeName + ".select");
    this.m7SrcNodeSelectMenuDom = document.getElementById(srcNodeName + ".selectMenu");
    this.m7SrcNodePhoneNumDom = document.getElementById(srcNodeName + ".softPhoneNum");
    this.m7Phone.register("EvtBarChange", this, "m7render");
  },
  m7SrcNodeSelectStateDom: null,
  m7SrcNodePeerStateDom: null,
  m7SrcNodePhoneNumDom: null,
  m7SrcNodeCallTimeStateDom: null,
  m7SrcNodePeerTimeStateDom: null,
  m7SrcNodeSelectMenuDom: null,
  m7SrcNodeDom: null,
  m7CallStateDescription: [],
  m7Phone: null,
  m7CallStateColor: [],
  m7PeerHour: "0",
  m7PeerSecond: "1",
  m7PeerMinute: "0",
  m7PeerCalculagraph: null,

    Local_stInvalid: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stConcultTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ConsultThreeWayCallEnable", "ConsultTransferEnable","ConsultDisable", "StopConsultEnable", "transferIVR","transferSatisfaction"],
    Local_stBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stThreeWayTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stRest: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stInnerBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stListened: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stDialTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable","ConsultEnable", "StopConsultDisable", "transferIVREnable","transferSatisfactionEnable"],
    Local_stListening: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "transferIVREnable","transferSatisfactionEnable"],
    Local_stHold:["DialDisable", "smallDialDisable", "HangupDisable", "HoldGetEnable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable", "ConsultEnable", "StopConsultDisable", "transferIVREnable","transferSatisfactionEnable"],
    Local_stAbate: ["DialDisable", "smallDialDisable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    Local_stInnerDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stInnerTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stSystemBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],

    gateway_stInvalid: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stConcultTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "ConsultThreeWayCallEnable", "ConsultTransferEnable","ConsultDisable", "StopConsultEnable","transferIVR","transferSatisfaction"],
    gateway_stBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stThreeWayTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    gateway_stInnerBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stRest: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stListened: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stListening: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable", "ConsultEnable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    gateway_stDialTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable","ConsultEnable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    gateway_stBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stHold:["DialDisable", "smallDialDisable", "HangupDisable", "HoldGetEnable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    gateway_stAbate: ["DialDisable", "smallDialDisable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stInnerTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stInnerDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stSystemBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],


    sip_stInvalid: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stConcultTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ConsultThreeWayCallEnable", "ConsultTransferEnable","ConsultDisable", "StopConsultEnable","transferIVR","transferSatisfaction"],
    sip_stBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stThreeWayTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stRest: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stInnerBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stListened: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stDialTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable","ConsultEnable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    sip_stListening: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    sip_stHold:["DialDisable", "smallDialDisable", "HangupDisable", "HoldGetEnable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    sip_stTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable", "ConsultEnable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    sip_stAbate: ["DialDisable", "smallDialDisable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stInnerDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    sip_stInnerTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    sip_stSystemBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    m7ToConsult: function() {
    moorCall.moortools.input("consult");
  },
  m7ChangedPeerToolBarState: function(peerState) {
    if(this.m7Phone.m7PeerState.m7CurPeerStateKey == "99") {
        if (this.m7Phone.AutoBusyTime != '0') {
            if(this.m7Phone.AutoBusyTime == undefined) {
                return;
            }
            var d = this.m7Phone.m7PeerState.m7CallStateValue[this.m7Phone.m7PeerState.m7CurPeerStateKey];
            this.m7ChangeState(d);
            this.m7AutoBusyTime(this.m7Phone.AutoBusyTime);
            return;
        }
        if (currentEventObj.PeerStatus == "Registered"  || currentEventObj.PeerStatus == "Unregistered") {
            return
        }
    }
    var state = this.m7Phone.m7PeerState.m7CallStateValue[this.m7Phone.m7PeerState.m7CurPeerStateKey];
    this.m7ChangeState(state);
    if(this.m7SrcNodePeerStateDom != null) {
       if (prePhonebarStatus && isCtiRelogin) {
           isCtiRelogin = false
           var color = '#ff7a72'
           if (prePhonebarStatus == '0') {
             color= '#53d466'
           } else if (prePhonebarStatus == '2') {
              color = '#e3a42c'
           }
           this.m7SrcNodePeerStateDom.innerHTML = "<span style=color:" + color + ">" + this.m7Phone.m7PeerState._get(prePhonebarStatus).value + "</span>";

       } else {
           if(!(currentEventObj.Event == "PeerStatus" && currentEventObj.Exten == this.m7Phone.sipNo && currentEventObj.PeerStatus == "Registered")) {
               this.m7SrcNodePeerStateDom.innerHTML = "<span style=color:" + this.m7CallStateColor[this.m7Phone.m7PeerState.m7CurPeerStateKey] + ">" + this.m7Phone.m7PeerState._get(peerState).value + "</span>";
           } else if (this.m7Phone.extenType == "sip" && ((prePhonebarStatus == '0' && currentEventObj.Event == "PeerStatus" && currentEventObj.Exten == this.m7Phone.sipNo && currentEventObj.PeerStatus == "Registered") || this.m7SrcNodePeerStateDom.innerText === '失效')) {
               this.m7SrcNodePeerStateDom.innerHTML = "<span style=color:" + this.m7CallStateColor[this.m7Phone.m7PeerState.m7CurPeerStateKey] + ">" + this.m7Phone.m7PeerState._get(peerState).value + "</span>";
           }
       }
        var nodeInnerText = this.m7SrcNodePeerStateDom.innerText
        if (nodeInnerText == '失效' || nodeInnerText == '后处理') {
            var currentTime = moorCall.recordError.getCurrentTime();
            var errorData = {eventJson: "GetState", type: nodeInnerText, catchRecord:currentEventObj, errorTime: currentTime}
            moorCall.recordError.dataHandle(errorData)
        }
        if(peerState != "99") {
        senvenMPublish("EvtPeerStatusChanged", [peerState]);
      }
    }
    if(this.m7SrcNodePeerTimeStateDom != null) {
      this.m7showTimer();
    }

  },
  m7exCancelConsult: function(exten){
        phone.cancelConsult(exten)
    },
  m7ChangeState: function(state) {
      if (state === 'stSystemBusy') {
          for (var i = 0; i < m7$('.userStatus').length; i ++) {
              m7$(m7$('.userStatus')[i]).css("color", "#8a8a8a")
              m7$(m7$('.userStatus')[i]).find("span").css("background-color", "#8a8a8a")
          }
          m7$("#BusyDisable").css("color", "#ff7a72")
          m7$("#BusyDisable").find("span").css("background-color", "#ff7a72")
          m7$('.peerTimeState').css("color", "#ff7a72")
      }
    var type = "sip";
    var extenType = this.m7Phone.extenType;
    if (extenType == "gateway" || extenType == "phone") {
      type = "gateway";
    } else if (extenType == "Local") {
      type = "Local";
    }
    var curState = type + "_" + state;
    this.m7render(curState);
  },
  m7ChangedCallToolBarState: function(state) {
    if(m7IsCalling) { //通话中的注册事件对电话条无意义(振铃，通话中，接收到的)
      if (currentEventObj.PeerStatus == "Registered" || currentEventObj.PeerStatus == "Unregistered") {
        return
      }
    }
    this.m7ChangeState(state);
    if(this.m7SrcNodePeerStateDom != null && state != "stInvalid") {
      var html = "<span style=color:"+this.m7CallStateColor["call"]+">" + this.m7CallStateDescription[state] + "</span>"
      this.m7SrcNodePeerStateDom.innerHTML = html;
      var nodeInnerText = this.m7SrcNodePeerStateDom.innerText
      if (nodeInnerText == '失效' || nodeInnerText == '后处理') {
        var currentTime = moorCall.recordError.getCurrentTime();
        var errorData = {eventJson: "GetState", type: nodeInnerText, catchRecord:currentEventObj, errorTime: currentTime}
        moorCall.recordError.dataHandle(errorData)
      }
      senvenMPublish("EvtCallStatusChanged", [state]);
    }
    if(this.m7SrcNodePeerTimeStateDom != null) {
      this.m7showTimer();
    }
    var peerStatus = m7$('#peerStatus');
    if(peerStatus == null) {
      return;
    }
    if (state == "stInvalid") {
      m7$("#moorCall-dialout-input").disabled = false;
      this.m7ChangedPeerToolBarState(this.m7Phone.m7PeerState.m7CurPeerStateKey);
    } else {
      m7$("#moorCall-dialout-input").disabled = true;
    }
  },
  m7showTimer: function() {
    var self = this;
    self.m7PeerHour = "0";
    self.m7PeerMinute = "0";
    self.m7PeerSecond = "1";
    if (m7PeerCalculagraph != null) {
      window.clearInterval(m7PeerCalculagraph);
    }
    m7PeerCalculagraph = window.setInterval(function () {
      self.m7SrcNodePeerTimeStateDom.innerHTML = ((self.m7PeerHour < 10) ? ("0" + self.m7PeerHour) : self.m7PeerHour) + ":" + ((self.m7PeerMinute < 10) ? ("0" + self.m7PeerMinute) : self.m7PeerMinute) + ":" + ((self.m7PeerSecond < 10) ? ("0" + self.m7PeerSecond) : self.m7PeerSecond);
      self.m7PeerSecond++;
      if (self.m7PeerSecond == 60) {
        self.m7PeerMinute++;
        self.m7PeerSecond = 0;
      }
      if (self.m7PeerMinute == 60) {
        self.m7PeerHour++;
        self.m7PeerMinute = 0;
      }
    }, 1000);
  },
  m7exTransfer: function(phoneNum, type) {
    if (/^\d+$/.test(phoneNum)) {
      moorCall.moortools.close('softphonebar');
      phone.transfer("9" + phoneNum, type || "external", {});
    } else {
      moorCall.moortools.error("请输入正确的电话号码");
    }
  },
  m7render: function (state) {
    var self = this;
    var htmlNode = m7$('#callStatus').find("a")
    for (var i = 0; i < htmlNode.length; i++) {
      if (self[state]) {
          if (senvenGetIndexof(self[state], htmlNode[i].id) < 0) {
              m7$(htmlNode[i]).css("display", "none")
          } else {
              m7$(htmlNode[i]).css("display", "")
          }
      }
    }
  },
  m7ToTransfer: function() {
    moorCall.moortools.input("transfer");
  },
  m7exConsult: function(phoneNum) {
    if (/^\d+$/.test(phoneNum)) {
      moorCall.moortools.close('softphonebar');
      phone.consult("9" + phoneNum, "external");
    } else {
      moorCall.moortools.error("请输入正确的电话号码");
    }
  },
    m7AutoBusyTime: function(AutoBusyTime) {
        if(this.m7SrcNodePeerStateDom != null) {
            this.m7SrcNodePeerStateDom.innerHTML = this.m7Phone.m7PeerState._get("99").value;
            var nodeInnerText = this.m7SrcNodePeerStateDom.innerText
            if (nodeInnerText == '失效' || nodeInnerText == '后处理') {
                var currentTime = moorCall.recordError.getCurrentTime();
                var errorData = {eventJson: "GetState", type: nodeInnerText, catchRecord:currentEventObj, errorTime: currentTime}
                moorCall.recordError.dataHandle(errorData)
            }
        }
        var self = this;
        if(m7PeerCalculagraph != null) {
            window.clearInterval(m7PeerCalculagraph);
        }
        m7PeerCalculagraph = window.setInterval(function(){
            if(AutoBusyTime < 60) {
                self.m7PeerHour = "0";
                self.m7PeerMinute = "0";
                self.m7PeerSecond = AutoBusyTime;
            } else if(AutoBusyTime >= 60 && (AutoBusyTime < 60*60)) {
                self.m7PeerMinute = parseInt(AutoBusyTime / 60);
                self.m7PeerHour = "0";
                self.m7PeerSecond = AutoBusyTime - self.m7PeerMinute* 60;
            } else if(AutoBusyTime >= 60*60 ) {
                self.m7PeerMinute = parseInt((AutoBusyTime - self.m7PeerHour*(60*60)) / (60));
                self.m7PeerHour = parseInt(AutoBusyTime / (60*60));
                self.m7PeerSecond = AutoBusyTime - self.m7PeerHour*(60*60) - self.m7PeerMinute* (60);
            }
            if(self.m7PeerHour < 0) {
                self.m7PeerHour = 0;
            }
            if(self.m7PeerMinute < 0) {
                self.m7PeerMinute = 0;
            }
            if(self.m7PeerSecond < 0) {
                self.m7PeerSecond = 0;
            }
            AutoBusyTime--
            console.log(AutoBusyTime)
            if (AutoBusyTime == 0 && self.m7Phone.m7BusyType !== '99') {
                var busyType = self.m7Phone.m7BusyType
                changePhoneBarStatus(busyType)
            }
            self.m7SrcNodePeerTimeStateDom.innerHTML = ((self.m7PeerHour<10)?("0"+self.m7PeerHour):self.m7PeerHour) + ":" + ((self.m7PeerMinute<10)?("0"+self.m7PeerMinute):self.m7PeerMinute) + ":" + ((self.m7PeerSecond<10)?("0"+self.m7PeerSecond):self.m7PeerSecond);
        }, 1000);
    },
  dialout: function (phoneNum, type) {
    if (/^\d+$/.test(phoneNum)) {
      this.m7Phone.dialout(phoneNum, type);
      return true;
    } else {
      moorCall.moortools.error("请输入正确的电话号码");
      return false;
    }
  }

});
sevenDeclare("moorCall.callProcessor", null, {
  m7Phone: null,
  constructor: function (phone) {
    this.m7Phone = phone;
    evtHandle = this.m7Phone.register("EvtMonitorQueue" , this, "EvtMonitorQueue");
    this.m7Phone.m7Handle.push(evtHandle);
    var evtHandle = this.m7Phone.register("EvtHangup", this, "onHangup");
    this.m7Phone.m7Handle.push(evtHandle);
    var evtHandle = this.m7Phone.register("EvtRing", this, "m7Ring");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtPeerStatusChanged", this, "peerStatusChanged");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtConnected", this, "EvtConnected");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtCallStatusChanged", this, "callStatusChanged");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtLogon", this, "EvtLogon");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtDialing", this, "onDialing");
    this.m7Phone.m7Handle.push(evtHandle);
  },
  EvtMonitorQueue: function (queueItem) {
      if (typeof(queueItem) == 'object') { // 过滤掉非object类型
          if (queueItem.members[this.m7Phone.sipNo] && queueItem.queueId) { // 当前座席所在的技能组
              var count = 0
              for (var i = 0; i < m7MyQueue.length; i++) {
                  let qid = m7MyQueue[i]
                  if (qid === queueItem.queueId) {
                      count++
                      break
                  }
              }
              if (!count) {
                  m7MyQueue.push(queueItem.queueId)
              }
              if (count > 0) { // 我的技能组
                  m7QueueWaitObj[queueItem.queueId] = queueItem.queueWaitCount
                  var maqCount = 0
                  for (let i in m7QueueWaitObj) {
                      maqCount += m7QueueWaitObj[i]
                  }
                  if (maqCount > 0) {
                      m7queueNumber = maqCount
                  } else {
                      m7queueNumber = 0
                  }
              }
              console.log(m7queueNumber, '========')
          }
      }
  },
  EvtConnected: function(data) {
    var phoneJson = {
      Command: "Action",
      Action: "Connected",
      Agent: "",
      CallsheetId: data.callSheetId,
      CalledNo: data.originCalledNo,
      EndTime: "",
      CallType: data.callType,
      Status: data.status,
      RingTime: data.offeringTime,
      ActionID: "Connected"+Math.random(),
      BeginTime: data.beginTime,
      CallNo: data.originCallNo,
      MonitorFilename: ""
    };
    this.sendAction(phoneJson);
  },
  onHangup: function(data) {
    var MonitorFilename = ''
    if (data && data.data && data.data.MonitorFilename) {
      MonitorFilename = data.data.MonitorFilename
    }
    var phoneJson = {
      Command: "Action",
      ActionID: "Hangup"+Math.random(),
      Action: "Hangup",
      Status: data.status,
      CalledNo: data.originCalledNo,
      CallType: data.callType,
      EndTime: data.endTime,
      CallsheetId: data.callSheetId,
      RingTime: data.ringTime,
      Agent: data.agent,
      CallNo: data.originCallNo,
      BeginTime: data.beginTime,
      MonitorFilename: data.data.MonitorFilename
    };
    this.sendAction(phoneJson);
  },
  callStatusChanged: function(data) {
  },
  onDialing: function(data) {
    var phoneJson = {
      Command: "Action",
      ActionID: "Dialing"+Math.random(),
      Action: "Dialing",
      Status: data.status,
      CallsheetId: data.callSheetId,
      RingTime: data.offeringTime,
      Agent: "",
      CallNo: data.originCallNo,
      CalledNo: data.originCalledNo,
      BeginTime: "",
      EndTime: "",
      CallType: data.callType,
      MonitorFilename: ""
    };
    this.sendAction(phoneJson);
  },
  m7Ring: function (data) {
    m7$("#moorCall-dialout-input").val(data.originCallNo);
    var phoneJson = {
      Command: "Action",
      Action: "Ring",
      ActionID: "Ring"+Math.random(),
      RingTime: data.offeringTime,
      CallNo: data.originCallNo,
      CalledNo: data.originCalledNo,
      Agent: data.agent,
      CallsheetId: data.callSheetId,
      CallType: data.callType,
      Status: data.status
    };
    this.sendAction(phoneJson);
  },
  sendAction: function(json) {
  },
  peerStatusChanged: function(data) {
  },
  EvtLogon: function(data) {
    var phoneJson = {
      Command: "Action",
      Action: "Logon",
      ActionID: "Logon" + Math.random(),
      Status: data
    };
    this.sendAction(phoneJson);
  },
});