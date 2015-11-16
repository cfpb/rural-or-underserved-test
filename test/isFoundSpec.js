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
