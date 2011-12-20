# PicoMachine
_a.k.a.: [MicroMachine](https://github.com/soveran/micromachine) for javascript_

## Description

PicoMachine is a javascript version of [MicroMachine](https://github.com/soveran/micromachine) and have the same goals.
To be a minimal and fully functional minimal state machine.

## Usage

```javascript
var PicoMachine = require('picomachine');

var machine = PicoMachine.new('new'); // Initial state.

machine.transitionsFor['confirm'] = { new: 'confirmed' };
machine.transitionsFor['ignore']  = { new: 'ignored' };
machine.transitionsFor['reset']   = { confirmed: 'new', ignored: 'new' };

machine.trigger('confirm');  // true
machine.trigger('ignore');   // false
machine.trigger('reset');    // true
machine.trigger('ignore');   // true
```
