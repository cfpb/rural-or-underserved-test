module.exports = function() {
  var addressParse = {};

  addressParse.isValid = function(row) {
    return row.meta.fields[0] === 'Street Address'
           && row.meta.fields[1] === 'City'
           && row.meta.fields[2] === 'State'
           && row.meta.fields[3] === 'Zip';
  }

  addressParse.pushAddress = function( row, addresses ) {
    addresses.push( row.data[0]['Street Address']
    	+ ', '
    	+ row.data[0].City + ', '
    	+ row.data[0].State + ' '
    	+ row.data[0].Zip);
    return addresses;
  }

  return addressParse;
}();
