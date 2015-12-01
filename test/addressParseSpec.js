var addrParse = require('../src/js/addressParse');

describe('address parse functions (from csv)', function() {
  describe('is address valid', function() {
    var row = {};
    var addresses = [];

    it('should be valid', function() {
      row.data = [];
      row.data[0] = {
        "City": "City",
        "State": "State",
        "Street Address": "Street",
        "Zip": "12345"
      };

      expect(addrParse.isValid(row)).toBeTruthy();
    });

    it('should NOT be valid', function() {
      row.data = [];
      row.data[0] = {
        "City": "City",
        "State": "State",
        "Street Address": "",
        "Zip": "12345"
      };
      row.errors = [];
      row.errors[0] = 'true';

      expect(addrParse.isValid(row)).toBeFalsy();
    });
  });

  describe('push an addresses', function() {
    var row = {};
    var addresses = [];

    it('should be push an address', function() {
      row.data = [];
      row.data[0] = {
        "City": "City",
        "State": "State",
        "Street Address": "Street",
        "Zip": "12345"
      };

      addresses = addrParse.pushAddress(row, addresses);

      expect(addresses).toContain('Street, City, State 12345');
    });
  });
});
