var isUrban = require('../src/js/isUrban');

describe('is adddress urban', function() {
  it('should NOT be urban - one 0 length array', function() {
    expect(isUrban([true], [])).toBeFalsy();
  });

  it('should NOT be urban - one null', function() {
    expect(isUrban(null, [true])).toBeFalsy();
  });

  it('should NOT be urban', function() {
    expect(isUrban([true], [true])).toBeFalsy();
  });

  it('should be urban - 0 length arrays', function() {
    expect(isUrban([], [])).toBeTruthy();
  });

  it('should be urban - nulls', function() {
    expect(isUrban(null, null)).toBeTruthy();
  });

});
