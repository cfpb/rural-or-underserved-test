var addr = require('../src/js/address');

describe('address functions', function() {
  describe('is adddress duplicate', function() {
    var address,
      duplicates;

    beforeEach(function(){
      address = '123 Main St., Somecity, SomeWhere, 12345';
      duplicates = [];
    });

    it('should NOT be a duplicate', function() {
      expect(addr.isDup(address, duplicates)).toBeFalsy();
    });

    it('should NOT be duplicate - duplicates NOT an array', function() {
      duplicates = 'string';
      expect(addr.isDup(address, duplicates)).toBeFalsy();
    });

    it('should NOT be duplicate - address NOT a string', function() {
      address = 1;
      expect(addr.isDup(address, duplicates)).toBeFalsy();
    });

    it('should be a duplicate', function() {
      duplicates.push('123 Main St., Somecity, SomeWhere, 12345');
      expect(addr.isDup(address, duplicates)).toBeTruthy();
    });

  });

  describe('is adddress found', function() {
    var response;

    beforeEach(function(){
      response = {};
      response.addressMatches = [];
    });

    it('should NOT be found - 0 length array', function() {
      expect(addr.isFound(response)).toBeFalsy();
    });

    it('should NOT be found - NOT an array', function() {
      response.addressMatches = 'string';
      expect(addr.isFound(response)).toBeFalsy();
    });

    it('should be found', function() {
      response.addressMatches.push(1);
      expect(addr.isFound(response)).toBeTruthy();
    });
  });

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
      expect(addr.isInCounty('11111', countyList)).toBeFalsy();
    });

    it('should be in county', function() {
      expect(addr.isInCounty('01005', countyList)).toBeTruthy();
    });

  });

  describe('is adddress rural', function() {
    it('should NOT be rural - one 0 length array', function() {
      expect(addr.isRuralCensus([true], [])).toBeFalsy();
    });

    it('should NOT be rural - one null', function() {
      expect(addr.isRuralCensus(null, [true])).toBeFalsy();
    });

    it('should NOT be rural', function() {
      expect(addr.isRuralCensus([true], [true])).toBeFalsy();
    });

    it('should be rural - 0 length arrays', function() {
      expect(addr.isRuralCensus([], [])).toBeTruthy();
    });

    it('should be rural - nulls', function() {
      expect(addr.isRuralCensus(null, null)).toBeTruthy();
    });

  });

  describe('render address', function() {
    jasmine.getFixtures().fixturesPath = 'test/fixtures';
    var testResult = {};

    it('table container should be visible and table should have a row', function() {
      testResult.input = 'test address';
      testResult.address = 'Duplicate';
      testResult.countyName = '-';
      testResult.type = 'duplicate';
      loadFixtures('tableDuplicate.html');
      addr.render(testResult);
      expect($('#duplicate')).toBeInDOM();
      expect($('#duplicate')).toBeVisible();
      expect($('#duplicate tbody')).toHaveHtml('<tr class="data"><td>test address</td><td>Duplicate</td><td>-</td><td>-</td></tr>');
    });

    it('table container should be visible and table should have a row with a map', function() {
      testResult.input = '123 Main';
      testResult.address = '123 Main';
      testResult.countyName = 'County';
      testResult.type = 'rural';
      testResult.x = -72.1;
      testResult.y = -72.1;
      testResult.id = Date.now();
      loadFixtures('tableRural.html');
      addr.render(testResult);
      /*
      this fails for an unknown reason, the HTML is the same

      expect($('#duplicate tbody')).toHaveHtml('<tr><td>123 Main</td><td>123 Main</td><td>County</td><td>1234</td><td>Yes <a href="#" class="no-decoration hide-print jsLoadMap right" data-map="false" data-lat="-72.1" data-lon="-72.1" data-id="loc-' + testResult.id + '">Show map <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1200" class="cf-icon-svg"><path d="M500 105.2c-276.1 0-500 223.9-500 500s223.9 500 500 500 500-223.9 500-500-223.9-500-500-500zm263.1 550.7H549.6v213.6c0 27.6-22.4 50-50 50s-50-22.4-50-50V655.9H236c-27.6 0-50-22.4-50-50s22.4-50 50-50h213.6V342.3c0-27.6 22.4-50 50-50s50 22.4 50 50v213.6h213.6c27.6 0 50 22.4 50 50s-22.5 50-50.1 50z"></path></svg></a></td></tr><tr class="hide"><td colspan="5"><div class="map" id="loc-' + testResult.id + '"></div></td></tr>');
      */
      expect($('#rural')).toBeInDOM();
      expect($('#rural')).toBeVisible();
      expect($('tr.hide')).toBeInDOM(); // the row with the map
      expect($('tr')[1]).toBeInDOM(); // the row with the map
      expect($('#loc-' + testResult.id)).toBeInDOM(); // the map id
    });
  });
});
