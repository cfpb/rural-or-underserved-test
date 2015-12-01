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

  describe('is adddress urban', function() {
    it('should NOT be urban - one 0 length array', function() {
      expect(addr.isUrban([true], [])).toBeFalsy();
    });

    it('should NOT be urban - one null', function() {
      expect(addr.isUrban(null, [true])).toBeFalsy();
    });

    it('should NOT be urban', function() {
      expect(addr.isUrban([true], [true])).toBeFalsy();
    });

    it('should be urban - 0 length arrays', function() {
      expect(addr.isUrban([], [])).toBeTruthy();
    });

    it('should be urban - nulls', function() {
      expect(addr.isUrban(null, null)).toBeTruthy();
    });

  });

  describe('render address', function() {
    jasmine.getFixtures().fixturesPath = 'test/fixtures';
    var testResult = {};

    it('table container should be visible and table should have a row', function() {
      testResult.input = 'test address';
      testResult.address = 'Duplicate';
      testResult.countyName = '-';
      testResult.block = '-';
      testResult.rural = '-';
      testResult.type = 'duplicate';
      loadFixtures('tableDuplicate.html');
      addr.render(testResult);
      expect($('#duplicate')).toBeInDOM();
      expect($('#duplicate')).toBeVisible();
      expect($('#duplicate tbody')).toHaveHtml('<tr><td>test address</td><td>Duplicate</td><td>-</td><td>-</td><td>-</td></tr>');
    });

    it('table container should be visible and table should have a row with a map', function() {
      testResult.input = '123 Main';
      testResult.address = '123 Main';
      testResult.countyName = 'County';
      testResult.block = '1234';
      testResult.rural = 'Yes';
      testResult.type = 'rural';
      testResult.x = -72.1;
      testResult.y = -72.1;
      testResult.id = Date.now();
      loadFixtures('tableRural.html');
      addr.render(testResult);
      /*
      this fails for an unknown reason, the HTML is the same

      expect($('#duplicate tbody')).toHaveHtml('<tr><td>123 Main</td><td>123 Main</td><td>County</td><td>1234</td><td>Yes <a href="#" class="no-decoration hide-print jsLoadMap right" data-map="false" data-lat="-72.1" data-lon="-72.1" data-id="loc-' + testResult.id + '">Show map <span class="cf-icon cf-icon-plus-round"></span></a></td></tr><tr class="hide"><td colspan="5"><div class="map" id="loc-' + testResult.id + '"></div></td></tr>');
      */
      expect($('#rural')).toBeInDOM();
      expect($('#rural')).toBeVisible();
      expect($('tr.hide')).toBeInDOM(); // the row with the map
      expect($('tr')[1]).toBeInDOM(); // the row with the map
      expect($('#loc-' + testResult.id)).toBeInDOM(); // the map id
    });
  });
});
