if(typeof module != 'undefined') {
  var scenario = require('gerbil').scenario;
  var PicoMachine = require('../lib/picomachine');
}

scenario('PicoMachine - test states', {
  'before': function() {
    this.stateMachine = new PicoMachine('new');
    this.stateMachine.transitionsFor['confirm'] = {new: 'confirmed'};
    this.stateMachine.transitionsFor['abort'] = {confirmed: 'aborted'};
    this.stateMachine.transitionsFor['ignore'] = {new: 'ignored'};
  },

  'switch to valid states': function(g) {
    g.assertEqual(this.stateMachine.trigger('confirm'), true);
    g.assertEqual(this.stateMachine.state, 'confirmed');
    g.assertEqual(this.stateMachine.trigger('ignore'), false);
    g.assertEqual(this.stateMachine.state, 'confirmed');
  },

  'call the any callback switching a state': function(g) {
    var counter = 0;
    var counterUp = function() {
      counter++;
    }
    this.stateMachine.on('any', counterUp);
    this.stateMachine.on('confirmed', counterUp);

    this.stateMachine.trigger('confirm');
    g.assertEqual(counter, 2);
  },

  'call the propper callbacks': function(g) {
    var counter = 0;
    this.stateMachine.on('confirmed', function() {
      counter++;
    });
    g.assertEqual(counter, 0);
    this.stateMachine.trigger('confirm');
    g.assertEqual(counter, 1);
  },

  'throw error on invalid state': function(g) {
    g.assertThrow(Error, function() {
      this.stateMachine.trigger('fruit');
    });
  },

  'switch states inside a callback': function(g) {
    this.stateMachine.on('confirmed', function() {
      g.assert(this.trigger('abort'));
    });
    this.stateMachine.trigger('confirm');

    g.assertEqual(this.stateMachine.state, 'aborted');
  }

});
