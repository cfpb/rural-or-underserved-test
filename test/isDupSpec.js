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
