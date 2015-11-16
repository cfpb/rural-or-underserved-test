var county = require('../src/js/setCountyName');

describe('set county name', function() {
  it('01001 = Autauga', function() {
    expect(county('01001')).toBe('Autauga');
  });

  it('08007 = Archuleta', function() {
    expect(county('08007')).toBe('Archuleta');
  });

  it('99999 = empty string', function() {
    expect(county('99999')).toBe('');
  });

  it('number = empty string', function() {
    expect(county(1)).toBe('');
  });

  it('array = empty string', function() {
    expect(county([])).toBe('');
  });

  it('object = empty string', function() {
    expect(county({})).toBe('');
  });
});
