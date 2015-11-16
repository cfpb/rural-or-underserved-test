(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(response) {
  var pass =false;
  var match =response.addressMatches;
  if (Array.isArray(match) && match.length !== 0) {
        pass =true;
  }
  return pass;
};

},{}],2:[function(require,module,exports){
var isFound = require('../src/js/isFound');

describe('is adddress found', function() {
  var response;
  beforeEach(function(){
    response = {};
    response.addressMatches = [];
});

  it('should not be found - 0 length array', function() {
    expect(isFound(response)).toBeFalsy();
  });

  it('should not be found - not an array', function() {
    response.addressMatches = 'string';
    expect(isFound(response)).toBeFalsy();
  });

  it('should be found', function() {
    response.addressMatches.push(1);    
    expect(isFound(response)).toBeTruthy();
  });
});

},{"../src/js/isFound":1}]},{},[2]);
