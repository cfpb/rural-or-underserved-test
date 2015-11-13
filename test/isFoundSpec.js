var isFound = require('../src/js/isFound');

describe('address', function() {
  var response = {};
  response.addressMatches = [];

  it('should not be found', function() {
    expect(isFound(response)).toBe(false);
  })
});
