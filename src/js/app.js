var $ = require('jquery');
var content = require('./contentControl');
var addr = require('./address');
var addrParse = require('./addressParse');
var count = require('./count');
var textInputs = require('./textInputs');
var fileInput = require('./fileInput');

var mapbox = require('./callMapbox');
var ruralCounties = require('./getRuralCounties');

require('./showMap');
require('papaparse');
require('./misc');
require('./search-box');
require('./header-nav');
require('./expandables');

var censusResponse;

window.callbacks = {};

callbacks.mapboxAPI = function(err, data) {
  if (addr.isFound(data.results)) {
    addr.isRural(data, $('#year').val());
  } else {
    var result = {};
    result.input = addr.getInput(data.results.query);
    result.address = 'Address not identfied';
    result.countyName = '-';
    result.block = '-';
    result.rural = '-';
    result.type = 'notFound';
    count.updateCount(result.type);
    addr.render(result);
  }
}

callbacks.getRuralCounties = function(data) {
  var result = {};
  result.input = censusResponse.result.input.address.address;
  result.address = censusResponse.result.addressMatches[0].matchedAddress;
  result.block = censusResponse.result.addressMatches[0].geographies['Census Blocks'][0].BLOCK;
  result.x = censusResponse.result.addressMatches[0].coordinates.x;
  result.y = censusResponse.result.addressMatches[0].coordinates.y;

  var fips = censusResponse.result.addressMatches[0].geographies['Census Blocks'][0].STATE + censusResponse.result.addressMatches[0].geographies['Census Blocks'][0].COUNTY;
  result.countyName = addr.setCountyName(fips);

  if(addr.isInCounty(fips, data)) {
    result.rural = 'Yes';
    result.type = 'rural';
  } else {
    var urbanClusters = censusResponse.result.addressMatches[0].geographies['Urban Clusters'];
    var urbanAreas = censusResponse.result.addressMatches[0].geographies['Urbanized Areas'];

    if(addr.isUrban(urbanClusters, urbanAreas)) {
      result.rural = 'Yes';
      result.type = 'rural';
    } else {
      result.rural = 'No';
      result.type = 'notRural';
    }
  }

  result.id = Date.now();

  addr.render(result);
  count.updateCount(result.type);
}

processAddresses = function(addresses) {
  duplicates = [];

  $.each(addresses, function(index, address) {
    // if its not dup
    if (!addr.isDup(address, duplicates)) {
      mapbox(address, callbacks.mapboxAPI);
      duplicates.push(address);
    } else {
      // setup the result to render
      var result = {};
      result.input = address;
      result.address = 'Duplicate';
      result.countyName = '-';
      result.block = '-';
      result.rural = '-';
      result.type = 'duplicate';
      addr.render(result);
      count.updateCount(result.type);
    }
  });
}

// on submit
$('#geocode').submit(function(e) {
  var addresses = [];

  content.setup();

  $('.input-address').each(function(index) {
    if ($(this).val() !== '') {
      addresses.push($(this).val());
    }
  });

  count.updateAddressCount(addresses.length);
  processAddresses(addresses);
  return false;
});

// when file upload is used
$('#file').change(function(e) {
  var rowCount = 0;
  textInputs.reset();
  $('#fileName').val(fileInput.getUploadName($('#file').val()));
  fileInput.resetError();

  // parse the csv to get the count
  $('#file').parse( {
    config: {
      header: true,
      step: function(results, parser) {
        if (!addrParse.isValid(results)) {
          return;
        } else {
          rowCount ++;
        }
      },
      complete: function(results, file) {
        if (rowCount === 0) {
          fileInput.setError('There are no rows in this csv. Please update and try again.');
        }
        if (rowCount >= 250) {
          var leftOver = rowCount - 250;
          fileInput.setError('You entered ' + rowCount + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. You can run the first 250 now, but please recheck the remaining ' + leftOver + '.');
        }
      }
    },
    complete: function() {
    }
  });
});

// on file submission
$('#geocode-csv').submit(function(e) {
    content.setup();
    var rowCount = 0;
    textInputs.reset();

    var addresses = [];

    // parse the csv to get the count
    $('#file').parse({
      config: {
        header: true,
        step: function(results, parser) {
          if (!addrParse.isValid(results)) {
            return;
          } else {
            if(rowCount < 250) {
              addresses = addrParse.pushAddress(results, addresses);
            }
            rowCount ++;
          }
        },
        complete: function(results, file) {
          if (rowCount === 0) {
            fileInput.setError('There are no rows in this csv. Please update and try again.');
          }
          if (rowCount >= 250) {
            var leftOver = rowCount - 250;
            fileInput.setError('You entered ' + rowCount + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. You can run the first 250 now, but please recheck the remaining ' + leftOver + '.');
          }

          count.updateAddressCount(addresses.length);
          processAddresses(addresses);
        }
      }
    });

    return false;
});
