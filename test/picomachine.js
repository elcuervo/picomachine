if(typeof module != 'undefined') {
  var scenario = require('gerbil').scenario;
  var PicoMachine = require('../lib/picomachine');
}

scenario('PicoMachine - test states', {
  'before': function() {
    this.stateMachine = new PicoMachine('new');
    this.stateMachine.transitionsFor['confirm'] = { new: 'confirmed' };
    this.stateMachine.transitionsFor['ignore'] = { new: 'ignored' };
  },

  'switch to valid states': function(g) {
    g.assert_equal(this.stateMachine.trigger('confirm'), true);
    g.assert_equal(this.stateMachine.state, 'confirmed');
    g.assert_equal(this.stateMachine.trigger('ignore'), false);
    g.assert_equal(this.stateMachine.state, 'confirmed');
  },

  'call the any callback switching a state': function(g) {
    var counter = 0;
    var counterUp = function() {
      counter++;
    }
    this.stateMachine.on('any', counterUp);
    this.stateMachine.on('confirmed', counterUp);

    this.stateMachine.trigger('confirm');
    g.assert_equal(counter, 2);
  },

  'call the propper callbacks': function(g) {
    var counter = 0;
    this.stateMachine.on('confirmed', function() {
      counter++;
    });
    g.assert_equal(counter, 0);
    this.stateMachine.trigger('confirm');
    g.assert_equal(counter, 1);
  },

  'throw error on invalid state': function(g) {
    g.assert_throw(Error, function() {
      this.stateMachine.trigger('fruit');
    });
  }

});
