var PicoMachine = function(initialState) {
  this.state = initialState;
  this.transitionsFor = {};
  this.callbacks = {};

  this.triggereable = function(event) {
    try{
      return this.transitionsFor[event][this.state];
    } catch(exception) {
      throw new Error("Invalid Event");
    }
  };
};

PicoMachine.prototype = {
  on: function(key, fn) {
    if(!this.callbacks[key]) this.callbacks[key] = [];
    this.callbacks[key].push(fn);
  },

  trigger: function(event) {
    if(this.triggereable(event)) {
      this.state = this.transitionsFor[event][this.state];
      callbacks = (this.callbacks[this.state] || []).concat(this.callbacks['any'] || []);
      for(var callback in callbacks) {
        if(typeof callbacks[callback] == 'function') callbacks[callback].apply(this);
      }
      return true;
    } else {
      return false;
    }
  }
};

if(typeof module != 'undefined' && module.exports) module.exports = PicoMachine;
