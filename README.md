# PicoMachine
_a.k.a.: [MicroMachine](https://github.com/soveran/micromachine) for javascript_

[![Build Status](https://secure.travis-ci.org/elcuervo/picomachine.png?branch=master)](http://travis-ci.org/elcuervo/picomachine)

## Description

PicoMachine is a javascript version of [MicroMachine](https://github.com/soveran/micromachine) and have the same goals.
To be a minimal and fully functional minimal state machine.

## Usage

```javascript
var PicoMachine = require('picomachine');

var machine = new PicoMachine('new'); // Initial state.

machine.transitionsFor['confirm'] = { new: 'confirmed' };
machine.transitionsFor['ignore']  = { new: 'ignored' };
machine.transitionsFor['reset']   = { confirmed: 'new', ignored: 'new' };

machine.trigger('confirm');  // true
machine.trigger('ignore');   // false
machine.trigger('reset');    // true
machine.trigger('ignore');   // true
```

## Callbacks

```javascript
machine.trigger('reset');

// Callback for the 'confirm' event
machine.on('confirmed', function() {
  console.log('The thing is confirmed');
});

// Callback for all the things!
machine.on('any', function() {
  console.log("I'm triggered in allllll the events!!!");
});

machine.trigger('confirm');
// The thing is confirmed
// I'm triggered in allllll the events!!!

machine.on('something', function() {
  // Inside a callback 'this' represents the machine
  // so you can trigger other events within it
  this.trigger('otherThing');
});
```
