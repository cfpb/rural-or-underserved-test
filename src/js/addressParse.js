module.exports = function() {
  var addressParse = {};

  addressParse.isValid = function(row) {
    var pass = true;

    if (row.data[0]['Street Address'] === '' && row.errors) {
        pass = false;
    }

    return pass;
  }

  addressParse.pushAddress = function(row, addresses) {
    addresses.push(row.data[0]['Street Address'] + ', ' + row.data[0].City + ', ' + row.data[0].State + ' ' + row.data[0].Zip);
    return addresses;
  }

  return addressParse;
}();
