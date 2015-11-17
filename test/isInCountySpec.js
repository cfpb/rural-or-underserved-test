var counties = require('../src/js/isInCounty');

describe('is adddress in rural county', function() {
  var countyList;

  beforeEach(function() {
    countyList = {
        "fips": [
          ["01005", "AL, Barbour County"],
          ["01011", "AL, Bullock County"],
          ["01013", "AL, Butler County"],
          ["01019", "AL, Cherokee County"]
        ]
      };
  });

  it('should NOT be in county', function() {
    expect(counties('11111', countyList)).toBeFalsy();
  });

  it('should be in county', function() {
    expect(counties('01005', countyList)).toBeTruthy();
  });

});
