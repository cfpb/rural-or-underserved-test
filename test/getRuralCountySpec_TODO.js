var counties = require('../src/js/getRuralCounties');

describe('did ajax call respond', function() {
  var countyList;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  beforeEach(function(done) {
    counties('2015', function(data) {
      countyList = data;
      done();
    });
  });

  it('should return', function(done) {
    console.log(countyList);
    expect(countyList).not.toEqual({});
    expect(countyList).not.toBeUndefined();
    done();
  });
});
