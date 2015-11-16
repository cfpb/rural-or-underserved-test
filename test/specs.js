(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(address, duplicates) {
  var pass = false;

  if (typeof address === 'string' && Array.isArray(duplicates) && duplicates.indexOf(address) !== -1) {
    pass = true;
  }

  return pass;
};

},{}],2:[function(require,module,exports){
module.exports = function(response) {
  var pass = false;
  var match = response.addressMatches;

  if (Array.isArray(match) && match.length !== 0) {
    pass = true;
  }
  
  return pass;
};

},{}],3:[function(require,module,exports){
var isDup = require('../src/js/isDup');

describe('is adddress duplicate', function() {
  var address,
    duplicates;

  beforeEach(function(){
    address = '123 Main St., Somecity, SomeWhere, 12345';
    duplicates = [];
  });

  it('should NOT be a duplicate', function() {
    expect(isDup(address, duplicates)).toBeFalsy();
  });

  it('should NOT be duplicate - duplicates NOT an array', function() {
    duplicates = 'string';
    expect(isDup(address, duplicates)).toBeFalsy();
  });

  it('should NOT be duplicate - address NOT a string', function() {
    address = 1;
    expect(isDup(address, duplicates)).toBeFalsy();
  });

  it('should be a duplicate', function() {
    duplicates.push('123 Main St., Somecity, SomeWhere, 12345');
    expect(isDup(address, duplicates)).toBeTruthy();
  });

});

},{"../src/js/isDup":1}],4:[function(require,module,exports){
var isFound = require('../src/js/isFound');

describe('is adddress found', function() {
  var response;
  
  beforeEach(function(){
    response = {};
    response.addressMatches = [];
  });

  it('should NOT be found - 0 length array', function() {
    expect(isFound(response)).toBeFalsy();
  });

  it('should NOT be found - NOT an array', function() {
    response.addressMatches = 'string';
    expect(isFound(response)).toBeFalsy();
  });

  it('should be found', function() {
    response.addressMatches.push(1);
    expect(isFound(response)).toBeTruthy();
  });
});

},{"../src/js/isFound":2}]},{},[3,4]);
